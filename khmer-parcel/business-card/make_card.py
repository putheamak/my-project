#!/usr/bin/env python3
"""Khmer Parcel digital business card.

One folder per person in people/<name>/ with a card_info.json. Edit it, then run:
    python3 make_card.py people/<name>/card_info.json      (no argument = every person)
Makes (in that person's folder):
  khmer_parcel_card.vcf            contact file (what the QR contains)
  qr_card_vcard.png                QR — scan with a phone camera → "Save contact"
  khmer_parcel_card_front.png      print card front (90×54 mm, 300 dpi)
  khmer_parcel_card_back.png       print card back with the QR
  khmer_parcel_card_print.pdf      front + back, 2 pages, 90×54 mm
  khmer_parcel_card_phone.png      1080×1920 screen to show on a phone or send in chat
"""
import json, os, subprocess, sys
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask

HERE = os.path.dirname(os.path.abspath(__file__))
info = {}
tel = lambda p: "+855" + p.replace(" ", "").lstrip("0")
esc = lambda s: s.replace("\\", "\\\\").replace(",", "\\,").replace(";", "\;")


def vcard():
    # Plain vCard 3.0 (UTF-8 is the default, so no CHARSET params): read by iPhone Camera, Google Lens,
    # Samsung/Vivo/Xiaomi camera scanners. Kept short so the QR stays easy to scan on a printed card.
    first, _, last = info["name_en"].partition(" ")
    L = ["BEGIN:VCARD", "VERSION:3.0",
         f"N:{esc(first)};{esc(last)};;;" if last else f"N:{esc(first)};;;;",
         f"FN:{esc(info['name_en'])} ({esc(info['name_km'])})",
         f"ORG:{esc(info['company_en'])} ({esc(info['company_km'])})",
         f"TITLE:{esc(info['title_en'])}"]
    for i, p in enumerate(info["phones"]):
        L.append(f"TEL;TYPE=CELL{',PREF' if i == 0 else ''}:{tel(p)}")
    if info.get("telegram_phone"):
        L.append(f"TEL;TYPE=CELL:{tel(info['telegram_phone'])}")
    if info.get("email"):
        L.append(f"EMAIL:{info['email']}")
    L.append(f"URL:https://{info['website']}")
    L.append("END:VCARD")
    return "\r\n".join(L) + "\r\n"


def make_qr(data, out):
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=16, border=2)
    q.add_data(data.encode("utf-8")); q.make(fit=True)
    q.make_image(image_factory=StyledPilImage, module_drawer=RoundedModuleDrawer(),
                 color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(13, 56, 104))).save(out)


def check_qr(path, expect):
    import cv2
    got = cv2.QRCodeDetector().detectAndDecode(cv2.imread(path))[0]
    return got.strip() == expect.strip()


def build(info_path):
    global info
    info = json.load(open(info_path, encoding="utf-8"))
    out = os.path.dirname(os.path.abspath(info_path))
    v = vcard()
    open(os.path.join(out, "khmer_parcel_card.vcf"), "w", encoding="utf-8", newline="").write(v)
    qr = os.path.join(out, "qr_card_vcard.png")
    make_qr(v, qr)
    try:
        print(os.path.basename(out), "QR check:", "OK — decodes to the vCard" if check_qr(qr, v) else "WARNING — could not verify")
    except Exception as e:
        print("QR check skipped:", e)
    data = dict(info, _qr=os.path.relpath(qr, HERE), _out=out)
    json.dump(data, open(os.path.join(HERE, "card_data.js.json"), "w", encoding="utf-8"), ensure_ascii=False)
    env = dict(os.environ, NODE_PATH=subprocess.check_output(["npm", "root", "-g"], text=True).strip())
    subprocess.run(["node", os.path.join(HERE, "render_card.cjs"), HERE], check=True, env=env)
    os.remove(os.path.join(HERE, "card_data.js.json"))


if __name__ == "__main__":
    import glob
    paths = sys.argv[1:] or sorted(glob.glob(os.path.join(HERE, "people", "*", "card_info.json")))
    for p in paths:
        build(p)
