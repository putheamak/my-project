#!/usr/bin/env python3
"""Music + SFX for the split-screen ad (khmer_parcel_split_oldway.mp4). python3 make_sound_split.py"""
from soundlib import Track
t = Track("specs/split_oldway.json", bpm=120, seed=101)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("boing", t.at("hook", 0)); t.sfx("pop", t.at("hook", .3))
for sc in ("p1", "p2", "p3", "p4"):
    t.sfx("thud", t.at(sc, .5), .5); t.sfx("success", t.at(sc, 1.0), .45)
for d in (.1, .25, .4, .55): t.sfx("pop", t.at("p1", d), .4)
t.sfx("coin", t.at("p3", .6), .7)
E = lambda d: t.at("end", d)
t.sfx("pop", E(0)); t.sfx("sparkle", E(.3)); t.sfx("pop", E(.5)); t.sfx("pop", E(.7))
t.write("split_oldway_music.m4a")
