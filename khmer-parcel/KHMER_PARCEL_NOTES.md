# Khmer Parcel — project notes (handover)

Read this first in a new chat. It holds the facts and decisions from the earlier session.

## Business facts
- Website: https://www.khmerparcel.com — Facebook page "ខ្មែរ ផាសែល-Khmer Parcel" (~13K followers)
- Launch: **1 October 2026**, Phnom Penh
- Target: ~50 requests/day (20–30 door-to-door + 20–30 online-seller parcels)
- Phone: **012 429 597 · 092 678 657** (the blue poster wrongly shows 092 678 **8**57 — fix the poster)
- Telegram: **098 429 597**

## Services and prices
| Service | Price |
|---|---|
| ① Door to Door (pickup & drop-off) | **from $1.50** (6,000៛) |
| ② Online seller parcel (one leg) | **3,000៛** |
- Payment: COD (បង់ពេលទទួល) or prepay by QR (បង់មុនតាម QR)

## Brand
- Colors: blue `#1a78cf`, navy `#0d3868`, sky `#dff0fc`, orange `#f08a14`
- Fonts: Moul (Khmer headlines), Kantumruy Pro (text) — files in `khmer-parcel/tvc-source/`
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
- `khmer-parcel/tvc-source/scenes.html` — animated scenes (hook, track, services, poster, demo2, end) in HTML/CSS
- `render.js` — Playwright script that captures each scene frame by frame:
  `NODE_PATH=$(npm root -g) node render.js <scene> <seconds> <outdir>`
- Frames are joined with the source clips using ffmpeg (xfade transitions, 30 fps, 1080×1920)
- Source clips needed again: Launch Video 1, TVC 1, and the live-app demo recording (re-upload them)
