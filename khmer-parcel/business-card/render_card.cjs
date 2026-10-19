// Renders card.html (front, back, phone) to PNG and a 2-page 90x54 mm PDF. Called by make_card.py.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const dir = process.argv[2];
  const data = JSON.parse(fs.readFileSync(path.join(dir, 'card_data.js.json'), 'utf8'));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const shot = async (view, w, h, out) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + path.join(dir, 'card.html') + '#' + view);
    await p.evaluate(d => window.fill(d), data); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(data._out, out) }); return p;
  };
  await (await shot('front', 1063, 638, 'khmer_parcel_card_front.png')).close();
  await (await shot('back', 1063, 638, 'khmer_parcel_card_back.png')).close();
  await (await shot('phone', 1080, 1920, 'khmer_parcel_card_phone.png')).close();
  const p = await b.newPage({ viewport: { width: 1063, height: 638 } });
  await p.goto('file://' + path.join(dir, 'card.html') + '#print');
  await p.evaluate(d => window.fill(d), data); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.pdf({ path: path.join(data._out, 'khmer_parcel_card_print.pdf'), width: '90mm', height: '54mm', printBackground: true, pageRanges: '1-2' });
  await b.close(); console.log('rendered card PNGs + PDF');
})();
