#!/usr/bin/env node
/**
 * CORPORATE NETWORK COMPATIBILITY TEST
 * Checks if Bluecrew will work on strict corporate networks
 */

const https = require('https');
const dns = require('dns').promises;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function error(message) {
  log(`❌ ${message}`, colors.red);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.cyan);
}

function section(message) {
  log(`\n${'='.repeat(70)}`, colors.blue);
  log(message, colors.blue);
  log('='.repeat(70), colors.blue);
}

// Test DNS resolution
async function testDNS(domain) {
  try {
    const addresses = await dns.resolve(domain);
    success(`${domain} resolves to ${addresses[0]}`);
    return true;
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      error(`${domain} - DNS NOT FOUND`);
    } else {
      error(`${domain} - DNS error: ${err.message}`);
    }
    return false;
  }
}

// Test HTTPS connection
async function testHTTPS(url, description) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 5000,
    };

    const req = https.request(options, (res) => {
      if (res.statusCode) {
        success(`${description} - HTTPS accessible (${res.statusCode})`);
        resolve(true);
      } else {
        error(`${description} - No response`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      if (err.code === 'ENOTFOUND') {
        error(`${description} - DNS not found`);
      } else if (err.code === 'ECONNREFUSED') {
        error(`${description} - Connection refused (may be blocked)`);
      } else {
        error(`${description} - ${err.message}`);
      }
      resolve(false);
    });

    req.on('timeout', () => {
      error(`${description} - Connection timeout (likely blocked)`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Main test suite
async function runCorporateNetworkTests() {
  log('\n🏢 CORPORATE NETWORK COMPATIBILITY TEST', colors.blue);
  log('Checking if Bluecrew will work on strict corporate networks\n', colors.cyan);

  let issuesFound = [];

  // Test 1: DNS Resolution
  section('TEST 1: DNS Resolution');
  info('Testing critical subdomains...\n');

  const dnsTests = [
    { domain: 'bluecrew.no', critical: true },
    { domain: 'clerk.bluecrew.no', critical: true },
    { domain: 'admincrew.no', critical: true },
  ];

  for (const test of dnsTests) {
    const passed = await testDNS(test.domain);
    if (!passed && test.critical) {
      issuesFound.push({
        severity: 'CRITICAL',
        issue: `${test.domain} DNS not configured`,
        fix: test.domain === 'clerk.bluecrew.no'
          ? 'Add CNAME record in DNS: clerk → frontend-api.clerk.services'
          : 'Check domain DNS settings',
      });
    }
  }

  // Test 2: Third-party services
  section('TEST 2: Third-Party Service Access');
  info('Testing if corporate firewall blocks required services...\n');

  const thirdPartyTests = [
    { url: 'https://clerk.bluecrew.no', name: 'Clerk (custom domain)', critical: true },
    { url: 'https://accounts.clerk.dev', name: 'Clerk (fallback)', critical: false },
    { url: 'https://challenges.cloudflare.com', name: 'Cloudflare Turnstile', critical: true },
    { url: 'https://o4510290040848384.ingest.de.sentry.io', name: 'Sentry EU', critical: false },
    { url: 'https://plausible.io', name: 'Plausible Analytics', critical: false },
  ];

  for (const test of thirdPartyTests) {
    const passed = await testHTTPS(test.url, test.name);
    if (!passed && test.critical) {
      issuesFound.push({
        severity: 'HIGH',
        issue: `${test.name} blocked by network`,
        fix: test.url.includes('clerk.bluecrew.no')
          ? 'Ensure NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no is set'
          : `Corporate firewall may need to whitelist ${new URL(test.url).hostname}`,
      });
    }
  }

  // Test 3: Check for common corporate blockers
  section('TEST 3: Common Corporate Blockers');
  info('Checking for typical corporate network restrictions...\n');

  const blockerTests = [
    {
      check: async () => {
        // Check if external auth services are blocked
        const clerkBlocked = !(await testHTTPS('https://clerk.bluecrew.no', 'Clerk proxy'));
        const cloudflareBlocked = !(await testHTTPS('https://challenges.cloudflare.com', 'Cloudflare'));
        return clerkBlocked || cloudflareBlocked;
      },
      name: 'Authentication services',
      impact: 'Users cannot log in or register',
    },
    {
      check: async () => {
        // Check if analytics blocked
        return !(await testHTTPS('https://plausible.io', 'Analytics'));
      },
      name: 'Analytics tracking',
      impact: 'No visitor tracking (non-critical)',
    },
  ];

  for (const test of blockerTests) {
    const isBlocked = await test.check();
    if (isBlocked) {
      warning(`${test.name} may be blocked`);
      info(`Impact: ${test.impact}`);
      issuesFound.push({
        severity: 'MEDIUM',
        issue: `${test.name} blocked`,
        fix: test.impact,
      });
    } else {
      success(`${test.name} accessible`);
    }
  }

  // Summary
  section('SUMMARY');

  if (issuesFound.length === 0) {
    success('✨ No corporate network compatibility issues found!');
    success('Bluecrew should work on strict corporate networks.');
    log('\n');
    return 0;
  }

  error(`Found ${issuesFound.length} potential issue(s):\n`);

  // Group by severity
  const critical = issuesFound.filter(i => i.severity === 'CRITICAL');
  const high = issuesFound.filter(i => i.severity === 'HIGH');
  const medium = issuesFound.filter(i => i.severity === 'MEDIUM');

  if (critical.length > 0) {
    log('\n🚨 CRITICAL ISSUES (must fix!):', colors.red);
    critical.forEach((issue, i) => {
      log(`\n${i + 1}. ${issue.issue}`, colors.red);
      log(`   Fix: ${issue.fix}`, colors.yellow);
    });
  }

  if (high.length > 0) {
    log('\n⚠️  HIGH PRIORITY:', colors.yellow);
    high.forEach((issue, i) => {
      log(`\n${i + 1}. ${issue.issue}`, colors.yellow);
      log(`   Fix: ${issue.fix}`, colors.cyan);
    });
  }

  if (medium.length > 0) {
    log('\n⚠️  MEDIUM PRIORITY:', colors.cyan);
    medium.forEach((issue, i) => {
      log(`\n${i + 1}. ${issue.issue}`, colors.cyan);
      log(`   Fix: ${issue.fix}`, colors.cyan);
    });
  }

  log('\n' + '='.repeat(70) + '\n');

  return issuesFound.filter(i => i.severity === 'CRITICAL').length > 0 ? 1 : 0;
}

// Run tests
runCorporateNetworkTests()
  .then(exitCode => process.exit(exitCode))
  .catch(err => {
    error(`Test suite crashed: ${err.message}`);
    process.exit(1);
  });
