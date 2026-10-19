#!/usr/bin/env python3
"""Music + SFX for the seller-phone notification Reel (khmer_parcel_notif_seller_phone.mp4).
    python3 make_sound_notif.py
"""
from soundlib import Track

t = Track("specs/notif_seller_phone.json", bpm=116, seed=61)
t.music([("soft", "phone", "facts"), ("groove", "facts", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
P = lambda d: t.at("phone", d)
t.sfx("notif", P(0.0)); t.sfx("ring", P(1.4)); t.sfx("notif", P(2.8)); t.sfx("coin", P(4.2)); t.sfx("sparkle", P(4.4))
for d in (.2, .6, 1.0): t.sfx("pop", t.at("facts", d))
t.sfx("boing", t.at("facts", 1.4), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.0)); t.sfx("pop", E(.3)); t.sfx("sparkle", E(.6), .8)
t.write("notif_seller_phone_music.m4a")
