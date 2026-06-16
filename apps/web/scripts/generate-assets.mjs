import QRCode from 'qrcode';
import { writeFileSync } from 'fs';

const QR_URL = 'https://tryonar.net/lincoln?utm_source=qr&utm_medium=business_card';

// Generate raw QR SVG (black modules)
const rawSvg = await QRCode.toString(QR_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
});

// Inject gradient defs and swap fill to use gradient
const gradientDefs = `<defs>
  <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
  </linearGradient>
</defs>`;

const styledSvg = rawSvg
    .replace('<svg ', '<svg style="border-radius:12px;background:#0d0d14;" ')
    .replace(/<rect[^>]*fill="#ffffff"[^>]*\/>/, match => match.replace('#ffffff', '#0d0d14'))
    .replace(/<path[^>]*fill="#000000"[^>]*\/>/, match => match.replace('#000000', 'url(#qrGrad)'))
    .replace('<defs/>', gradientDefs)
    .replace(/(<svg[^>]*>)/, `$1${gradientDefs}`);

writeFileSync('public/lincoln-qr.svg', styledSvg);
console.log('✓ QR code → public/lincoln-qr.svg');
