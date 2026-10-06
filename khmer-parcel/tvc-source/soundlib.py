"""Small synth kit for TVC background music + sound effects (numpy only, no samples).

Use from a make_sound_*.py script:
    from soundlib import Track
    tr = Track("specs/x.json", bpm=112)        # scene starts come from the spec
    tr.music([("groove", "hook", None)])        # sections: (style, from_scene, to_scene|None)
    tr.sfx("tap", tr.at("book", 1.8))           # see Track.SFX for names
    tr.write("x_music.m4a")
"""
import json, os, subprocess, wave
import numpy as np

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
hz = lambda m: 440 * 2 ** ((m - 69) / 12)


class Track:
    def __init__(self, spec, bpm=112, prog=None, seed=7):
        sp = json.load(open(os.path.join(HERE, spec)))
        x, t, self.start = sp["xfade"], 0.0, {}
        for s in sp["segments"]:
            self.start[s["scene"]] = t
            t += s["dur"] - x
        self.total = t + x
        self.n = int(self.total * SR)
        self.mus = np.zeros((self.n, 2)); self.fx = np.zeros((self.n, 2))
        self.beat = 60 / bpm
        self.prog = prog or [[41, 57, 60, 65], [36, 55, 60, 64], [38, 57, 62, 65], [34, 53, 58, 62]]  # F C Dm Bb
        self.rng = np.random.default_rng(seed)

    # ---- helpers ----
    def at(self, scene, dt=0.0): return self.start[scene] + dt
    def tt(self, d): return np.arange(max(1, int(d * SR))) / SR
    def add(self, buf, at, sig, gain=1.0, pan=0.0):
        i = int(at * SR)
        if i >= self.n or i < 0: return
        sig = sig[: self.n - i]; l, r = np.sqrt(1 - pan), np.sqrt(1 + pan)
        buf[i:i + len(sig), 0] += sig * gain * l; buf[i:i + len(sig), 1] += sig * gain * r
    def lp(self, s, c):
        f = np.fft.rfft(s); fr = np.fft.rfftfreq(len(s), 1 / SR)
        return np.fft.irfft(f / np.sqrt(1 + (fr / c) ** 4), len(s))
    def hp(self, s, c):
        f = np.fft.rfft(s); fr = np.fft.rfftfreq(len(s), 1 / SR)
        return np.fft.irfft(f / np.sqrt(1 + (c / np.maximum(fr, 1)) ** 4), len(s))
    def noise(self, d): return self.rng.standard_normal(len(self.tt(d)))

    # ---- instruments ----
    def kick(self):
        a = self.tt(.3); f = 48 + 90 * np.exp(-a * 30)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-a * 10)
    def clap(self):
        a = self.tt(.2); return self.hp(self.noise(.2), 1000) * np.exp(-a * 24) * .3
    def shaker(self):
        a = self.tt(.07); return self.lp(self.hp(self.noise(.07), 5000), 11000) * np.sin(np.pi * a / .07) * .1
    def marimba(self, f, d=.45):
        a = self.tt(d)
        s = np.sin(2 * np.pi * f * a) + .25 * np.sin(2 * np.pi * 4 * f * a) * np.exp(-a * 30)
        return s * np.exp(-a * 7) * np.minimum(1, a * 500)
    def bassn(self, f, d):
        a = self.tt(d); s = np.sin(2 * np.pi * f * a) + .3 * np.sin(2 * np.pi * 2 * f * a)
        return s * np.minimum(1, a * 200) * np.exp(-a * 3)
    def pad(self, notes, d):
        a = self.tt(d); out = np.zeros(len(a))
        for m in notes:
            for det in (-.07, .07):
                out += 2 * ((a * hz(m) * 2 ** (det / 12) + self.rng.random()) % 1) - 1
        out = self.lp(out / (2 * len(notes)), 1200)
        return out * np.minimum(1, a * 4) * np.minimum(1, (d - a) * 6)
    def bell(self, f, d=1.0):
        a = self.tt(d)
        return sum(w * np.sin(2 * np.pi * f * k * a) * np.exp(-a * (3 + 2 * k)) for k, w in [(1, 1), (2.01, .5), (3.02, .25)]) * np.minimum(1, a * 600)

    # ---- music sections ----
    def music(self, sections):
        """sections: list of (style, from_scene, to_scene_or_None); style = groove | soft | warm"""
        bar = 4 * self.beat
        for style, a, b in sections:
            t0 = self.start[a]; t1 = self.start[b] if b else self.total - 1.0
            k = 0; t = t0
            while t < t1 - .05:
                ch = self.prog[k % len(self.prog)]; d = min(bar, t1 - t)
                self.add(self.mus, t, self.pad([m + 12 for m in ch[1:]], d), .10 if style != "groove" else .07, -.25)
                self.add(self.mus, t, self.pad([m + 12 for m in ch[1:]], d), .10 if style != "groove" else .07, .25)
                for e in range(8):
                    nt = t + e * self.beat / 2
                    if nt >= t1: break
                    if e in (0, 3, 4, 6) or style == "soft":
                        if style != "soft" or e % 4 == 0:
                            self.add(self.mus, nt, self.lp(self.bassn(hz(ch[0]), self.beat * .9), 600), .32)
                    if style == "groove":
                        if e in (0, 4): self.add(self.mus, nt, self.kick(), .75)
                        if e in (2, 6): self.add(self.mus, nt, self.clap(), .9)
                    elif style == "warm" and e in (0, 4):
                        self.add(self.mus, nt, self.kick(), .45)
                    self.add(self.mus, nt, self.shaker(), 1.0 if style != "soft" else .5, .4)
                    self.add(self.mus, nt + self.beat / 4, self.shaker(), .6, .4)
                    # marimba melody: chord tones bouncing
                    pat = [3, 2, 1, 2, 3, 1, 2, 3] if style != "warm" else [1, 2, 3, 2, 1, 2, 3, 2]
                    if style != "soft" or e % 2 == 0:
                        self.add(self.mus, nt, self.marimba(hz(ch[pat[e]] + 12)), .11, -.3 if e % 2 else .3)
                t += bar; k += 1
        # ending chord
        end = self.total - 1.25
        self.add(self.mus, end, self.kick(), .8)
        for m in self.prog[0][1:] + [self.prog[0][1] + 12]:
            self.add(self.mus, end, self.bell(hz(m + 12), 1.2), .08)
        pump = np.ones(self.n)
        for kk in np.arange(0, self.total, self.beat):
            i = int(kk * SR); a = self.tt(.22)
            pump[i:i + len(a)] = np.minimum(pump[i:i + len(a)], 1 - .25 * np.exp(-a * 14))
        self.mus *= pump[:, None]

    # ---- sound effects ----
    def sfx(self, name, at, gain=1.0, pan=0.0, dur=1.0):
        tt, rng = self.tt, self.rng
        if name == "pop":
            a = tt(.1); s = np.sin(2 * np.pi * np.cumsum(500 + 900 * a / .1) / SR) * np.exp(-a * 40); g = .3
        elif name == "tap":
            a = tt(.08); s = np.sin(2 * np.pi * np.cumsum(900 * np.exp(-a * 25) + 300) / SR) * np.exp(-a * 45); g = .45
        elif name == "key":
            a = tt(.03); s = self.hp(self.noise(.03), 2500) * np.exp(-a * 160); g = .2
        elif name == "whoosh":
            a = tt(.45); s = self.lp(self.hp(self.noise(.45), 600), 5000) * np.sin(np.pi * a / .45) ** 2 * .5; g = .35
        elif name == "boing":
            a = tt(.45); f = 220 + 500 * (a / .45) + 30 * np.sin(2 * np.pi * 18 * a)
            s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-a * 5); g = .25
        elif name == "thud":
            a = tt(.3); s = np.sin(2 * np.pi * np.cumsum(60 + 70 * np.exp(-a * 30)) / SR) * np.exp(-a * 14) + self.lp(self.noise(.3), 800) * np.exp(-a * 30) * .4; g = .6
        elif name == "tape":
            a = tt(.5); s = self.hp(self.noise(.5), 1500) * (0.5 + .5 * np.sin(2 * np.pi * 40 * a)) * np.sin(np.pi * a / .5); g = .25
        elif name == "ring":
            a = tt(1.0); s = np.sin(2 * np.pi * np.where((a * 12).astype(int) % 2, 1320, 1050) * a) * (((a * 2.5) % 1) < .7) * .6; g = .25
        elif name == "engine":
            a = tt(dur); f = 55 + 10 * np.sin(2 * np.pi * .7 * a)
            s = self.lp((2 * ((np.cumsum(f) / SR) % 1) - 1), 700) * np.minimum(1, a * 3) * np.minimum(1, (dur - a) * 3); g = .22
        elif name == "success":
            s = np.zeros(int(1.3 * SR))
            for i, m in enumerate((72, 76, 79, 84)):
                b = self.bell(hz(m), 1.3 - i * .08); j = int(i * .08 * SR); s[j:j + len(b)] += b[: len(s) - j]
            g = .4
        elif name == "coin":
            s = np.zeros(int(.8 * SR))
            for i, f in enumerate((1976, 2637)):
                b = self.bell(f, .7); j = int(i * .07 * SR); s[j:j + len(b)] += b[: len(s) - j]
            g = .35
        elif name == "sparkle":
            s = np.zeros(int(.9 * SR))
            for i in range(5):
                b = self.bell(hz(84 + [0, 4, 7, 12, 16][i]), .5); j = int(i * .06 * SR); s[j:j + len(b)] += b[: len(s) - j]
            g = .12
        elif name == "notif":
            s = np.concatenate([self.bell(880, .12), self.bell(1320, .5)]); g = .25
        else:
            raise ValueError(name)
        self.add(self.fx, at, s, g * gain, pan)

    def write(self, out_name):
        mix = self.mus * .9 + self.fx
        f0 = int(.3 * SR); mix[-f0:] *= np.linspace(1, 0, f0)[:, None]
        mix = np.tanh(mix * 1.1) / np.tanh(1.1); mix *= .89 / np.max(np.abs(mix))
        work = os.environ.get("TVC_WORK", "/tmp/tvc_work"); os.makedirs(work, exist_ok=True)
        wav = os.path.join(work, out_name + ".wav")
        with wave.open(wav, "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((mix * 32767).astype("<i2").tobytes())
        import imageio_ffmpeg
        out = os.path.join(HERE, out_name)
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-y", "-i", wav, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
                        "-ar", "44100", "-c:a", "aac", "-b:a", "192k", out], check=True)
        print(f"wrote {out} ({self.total:.1f}s)")
