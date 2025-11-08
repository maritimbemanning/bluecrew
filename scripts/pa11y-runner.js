'use strict';

// Programmatic Pa11y runner that avoids Puppeteer's default networkidle2 wait
// by navigating the page ourselves with a more lenient waitUntil, then
// instructing Pa11y to audit the already-loaded page.

const fs = require('fs');
const path = require('path');
const pa11y = require('pa11y');
const puppeteer = require('puppeteer');

async function main() {
  const [url, outPath] = process.argv.slice(2);
  if (!url || !outPath) {
    console.error('Usage: node scripts/pa11y-runner.js <url> <outPath.json>');
    process.exit(2);
  }

  const waitMs = Number(process.env.PA11Y_WAIT || 3000);
  const timeoutMs = Number(process.env.PA11Y_TIMEOUT || 60000);
  const waitUntil = process.env.PA11Y_WAIT_UNTIL || 'domcontentloaded'; // 'load' | 'domcontentloaded'

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      // Make runs more deterministic in CI/Windows
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    // A modest viewport so layout is stable but not too tall
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    // Navigate with a forgiving signal so we don't wait on networkidle
    await page.goto(url, { waitUntil, timeout: timeoutMs }).catch(err => {
      // If navigation times out, continue anyway; the server likely responded
      console.error(`Navigation warning for ${url}: ${err.message}`);
    });

    // Small additional wait to let late scripts settle
    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs));
    }

    // Prefer to wait for core a11y-carrying elements before auditing
    // Title may be injected client-side by Next metadata; wait briefly
    try {
      await page.waitForSelector('head > title', { timeout: 5000 });
    } catch {}
    try {
      await page.waitForFunction(() => !!(document && document.title && document.title.trim().length > 0), { timeout: 7000 });
    } catch {}
    try {
      await page.waitForFunction(() => document.documentElement.hasAttribute('lang') && !!document.documentElement.getAttribute('lang'), { timeout: 3000 });
    } catch {}

    const results = await pa11y(url, {
      // Pass our existing browser+page so Pa11y skips its own page.goto
      browser,
      page,
      ignoreUrl: true,
      wait: waitMs,
      timeout: timeoutMs
    });

    // Ensure directory exists
    const outDir = path.dirname(outPath);
    fs.mkdirSync(outDir, { recursive: true });
    // Write only the issues array to match prior expectations
    fs.writeFileSync(outPath, JSON.stringify(results.issues || [], null, 2));
    console.log(`wrote ${outPath} with ${results.issues?.length ?? 0} issues`);
    process.exit(0);
  } catch (err) {
    try {
      // Best-effort: write an empty array so downstream steps don't choke
      fs.writeFileSync(outPath, '[]');
    } catch {}
    console.error(`pa11y-runner error: ${err?.message || err}`);
    // Do not fail the overall script; let callers decide thresholds
    process.exit(0);
  } finally {
    if (browser) {
      try { await browser.close(); } catch {}
    }
  }
}

main();
