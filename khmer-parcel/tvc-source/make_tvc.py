#!/usr/bin/env python3
"""Render HTML scenes and join them (plus optional video clips) into a 1080x1920 Reel.

Usage:
    python3 make_tvc.py spec.json            # render + assemble
    python3 make_tvc.py spec.json --preview  # one PNG per scene at its last second

spec.json:
{
  "html": "scenes_ad_seller_story.html",       # scene file in this folder
  "out": "../khmer_parcel_ad_new.mp4",          # relative to this folder
  "xfade": 0.35,                                # transition length (s)
  "segments": [
    {"scene": "pain", "dur": 13.5, "next": "circleopen"},
    {"video": "/path/clip.mp4", "start": 4.3, "end": 15.3, "next": "fade"},
    {"scene": "cta", "dur": 6.8}
  ]
}
"next" is the ffmpeg xfade transition into the following segment
(fade, slideleft, slideup, wipeup, circleopen, zoomin, ...).
Frames go to $TVC_WORK (default /tmp/tvc_work). Optional "audio": "<file>" (relative to
this folder) is used as the soundtrack; without it the output gets a silent AAC track
so a voiceover can be added later.
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.environ.get("TVC_WORK", "/tmp/tvc_work")
FPS = 30


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def node_env(html):
    env = dict(os.environ, SCENES=html)
    env["NODE_PATH"] = subprocess.check_output(["npm", "root", "-g"], text=True).strip()
    return env


def render_scene(html, scene, dur):
    out = os.path.join(WORK, os.path.splitext(html)[0], scene)
    subprocess.run(["rm", "-rf", out])
    subprocess.run(["node", "render.cjs", scene, str(dur), out, str(FPS)], cwd=HERE, env=node_env(html), check=True)
    return out


def preview(spec):
    for seg in spec["segments"]:
        if "scene" in seg:
            subprocess.run(["node", "render.cjs", "preview", seg["scene"], str(max(seg["dur"] - 0.2, 0))],
                           cwd=HERE, env=node_env(spec["html"]), check=True)
    print("previews written to", HERE, "(prev_<scene>_<t>.png)")


def build(spec):
    html, segs, x = spec["html"], spec["segments"], spec.get("xfade", 0.35)
    os.makedirs(WORK, exist_ok=True)
    scenes = [s for s in segs if "scene" in s]
    with ThreadPoolExecutor(max_workers=min(6, len(scenes) or 1)) as pool:
        dirs = dict(zip([s["scene"] for s in scenes],
                        pool.map(lambda s: render_scene(html, s["scene"], s["dur"]), scenes)))

    inputs, filt, durs = [], [], []
    for i, s in enumerate(segs):
        if "scene" in s:
            inputs += ["-framerate", str(FPS), "-i", os.path.join(dirs[s["scene"]], "f%04d.jpg")]
            d = s["dur"]
        else:
            inputs += ["-ss", str(s["start"]), "-to", str(s["end"]), "-i", s["video"]]
            d = s["end"] - s["start"]
        durs.append(d)
        filt.append(f"[{i}:v]scale=1080:1920,format=yuv420p,setsar=1,trim=duration={d:.3f},"
                    f"setpts=PTS-STARTPTS,fps={FPS},settb=1/{FPS}[s{i}]")
    prev, acc = "s0", durs[0]
    for i in range(1, len(segs)):
        off = acc - x
        filt.append(f"[{prev}][s{i}]xfade=transition={segs[i-1].get('next', 'fade')}:duration={x}:offset={off:.3f}[x{i}]")
        prev, acc = f"x{i}", off + durs[i]

    out = os.path.normpath(os.path.join(HERE, spec["out"]))
    if spec.get("audio"):
        audio_in = ["-i", os.path.join(HERE, spec["audio"])]  # -shortest trims it to the video
    else:
        audio_in = ["-f", "lavfi", "-t", f"{acc:.3f}", "-i", "anullsrc=r=44100:cl=stereo"]
    cmd = [ffmpeg(), "-v", "error", "-y", *inputs, *audio_in,
           "-filter_complex", ";".join(filt), "-map", f"[{prev}]", "-map", f"{len(segs)}:a",
           "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", str(FPS),
           "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True)
    sheet = os.path.join(WORK, os.path.basename(out) + ".sheet.png")
    n = max(1, int(acc // 2) + 1)
    subprocess.run([ffmpeg(), "-v", "error", "-y", "-i", out, "-vf", f"fps=1/2,scale=120:-1,tile={n}x1",
                    "-frames:v", "1", sheet], check=True)
    print(f"wrote {out} ({acc:.1f}s); contact sheet every 2s: {sheet}")


if __name__ == "__main__":
    spec = json.load(open(sys.argv[1]))
    preview(spec) if "--preview" in sys.argv else build(spec)
