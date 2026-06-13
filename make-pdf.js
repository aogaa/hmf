const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const file = 'file:///' + path.resolve('C:/codex/hmf/svarskjema.html').split('\\').join('/');
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.pdf({
    path: 'C:/codex/hmf/svarskjema.pdf',
    format: 'A4',
    printBackground: false,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  await browser.close();
  console.log('PDF lagret: svarskjema.pdf');
})().catch(e => { console.error(e); process.exit(1); });
