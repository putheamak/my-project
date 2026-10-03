// Khmer Parcel — Telegram Mini App booking (Cloudflare Worker)
//
// Routes
//   GET  /                      the mini app page
//   POST /api/config            prices + how many offer deliveries this seller has used
//   POST /api/book              validate Telegram initData, post booking to the office group
//   POST /bot                   Telegram webhook (/start, /chatid)
//   GET  /setup?key=SECRET      one-time: registers the webhook and the chat menu button
//
// Environment (Cloudflare → Worker → Settings → Variables)
//   BOT_TOKEN       secret  token from @BotFather
//   GROUP_CHAT_ID   secret  office group id (send /chatid in the group to get it)
//   WEBHOOK_SECRET  secret  any long random text
//   OFFER_END       text    optional, last day of the 2,000៛ offer, e.g. 2026-10-31
//   KP              KV      optional namespace binding; enables the per-seller offer counter

const APP_HTML = __APP_HTML__;

const NORMAL_PRICE = 3000;
const OFFER_PRICE = 2000;
const OFFER_COUNT = 3;
const MAX_PARCELS = 10;
const INIT_DATA_MAX_AGE_S = 24 * 3600;

const KHAN_KM = {
  "Daun Penh": "ដូនពេញ", "Prampi Makara": "ប្រាំពីរមករា", "Chamkar Mon": "ចំការមន", "Boeng Keng Kang": "បឹងកេងកង",
  "Toul Kork": "ទួលគោក", "Russey Keo": "ឫស្សីកែវ", "Sen Sok": "សែនសុខ", "Pou Senchey": "ពោធិ៍សែនជ័យ", "Mean Chey": "មានជ័យ",
  "Chbar Ampov": "ច្បារអំពៅ", "Dangkao": "ដង្កោ", "Prek Pnov": "ព្រែកព្នៅ", "Chroy Changvar": "ជ្រោយចង្វារ", "Kamboul": "កំបូល",
};
const SIZE_KM = { S: "ឯកសារ/តូច ≤2kg", M: "មធ្យម 2–8kg", L: "ធំ 8–15kg" };
const TIME_KM = { asap: "ឆាប់ៗ (ASAP)", "10:00": "ព្រឹក 10:00", "15:00": "រសៀល 3:00" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
        return new Response(APP_HTML, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" } });
      }
      if (request.method === "POST" && url.pathname === "/api/config") return handleConfig(request, env);
      if (request.method === "POST" && url.pathname === "/api/book") return handleBook(request, env);
      if (request.method === "POST" && url.pathname === "/bot") return handleBot(request, env);
      if (request.method === "GET" && url.pathname === "/setup") return handleSetup(url, env);
      return new Response("Not found", { status: 404 });
    } catch (e) {
      return json({ ok: false, error: "server_error" }, 500);
    }
  },
};

// ---------- API ----------

async function handleConfig(request, env) {
  const body = await request.json().catch(() => ({}));
  const user = await verifyInitData(body.initData, env.BOT_TOKEN);
  const used = user ? await getUsed(env, user.id) : 0;
  return json({ normalPrice: NORMAL_PRICE, offerPrice: OFFER_PRICE, offerCount: OFFER_COUNT, offerActive: offerActive(env), used });
}

async function handleBook(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, error: "bad_json" }, 400);
  const user = await verifyInitData(body.initData, env.BOT_TOKEN);
  if (!user) return json({ ok: false, error: "open_in_telegram" }, 401);

  const b = sanitize(body.booking);
  if (!b) return json({ ok: false, error: "invalid_booking" }, 400);

  const used = await getUsed(env, user.id);
  const active = offerActive(env);
  const prices = b.parcels.map((_, i) => (active && used + i < OFFER_COUNT ? OFFER_PRICE : NORMAL_PRICE));
  const total = prices.reduce((a, c) => a + c, 0);
  const id = bookingId();

  const sent = await tg(env, "sendMessage", {
    chat_id: env.GROUP_CHAT_ID,
    text: groupMessage(id, user, b, prices, total),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
  if (!sent.ok) return json({ ok: false, error: "notify_failed" }, 502);

  await setUsed(env, user.id, used + b.parcels.length);
  // Best effort: the seller only receives this if they have started the bot.
  await tg(env, "sendMessage", {
    chat_id: user.id,
    text: `✅ បានទទួលការកក់ <b>${id}</b>\n${b.parcels.length} កញ្ចប់ · ថ្លៃដឹក ${fmtRiel(total)}\nការិយាល័យនឹងទាក់ទងបញ្ជាក់ឆាប់ៗ។\nBooking received — we'll confirm shortly.`,
    parse_mode: "HTML",
  });
  return json({ ok: true, id, total, prices });
}

// ---------- bot webhook ----------

async function handleBot(request, env) {
  if (request.headers.get("x-telegram-bot-api-secret-token") !== env.WEBHOOK_SECRET) return new Response("forbidden", { status: 403 });
  const update = await request.json().catch(() => ({}));
  const msg = update.message;
  if (!msg || typeof msg.text !== "string") return new Response("ok");
  const cmd = msg.text.trim().split(/[\s@]/)[0];
  const appUrl = new URL("/", request.url).toString();

  if (cmd === "/chatid") {
    await tg(env, "sendMessage", { chat_id: msg.chat.id, text: `Chat ID: <code>${msg.chat.id}</code>`, parse_mode: "HTML" });
  } else if (cmd === "/start" && msg.chat.type === "private") {
    await tg(env, "sendMessage", {
      chat_id: msg.chat.id,
      text: "សួស្តី! 👋 ខ្មែរផាសែល — កក់ដឹកឥវ៉ាន់សម្រាប់អ្នកលក់អនឡាញ។\n🎁 ៣ ដងដំបូង ត្រឹម ២,០០០៛ / ជើង\n\nចុចប៊ូតុងខាងក្រោមដើម្បីកក់ 👇",
      reply_markup: { inline_keyboard: [[{ text: "📦 កក់ឥឡូវ · Book now", web_app: { url: appUrl } }]] },
    });
  }
  return new Response("ok");
}

async function handleSetup(url, env) {
  if (!env.WEBHOOK_SECRET || url.searchParams.get("key") !== env.WEBHOOK_SECRET) return new Response("forbidden", { status: 403 });
  const base = `${url.protocol}//${url.host}`;
  const hook = await tg(env, "setWebhook", { url: `${base}/bot`, secret_token: env.WEBHOOK_SECRET, allowed_updates: ["message"] });
  const menu = await tg(env, "setChatMenuButton", { menu_button: { type: "web_app", text: "កក់ · Book", web_app: { url: `${base}/` } } });
  const cmds = await tg(env, "setMyCommands", { commands: [{ command: "start", description: "កក់ដឹកឥវ៉ាន់ · Book a delivery" }] });
  return json({ webhook: hook.ok, menuButton: menu.ok, commands: cmds.ok, groupChatIdSet: !!env.GROUP_CHAT_ID });
}

// ---------- Telegram initData verification ----------
// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app

export async function verifyInitData(initData, botToken, now = Date.now()) {
  if (!initData || !botToken || typeof initData !== "string") return null;
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const dataCheck = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort().join("\n");
  const secret = await hmac(new TextEncoder().encode("WebAppData"), botToken);
  const sig = toHex(await hmac(secret, dataCheck));
  if (!timingSafeEqual(sig, hash)) return null;
  const authDate = Number(params.get("auth_date"));
  if (!authDate || now / 1000 - authDate > INIT_DATA_MAX_AGE_S) return null;
  try {
    const user = JSON.parse(params.get("user"));
    return user && user.id ? user : null;
  } catch {
    return null;
  }
}

async function hmac(keyBytes, message) {
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)));
}
const toHex = (bytes) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// ---------- booking helpers ----------

export function sanitize(raw) {
  if (!raw || typeof raw !== "object") return null;
  const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const phone = (v) => (/^\+?[0-9 ]{8,15}$/.test(str(v, 20)) ? str(v, 20) : "");
  const khan = (v) => (Object.hasOwn(KHAN_KM, v) ? v : "");
  const b = {
    shop: str(raw.shop, 60),
    phone: phone(raw.phone),
    pickupKhan: khan(raw.pickupKhan),
    pickupAddress: str(raw.pickupAddress, 200),
    pickupTime: Object.hasOwn(TIME_KM, raw.pickupTime) ? raw.pickupTime : "asap",
    feePaidBy: raw.feePaidBy === "customer" ? "customer" : "seller",
    location: null,
    parcels: [],
  };
  const loc = raw.location;
  if (loc && Number.isFinite(loc.lat) && Number.isFinite(loc.lng) && Math.abs(loc.lat) <= 90 && Math.abs(loc.lng) <= 180) {
    b.location = { lat: loc.lat, lng: loc.lng };
  }
  if (!b.phone || !b.pickupKhan || (!b.pickupAddress && !b.location)) return null;
  if (!Array.isArray(raw.parcels) || raw.parcels.length < 1 || raw.parcels.length > MAX_PARCELS) return null;
  for (const p of raw.parcels) {
    const cod = Number(p && p.cod);
    const item = {
      phone: phone(p && p.phone),
      name: str(p && p.name, 40),
      khan: khan(p && p.khan),
      address: str(p && p.address, 200),
      size: Object.hasOwn(SIZE_KM, p && p.size) ? p.size : "S",
      cod: Number.isFinite(cod) && cod > 0 && cod < 1e9 ? cod : 0,
      currency: p && p.currency === "USD" ? "USD" : "KHR",
    };
    if (!item.phone || !item.khan || !item.address) return null;
    b.parcels.push(item);
  }
  return b;
}

export function groupMessage(id, user, b, prices, total) {
  const e = escapeHtml;
  const who = user.username ? `@${e(user.username)}` : `<a href="tg://user?id=${user.id}">${e(user.first_name || "Telegram user")}</a>`;
  const map = b.location ? `\n🗺 <a href="https://maps.google.com/?q=${b.location.lat},${b.location.lng}">Google Maps</a>` : "";
  const lines = [
    `📦 <b>ការកក់ថ្មី · ${id}</b>`,
    `🏪 ${e(b.shop || "—")} · ${who}`,
    `📞 ${e(b.phone)}`,
    `📍 មកយក: <b>${KHAN_KM[b.pickupKhan]}</b> (${b.pickupKhan})${b.pickupAddress ? ` — ${e(b.pickupAddress)}` : ""}${map}`,
    `⏰ ${TIME_KM[b.pickupTime]}`,
    "",
  ];
  b.parcels.forEach((p, i) => {
    const cod = p.cod ? ` · COD ${p.currency === "USD" ? "$" + p.cod : fmtRiel(p.cod)}` : "";
    lines.push(`<b>${i + 1}.</b> ${e(p.name || "អ្នកទទួល")} · ${e(p.phone)}\n    ${KHAN_KM[p.khan]} — ${e(p.address)}\n    ${SIZE_KM[p.size]}${cod} · ថ្លៃដឹក ${fmtRiel(prices[i])}`);
  });
  lines.push("", `💰 សរុបថ្លៃដឹក: <b>${fmtRiel(total)}</b> · ${b.feePaidBy === "customer" ? "អតិថិជនបង់" : "អ្នកលក់បង់"}`);
  if (prices.some((p) => p === OFFER_PRICE)) lines.push("🎁 តម្លៃពិសេស ៣ ដងដំបូង");
  return lines.join("\n");
}

function offerActive(env) {
  if (!env.OFFER_END) return true;
  const end = Date.parse(env.OFFER_END + "T23:59:59+07:00");
  return Number.isNaN(end) ? true : Date.now() <= end;
}
async function getUsed(env, userId) {
  if (!env.KP) return 0;
  return Number(await env.KP.get(`used:${userId}`)) || 0;
}
async function setUsed(env, userId, n) {
  if (env.KP) await env.KP.put(`used:${userId}`, String(n));
}

function bookingId() {
  const rnd = crypto.getRandomValues(new Uint8Array(3));
  return "KP" + Date.now().toString(36).slice(-4).toUpperCase() + toHex(rnd).toUpperCase().slice(0, 4);
}
const fmtRiel = (n) => `${Math.round(n).toLocaleString("en-US")}៛`;
const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function tg(env, method, payload) {
  if (!env.BOT_TOKEN) return { ok: false };
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json().catch(() => ({ ok: false }));
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}
