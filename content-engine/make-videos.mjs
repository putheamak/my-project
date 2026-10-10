// Makes a short vertical video (1080x1920, about 20 s) for every published
// post with a cover photo, for TikTok, YouTube Shorts and Pinterest video pins.
//
//   node make-videos.mjs                 # writes dist-blog/pins/<slug>.mp4
//   node make-videos.mjs --out somewhere
//   node make-videos.mjs --only <slug>   # one post
//   node make-videos.mjs --force         # remake every video
//
// Rendering takes about a minute per video, so a video is only made when its
// post is new or changed: pins/videos.json on the live site records a key per
// post, and the published site keeps earlier videos (keep_files in blog.yml).
//
// The video is the cover photo with a slow zoom and text scenes on top: a hook
// (the pin title), up to 5 gadgets from the post's comparison table, and an end
// card sending viewers to the blog. No Amazon images are used. The audio track
// is silent; add a sound inside TikTok or YouTube. Needs ImageMagick and
// ffmpeg; posts are skipped with a message if either is missing.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { parsePost } from "./lib/post.mjs";
import { checkCompliance } from "./compliance.mjs";
import { resolveImage } from "./lib/images.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const { disclosure } = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const baseUrl = site.baseUrl.replace(/\/+$/, "");
const VERSION = 1; // bump to remake all videos after changing the design
const postsDir = path.join(here, "posts");
const imagesDir = path.join(here, "images");
const arg = (name) => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : "");
const outDir = path.resolve(arg("--out") || path.join(here, "dist-blog", "pins"));
const only = arg("--only");
const force = process.argv.includes("--force");

const convert = ["magick", "convert"].find((cmd) => spawnSync(cmd, ["-version"]).status === 0);
const ffmpeg = spawnSync("ffmpeg", ["-version"]).status === 0;
if (!convert || !ffmpeg) {
  console.log(`Video tools missing (${[!convert && "ImageMagick", !ffmpeg && "ffmpeg"].filter(Boolean).join(", ")}); skipping videos.`);
  process.exit(0);
}
const font = [
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].find((f) => fs.existsSync(f));
const fontArgs = font ? ["-font", font] : [];
const literal = (s) => s.replace(/^@/, "").replace(/%/g, "%%").replace(/\\/g, "");

const W = 1080;
const H = 1920;
const FPS = 30;
const HOOK = 3.2;
const ITEM = 2.8;
const END = 3.5;
const ACCENT = "#b4531f";

// Gadget rows from the post's first Markdown table: first column is the name,
// the description comes from a "best for / use" column when there is one.
export function tableItems(body, max = 5) {
  const rows = body.split("\n").filter((l) => /^\s*\|/.test(l));
  if (rows.length < 3) return [];
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.replace(/\*\*/g, "").trim());
  const head = cells(rows[0]);
  let col = head.findIndex((h, i) => i > 0 && /^(best (for|use)|use it for)/i.test(h));
  if (col < 0) col = head.findIndex((h, i) => i > 0 && /^(what it|main job)/i.test(h));
  if (col < 0) col = 1;
  return rows
    .slice(2)
    .map(cells)
    .filter((r) => r[0] && r[col])
    .slice(0, max)
    .map((r) => ({ name: r[0], text: r[col] }));
}

function splitTitle(title) {
  const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { headline: m[1], subline: m[2] } : { headline: title, subline: "" };
}

function magick(args, out) {
  const run = spawnSync(convert, [...args, out]);
  if (run.status !== 0) throw new Error(run.stderr.toString().trim().split("\n")[0]);
}

const caption = (w, h, size, color, text, extra = []) => [
  "(", "-size", `${w}x${h}`, "-background", "none", "-fill", color, ...fontArgs, "-pointsize", String(size), ...extra,
  "-gravity", "center", `caption:${literal(text)}`, ")",
];
const panel = (w, h, color, alpha) => ["(", "-size", `${w}x${h}`, "xc:none", "-fill", color, "-draw", `roundrectangle 0,0,${w - 1},${h - 1},36,36`, "-channel", "A", "-evaluate", "multiply", String(alpha), "+channel", ")"];
const at = (gravity, x, y) => ["-gravity", gravity, "-geometry", `+${x}+${y}`, "-composite"];
const brand = [...caption(900, 50, 34, "white", "SMART KITCHEN PICKS"), ...at("south", 0, 110)];

// Transparent 1080x1920 overlays, one per scene.
function overlays(dir, { headline, subline, items }) {
  const files = [];
  const base = ["-size", `${W}x${H}`, "xc:none"];
  const hook = path.join(dir, "0.png");
  magick([
    ...base,
    ...panel(960, 760, "black", 0.55), ...at("center", 0, -80),
    ...caption(860, 560, 0, "white", headline), ...at("center", 0, -150),
    ...(subline ? [...panel(620, 100, ACCENT, 1), ...at("center", 0, 220), ...caption(580, 80, 0, "white", subline), ...at("center", 0, 220)] : []),
    ...brand,
  ], hook);
  files.push(hook);
  items.forEach((item, i) => {
    const f = path.join(dir, `${i + 1}.png`);
    magick([
      ...base,
      ...panel(960, 640, "black", 0.6), ...at("south", 0, 330),
      ...panel(170, 90, ACCENT, 1), ...at("south", 0, 900),
      ...caption(150, 70, 44, "white", `${i + 1}/${items.length}`), ...at("south", 0, 910),
      ...caption(860, 260, 76, "white", item.name), ...at("south", 0, 640),
      ...caption(860, 220, 54, "#fde7d6", item.text), ...at("south", 0, 390),
      ...brand,
    ], f);
    files.push(f);
  });
  const end = path.join(dir, "end.png");
  magick([
    ...base,
    ...panel(960, 900, "black", 0.65), ...at("center", 0, 0),
    ...caption(860, 300, 0, "white", "Full list on my blog"), ...at("center", 0, -230),
    ...panel(620, 110, ACCENT, 1), ...at("center", 0, 0),
    ...caption(580, 80, 0, "white", "Link in bio"), ...at("center", 0, 0),
    ...caption(860, 120, 0, "#fde7d6", "Smart Kitchen Picks"), ...at("center", 0, 190),
    ...caption(800, 90, 30, "#d9d9d9", disclosure), ...at("center", 0, 330),
  ], end);
  files.push(end);
  return files;
}

function render(post, src, out) {
  const { headline, subline } = splitTitle(post.pinTitle || post.title);
  const items = tableItems(post.body);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "skp-video-"));
  const part = path.join(dir, "video.mp4");
  try {
    const layers = overlays(dir, { headline, subline, items });
    const times = [0, HOOK, ...items.map((_, i) => HOOK + ITEM * (i + 1))];
    const total = HOOK + ITEM * items.length + END;
    const frames = Math.round(total * FPS);
    // Background: cover photo, slightly darkened, slow zoom in over the whole video.
    const bg = path.join(dir, "bg.jpg");
    magick([src, "-auto-orient", "-resize", `${Math.round(W * 1.25)}x${Math.round(H * 1.25)}^`, "-gravity", "center", "-extent", `${Math.round(W * 1.25)}x${Math.round(H * 1.25)}`, "-fill", "black", "-colorize", "20%", "-quality", "92"], bg);
    const inputs = ["-loop", "1", "-framerate", String(FPS), "-t", String(total), "-i", bg];
    const filters = [`[0:v]zoompan=z='1+0.12*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS},format=yuv420p[v0]`];
    layers.forEach((file, i) => {
      const start = times[i];
      const len = i === layers.length - 1 ? total - start : times[i + 1] - start;
      inputs.push("-loop", "1", "-framerate", String(FPS), "-t", String(len), "-i", file);
      filters.push(`[${i + 1}:v]format=rgba,fade=in:st=0:d=0.35:alpha=1,setpts=PTS+${start}/TB[o${i}]`);
      filters.push(`[v${i}][o${i}]overlay=0:0:eof_action=pass:enable='between(t,${start},${(start + len).toFixed(2)})'[v${i + 1}]`);
    });
    const run = spawnSync("ffmpeg", [
      "-y", "-loglevel", "error", ...inputs,
      "-f", "lavfi", "-t", String(total), "-i", "anullsrc=r=44100:cl=stereo",
      "-filter_complex", filters.join(";"),
      "-map", `[v${layers.length}]`, "-map", `${layers.length + 1}:a`,
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p", "-r", String(FPS),
      "-c:a", "aac", "-b:a", "64k", "-shortest", "-movflags", "+faststart", part,
    ]);
    if (run.status !== 0) throw new Error(run.stderr.toString().trim().split("\n").slice(-1)[0]);
    // Only a finished file gets the real name, so a half-written video is never shown.
    fs.renameSync(part, out);
    return { seconds: total, items: items.length };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Text to paste under the video on TikTok, YouTube Shorts or Pinterest.
const videoCaption = (post) =>
  `${post.pinTitle || post.title}\n\nFull list on my blog - link in bio.\n${disclosure}\n\n#kitchengadgets #kitchenhacks #cookingtips #homecooking`;

async function liveManifest() {
  try {
    const res = await fetch(`${baseUrl}/pins/videos.json`, { signal: AbortSignal.timeout(15000) });
    return res.ok ? await res.json() : {};
  } catch {
    return {};
  }
}

fs.mkdirSync(outDir, { recursive: true });
const manifestPath = path.join(outDir, "videos.json");
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : await liveManifest();
const manifest = {};
let made = 0;
for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir).sort().reverse() : []) {
  if (!file.endsWith(".md")) continue;
  const post = parsePost(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (!post || post.status !== "published" || !post.image) continue;
  if (only && post.slug !== only) continue;
  const blocking = checkCompliance(`${post.pinTitle || post.title}\n\n${post.body}`, disclosure).filter(
    (i) => i.level === "FIX" || i.found.includes("placeholder"),
  );
  if (blocking.length) {
    console.warn(`skip ${file}: ${blocking.map((i) => i.found).join(", ")}`);
    continue;
  }
  const src = path.join(here, resolveImage(imagesDir, post.image, post.slug));
  if (!fs.existsSync(src)) {
    console.warn(`skip ${file}: cover photo ${post.image} not found`);
    continue;
  }
  const key = createHash("sha1")
    .update(JSON.stringify([VERSION, post.pinTitle || post.title, tableItems(post.body), post.image, fs.statSync(src).size]))
    .digest("hex")
    .slice(0, 12);
  const entry = { key, caption: videoCaption(post) };
  if (!force && previous[post.slug]?.key === key) {
    manifest[post.slug] = { ...previous[post.slug], ...entry };
    continue;
  }
  try {
    const { seconds, items } = render(post, src, path.join(outDir, `${post.slug}.mp4`));
    console.log(`${post.slug}.mp4: ${seconds.toFixed(1)} s, ${items} gadgets`);
    manifest[post.slug] = { ...entry, seconds: Math.round(seconds) };
    made++;
  } catch (e) {
    console.warn(`video ${post.slug} failed: ${e.message}`);
    if (previous[post.slug]) manifest[post.slug] = previous[post.slug];
  }
}
// Keep entries for posts skipped by --only, so their videos stay listed.
if (only) for (const [slug, v] of Object.entries(previous)) manifest[slug] ??= v;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Made ${made} video(s); ${Object.keys(manifest).length} listed in ${path.relative(process.cwd(), manifestPath)}`);
