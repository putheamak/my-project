# Khmer Parcel — working context

This repo's real work is **Khmer Parcel** (parcel delivery, Phnom Penh, launched 1 Oct 2026). The Vite/React
template files at the root are unrelated leftovers; don't modify them unless asked.

Read first, in this order:
1. `khmer-parcel/KHMER_PARCEL_NOTES.md` — business facts, prices, offer, ad results, decisions
2. `khmer-parcel/TVC_IDEAS_30_DAYS.md` — daily TVC plan (owner wants ~1 TVC per day); mark ✅ when done
3. `khmer-parcel/tvc-source/README.md` — how to build TVCs (`setup.sh`, `make_tvc.py`, specs, rules)
4. `khmer-parcel/telegram-miniapp/README.md` — live Telegram booking mini app (Cloudflare Worker)

Working rules
- Owner writes in English; videos and customer text are **Khmer first** with short English.
- Never invent prices, offers or promises (same-day delivery, COD payout timing, free deliveries) — ask.
- Correct contacts: 012 429 597 · 092 678 657 · Telegram 098 429 597 · www.khmerparcel.com
- Send finished videos to the owner with SendUserFile, commit mp4 + scene html + spec, push to the working branch.
- Uploaded source clips do not persist between chats; ask the owner to re-upload if a video needs them.
- Never ask for or display the bot token or webhook secret.
