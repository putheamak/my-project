#!/usr/bin/env python3
"""Music + SFX for the short cuts: route quote v2 (real-photo hook) and the 10 s seller pitch.
    python3 make_sound_shorts.py
"""
from soundlib import Track

# route quote v2
t = Track("specs/ad_route_quote_1_v2.json", bpm=118, seed=41)
t.music([("groove", "hook2", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("engine", t.at("hook2"), .6, dur=3.2); t.sfx("pop", t.at("hook2", .2)); t.sfx("pop", t.at("hook2", .9), .6)
E = lambda d: t.at("example", d)
for a0, a1 in ((.4, 1.2), (1.5, 2.3)):
    k = a0
    while k < a1: t.sfx("key", E(k)); k += .1
t.sfx("pop", E(2.3)); t.sfx("coin", E(3.2))
N = lambda d: t.at("end2", d)
t.sfx("pop", N(.0)); t.sfx("pop", N(.4)); t.sfx("boing", N(.8), .6)
t.write("ad_route_quote_1_v2_music.m4a")

# seller pitch 10 s
t = Track("specs/pitch_seller_10s.json", bpm=118, seed=43)
t.music([("groove", "sp_hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("engine", t.at("sp_hook"), .6, dur=3.0); t.sfx("coin", t.at("sp_hook", .1), .8); t.sfx("pop", t.at("sp_hook", .5))
for d in (.2, .6, 1.0, 1.4): t.sfx("pop", t.at("sp_why", d))
t.sfx("boing", t.at("sp_why", 1.8), .6)
t.sfx("pop", t.at("sp_qr", .2)); t.sfx("sparkle", t.at("sp_qr", .6))
t.write("pitch_seller_10s_music.m4a")
