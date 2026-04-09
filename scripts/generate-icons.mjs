/**
 * Generates public/apple-touch-icon.png and public/favicon.ico from public/favicon.svg.
 *
 * Usage:
 *   npm install --save-dev sharp
 *   node scripts/generate-icons.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "favicon.svg");
const svgBuffer = readFileSync(svgPath);

// apple-touch-icon.png — 180×180
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(join(root, "public", "apple-touch-icon.png"));
console.log("✓ public/apple-touch-icon.png");

// favicon.ico — 32×32 (ICO via PNG buffer)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(root, "public", "favicon-32.png"));
console.log("✓ public/favicon-32.png (rename/convert to .ico as needed)");

console.log("\nNote: to produce a true .ico from the PNG, use a tool such as png2ico or icotool.");
