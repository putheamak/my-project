#!/usr/bin/env python3
"""Music + SFX for the 11.11 sellers Reel (khmer_parcel_sellers_1111.mp4). python3 make_sound_1111.py"""
from soundlib import Track
t = Track("specs/sellers_1111.json", bpm=124, seed=1111)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("boing", t.at("hook", 0)); t.sfx("thud", t.at("hook", .05)); t.sfx("pop", t.at("hook", .6))
for i in range(5): t.sfx("notif", t.at("rush", .15 + i * .42), .7)
t.sfx("thud", t.at("rush", 2.4))
t.sfx("success", t.at("solve", .1)); t.sfx("coin", t.at("solve", .4), .7)
for d in (.6, .9, 1.2, 1.5): t.sfx("pop", t.at("solve", d), .6)
t.sfx("pop", t.at("end", .4)); t.sfx("sparkle", t.at("end", 1.4), .8)
t.write("sellers_1111_music.m4a")
