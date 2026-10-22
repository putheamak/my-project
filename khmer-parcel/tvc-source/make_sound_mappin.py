#!/usr/bin/env python3
"""Music + SFX for the map-pin behaviour-change Reel. python3 make_sound_mappin.py"""
from soundlib import Track
t = Track("specs/mappin_draft.json", bpm=112, seed=91)
t.music([("soft", "c1", "bot"), ("groove", "bot", None)])
for sc in list(t.start)[1:]: t.sfx("whoosh", t.at(sc) - .3, .6)
t.sfx("ring", t.at("c1", .1)); t.sfx("engine", t.at("c1"), .5, dur=2.8); t.sfx("pop", t.at("c2", .3)); t.sfx("thud", t.at("c3", 1.2), .6)
t.sfx("tap", t.at("bot", 1.0)); t.sfx("success", t.at("bot", 1.5), .6); t.sfx("pop", t.at("bot", 1.6))
t.sfx("pop", t.at("web", .6)); t.sfx("tap", t.at("web", 1.4)); t.sfx("pop", t.at("web", 1.6)); t.sfx("coin", t.at("web", 1.8), .5)
t.sfx("sparkle", t.at("c4", .3)); t.sfx("pop", t.at("end", .5)); t.sfx("pop", t.at("end", .8))
t.write("mappin_music.m4a")
