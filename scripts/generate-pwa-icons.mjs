import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const iconsDir = join(publicDir, 'icons');

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#003087"/>
  <rect x="64" y="64" width="384" height="384" rx="48" fill="#ffffff"/>
  <text x="256" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="72" fill="#003087">PS</text>
  <text x="256" y="310" text-anchor="middle" font-family="Arial,sans-serif" font-weight="600" font-size="36" fill="#e8471e">Patel</text>
  <text x="256" y="360" text-anchor="middle" font-family="Arial,sans-serif" font-weight="600" font-size="36" fill="#003087">Sales</text>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

await mkdir(iconsDir, { recursive: true });
await writeFile(join(publicDir, 'favicon.svg'), svgIcon);

const svgBuffer = Buffer.from(svgIcon);

for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, `icon-${size}x${size}.png`));
}

await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon.ico'));

console.log('PWA icons generated in public/icons/');
