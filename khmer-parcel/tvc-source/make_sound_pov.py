#!/usr/bin/env python3
"""Music + SFX for the parcel POV series (Day 4): seller cut and door-to-door cut.
    python3 make_sound_pov.py
Same marimba theme in both (series identity); the door-to-door cut is warmer and slower.
"""
from soundlib import Track

# ---- seller cut ----
t = Track("specs/ad_pov_seller.json", bpm=112)
t.music([("groove", "s_hook", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .8)
t.sfx("boing", t.at("s_hook")); t.sfx("pop", t.at("s_hook", .6))
P = lambda d: t.at("s_pack", d)
t.sfx("whoosh", P(.4), .6); t.sfx("thud", P(1.05)); t.sfx("tape", P(1.7)); t.sfx("pop", P(2.2)); t.sfx("pop", P(3.0), .8); t.sfx("pop", P(3.6))
B = lambda d: t.at("s_book", d)
t.sfx("tap", B(.8)); t.sfx("whoosh", B(1.2), .6); t.sfx("tap", B(2.6)); t.sfx("success", B(3.1)); t.sfx("pop", B(3.5)); t.sfx("pop", B(4.0))
K = lambda d: t.at("s_pickup", d)
t.sfx("engine", K(.1), dur=1.3); t.sfx("ring", K(1.3)); t.sfx("boing", K(2.6)); t.sfx("pop", K(3.5))
R = lambda d: t.at("s_ride", d)
t.sfx("engine", R(.6), .8, dur=5.4); t.sfx("pop", R(.3)); t.sfx("pop", R(.5)); t.sfx("pop", R(2.5))
A = lambda d: t.at("s_arrive", d)
t.sfx("whoosh", A(.8), .6); t.sfx("pop", A(1.6)); t.sfx("sparkle", A(1.7)); t.sfx("sparkle", A(2.1)); t.sfx("coin", A(3.0)); t.sfx("pop", A(3.2)); t.sfx("sparkle", A(4.2))
O = lambda d: t.at("s_offer", d)
t.sfx("whoosh", O(1.3), .5); t.sfx("coin", O(1.7)); t.sfx("boing", O(2.2), .7)
Q = lambda d: t.at("s_qr", d)
t.sfx("pop", Q(.4)); t.sfx("boing", Q(1.0), .6); t.sfx("pop", Q(1.2))
t.write("ad_pov_seller_music.m4a")

# ---- door-to-door cut ----
t = Track("specs/ad_pov_doortodoor.json", bpm=104, seed=11)
t.music([("warm", "d_hook", "d_price"), ("groove", "d_price", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .8)
t.sfx("boing", t.at("d_hook")); t.sfx("pop", t.at("d_hook", .6))
B = lambda d: t.at("d_book", d)
for a0, a1 in ((.5, 1.3), (1.6, 2.4)):
    k = a0
    while k < a1: t.sfx("key", B(k)); k += .1
t.sfx("pop", B(1.3)); t.sfx("pop", B(2.4)); t.sfx("pop", B(3.0)); t.sfx("coin", B(3.2), .7); t.sfx("tap", B(4.0)); t.sfx("success", B(4.6)); t.sfx("pop", B(5.0))
K = lambda d: t.at("d_pickup", d)
t.sfx("engine", K(.0), dur=1.2); t.sfx("boing", K(1.8)); t.sfx("pop", K(2.9))
R = lambda d: t.at("d_ride", d)
t.sfx("engine", R(.6), .8, dur=5.4); t.sfx("pop", R(1.2)); t.sfx("notif", R(1.3), .7)
A = lambda d: t.at("d_arrive", d)
t.sfx("whoosh", A(.8), .6); t.sfx("sparkle", A(1.7)); t.sfx("pop", A(1.8)); t.sfx("sparkle", A(2.0)); t.sfx("sparkle", A(2.6)); t.sfx("notif", A(3.4))
Pr = lambda d: t.at("d_price", d)
t.sfx("coin", Pr(.4)); [t.sfx("pop", Pr(d)) for d in (1.0, 1.4, 1.8)]
E = lambda d: t.at("d_end", d)
t.sfx("pop", E(.4)); t.sfx("boing", E(1.0), .6); t.sfx("pop", E(1.2))
t.write("ad_pov_doortodoor_music.m4a")
