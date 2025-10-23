/**
 * Form Testing Script
 *
 * This script tests all 4 forms by sending sample data to andrew@goweblink.io
 * Run with: node test-forms.js
 *
 * Make sure your dev server is running: npm run dev
 */

const BASE_URL = 'http://localhost:3002'
const TEST_EMAIL = 'andrew@squarewaves.io' // Resend test account email

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Test data for each form
const testData = {
  jobApplication: {
    formData: {
      // Personal Information
      firstName: 'John',
      middleInitial: 'D',
      lastName: 'Doe',
      preferredName: 'Johnny',
      streetAddress: '123 Main Street',
      aptNumber: 'Apt 4B',
      city: 'Chicago',
      state: 'Illinois',
      zipCode: '60601',
      homePhone: '(312) 555-0123',
      alternatePhone: '(312) 555-0124',
      email: TEST_EMAIL,
      aboutYou: 'I am a highly motivated professional with 5+ years of experience in logistics and warehouse management. I am passionate about optimizing supply chain operations and delivering exceptional results.',

      // Work Preferences
      employmentStatus: 'Full-time',
      desiredPay: '$65,000 - $75,000',
      startDate: '2024-03-01',
      positionType: 'Warehouse Manager',
      schedulePreference: ['Days', 'No Preference'],

      // Other
      howDidYouHear: 'Company Website',
    },
    jobTitle: 'Warehouse Operations Manager',
    department: 'Operations',
  },

  driverApplication: {
    formData: {
      // Personal Information
      firstName: 'Mike',
      middleInitial: 'R',
      lastName: 'Smith',
      preferredName: 'Mike',
      streetAddress: '456 Oak Avenue',
      aptNumber: '',
      city: 'Elk Grove Village',
      state: 'Illinois',
      zipCode: '60007',
      homePhone: '(847) 555-0198',
      alternatePhone: '',
      email: TEST_EMAIL,
      aboutYou: 'Experienced CDL-A driver with clean driving record and 8 years of over-the-road experience. Specialized in refrigerated and hazmat loads.',

      // Driver Information
      licenseNumber: 'D123-4567-8901',
      cdlClass: 'A',
      endorsements: 'Hazmat',
      yearsExperience: '8',
      cleanDrivingRecord: '1',
      trafficViolations: '1',
      employmentStatus: '1',
      desiredSchedule: ['Weekdays', 'Nights'],
      desiredHaulType: ['Regional', 'Long Haul'],

      // References
      referenceName: 'Sarah Johnson',
      referenceCompany: 'ABC Logistics Inc.',
      referenceEmail: 'sarah.j@abclogistics.com',
      referencePhone: '(555) 123-4567',

      // Other
      howDidYouHear: 'Job Board',
    },
    jobTitle: 'CDL-A Driver',
    department: 'Transportation',
  },

  serviceQuote: {
    formData: {
      name: 'Jennifer Wilson',
      company: 'Wilson Manufacturing Co.',
      email: TEST_EMAIL,
      phone: '(224) 555-0156',
      service: 'warehousing',
    },
    serviceName: 'Bonded Warehouse Storage',
    serviceType: 'warehousing',
  },

  locationQuote: {
    formData: {
      name: 'David Chen',
      company: 'Chen Import Export LLC',
      email: TEST_EMAIL,
      phone: '(312) 555-0189',
      service: 'customs-brokerage',
      message: 'We need customs brokerage services for regular shipments from China. Looking for competitive rates and fast clearance times. Approximately 15-20 containers per month.',
    },
    cityName: 'Chicago',
  },
}

async function testForm(name, endpoint, data) {
  log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan')
  log(`Testing: ${name}`, 'cyan')
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan')

  try {
    log(`Sending request to ${endpoint}...`, 'yellow')

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      log(`✓ SUCCESS: ${result.message}`, 'green')
      log(`  Email ID: ${result.id || 'N/A'}`, 'green')
      return true
    } else {
      log(`✗ FAILED: ${result.error}`, 'red')
      return false
    }
  } catch (error) {
    log(`✗ ERROR: ${error.message}`, 'red')
    log(`  Make sure your dev server is running: npm run dev`, 'yellow')
    return false
  }
}

async function runAllTests() {
  log('\n' + '='.repeat(60), 'blue')
  log('CR EXPRESS FORM TESTING SUITE', 'blue')
  log('='.repeat(60), 'blue')
  log(`\nAll test emails will be sent to: ${TEST_EMAIL}`, 'yellow')
  log('Make sure to check your inbox!\n', 'yellow')

  const results = {
    passed: 0,
    failed: 0,
  }

  // Test Job Application Form
  const test1 = await testForm(
    'Job Application Form',
    '/api/submit-job-application',
    testData.jobApplication
  )
  if (test1) results.passed++
  else results.failed++

  // Wait 1 second between requests
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Test Driver Application Form
  const test2 = await testForm(
    'Driver Application Form',
    '/api/submit-driver-application',
    testData.driverApplication
  )
  if (test2) results.passed++
  else results.failed++

  await new Promise(resolve => setTimeout(resolve, 1000))

  // Test Service Quote Form
  const test3 = await testForm(
    'Service Quote Form',
    '/api/submit-service-quote',
    testData.serviceQuote
  )
  if (test3) results.passed++
  else results.failed++

  await new Promise(resolve => setTimeout(resolve, 1000))

  // Test Location Quote Form
  const test4 = await testForm(
    'Location Quote Form',
    '/api/submit-location-quote',
    testData.locationQuote
  )
  if (test4) results.passed++
  else results.failed++

  // Summary
  log('\n' + '='.repeat(60), 'blue')
  log('TEST SUMMARY', 'blue')
  log('='.repeat(60), 'blue')
  log(`✓ Passed: ${results.passed}/4`, 'green')
  if (results.failed > 0) {
    log(`✗ Failed: ${results.failed}/4`, 'red')
  }
  log('\n' + '='.repeat(60), 'blue')

  if (results.passed === 4) {
    log('\n🎉 All tests passed! Check your inbox at ' + TEST_EMAIL, 'green')
  } else {
    log('\n⚠️  Some tests failed. Check the errors above.', 'yellow')
  }
}

// Run the tests
runAllTests()
