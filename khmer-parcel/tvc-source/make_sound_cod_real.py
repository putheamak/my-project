#!/usr/bin/env python3
"""Music + SFX for the real COD booking video (khmer_parcel_cod_real_booking.mp4).
    python3 make_sound_cod_real.py
"""
from soundlib import Track

t = Track("specs/cod_real_booking.json", bpm=118, seed=51)
t.music([("groove", "hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .7)
t.sfx("notif", t.at("hook", .3)); t.sfx("pop", t.at("hook", .6), .6)
t.sfx("thud", t.at("proof", 1.05)); t.sfx("coin", t.at("proof", 1.9)); t.sfx("pop", t.at("proof", 2.4), .6)
S = lambda d: t.at("sameday", d)
t.sfx("coin", S(0)); t.sfx("sparkle", S(.6)); t.sfx("pop", S(1.2)); t.sfx("pop", S(1.6)); t.sfx("boing", S(2.0), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.3)); t.sfx("pop", E(.6)); t.sfx("sparkle", E(1.0), .8)
t.write("cod_real_booking_music.m4a")
