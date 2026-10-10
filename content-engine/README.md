# Content engine

Every morning this generates one **posting pack** for your affiliate niche:

- an **SEO brief**: target keyword, title, meta description, URL slug, image alt text, internal links
- an SEO-structured article (blog or Facebook post) with an FAQ section
- 3 short video scripts (TikTok / YouTube Shorts / Reels) with keyword-first hooks, which you film and post yourself (see [TikTok and YouTube setup](#one-time-tiktok-and-youtube-setup))
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

The workflow in `.github/workflows/daily-content.yml` runs three times a week, on Monday, Wednesday and Friday at 06:17 Cambodia time (23:17 UTC the day before). Topics lean toward the occasions people are planning for at that time of year (Halloween, Thanksgiving, holiday baking and gifts, and so on), which you can edit under `seasons` in `config.json`. To run it immediately, open the Actions tab → "Daily content pack" → Run workflow.

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

Large photos are shrunk automatically when the blog is published, so you can upload them straight from your phone. If Windows hides file extensions, a file renamed to `photo.jpg` may really be `photo.jpg.jpg`. The blog finds it anyway, and the Publish blog log says which file it used.

**A post never goes live if it breaks the rules.** The build skips any published post that still has a **FIX** issue or an unfilled placeholder, and says why in the workflow log. To publish clean posts without approving them, set `"autoPublish": true` in `site.json`, but reviewing each one is safer.

### One-time blog setup

1. Edit `site.json` with your blog name, tagline, author name and About text.
2. Make sure GitHub Pages is on: Settings → Pages → Source: **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**. Your app already uses this.
3. **Tell Google about the blog.** Add a "URL prefix" property for the blog address in [Google Search Console](https://search.google.com/search-console) and choose the "HTML tag" verification method. Paste the `content` value into `googleSiteVerification` in `site.json`, then submit `sitemap.xml` under Sitemaps.
4. **Add the blog URL to Amazon Associates** (Account Settings → Website and Mobile App List).

### One-time Pinterest setup

Each daily pack includes a ready-to-use **Pinterest pin** (title, description, board name), and it's saved onto the matching blog post too (see below). To post pins and have them link back to your blog:

1. **Create a Pinterest business account** (free) at https://www.pinterest.com/business/create/, or convert your existing account under Settings → Account management.
2. **Claim your website.** In Settings → Claim → Claimed accounts, choose the HTML tag method and enter your blog's URL (the `baseUrl` in `site.json`). Pinterest gives you a `content` value - paste it into `pinterestVerification` in `site.json`, then commit and let the **Publish blog** workflow rebuild the site before you click "Submit" on Pinterest.
3. **Check Rich Pins.** The blog already emits the Open Graph tags (`og:title`, `og:description`, `og:image`) Pinterest reads for Rich Pins, so once a post is published, validate its URL at https://developers.pinterest.com/tools/url-debugger/ - no extra markup needed.
4. **Create a board** matching your niche (the pin's suggested board name in each pack is a starting point) and find its **board ID**: open the board on pinterest.com and copy the number from the URL, or list your boards with the API (see below).
5. **Add the blog URL to Amazon Associates** (Account Settings → Website and Mobile App List) if you haven't already, and register Pinterest itself as a channel there too (see [Amazon compliance](#amazon-compliance)).

To post a pin by hand: open the day's pack, copy the Pinterest pin's title and description, upload your own photo (never an Amazon product image), and link it to the published blog post's URL.

### Pin images

Every time the blog is published, `make-pins.mjs` turns each published post's cover photo into **3 vertical Pinterest images** (1000×1500, the size Pinterest favours) with the pin title on top. They're on one page, together with the pin title, description (disclosure included) and link to paste:

**https://putheamak.github.io/my-project/blog/pins/**

1. Open the page on your phone or computer and tap an image to download it.
2. In Pinterest, create a pin with that image and paste the title, description and link shown under it.
3. Pin one design now and the other two a week or two apart. Pinterest treats a new image as a new pin, so each post can be pinned several times.

At the top of the page is a **Pin plan**: extra pins for posts you've already pinned, grouped by day, each with a fresh title and description, the design image to use and the board to pick. Today's group opens first. The plan comes from `pin-queue.json`; the Amazon disclosure is added to each description automatically.

The page isn't linked from the blog and tells search engines not to list it. To make the images on your own computer, run `node make-pins.mjs` (needs the free ImageMagick); they're saved in `dist-blog/pins/`.

### Topic pages

`topics.json` groups posts into topic pages such as "Quick Breakfasts" and "Work Lunches" (one per Pinterest board), at `blog/topics/<name>/`. A published post appears on a topic page when its slug is listed under the topic's `posts`, or when its pin board matches the topic's `board`. Topics without published posts are hidden. The home page links to every topic, and each post ends with links to other posts on the same topic.

### Auto-posting pins with the Pinterest API

`post-pinterest.mjs` can post a post's saved pin straight to a board through the [Pinterest API](https://developers.pinterest.com/docs/api/v5/) - no copy-pasting. It's off by default; nothing is posted until you turn it on.

**Setup:**

1. Create an app at https://developers.pinterest.com/apps/ and request the `pins:write` scope (`boards:read` too, if you want to look up board IDs through the API).
2. Generate an access token for that app (the developer portal's own token generator is the quickest way for a single account; for longer-lived access, work through the OAuth flow to get a refresh token instead).
3. Add secrets to the repo (Settings → Secrets and variables → Actions):
   - `PINTEREST_ACCESS_TOKEN`, or, if you have a refresh token, `PINTEREST_REFRESH_TOKEN` + `PINTEREST_APP_ID` + `PINTEREST_APP_SECRET` (the script refreshes the token before every run when these three are set, since access tokens expire and this saves you from updating the secret by hand). Check your app's dashboard for its actual token lifetime.
4. In `site.json`, set `pinterest.boardId` to the board's ID and `pinterest.autoPost` to `true`.
5. Merge to your default branch. The **Publish blog** workflow runs `post-pinterest.mjs` after every publish.

**What it does and doesn't do:**

- It only pins posts that are `status: "published"` and have a saved `pinTitle`/`pinDescription` (packs generated from here on save these to the post automatically; older posts don't have them - add them to the post's front matter by hand if you want to pin one).
- It re-runs the same compliance check used everywhere else on the pin's title, description and article body, and skips (never pins) anything with a **FIX**-level issue or an unfilled `[LINK: ...]` placeholder. Fix the pack or post and it's picked up on the next run.
- It pins **one post per run** by default, oldest first, so a backlog goes out gradually instead of all at once (which can look like spam). Change `pinterest.maxPerRun` in `site.json` to pin more per run. The Publish blog workflow also runs after each daily pack.
- Every pin description ends with the Amazon disclosure. If the text is longer than Pinterest's 500-character limit, the part before the disclosure is trimmed so the disclosure is never cut off.
- Each post is pinned at most once - `output/pinterest-history.json` tracks which slugs have already gone out, and the workflow commits it back after each run.
- `node post-pinterest.mjs --dry-run` prints what it would post without calling the API, so you can check it locally first.

### One-time TikTok and YouTube setup

Each daily pack has 3 short video scripts. They work on TikTok, YouTube Shorts and Instagram Reels. You film them with your own phone and post them yourself. The videos send people to your blog, and the blog has the product links.

**Before you start:** decide on one handle you can use on both apps, like `smartkitchenpicks`. Use the same profile photo and the same bio on both.

**Bio text you can paste (both apps):**
> Kitchen gadgets under $30 that save time 🍳 Full lists 👇
> As an Amazon Associate I earn from qualifying purchases.

#### TikTok

1. Install the TikTok app and tap **Sign up**. Use your email or phone number, not "Continue with Google", so the account doesn't depend on another login.
2. Tap **Profile** (bottom right) → **Edit profile**. Set your name to "Smart Kitchen Picks", set your username to your handle, and paste the bio.
3. Switch to a free Business account: **Profile** → ☰ menu (top right) → **Settings and privacy** → **Account** → **Switch to Business Account**. Pick a category such as "Home & Garden" or "Food & Beverage". A Business account gives you analytics and a website link in your bio sooner. It can only use sounds from the **Commercial Music Library**, which is fine for these videos.
4. Add your blog as the link: **Edit profile** → **Website** → `https://putheamak.github.io/my-project/blog/`. If there's no **Website** field yet, TikTok hasn't unlocked it for your account. Keep posting and check again later. Until then, say "search Smart Kitchen Picks" in your videos instead of "link in bio".
5. Copy your profile link (**Profile** → ☰ → **Share profile** → **Copy link**). You need it for the last two steps below.

#### YouTube

1. On a computer, go to https://www.youtube.com and sign in with your Google account. Click your profile picture (top right) → **Create a channel**. Set the name to "Smart Kitchen Picks" and the handle to your handle.
2. Verify your phone number at https://www.youtube.com/verify. This unlocks custom thumbnails and longer videos.
3. Open https://studio.youtube.com → **Customization** (left menu) → **Profile**. Paste the bio as the description. Under **Links**, click **Add link**, enter title "Blog" and your blog URL, then click **Publish**. On Shorts, this channel link is the one link viewers can click.
4. Copy your channel link (for example `https://www.youtube.com/@smartkitchenpicks`).

#### Connect everything (do this for both)

1. **Amazon Associates:** go to Associates Central → your name (top right) → **Account Settings** → **Website and Mobile App List** → **Edit**, and add your TikTok and YouTube profile links. Amazon only allows links on channels listed there.
2. **Blog:** open `site.json` in GitHub, tap the pencil, and paste the links into `social` (for example `"tiktok": "https://www.tiktok.com/@smartkitchenpicks"`). Commit. After the **Publish blog** workflow runs, the blog's footer and About page show "Follow: TikTok · YouTube".

### Posting a video by hand

1. Open the day's pack (`output/YYYY-MM-DD.md`) and pick one script from **Short video scripts**.
2. Film each scene from the table **vertically**, with your own kitchen and gadgets. Never use Amazon product photos or videos.
3. Edit the clips in the TikTok app or a free editor like CapCut. Add the **On-screen text** lines as text overlays, and say the **Hook** out loud in the first 3 seconds, because both apps search what's said and shown.
4. **TikTok:** tap **+**, add the clips, paste the script's **Description** as the caption, and post. Links in captions aren't clickable, so the description points to "link in bio".
5. **YouTube:** in the YouTube app, tap **+** → **Create a Short**, or upload the same video file at https://studio.youtube.com → **Create** → **Upload videos** (vertical videos up to 3 minutes become Shorts). Paste the script's **Title** and **Description**. For "Made for kids?", choose **No**.
6. Post the same video to both apps. That's 3 videos a day at most. One a day is plenty to start with.

The disclosure sentence stays in every description, even when there's no link in it, because the videos promote products you earn from.

**Later: automatic posting.** Both platforms have posting APIs, like Pinterest: the TikTok Content Posting API and the YouTube Data API. Both review your app first. Until it's approved, videos posted through the API stay private. And since you still film each video yourself, only the upload step could be automated. Post by hand for a few weeks first to see which videos do well.

### What's built in for SEO and compliance

- Clean URLs, a title tag and meta description from the SEO brief, a canonical link, and Open Graph tags
- `BlogPosting` and `FAQPage` structured data, so posts can show FAQ answers in Google
- `sitemap.xml`, an RSS feed (`/rss.xml`), and a 404 page
- Affiliate links marked `rel="sponsored nofollow"`, as Google requires
- The Amazon disclosure above every article and in the footer, plus Disclosure, Privacy and About pages
- No external fonts, and one small optional script (GoatCounter), so pages load fast on phones, with light and dark mode
- **Visitor counts:** set `goatcounter` in `site.json` to your GoatCounter account code (for example `"smartkitchenpicks"`) and every page gets a cookie-free counter. See visits, top posts, where readers came from, and clicks on Amazon links at `https://<code>.goatcounter.com`. Leave it empty to turn it off.

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
