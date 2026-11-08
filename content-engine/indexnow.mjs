// IndexNow: tell Bing (and the search engines that use its index, such as Yahoo
// and DuckDuckGo) about pages that are new or changed, right after a deploy,
// instead of waiting for the next crawl. Google doesn't use IndexNow.
//
//   node indexnow.mjs          # posts published or updated in the last 2 days, plus the home page
//   node indexnow.mjs --all    # every published post (one-off, e.g. after a big update)
//   node indexnow.mjs --dry-run
//
// The key file (site-root/<key>.txt) is served at the site root, which proves
// to the search engines that this site owns the key. It is public by design.
// A failure only prints a warning: it never fails the publish workflow.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parsePost } from "./lib/post.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const baseUrl = site.baseUrl.replace(/\/+$/, "");
const host = new URL(baseUrl).host;

const keyFile = fs.readdirSync(path.join(here, "site-root")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.warn("IndexNow: no key file in site-root/, skipping");
  process.exit(0);
}
const key = keyFile.slice(0, -4);

// Cambodia date, matching the dates in the posts' front matter.
const day = (offset) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh" }).format(new Date(Date.now() - offset * 864e5));
const since = day(2);

const urls = new Set([`${baseUrl}/`]);
const postsDir = path.join(here, "posts");
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
  const post = parsePost(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (!post || post.status !== "published" || !post.slug) continue;
  const changed = [post.date, post.updated].filter(Boolean).sort().pop();
  if (args.has("--all") || changed >= since) urls.add(`${baseUrl}/posts/${post.slug}/`);
}

const body = { host, key, keyLocation: `https://${host}/${keyFile}`, urlList: [...urls] };
console.log(`IndexNow: ${body.urlList.length} URL(s) changed since ${since}`);
if (args.has("--dry-run")) {
  console.log(body.urlList.join("\n"));
  process.exit(0);
}
if (body.urlList.length <= 1 && !args.has("--all")) {
  console.log("IndexNow: no new or updated posts, nothing to send");
  process.exit(0);
}
try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  // 200/202 = accepted; 422 = URLs don't match the host or key; 403 = key file not found yet.
  console.log(`IndexNow: HTTP ${res.status} ${res.statusText}`);
} catch (e) {
  console.warn(`IndexNow: request failed (${e.message})`);
}
