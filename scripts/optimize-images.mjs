#!/usr/bin/env node
/**
 * Optimize hero images - convert large PNGs to WebP
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const HERO_DIR = './public/hero';
const MAX_WIDTH = 1920; // Max width for hero images
const QUALITY = 80; // WebP quality (0-100)

async function optimizeImages() {
  console.log('🖼️  Optimizing hero images...\n');

  const files = await readdir(HERO_DIR);

  for (const file of files) {
    const filePath = join(HERO_DIR, file);
    const stats = await stat(filePath);

    // Skip if not a file or if it's already small
    if (!stats.isFile()) continue;

    const ext = parse(file).ext.toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const sizeMB = stats.size / (1024 * 1024);

    // Only optimize files larger than 500KB
    if (stats.size < 500 * 1024) {
      console.log(`⏭️  ${file} (${(stats.size / 1024).toFixed(0)}KB) - already small, skipping`);
      continue;
    }

    console.log(`📦 ${file} (${sizeMB.toFixed(2)}MB)`);

    try {
      const { name } = parse(file);
      const outputPath = join(HERO_DIR, `${name}.webp`);

      // Convert to WebP
      const result = await sharp(filePath)
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const newSizeKB = result.size / 1024;
      const savings = ((stats.size - result.size) / stats.size * 100).toFixed(1);

      console.log(`   ✅ → ${name}.webp (${newSizeKB.toFixed(0)}KB) - ${savings}% smaller\n`);

    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}\n`);
    }
  }

  console.log('\n✨ Done! Remember to update image references in code to use .webp');
}

optimizeImages().catch(console.error);
