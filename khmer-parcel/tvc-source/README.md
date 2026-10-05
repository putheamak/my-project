# Khmer Parcel TVC kit

Animated Facebook Reels / TikTok videos (1080×1920, 30 fps, silent AAC track for voiceover),
built from HTML/CSS scenes rendered frame by frame in Chromium, then joined with ffmpeg.

## Quick start (new container)
```bash
cd khmer-parcel/tvc-source
bash setup.sh                                              # Pillow + bundled ffmpeg; checks Playwright/Chromium
python3 make_tvc.py specs/ad_seller_story_offer2000.json --preview   # PNG per scene (prev_*.png)
TVC_WORK=<scratchpad>/tvc_work python3 make_tvc.py specs/<name>.json  # full render + contact sheet
```

## Files
| File | Purpose |
|---|---|
| `scenes_*.html` | Scene files. Each `<section class="scene" id="...">` is one scene; animations are CSS with delays |
| `render.cjs` | Playwright renderer: seeks all CSS animations to each frame time and screenshots (waits for paint) |
| `make_tvc.py` | Renders scenes in parallel and joins segments with xfade transitions; also accepts video clips |
| `specs/*.json` | One spec per finished video (scene order, durations, transitions, output path) |
| `*.woff2` | Kantumruy Pro (Khmer/Latin text) and Moul (Khmer headlines) |
| `make_sound_*.py` | Original background music + sound effects (numpy synth, no samples), timed to a spec; writes `<name>_music.m4a` |
| `qr_khmerparcelbot.png` | Telegram QR for @KhmerParcelBot (transparent background) — use on end cards |
| `poster.webp` | Blue key-visual poster (its bottom bar has a wrong number — crop it, never show it) |

Existing scene files to copy from:
- `scenes_ad_seller_story.html` — chat UI, call screen, stamp, benefits chips, offer card, CTA (best template)
- `scenes_ad_6000riel.html` — banknote hook, choice cards with strike, animated map + counters, steps, end card
- `scenes_launch_tvc.html` — hook, title cards, phone-frame demo overlay (`demo2`), two-services card, poster, end

## Making a new TVC (workflow)
1. Copy the closest `scenes_*.html` to `scenes_<new>.html`; keep the `<style>` base, `<defs>` symbols and `<script>`.
2. Write each scene as a `<section class="scene" id="...">`. Use `.pop/.up/.fade` + `animation-delay` for timing.
   Counters or changing text: add a function to `hooks[sceneId] = t => {...}` in the script.
3. `python3 make_tvc.py specs/<new>.json --preview` → check every scene image.
4. Optional sound: copy `make_sound_book30s.py`, change the event times, run it, add `"audio": "<name>_music.m4a"` to the spec.
5. Full render → check the contact sheet → send the mp4 → commit mp4 + html + spec (+ sound script and m4a).

## Rules learned the hard way
- **No emoji in scene text** — the container has no emoji font (renders as boxes). Draw SVG icons instead.
- Khmer needs the bundled fonts (`@font-face` with `unicode-range`); check a full-size crop for shaping.
- Keep key content between y≈150 and y≈1450 (Reels UI covers the bottom ~25% and the right edge).
- `render.cjs` must stay `.cjs` (the repo `package.json` is `"type": "module"`).
- Telegram bot: **@KhmerParcelBot** (t.me/KhmerParcelBot) — end cards use `qr_khmerparcelbot.png`.
- Facts to keep consistent: phones **012 429 597 · 092 678 657**, Telegram **098 429 597**,
  Door to Door **from $1.50 (6,000៛)**, online seller **3,000៛ / leg**, offer **first 3 at 2,000៛** (sellers only, until 2026-10-31).
- Never claim things not confirmed by the owner (e.g. same-day delivery, same-day COD payout, free offers).
- One audience per ad: door-to-door customers and online sellers in separate videos.
- First frame must already show the hook (no empty first second).
