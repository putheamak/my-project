// Builds the static blog from posts/*.md into dist-blog/.
// Only posts with "status: published" that pass the compliance check go live.
//
//   node build-blog.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markdownToHtml, escapeHtml, stripMarkdown } from "./lib/markdown.mjs";
import { parsePost } from "./lib/post.mjs";
import { checkCompliance } from "./compliance.mjs";
import { resolveImage } from "./lib/images.mjs";
import { loadTopics, topicsWithPosts } from "./lib/topics.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const { disclosure } = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
const postsDir = path.join(here, "posts");
const imagesDir = path.join(here, "images");
const dist = path.join(here, "dist-blog");

const baseUrl = site.baseUrl.replace(/\/+$/, "");
const basePath = new URL(baseUrl).pathname.replace(/\/+$/, "");
const url = (p = "") => `${baseUrl}/${p}`;
const href = (p = "") => `${basePath}/${p}`;
const esc = escapeHtml;

// Social profiles from site.json, shown in the footer and on the About page once filled in.
const socialNames = { tiktok: "TikTok", youtube: "YouTube", pinterest: "Pinterest" };
const socials = Object.entries(site.social ?? {})
  .filter(([key, link]) => socialNames[key] && /^https:\/\//.test(link ?? ""))
  .map(([key, link]) => `<a href="${esc(link)}" rel="me noopener">${socialNames[key]}</a>`);

// ---- Load and filter posts -------------------------------------------------

const posts = [];
for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir).sort() : []) {
  if (!file.endsWith(".md")) continue;
  const post = parsePost(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (!post) {
    console.warn(`skip ${file}: no front matter`);
    continue;
  }
  if (post.status !== "published") continue;
  const blocking = checkCompliance(post.body, disclosure).filter(
    (i) => i.level === "FIX" || i.found.includes("placeholder"),
  );
  if (blocking.length) {
    console.warn(`skip ${file}: ${blocking.map((i) => i.found).join(", ")} - run: node compliance.mjs posts/${file}`);
    continue;
  }
  posts.push(post);
}
posts.sort((a, b) => b.date.localeCompare(a.date));
const topics = topicsWithPosts(loadTopics(here), posts);

// ---- Templates --------------------------------------------------------------

const css = `
:root{--bg:#fbfaf7;--surface:#fff;--text:#1d1f21;--muted:#5d6166;--line:#e4e1da;--accent:#b4531f;--accent-soft:#fbeee4}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#141516;--surface:#1c1e20;--text:#ecebe8;--muted:#a3a6aa;--line:#2e3134;--accent:#f0935a;--accent-soft:#2c2019}}
:root[data-theme="dark"]{--bg:#141516;--surface:#1c1e20;--text:#ecebe8;--muted:#a3a6aa;--line:#2e3134;--accent:#f0935a;--accent-soft:#2c2019}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:17px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--accent)}
.wrap{max-width:720px;margin:0 auto;padding:0 16px}
header.site{border-bottom:1px solid var(--line);background:var(--surface)}
header.site .wrap{display:flex;flex-wrap:wrap;gap:8px 20px;align-items:baseline;justify-content:space-between;padding-top:14px;padding-bottom:14px}
.brand{font-weight:700;font-size:1.15rem;color:var(--text);text-decoration:none}
nav a{color:var(--muted);text-decoration:none;margin-left:16px;font-size:.95rem}
nav a:first-child{margin-left:0}
main{padding:28px 0 48px}
h1{font-size:clamp(1.7rem,4.5vw,2.3rem);line-height:1.2;margin:.2em 0 .4em}
h2{font-size:1.4rem;line-height:1.3;margin:1.8em 0 .5em}
h3{font-size:1.15rem;margin:1.4em 0 .4em}
.meta{color:var(--muted);font-size:.9rem}
.disclosure{background:var(--accent-soft);border-left:3px solid var(--accent);padding:10px 14px;font-size:.9rem;border-radius:4px;margin:16px 0 24px}
.picks{background:var(--surface);border:2px solid var(--accent);border-radius:12px;padding:14px 16px;margin:1.2em 0}
.picks-title{margin:0 0 8px;font-weight:700;font-size:1.05rem}
.picks ul{list-style:none;margin:0;padding:0}
.picks li{display:grid;grid-template-columns:1fr auto;gap:2px 12px;align-items:center;padding:10px 0;border-top:1px solid var(--line)}
.picks li:first-child{border-top:0}
.pk-label{grid-column:1;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.03em;color:var(--accent)}
.pk-name{grid-column:1;font-weight:600}
.pk-note{grid-column:1;font-size:.9rem;color:var(--muted)}
.pk-btn{grid-column:2;grid-row:1/span 3;background:var(--accent);color:#fff!important;text-decoration:none;font-weight:700;font-size:.9rem;padding:10px 14px;border-radius:8px;white-space:nowrap;text-align:center}
.pk-btn:hover{filter:brightness(1.1)}
@media (max-width:520px){.picks li{grid-template-columns:1fr}.pk-btn{grid-column:1;grid-row:auto;margin-top:6px}}
article a[rel~="sponsored"]{font-weight:600}
.table-wrap{overflow-x:auto;margin:1em 0}
table{border-collapse:collapse;width:100%;font-size:.95rem}
th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
th{background:var(--surface)}
blockquote{margin:1em 0;padding:4px 16px;border-left:3px solid var(--line);color:var(--muted)}
code{background:var(--surface);padding:1px 5px;border-radius:3px}
img{max-width:100%;height:auto;display:block;border-radius:8px;margin:1em 0}
article p img{width:100%;aspect-ratio:3/2;object-fit:cover}
.cover{margin:0 0 20px}
.post-list{list-style:none;padding:0;margin:0}
.cards{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:20px}
@media (min-width:600px){.cards{grid-template-columns:1fr 1fr}.cards.feature>li:first-child{grid-column:1/-1}}
.cards li{background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:transform .15s,box-shadow .15s}
.cards li:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.08)}
.cards a{display:block;color:var(--text);text-decoration:none;height:100%}
.cards img{margin:0;border-radius:0;width:100%;aspect-ratio:16/10;object-fit:cover}
.cards.feature>li:first-child img{aspect-ratio:2/1}
.cards .ph{aspect-ratio:16/10;background:var(--accent-soft)}
.cards .txt{padding:12px 16px 16px}
.cards .title{display:block;font-size:1.1rem;font-weight:650;line-height:1.3}
.cards.feature>li:first-child .title{font-size:1.3rem}
.cards a:hover .title{color:var(--accent)}
.cards .txt p{margin:.4em 0 0;color:var(--muted);font-size:.93rem;line-height:1.5}
.tag{display:inline-block;font-size:.75rem;font-weight:650;letter-spacing:.04em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
.sec{font-size:1.25rem;margin:28px 0 10px}
.shop{margin:0 0 8px}.shop .sec{margin-top:0}
.shop-intro{margin:0 0 12px;color:var(--muted)}
.disclosure.small{margin:16px 0 0}
.seen .chips{margin-bottom:8px}
.hero{background:var(--accent-soft);border-radius:14px;padding:22px 20px;margin:0 0 22px}
.hero h1{margin:0 0 .3em}
.hero p{margin:0;color:var(--muted)}
.post-list li{padding:18px 0;border-bottom:1px solid var(--line)}
.post-list a.title{font-size:1.2rem;font-weight:650;color:var(--text);text-decoration:none}
.post-list a.title:hover{color:var(--accent)}
.post-list p{margin:.3em 0 0;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 24px;padding:0;list-style:none}
.chips a{display:inline-block;padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:var(--surface);color:var(--text);text-decoration:none;font-size:.9rem}
.chips a:hover{border-color:var(--accent);color:var(--accent)}
.related{margin-top:40px;padding-top:8px;border-top:1px solid var(--line)}
.related h2{font-size:1.2rem}
.related ul{padding-left:20px}
.related ul.cards{padding-left:0}
footer.site{border-top:1px solid var(--line);padding:20px 0 32px;color:var(--muted);font-size:.85rem}
footer.site a{color:var(--muted)}
`;

function page({ title, description, canonical, body, jsonLd = [], type = "website", image = "" }) {
  const verify = site.googleSiteVerification
    ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">`
    : "";
  const pinterestVerify = site.pinterestVerification
    ? `<meta name="p:domain_verify" content="${esc(site.pinterestVerification)}">`
    : "";
  // GoatCounter: cookie-free visitor counts. Only the account code goes in site.json.
  const gc = /^[a-z0-9-]+$/.test(site.goatcounter || "") ? site.goatcounter : "";
  const analytics = gc
    ? `<script data-goatcounter="https://${gc}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`
    : "";
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  return `<!doctype html>
<html lang="${esc(site.language)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(site.title)}">
${image ? `<meta property="og:image" content="${esc(image)}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="${esc(site.title)}" href="${href("rss.xml")}">
${verify}
${pinterestVerify}
${analytics}
<style>${css}</style>
${ld}
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="${href()}">${esc(site.title)}</a>
<nav><a href="${href()}">Home</a>${topics.length ? `<a href="${href("topics/")}">Topics</a>` : ""}<a href="${href("about/")}">About</a><a href="${href("disclosure/")}">Disclosure</a></nav>
</div></header>
<main><div class="wrap">
${body}
</div></main>
<footer class="site"><div class="wrap">
<p>${esc(disclosure)}</p>
${socials.length ? `<p>Follow: ${socials.join(" · ")}</p>\n` : ""}<p>&copy; ${new Date().getUTCFullYear()} ${esc(site.title)} · <a href="${href("disclosure/")}">Affiliate disclosure</a> · <a href="${href("privacy/")}">Privacy</a> · <a href="${href("rss.xml")}">RSS</a></p>
</div></footer>
</body>
</html>
`;
}

function faqFromBody(body) {
  const m = body.match(/^###\s+(?:frequently asked questions|faqs?)\b.*$/im);
  if (!m) return [];
  const rest = body.slice(m.index + m[0].length);
  const end = rest.search(/^#{1,3}\s/m);
  const block = end === -1 ? rest : rest.slice(0, end);
  const faqs = [];
  for (const part of block.split(/^####\s+/m).slice(1)) {
    const nl = part.indexOf("\n");
    const q = stripMarkdown(part.slice(0, nl === -1 ? undefined : nl));
    const a = stripMarkdown(nl === -1 ? "" : part.slice(nl + 1));
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

const dateLabel = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const topicHref = (t) => href(`topics/${t.slug}/`);
// Cover photo path for a post (site-relative), or "" when it has none.
const coverOf = (p) =>
  !p.image ? "" : /^https?:\/\//.test(p.image) ? p.image : href(resolveImage(imagesDir, p.image, p.slug));
const topicOf = (p) => topics.find((t) => t.posts.includes(p));
// Post cards with the cover photo. "feature" makes the first card full width.
const postItems = (list, { feature = false, short = false } = {}) =>
  `<ul class="cards${feature ? " feature" : ""}">${list.map((p, i) => {
    const img = coverOf(p);
    const tag = topicOf(p);
    return `<li><a href="${href(`posts/${p.slug}/`)}">${img ? `<img src="${esc(img)}" alt="" loading="${i < 3 ? "eager" : "lazy"}">` : '<div class="ph"></div>'}
<div class="txt">${tag ? `<span class="tag">${esc(tag.title)}</span>` : ""}<span class="title">${esc(p.title)}</span>${!short && p.description ? `<p>${esc(p.description)}</p>` : ""}</div></a></li>`;
  }).join("\n")}</ul>`;
const topicChips = (list) =>
  `<ul class="chips">${list.map((t) => `<li><a href="${topicHref(t)}">${esc(t.title)}</a></li>`).join("")}</ul>`;

// "More in <topic>" under each post: up to 4 other posts from the post's topics.
function related(post) {
  const mine = topics.filter((t) => t.posts.includes(post));
  if (!mine.length) return "";
  const others = [...new Set(mine.flatMap((t) => t.posts))].filter((p) => p !== post).slice(0, 4);
  return `<section class="related">
<h2>More in ${mine.map((t) => `<a href="${topicHref(t)}">${esc(t.title)}</a>`).join(" · ")}</h2>
${others.length ? postItems(others, { short: true }) : ""}
</section>`;
}

// Home page shop (site.json "home"): most visitors type the domain from a video
// and land here, so put the season's posts, a few picks with Amazon buttons and
// the posts behind recent videos above the full list.
function homeShop() {
  const home = site.home ?? {};
  const bySlug = (slug) => posts.find((p) => p.slug === slug);
  const featured = (home.posts ?? []).map(bySlug).filter(Boolean);
  const picks = (home.picks ?? []).filter((x) => /^https:\/\//.test(x.url ?? ""));
  const videos = (home.videoPosts ?? []).map((v) => ({ ...v, post: bySlug(v.slug) })).filter((v) => v.post);
  const shop = featured.length || picks.length
    ? `<section class="shop">
${home.title ? `<h2 class="sec">${esc(home.title)}</h2>` : ""}${home.intro ? `<p class="shop-intro">${esc(home.intro)}</p>` : ""}
${featured.length ? postItems(featured, { short: true }) : ""}
${picks.length ? `<p class="disclosure small">${esc(disclosure)} <a href="${href("disclosure/")}">Learn more</a>.</p>
${markdownToHtml(`:::picks\n${picks.map((x) => `- ${x.label}: [${x.name}](${x.url})`).join("\n")}\n:::`)}` : ""}
</section>`
    : "";
  const seen = videos.length
    ? `<section class="seen"><h2 class="sec">Seen one of my videos? Find the post here</h2>
<ul class="chips">${videos.map((v) => `<li><a href="${href(`posts/${v.post.slug}/`)}">${esc(v.label || v.post.title)}</a></li>`).join("")}</ul></section>`
    : "";
  return shop + seen;
}

// Photos inside a post: a missing file is skipped quietly, so photo spots can be
// written into posts before the owner uploads the pictures.
function inlinePhoto(src, slug) {
  const rel = resolveImage(imagesDir, src, slug);
  return rel.startsWith("images/") && !fs.existsSync(path.join(here, rel)) ? null : rel;
}

// ---- Write the site ---------------------------------------------------------

fs.rmSync(dist, { recursive: true, force: true });
if (fs.existsSync(imagesDir)) fs.cpSync(imagesDir, path.join(dist, "images"), { recursive: true });
const write = (p, content) => {
  const file = path.join(dist, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

for (const post of posts) {
  // The disclosure box is added by the template, so drop the article's own copy.
  const body = post.body
    .split("\n")
    .filter((l) => l.replace(/[*_]/g, "").trim() !== disclosure)
    .join("\n");
  const description = post.description || stripMarkdown(body).slice(0, 155);
  const canonical = url(`posts/${post.slug}/`);
  const faqs = faqFromBody(body);
  // Cover image: "image: images/photo.jpg" in the post header (or a full https URL).
  const isRemote = /^https?:\/\//.test(post.image ?? "");
  const imagePath = isRemote ? "" : resolveImage(imagesDir, post.image ?? "", post.slug);
  const cover = post.image ? (isRemote ? post.image : url(imagePath)) : "";
  const coverSrc = post.image ? (isRemote ? post.image : href(imagePath)) : "";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Person", name: site.author },
      mainEntityOfPage: canonical,
      ...(cover ? { image: cover } : {}),
      ...(post.keyword ? { keywords: post.keyword } : {}),
    },
  ];
  if (faqs.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }
  write(
    `posts/${post.slug}/index.html`,
    page({
      title: post.seoTitle || post.title,
      description,
      canonical,
      type: "article",
      image: cover,
      jsonLd,
      body: `<article>
<p class="meta"><time datetime="${esc(post.date)}">${dateLabel(post.date)}</time> · ${esc(site.author)}</p>
<h1>${esc(post.title)}</h1>
<p class="disclosure">${esc(disclosure)} <a href="${href("disclosure/")}">Learn more</a>.</p>
${coverSrc ? `<img class="cover" src="${esc(coverSrc)}" alt="${esc(post.title)}">` : ""}
${markdownToHtml(body, { headingShift: 1, imageBase: href(), resolveImage: (src) => inlinePhoto(src, post.slug) })}
${related(post)}
</article>`,
    }),
  );
}

write(
  "index.html",
  page({
    title: `${site.title} - ${site.tagline}`,
    description: site.tagline,
    canonical: url(),
    jsonLd: [{ "@context": "https://schema.org", "@type": "WebSite", name: site.title, alternateName: ["Home Picks Under 30", "homepicksunder30.com"], url: url() }],
    body: `<section class="hero"><h1>${esc(site.tagline)}</h1>
<p>Kitchen and home gadgets under $30 for busy people, grouped by the job they do and compared side by side.</p></section>
${homeShop()}
${topics.length ? `<h2 class="sec">Browse by topic</h2>\n${topicChips(topics)}` : ""}
${posts.length ? `<h2 class="sec">All posts</h2>\n${postItems(posts, { feature: true })}` : "<p>New posts are coming soon.</p>"}`,
  }),
);

// Topic pages: one per theme, plus an index of all topics.
for (const t of topics) {
  const canonical = url(`topics/${t.slug}/`);
  write(
    `topics/${t.slug}/index.html`,
    page({
      title: `${t.title} - ${site.title}`,
      description: t.intro,
      canonical,
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t.title,
        description: t.intro,
        url: canonical,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: t.posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: url(`posts/${p.slug}/`), name: p.title })),
        },
      }],
      body: `<h1>${esc(t.title)}</h1>
<p>${esc(t.intro)}</p>
${postItems(t.posts)}
<p class="meta">More topics:</p>
${topicChips(topics.filter((o) => o !== t))}`,
    }),
  );
}
if (topics.length) {
  write(
    "topics/index.html",
    page({
      title: `Topics - ${site.title}`,
      description: `Browse ${site.title} posts by topic.`,
      canonical: url("topics/"),
      body: `<h1>Topics</h1>
<ul class="post-list">${topics.map((t) => `<li><a class="title" href="${topicHref(t)}">${esc(t.title)}</a>
<p>${esc(t.intro)}</p><p class="meta">${t.posts.length} post${t.posts.length === 1 ? "" : "s"}</p></li>`).join("\n")}</ul>`,
    }),
  );
}

const simple = (slug, title, description, html) =>
  write(`${slug}/index.html`, page({ title: `${title} - ${site.title}`, description, canonical: url(`${slug}/`), body: `<h1>${esc(title)}</h1>\n${html}` }));

simple("about", "About", `About ${site.title}`, `<p>${esc(site.about)}</p>${socials.length ? `\n<p>Short videos and more: ${socials.join(" · ")}</p>` : ""}`);

simple("disclosure", "Affiliate disclosure", "How this site earns money", `
<p><strong>${esc(disclosure)}</strong></p>
<p>Some links on this site are affiliate links. If you click one and buy something, I may earn a small commission at no extra cost to you. This never changes what I write about a product.</p>
<p>Prices and availability change often, so always check the current details on the retailer's site before you buy.</p>`);

simple("privacy", "Privacy policy", `Privacy policy for ${site.title}`, `
<p>This site does not use its own cookies and does not collect personal information from visitors.</p>
<p>When you click a link to Amazon or another retailer, that site may set cookies to track the referral, as described in its own privacy policy. As a participant in the Amazon Services LLC Associates Program, this site links to Amazon, and Amazon may collect information about your visit.</p>
${site.goatcounter ? `<p>To see which posts people read, this site counts visits with <a href="https://www.goatcounter.com">GoatCounter</a>. It does not use cookies or collect personal information; it records only the page visited, the referring site, and general browser, device and country details.</p>\n` : ""}<p>The site is hosted on GitHub Pages, which may log basic technical information such as IP addresses for security. See GitHub's privacy statement for details.</p>
<p>Questions? Contact ${esc(site.author)} through the channels listed on the About page.</p>`);

write("404.html", page({ title: `Page not found - ${site.title}`, description: "Page not found", canonical: url(), body: `<h1>Page not found</h1><p><a href="${href()}">Go to the home page</a>.</p>` }));

const staticPages = ["", "about/", "disclosure/", "privacy/"];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...staticPages.map((p) => `<url><loc>${esc(url(p))}</loc></url>`),
  ...(topics.length ? ["topics/", ...topics.map((t) => `topics/${t.slug}/`)] : []).map((p) => `<url><loc>${esc(url(p))}</loc></url>`),
  ...posts.map((p) => `<url><loc>${esc(url(`posts/${p.slug}/`))}</loc><lastmod>${esc(p.date)}</lastmod></url>`),
].join("\n")}
</urlset>
`,
);

write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${url("sitemap.xml")}\n`);

write(
  "rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.title)}</title>
<link>${esc(url())}</link>
<description>${esc(site.tagline)}</description>
${posts.slice(0, 30).map((p) => `<item><title>${esc(p.title)}</title><link>${esc(url(`posts/${p.slug}/`))}</link><guid>${esc(url(`posts/${p.slug}/`))}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description || "")}</description></item>`).join("\n")}
</channel></rss>
`,
);

console.log(`Built ${posts.length} post(s) into ${path.relative(process.cwd(), dist) || "."}`);
