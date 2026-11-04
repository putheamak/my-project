#!/usr/bin/env python3
"""Music + SFX for the quiz Reel «ទីនេះនៅណា?» EP1 (khmer_parcel_quiz_ep1.mp4). python3 make_sound_quiz.py"""
from soundlib import Track
t = Track("specs/quiz_ep1.json", bpm=118, seed=121)
t.music([("soft", "quiz", "reveal"), ("groove", "reveal", None)])
t.sfx("boing", t.at("quiz", .1)); t.sfx("pop", t.at("quiz", .3))
for s in range(5): t.sfx("tap", t.at("quiz", .05 + s), .9)
t.sfx("whoosh", t.at("reveal") - .3, .8); t.sfx("success", t.at("reveal", .25)); t.sfx("pop", t.at("reveal", .55))
t.sfx("whoosh", t.at("map") - .3, .6); t.sfx("thud", t.at("map", .5)); t.sfx("pop", t.at("map", .6)); t.sfx("coin", t.at("map", 1.0), .7)
t.sfx("whoosh", t.at("end") - .3, .6); t.sfx("pop", t.at("end", .5)); t.sfx("pop", t.at("end", .8)); t.sfx("sparkle", t.at("end", 1.2), .8)
t.write("quiz_ep1_music.m4a")
