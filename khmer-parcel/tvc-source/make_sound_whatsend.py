#!/usr/bin/env python3
"""Music + SFX for "ផ្ញើអ្វីបានខ្លះ?" (khmer_parcel_whatsend.mp4). python3 make_sound_whatsend.py"""
from soundlib import Track
t = Track("specs/whatsend.json", bpm=122, seed=111)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("boing", t.at("hook", 0)); t.sfx("pop", t.at("hook", .4))
for i in range(6):
    d = .3 + i * 1.1
    t.sfx("whoosh", t.at("belt", d), .35); t.sfx("pop", t.at("belt", d + .3), .7)
for d in (.4, .7, 1.0): t.sfx("pop", t.at("sizes", d))
t.sfx("coin", t.at("sizes", 1.4), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.5)); t.sfx("pop", E(.7)); t.sfx("sparkle", E(1.0), .8)
t.write("whatsend_music.m4a")
