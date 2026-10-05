#!/usr/bin/env python3
"""Original background music + sound effects for khmer_parcel_ad_book30s.mp4.

Synthesised from scratch with numpy (no samples, no copyright issues), timed to the
scene starts in specs/ad_book30s.json. Writes ad_book30s_music.m4a next to this file.
    python3 make_sound_book30s.py
"""
import json, os, subprocess, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 44100
BPM = 120
BEAT = 60 / BPM
rng = np.random.default_rng(7)

spec = json.load(open(os.path.join(HERE, "specs/ad_book30s.json")))
x = spec["xfade"]
start, t = {}, 0.0
for s in spec["segments"]:
    start[s["scene"]] = t
    t += s["dur"] - x
TOTAL = t + x
N = int(TOTAL * SR)
music = np.zeros((N, 2))
sfx = np.zeros((N, 2))


def tt(d):
    return np.arange(int(d * SR)) / SR


def add(buf, at, sig, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N or i + len(sig) <= 0:
        return
    sig = sig[: N - i]
    l, r = np.sqrt(0.5 * (1 - pan)), np.sqrt(0.5 * (1 + pan))
    buf[i:i + len(sig), 0] += sig * gain * l * 1.414
    buf[i:i + len(sig), 1] += sig * gain * r * 1.414


def lowpass(sig, cutoff):
    f = np.fft.rfft(sig)
    fr = np.fft.rfftfreq(len(sig), 1 / SR)
    return np.fft.irfft(f / np.sqrt(1 + (fr / cutoff) ** 4), len(sig))


def highpass(sig, cutoff):
    f = np.fft.rfft(sig)
    fr = np.fft.rfftfreq(len(sig), 1 / SR)
    return np.fft.irfft(f / np.sqrt(1 + (cutoff / np.maximum(fr, 1)) ** 4), len(sig))


hz = lambda m: 440 * 2 ** ((m - 69) / 12)

# ---------- instruments ----------
def kick(g=1.0):
    a = tt(.35); f = 45 + 95 * np.exp(-a * 28)
    return g * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-a * 9)

def clap():
    a = tt(.22); n = highpass(rng.standard_normal(len(a)), 900)
    env = np.exp(-a * 22) * (1 + .6 * (np.sin(2 * np.pi * 90 * a) > 0) * (a < .03))
    return n * env * .35

def hat(open_=False):
    a = tt(.18 if open_ else .05); n = highpass(rng.standard_normal(len(a)), 7000)
    return lowpass(n, 12000) * np.exp(-a * (18 if open_ else 70)) * .11

def saw(f, d, voices=3, det=.08):
    a = tt(d); out = np.zeros(len(a))
    for v in range(voices):
        ff = f * 2 ** ((v - (voices - 1) / 2) * det / 12)
        out += 2 * ((a * ff + rng.random()) % 1) - 1
    return out / voices

def pluck(f, d=.35):
    a = tt(d)
    s = np.sin(2 * np.pi * f * a) + .35 * np.sin(2 * np.pi * 2 * f * a) + .15 * np.sin(2 * np.pi * 3 * f * a)
    return s * np.exp(-a * 9) * np.minimum(1, a * 400)

def bell(f, d=1.2):
    a = tt(d)
    s = sum(w * np.sin(2 * np.pi * f * k * a) * np.exp(-a * (3 + 2 * k)) for k, w in [(1, 1), (2.01, .5), (3.02, .25), (4.2, .12)])
    return s * np.minimum(1, a * 600)

# ---------- music ----------
PROG_MAJ = [[48, 52, 55, 60], [43, 50, 55, 59], [45, 52, 57, 60], [41, 48, 53, 57]]   # C G Am F
PROG_MIN = [[45, 52, 57, 60], [41, 48, 53, 57]]                                       # Am F (tension)
BAR = 4 * BEAT

def section(t0, t1, mode):
    nbar = int(np.ceil((t1 - t0) / BAR))
    for b in range(nbar):
        bt = t0 + b * BAR
        if bt >= t1: break
        prog = PROG_MIN if mode == "tense" else PROG_MAJ
        ch = prog[b % len(prog)]
        dur = min(BAR, t1 - bt)
        # pad
        pad = sum(saw(hz(m + 12), dur, 3, .12) for m in ch[1:])
        pad = lowpass(pad, 1400 if mode != "tense" else 700) * np.minimum(1, tt(dur) * 6) * np.minimum(1, (dur - tt(dur)) * 8)
        add(music, bt, pad, .055 if mode == "groove" else .07, -.2)
        add(music, bt, pad, .055 if mode == "groove" else .07, .2)
        for k in range(8):                       # 8th notes
            nt = bt + k * BEAT / 2
            if nt >= t1: break
            if mode == "tense":
                if k % 2 == 0: add(music, nt, lowpass(saw(hz(ch[0] - 12), .22, 1), 300) * np.exp(-tt(.22) * 8), .22)
                continue
            # bass (octave bounce)
            bm = ch[0] - 12 + (12 if k % 2 else 0)
            add(music, nt, lowpass(saw(hz(bm), .24, 2, .05), 500) * np.exp(-tt(.24) * 6), .28)
            # drums
            if k % 2 == 0: add(music, nt, kick(), .8)
            if k in (2, 6) and mode == "groove": add(music, nt, clap(), 1.0)
            add(music, nt, hat(k % 2 == 1 and mode == "groove"), 1.0, .35)
            # pluck arpeggio (16ths on groove)
            for h in (0, 1) if mode == "groove" else (0,):
                m = ch[[1, 2, 3, 2][(2 * k + h) % 4]] + 12
                add(music, nt + h * BEAT / 4, pluck(hz(m)), .09, -.35 if h else .35)

def riser(t0, d):
    a = tt(d); n = highpass(rng.standard_normal(len(a)), 1500)
    add(music, t0, n * (a / d) ** 2 * .12)

S = start
section(0, S["old"], "groove")
riser(S["old"] - 1.2, 1.2)
section(S["old"], S["book"], "tense")
riser(S["book"] - 2.0, 2.0)
section(S["book"], TOTAL - 1.2, "groove")
# final hit
add(music, TOTAL - 1.4, kick(1.2), .9)
for m in (48, 55, 60, 64, 67, 72):
    add(music, TOTAL - 1.4, bell(hz(m), 1.4), .07)

# sidechain-ish pump on music
pump = np.ones(N)
for k in np.arange(0, TOTAL, BEAT):
    i = int(k * SR); a = tt(.25)
    pump[i:i + len(a)] = np.minimum(pump[i:i + len(a)], 1 - .35 * np.exp(-a * 14))
music *= pump[:, None]

# ---------- sound effects ----------
def tick(): a = tt(.02); return np.sin(2 * np.pi * 2400 * a) * np.exp(-a * 300)
def tap(): a = tt(.08); f = 900 * np.exp(-a * 25) + 300; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-a * 45)
def key(): a = tt(.03); return highpass(rng.standard_normal(len(a)), 2500) * np.exp(-a * 160)
def blip(f=1200): a = tt(.09); return np.sin(2 * np.pi * f * a * (1 + a * 3)) * np.exp(-a * 40)
def whoosh(d=.45):
    a = tt(d); n = rng.standard_normal(len(a))
    return lowpass(highpass(n, 600), 5000) * np.sin(np.pi * a / d) ** 2 * .5
def stamp():
    a = tt(.5); f = 70 + 80 * np.exp(-a * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-a * 10) + lowpass(rng.standard_normal(len(a)), 1500) * np.exp(-a * 25) * .6
def success():
    out = np.zeros(int(1.4 * SR))
    for i, m in enumerate((72, 76, 79, 84)):
        b = bell(hz(m), 1.4 - i * .08); j = int(i * .08 * SR); out[j:j + len(b)] += b[: len(out) - j]
    return out
def coin():
    out = np.zeros(int(.8 * SR))
    for i, f in enumerate((1976, 2637)):
        b = bell(f, .7); j = int(i * .07 * SR); out[j:j + len(b)] += b[: len(out) - j]
    return out

# whooshes on every transition
for name in list(S)[1:]:
    add(sfx, S[name] - .3, whoosh(), .35)

# hook: tick-tock while the stopwatch runs
for k in np.arange(0, S["old"], .25): add(sfx, k, tick(), .18 if int(k * 4) % 2 else .26)
add(sfx, S["hook"] + 1.4, blip(900), .25)

# old way: chat blips, fast clock, stamp
o = S["old"]
for d in (.4, 1.1, 1.7, 2.3, 2.9, 3.5, 4.1): add(sfx, o + d, blip(1400 if d in (1.1, 2.3, 3.5) else 1000), .22)
for k in np.arange(.3, 5.0, .125): add(sfx, o + k, tick(), .12)
add(sfx, o + 5.05, stamp(), .7)

# booking demo
b = S["book"]
DONE = 21.4
for k in np.arange(0, DONE, 1.0): add(sfx, b + k, tick(), .22)      # timer seconds
for d in (.3, .8): add(sfx, b + d, blip(1200), .2)                   # /start + bot reply
for d in (1.8, 4.9, 13.5, 20.3): add(sfx, b + d, tap(), .45)         # taps
add(sfx, b + 2.4, whoosh(.4), .3)                                    # mini app slides up
add(sfx, b + 3.1, blip(1600), .15)                                   # "saved" tag
for a0, a1 in ((7.3, 8.6), (8.8, 9.4), (10.6, 12.3), (12.5, 13.2), (14.9, 15.9), (16.0, 16.3), (16.8, 17.8), (18.0, 18.6)):
    for k in np.arange(a0, a1, .11): add(sfx, b + k + rng.random() * .03, key(), .2, rng.uniform(-.3, .3))
for d in (6.6, 14.2, 19.0): add(sfx, b + d, whoosh(.5), .18)          # scrolls
add(sfx, b + 10.3, tap(), .3)                                        # pick Khan
add(sfx, b + DONE + .2, success(), .45)
add(sfx, b + 22.2, stamp(), .6)
add(sfx, b + 23.2, blip(880), .25); add(sfx, b + 23.32, blip(1320), .25)   # notification

# benefits: chip pops
for d in (.6, 1.4, 2.2, 3.2): add(sfx, S["benefits"] + d, blip(1000 + 200 * d), .2)
# offer: strike + price pop
add(sfx, S["offer"] + 1.5, whoosh(.3), .3); add(sfx, S["offer"] + 1.9, coin(), .4)
# cta + qr pops
for d in (0, .7): add(sfx, S["cta"] + d, blip(1100), .2)
add(sfx, S["qr"] + .4, blip(900), .25); add(sfx, S["qr"] + 1.2, coin(), .3)

# ---------- mix & write ----------
mix = music * .9 + sfx
fade = np.ones(N); f0 = int(.3 * SR); fade[-f0:] = np.linspace(1, 0, f0)
mix *= fade[:, None]
mix = np.tanh(mix * 1.1) / np.tanh(1.1)                       # soft limiter
mix *= .89 / np.max(np.abs(mix))
wav = os.path.join(os.environ.get("TVC_WORK", "/tmp/tvc_work"), "ad_book30s_music.wav")
os.makedirs(os.path.dirname(wav), exist_ok=True)
with wave.open(wav, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
import imageio_ffmpeg
out = os.path.join(HERE, "ad_book30s_music.m4a")
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-y", "-i", wav, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
                "-ar", "44100", "-c:a", "aac", "-b:a", "192k", out], check=True)
print(f"wrote {out} ({TOTAL:.1f}s); scene starts:", {k: round(v, 2) for k, v in S.items()})
