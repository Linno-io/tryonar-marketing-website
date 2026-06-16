import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Read QR SVG and photo as base64
const qrSvg = readFileSync(resolve('public/lincoln-qr.svg'), 'utf8');
const qrDataUrl = `data:image/svg+xml;base64,${Buffer.from(qrSvg).toString('base64')}`;
const photoData = readFileSync(resolve('public/lincoln-photo.jpg'));
const photoDataUrl = `data:image/jpeg;base64,${photoData.toString('base64')}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @font-face { font-family: 'Inter'; src: local('Inter'), local('Helvetica Neue'), local('Arial'); }

  /* 3.5" x 2" at 96dpi = 336 x 192px, with 0.125" bleed = 348 x 204px */
  .page { width: 348px; height: 204px; position: relative; overflow: hidden; }

  /* FRONT */
  .front {
    background: #0d0d14;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px 20px 14px;
  }
  .front::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%);
    pointer-events: none;
  }
  .front-top { display: flex; align-items: center; gap: 12px; }
  .front-photo {
    width: 52px; height: 52px; border-radius: 50%;
    object-fit: cover; object-position: center top;
    border: 2px solid rgba(139,92,246,0.5);
    flex-shrink: 0;
  }
  .front-info { flex: 1; }
  .front-brand {
    font-size: 6px; font-weight: 700; letter-spacing: 0.2em;
    color: #a78bfa; text-transform: uppercase; margin-bottom: 2px;
  }
  .front-name {
    font-size: 16px; font-weight: 800; color: #fff;
    letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 2px;
  }
  .front-title {
    font-size: 6px; font-weight: 600; letter-spacing: 0.15em;
    color: #6b7280; text-transform: uppercase;
  }
  .front-bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .front-tagline {
    font-size: 7px; color: #9ca3af; line-height: 1.5; max-width: 180px;
  }
  .front-tag {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    color: #fff; font-size: 6px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 8px; border-radius: 999px;
  }
  .gradient-bar {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
  }

  /* BACK */
  .back {
    background: #f8f8fc;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    align-items: stretch;
  }
  .back-sidebar {
    width: 8px;
    background: linear-gradient(180deg, #8b5cf6 0%, #ec4899 100%);
    flex-shrink: 0;
  }
  .back-content {
    flex: 1; padding: 16px 16px 14px 14px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .back-name { font-size: 13px; font-weight: 800; color: #0d0d14; margin-bottom: 1px; }
  .back-title { font-size: 6.5px; font-weight: 600; letter-spacing: 0.12em; color: #8b5cf6; text-transform: uppercase; }
  .back-contacts { display: flex; flex-direction: column; gap: 3px; }
  .back-contact { font-size: 6.5px; color: #374151; display: flex; gap: 5px; }
  .back-contact-label { color: #9ca3af; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; width: 28px; flex-shrink: 0; }
  .back-qr-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .back-qr { width: 64px; height: 64px; }
  .back-qr-label { font-size: 5px; color: #9ca3af; letter-spacing: 0.1em; text-transform: uppercase; }

  /* page break */
  .break { page-break-after: always; }
</style>
</head>
<body>

<!-- FRONT -->
<div class="page front break">
  <div class="front-top">
    <img class="front-photo" src="${photoDataUrl}" />
    <div class="front-info">
      <div class="front-brand">TryonAR</div>
      <div class="front-name">Lincoln Islam</div>
      <div class="front-title">Founder &amp; Visionary</div>
    </div>
  </div>
  <div class="front-bottom">
    <div class="front-tagline">
      Virtual try-on for beauty brands — convert browsers into buyers with real-time AR.
    </div>
    <div class="front-tag">tryonar.net</div>
  </div>
  <div class="gradient-bar"></div>
</div>

<!-- BACK -->
<div class="page back">
  <div class="back-sidebar"></div>
  <div class="back-content">
    <div>
      <div class="back-name">Lincoln Islam</div>
      <div class="back-title" style="margin-bottom:10px;">Founder &amp; Visionary · TryonAR</div>
      <div class="back-contacts">
        <div class="back-contact"><span class="back-contact-label">Email</span> lincoln@tryonar.net</div>
        <div class="back-contact"><span class="back-contact-label">Web</span> tryonar.net</div>
        <div class="back-contact"><span class="back-contact-label">Card</span> tryonar.net/lincoln</div>
        <div class="back-contact"><span class="back-contact-label">in</span> linkedin.com/in/lincolnislam</div>
      </div>
    </div>
    <div style="font-size:5.5px; color:#9ca3af; letter-spacing:0.05em;">
      Building the future of beauty retail with augmented reality.
    </div>
  </div>
  <div class="back-qr-wrap" style="padding:16px 14px 14px 0; justify-content:center;">
    <img class="back-qr" src="${qrDataUrl}" />
    <div class="back-qr-label">Scan to connect</div>
  </div>
</div>

</body>
</html>`;

writeFileSync('scripts/card.html', html);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });

await page.pdf({
    path: 'public/lincoln-business-card.pdf',
    width: '348px',
    height: '408px', // both sides stacked
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('✓ Print card → public/lincoln-business-card.pdf');
