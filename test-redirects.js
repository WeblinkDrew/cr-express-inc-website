#!/usr/bin/env node

/**
 * Test Script for CR Express 301 Redirects
 * Run this after starting the development server to verify all redirects are working
 *
 * Usage:
 * 1. Start dev server: npm run dev
 * 2. In another terminal: node test-redirects.js
 */

const TEST_BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Define all redirects that should be tested
const redirectTests = [
  // CRITICAL SERVICE PAGE REDIRECTS
  { from: '/warehousing', to: '/services/warehousing', priority: 'CRITICAL' },
  { from: '/air-cargo', to: '/services/air-cargo', priority: 'CRITICAL' },
  { from: '/drayage', to: '/services/drayage', priority: 'CRITICAL' },
  { from: '/over-the-road', to: '/services/over-the-road', priority: 'CRITICAL' },
  { from: '/local-pd', to: '/services/local-pd', priority: 'CRITICAL' },

  // SEO VANITY REDIRECTS
  { from: '/bonded-warehouse', to: '/services/warehousing', priority: 'HIGH' },
  { from: '/trucking', to: '/services/over-the-road', priority: 'HIGH' },
  { from: '/freight', to: '/services/over-the-road', priority: 'MEDIUM' },
  { from: '/shipping', to: '/services/over-the-road', priority: 'MEDIUM' },
  { from: '/logistics', to: '/', priority: 'MEDIUM' },
  { from: '/quote', to: '/request-a-quote', priority: 'LOW' },
  { from: '/contact', to: '/contact-us-page', priority: 'LOW' },
];

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

async function testRedirect(from, to, priority) {
  const url = `${TEST_BASE_URL}${from}`;

  try {
    const response = await fetch(url, {
      redirect: 'manual', // Don't follow redirects automatically
      headers: {
        'User-Agent': 'CR-Express-Redirect-Tester/1.0'
      }
    });

    const location = response.headers.get('location');
    const status = response.status;

    // Check if it's a redirect (3xx status)
    if (status >= 300 && status < 400) {
      // Check if the destination matches
      if (location === to || location === `${TEST_BASE_URL}${to}`) {
        console.log(`${colors.green}✓${colors.reset} ${colors.bold}[${priority}]${colors.reset} ${from} → ${to} (${status})`);
        return { success: true, from, to, status, priority };
      } else {
        console.log(`${colors.red}✗${colors.reset} ${colors.bold}[${priority}]${colors.reset} ${from} → Expected: ${to}, Got: ${location} (${status})`);
        return { success: false, from, to, expected: to, actual: location, status, priority };
      }
    } else {
      console.log(`${colors.red}✗${colors.reset} ${colors.bold}[${priority}]${colors.reset} ${from} - No redirect (Status: ${status})`);
      return { success: false, from, to, status, priority, error: 'No redirect' };
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${colors.bold}[${priority}]${colors.reset} ${from} - Error: ${error.message}`);
    return { success: false, from, to, priority, error: error.message };
  }
}

async function runTests() {
  console.log(`${colors.cyan}${colors.bold}
=====================================
CR Express 301 Redirect Testing
=====================================${colors.reset}
`);
  console.log(`Testing URL: ${colors.blue}${TEST_BASE_URL}${colors.reset}\n`);

  const results = {
    critical: { passed: 0, failed: 0 },
    high: { passed: 0, failed: 0 },
    medium: { passed: 0, failed: 0 },
    low: { passed: 0, failed: 0 },
    total: { passed: 0, failed: 0 }
  };

  const failures = [];

  // Test each redirect
  for (const test of redirectTests) {
    const result = await testRedirect(test.from, test.to, test.priority);

    const priorityKey = test.priority.toLowerCase();
    if (result.success) {
      results[priorityKey].passed++;
      results.total.passed++;
    } else {
      results[priorityKey].failed++;
      results.total.failed++;
      failures.push(result);
    }

    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Print summary
  console.log(`\n${colors.cyan}${colors.bold}=== Test Summary ===${colors.reset}\n`);

  // Priority breakdown
  console.log(`${colors.bold}CRITICAL:${colors.reset} ${results.critical.passed} passed, ${results.critical.failed} failed`);
  console.log(`${colors.bold}HIGH:${colors.reset} ${results.high.passed} passed, ${results.high.failed} failed`);
  console.log(`${colors.bold}MEDIUM:${colors.reset} ${results.medium.passed} passed, ${results.medium.failed} failed`);
  console.log(`${colors.bold}LOW:${colors.reset} ${results.low.passed} passed, ${results.low.failed} failed`);

  console.log(`\n${colors.bold}TOTAL:${colors.reset} ${colors.green}${results.total.passed} passed${colors.reset}, ${colors.red}${results.total.failed} failed${colors.reset}`);

  // If there are failures, list them
  if (failures.length > 0) {
    console.log(`\n${colors.red}${colors.bold}Failed Redirects:${colors.reset}`);
    failures.forEach(f => {
      console.log(`  ${colors.bold}[${f.priority}]${colors.reset} ${f.from} - ${f.error || `Expected: ${f.expected}, Got: ${f.actual}`}`);
    });

    if (failures.some(f => f.priority === 'CRITICAL')) {
      console.log(`\n${colors.red}${colors.bold}⚠️  CRITICAL REDIRECTS FAILED - DO NOT DEPLOY!${colors.reset}`);
    }
  } else {
    console.log(`\n${colors.green}${colors.bold}✓ All redirects are working correctly!${colors.reset}`);
  }

  // Exit with appropriate code
  process.exit(failures.length > 0 ? 1 : 0);
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(TEST_BASE_URL);
    if (response.ok || response.status) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

// Main execution
async function main() {
  console.log(`${colors.yellow}Checking if server is running at ${TEST_BASE_URL}...${colors.reset}`);

  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.log(`${colors.red}${colors.bold}Error: Server is not running at ${TEST_BASE_URL}${colors.reset}`);
    console.log(`\nPlease start the development server first:`);
    console.log(`  ${colors.cyan}npm run dev${colors.reset}`);
    console.log(`\nThen run this test script in another terminal:`);
    console.log(`  ${colors.cyan}node test-redirects.js${colors.reset}`);
    console.log(`\nTo test a different URL, use:`);
    console.log(`  ${colors.cyan}TEST_URL=https://staging.crexpressinc.com node test-redirects.js${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.green}Server is running!${colors.reset}\n`);
  await runTests();
}

// Run the tests
main().catch(error => {
  console.error(`${colors.red}Unexpected error:${colors.reset}`, error);
  process.exit(1);
});