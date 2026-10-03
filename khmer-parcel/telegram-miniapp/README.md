# Khmer Parcel — Telegram Mini App (online seller booking)

Sellers open your bot, tap **📦 កក់ឥឡូវ**, fill a short Khmer form (several parcels per pick-up),
and the booking is posted to your **office Telegram group**. The seller gets a booking code.

- First 3 deliveries per seller at **2,000៛**, then **3,000៛** (counted per Telegram account)
- Shop details are remembered for next time
- Bookings are signed by Telegram and checked by the server, so nobody can post fake bookings into your group
- Runs on **Cloudflare Workers** (free plan) — no server to maintain

## Files
| File | What it is |
|---|---|
| `src/app.html` | The mini app screen (Khmer + English) |
| `src/worker.src.js` | The server: serves the app, checks bookings, posts to the group |
| `dist/worker.js` | **The one file to paste into Cloudflare** (built from the two above) |
| `build.mjs` | Rebuilds `dist/worker.js` after you edit `src/` — `node build.mjs` |
| `test.mjs` | Automated tests — `node build.mjs && node test.mjs` |

## Setup (about 20 minutes, one time)

### 1. Create the bot
1. In Telegram, open **@BotFather** → send `/newbot`.
2. Name: `Khmer Parcel` · username e.g. `KhmerParcelBot`.
3. BotFather gives you a **token** like `123456:ABC...`. Keep it secret — never post it in a chat or group.

### 2. Create the office group
1. Create a Telegram group, e.g. "Khmer Parcel — Bookings", and add your staff.
2. Add your bot to the group.

### 3. Put the app on Cloudflare (free)
1. Sign up at **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Create Worker** → name it `khmer-parcel-bot` → **Deploy**.
2. Click **Edit code**, delete everything, paste the whole of **`dist/worker.js`**, click **Deploy**.
3. Your app address is shown, like `https://khmer-parcel-bot.<you>.workers.dev`.
4. **Settings → Variables and Secrets → Add**:
   | Name | Type | Value |
   |---|---|---|
   | `BOT_TOKEN` | Secret | the token from BotFather |
   | `WEBHOOK_SECRET` | Secret | 30+ characters using only letters, numbers, `-` and `_` (no spaces), e.g. `kp_2026_x8Jq...` |
   | `GROUP_CHAT_ID` | Secret | fill in at step 5 |
   | `OFFER_END` | Text | optional, last day of the offer, e.g. `2026-10-31` |
5. **Offer counter (recommended):** **Storage & Databases → KV → Create** a namespace `khmer-parcel`. Then in the Worker: **Settings → Bindings → Add → KV namespace**, variable name **`KP`**, pick `khmer-parcel`. Without this, everyone always sees the 2,000៛ price until `OFFER_END`.

### 4. Connect the bot
Open this address in a browser (use your own Worker address and WEBHOOK_SECRET):
```
https://khmer-parcel-bot.<you>.workers.dev/setup?key=<WEBHOOK_SECRET>
```
You should see `"webhook":true,"menuButton":true`.

### 5. Get the group ID
1. In your office group, send `/chatid@YourBotUsername` (with your bot's username — groups only pass commands addressed to the bot). The bot replies `Chat ID: -…`.
2. Copy that number into the `GROUP_CHAT_ID` secret (step 3.4) and save.

### 6. Test
1. Open your bot in Telegram → `/start` → **📦 កក់ឥឡូវ**.
2. Make a test booking → it appears in the office group within seconds.

## Share it
- Link: `https://t.me/<YourBotUsername>` — put it in ads, the Facebook page, flyers (as a QR code) and parcel stickers.
- In the bot's **BotFather → /mybots → Bot Settings → Configure Mini App**, you can also set the Worker address as the main Mini App, so it opens from the bot's profile.

## Changing things
- Prices / offer size: top of `src/worker.src.js` (`NORMAL_PRICE`, `OFFER_PRICE`, `OFFER_COUNT`). The app reads them from the server.
- Text on the screen: `src/app.html`.
- After editing: `node build.mjs`, then paste `dist/worker.js` into Cloudflare again.

## Limits of this first version
- The office confirms each booking by hand (it is not connected to the khmerparcel.com system, so there is no automatic parcel code/tracking yet).
- The offer is counted per Telegram account; staff should still check the phone number for repeat offer use.
- Door to Door stays on the website, as agreed.
