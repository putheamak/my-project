// Renders qr_stickers_A4.html to a 2-page A4 PDF plus a PNG of each sheet.
// Usage (from print/): NODE_PATH=$(npm root -g) node render_qr_stickers.cjs
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 300 / 96 });  // PNGs at 300 dpi
  await p.goto('file://' + __dirname + '/qr_stickers_A4.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.pdf({ path: __dirname + '/khmer_parcel_qr_stickers_A4.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pages = await p.$$('.page');
  await pages[0].screenshot({ path: __dirname + '/khmer_parcel_qr_stickers_A4_sheetA.png' });
  await pages[1].screenshot({ path: __dirname + '/khmer_parcel_qr_stickers_A4_sheetB.png' });
  await b.close();
})();
