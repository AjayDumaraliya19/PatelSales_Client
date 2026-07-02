import sharp from 'sharp';
import { copyFile, mkdir, readdir, rm, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const iconsDir = join(publicDir, 'icons');
const appIconSetDir = join(publicDir, 'AppIcons', 'Assets.xcassets', 'AppIcon.appiconset');
const androidDir = join(publicDir, 'AppIcons', 'android');

/** PWA output size → source file (relative to public/) */
const iconSources = {
  16: join(appIconSetDir, '16.png'),
  32: join(appIconSetDir, '32.png'),
  48: join(androidDir, 'mipmap-mdpi', 'ic_launcher.png'),
  72: join(androidDir, 'mipmap-hdpi', 'ic_launcher.png'),
  96: join(androidDir, 'mipmap-xhdpi', 'ic_launcher.png'),
  128: join(appIconSetDir, '128.png'),
  144: join(androidDir, 'mipmap-xxhdpi', 'ic_launcher.png'),
  152: join(appIconSetDir, '152.png'),
  167: join(appIconSetDir, '167.png'),
  180: join(appIconSetDir, '180.png'),
  192: join(androidDir, 'mipmap-xxxhdpi', 'ic_launcher.png'),
  256: join(appIconSetDir, '256.png'),
  384: join(appIconSetDir, '512.png'),
  512: join(publicDir, 'AppIcons', 'playstore.png'),
};

const maskableSources = {
  192: join(publicDir, 'AppIcons', 'playstore.png'),
  512: join(publicDir, 'AppIcons', 'playstore.png'),
};

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeIcon(size, sourcePath, resize = false) {
  const outputPath = join(iconsDir, `icon-${size}x${size}.png`);
  if (resize) {
    await sharp(sourcePath).resize(size, size).png().toFile(outputPath);
    return;
  }
  await copyFile(sourcePath, outputPath);
}

async function writeMaskableIcon(size, sourcePath) {
  const outputPath = join(iconsDir, `maskable-icon-${size}x${size}.png`);
  await sharp(sourcePath).resize(size, size).png().toFile(outputPath);
}

await rm(iconsDir, { recursive: true, force: true });
await mkdir(iconsDir, { recursive: true });

for (const [size, sourcePath] of Object.entries(iconSources)) {
  if (!(await fileExists(sourcePath))) {
    throw new Error(`Missing AppIcons source for ${size}x${size}: ${sourcePath}`);
  }
  const needsResize = Number(size) === 384;
  await writeIcon(Number(size), sourcePath, needsResize);
}

for (const [size, sourcePath] of Object.entries(maskableSources)) {
  if (!(await fileExists(sourcePath))) {
    throw new Error(`Missing maskable source for ${size}x${size}: ${sourcePath}`);
  }
  await writeMaskableIcon(Number(size), sourcePath);
}

const appleTouchSource = join(appIconSetDir, '180.png');
await copyFile(appleTouchSource, join(publicDir, 'apple-touch-icon.png'));
await sharp(join(appIconSetDir, '32.png')).resize(32, 32).png().toFile(join(publicDir, 'favicon.ico'));

const existingIcons = await readdir(iconsDir);
console.log(`PWA icons synced from AppIcons → public/icons/ (${existingIcons.length} files)`);
