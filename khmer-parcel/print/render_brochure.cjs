// Renders the tri-fold brochure: trim-size PDF (office printer), 3 mm bleed PDF (print shop), 300 dpi PNG of each side.
// Usage (from print/): python3 make_brochure.py && NODE_PATH=$(npm root -g) node render_brochure.cjs
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [html, pdf, w, h] of [
    ['brochure_trifold.html', 'khmer_parcel_brochure_trifold_A4.pdf', 297, 210],
    ['brochure_trifold_bleed.html', 'khmer_parcel_brochure_trifold_A4_bleed3mm.pdf', 303, 216],
  ]) {
    const px = (mm) => Math.round(mm / 25.4 * 96);
    const p = await b.newPage({ viewport: { width: px(w), height: px(h) }, deviceScaleFactor: 300 / 96 });
    await p.goto('file://' + __dirname + '/' + html);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(600);
    await p.pdf({ path: __dirname + '/' + pdf, width: w + 'mm', height: h + 'mm', printBackground: true, preferCSSPageSize: true });
    if (html === 'brochure_trifold.html') {
      const sheets = await p.$$('.sheet');
      await sheets[0].screenshot({ path: __dirname + '/khmer_parcel_brochure_outside.png' });
      await sheets[1].screenshot({ path: __dirname + '/khmer_parcel_brochure_inside.png' });
    }
    await p.close();
  }
  await b.close();
})();
