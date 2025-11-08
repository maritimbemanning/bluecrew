import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import pngToIco from 'png-to-ico';

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const root = process.cwd();
  const candidates = [
    path.join(root, 'public', 'icons', 'icononly_transparent_nobuffer.png'),
    path.join(root, 'app', 'icon.png'),
  ];

  let srcPath = null;
  for (const c of candidates) {
    if (await fileExists(c)) {
      srcPath = c;
      break;
    }
  }

  if (!srcPath) {
    console.warn('[favicon] No source PNG found. Checked:', candidates.map(p => path.relative(root, p)).join(', '));
    return;
  }

  const outDir = path.join(root, 'public');
  const outPath = path.join(outDir, 'favicon.ico');
  await mkdir(outDir, { recursive: true });

  try {
    const buffer = await readFile(srcPath);
    // png-to-ico will scale and produce a multi-size ICO (16/24/32/48/64) from the PNG buffer
    const ico = await pngToIco(buffer);
    await writeFile(outPath, ico);
    console.log(`[favicon] Generated ${path.relative(root, outPath)} from ${path.relative(root, srcPath)}`);
  } catch (err) {
    console.error('[favicon] Failed to generate favicon.ico:', err?.message || err);
    process.exitCode = 0; // don’t fail the build; we still have rewrite + rel icons
  }
}

main();
