#!/usr/bin/env bash
# One-time setup for TVC rendering in a fresh container.
# Installs Python helpers (Pillow, a bundled ffmpeg) and checks Playwright + Chromium.
set -euo pipefail
pip install -q pillow imageio-ffmpeg 2>&1 | grep -v WARNING || true
python3 -c "import imageio_ffmpeg; print('ffmpeg:', imageio_ffmpeg.get_ffmpeg_exe())"
NODE_PATH=$(npm root -g) node -e "require('playwright'); console.log('playwright: ok')"
ls /opt/pw-browsers/chromium-*/chrome-linux/chrome >/dev/null && echo "chromium: ok"
