# Smart Kitchen Picks: notes for the next chat

Read this first. Last updated 10 Oct 2026.

## The project
- **Blog:** https://putheamak.github.io/my-project/blog/. The affiliate niche is kitchen gadgets under $30, and Amazon Associates is the affiliate program.
- **Owner:** a beginner, so explain each step simply. Give clickable steps for GitHub, Pinterest and Amazon.
- **Engine:** the "Daily content pack" workflow runs **3 times a week, Mon/Wed/Fri at 06:17 Cambodia time** (23:17 UTC Sun/Tue/Thu; changed 10 Oct, owner's choice). It steers topics toward upcoming occasions from `config.json` → `seasons` (Halloween, Thanksgiving, holiday baking, gifts …) and picks boards from `topics.json`. It writes `output/YYYY-MM-DD.md` (the posting pack) and `posts/YYYY-MM-DD-<slug>.md` (a blog draft, `status: "draft"`).
- **Publishing:** merging to `main` triggers the "Publish blog" workflow. It builds the site, shrinks photos, makes pin images and deploys to GitHub Pages.

## Current status
- **16 posts:** 15 live (Sep 26 to Oct 10) and 1 draft gift guide (`2026-11-03-kitchen-gifts-under-30.md`). Every live post has a cover photo.
- **38 products** in `config.json`. Every note says "Haven't used it yet".
- **Pinterest:** all 15 live posts are pinned by hand and listed in `output/pinterest-history.json` (`pinId: "manual"`). Extra design pins of an already-pinned post don't need recording.
- **Pin images page:** https://putheamak.github.io/my-project/blog/pins/. `make-pins.mjs` makes 3 designs per post (1000×1500), and the page has Copy buttons for the title, description and link. The page is noindex.
- **Pinterest auto-posting is OFF.** The owner chose to pin by hand. See "Pinterest API" below before suggesting it again.
- **Analytics:** GoatCounter at https://smartkitchenpicks.goatcounter.com. Real outside traffic is close to zero so far, because most counted visits are the owner's. The owner was told to open `<blog>/#toggle-goatcounter` once on each browser to stop counting their own visits.
- **Social:** TikTok @smartkitchenpicks8 and the YouTube channel are set in `site.json`. No videos posted yet (automatic slideshow videos added 10 Oct, see below). Shot lists were written for the Oct 6 scripts 1 (ramen) and 2 (grilled cheese).

## Daily routine (what the owner expects)
1. The owner says "review the <date> draft". Read the post and the `output/` pack, and run the compliance check (see Rules).
2. Fix problems, link 2–3 related posts with full URLs (`https://putheamak.github.io/my-project/blog/posts/<slug>/`), and soften claims the owner can't back up.
3. Optionally give 5–10 Amazon search keywords as **plain text only**. The owner asked (8 Oct): no amazon.com links or search URLs, and don't visit Amazon yourself. They search and pick products on their own. The owner sends products as `Oct X - product name - amzn.to link`, one per message. **Wait for "go"** before editing.
4. On "go": add the products to the post (text plus comparison table) and to `config.json` (note "Haven't used it yet. Picked it for …"). Then check, commit, push and open a PR.
5. Also add 2 fresh extra pins for the new post to `pin-queue.json` (dated about 5 and 10 days later, design 2 and 3, topic board), and if the post's `pinBoard` doesn't match a topic in `topics.json`, add its slug to the right topic.
6. The owner merges, uploads a cover photo to `content-engine/images/`, sets `image:` and `status: "published"` on `main` themselves, and pins by hand from the pins page. When they say "pinned", add the slug to `output/pinterest-history.json` if it isn't there yet (in a PR).

## Rules (Amazon compliance and honesty)
- The disclosure "As an Amazon Associate I earn from qualifying purchases." goes before the first link and in every pin description.
- No prices, star ratings, review counts, badges or "% off". "Under $30" is allowed, but **"under-$30" with a hyphen is flagged as FIX** (the checker's exclude rule needs a space).
- The owner hasn't used any product, so never claim results. Write "designed for", "the listing says", "sold as".
- Health words ("healthy", "non-toxic", "BPA-free") are left out of product names.
- Pin descriptions must be **≤ 500 characters**, with the disclosure included.
- Remind the owner to check that a product is under $30 when it might not be (brands like Stasher, S'well, Bodum, Magic Bullet).
- Never use Amazon product images. Cover photos are the owner's own, or from Unsplash or Pexels.

## Topic pages (added 10 Oct)
- `topics.json` lists the blog's topic pages (`/blog/topics/<slug>/`), one per Pinterest board. A published post joins a topic if its slug is listed or its `pinBoard` equals the topic's `board`. Empty topics (Halloween, Thanksgiving, holiday baking, gifts until Nov 3) stay hidden until a post joins.
- Each post page ends with "More in <topic>" links, the home page shows topic chips, and topic pages are in the sitemap.

## Short videos (added 10 Oct, option A)
- `make-videos.mjs` (run by the Publish blog workflow) makes a silent 20 s 1080×1920 video per published post: cover photo + slow zoom, hook (pin title), up to 5 rows from the comparison table, end card with "link in bio" and the disclosure. They're on the pins page with a download button and caption. The owner uploads them by hand and adds a sound in the app.
- Only new or changed posts are rendered (about 1 min each); `pins/videos.json` on the live site holds a key per post, and gh-pages `keep_files` keeps older mp4s. Bump `VERSION` in `make-videos.mjs` to remake all after a design change.
- Option B (Pexels stock clips per gadget, needs a free Pexels API key secret) is wanted **later**; the owner said "B will be later".

## Technical gotchas
- **Run `node compliance.mjs` on a copy in the scratchpad, never on `posts/*.md`.** It prepends a report above the front matter and breaks the post.
- `build-blog.mjs` skips published posts with a FIX issue. Test publishing locally by temporarily setting the status to published, then restore the file.
- The Publish blog workflow runs only for changes under `posts/`, `images/`, `site.json`, `config.json`, `topics.json`, `pin-queue.json`, `build-blog.mjs`, `compliance.mjs`, `lib/`, `make-pins.mjs`, `make-videos.mjs`, and `.github/workflows/blog.yml`, or after the daily pack. It can also be run by hand from the Actions tab.
- The daily-content and blog workflows push straight to `main`. **Never suggest a "require pull request" rule** for `main`. A ruleset with only "Restrict deletions" and "Block force pushes" is fine.
- `resolveImage` tolerates `photo.jpg.jpg` uploads.
- Branches: do the work on a Claude branch and open a PR. The owner merges. Branch from the latest `origin/main` each time, because the owner often commits on `main` directly (photos, publish status). The old branch `claude/sleepy-edison-duvvrm` has one unmerged commit of the owner's; don't force-push it.

## Pinterest API (for later)
- App "Smart Kitchen Picks Auto-poster", App ID 1616787, status "Production Limited". The approved account is Smart Kitchen Picks (@makputhea).
- The portal's "Generate token" button gives **read-only** scopes and is tied to the owner's *personal* account, whose boards are cakes and similar. It's not usable for posting.
- For posting: run the OAuth flow logged in as Smart Kitchen Picks (redirect URI `https://putheamak.github.io/my-project/blog/`, scopes `boards:read,pins:read,pins:write`). Exchange the code with PowerShell, then save the `PINTEREST_REFRESH_TOKEN`, `PINTEREST_APP_ID` and `PINTEREST_APP_SECRET` secrets. Then set `pinterest.boardId` and `autoPost: true` in `site.json`.
- The owner found the setup confusing. Only restart it if they ask, one step at a time. **Never ask for or display tokens or the app secret.**

## Pinterest boards (suggested 8 Oct)
The owner has used one board, "Kitchen Gadgets" (suggested rename: "Kitchen Gadgets Under $30"). Board descriptions were given in chat. Put each pin on the topic board below, and save it to "Kitchen Gadgets Under $30" as well if the owner wants.
- **Easy Weeknight Dinner Ideas:** Sep 26, Oct 2, Oct 8
- **Meal Prep & Leftover Ideas:** Sep 27, Sep 30, Oct 1
- **Quick Breakfast Ideas:** Sep 29, Oct 4
- **Work Lunch Ideas:** Oct 6, Oct 7
- **Microwave Meals & No-Stove Cooking:** Oct 3, Oct 6, Oct 8
- **Cooking for One & Small Kitchens:** Sep 28, Oct 5
- **Kitchen Gift Ideas Under $30:** Nov 3 gift guide
- **Movie Night Snack Ideas** (added 9 Oct): Oct 9, Oct 10

## Upcoming
- **Pin drafts in Pinterest:** 2 for Oct 7 and 2 for Oct 6. Publish one per post around Oct 14 and the rest around Oct 21. Drafts expire after 30 days.
- **Pinning plan:** extra pins now come from `pin-queue.json`, shown as a dated "Pin plan" at the top of the pins page (today's group opens first; 3 a day, Oct 11–20 queued on 10 Oct). Each entry has a fresh title and description, the design number and the board; the disclosure is added automatically. Extend the queue before it runs out. Already used before the queue: design 2 of Sep 29, Oct 1, Oct 2, Oct 3, Oct 4, Oct 5 and design 3 of Oct 3. Pins for Oct 9 need "Mark as AI-Modified" (the page says so). Extra pins don't go in `pinterest-history.json`.
- **About Nov 1:** "refresh the gift guide". Re-check products and prices, add new products if wanted, and publish Nov 3 with a cover photo. Pin weekly to a new board, "Kitchen Gift Ideas Under $30", before Black Friday (Nov 27) and Cyber Monday.
- **Ideas offered but not done yet:**
  - (B) extra pin titles and descriptions per post for re-pinning
  - (C) topic pages on the blog
  - a shot list for Oct 6 video script 3
  - buying 1–2 cheap gadgets to write real hands-on posts, which is the biggest long-term traffic lever
