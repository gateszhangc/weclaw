import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";
import toIco from "to-ico";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const brandDir = path.join(publicDir, "brand");
const appDir = path.join(projectRoot, "app");

const logoSvg = String.raw`<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="120" y1="82" x2="876" y2="950" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#102028"/>
      <stop offset="1" stop-color="#04080B"/>
    </linearGradient>
    <linearGradient id="halo" x1="126" y1="126" x2="898" y2="898" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#9CF0CB"/>
      <stop offset="1" stop-color="#56C5E8"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" stroke="white" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
    <filter id="blur" x="0" y="0" width="1024" height="1024" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
  </defs>

  <rect width="1024" height="1024" rx="240" fill="url(#bg)"/>
  <rect x="64" y="64" width="896" height="896" rx="208" stroke="url(#halo)" stroke-opacity="0.24" stroke-width="18"/>

  <g opacity="0.48">
    <rect x="110" y="110" width="804" height="804" rx="168" fill="url(#grid)"/>
  </g>

  <circle cx="210" cy="204" r="74" fill="#6ED9FF" fill-opacity="0.15" filter="url(#blur)"/>
  <circle cx="824" cy="790" r="100" fill="#7DE6B9" fill-opacity="0.18" filter="url(#blur)"/>

  <rect x="138" y="138" width="748" height="748" rx="168" stroke="#7BE7BE" stroke-opacity="0.82" stroke-width="28" stroke-dasharray="164 56" />

  <circle cx="512" cy="154" r="34" fill="#7BE7BE"/>
  <circle cx="870" cy="512" r="34" fill="#7BE7BE"/>
  <circle cx="512" cy="870" r="34" fill="#7BE7BE"/>
  <circle cx="154" cy="512" r="34" fill="#7BE7BE"/>

  <path
    d="M232 332V704L382 476L512 704L642 476L792 704V332"
    stroke="#F4F8F8"
    stroke-width="92"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <path
    d="M256 296H768"
    stroke="#7BE7BE"
    stroke-opacity="0.38"
    stroke-width="18"
    stroke-linecap="round"
  />

  <path
    d="M292 768H732"
    stroke="#7BE7BE"
    stroke-opacity="0.26"
    stroke-width="18"
    stroke-linecap="round"
  />
</svg>`;

await mkdir(brandDir, { recursive: true });

await writeFile(path.join(brandDir, "logo-mark.svg"), logoSvg);

const masterPng = await sharp(Buffer.from(logoSvg))
  .resize(1024, 1024)
  .png({ compressionLevel: 9, quality: 100 })
  .toBuffer();

await writeFile(path.join(brandDir, "logo-master.png"), masterPng);
await writeFile(path.join(publicDir, "icon-512.png"), await sharp(masterPng).resize(512, 512).png().toBuffer());
await writeFile(path.join(publicDir, "icon-192.png"), await sharp(masterPng).resize(192, 192).png().toBuffer());
await writeFile(
  path.join(publicDir, "apple-touch-icon.png"),
  await sharp(masterPng).resize(180, 180).png().toBuffer(),
);

const faviconBuffers = await Promise.all(
  [16, 32, 48].map((size) => sharp(masterPng).resize(size, size).png().toBuffer()),
);

await writeFile(path.join(appDir, "favicon.ico"), await toIco(faviconBuffers));
