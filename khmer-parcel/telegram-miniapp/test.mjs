// Tests the built worker with a fake bot token and a stubbed Telegram API.
// Usage: node build.mjs && node test.mjs
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

const worker = (await import("./dist/worker.js")).default;
const { verifyInitData, sanitize } = await import("./dist/worker.js");

const BOT_TOKEN = "123456:TEST-token";
const sent = [];
globalThis.fetch = async (url, opts) => {
  sent.push({ method: String(url).split("/").pop(), body: JSON.parse(opts.body) });
  return new Response(JSON.stringify({ ok: true, result: {} }));
};

function makeInitData(user, authDate = Math.floor(Date.now() / 1000)) {
  const p = new URLSearchParams({ auth_date: String(authDate), query_id: "AAE1", user: JSON.stringify(user) });
  const check = [...p.entries()].map(([k, v]) => `${k}=${v}`).sort().join("\n");
  const secret = createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  p.set("hash", createHmac("sha256", secret).update(check).digest("hex"));
  return p.toString();
}

const kv = new Map();
const env = {
  BOT_TOKEN, GROUP_CHAT_ID: "-1001", WEBHOOK_SECRET: "s3cret",
  KP: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => kv.set(k, v) },
};
const user = { id: 42, first_name: "Srey", username: "srey_shop" };
const booking = (n) => ({
  shop: "Srey <Shop>", phone: "012 345 678", pickupKhan: "Sen Sok", pickupAddress: "St 1986", pickupTime: "10:00", feePaidBy: "seller",
  parcels: Array.from({ length: n }, (_, i) => ({ phone: "096 123 456" + i, name: "C" + i, khan: "Toul Kork", address: "Near market", size: "M", cod: 25000, currency: "KHR" })),
});
const post = (path, body, headers = {}) =>
  worker.fetch(new Request("https://kp.example.workers.dev" + path, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) }), env);

// initData verification
assert.equal((await verifyInitData(makeInitData(user), BOT_TOKEN)).id, 42, "valid initData");
assert.equal(await verifyInitData(makeInitData(user).replace("Srey", "Evil"), BOT_TOKEN), null, "tampered initData rejected");
assert.equal(await verifyInitData(makeInitData(user), "999:other"), null, "wrong bot token rejected");
assert.equal(await verifyInitData(makeInitData(user, Math.floor(Date.now() / 1000) - 90000), BOT_TOKEN), null, "expired initData rejected");

// page
const page = await worker.fetch(new Request("https://kp.example.workers.dev/"), env);
assert.equal(page.status, 200);
assert.match(await page.text(), /telegram-web-app\.js/);

// booking without Telegram is refused
assert.equal((await post("/api/book", { initData: "", booking: booking(1) })).status, 401);

// config before any booking
let cfg = await (await post("/api/config", { initData: makeInitData(user) })).json();
assert.deepEqual([cfg.used, cfg.offerPrice, cfg.offerActive], [0, 2000, true]);

// first booking: 2 parcels at offer price
let r = await (await post("/api/book", { initData: makeInitData(user), booking: booking(2) })).json();
assert.ok(r.ok, JSON.stringify(r));
assert.deepEqual(r.prices, [2000, 2000]);
const groupMsg = sent.find((m) => m.body.chat_id === "-1001");
assert.ok(groupMsg, "posted to group");
assert.match(groupMsg.body.text, /Srey &lt;Shop&gt;/, "HTML escaped");
assert.match(groupMsg.body.text, /សែនសុខ/);
assert.ok(sent.some((m) => m.body.chat_id === 42), "confirmation to seller");

// second booking: 1 offer parcel left, then normal price
r = await (await post("/api/book", { initData: makeInitData(user), booking: booking(2) })).json();
assert.deepEqual(r.prices, [2000, 3000]);
cfg = await (await post("/api/config", { initData: makeInitData(user) })).json();
assert.equal(cfg.used, 4);

// offer ended
r = await (await worker.fetch(new Request("https://kp.example.workers.dev/api/book", { method: "POST", body: JSON.stringify({ initData: makeInitData({ id: 7, first_name: "N" }), booking: booking(1) }) }), { ...env, OFFER_END: "2020-01-01" })).json();
assert.deepEqual(r.prices, [3000], "no offer after OFFER_END");

// validation
assert.equal(sanitize({ ...booking(1), phone: "abc" }), null);
assert.equal(sanitize({ ...booking(1), pickupKhan: "Atlantis" }), null);
assert.equal(sanitize({ ...booking(11) }), null, "max 10 parcels");
assert.equal((await post("/api/book", { initData: makeInitData(user), booking: { ...booking(1), parcels: [] } })).status, 400);

// webhook
assert.equal((await post("/bot", { message: { text: "/start", chat: { id: 5, type: "private" } } })).status, 403, "webhook needs secret");
sent.length = 0;
await post("/bot", { message: { text: "/start", chat: { id: 5, type: "private" } } }, { "x-telegram-bot-api-secret-token": "s3cret" });
assert.equal(sent[0].body.reply_markup.inline_keyboard[0][0].web_app.url, "https://kp.example.workers.dev/");
sent.length = 0;
await post("/bot", { message: { text: "/chatid@KhmerParcelBot", chat: { id: -100555, type: "supergroup" } } }, { "x-telegram-bot-api-secret-token": "s3cret" });
assert.match(sent[0].body.text, /-100555/);

// setup
assert.equal((await worker.fetch(new Request("https://kp.example.workers.dev/setup?key=wrong"), env)).status, 403);
sent.length = 0;
const setup = await (await worker.fetch(new Request("https://kp.example.workers.dev/setup?key=s3cret"), env)).json();
assert.ok(setup.webhook && setup.menuButton);
assert.deepEqual(sent.map((s) => s.method), ["setWebhook", "setChatMenuButton", "setMyCommands"]);

console.log("all tests passed");
