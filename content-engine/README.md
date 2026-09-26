# Content engine

Every morning this generates one **posting pack** for your affiliate niche:

- an **SEO brief**: target keyword, title, meta description, URL slug, image alt text, internal links
- an SEO-structured article (blog or Facebook post) with an FAQ section
- 3 short video scripts (TikTok / YouTube Shorts / Reels) with keyword-first hooks
- a caption for each platform, and a Pinterest pin
- an **automatic Amazon compliance report** at the top
- a checklist of what to fill in before you post

The pack is saved to `output/YYYY-MM-DD.md`. **You read it, fix anything the report flags, add your links, and post it yourself.** Nothing is posted automatically.

The article is also saved as a **blog draft** in `posts/`. It goes live on your free blog only after you approve it (see [Your blog](#your-blog)).

## One-time setup

1. **Get a Claude API key** at https://console.anthropic.com and add some credit. One pack costs roughly $0.10–0.30 with the default model.
2. **Add the key to GitHub.** In the repo, go to Settings → Secrets and variables → Actions → New repository secret. Name it `ANTHROPIC_API_KEY`.
3. **Edit `config.json`:**
   - `niche` and `audience`: what you post about and who it's for
   - `targetKeywords`: optional keyword ideas you've already checked, for example `["garlic press for small hands"]`
   - `language`: for example `"English"` or `"Khmer"`. The Amazon disclosure always stays in English.
   - `products`: your real affiliate links (amzn.to or amazon.com), with short notes from your own experience. Delete the `EXAMPLE` entry. When there are no products, the packs use `[LINK: ...]` placeholders for you to fill in.
   - `model`: `claude-opus-5` by default. `claude-sonnet-5` is cheaper, and `claude-haiku-4-5` is the cheapest.
4. **Merge this into your default branch.** GitHub only runs scheduled workflows from the default branch.

The workflow in `.github/workflows/daily-content.yml` runs every day at 06:17 Cambodia time (23:17 UTC). To run it immediately, open the Actions tab → "Daily content pack" → Run workflow.

## Amazon compliance

The engine is instructed to follow the Amazon Associates rules, and `compliance.mjs` then scans every pack. Anything it finds goes into a table at the top of the pack:

- **FIX**: very likely a violation. This covers specific prices, star ratings, review counts, "Best Seller" or "Amazon's Choice" badges, non-Amazon link shorteners like bit.ly, and a missing or late disclosure.
- **CHECK**: needs a human look. This covers sale or discount claims, possible incentives ("use my link"), possible health claims, other links, and unfilled `[LINK: ...]` placeholders.

After editing a pack, re-run the check and refresh its report:

```bash
node compliance.mjs output/2026-09-27.md
```

The checker is a safety net, not legal advice. These rules are also your responsibility:

- **Register every channel** (website, TikTok, YouTube, Pinterest, Facebook page) in Associates Central → Account Settings → Website and Mobile App List. Only post links on channels you've listed.
- **Make 3 qualifying sales within 180 days** of signing up, or Amazon closes the account and you can reapply.
- **Use your own photos and video.** Only use Amazon product images through SiteStripe or the Product Advertising API.
- **Never put affiliate links** in emails, PDFs, ebooks, private messages, or printed material.
- **Don't buy through your own links.** Those purchases don't count, and they can get your account flagged.
- Re-read the [Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement) and the program policies every few months, since they change.

## SEO in each pack

- **One long-tail buying keyword per day**, like "best ... for ...", "... vs ...", or "how to ... without ...". New sites can rank for these, but broad terms like "kitchen gadgets" are too competitive.
- **Check the keyword** before posting. Type it into Google, YouTube, and Pinterest search and look at the autocomplete suggestions. The engine has no search-volume data, so treat its keywords as ideas.
- The article has the keyword in the title and first 100 words, buyer-question H2s, a comparison table, and an FAQ section, which helps it appear in "People also ask".
- Video hooks say the keyword out loud and show it on screen, because TikTok and YouTube search read both.
- On your blog, set the SEO title, meta description, and slug from the brief, and add the internal links it suggests.

## Your blog

A free, fast blog hosted on GitHub Pages at **https://putheamak.github.io/my-project/blog/**, next to your existing app.

### Publishing a post (from your phone or computer)

1. Open the day's draft in GitHub: `content-engine/posts/YYYY-MM-DD-<slug>.md`.
2. Tap the pencil icon. Replace any `[LINK: ...]` placeholders with your real Amazon links and fix anything the compliance report flagged.
3. Change `status: "draft"` to `status: "published"` (quotes optional) and commit.
4. The **Publish blog** workflow rebuilds and publishes the site within about a minute.

### Adding photos

Use **your own photos** (take them on your phone) or free stock photos from Unsplash or Pexels. **Never download pictures from Amazon product pages.** Amazon only allows its images through SiteStripe or its API, and the compliance check flags copied ones.

1. In GitHub, open `content-engine/images/` → **Add file** → **Upload files**. Upload a photo with a short name and no spaces, like `garlic-press.jpg`, and commit.
2. In the post file, add or edit the `image:` line near the top: `image: images/garlic-press.jpg`. This is the cover photo, shown at the top and used when the post is shared on Facebook or Pinterest.
3. To put a photo inside the article, add a line like this where you want it:
   `![Garlic press on a kitchen counter](images/garlic-press.jpg)`
   The text in `[ ]` is the alt text. Describe the photo, since Google reads it. The SEO brief suggests some.

Keep photos under about 300 KB so pages stay fast. Most phones can export a "medium" size.

**A post never goes live if it breaks the rules.** The build skips any published post that still has a **FIX** issue or an unfilled placeholder, and says why in the workflow log. To publish clean posts without approving them, set `"autoPublish": true` in `site.json`, but reviewing each one is safer.

### One-time blog setup

1. Edit `site.json` with your blog name, tagline, author name and About text.
2. Make sure GitHub Pages is on: Settings → Pages → Source: **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**. Your app already uses this.
3. **Tell Google about the blog.** Add a "URL prefix" property for the blog address in [Google Search Console](https://search.google.com/search-console) and choose the "HTML tag" verification method. Paste the `content` value into `googleSiteVerification` in `site.json`, then submit `sitemap.xml` under Sitemaps.
4. **Add the blog URL to Amazon Associates** (Account Settings → Website and Mobile App List).

### What's built in for SEO and compliance

- Clean URLs, a title tag and meta description from the SEO brief, a canonical link, and Open Graph tags
- `BlogPosting` and `FAQPage` structured data, so posts can show FAQ answers in Google
- `sitemap.xml`, an RSS feed (`/rss.xml`), and a 404 page
- Affiliate links marked `rel="sponsored nofollow"`, as Google requires
- The Amazon disclosure above every article and in the footer, plus Disclosure, Privacy and About pages
- No external fonts or scripts, so pages load fast on phones, with light and dark mode

To preview locally, run `node build-blog.mjs` and open the files in `dist-blog/`.

**Later: your own domain.** Once you have sales, buy a domain (about $10–15 a year), point it at a GitHub Pages site, and change `baseUrl` in `site.json`. Google reads `robots.txt` only at the root of a domain, so that file only takes effect once you have your own domain.

## Run it on your own computer

```bash
cd content-engine
npm install
node generate.mjs --dry-run   # show the prompt; no API call, no cost
ANTHROPIC_API_KEY=sk-ant-... node generate.mjs
```

Add `--force` to regenerate today's pack.
