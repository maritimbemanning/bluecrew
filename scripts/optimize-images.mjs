#!/usr/bin/env node
/**
 * Optimize all images - convert to WebP
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, parse } from 'path';

const DIRS = ['./public/hero', './public/guides', './public/icons'];
const MAX_WIDTH = 1920;
const QUALITY = 75; // Lower = smaller file

async function optimizeImages() {
  console.log('🖼️  Optimizing all images...\n');

  let totalSaved = 0;

  for (const dir of DIRS) {
    console.log(`\n📁 Processing ${dir}...\n`);

    let files;
    try {
      files = await readdir(dir);
    } catch {
      console.log(`   ⏭️  Directory not found, skipping`);
      continue;
    }

    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (!stats.isFile()) continue;

      const ext = parse(file).ext.toLowerCase();
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

      const sizeKB = stats.size / 1024;
      const { name } = parse(file);

      // Skip if webp version already exists and is smaller
      const webpPath = join(dir, `${name}.webp`);

      console.log(`📦 ${file} (${sizeKB.toFixed(0)}KB)`);

      try {
        const result = await sharp(filePath)
          .resize(MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: QUALITY })
          .toFile(webpPath);

        const newSizeKB = result.size / 1024;
        const saved = stats.size - result.size;
        totalSaved += saved;
        const savings = (saved / stats.size * 100).toFixed(1);

        console.log(`   ✅ → ${name}.webp (${newSizeKB.toFixed(0)}KB) - ${savings}% smaller`);

        // Delete original after successful conversion
        await unlink(filePath);
        console.log(`   🗑️  Deleted original ${file}\n`);

      } catch (err) {
        console.error(`   ❌ Failed: ${err.message}\n`);
      }
    }
  }

  console.log(`\n✨ Done! Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
  console.log('⚠️  Remember to update image references in code to use .webp');
}

optimizeImages().catch(console.error);
