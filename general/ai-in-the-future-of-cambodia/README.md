# AI in the Future of Cambodia

General opinion piece (not Khmer Parcel): how AI and superintelligence may change NGOs, civil servants
and private-sector jobs in Cambodia, and possible answers to job loss. Khmer first, short English.
Written October 2026; it is opinion for discussion, not a forecast or official policy.

| File | What it is |
|---|---|
| `ai_in_the_future_of_cambodia.html` | Bilingual page (ខ្មែរ + EN / ខ្មែរ / English toggle). Live copy: https://claude.ai/artifact/2XgTZYcergsfNH97UDc2Ef |
| `ai_in_the_future_of_cambodia.mp4` | 47 s vertical video (1080×1920, 30 fps, silent AAC track for voiceover) |
| `tvc/scenes_ai_work.html` | Animated scenes: hook, ngo, gov, biz, solutions, close |
| `tvc/specs/ai_in_the_future_of_cambodia.json` | Scene order, durations, transitions |
| `tvc/render.cjs`, `tvc/make_tvc.py`, `tvc/*.woff2` | Copy of the renderer and Khmer fonts from `khmer-parcel/tvc-source/` |

Khmer terms confirmed by the owner: UBI = ប្រាក់ចំណូលគោលជាសកល · IDPoor = ប័ណ្ណក្រីក្រ · NSSF = ប.ស.ស

## Rebuild the video
```bash
cd general/ai-in-the-future-of-cambodia/tvc
bash ../../../khmer-parcel/tvc-source/setup.sh          # Pillow + ffmpeg, checks Playwright/Chromium
python3 make_tvc.py specs/ai_in_the_future_of_cambodia.json --preview   # prev_<scene>_<t>.png
TVC_WORK=<scratchpad>/tvc_work python3 make_tvc.py specs/ai_in_the_future_of_cambodia.json
```
No emoji in scene text (no emoji font in the container). Keep key content between y≈150 and y≈1450.
