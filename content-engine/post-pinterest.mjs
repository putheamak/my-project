// Posts each newly-published blog post's pin to Pinterest via the Pinterest
// API (v5). Nothing is posted unless pinterest.autoPost is true in site.json,
// and a post is only ever posted once (tracked in output/pinterest-history.json)
// and only when it's "published" and clean of FIX-level compliance issues.
//
//   node post-pinterest.mjs            post any new published, clean posts
//   node post-pinterest.mjs --dry-run  show what would be posted; no API call
//
// Requires the post to already be live (its cover image and post page must be
// reachable at their public blog URL), so this should run after the blog has
// been published, not before.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parsePost } from "./lib/post.mjs";
import { checkCompliance } from "./compliance.mjs";
import { resolveImage } from "./lib/images.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(here, "posts");
const imagesDir = path.join(here, "images");
const historyPath = path.join(here, "output", "pinterest-history.json");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const { disclosure } = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
const pinterest = site.pinterest ?? {};

if (!pinterest.autoPost) {
  console.log("pinterest.autoPost is not enabled in site.json; nothing to do.");
  process.exit(0);
}
if (!pinterest.boardId) {
  console.error('site.json: "pinterest.boardId" is required when pinterest.autoPost is true.');
  process.exit(1);
}

async function getAccessToken() {
  if (process.env.PINTEREST_REFRESH_TOKEN && process.env.PINTEREST_APP_ID && process.env.PINTEREST_APP_SECRET) {
    const basic = Buffer.from(`${process.env.PINTEREST_APP_ID}:${process.env.PINTEREST_APP_SECRET}`).toString("base64");
    const res = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: process.env.PINTEREST_REFRESH_TOKEN }),
    });
    if (!res.ok) throw new Error(`Pinterest token refresh failed: ${res.status} ${await res.text()}`);
    return (await res.json()).access_token;
  }
  if (process.env.PINTEREST_ACCESS_TOKEN) return process.env.PINTEREST_ACCESS_TOKEN;
  throw new Error(
    "Missing Pinterest credentials: set PINTEREST_ACCESS_TOKEN, or PINTEREST_REFRESH_TOKEN + PINTEREST_APP_ID + PINTEREST_APP_SECRET.",
  );
}

const baseUrl = site.baseUrl.replace(/\/+$/, "");
const url = (p = "") => `${baseUrl}/${p}`;

const history = fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, "utf8")) : [];
const posted = new Set(history.map((h) => h.slug));

const candidates = [];
for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir).sort() : []) {
  if (!file.endsWith(".md")) continue;
  const post = parsePost(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (!post || post.status !== "published" || posted.has(post.slug)) continue;

  if (!post.pinTitle || !post.pinDescription) {
    console.warn(`skip ${post.slug}: no saved Pinterest pin text (post predates Pinterest support, or was hand-written)`);
    continue;
  }

  const issues = checkCompliance(`${post.pinTitle}\n\n${post.pinDescription}\n\n${post.body}`, disclosure);
  const blocking = issues.filter((i) => i.level === "FIX" || i.found.includes("placeholder"));
  if (blocking.length) {
    console.warn(`skip ${post.slug}: ${blocking.map((i) => i.message).join("; ")} - run: node compliance.mjs posts/${file}`);
    continue;
  }

  if (!post.image) {
    console.warn(`skip ${post.slug}: no cover image set, Pinterest requires one`);
    continue;
  }

  const isRemote = /^https?:\/\//.test(post.image);
  const imageUrl = isRemote ? post.image : url(resolveImage(imagesDir, post.image, post.slug));
  candidates.push({
    slug: post.slug,
    board_id: pinterest.boardId,
    title: post.pinTitle.slice(0, 100),
    description: post.pinDescription.slice(0, 500),
    link: url(`posts/${post.slug}/`),
    media_source: { source_type: "image_url", url: imageUrl },
  });
}

if (!candidates.length) {
  console.log("Nothing new to pin.");
  process.exit(0);
}

if (dryRun) {
  for (const { slug, ...pin } of candidates) {
    console.log(`[dry-run] would post ${slug}:\n${JSON.stringify(pin, null, 2)}`);
  }
  process.exit(0);
}

let token;
try {
  token = await getAccessToken();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

let failures = 0;
for (const { slug, ...pin } of candidates) {
  try {
    const res = await fetch("https://api.pinterest.com/v5/pins", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(pin),
    });
    if (!res.ok) {
      console.error(`Pinterest API error for ${slug}: ${res.status} ${await res.text()}`);
      failures++;
      continue;
    }
    const data = await res.json();
    console.log(`Pinned ${slug} -> https://www.pinterest.com/pin/${data.id}/`);
    history.push({ slug, pinId: data.id, postedAt: new Date().toISOString() });
  } catch (error) {
    console.error(`Pinterest request failed for ${slug}:`, error);
    failures++;
  }
}

fs.mkdirSync(path.dirname(historyPath), { recursive: true });
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");

process.exit(failures ? 1 : 0);
