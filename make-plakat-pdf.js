const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });
  const file = 'file:///' + path.resolve('C:/codex/hmf/plakat.html').split('\\').join('/');
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.pdf({
    path: 'C:/codex/hmf/plakat.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  await browser.close();
  console.log('Plakat PDF lagret: plakat.pdf');
})().catch(e => { console.error(e); process.exit(1); });
