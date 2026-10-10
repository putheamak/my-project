// Makes ready-to-upload Pinterest images for every published post, plus a page
// that collects them with the text to paste into Pinterest.
//
//   node make-pins.mjs                 # writes dist-blog/pins/
//   node make-pins.mjs --out somewhere
//
// The page starts with a dated pin plan from pin-queue.json: fresh titles and
// descriptions for extra pins of posts that are already pinned, with the
// design image to use. Today's group opens first.
//
// Each post gets 3 vertical 1000x1500 designs made from its cover photo, with
// the pin title on top. Pinterest favours fresh images, so pin one design now
// and the others over the following weeks. Needs ImageMagick (free); the
// Publish blog workflow installs it. Posts without a cover photo are skipped.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parsePost } from "./lib/post.mjs";
import { checkCompliance } from "./compliance.mjs";
import { resolveImage } from "./lib/images.mjs";
import { escapeHtml as esc } from "./lib/markdown.mjs";
import { fitPinDescription } from "./lib/pin-text.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const { disclosure } = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
const postsDir = path.join(here, "posts");
const imagesDir = path.join(here, "images");
const outArg = process.argv.indexOf("--out");
const outDir = path.resolve(outArg > -1 ? process.argv[outArg + 1] : path.join(here, "dist-blog", "pins"));
const baseUrl = site.baseUrl.replace(/\/+$/, "");

const convert = ["magick", "convert"].find((cmd) => spawnSync(cmd, ["-version"]).status === 0);
if (!convert) {
  console.log("ImageMagick not found; skipping pin images.");
  process.exit(0);
}
const font = [
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
  "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
].find((f) => fs.existsSync(f));
const fontArgs = font ? ["-font", font] : [];

// ImageMagick reads "@file" and "%" escapes inside caption text; keep titles literal.
const literal = (s) => s.replace(/^@/, "").replace(/%/g, "%%").replace(/\\/g, "");

// "Best X for Y (Under $30)" -> headline "Best X for Y", subline "Under $30".
function splitTitle(title) {
  const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { headline: m[1], subline: m[2] } : { headline: title, subline: "" };
}

const W = 1000;
const H = 1500;
const brand = "SMART KITCHEN PICKS";
const text = (w, h, color, value, extra = []) => [
  "(", "-size", `${w}x${h}`, "-background", "none", "-fill", color, ...fontArgs, ...extra,
  "-gravity", "center", `caption:${literal(value)}`, ")",
];
const photo = (src, w, h, extra = []) => [
  "(", src, "-auto-orient", "-resize", `${w}x${h}^`, "-gravity", "center", "-extent", `${w}x${h}`, ...extra, ")",
];
const place = (gravity, x, y) => ["-gravity", gravity, "-geometry", `+${x}+${y}`, "-composite"];

const designs = [
  // 1. Photo on top, title on a solid band below.
  ({ src, headline, subline }) => [
    ...photo(src, W, 880),
    "(", "-size", `${W}x${H - 880}`, "xc:#b4531f", ")", "-append",
    ...text(880, 400, "white", headline), ...place("north", 0, 920),
    ...(subline ? [...text(880, 70, "#fde7d6", subline), ...place("north", 0, 1335)] : []),
    ...text(600, 36, "#fde7d6", brand), ...place("south", 0, 20),
  ],
  // 2. Full photo, darkened, with the title across the middle.
  ({ src, headline, subline }) => [
    ...photo(src, W, H, ["-fill", "black", "-colorize", "45%"]),
    ...text(860, 640, "white", headline), ...place("center", 0, -60),
    ...(subline ? [
      "(", "-size", "640x90", "xc:#b4531f", ...text(600, 66, "white", subline), "-gravity", "center", "-composite", ")",
      ...place("center", 0, 340),
    ] : []),
    ...text(600, 40, "white", brand), ...place("south", 0, 40),
  ],
  // 3. Title on a light panel on top, photo below.
  ({ src, headline, subline }) => [
    "(", "-size", `${W}x560`, "xc:#fbfaf7", ")",
    ...photo(src, W, H - 560), "-append",
    ...text(880, 360, "#1d1f21", headline), ...place("north", 0, 50),
    ...(subline ? [...text(880, 70, "#b4531f", subline), ...place("north", 0, 425)] : []),
    ...text(600, 32, "#5d6166", brand), ...place("north", 0, 505),
  ],
];

const cards = [];
for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir).sort().reverse() : []) {
  if (!file.endsWith(".md")) continue;
  const post = parsePost(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (!post || post.status !== "published" || !post.image) continue;
  const pinTitle = post.pinTitle || post.title;
  const pinDescription = fitPinDescription(post.pinDescription || post.description || "", disclosure);
  const blocking = checkCompliance(`${pinTitle}\n\n${pinDescription}\n\n${post.body}`, disclosure).filter(
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
  fs.mkdirSync(outDir, { recursive: true });
  const { headline, subline } = splitTitle(pinTitle);
  const files = [];
  designs.forEach((design, i) => {
    const name = `${post.slug}-${i + 1}.jpg`;
    const run = spawnSync(convert, [...design({ src, headline, subline }), "-strip", "-quality", "85", path.join(outDir, name)]);
    if (run.status === 0) files.push(name);
    else console.warn(`pin ${name} failed: ${run.stderr.toString().trim().split("\n")[0]}`);
  });
  if (!files.length) continue;
  console.log(`${post.slug}: ${files.length} pins`);
  cards.push({ post, pinTitle, pinDescription, files, link: `${baseUrl}/posts/${post.slug}/` });
}

// ---- Pin plan from pin-queue.json --------------------------------------------

const queuePath = path.join(here, "pin-queue.json");
const queue = fs.existsSync(queuePath) ? JSON.parse(fs.readFileSync(queuePath, "utf8")).queue ?? [] : [];
const days = new Map();
for (const item of queue) {
  const c = cards.find((x) => x.post.slug === item.slug);
  const file = c && `${item.slug}-${item.design}.jpg`;
  if (!c || !c.files.includes(file)) {
    console.warn(`pin plan ${item.date}: skip ${item.slug} design ${item.design} (post or image not found)`);
    continue;
  }
  const description = fitPinDescription(item.description, disclosure);
  const blocking = checkCompliance(`${item.title}\n\n${description}`, disclosure).filter((i) => i.level === "FIX");
  if (blocking.length) {
    console.warn(`pin plan ${item.date}: skip "${item.title}": ${blocking.map((i) => i.found).join(", ")}`);
    continue;
  }
  if (!days.has(item.date)) days.set(item.date, []);
  days.get(item.date).push({ ...item, description, file, link: c.link, ai: /ai-generated/i.test(c.post.image) });
}

// A read-only box with a "Copy" button, so pin text pastes into Pinterest in one tap.
const field = (name, value, rows) => `<div class="field"><div class="row"><span>${name}</span><button type="button" class="copy">Copy</button></div><textarea rows="${rows}" readonly aria-label="${name}">${esc(value)}</textarea></div>`;

const aiHint = '<p class="hint"><strong>Turn on "Mark as AI-Modified"</strong>: this cover photo is AI-generated.</p>';

const planItem = (i) => `<div class="plan-item">
<a href="${esc(i.file)}" download><img src="${esc(i.file)}" alt="Pin design ${i.design}" loading="lazy" width="120" height="180"></a>
<div class="plan-text">
${field("Title", i.title, 2)}
${field("Description", i.description, 5)}
${field("Link", i.link, 2)}
<p class="hint">Board: <strong>${esc(i.board)}</strong> · Design ${i.design} (tap the image to download)</p>
${i.ai ? aiHint : ""}
</div></div>`;

const dayLabel = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const plan = [...days.keys()].sort().map((d) => `<details class="day" data-date="${d}"><summary>${dayLabel(d)} · ${days.get(d).length} pins<span class="badge"></span></summary>
${days.get(d).map(planItem).join("\n")}
</details>`).join("\n");

// Short videos from make-videos.mjs (pins/videos.json), shown on each post's card.
const videosPath = path.join(outDir, "videos.json");
const videos = fs.existsSync(videosPath) ? JSON.parse(fs.readFileSync(videosPath, "utf8")) : {};
const videoBlock = (post) => {
  const v = videos[post.slug];
  if (!v) return "";
  const file = `${post.slug}.mp4`;
  return `<div class="video"><h3>Short video${v.seconds ? ` (${v.seconds} s)` : ""}</h3>
<video src="${esc(file)}" controls playsinline preload="none" width="180" height="320"></video>
<p><a class="dl" href="${esc(file)}" download>Download video</a></p>
<p class="hint">For TikTok, YouTube Shorts and Pinterest. The video is silent: add a sound in the app.</p>
${field("Video caption", v.caption, 6)}
</div>`;
};

const card = ({ post, pinTitle, pinDescription, files, link }) => `<section>
<h2>${esc(post.title)}</h2>
<div class="pins">${files.map((f) => `<a href="${esc(f)}" download><img src="${esc(f)}" alt="Pin design for ${esc(post.title)}" loading="lazy" width="200" height="300"></a>`).join("")}</div>
<p class="hint">Tap an image to download it. Pin one design now and the others in the coming weeks.</p>
${field("Title", pinTitle, 3)}
${field("Description", pinDescription, 5)}
${field("Link", link, 2)}
${post.pinBoard ? `<p class="hint">Suggested board: ${esc(post.pinBoard)}</p>` : ""}
${/ai-generated/i.test(post.image) ? aiHint : ""}
${videoBlock(post)}
</section>`;

if (cards.length) {
  fs.writeFileSync(path.join(outDir, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Pin images - ${esc(site.title)}</title>
<style>
:root{--bg:#fbfaf7;--surface:#fff;--text:#1d1f21;--muted:#5d6166;--line:#e4e1da}
@media (prefers-color-scheme:dark){:root{--bg:#141516;--surface:#1c1e20;--text:#ecebe8;--muted:#a3a6aa;--line:#2e3134}}
body{margin:0;padding:16px;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,sans-serif}
main{max-width:720px;margin:0 auto}section{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;margin:16px 0}
h1{font-size:1.5rem}h2{font-size:1.1rem;margin-top:0}.pins{display:flex;gap:8px;overflow-x:auto}
.pins img{width:150px;height:225px;object-fit:cover;border-radius:8px;display:block}
.field{margin-top:12px}.row{display:flex;justify-content:space-between;align-items:center;font-weight:600}
.copy{font:inherit;font-size:.9rem;padding:6px 14px;border:0;border-radius:999px;background:#b4531f;color:#fff;cursor:pointer}.copy.done{background:#2f7d4f}
textarea{display:block;width:100%;box-sizing:border-box;margin-top:4px;font:inherit;font-weight:400;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--text)}
.hint{color:var(--muted);font-size:.9rem}
.video{border-top:1px solid var(--line);margin-top:16px;padding-top:4px}.video h3{font-size:1rem}
.video video{width:180px;height:320px;border-radius:8px;background:#000;display:block}
.dl{display:inline-block;padding:6px 14px;border-radius:999px;background:#b4531f;color:#fff;text-decoration:none;font-size:.9rem}
.day{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:10px 0}
.day summary{font-weight:600;cursor:pointer}.day.past{opacity:.6}
.badge{margin-left:8px;font-size:.8rem;padding:2px 8px;border-radius:999px;background:#b4531f;color:#fff}.badge:empty{display:none}
.plan-item{display:flex;gap:12px;align-items:flex-start;border-top:1px solid var(--line);padding-top:12px;margin-top:12px}
.plan-item img{width:96px;height:144px;object-fit:cover;border-radius:8px;display:block}.plan-text{flex:1;min-width:0}
@media (max-width:480px){.plan-item{flex-direction:column}}
</style></head><body><main>
<h1>Pin images</h1>
<p class="hint">This page isn't linked from the blog.</p>
${plan ? `<h2 id="plan">Pin plan</h2>
<p class="hint">Extra pins with fresh text for posts you've already pinned. Today's pins open first; copy each field into Pinterest and pick the board shown.</p>
${plan}
<h2>New posts</h2>` : ""}
<p class="hint">Three Pinterest designs per post, newest first, with the text for each post's first pin.</p>
${cards.map(card).join("\n")}
</main>
<script>
// Open today's pins (or the next day with pins) and grey out past days.
{
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  const days = [...document.querySelectorAll(".day")];
  days.filter((d) => d.dataset.date < today).forEach((d) => d.classList.add("past"));
  const next = days.find((d) => d.dataset.date >= today);
  if (next) {
    next.open = true;
    next.querySelector(".badge").textContent = next.dataset.date === today ? "Today" : "Next";
  }
}
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const box = btn.closest(".field").querySelector("textarea");
  try {
    await navigator.clipboard.writeText(box.value);
  } catch {
    box.select();
    document.execCommand("copy");
  }
  btn.textContent = "Copied!";
  btn.classList.add("done");
  setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1500);
});
</script>
</body></html>
`);
  console.log(`Wrote ${cards.length} posts to ${outDir}`);
}
