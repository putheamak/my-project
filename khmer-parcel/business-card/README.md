# Khmer Parcel digital business card

The QR holds a **vCard**: scanning it with a phone camera shows **"Save contact"** (name, Khmer Parcel,
3 phone numbers, website, Telegram bot). It works offline — no website or server needed.

## Edit
1. Change the fields in `card_info.json` (name, title, phones, email, address…). Leave `email` empty to hide it.
2. Run `python3 make_card.py` (needs `pip install "qrcode[pil]" opencv-python-headless` and Playwright/Chromium, as in `../tvc-source/setup.sh`).
3. It rebuilds everything and checks that the QR decodes.

## Files
| File | Use |
|---|---|
| `khmer_parcel_card_print.pdf` | Send to the print shop — 2 pages (front, back), 90 × 54 mm, no bleed |
| `khmer_parcel_card_front.png` / `_back.png` | Same at 300 dpi |
| `khmer_parcel_card_phone.png` | 1080 × 1920 — keep on your phone and show it for scanning, or send in chat |
| `qr_card_vcard.png` | The QR alone (for flyers, stickers, email signature) |
| `khmer_parcel_card.vcf` | The contact file itself — can be sent directly in Telegram/email |

Design: `card.html` (front, back, phone views), rendered by `render_card.cjs`.
