#!/usr/bin/env python3
"""Tri-fold brochure (A4 landscape, roll fold) for both Khmer Parcel services.
Writes brochure_trifold.html (trim size, for office printers) and brochure_trifold_bleed.html (+3 mm bleed, for print shops).
Page 1 = outside [flap 97 | back 100 | cover 100 mm], page 2 = inside [100 | 100 | 97 mm].
Usage: python3 make_brochure.py && NODE_PATH=$(npm root -g) node render_brochure.cjs"""
F = "../tvc-source/"

FONTS = f"""@font-face{{font-family:KP;src:url({F}kantumruy-pro-khmer-400-normal.woff2);font-weight:400;unicode-range:U+1780-17FF,U+19E0-19FF,U+200C-200D,U+25CC}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-khmer-700-normal.woff2);font-weight:700;unicode-range:U+1780-17FF,U+19E0-19FF,U+200C-200D,U+25CC}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-latin-400-normal.woff2);font-weight:400;unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-latin-700-normal.woff2);font-weight:700;unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122}}
@font-face{{font-family:Moul;src:url({F}moul-khmer-400-normal.woff2)}}"""

# small line icons (stroke = currentColor)
I = {
    "cube": '<path d="M32 6 56 19v26L32 58 8 45V19Z M8 19l24 13 24-13M32 32v26" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
    "pin": '<path d="M32 4C20 4 11 13 11 25c0 16 21 35 21 35s21-19 21-35C53 13 44 4 32 4Z" fill="currentColor"/><circle cx="32" cy="25" r="8" fill="#fff"/>',
    "phone": '<path d="M20 6c2 0 4 1 5 3l5 10c1 2 0 4-1 6l-4 4c3 7 9 13 16 16l4-4c2-1 4-2 6-1l10 5c2 1 3 3 3 5v7c0 3-3 6-6 6C30 63 1 34 1 6c0-3 3-6 6-6Z" transform="translate(3 2) scale(.9)" fill="currentColor"/>',
    "clock": '<circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="5"/><path d="M32 16v17l11 7" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
    "coin": '<circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="5"/><path d="M38 22c-2-3-12-4-12 3s14 4 14 11-11 7-14 3M32 15v34" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
    "boxes": '<g fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><rect x="6" y="30" width="24" height="24" rx="3"/><rect x="34" y="30" width="24" height="24" rx="3"/><rect x="20" y="6" width="24" height="24" rx="3"/></g>',
    "bike": '<g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="46" r="9"/><circle cx="50" cy="46" r="9"/><path d="M14 46h14l8-16h10l4 16M36 30l-4-10h-8M44 30V20h8"/></g>',
    "card": '<g fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><rect x="6" y="14" width="52" height="36" rx="5"/><path d="M6 26h52M14 40h12"/></g>',
    "chat": '<path d="M8 12h48v32H26l-12 10V44H8Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M18 26h28M18 34h18" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
    "heart": '<path d="M32 54S8 40 8 23c0-8 6-13 13-13 5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 5 13 13 0 17-24 31-24 31Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
    "eye": '<path d="M4 32s10-18 28-18 28 18 28 18-10 18-28 18S4 32 4 32Z" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="32" r="8" fill="currentColor"/>',
    "tg": '<circle cx="32" cy="32" r="30" fill="#29a9eb"/><path d="M14 31l32-13c2-1 3 0 3 2l-5 25c0 2-2 2-3 1l-8-6-4 4c-1 1-2 0-2-1l1-7 14-13-18 11-8-2c-2-1-2-2 0-3Z" fill="#fff"/>',
    "globe": '<circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" stroke-width="5"/><path d="M5 32h54M32 5c-9 9-9 45 0 54M32 5c9 9 9 45 0 54" fill="none" stroke="currentColor" stroke-width="4"/>',
    "fb": '<rect x="4" y="4" width="56" height="56" rx="12" fill="#1877f2"/><path d="M36 54V36h6l1-7h-7v-4c0-2 1-4 4-4h3v-6c-1 0-3-1-6-1-6 0-9 4-9 10v5h-6v7h6v18Z" fill="#fff"/>',
    "shirt": '<path d="M22 8 6 18l6 12 8-4v30h24V26l8 4 6-12L42 8c-2 5-6 8-10 8s-8-3-10-8Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
    "lip": '<path d="M24 58V30h16v28Z M26 30l4-20h4l4 20" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
    "doc": '<path d="M14 6h26l12 12v40H14Z M40 6v12h12M22 30h20M22 38h20M22 46h12" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
    "gift": '<g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><rect x="8" y="24" width="48" height="32" rx="3"/><path d="M4 16h56v8H4ZM32 16v40M32 16c-6-10-18-10-16-2 1 3 10 2 16 2Zm0 0c6-10 18-10 16-2-1 3-10 2-16 2Z"/></g>',
    "shoe": '<path d="M6 44V20h14c2 8 10 10 18 12l14 4c4 1 6 4 6 8v4H6Z M6 44h52" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
    "mobile": '<rect x="18" y="4" width="28" height="56" rx="5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M28 52h8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
}


def ic(name, cls="ic"):
    return f'<svg class="{cls}" viewBox="0 0 64 64">{I[name]}</svg>'


def li(icon, km, en):
    return f'<div class="li"><span class="lic">{ic(icon)}</span><span><b>{km}</b><i>{en}</i></span></div>'


def step(n, km, en=""):
    return f'<div class="stp"><span class="n">{n}</span><span><b>{km}</b>{f"<i>{en}</i>" if en else ""}</span></div>'


LOGO = f'<span class="logo">{ic("cube")}</span>'

flap = f"""
<div class="pad">
  <div><div class="kick">ហេតុអ្វីជ្រើស</div>
  <h2 class="moul">ខ្មែរផាសែល?</h2>
  <div class="sub">Why Khmer Parcel</div></div>
  <div class="map"><div class="maptag">{ic("pin")}ដឹកដល់ ១៤ ខណ្ឌ ភ្នំពេញ</div><div class="osm">© OpenStreetMap contributors</div></div>
  {li("bike", "ទៅយកដល់កន្លែង", "We pick up at your door or shop")}
  {li("phone", "អ្នកដឹកហៅទូរស័ព្ទមុនមកដល់", "The rider calls before arriving")}
  {li("card", "បង់ពេលទទួល (COD) ឬ បង់មុនតាម QR", "Pay on delivery or prepay by QR")}
  {li("chat", "សេវាជាភាសាខ្មែរ តាម Telegram", "Friendly Khmer support on Telegram")}
  {li("heart", "ដឹកដោយយកចិត្តទុកដាក់", "Every parcel delivered with care")}
</div>"""

back = f"""
<div class="pad backp">
  <div><h2 class="moul" style="color:#0d3868">ទាក់ទងយើង</h2>
  <div class="sub">Contact us · ទូរស័ព្ទ · Telegram · គេហទំព័រ</div></div>
  <div class="ct">{ic("phone")}<span><b>012 429 597</b><b>092 678 657</b></span></div>
  <div class="ct">{ic("tg", "ic tgc")}<span><b>Telegram 098 429 597</b><i>Bot: t.me/KhmerParcelBot</i></span></div>
  <div class="ct">{ic("globe")}<span><b>www.khmerparcel.com</b></span></div>
  <div class="ct">{ic("fb", "ic tgc")}<span><b>ខ្មែរ ផាសែល-Khmer Parcel</b><i>Facebook Page</i></span></div>
  <div class="qrs">
    <div class="qrb"><img src="qr_web_vector.svg"><b>ទៅយក និងដឹកដល់ផ្ទះ</b><i>khmerparcel.com</i></div>
    <div class="qrb"><img src="qr_bot_vector.svg"><b>អ្នកលក់អនឡាញ</b><i>@KhmerParcelBot</i></div>
  </div>
  <div class="since">{LOGO}<span><b>ខ្មែរផាសែល · Khmer Parcel</b><i>បម្រើសេវាតាំងពី ១ តុលា ២០២៦ · រាជធានីភ្នំពេញ</i></span></div>
</div>"""

cover = f"""
<div class="cov">
  <div class="covtop">
    <div class="brand">{LOGO}<span>ខ្មែរផាសែល<small>KHMER PARCEL</small></span></div>
    <h1 class="moul">សេវាដឹកឥវ៉ាន់<br>ក្នុងភ្នំពេញ</h1>
    <div class="tagl">ងាយស្រួល · រហ័ស · ទុកចិត្តបាន</div>
  </div>
  <div class="covph"></div>
  <div class="covsv">
    <div class="sv d2d"><b>ទៅយក និងដឹកដល់ផ្ទះ</b><span>ចាប់ពី <em>$1.50</em></span><i>Door to Door · everyone</i></div>
    <div class="sv sel"><b>សម្រាប់អ្នកលក់អនឡាញ</b><span><em>$0.75</em> / កញ្ចប់</span><i>Online sellers · per parcel</i></div>
  </div>
  <div class="covft">{ic("pin")}ទៅយក និងដឹកដល់ ១៤ ខណ្ឌ ក្នុងរាជធានីភ្នំពេញ</div>
</div>"""

p1 = f"""
<div class="hd d2dbg"><span class="num">១</span><span><b class="moul">ទៅយក និងដឹកដល់ផ្ទះ</b><i>Door to Door · សម្រាប់អ្នកទាំងអស់គ្នា</i></span></div>
<div class="pad">
  <div><div class="price d2dc">ចាប់ពី <em>$1.50</em> <small>(៦,០០០៛)</small></div>
  <div class="note">តម្លៃគណនាតាមចម្ងាយ ដោយប្រព័ន្ធ · Price calculated by distance on the website</div></div>
  <div class="ph1"></div>
  <div class="sec">កក់ខ្លួនឯង លើគេហទំព័រ · Book on the website</div>
  {step("១", "បើក www.khmerparcel.com", "Open the website")}
  {step("២", "ដាក់ទីតាំង A ទៅយក លើផែនទី", "Drop pin A — pick-up")}
  {step("៣", "ដាក់ទីតាំង B ដឹកដល់", "Drop pin B — drop-off")}
  {step("៤", "មើលចម្ងាយ និងតម្លៃ → បំពេញទំហំ និងលេខទូរស័ព្ទ → កក់", "See distance & price, add parcel size and phones, book")}
  <div class="ex">{ic("pin")}<span><b>ឧទាហរណ៍៖ សែនសុខ → ទួលគោក · 6.8 km = $1.50</b><i>Example from the website</i></span></div>
  {li("eye", "តាមដានការដឹកផ្ទាល់", "Follow your delivery live")}
  {li("card", "បង់ពេលទទួល ឬ បង់មុនតាម QR", "Pay on delivery or prepay by QR")}
</div>"""

p2 = f"""
<div class="hd selbg"><span class="num">២</span><span><b class="moul">សម្រាប់អ្នកលក់អនឡាញ</b><i>Online sellers · ផ្ញើច្រើន តម្លៃថេរ</i></span></div>
<div class="pad">
  <div><div class="price selc"><em>$0.75</em> <small>/ កញ្ចប់ (៣,០០០៛)</small></div>
  <div class="note">តម្លៃថេរ ក្នុងភ្នំពេញ · Flat price per parcel · ៥ កញ្ចប់ = $3.75</div></div>
  {li("clock", "កក់តាម Telegram ក្នុង ៣០ វិនាទី", "Book in the Telegram bot in 30 seconds")}
  {li("boxes", "កក់ចាប់ពី៥កញ្ចប់ឡើង", "5–10 parcels per booking, one pick-up")}
  {li("bike", "មកយកដល់ហាង · ឆាប់ៗ / ១០:០០ / ៣:០០ រសៀល", "Pick-up at your shop: ASAP, 10 AM or 3 PM")}
  {li("pin", "ដឹកជញ្ជូនដល់ដៃ ក្នុងរយៈពេល២៤ម៉ោង", "Delivered within 24 hours of pick-up")}
  {li("coin", "ប្រមូល COD · ប្រគល់ប្រាក់ក្នុងថ្ងៃដដែល", "We collect COD and pay you the same day")}
  {li("card", "ថ្លៃដឹក៖ អ្នកលក់បង់ ឬ អតិថិជនបង់", "Fee paid by the seller or by the customer")}
  <div class="proof"><div class="ph2"></div><span><b>ការកក់ពិត · ១៤ តុលា ២០២៦</b>២ កញ្ចប់ · ប្រាក់ COD <em>$22</em> ប្រគល់ជូនអ្នកលក់ ក្នុងថ្ងៃដដែល<i>A real booking: COD $22 paid back the same day</i></span></div>
</div>"""

p3 = f"""
<div class="hd navybg"><span class="num">{ic("tg", "ic hdtg")}</span><span><b class="moul">កក់ ៣ ជំហាន</b><i>Book in 3 steps · Telegram</i></span></div>
<div class="pad">
  <div class="bigqr"><img src="qr_bot_vector.svg"><b>t.me/KhmerParcelBot</b></div>
  {step("១", "ស្កេន QR ឬចុចតំណខាងលើ", "Scan the QR or open the link")}
  {step("២", "ចុច «កក់ឥឡូវ» · បំពេញអ្នកទទួល", "Tap Book now, add the receivers")}
  {step("៣", "ការិយាល័យបញ្ជាក់ · អ្នកដឹកមកយក", "The office confirms, the rider picks up")}
  <div class="sec">ផ្ញើអ្វីបានខ្លះ? · What can you send?</div>
  <div class="items">
    <span>{ic("shirt")}សម្លៀកបំពាក់</span><span>{ic("lip")}គ្រឿងសំអាង</span><span>{ic("doc")}ឯកសារ</span>
    <span>{ic("gift")}កាដូ</span><span>{ic("shoe")}ស្បែកជើង</span><span>{ic("mobile")}គ្រឿងទូរស័ព្ទ</span>
  </div>
  <div class="sizes"><span><b>តូច</b>≤ 2 kg</span><span><b>មធ្យម</b>2–8 kg</span><span><b>ធំ</b>8–15 kg</span></div>
  <div class="note" style="text-align:center">Door to Door៖ កក់លើ www.khmerparcel.com</div>
</div>"""

CSS = """*{box-sizing:border-box;margin:0;padding:0}
:root{--blue:#1a78cf;--navy:#0d3868;--sky:#dff0fc;--orange:#f08a14;--red:#e0442f;--green:#1fa65a;--muted:#5d7591}
html,body{width:var(--pw)}
body{font-family:KP,sans-serif;color:var(--navy);font-size:9pt;line-height:1.45}
.sheet{position:relative;width:var(--pw);height:var(--ph);overflow:hidden;page-break-after:always;display:flex}
.panel{position:relative;height:100%;padding:var(--b) 0;overflow:hidden;flex:none}
.panel.first{padding-left:var(--b)}.panel.last{padding-right:var(--b)}
.inner{position:relative;height:210mm;overflow:visible;display:flex;flex-direction:column}
.moul{font-family:Moul,KP;font-weight:400;line-height:1.6}
.pad{padding:7mm 7mm 9mm;flex:1;display:flex;flex-direction:column;justify-content:space-between}
.ic{width:5mm;height:5mm;flex:none}
.logo{width:9mm;height:9mm;border-radius:2.4mm;background:var(--blue);color:#fff;display:inline-flex;align-items:center;justify-content:center;flex:none;box-shadow:inset 0 0 0 .6mm rgba(255,255,255,.85)}
.logo .ic{width:6mm;height:6mm}
.kick{font-size:10pt;font-weight:700;color:var(--orange)}
h2{font-size:19pt;color:var(--blue)}
.sub{font-size:8pt;color:var(--muted);margin-top:-1mm}
.li{display:flex;gap:3mm;align-items:center;margin:0}
.lic{width:10mm;height:10mm;border-radius:2.4mm;background:var(--sky);color:var(--blue);display:flex;align-items:center;justify-content:center;flex:none}
.li b{display:block;font-size:9.6pt;line-height:1.4}
.li i,.stp i{display:block;font-style:normal;font-size:7.4pt;color:var(--muted);line-height:1.3}
.map{height:64mm;border-radius:4mm;background:url(../tvc-source/photos_map/pp_osm.png) center/cover;position:relative;margin-bottom:3mm;box-shadow:0 1mm 3mm rgba(13,56,104,.18)}
.maptag{position:absolute;left:3mm;top:3mm;background:#fff;border-radius:99px;padding:.8mm 3mm .8mm 1.6mm;font-weight:700;font-size:8pt;display:flex;align-items:center;gap:1mm;color:var(--navy);box-shadow:0 .5mm 2mm rgba(0,0,0,.2)}
.maptag .ic{color:var(--red)}
.osm{position:absolute;right:1.5mm;bottom:1mm;font-size:4.6pt;background:rgba(255,255,255,.85);padding:0 1mm;border-radius:1mm;color:#333}
/* back */
.backp{background:#fff}
.ct{display:flex;align-items:center;gap:3.4mm;margin:0}
.ct>.ic{width:9.5mm;height:9.5mm;color:var(--blue)}
.ct b{display:block;font-size:11.5pt;line-height:1.35}
.ct i{display:block;font-style:normal;font-size:7pt;color:var(--muted)}
.qrs{display:flex;gap:4mm}
.qrb{flex:1;border:.4mm solid #d5e3f0;border-radius:4mm;padding:2.5mm;text-align:center;background:#fff}
.qrb img{width:100%;display:block;aspect-ratio:1}
.qrb b{display:block;font-size:8.6pt;margin-top:1mm;line-height:1.35}
.qrb i{display:block;font-style:normal;font-size:6.6pt;color:var(--muted)}
.since{display:flex;gap:3mm;align-items:center;border-top:.3mm solid #d5e3f0;padding-top:4mm}
.since b{display:block;font-size:9.6pt}.since i{display:block;font-style:normal;font-size:6.8pt;color:var(--muted)}
/* cover */
.cov{height:210mm;background:radial-gradient(circle at 50% 20%,#2a8de0,#1669b8 55%,#0d3f78);color:#fff;position:relative}
.covtop{padding:9mm 7mm 0;text-align:center}
.brand{display:inline-flex;align-items:center;gap:2.6mm;font-family:Moul;font-size:13pt;line-height:1.4;text-align:left}
.brand small{display:block;font-family:KP;font-weight:700;font-size:7pt;letter-spacing:.24em;opacity:.9}
h1{font-size:20pt;line-height:1.55;margin-top:4mm;color:#fff}
.tagl{display:inline-block;margin-top:1.5mm;background:var(--orange);border-radius:99px;padding:.8mm 4mm;font-weight:700;font-size:8.6pt}
.covph{position:absolute;left:7mm;right:7mm;top:78mm;height:62mm;border-radius:5mm;background:url(../tvc-source/photos_pitch/pagoda_parcel.jpg) center 62%/cover;box-shadow:0 2mm 6mm rgba(0,0,0,.35);border:1mm solid rgba(255,255,255,.9)}
.covsv{position:absolute;left:7mm;right:7mm;top:146mm;display:flex;gap:3mm}
.sv{flex:1;background:#fff;color:var(--navy);border-radius:4mm;padding:2.6mm 3mm;box-shadow:0 1.5mm 4mm rgba(0,0,0,.25)}
.sv b{display:block;font-size:7.6pt;line-height:1.35}
.sv span{display:block;font-size:7.6pt;font-weight:700;margin-top:.6mm}
.sv em{font-style:normal;font-size:16pt;line-height:1.1}
.sv i{display:block;font-style:normal;font-size:6.2pt;color:var(--muted)}
.sv.d2d{border-top:1.6mm solid var(--red)}.sv.d2d em{color:var(--red)}
.sv.sel{border-top:1.6mm solid var(--orange)}.sv.sel em{color:var(--orange)}
.covft{position:absolute;left:7mm;right:7mm;bottom:9mm;display:flex;align-items:center;justify-content:center;gap:1.6mm;font-weight:700;font-size:8.4pt;text-align:center}
.covft .ic{color:#ffd08a}
/* inside */
.hd{display:flex;align-items:center;gap:3mm;padding:6mm 7mm 4mm;color:#fff;position:relative;isolation:isolate}
.hd::before{content:"";position:absolute;inset:calc(-1 * var(--b)) calc(-1 * var(--b)) 0;background:inherit;z-index:-1}  /* colour runs into the bleed */
.hd b{display:block;font-size:13.5pt;line-height:1.55}
.hd i{display:block;font-style:normal;font-size:7.4pt;opacity:.92;margin-top:-.6mm}
.num{width:10mm;height:10mm;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-family:Moul;font-size:12pt;flex:none;line-height:1}
.d2dbg{background:linear-gradient(135deg,#e0442f,#f08a14)}.d2dbg .num{color:var(--red)}
.selbg{background:linear-gradient(135deg,#1a78cf,#0d3f78)}.selbg .num{color:var(--blue)}
.navybg{background:linear-gradient(135deg,#0d3868,#1a78cf)}
.hdtg{width:10mm;height:10mm}
.price{font-weight:700;font-size:10pt;margin-bottom:-2mm}
.price em{font-style:normal;font-size:30pt;line-height:1.15}
.price small{font-size:9pt;color:var(--navy)}
.d2dc em{color:var(--red)}.selc em{color:var(--orange)}
.note{font-size:7.6pt;color:var(--muted)}
.ph1{height:40mm;border-radius:4mm;background:url(../tvc-source/photos_far/road.jpg) center 45%/cover;flex:none}
.sec{font-weight:700;font-size:9.6pt;color:var(--blue);border-bottom:.3mm solid #d5e3f0;padding-bottom:.8mm}
.stp{display:flex;gap:2.8mm;align-items:flex-start}
.stp .n{width:7mm;height:7mm;border-radius:50%;background:var(--blue);color:#fff;font-weight:700;font-size:9pt;display:flex;align-items:center;justify-content:center;flex:none;margin-top:.4mm}
.stp b{display:block;font-size:9.4pt;line-height:1.4}
.ex{display:flex;gap:2.4mm;align-items:center;background:#fff4e6;border-radius:3mm;padding:2.6mm 3mm}
.ex .ic{color:var(--red)}.ex b{display:block;font-size:9pt}.ex i{display:block;font-style:normal;font-size:6.6pt;color:var(--muted)}
.proof{display:flex;gap:3mm;align-items:center;background:var(--sky);border-radius:4mm;padding:3mm}
.ph2{width:24mm;height:30mm;border-radius:3mm;background:url(../tvc-source/photos_far/delivered.jpg) center/cover;flex:none}
.proof b{display:block;font-size:9pt;color:var(--blue)}
.proof span{font-size:8.8pt;font-weight:700;line-height:1.45}
.proof em{font-style:normal;color:var(--green);font-size:10pt}
.proof i{display:block;font-style:normal;font-weight:400;font-size:6.6pt;color:var(--muted)}
.bigqr{width:54mm;margin:0 auto;text-align:center;border:.4mm solid #d5e3f0;border-radius:4mm;padding:2mm}
.bigqr img{width:100%;display:block;aspect-ratio:1}
.bigqr b{display:block;font-size:9.4pt;color:var(--blue)}
.items{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6mm}
.items span{display:flex;flex-direction:column;align-items:center;gap:.8mm;background:var(--sky);border-radius:3mm;padding:2.4mm 1mm;font-size:7.6pt;font-weight:700;text-align:center}
.items .ic{width:8mm;height:8mm;color:var(--blue)}
.sizes{display:flex;gap:1.6mm}
.sizes span{flex:1;text-align:center;border:.4mm solid var(--blue);border-radius:3mm;padding:1.4mm 0;font-size:8pt;font-weight:700}
.sizes b{display:block;font-size:9pt;color:var(--blue)}"""


def sheet(panels):
    out = '<div class="sheet">'
    for i, (w, bg, html) in enumerate(panels):
        cls = "panel" + (" first" if i == 0 else "") + (" last" if i == len(panels) - 1 else "")
        extra = " + var(--b)" if i in (0, len(panels) - 1) else ""
        out += f'<div class="{cls}" style="width:calc({w}mm{extra});background:{bg}"><div class="inner" style="width:{w}mm">{html}</div></div>'
    return out + "</div>"


BLUE_BG = "radial-gradient(circle at 50% 20%,#2a8de0,#1669b8 55%,#0d3f78)"
outside = sheet([(97, "#f4f9fd", flap), (100, "#fff", back), (100, BLUE_BG, cover)])
inside = sheet([(100, "#fff", p1), (100, "#fff", p2), (97, "#f4f9fd", p3)])

for name, b in [("brochure_trifold.html", 0), ("brochure_trifold_bleed.html", 3)]:
    root = f"@page{{size:{297 + 2 * b}mm {210 + 2 * b}mm;margin:0}}:root{{--b:{b}mm;--pw:{297 + 2 * b}mm;--ph:{210 + 2 * b}mm}}"
    open(name, "w").write(f'<!doctype html><html><head><meta charset="utf-8"><title>Khmer Parcel tri-fold brochure</title>'
                          f'<style>{FONTS}{root}{CSS}</style></head><body>{outside}{inside}</body></html>')
    print("wrote", name)
