const { chromium } = require('playwright');
(async () => {
  const [html, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 2560 } });
  await p.goto('file://' + html); await p.waitForTimeout(500);
  await p.screenshot({ path: out, type: 'jpeg', quality: 95 });
  await b.close();
})();
