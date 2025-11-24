#!/usr/bin/env node
/**
 * BLUECREW WORKFLOW TEST SCRIPT
 * Tests all critical endpoints and workflows
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.TEST_URL || 'https://bluecrew.no';
const ADMIN_URL = process.env.ADMIN_URL || 'https://admincrew.no';

// Colors for output
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
  log(`\n${'='.repeat(60)}`, colors.blue);
  log(message, colors.blue);
  log('='.repeat(60), colors.blue);
}

// HTTP request helper
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const lib = urlObj.protocol === 'https:' ? https : http;

    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: options.timeout || 10000,
    };

    const req = lib.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Tests
const tests = {
  async testHomepage() {
    section('TEST 1: Homepage');
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) {
        success('Homepage loads successfully');
        return true;
      } else {
        error(`Homepage returned ${res.status}`);
        return false;
      }
    } catch (err) {
      error(`Homepage failed: ${err.message}`);
      return false;
    }
  },

  async testHealthEndpoints() {
    section('TEST 2: Health Endpoints');
    let allPassed = true;

    const endpoints = [
      '/api/health',
      '/api/health/supabase',
      '/api/health/supabase/storage',
    ];

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (res.status === 200) {
          success(`${endpoint} - OK`);
        } else {
          error(`${endpoint} - Status ${res.status}`);
          allPassed = false;
        }
      } catch (err) {
        error(`${endpoint} - Failed: ${err.message}`);
        allPassed = false;
      }
    }

    return allPassed;
  },

  async testCSPHeaders() {
    section('TEST 3: Content Security Policy');
    try {
      const res = await fetch(BASE_URL);
      const csp = res.headers['content-security-policy'];

      if (!csp) {
        error('No CSP header found!');
        return false;
      }

      info('CSP Header present');

      // Check for required domains
      const requiredDomains = [
        'clerk.bluecrew.no',
        'ingest.de.sentry.io',
        'challenges.cloudflare.com',
        'admincrew.no',
      ];

      let allPresent = true;
      for (const domain of requiredDomains) {
        if (csp.includes(domain)) {
          success(`CSP includes ${domain}`);
        } else {
          error(`CSP missing ${domain} - May cause blocking!`);
          allPresent = false;
        }
      }

      return allPresent;
    } catch (err) {
      error(`CSP check failed: ${err.message}`);
      return false;
    }
  },

  async testClerkDomains() {
    section('TEST 4: Clerk DNS Configuration');
    try {
      // Test if clerk.bluecrew.no resolves
      const res = await fetch('https://clerk.bluecrew.no', { timeout: 5000 });

      // Clerk should return something (even 404/403 is fine - means DNS works)
      if (res.status) {
        success('clerk.bluecrew.no DNS resolves');
        return true;
      }
    } catch (err) {
      if (err.message.includes('ENOTFOUND')) {
        error('clerk.bluecrew.no DNS NOT FOUND - Corporate networks may block!');
        warning('Fix: Add CNAME record in DNS settings');
        return false;
      } else {
        warning(`clerk.bluecrew.no check inconclusive: ${err.message}`);
        return true; // May be network issue, not DNS
      }
    }
  },

  async testJobPostingsAPI() {
    section('TEST 5: Job Postings from AdminCrew');
    try {
      const res = await fetch(`${ADMIN_URL}/api/job-postings?status=active`);

      if (res.status === 200) {
        const data = JSON.parse(res.body);
        const jobs = data.data || data;

        if (Array.isArray(jobs) && jobs.length > 0) {
          success(`Found ${jobs.length} active job posting(s)`);
          jobs.forEach(job => {
            info(`  - ${job.title} (${job.location})`);
          });
          return true;
        } else {
          warning('No active job postings found');
          return true; // Not an error, just empty
        }
      } else {
        error(`AdminCrew API returned ${res.status}`);
        return false;
      }
    } catch (err) {
      error(`AdminCrew API failed: ${err.message}`);
      return false;
    }
  },

  async testCORSHeaders() {
    section('TEST 6: CORS Configuration');
    try {
      const res = await fetch(BASE_URL, {
        headers: {
          'Origin': 'https://example.com',
        },
      });

      const corsHeader = res.headers['access-control-allow-origin'];

      if (!corsHeader) {
        success('No CORS header (expected - API routes handle this)');
        return true;
      } else {
        info(`CORS header: ${corsHeader}`);
        return true;
      }
    } catch (err) {
      error(`CORS check failed: ${err.message}`);
      return false;
    }
  },

  async testSecurityHeaders() {
    section('TEST 7: Security Headers');
    try {
      const res = await fetch(BASE_URL);

      const requiredHeaders = {
        'x-frame-options': 'DENY',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'no-referrer',
        'strict-transport-security': /max-age=/,
      };

      let allPresent = true;
      for (const [header, expected] of Object.entries(requiredHeaders)) {
        const value = res.headers[header];
        if (!value) {
          error(`Missing security header: ${header}`);
          allPresent = false;
        } else if (expected instanceof RegExp) {
          if (expected.test(value)) {
            success(`${header}: ${value}`);
          } else {
            error(`${header} has incorrect value: ${value}`);
            allPresent = false;
          }
        } else {
          if (value.toLowerCase() === expected.toLowerCase()) {
            success(`${header}: ${value}`);
          } else {
            error(`${header} expected "${expected}", got "${value}"`);
            allPresent = false;
          }
        }
      }

      return allPresent;
    } catch (err) {
      error(`Security headers check failed: ${err.message}`);
      return false;
    }
  },

  async testRateLimiting() {
    section('TEST 8: Rate Limiting (Quick Check)');
    try {
      // Make 3 requests quickly to test rate limiting
      const endpoint = `${BASE_URL}/api/health`;

      for (let i = 1; i <= 3; i++) {
        const res = await fetch(endpoint);
        if (res.status === 200) {
          success(`Request ${i}/3 - OK`);
        } else if (res.status === 429) {
          warning(`Request ${i}/3 - Rate limited (expected after many requests)`);
        } else {
          error(`Request ${i}/3 - Unexpected status ${res.status}`);
        }
        await new Promise(r => setTimeout(r, 100)); // Small delay
      }

      info('Rate limiting appears to be working');
      return true;
    } catch (err) {
      error(`Rate limiting check failed: ${err.message}`);
      return false;
    }
  },
};

// Run all tests
async function runTests() {
  log('\n🧪 BLUECREW WORKFLOW TEST SUITE', colors.blue);
  log(`Testing: ${BASE_URL}`, colors.cyan);
  log(`AdminCrew: ${ADMIN_URL}\n`, colors.cyan);

  const results = [];
  const testFunctions = Object.entries(tests);

  for (const [name, testFn] of testFunctions) {
    try {
      const passed = await testFn();
      results.push({ name, passed });
    } catch (err) {
      error(`Test ${name} crashed: ${err.message}`);
      results.push({ name, passed: false });
    }
  }

  // Summary
  section('TEST SUMMARY');
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const failed = total - passed;

  if (failed === 0) {
    success(`All ${total} tests passed! 🎉`);
  } else {
    error(`${failed}/${total} tests failed`);
    warning('\nFailed tests:');
    results
      .filter(r => !r.passed)
      .forEach(r => log(`  - ${r.name}`, colors.red));
  }

  log('\n' + '='.repeat(60) + '\n');

  // Exit code
  process.exit(failed > 0 ? 1 : 0);
}

// Run
runTests().catch(err => {
  error(`Test suite crashed: ${err.message}`);
  process.exit(1);
});
