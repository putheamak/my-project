#!/usr/bin/env python3
"""Music + SFX for the far-delivery true story (khmer_parcel_story_far_delivery.mp4).
    python3 make_sound_story_far.py
Gentle minor feel for the hard trip, lifting to a warm then upbeat groove for the lesson and end.
"""
from soundlib import Track

AM_F_C_G = [[45, 57, 60, 64], [41, 57, 60, 65], [36, 55, 60, 64], [43, 55, 59, 62]]
t = Track("specs/story_far_delivery.json", bpm=92, prog=AM_F_C_G, seed=21)
t.music([("soft", "hook", "lesson"), ("warm", "lesson", "value"), ("groove", "value", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .6)

H = lambda d: t.at("hook", d)
t.sfx("engine", H(0), .7, dur=3.6); t.sfx("pop", H(.6)); t.sfx("thud", H(1.4), .6)
O = lambda d: t.at("order", d)
t.sfx("notif", O(.6)); t.sfx("pop", O(1.2)); t.sfx("pop", O(1.7)); t.sfx("coin", O(2.4), .6)
M = lambda d: t.at("map", d)
t.sfx("pop", M(.3)); t.sfx("pop", M(.5)); t.sfx("engine", M(.7), .8, dur=5.9)
R = lambda d: t.at("refuse", d)
for d in (.3, 1.2, 2.0): t.sfx("pop", R(d))
t.sfx("boing", R(3.3), .8)
t.sfx("engine", t.at("p_ride", 0), .5, dur=4.8); t.sfx("engine", t.at("p_road", 0), .5, dur=4.8)
t.sfx("sparkle", t.at("p_done", .4))
X = lambda d: t.at("math", d)
t.sfx("pop", X(.4)); t.sfx("pop", X(1.2)); t.sfx("thud", X(2.75)); t.sfx("sparkle", X(3.8))
L = lambda d: t.at("lesson", d)
t.sfx("pop", L(.7)); t.sfx("pop", L(2.2)); t.sfx("success", L(4.0), .8)
t.sfx("sparkle", t.at("value", .9)); t.sfx("boing", t.at("value", 1.0), .6)
E = lambda d: t.at("end", d)
t.sfx("pop", E(.0)); t.sfx("pop", E(.8)); t.sfx("pop", E(1.1))
t.write("story_far_delivery_music.m4a")
