#!/usr/bin/env python3
"""Music + SFX for the 14 Khans Reel (khmer_parcel_reel_14khans.mp4).
    python3 make_sound_14khans.py
"""
from soundlib import Track

t = Track("specs/reel_14khans.json", bpm=118, seed=81)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("boing", t.at("hook", 0)); t.sfx("pop", t.at("hook", .4))
M = lambda d: t.at("map", d)
t.sfx("engine", M(.6), .6, dur=6.4)
for k in range(14): t.sfx("pop", M(.3 + k * .38), .7)   # one pop per district pin
t.sfx("sparkle", M(5.6)); t.sfx("success", M(5.7), .6)
P = lambda d: t.at("promise", d)
t.sfx("pop", P(.4)); t.sfx("coin", P(.9)); t.sfx("boing", P(1.3), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.0)); t.sfx("pop", E(.5)); t.sfx("pop", E(.8)); t.sfx("sparkle", E(1.2), .8)
t.write("reel_14khans_music.m4a")
