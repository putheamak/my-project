# Smart Kitchen Picks: notes for the next chat

Read this first. Last updated 12 Oct 2026.

## The project
- **Blog:** https://homepicksunder30.com/blog/. The affiliate niche is kitchen gadgets under $30, and Amazon Associates is the affiliate program.
- **Owner:** a beginner, so explain each step simply. Give clickable steps for GitHub, Pinterest and Amazon.
- **Engine:** the "Daily content pack" workflow runs **3 times a week, Mon/Wed/Fri at 06:17 Cambodia time** (23:17 UTC Sun/Tue/Thu; changed 10 Oct, owner's choice). It steers topics toward upcoming occasions from `config.json` → `seasons` (Halloween, Thanksgiving, holiday baking, gifts …) and picks boards from `topics.json`. It writes `output/YYYY-MM-DD.md` (the posting pack) and `posts/YYYY-MM-DD-<slug>.md` (a blog draft, `status: "draft"`).
- **Publishing:** merging to `main` triggers the "Publish blog" workflow. It builds the site, shrinks photos, makes pin images and deploys to GitHub Pages.

## Current status
- **19 posts, all live** (Sep 26 to Oct 16), including the **Oct 12 post (`2026-10-12-small-kitchen-thanksgiving-gadgets.md`, first seasonal post) published 12 Oct with 10 extra Thanksgiving tools (PRs #53, #55, #56); pinned 12 Oct (design 1 + a video pin, board "Thanksgiving Prep & Hosting"); its video is on TikTok and YouTube Shorts too (12 Oct)**, the **Oct 14 Halloween post** (`2026-10-14-halloween-party-snack-gadgets-under-30.md`, published and pinned 14 Oct to "Halloween Party Food Ideas", 28 product links incl. 10 Halloween treat products; extra pins Oct 19 and 24), the **Oct 16 Thanksgiving gravy post** (`2026-10-16-thanksgiving-mashed-potatoes-gravy-gadgets.md`, published and pinned 16 Oct to "Thanksgiving Prep & Hosting", 20 product links incl. 8 new tools; extra pins Oct 21 and 26), and the gift guide (`2026-10-16-kitchen-gifts-under-30.md`, moved forward from Nov 3 on 16 Oct because Pinterest users plan gifts 45–90 days ahead; new "bakers and holiday hosts" and "everyday home cooks" sections; **published 16 Oct** with `images/gift-guide.jpg`; 26 product links after adding 7 gift products on 16 Oct; pinned 16 Oct to "Kitchen Gift Ideas Under $30"). Gift-guide candidate: the Astercook knife set (check it's under $30). Saved for later in `config.json` but in no post: a shamrock cookie cutter (St. Patrick's Day in March) and a Lifewit spice rack (small kitchens). Every live post has a cover photo.
- **75 products** in `config.json`. Every note says "Haven't used it yet".
- **Pinterest:** all 19 live posts are pinned by hand and listed in `output/pinterest-history.json` (`pinId: "manual"`). Extra design pins of an already-pinned post don't need recording.
- **Pin images page:** https://homepicksunder30.com/blog/pins/. Every pin, plan entry and video pin shows 5 suggested **tagged topics** (from `tags` in `topics.json`; a `pin-queue.json` entry can set its own `tags`; added 13 Oct). `make-pins.mjs` makes 3 designs per post (1000×1500), and the page has Copy buttons for the title, description and link. The page is noindex.
- **Pinterest auto-posting is OFF.** The owner chose to pin by hand. See "Pinterest API" below before suggesting it again.
- **Analytics:** GoatCounter at https://smartkitchenpicks.goatcounter.com. Up to Oct 10 there were 20 visits, almost all the owner's (Cambodia, Windows desktop); real outside traffic is about zero. On 10 Oct the owner added their IP (Ezecom, Phnom Penh) to GoatCounter → Settings → Ignore IPs, so visits from then on are real. Signs of progress to watch: phone visits and pinterest.com/tiktok.com referrers. Ask for a GoatCounter and Pinterest Analytics screenshot each Monday. Expectation set with the owner: Pinterest takes weeks to months, Google 3–6 months.
- **Social:** TikTok @smartkitchenpicks8 and the YouTube channel are set in `site.json`. Videos posted so far: **Oct 10 video** on TikTok (10 Oct, https://www.tiktok.com/@smartkitchenpicks8/video/7695070012733705492) and as a Pinterest video pin; **Oct 9 video** as a Pinterest video pin (11 Oct; TikTok/Shorts for it may or may not be done, ask). Plan: one video a day on TikTok, YouTube Shorts and Pinterest, working back from newest (Oct 8 next). TikTok bio has no clickable link (personal account, no Website field); the owner was told to put the blog address in the bio text (now `homepicksunder30.com`) and to try switching to a Business account to unlock the Website field. Shot lists were written for the Oct 6 scripts 1 (ramen) and 2 (grilled cheese).

## Daily routine (what the owner expects)
1. The owner says "review the <date> draft". Read the post and the `output/` pack, and run the compliance check (see Rules).
2. Fix problems, link 2–3 related posts with full URLs (`https://homepicksunder30.com/blog/posts/<slug>/`), and soften claims the owner can't back up.
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

## Design refresh (12 Oct)
- Home, topic pages and the "More in" section show **photo cards** (cover photo, topic label, title). The home page has a short intro box, and the newest post is shown full width.
- Pins have a round **"N PICKS" badge**. N is the number of different Amazon links in the post. All pin images were regenerated, so they count as fresh images for Pinterest.
- Traffic on 12 Oct (GoatCounter week Oct 5–12): 22 visits. Cambodia 18 (mostly the owner, before the IP filter), Canada 2, Portugal 2. All were Windows desktop with no referrer, and there were 0 phone visits, so nothing has come from Pinterest or TikTok yet.

## Topic pages (added 10 Oct)
- `topics.json` lists the blog's topic pages (`/blog/topics/<slug>/`), one per Pinterest board. A published post joins a topic if its slug is listed or its `pinBoard` equals the topic's `board`. Empty topics (Halloween, Thanksgiving, holiday baking, gifts until Nov 3) stay hidden until a post joins.
- Each post page ends with "More in <topic>" links, the home page shows topic chips, and topic pages are in the sitemap.

## Short videos (added 10 Oct, option A)
- `make-videos.mjs` (run by the Publish blog workflow) makes a silent 20 s 1080×1920 video per published post: cover photo + slow zoom, hook (pin title), up to 5 rows from the comparison table, end card with "link in bio" and the disclosure. They're on the pins page with a download button, a TikTok/Shorts caption, and Pinterest video pin text (post title, meta description + disclosure, post link, topic board). The owner uploads them by hand and adds a sound in the app.
- Only new or changed posts are rendered (about 1 min each); `pins/videos.json` on the live site holds a key per post, and gh-pages `keep_files` keeps older mp4s. Bump `VERSION` in `make-videos.mjs` to remake all after a design change.
- Option B (Pexels stock clips per gadget, needs a free Pexels API key secret) is wanted **later**; the owner said "B will be later".

## How the owner posts (settings agreed in chat)
- **Pinterest pins:** Add products empty, Publish later off, AI-Modified on only for AI-generated covers (Oct 9), 4–5 tagged topics (hidden keywords; give suggestions with each pin). Board from the topic list below.
- **TikTok:** paste the video caption from the pins page; Location empty (a location only reaches people near it; the audience is US/English-speaking); Schedule 7:00–9:00 am Cambodia time (US evening); add a royalty-free sound; Show more → Disclose post content ON → Branded content; AI-generated content ON only for the Oct 9 video. Cover: since 11 Oct the first frame shows the title.
- **YouTube Shorts:** title = first caption line, description = caption, "not made for kids", altered/synthetic content = Yes only for the Oct 9 video.
- **Pinterest video pin:** title/description/link/board from the "Pinterest video pin" box under each video on the pins page.

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
- For posting: run the OAuth flow logged in as Smart Kitchen Picks (redirect URI `https://putheamak.github.io/my-project/blog/` (registered before the domain move; update it in the Pinterest app if this is restarted), scopes `boards:read,pins:read,pins:write`). Exchange the code with PowerShell, then save the `PINTEREST_REFRESH_TOKEN`, `PINTEREST_APP_ID` and `PINTEREST_APP_SECRET` secrets. Then set `pinterest.boardId` and `autoPost: true` in `site.json`.
- The owner found the setup confusing. Only restart it if they ask, one step at a time. **Never ask for or display tokens or the app secret.**

## Own domain (16 Oct)
- The owner bought **homepicksunder30.com** at Namecheap on 16 Oct (domain privacy and auto-renew were recommended). DNS: 4 A records `@` → 185.199.108.153 / .109.153 / .110.153 / .111.153 and CNAME `www` → `putheamak.github.io.` (parking records deleted).
- The custom domain is set for the whole GitHub Pages site of `putheamak/my-project`. The blog stays at **/blog/**, so old `putheamak.github.io/my-project/blog/...` links forward automatically. The site root (`content-engine/site-root/`, deployed with a `CNAME` file by the Publish blog workflow) redirects to /blog/ and replaces the old Vite app's page (owner chose this, option A). Don't run the root app's `npm run deploy` any more: it would overwrite the root page.
- Done 16 Oct: HTTPS enforced; Google Search Console **Domain property** `homepicksunder30.com` verified by a TXT record in Namecheap, sitemap `https://homepicksunder30.com/blog/sitemap.xml` submitted (Success, 32 pages; the old github.io property's sitemap stays "Couldn't fetch", ignore it); YouTube channel link and the Oct 10 video description updated; the old github.io website unclaimed on Pinterest.
- Pinterest claim of `https://homepicksunder30.com`: the TXT record is in Namecheap, and the same code (`4d2599ae...`, also `pinterestVerification` in `site.json`) is in `site-root/index.html` as a `p:domain_verify` meta tag so the "Add HTML tag" method works on the root page.
- Done 16 Oct: Pinterest website `homepicksunder30.com` claimed (verified ✓ on Edit profile).
- **Blog renamed 16 Oct to "Home Picks Under $30"** (owner's choice): `site.json` title, tagline and about; pin and video brand text now come from `site.title` (video `VERSION` bumped to 3 so all videos re-render). The project and these notes are still called Smart Kitchen Picks; TikTok handle is still @smartkitchenpicks8.
- Still to do: Pinterest About text (suggested text given 16 Oct) and maybe the Pinterest display name, TikTok bio with the domain.

## Strategy agreed 16 Oct
- Pinterest is the main traffic channel; TikTok/Shorts are extras until TikTok gives a clickable bio link.
- Publish seasonal content 45–90 days ahead of the holiday (gift guide now, Christmas baking next).
- Suggested, not decided yet: own domain (smartkitchenpicks.com suggested), buying 1–2 cheap gadgets for a hands-on post, and the Amazon Associates 180-day / 3-sales deadline (ask the owner's sign-up date).

## Pinterest account fix (12 Oct)
- **Why pins had 0 views:** the main board "Kitchen Gadgets" (20 pins, almost all pins) was **private**. The Reports and violations center shows no violations.
- Fixed with the owner: removed 3 Amazon product photo / unrelated pins (blender, wastebasket, wok), merged it with the old 2-pin "Kitchen Gadgets Under $30" board, and made it **public**. It's now one public board, **"Kitchen Gadgets Under $30" (19 pins)**, with a description.
- Still to do (owner): make the old personal boards private (cakes, desserts, Celebsstarsies, Angkor Wat LIDAR) and delete the iPad Pro pin. Never pin Amazon product images.
- Next: ask for Analytics → Overview (Last 30 days) around Oct 19 to see whether views start. The site can't be claimed on Pinterest from the github.io subfolder; getting a custom domain was suggested (not decided).

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
- **Next in chat:** Oct 7 video next (TikTok, Shorts, Pinterest video pin), then Oct 6, working back. Videos done: Oct 12 and Oct 8 (all three platforms, Oct 13), Oct 10, Oct 9 (Pinterest). Oct 12 extra pins are queued for Oct 17 and Oct 22. Next draft is Oct 14 (Wed). `pin-queue.json` runs to **Nov 2** at **5 pins a day** from Oct 17 (owner agreed 16 Oct), weighted to the gift guide (about every other day), Halloween (until Oct 30) and the two Thanksgiving posts; extend it again around Oct 30, keeping 5 a day.
- **Ideas offered but not done yet:**
  - video option **B** (Pexels stock clips; the owner said "B will be later")
  - a shot list for Oct 6 video script 3
  - buying 1–2 cheap gadgets to write real hands-on posts, which is the biggest long-term traffic lever
