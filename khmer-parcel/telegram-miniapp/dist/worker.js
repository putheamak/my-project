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

const APP_HTML = "<!doctype html>\n<html lang=\"km\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover\">\n<title>Khmer Parcel · កក់ដឹកឥវ៉ាន់</title>\n<script src=\"https://telegram.org/js/telegram-web-app.js\"></script>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link href=\"https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap\" rel=\"stylesheet\">\n<style>\n:root{\n  --blue:#1a78cf;--navy:#0d3868;--orange:#f08a14;--green:#1fa65a;--red:#e53935;\n  --bg:var(--tg-theme-secondary-bg-color,#eef4fa);--card:var(--tg-theme-bg-color,#fff);\n  --text:var(--tg-theme-text-color,#0d3868);--hint:var(--tg-theme-hint-color,#6a7f97);\n  --btn:var(--tg-theme-button-color,#1a78cf);--btn-text:var(--tg-theme-button-text-color,#fff);\n  --line:color-mix(in srgb,var(--hint) 30%,transparent);\n}\n*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:\"Kantumruy Pro\",system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:16px;line-height:1.5;padding:0 0 110px}\nheader{background:linear-gradient(135deg,#1a78cf,#0d3868);color:#fff;padding:18px 16px 22px}\nheader .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px}\nheader .brand svg{width:38px;height:38px;flex:none}\nheader p{opacity:.9;font-size:14px;margin-top:4px}\n.offer{margin:-12px 12px 0;background:var(--orange);color:#fff;border-radius:16px;padding:12px 14px;font-weight:700;display:flex;gap:10px;align-items:center;box-shadow:0 6px 16px rgba(240,138,20,.35)}\n.offer small{display:block;font-weight:400;font-size:13px;opacity:.95}\n.offer[hidden]{display:none}\nsection.card{background:var(--card);margin:12px;border-radius:16px;padding:14px}\nh2{font-size:17px;display:flex;align-items:center;gap:8px;margin-bottom:10px}\nh2 .n{width:26px;height:26px;border-radius:8px;background:var(--btn);color:var(--btn-text);font-size:14px;display:inline-flex;align-items:center;justify-content:center}\nlabel{display:block;font-size:13px;color:var(--hint);margin:10px 0 4px}\ninput,select,textarea{width:100%;font:inherit;color:var(--text);background:var(--bg);border:1.5px solid transparent;border-radius:12px;padding:11px 12px;outline:none}\ninput:focus,select:focus,textarea:focus{border-color:var(--btn)}\ninput.bad,select.bad{border-color:var(--red)}\ntextarea{resize:vertical;min-height:44px}\n.row{display:flex;gap:8px}\n.row>*{flex:1;min-width:0}\n.seg{display:flex;gap:6px;flex-wrap:wrap}\n.seg button{flex:1;min-width:0;font:inherit;font-size:14px;border:1.5px solid var(--line);background:var(--card);color:var(--text);border-radius:12px;padding:9px 6px;cursor:pointer;line-height:1.3}\n.seg button small{display:block;color:var(--hint);font-size:11px}\n.seg button.on{border-color:var(--btn);background:color-mix(in srgb,var(--btn) 12%,var(--card));font-weight:700}\n.ghost{font:inherit;font-size:14px;background:none;border:1.5px dashed var(--btn);color:var(--btn);border-radius:12px;padding:10px;width:100%;margin-top:10px;cursor:pointer;font-weight:600}\n.loc{font:inherit;font-size:13px;background:none;border:none;color:var(--btn);margin-top:6px;cursor:pointer;font-weight:600}\n.parcel{border:1.5px solid var(--line);border-radius:14px;padding:10px 12px 12px;margin-top:10px}\n.parcel .ph{display:flex;justify-content:space-between;align-items:center;font-weight:700}\n.parcel .ph .price{font-size:13px;color:var(--green)}\n.parcel .ph button{background:none;border:none;color:var(--red);font:inherit;font-size:13px;cursor:pointer}\n.sum{display:flex;justify-content:space-between;align-items:baseline;padding:4px 0}\n.sum b{font-size:22px}\n.note{font-size:12px;color:var(--hint);margin-top:6px}\n.err{color:var(--red);font-size:13px;margin-top:8px;display:none}\n.fallback{position:fixed;left:0;right:0;bottom:0;padding:12px;background:var(--card);box-shadow:0 -4px 16px rgba(0,0,0,.08)}\n.fallback button{width:100%;font:inherit;font-weight:700;font-size:17px;background:var(--btn);color:var(--btn-text);border:none;border-radius:14px;padding:14px;cursor:pointer}\n.fallback[hidden]{display:none}\n#done{display:none;text-align:center;padding:40px 20px}\n#done .ok{width:84px;height:84px;border-radius:50%;background:var(--green);color:#fff;font-size:46px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}\n#done .code{font-size:28px;font-weight:700;letter-spacing:.06em;background:var(--card);border-radius:14px;padding:12px;margin:14px 0}\n</style>\n</head>\n<body>\n<div id=\"form\">\n<header>\n  <div class=\"brand\">\n    <svg viewBox=\"0 0 64 64\"><rect width=\"64\" height=\"64\" rx=\"16\" fill=\"#fff\" opacity=\".18\"/><path d=\"M32 10 52 21v22L32 54 12 43V21Z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M12 21l20 11 20-11M32 32v22\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg>\n    ខ្មែរផាសែល · Khmer Parcel\n  </div>\n  <p>កក់ដឹកឥវ៉ាន់ សម្រាប់អ្នកលក់អនឡាញ · Online seller booking</p>\n</header>\n<div class=\"offer\" id=\"offer\" hidden>\n  <span style=\"font-size:26px\">★</span>\n  <span><span id=\"offerText\">៣ ដងដំបូង ត្រឹម ២,០០០៛ / ជើង</span><small>សម្រាប់អ្នកលក់ថ្មី · First 3 deliveries for new sellers</small></span>\n</div>\n\n<section class=\"card\">\n  <h2><span class=\"n\">១</span>ហាង / អ្នកផ្ញើ · Shop</h2>\n  <label for=\"shop\">ឈ្មោះហាង · Shop name</label>\n  <input id=\"shop\" autocomplete=\"organization\" placeholder=\"ឧ. ហាងសម្លៀកបំពាក់ស្រីលក្ខណ៍\">\n  <label for=\"sphone\">លេខទូរស័ព្ទ · Phone *</label>\n  <input id=\"sphone\" type=\"tel\" inputmode=\"tel\" placeholder=\"012 345 678\">\n  <label for=\"pkhan\">ខណ្ឌមកយក · Pick-up Khan *</label>\n  <select id=\"pkhan\"></select>\n  <label for=\"paddr\">អាសយដ្ឋាន / ចំណាំ · Address or landmark *</label>\n  <textarea id=\"paddr\" rows=\"2\" placeholder=\"ផ្ទះលេខ ផ្លូវ ឬ ក្បែរអ្វី\"></textarea>\n  <button class=\"loc\" type=\"button\" id=\"locBtn\">◎ ប្រើទីតាំងបច្ចុប្បន្ន · Use my location</button>\n  <div class=\"note\" id=\"locNote\"></div>\n  <label>ពេលមកយក · Pick-up time</label>\n  <div class=\"seg\" id=\"ptime\">\n    <button type=\"button\" data-v=\"asap\" class=\"on\">ឆាប់ៗ<small>ASAP</small></button>\n    <button type=\"button\" data-v=\"10:00\">ព្រឹក ១០:០០<small>10 AM</small></button>\n    <button type=\"button\" data-v=\"15:00\">រសៀល ៣:០០<small>3 PM</small></button>\n  </div>\n</section>\n\n<section class=\"card\">\n  <h2><span class=\"n\">២</span>កញ្ចប់ & អ្នកទទួល · Parcels</h2>\n  <div id=\"parcels\"></div>\n  <button class=\"ghost\" type=\"button\" id=\"addBtn\">＋ បន្ថែមកញ្ចប់ · Add parcel</button>\n</section>\n\n<section class=\"card\">\n  <h2><span class=\"n\">៣</span>ការបង់ថ្លៃដឹក · Delivery fee</h2>\n  <div class=\"seg\" id=\"payer\">\n    <button type=\"button\" data-v=\"seller\" class=\"on\">អ្នកលក់បង់<small>Seller pays</small></button>\n    <button type=\"button\" data-v=\"customer\">អតិថិជនបង់<small>Customer pays</small></button>\n  </div>\n  <div class=\"sum\" style=\"margin-top:12px\"><span>សរុបថ្លៃដឹក · Total fee</span><b id=\"total\">0៛</b></div>\n  <div class=\"note\" id=\"sumNote\">តម្លៃប៉ាន់ស្មាន · ការិយាល័យនឹងបញ្ជាក់ម្តងទៀត។ Estimate — the office confirms by Telegram.</div>\n  <div class=\"err\" id=\"err\"></div>\n</section>\n<div class=\"fallback\" id=\"fallback\" hidden><button type=\"button\" id=\"fbBtn\">កក់ឥឡូវ · Book now</button></div>\n</div>\n\n<div id=\"done\">\n  <div class=\"ok\">✓</div>\n  <h2 style=\"justify-content:center;font-size:20px\">បានទទួលការកក់!</h2>\n  <p>Booking received. We'll confirm on Telegram shortly.</p>\n  <div class=\"code\" id=\"doneCode\"></div>\n  <p class=\"note\">អ្នកដឹកនឹងហៅទូរស័ព្ទមុនមកដល់។ The rider calls before arriving.</p>\n  <button class=\"ghost\" type=\"button\" id=\"againBtn\" style=\"margin-top:20px\">កក់ម្តងទៀត · Book again</button>\n</div>\n\n<template id=\"parcelTpl\">\n  <div class=\"parcel\">\n    <div class=\"ph\"><span class=\"t\"></span><span><span class=\"price\"></span> <button type=\"button\" class=\"rm\">លុប</button></span></div>\n    <label>លេខអ្នកទទួល · Receiver phone *</label>\n    <input class=\"rphone\" type=\"tel\" inputmode=\"tel\" placeholder=\"096 123 4567\">\n    <div class=\"row\">\n      <div><label>ឈ្មោះ · Name</label><input class=\"rname\" placeholder=\"ស្រេចចិត្ត\"></div>\n      <div><label>ខណ្ឌ · Khan *</label><select class=\"rkhan\"></select></div>\n    </div>\n    <label>អាសយដ្ឋាន · Address *</label>\n    <input class=\"raddr\" placeholder=\"ផ្ទះលេខ ផ្លូវ ឬ ក្បែរអ្វី\">\n    <label>ទំហំ · Size</label>\n    <div class=\"seg size\">\n      <button type=\"button\" data-v=\"S\" class=\"on\">ឯកសារ/តូច<small>≤ 2kg</small></button>\n      <button type=\"button\" data-v=\"M\">មធ្យម<small>2–8kg</small></button>\n      <button type=\"button\" data-v=\"L\">ធំ<small>8–15kg</small></button>\n    </div>\n    <label>ប្រាក់ COD ប្រមូលពីអតិថិជន · Cash to collect</label>\n    <div class=\"row\">\n      <input class=\"cod\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"any\" placeholder=\"0 = គ្មាន COD\" style=\"flex:2\">\n      <select class=\"cur\" style=\"flex:1\"><option value=\"KHR\">៛ រៀល</option><option value=\"USD\">$ ដុល្លារ</option></select>\n    </div>\n  </div>\n</template>\n\n<script>\nconst KHANS=[[\"Daun Penh\",\"ដូនពេញ\"],[\"Prampi Makara\",\"ប្រាំពីរមករា\"],[\"Chamkar Mon\",\"ចំការមន\"],[\"Boeng Keng Kang\",\"បឹងកេងកង\"],\n[\"Toul Kork\",\"ទួលគោក\"],[\"Russey Keo\",\"ឫស្សីកែវ\"],[\"Sen Sok\",\"សែនសុខ\"],[\"Pou Senchey\",\"ពោធិ៍សែនជ័យ\"],[\"Mean Chey\",\"មានជ័យ\"],\n[\"Chbar Ampov\",\"ច្បារអំពៅ\"],[\"Dangkao\",\"ដង្កោ\"],[\"Prek Pnov\",\"ព្រែកព្នៅ\"],[\"Chroy Changvar\",\"ជ្រោយចង្វារ\"],[\"Kamboul\",\"កំបូល\"]];\nconst KH_DIGITS='០១២៣៤៥៦៧៨៩';\nconst kh=s=>String(s).replace(/\\d/g,d=>KH_DIGITS[d]);\nconst riel=n=>kh(n.toLocaleString('en-US'))+'៛';\nconst $=s=>document.querySelector(s);\nconst tg=window.Telegram&&window.Telegram.WebApp;\nconst inTelegram=!!(tg&&tg.initData);\n\nlet cfg={normalPrice:3000,offerPrice:2000,offerCount:3,offerActive:true,used:0};\nlet geo=null;\n\nfunction khanOptions(sel){\n  sel.innerHTML='<option value=\"\">— ជ្រើសខណ្ឌ · Choose —</option>'+KHANS.map(([en,km])=>`<option value=\"${en}\">${km} · ${en}</option>`).join('');\n}\nfunction segValue(el){return el.querySelector('button.on').dataset.v}\nfunction bindSeg(el,onChange){\n  el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;\n    el.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));tg&&tg.HapticFeedback&&tg.HapticFeedback.selectionChanged();onChange&&onChange()});\n}\nfunction priceFor(i){return cfg.offerActive&&cfg.used+i<cfg.offerCount?cfg.offerPrice:cfg.normalPrice}\n\nfunction addParcel(){\n  const node=$('#parcelTpl').content.firstElementChild.cloneNode(true);\n  khanOptions(node.querySelector('.rkhan'));\n  bindSeg(node.querySelector('.size'));\n  node.querySelector('.rm').onclick=()=>{node.remove();renumber()};\n  $('#parcels').appendChild(node);renumber();\n}\nfunction renumber(){\n  const list=[...document.querySelectorAll('.parcel')];\n  list.forEach((p,i)=>{p.querySelector('.t').textContent='កញ្ចប់ទី '+kh(i+1)+' · Parcel '+(i+1);\n    p.querySelector('.price').textContent=riel(priceFor(i));\n    p.querySelector('.rm').style.display=list.length>1?'':'none'});\n  $('#total').textContent=riel(list.reduce((s,_,i)=>s+priceFor(i),0));\n  $('#addBtn').style.display=list.length>=10?'none':'';\n}\n\nfunction collect(){\n  const err=[];const bad=el=>{el.classList.add('bad');return el};\n  document.querySelectorAll('.bad').forEach(e=>e.classList.remove('bad'));\n  const phoneOk=v=>/^\\+?[0-9 ]{8,15}$/.test(v.trim());\n  const sphone=$('#sphone'),pkhan=$('#pkhan'),paddr=$('#paddr');\n  if(!phoneOk(sphone.value))err.push(bad(sphone));\n  if(!pkhan.value)err.push(bad(pkhan));\n  if(!paddr.value.trim()&&!geo)err.push(bad(paddr));\n  const parcels=[...document.querySelectorAll('.parcel')].map(p=>{\n    const q=s=>p.querySelector(s);\n    if(!phoneOk(q('.rphone').value))err.push(bad(q('.rphone')));\n    if(!q('.rkhan').value)err.push(bad(q('.rkhan')));\n    if(!q('.raddr').value.trim())err.push(bad(q('.raddr')));\n    const cod=parseFloat(q('.cod').value)||0;\n    return{phone:q('.rphone').value.trim(),name:q('.rname').value.trim(),khan:q('.rkhan').value,address:q('.raddr').value.trim(),\n      size:segValue(q('.size')),cod:cod>0?cod:0,currency:q('.cur').value};\n  });\n  return{err,booking:{shop:$('#shop').value.trim(),phone:sphone.value.trim(),pickupKhan:pkhan.value,pickupAddress:paddr.value.trim(),\n    location:geo,pickupTime:segValue($('#ptime')),feePaidBy:segValue($('#payer')),parcels}};\n}\n\nfunction showError(msg){const e=$('#err');e.textContent=msg;e.style.display='block';tg&&tg.HapticFeedback&&tg.HapticFeedback.notificationOccurred('error')}\n\nlet sending=false;\nasync function submit(){\n  if(sending)return;\n  $('#err').style.display='none';\n  const{err,booking}=collect();\n  if(err.length){err[0].scrollIntoView({behavior:'smooth',block:'center'});showError('សូមបំពេញព័ត៌មានដែលមានសញ្ញា * · Please fill the required fields.');return}\n  sending=true;setBusy(true);\n  try{\n    const r=await fetch('api/book',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({initData:tg?tg.initData:'',booking})});\n    const j=await r.json().catch(()=>({}));\n    if(!r.ok||!j.ok)throw new Error(j.error||('HTTP '+r.status));\n    saveProfile(booking);\n    $('#form').style.display='none';$('#done').style.display='block';$('#doneCode').textContent=j.id;\n    if(tg){tg.MainButton.hide();tg.HapticFeedback&&tg.HapticFeedback.notificationOccurred('success')}\n    $('#fallback').hidden=true;\n    cfg.used+=booking.parcels.length;\n  }catch(e){showError('មិនអាចកក់បានទេ សូមព្យាយាមម្តងទៀត ឬ ទាក់ទង Telegram 098 429 597 · '+e.message)}\n  finally{sending=false;setBusy(false)}\n}\nfunction setBusy(on){\n  if(tg&&inTelegram){on?tg.MainButton.showProgress():tg.MainButton.hideProgress()}\n  $('#fbBtn').disabled=on;\n}\n\nconst PROFILE_KEY='kp_profile';\nfunction saveProfile(b){\n  const p=JSON.stringify({shop:b.shop,phone:b.phone,pickupKhan:b.pickupKhan,pickupAddress:b.pickupAddress});\n  try{localStorage.setItem(PROFILE_KEY,p)}catch(e){}\n  try{tg&&tg.CloudStorage&&tg.CloudStorage.setItem(PROFILE_KEY,p)}catch(e){}\n}\nfunction applyProfile(raw){\n  try{const p=JSON.parse(raw);if(!p)return;\n    $('#shop').value||=p.shop||'';$('#sphone').value||=p.phone||'';\n    if(!$('#pkhan').value&&p.pickupKhan)$('#pkhan').value=p.pickupKhan;$('#paddr').value||=p.pickupAddress||''}catch(e){}\n}\nfunction loadProfile(){\n  try{applyProfile(localStorage.getItem(PROFILE_KEY))}catch(e){}\n  try{tg&&tg.CloudStorage&&tg.CloudStorage.getItem(PROFILE_KEY,(e,v)=>{if(!e&&v)applyProfile(v)})}catch(e){}\n}\n\nasync function loadConfig(){\n  try{\n    const r=await fetch('api/config',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({initData:tg?tg.initData:''})});\n    if(r.ok)Object.assign(cfg,await r.json());\n  }catch(e){}\n  const left=Math.max(0,cfg.offerCount-cfg.used);\n  $('#offer').hidden=!(cfg.offerActive&&left>0);\n  if(left>0&&left<cfg.offerCount)$('#offerText').textContent='នៅសល់ '+kh(left)+' ដង តម្លៃ '+riel(cfg.offerPrice)+' / ជើង';\n  renumber();\n}\n\n$('#locBtn').onclick=()=>{\n  if(!navigator.geolocation){$('#locNote').textContent='ទូរស័ព្ទនេះមិនអាចផ្ញើទីតាំងបាន · Location not available';return}\n  $('#locNote').textContent='កំពុងស្វែងរក... · Locating...';\n  navigator.geolocation.getCurrentPosition(p=>{geo={lat:+p.coords.latitude.toFixed(6),lng:+p.coords.longitude.toFixed(6)};\n    $('#locNote').textContent='✓ បានភ្ជាប់ទីតាំង · Location attached ('+geo.lat+', '+geo.lng+')'},\n    ()=>{$('#locNote').textContent='មិនអាចយកទីតាំងបាន សូមសរសេរអាសយដ្ឋាន · Could not get location'},{enableHighAccuracy:true,timeout:10000});\n};\ndocument.addEventListener('input',e=>{e.target.classList.remove('bad');$('#err').style.display='none'});\n$('#addBtn').onclick=addParcel;\n$('#againBtn').onclick=()=>{$('#parcels').innerHTML='';addParcel();$('#done').style.display='none';$('#form').style.display='';initButtons();loadConfig()};\n$('#fbBtn').onclick=submit;\nbindSeg($('#ptime'));bindSeg($('#payer'));\nkhanOptions($('#pkhan'));\n\nfunction initButtons(){\n  if(tg&&inTelegram){\n    tg.MainButton.setParams({text:'កក់ឥឡូវ · BOOK NOW',is_visible:true});\n  }else{$('#fallback').hidden=false}\n}\nif(tg){tg.ready();tg.expand();tg.MainButton.onClick(submit);\n  if(tg.initDataUnsafe&&tg.initDataUnsafe.user)$('#shop').placeholder=(tg.initDataUnsafe.user.first_name||'')+' shop';}\naddParcel();loadProfile();initButtons();loadConfig();\n</script>\n</body>\n</html>\n";

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
