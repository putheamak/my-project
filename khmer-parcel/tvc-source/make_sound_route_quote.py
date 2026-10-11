#!/usr/bin/env python3
"""Music + SFX for the "ពីណា ទៅណា?" route-quote series, video 1.
    python3 make_sound_route_quote.py
"""
from soundlib import Track

t = Track("specs/ad_route_quote_1.json", bpm=118, seed=31)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
H = lambda d: t.at("hook", d)
t.sfx("boing", H(0)); [t.sfx("pop", H(d)) for d in (.3, .6, .9, 1.2)]; t.sfx("thud", H(1.6), .5)
E = lambda d: t.at("example", d)
for a0, a1 in ((.4, 1.2), (1.5, 2.3)):
    k = a0
    while k < a1: t.sfx("key", E(k)); k += .1
t.sfx("pop", E(1.2)); t.sfx("pop", E(2.3)); t.sfx("pop", E(2.9)); t.sfx("coin", E(3.2)); t.sfx("pop", E(3.6)); t.sfx("pop", E(4.4))
C = lambda d: t.at("comment", d)
t.sfx("pop", C(.6))
k = 1.0
while k < 2.8: t.sfx("key", C(k)); k += .09
t.sfx("notif", C(3.4)); t.sfx("sparkle", C(4.2))
N = lambda d: t.at("end", d)
t.sfx("pop", N(.5)); t.sfx("boing", N(1.0), .6); t.sfx("pop", N(1.2))
t.write("ad_route_quote_1_music.m4a")
