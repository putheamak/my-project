# Khmer Parcel — project notes (handover)

Read this first in a new chat. It holds the facts and decisions from the earlier session.

## Handover — status on 20 Oct 2026 (read this first in a new chat)
- **Bookings:** 1 website booking (owner rode it, Chbar Ampov → Choam Chao) + 1 Telegram-bot booking (14 Oct, KP7SMU3144, COD $22 returned same day). Website: 57 clicks → 0 bookings earlier; owner still to screen-record a website booking.
- **Confirmed facts:** online-seller price **4,000៛ per parcel** (live bot); COD money back **same day**; delivery **within 24 h** ("ដឹកជញ្ជូនដល់ដៃ ក្នុងរយៈពេល២៤ម៉ោង"); Door to Door Khmer name "ទៅយក និងដឹកដល់ផ្ទះ"; min 5 parcels ("កក់ចាប់ពី៥កញ្ចប់ឡើង") is on the flyer but the **live bot still accepts 1–10** (owner chose not to redeploy).
- **Open question:** which seller offer applies with the 4,000៛ price? Flyer `print/`, `seller_outreach_kit.md` and `khmer_parcel_pitch_seller_10s.mp4` still say 3,000៛ / first 3 parcels 2,000៛ → **do not print/send them until the owner decides**, then update.
- **Do not repost** (show the dropped "ការកក់លើកដំបូង" offer): Day 1 seller story offer cut, Day 2 `khmer_parcel_ad_book30s.mp4`, Day 4 `khmer_parcel_ad_pov_seller.mp4`.
- **Ready to post (no price shown):** `khmer_parcel_brand_intro.mp4` (pin to Page), `khmer_parcel_reel_14khans.mp4` + `posts/reel_14khans_caption.md`, `posts/khmer_parcel_post_14khans.png`, `posts/khmer_parcel_post_3steps_telegram.png`, `posts/khmer_parcel_post_cod_sameday.png` (captions next to each in `posts/`), `khmer_parcel_notif_seller_phone.mp4`, `khmer_parcel_cod_real_booking.mp4`, `khmer_parcel_story_far_delivery.mp4`.
- **Business cards:** `business-card/people/puthea` (Mak Puthea, Founder/Manager) and `people/rotana` (Prak Rotana, Admin and Finance) — QR = vCard; scan with Camera/Google Lens.
- **What the data says:** Reels lose most viewers at 0:01 and reach ~80–90% existing followers (mostly men 25–44). Real footage works best (true story: 27 s avg watch). Recommended next: small boost ($3–5/day, goal "More messages", women 20–40 Phnom Penh), daily seller outreach (10/day), collect 2–3 real photos per delivery.
- **Done (22 Oct): map-pin behaviour-change Reel** `khmer_parcel_mappin.mp4` (22.6 s): Pixabay photos (man on phone, woman on phone) + owner street photo for arrival "មកដល់ហើយបង!" (plates blurred) + real OSM map behind "វត្តណាបង?!" (`tvc-source/photos_mappin/`) → bot "◎ ប្រើទីតាំងបច្ចុប្បន្ន" + website A/B map pin → both QRs. No AI people, so no AI label needed.
- **Network:** `tile.openstreetmap.org` / `overpass-api.de` were blocked in the 20 Oct session; owner allowed them — works only in a new session. Real map currently comes from the owner's screenshot `tvc-source/photos_map/pp_osm.png`.

## Business facts
- Website: https://www.khmerparcel.com — Facebook page "ខ្មែរ ផាសែល-Khmer Parcel" (~13K followers)
- Launch: **1 October 2026**, Phnom Penh
- Target: ~50 requests/day (20–30 door-to-door + 20–30 online-seller parcels)
- Phone: **012 429 597 · 092 678 657** (the blue poster wrongly shows 092 678 **8**57 — fix the poster)
- Telegram: **098 429 597** · booking bot **@KhmerParcelBot** (t.me/KhmerParcelBot, QR in `tvc-source/qr_khmerparcelbot.png`)

## Services and prices
| Service | Price |
|---|---|
| ① Door to Door (pickup & drop-off) | **from $1.50** (6,000៛) |
| ② Online seller parcel (one leg) | **3,000៛** |
- Payment: COD (បង់ពេលទទួល) or prepay by QR (បង់មុនតាម QR)
- **COD money is returned to sellers the same day** (owner confirmed 13 Oct 2026) — OK to use in ads.
- **Delivery within 24 hours of pick-up** (owner confirmed 13 Oct 2026) — Khmer wording: "ដឹកជញ្ជូនដល់ដៃ ក្នុងរយៈពេល២៤ម៉ោង". Same-day delivery is NOT promised.
- **Online sellers: minimum 5 parcels per booking** (owner, 13 Oct 2026) — Khmer wording: "កក់ចាប់ពី៥កញ្ចប់ឡើង". The Telegram bot enforces 5–10 parcels (`MIN_PARCELS`).

## Brand
- Colors: blue `#1a78cf`, navy `#0d3868`, sky `#dff0fc`, orange `#f08a14`
- Fonts: Moul (Khmer headlines), Kantumruy Pro (text) — files in `khmer-parcel/tvc-source/`
- Door to Door service name in Khmer: **"ទៅយក និងដឹកដល់ផ្ទះ"** (owner correction, Oct 2026 — not "ផ្ទះដល់ផ្ទះ")
- Tagline used: "ងាយស្រួល · រហ័ស · ទុកចិត្តបាន"; spelling used in new text: "ឥវ៉ាន់"

## Marketing plan (summary)
- Priority: sign 10–15 regular **online sellers** (each sends 5–20 parcels/day)
- Selling point: **same-day COD payout**, photo proof, fast Khmer support, fixed pickup times
- Channels: Facebook (change category from "Digital creator" to Courier Service, collect reviews),
  Telegram booking, TikTok, Google Business Profile, market visits with QR flyers, parcel stickers
- Ads: $5–10/day, Phnom Penh only; first-month budget ≈ $400
- Key metric: number of regular sellers (≈25 = sustainable)
- Video ideas not yet made: "What can 6,000៛ buy?", COD-money moment, parcel POV ride,
  "near the pagoda" comedy skit, rain delivery

## Videos (in `khmer-parcel/`)
| File | Notes |
|---|---|
| `khmer_parcel_reel_bigscreen.mp4` | 15 s Reel, phone screen enlarged |
| `khmer_parcel_TVC_launch_1oct.mp4` | TVC v1, 1:14 |
| `khmer_parcel_TVC_launch_1oct_v2.mp4` | v2, 53 s (old demo) |
| `khmer_parcel_TVC_launch_1oct_v3.mp4` | **v3 — final, 1:09**, real A→B demo, silent track for voiceover |
| `khmer_parcel_ad_6000riel.mp4` | 35 s animated ad "៦,០០០៛ អាចទិញអ្វីបាន?" — source `tvc-source/scenes_ad_6000riel.html` (scenes: hook, choices, journey, sellers, steps, end) |
| `khmer_parcel_ad_seller_story.mp4` | 41 s post-launch story ad "អ្នកលក់អនឡាញ ធ្លាប់ជួបទេ?" (pain → switch → calm chat → benefits → CTA) — source `tvc-source/scenes_ad_seller_story.html` (scenes: pain, turn, solve, benefits, cta) |
| `khmer_parcel_ad_seller_story_offer2000.mp4` | 47 s seller story + offer scene (first 3 deliveries 2,000៛, online sellers only, claim via Telegram); Door to Door = self-booking on website, system price |
| `khmer_parcel_ad_book30s.mp4` | 61 s Day 2 Reel (with original music + SFX) "កក់ក្នុង ៣០ វិនាទី" (sellers): hook stopwatch → old chat way → Telegram bot booking demo with live timer (2 parcels, done 0:21) → benefits → 2,000៛ offer → CTA → @KhmerParcelBot QR. Cover image `khmer_parcel_ad_book30s_cover.jpg`. Source `tvc-source/scenes_ad_book30s.html` + `specs/ad_book30s.json` |
| `khmer_parcel_ad_pov_seller.mp4` / `khmer_parcel_ad_pov_doortodoor.mp4` | Day 4 "POV" series with parcel mascot (box for sellers, red gift for door to door), separate cuts per audience, original music (`make_sound_pov.py` + `soundlib.py`). Source `tvc-source/scenes_ad_parcel_pov.html`, specs `ad_pov_seller.json` / `ad_pov_doortodoor.json`. Website QR `tvc-source/qr_khmerparcel_web.png` |
| `khmer_parcel_story_far_delivery.mp4` | 61 s true-story brand video (both audiences): owner's own delivery Chbar Ampov → Choam Chao, 2 parcels, $2, ~3 h, rider refused → lesson (riders: deliver happily; sellers: fair fee values both sides) → both QRs. Uses owner's real photos (`tvc-source/photos_far/`, customer info, other brand's bag and car plate blurred). Caption in `story_far_delivery_caption.md`. Source `scenes_story_far.html`, spec `story_far_delivery.json`, sound `make_sound_story_far.py` |
| `khmer_parcel_ad_route_quote_1.mp4` | 21 s, series "ពីណា ទៅណា? ថ្លៃប៉ុន្មាន?" video 1 (door to door): ask viewers to comment 2 places, answer with screen-recorded real website prices. Plan + caption in `route_quote_series.md`. Source `scenes_ad_route_quote.html`, spec `ad_route_quote_1.json` |
| `khmer_parcel_ad_route_quote_1_v2.mp4` | 12.6 s re-cut: real motorbike photo + question + comment ask from 0:00, 4 s website example, ask again + website QR (fixes the 0:04 drop and 0 comments of v1) |
| `khmer_parcel_pitch_seller_10s.mp4` | 10 s seller pitch to send in chat (real photo hook "២,០០០៛", 4 benefits, bot QR). Use with `seller_outreach_kit.md` and `print/khmer_parcel_flyer_seller_A5.pdf` |
| `khmer_parcel_cod_real_booking.mp4` | 15.5 s, real bot booking KP7SMU3144 (name + phones blurred, `tvc-source/photos_cod/`): hook "ចាំប្រាក់ COD យូរប៉ុន្មានថ្ងៃ?" → "ដឹកដល់ហើយ!" COD $11+$11=$22 → "$22 ប្រគល់ជូនអ្នកលក់ ក្នុងថ្ងៃដដែល" → bot QR + comment ask. Cover `khmer_parcel_cod_real_booking_cover.jpg` |
| `khmer_parcel_notif_seller_phone.mp4` | 13.8 s "ទូរស័ព្ទអ្នកលក់អនឡាញ ថ្ងៃនេះ..." — lock-screen notifications retell the real 14 Oct booking (bot confirmation → rider call → delivered COD $22 → +$22 same day), 3 facts, end asks Comment «ចង់» + bot QR. Made to fix the 0:01 drop of the COD video. Source `scenes_notif.html` |
| `khmer_parcel_brand_intro.mp4` | 28.6 s awareness Reel "មិនទាន់ស្គាល់ ខ្មែរផាសែល?" (animated city + scooter hook, pill "កក់ត្រឹម៣០វិនាទី"; owner asked to drop the motorbike photo and the booking-screenshot scene, replaced by a 30-second bot booking scene) → who we are (Phnom Penh, since 1 Oct) → 2 services → true far-trip story → book in the bot within 30 s (stopwatch stops at 0:28) → promise "ដឹកដោយយកចិត្តទុកដាក់ · ប្រាក់ COD ចូលដៃក្នុងថ្ងៃដដែល" → Follow + both QRs. No seller price shown. Source `scenes_brand_intro.html` |
| `khmer_parcel_reel_14khans.mp4` | 17.5 s Reel "បងនៅខណ្ឌណា?" — real OpenStreetMap screenshot of Phnom Penh from the owner (`tvc-source/photos_map/pp_osm.png`, markers softened, credited "© OpenStreetMap contributors"), 14 district pins pop one by one with counter to ១៤, mascot rides; 24 h + same-day COD; Comment district + both QRs + 012 429 597 · 092 678 657 · Telegram 098 429 597. Source `scenes_14khans.html` |

### TVC v3 timecodes (for voiceover)
| Time | Scene |
|---|---|
| 0:00–0:04 | Hook "ផ្ញើឥវ៉ាន់ក្នុងភ្នំពេញ?" |
| 0:04–0:08 | "កញ្ចប់ខ្ញុំដល់ណាហើយ?" chat (Launch Video 1, 0.6–4.9 s) |
| 0:08–0:37 | Real demo steps ១–៦: website → A (Sen Sok) → map pin → B (Toul Kork) → route 6.8 km / $1.50 → parcel size & phones |
| 0:37–0:39 | "តាមដានផ្ទាល់ ១០០%" |
| 0:39–0:49 | Real tracking (TVC 1, 4.3–15.3 s) |
| 0:49–0:57 | Two services card |
| 0:57–1:02 | Poster (bottom bar cropped) |
| 1:02–1:09 | End card: launch 1 Oct, website, phones, Telegram |

### Open items
- Demo recording ends before tapping "កក់ (Book)" — record a few seconds of Book → parcel code to add as step ៧
- Record future screen demos at 30 fps (last one was ~9 fps)
- Add music / voiceover in CapCut, TikTok or Facebook
- Website: Telegram button and Khmer SEO still to add

## How the TVC was built (to edit it again)
> **Now superseded by the kit:** `khmer-parcel/tvc-source/README.md` (`setup.sh`, `make_tvc.py`, `specs/`). Daily plan: `khmer-parcel/TVC_IDEAS_30_DAYS.md`.

- `khmer-parcel/tvc-source/scenes.html` — animated scenes (hook, track, services, poster, demo2, end) in HTML/CSS
- `render.cjs` — Playwright script that captures each scene frame by frame:
  `SCENES=<file>.html NODE_PATH=$(npm root -g) node render.cjs <scene> <seconds> <outdir>`
- Frames are joined with the source clips using ffmpeg (xfade transitions, 30 fps, 1080×1920)
- Source clips needed again: Launch Video 1, TVC 1, and the live-app demo recording (re-upload them)

## Results & decisions (Oct 2026)
- 19 Oct insights: Page follows ~0/day since launch spike (367 in 28 days, mostly 21–22 Sep). COD real-booking Reel: 196 views, 37 3-s views, 6 s avg (40%), biggest drop at 0:01, 0 comments, 20.9% non-followers → next Reels must win the first second (full-screen motion, big text), and use one-word comment asks
- 14 Oct: **first Telegram-bot booking delivered** — KP7SMU3144, 2 parcels, pick-up Chbar Ampov (ASAP) → Prampi Makara + Boeng Keng Kang, COD $11 + $11 = $22 collected, fee shown 4,000៛ per parcel (8,000៛, customer pays). Owner confirmed (14 Oct): **4,000៛ per parcel is the correct online-seller price now** and the $22 COD was returned to the seller the same day. Flyer, outreach kit, 10 s pitch and repo bot code still say 3,000៛ (+ first 3 at 2,000៛) — offer status to confirm with the owner before updating them
- 13 Oct: 1 booking (2 parcels) since 1 Oct. Insights: true story 356 views / 27 s avg watch / 24.5% non-followers vs route quote 191 views / 5 s avg / 0 comments; both drop at 0:04–0:05 when real hook switches to animation → real footage first, ask in first 2 s. Plan: direct seller outreach (kit + A5 flyer + 10 s pitch) to get 10 sellers trying the offer before 31 Oct; owner collects 2–3 photos per delivery; owner to screen-record a website booking
- 11 Oct: website bookings still very low (57 clicks → 0 bookings earlier) → shift videos to comment/lead-driven series; owner to test the website booking flow on a phone and send a screen recording
- 8 Oct: far order Chbar Ampov → Choam Chao (2 parcels, $2) took the owner ~3 h after a rider refused — lesson: far trips at flat low fees lose money; pricing for far/outskirt trips to be decided by the owner
- Ads 30 Sep–1 Oct, $5/day: 2,546 views, 605 3-sec views, avg watch 4 s, 57 link clicks, **0 bookings, 4 rider applicants**; audience mostly men 25–44
- Drop-off at 0:17 of the 6,000៛ ad (switch to seller scene) → made 29 s door-to-door-only cut
- Offer: **online sellers' first 3 parcels at 2,000៛**, then 3,000៛ per parcel, until 31 Oct (owner kept this on 13 Oct after briefly trying "first booking 2,000៛"). Khmer: "៣ កញ្ចប់ដំបូង ២,០០០៛ / កញ្ចប់"; first 5-parcel booking = 12,000៛. The Day 1 offer cut, Day 2 book30s and Day 4 seller POV mp4s still show the dropped "ការកក់លើកដំបូង" wording — do not post them until re-rendered.
- Door to Door: customers book themselves on khmerparcel.com; price calculated by the system
- Riders: pay per delivery, no salary until ~30 orders/day

## Digital business card
- Folder `khmer-parcel/business-card/` — QR holds a vCard (scan with the phone Camera / Google Lens → Add contact; the Wi-Fi scanner only shows text). One folder per person in `people/`: **puthea** (ម៉ក់ ពុទ្ធា · Mak Puthea, Founder/Manager · ស្ថាបនិក / អ្នកគ្រប់គ្រង, 012 429 597 + Telegram 098 429 597), **rotana** (ប្រាក់ រតនា · Prak Rotana, Admin and Finance / រដ្ឋបាល និងហិរញ្ញវត្ថុ, 012 678 657 · 092 678 657). Run `make_card.py [people/<name>/card_info.json]`

## Telegram mini app (online sellers)
- Folder `khmer-parcel/telegram-miniapp/` — Cloudflare Worker; bookings posted to the office Telegram group; first 3 parcels at 2,000៛ per Telegram account (KV `KP`), min 5 parcels, optional `OFFER_END`. **Live Cloudflare bot is still the 1 Oct version** (1–10 parcels, "៣ ដងដំបូង" wording); owner chose not to redeploy (13 Oct). `dist/worker.js` in the repo is newer (min 5 parcels, "៣ កញ្ចប់ដំបូង") — paste it only if the owner asks
- Setup steps in its README; Door to Door stays on the website
- **Live (Oct 2026):** https://khmer-parcel-bot.putheamak.workers.dev — test booking reached the office group
- Reuse for other projects: new bot + new Worker + new group each time; edit texts/prices/fields in `src/`, run `node build.mjs`, paste `dist/worker.js` once
