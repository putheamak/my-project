// usage: node render.js <scene> <seconds> <outdir> [fps] | node render.js preview <scene> <t1,t2,...>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [mode, a, b, c] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, process.env.SCENES || 'scenes.html'));
  if (mode === 'preview') {
    await page.evaluate(id => window.showScene(id), a);
    for (const t of b.split(',').map(Number)) {
      await page.evaluate(t => window.seek(t), t);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.screenshot({ path: path.join(__dirname, `prev_${a}_${t}.png`) });
    }
  } else {
    const scene = mode, secs = Number(a), out = b, fps = Number(c || 30);
    fs.mkdirSync(out, { recursive: true });
    await page.evaluate(id => window.showScene(id), scene);
    const n = Math.round(secs * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(t), i / fps);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.screenshot({ path: path.join(out, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 94 });
    }
  }
  await browser.close();
})();
