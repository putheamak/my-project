#!/usr/bin/env python3
"""Builds qr_stickers_A4.html: two A4 label sheets (3x7 = 21 stickers, 63.5x38.1 mm, e.g. Avery L7160).
Sheet A = Telegram bot QR (online sellers), sheet B = website QR (door to door).
Usage: python3 make_qr_stickers.py && NODE_PATH=$(npm root -g) node render_qr_stickers.cjs"""
F = "../tvc-source/"
fonts = f"""@font-face{{font-family:KP;src:url({F}kantumruy-pro-khmer-400-normal.woff2);font-weight:400;unicode-range:U+1780-17FF,U+19E0-19FF,U+200C-200D,U+25CC}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-khmer-700-normal.woff2);font-weight:700;unicode-range:U+1780-17FF,U+19E0-19FF,U+200C-200D,U+25CC}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-latin-400-normal.woff2);font-weight:400;unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122}}
@font-face{{font-family:KP;src:url({F}kantumruy-pro-latin-700-normal.woff2);font-weight:700;unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122}}
@font-face{{font-family:Moul;src:url({F}moul-khmer-400-normal.woff2)}}"""
cube = '<svg viewBox="0 0 64 64"><path d="M32 6 56 19v26L32 58 8 45V19Z M8 19l24 13 24-13M32 32v26" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round"/></svg>'


def sticker(kind):
    if kind == "bot":
        qr = '<img class="qr web" src="qr_bot_plain.png">'  # plain QR: the styled Telegram QR does not decode reliably
        body = ('<div class="t1">ផ្ញើឥវ៉ាន់ក្នុងភ្នំពេញ</div><div class="price">$0.75<small> / កញ្ចប់</small></div>'
                '<div class="t2">អ្នកលក់អនឡាញ · ស្កេនកក់តាម Telegram</div>')
    else:
        qr = f'<img class="qr web" src="{F}qr_khmerparcel_web.png">'
        body = ('<div class="t1">ទៅយក និងដឹកដល់ផ្ទះ</div><div class="price"><small>ចាប់ពី </small>$1.50</div>'
                '<div class="t2">ស្កេនកក់ · www.khmerparcel.com</div>')
    return (f'<div class="st">{qr}<div class="tx"><div class="br"><span class="lg">{cube}</span>ខ្មែរផាសែល</div>'
            f'{body}<div class="ph">☎ 012 429 597 · 092 678 657</div></div></div>')


css = """@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:KP,sans-serif;color:#0d3868}
.page{width:210mm;height:297mm;padding:15.15mm 7.25mm 0;display:grid;grid-template-columns:repeat(3,63.5mm);grid-auto-rows:38.1mm;column-gap:2.54mm;page-break-after:always;position:relative;overflow:hidden}
.st{border:0.2mm dashed #b8c7d8;border-radius:3mm;display:flex;align-items:center;gap:1.6mm;padding:1.6mm 2mm;overflow:hidden;background:#fff}
.qr{flex:none;display:block}
.qr.bot{height:34.5mm;width:29.25mm}
.qr.web{height:29mm;width:29mm}
.tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:.5mm}
.br{display:flex;align-items:center;gap:1mm;font-family:Moul;font-size:8.5pt;line-height:1.5;color:#1a78cf;white-space:nowrap}
.lg{width:5mm;height:5mm;border-radius:1.4mm;background:#1a78cf;display:flex;align-items:center;justify-content:center;flex:none}
.lg svg{width:3.6mm;height:3.6mm}
.t1{font-size:7.2pt;font-weight:700;line-height:1.35}
.price{font-size:15pt;font-weight:700;color:#f08a14;line-height:1.1}
.price small{font-size:7pt;color:#0d3868}
.t2{font-size:5.6pt;line-height:1.35;color:#5d7591}
.ph{font-size:5.5pt;font-weight:700;line-height:1.3;white-space:nowrap}
.note{position:absolute;left:7.25mm;bottom:5mm;font-size:7pt;color:#8a9bb0}"""

pages = ""
for kind, label in [("bot", "Sheet A — online sellers (Telegram bot QR)"), ("web", "Sheet B — door to door (website QR)")]:
    pages += ('<div class="page">' + sticker(kind) * 21 +
              f'<div class="note">{label} · 21 stickers 63.5×38.1 mm (A4 label sheet 3×7, e.g. Avery L7160) · print at 100% / Actual size</div></div>')
open("qr_stickers_A4.html", "w").write(
    f'<!doctype html><html><head><meta charset="utf-8"><title>Khmer Parcel QR stickers A4</title><style>{fonts}{css}</style></head><body>{pages}</body></html>')
print("wrote qr_stickers_A4.html")
