// Makes ready-to-upload Pinterest images for every published post, plus a page
// that collects them with the text to paste into Pinterest.
//
//   node make-pins.mjs                 # writes dist-blog/pins/
//   node make-pins.mjs --out somewhere
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

const card = ({ post, pinTitle, pinDescription, files, link }) => `<section>
<h2>${esc(post.title)}</h2>
<div class="pins">${files.map((f) => `<a href="${esc(f)}" download><img src="${esc(f)}" alt="Pin design for ${esc(post.title)}" loading="lazy" width="200" height="300"></a>`).join("")}</div>
<p class="hint">Tap an image to download it. Pin one design now and the others in the coming weeks.</p>
<label>Title<textarea rows="2" readonly>${esc(pinTitle)}</textarea></label>
<label>Description<textarea rows="5" readonly>${esc(pinDescription)}</textarea></label>
<label>Link<textarea rows="2" readonly>${esc(link)}</textarea></label>
${post.pinBoard ? `<p class="hint">Suggested board: ${esc(post.pinBoard)}</p>` : ""}
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
label{display:block;font-weight:600;margin-top:12px}textarea{display:block;width:100%;box-sizing:border-box;margin-top:4px;font:inherit;font-weight:400;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--text)}
.hint{color:var(--muted);font-size:.9rem}
</style></head><body><main>
<h1>Pin images</h1>
<p class="hint">Three Pinterest designs per post, newest first, with the text to paste. This page isn't linked from the blog.</p>
${cards.map(card).join("\n")}
</main></body></html>
`);
  console.log(`Wrote ${cards.length} posts to ${outDir}`);
}
