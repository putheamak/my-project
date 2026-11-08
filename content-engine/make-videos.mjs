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
const VERSION = 5; // bump to remake all videos after changing the design
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
  // Split into separate tables; use the first one whose names are product links
  // (a reference table such as safe temperatures has no links).
  const tables = [];
  let cur = null;
  for (const l of body.split("\n")) {
    if (/^\s*\|/.test(l)) (cur ??= tables[tables.push([]) - 1]).push(l);
    else cur = null;
  }
  const rows = tables.find((t) => t.length >= 3 && t.slice(2).some((l) => /\]\(/.test(l.split("|")[1] ?? ""))) ?? tables.find((t) => t.length >= 3);
  if (!rows) return [];
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*/g, "").trim());
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
// TikTok and Shorts captions have no clickable link, so every frame shows the domain to type in.
const domain = new URL(baseUrl).hostname.replace(/^www\./, "");
const brand = [...caption(900, 50, 36, "white", domain.toUpperCase()), ...at("south", 0, 110)];

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
      ...caption(860, 260, item.name.length > 44 ? 60 : item.name.length > 32 ? 68 : 76, "white", item.name), ...at("south", 0, 640),
      ...caption(860, 220, 54, "#fde7d6", item.text), ...at("south", 0, 390),
      ...brand,
    ], f);
    files.push(f);
  });
  const end = path.join(dir, "end.png");
  magick([
    ...base,
    ...panel(960, 900, "black", 0.65), ...at("center", 0, 0),
    ...caption(860, 240, 0, "white", "Full list with links:"), ...at("center", 0, -250),
    ...panel(920, 140, ACCENT, 1), ...at("center", 0, -20),
    ...caption(860, 100, 0, "white", domain), ...at("center", 0, -20),
    ...caption(860, 90, 44, "#fde7d6", "Type it in your browser"), ...at("center", 0, 130),
    ...caption(860, 70, 34, "#fde7d6", site.title), ...at("center", 0, 225),
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
      // The hook shows from the first frame (no fade), so the default cover and
      // the first thing viewers see is the title; later scenes fade in.
      const fade = i === 0 ? "" : ",fade=in:st=0:d=0.35:alpha=1";
      filters.push(`[${i + 1}:v]format=rgba${fade},setpts=PTS+${start}/TB[o${i}]`);
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
    // Copy next to the output first: the temp dir can be on another disk, where rename fails (EXDEV).
    fs.copyFileSync(part, `${out}.part`);
    fs.renameSync(`${out}.part`, out);
    return { seconds: total, items: items.length };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// One-tip videos (tip-videos.json): a problem hook, the post's "Try this tonight"
// tip in 3 short steps, one product and the website, each scene on its own photo
// (cover, then the post's section photos) so the picture changes with the text.
const tipsPath = path.join(here, "tip-videos.json");
const tips = fs.existsSync(tipsPath) ? JSON.parse(fs.readFileSync(tipsPath, "utf8")) : {};
// Faster cuts keep viewers watching (about 11 s in total).
const TIP_HOOK = 2.0;
const TIP_STEP = 2.6;
const TIP_END = 3.0;

function tipPhotos(post, cover, spec = {}) {
  // tip-videos.json "photos": [hook, step 1, step 2] image paths, so each step
  // shows a picture that matches its words (a missing file falls back to the cover).
  if (Array.isArray(spec.photos) && spec.photos.length) {
    return [0, 1, 2].map((i) => {
      const f = spec.photos[i] && path.join(here, spec.photos[i]);
      return f && fs.existsSync(f) ? f : cover;
    });
  }
  const extra = [1, 2].map((n) => path.join(imagesDir, `${post.slug}-${n}.jpg`)).filter((f) => fs.existsSync(f));
  return [cover, ...extra];
}

// Shorts, TikTok and Pinterest cover the bottom quarter of the screen with the
// title, caption and buttons, so tip videos put the domain and the text in the
// top half and leave the photo visible below.
const tipBrand = [...panel(700, 76, "black", 0.55), ...at("north", 0, 170), ...caption(660, 56, 38, "white", domain.toUpperCase()), ...at("north", 0, 180)];

function renderTip(spec, photos, out) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "skp-tip-"));
  const part = path.join(dir, "tip.mp4");
  try {
    const step = (i, text) => [
      ...panel(980, 520, "black", 0.6), ...at("north", 0, 300),
      ...panel(130, 130, ACCENT, 1), ...at("north", 0, 330),
      ...caption(110, 100, 72, "white", String(i + 1)), ...at("north", 0, 345),
      ...caption(900, 300, 0, "white", text), ...at("north", 0, 485),
    ];
    const scenes = [
      { len: TIP_HOOK, layer: [...panel(1000, 560, "black", 0.55), ...at("north", 0, 300), ...caption(920, 400, 0, "white", spec.hook), ...at("north", 0, 330), ...panel(460, 100, ACCENT, 1), ...at("north", 0, 760), ...caption(420, 76, 0, "white", "Do this:"), ...at("north", 0, 772)] },
      // Only the first two steps: step 3 and the gadget are on the blog, which gives
      // viewers a reason to visit instead of getting the whole answer in the video.
      ...spec.steps.slice(0, 2).map((text, i) => ({ len: TIP_STEP, layer: step(i, text) })),
      { len: TIP_END + 0.6, layer: [...panel(980, 900, "black", 0.68), ...at("center", 0, 0), ...caption(880, 260, 62, "white", "Step 3 + the gadget that makes it easier:"), ...at("center", 0, -250), ...panel(920, 140, ACCENT, 1), ...at("center", 0, -30), ...caption(860, 100, 0, "white", domain), ...at("center", 0, -30), ...caption(860, 80, 42, "#fde7d6", "Type it in your browser"), ...at("center", 0, 110), ...caption(860, 70, 34, "#fde7d6", spec.cta), ...at("center", 0, 210), ...caption(800, 90, 30, "#d9d9d9", disclosure), ...at("center", 0, 320)] },
    ];
    const total = scenes.reduce((sum, sc) => sum + sc.len, 0);
    let start = 0;
    const parts = scenes.map((scene, i) => {
      // Hook on the cover, steps on the section photos, product and end card back on the cover.
      const photo = i === 0 || i > 2 ? photos[0] : photos[1 + ((i - 1) % Math.max(1, photos.length - 1))] ?? photos[0];
      const bg = path.join(dir, `bg${i}.jpg`);
      const layer = path.join(dir, `l${i}.png`);
      const clip = path.join(dir, `c${i}.mp4`);
      const big = `${Math.round(W * 1.15)}x${Math.round(H * 1.15)}`;
      magick([photo, "-auto-orient", "-resize", `${big}^`, "-gravity", "center", "-extent", big, "-fill", "black", "-colorize", "25%", "-quality", "92"], bg);
      magick(["-size", `${W}x${H}`, "xc:none", ...scene.layer, ...(i === scenes.length - 1 ? [] : tipBrand)], layer);
      const frames = Math.round(scene.len * FPS);
      // Real footage when tip-videos.json gives a clip for this scene ("clips":
      // [hook, step 1, step 2], short vertical videos, e.g. the owner's own or from
      // Pexels); the end card reuses the hook clip. Otherwise the photo, with a
      // stronger zoom and a slight drift, alternating direction on each cut.
      const clipSrc = Array.isArray(spec.clips) ? spec.clips[i > 2 ? 0 : i] : null;
      const footage = clipSrc && fs.existsSync(path.resolve(here, clipSrc)) ? path.resolve(here, clipSrc) : null;
      const z = i % 2 === 0 ? `1+0.14*on/${frames}` : `1.14-0.14*on/${frames}`;
      const drift = i % 2 === 0 ? `+0.04*iw*on/${frames}` : `-0.04*iw*on/${frames}`;
      const background = footage
        ? `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,eq=brightness=-0.06,fps=${FPS},trim=duration=${scene.len},setpts=PTS-STARTPTS[b]`
        : `[0:v]zoompan=z='${z}':x='iw/2-(iw/zoom/2)${drift}':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS}[b]`;
      // Text slides down into place (the hook stays put so the first frame, which
      // apps use as the cover, already shows it). A thin progress bar runs along
      // the top edge across the whole video.
      const slide = i ? `if(lt(t,0.35),-70*(1-t/0.35),0)` : "0";
      const run = spawnSync("ffmpeg", [
        "-y", "-loglevel", "error",
        ...(footage ? ["-stream_loop", "-1", "-i", footage] : ["-loop", "1", "-framerate", String(FPS), "-t", String(scene.len), "-i", bg]),
        "-loop", "1", "-framerate", String(FPS), "-t", String(scene.len), "-i", layer,
        "-f", "lavfi", "-t", String(scene.len), "-i", `color=c=${ACCENT}:s=${W}x14:r=${FPS}`,
        "-filter_complex", `${background};[1:v]format=rgba${i ? ",fade=in:st=0:d=0.25:alpha=1" : ""}[t];[b][t]overlay=x=0:y='${slide}'[bt];[bt][2:v]overlay=x='-${W}+${W}*(${start.toFixed(3)}+t)/${total.toFixed(3)}':y=0,format=yuv420p`,
        "-t", String(scene.len), "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-r", String(FPS), clip,
      ]);
      start += scene.len;
      if (run.status !== 0) throw new Error(run.stderr.toString().trim().split("\n").slice(-1)[0]);
      return clip;
    });
    const list = path.join(dir, "list.txt");
    fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
    const run = spawnSync("ffmpeg", [
      "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", list,
      "-f", "lavfi", "-t", String(total), "-i", "anullsrc=r=44100:cl=stereo",
      "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "64k", "-shortest", "-movflags", "+faststart", part,
    ]);
    if (run.status !== 0) throw new Error(run.stderr.toString().trim().split("\n").slice(-1)[0]);
    fs.copyFileSync(part, `${out}.part`);
    fs.renameSync(`${out}.part`, out);
    return { seconds: total };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// The day a video was (re)made, in Cambodia time, so the pins page can flag fresh files.
const madeToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh" }).format(new Date());

const tipCaption = (post, spec) =>
  `${spec.hook}\n${spec.steps.slice(0, 2).map((s, i) => `${i + 1}. ${s}`).join("\n")}\n👉 Step 3 + the gadget that makes it easier: ${domain}\n\n${disclosure}\n\n#kitchenhacks #cookingtips #kitchentips #homecooking`;

// Text to paste under the video on TikTok, YouTube Shorts or Pinterest.
const videoCaption = (post) =>
  `${post.pinTitle || post.title}\n\nFull list with links: ${domain}\n${disclosure}\n\n#kitchengadgets #kitchenhacks #cookingtips #homecooking`;

// The live site first, then the same file on the gh-pages branch, so a domain
// that isn't reachable yet doesn't make every video render again.
async function liveManifest() {
  const sources = [
    `${baseUrl}/pins/videos.json`,
    "https://raw.githubusercontent.com/putheamak/my-project/gh-pages/blog/pins/videos.json",
  ];
  for (const src of sources) {
    try {
      const res = await fetch(src, { signal: AbortSignal.timeout(15000) });
      if (res.ok) return await res.json();
    } catch {}
  }
  return {};
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
  } else {
    try {
      const { seconds, items } = render(post, src, path.join(outDir, `${post.slug}.mp4`));
      console.log(`${post.slug}.mp4: ${seconds.toFixed(1)} s, ${items} gadgets`);
      manifest[post.slug] = { ...entry, tip: previous[post.slug]?.tip, seconds: Math.round(seconds), made: madeToday };
      made++;
    } catch (e) {
      console.warn(`video ${post.slug} failed: ${e.message}`);
      if (previous[post.slug]) manifest[post.slug] = previous[post.slug];
    }
  }
  const spec = tips[post.slug];
  if (!spec || !manifest[post.slug]) continue;
  const photos = tipPhotos(post, src, spec);
  const tipKey = createHash("sha1")
    .update(JSON.stringify([VERSION, "tip5", spec, photos.map((f) => [path.basename(f), fs.statSync(f).size])]))
    .digest("hex")
    .slice(0, 12);
  if (!force && previous[post.slug]?.tip?.key === tipKey) {
    manifest[post.slug].tip = { ...previous[post.slug].tip, caption: tipCaption(post, spec) };
    continue;
  }
  try {
    const { seconds } = renderTip(spec, photos, path.join(outDir, `${post.slug}-tip.mp4`));
    console.log(`${post.slug}-tip.mp4: ${seconds.toFixed(1)} s`);
    manifest[post.slug].tip = { key: tipKey, caption: tipCaption(post, spec), seconds: Math.round(seconds), made: madeToday };
    made++;
  } catch (e) {
    console.warn(`tip video ${post.slug} failed: ${e.message}`);
  }
}
// Keep entries for posts skipped by --only, so their videos stay listed.
if (only) for (const [slug, v] of Object.entries(previous)) manifest[slug] ??= v;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Made ${made} video(s); ${Object.keys(manifest).length} listed in ${path.relative(process.cwd(), manifestPath)}`);
