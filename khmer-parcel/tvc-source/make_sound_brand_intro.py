#!/usr/bin/env python3
"""Music + SFX for the brand intro Reel (khmer_parcel_brand_intro.mp4).
    python3 make_sound_brand_intro.py
"""
from soundlib import Track

t = Track("specs/brand_intro.json", bpm=112, seed=71)
t.music([("warm", "hook", "services"), ("groove", "services", "care"), ("soft", "care", "promise"), ("groove", "promise", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("engine", t.at("hook"), .8, dur=2.9); t.sfx("pop", t.at("hook", .4))
W = lambda d: t.at("who", d)
t.sfx("pop", W(0)); t.sfx("sparkle", W(.3)); t.sfx("pop", W(1.2)); t.sfx("boing", W(1.6), .6)
S = lambda d: t.at("services", d)
t.sfx("pop", S(.4)); t.sfx("pop", S(1.0)); t.sfx("coin", S(1.8), .6)
t.sfx("engine", t.at("care"), .5, dur=4.0)
F = lambda d: t.at("fast", d)
for d in (.3, 1.0, 1.7): t.sfx("tap", F(d))
for k in range(10): t.sfx("pop", F(k * .25), .25)  # stopwatch ticks
t.sfx("success", F(2.5)); t.sfx("pop", F(3.0), .6)
t.sfx("sparkle", t.at("promise", .4)); t.sfx("boing", t.at("promise", 1.0), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.0)); t.sfx("pop", E(.5)); t.sfx("pop", E(.8)); t.sfx("success", E(1.2), .7)
t.write("brand_intro_music.m4a")
