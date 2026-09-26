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
.table-wrap{overflow-x:auto;margin:1em 0}
table{border-collapse:collapse;width:100%;font-size:.95rem}
th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
th{background:var(--surface)}
blockquote{margin:1em 0;padding:4px 16px;border-left:3px solid var(--line);color:var(--muted)}
code{background:var(--surface);padding:1px 5px;border-radius:3px}
img{max-width:100%;height:auto;display:block;border-radius:8px;margin:1em 0}
.cover{margin:0 0 20px}
.post-list{list-style:none;padding:0;margin:0}
.post-list li{padding:18px 0;border-bottom:1px solid var(--line)}
.post-list a.title{font-size:1.2rem;font-weight:650;color:var(--text);text-decoration:none}
.post-list a.title:hover{color:var(--accent)}
.post-list p{margin:.3em 0 0;color:var(--muted)}
footer.site{border-top:1px solid var(--line);padding:20px 0 32px;color:var(--muted);font-size:.85rem}
footer.site a{color:var(--muted)}
`;

function page({ title, description, canonical, body, jsonLd = [], type = "website", image = "" }) {
  const verify = site.googleSiteVerification
    ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">`
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
<link rel="alternate" type="application/rss+xml" title="${esc(site.title)}" href="${href("rss.xml")}">
${verify}
<style>${css}</style>
${ld}
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="${href()}">${esc(site.title)}</a>
<nav><a href="${href()}">Home</a><a href="${href("about/")}">About</a><a href="${href("disclosure/")}">Disclosure</a></nav>
</div></header>
<main><div class="wrap">
${body}
</div></main>
<footer class="site"><div class="wrap">
<p>${esc(disclosure)}</p>
<p>&copy; ${new Date().getUTCFullYear()} ${esc(site.title)} · <a href="${href("disclosure/")}">Affiliate disclosure</a> · <a href="${href("privacy/")}">Privacy</a> · <a href="${href("rss.xml")}">RSS</a></p>
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
  const imagePath = (post.image ?? "").replace(/^\.?\//, "");
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
${markdownToHtml(body, { headingShift: 1, imageBase: href() })}
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
    jsonLd: [{ "@context": "https://schema.org", "@type": "WebSite", name: site.title, url: url() }],
    body: `<h1>${esc(site.tagline)}</h1>
${posts.length
  ? `<ul class="post-list">${posts.map((p) => `<li><a class="title" href="${href(`posts/${p.slug}/`)}">${esc(p.title)}</a>
<p class="meta">${dateLabel(p.date)}</p>${p.description ? `<p>${esc(p.description)}</p>` : ""}</li>`).join("\n")}</ul>`
  : "<p>New posts are coming soon.</p>"}`,
  }),
);

const simple = (slug, title, description, html) =>
  write(`${slug}/index.html`, page({ title: `${title} - ${site.title}`, description, canonical: url(`${slug}/`), body: `<h1>${esc(title)}</h1>\n${html}` }));

simple("about", "About", `About ${site.title}`, `<p>${esc(site.about)}</p>`);

simple("disclosure", "Affiliate disclosure", "How this site earns money", `
<p><strong>${esc(disclosure)}</strong></p>
<p>Some links on this site are affiliate links. If you click one and buy something, I may earn a small commission at no extra cost to you. This never changes what I write about a product.</p>
<p>Prices and availability change often, so always check the current details on the retailer's site before you buy.</p>`);

simple("privacy", "Privacy policy", `Privacy policy for ${site.title}`, `
<p>This site does not use its own cookies and does not collect personal information from visitors.</p>
<p>When you click a link to Amazon or another retailer, that site may set cookies to track the referral, as described in its own privacy policy. As a participant in the Amazon Services LLC Associates Program, this site links to Amazon, and Amazon may collect information about your visit.</p>
<p>The site is hosted on GitHub Pages, which may log basic technical information such as IP addresses for security. See GitHub's privacy statement for details.</p>
<p>Questions? Contact ${esc(site.author)} through the channels listed on the About page.</p>`);

write("404.html", page({ title: `Page not found - ${site.title}`, description: "Page not found", canonical: url(), body: `<h1>Page not found</h1><p><a href="${href()}">Go to the home page</a>.</p>` }));

const staticPages = ["", "about/", "disclosure/", "privacy/"];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...staticPages.map((p) => `<url><loc>${esc(url(p))}</loc></url>`),
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
