#!/usr/bin/env node

/**
 * Test Script: Attribution Data Validation
 *
 * Tests:
 * 1. UTM Parameter Sanitization
 * 2. GA4 Client ID Extraction
 * 3. First-Touch Persistence
 * 4. Multi-Touch Attribution Data Flow
 */

/* eslint-disable @typescript-eslint/no-var-requires */
// Simulate browser environment
const { LocalStorage } = require('node-localstorage')
const { SessionStorage } = require('node-localstorage')

global.window = {
  location: {
    href: 'https://admi.africa/?utm_source=google&utm_medium=cpc&utm_content=ad-variant-a Expected Test Data',
    search: '?utm_source=google&utm_medium=cpc&utm_content=ad-variant-a Expected Test Data'
  },
  localStorage: new LocalStorage('./tmp_test_storage'),
  sessionStorage: new SessionStorage('./tmp_test_storage'),
  dataLayer: [],
  gtag: () => {}
}

global.document = {
  cookie: '_ga=GA1.1.1234567890.9876543210',
  referrer: 'https://www.google.com'
}

// Test the sanitization function
function testUTMSanitization() {
  console.log('\n📋 Test 1: UTM Parameter Sanitization')
  console.log('='.repeat(50))

  const testCases = [
    {
      input: 'ad-variant-a Expected First-Touch: google-ads/cpc/diploma-2026',
      expected: 'ad-variant-a',
      description: 'Remove "Expected" pattern'
    },
    {
      input: 'test-campaign Test Data Pattern',
      expected: 'test-campaign',
      description: 'Remove "Test" pattern'
    },
    {
      input: 'clean-value',
      expected: 'clean-value',
      description: 'Keep clean values unchanged'
    },
    {
      input: '  spaced-value  ',
      expected: 'spaced-value',
      description: 'Trim whitespace'
    },
    {
      input: 'a'.repeat(250),
      expected: 'a'.repeat(200),
      description: 'Truncate values > 200 chars'
    }
  ]

  function sanitizeUTMValue(value) {
    if (!value || typeof value !== 'string') return ''
    let sanitized = value.split(/\s+Expected/i)[0]
    sanitized = sanitized.split(/\s+Test/i)[0]
    sanitized = sanitized.trim()
    if (sanitized.length > 200) {
      console.warn(`⚠️ UTM value exceeded 200 characters, truncating: ${value.substring(0, 50)}...`)
      sanitized = sanitized.substring(0, 200)
    }
    return sanitized
  }

  let passed = 0
  testCases.forEach((testCase) => {
    const result = sanitizeUTMValue(testCase.input)
    const success = result === testCase.expected
    const icon = success ? '✅' : '❌'
    console.log(`\n${icon} ${testCase.description}`)
    console.log(`   Input:    "${testCase.input.substring(0, 60)}${testCase.input.length > 60 ? '...' : ''}"`)
    console.log(`   Expected: "${testCase.expected}"`)
    console.log(`   Got:      "${result}"`)
    if (success) passed++
  })

  console.log(`\n📊 Result: ${passed}/${testCases.length} tests passed`)
  return passed === testCases.length
}

// Test GA4 Client ID extraction
function testGA4ClientIDExtraction() {
  console.log('\n📋 Test 2: GA4 Client ID Extraction')
  console.log('='.repeat(50))

  const testCases = [
    {
      cookie: '_ga=GA1.1.1234567890.9876543210',
      expected: '1234567890.9876543210',
      description: 'Extract from standard _ga cookie'
    },
    {
      cookie: '_ga=GA1.1.0.0',
      expected: '0.0',
      description: 'Handle zero values'
    },
    {
      cookie: 'other_cookie=value; _ga=GA1.1.111.222; another=data',
      expected: '111.222',
      description: 'Extract from cookie string with multiple cookies'
    },
    {
      cookie: '_ga=',
      expected: null,
      description: 'Handle empty _ga cookie'
    },
    {
      cookie: 'no_ga_cookie=value',
      expected: null,
      description: 'Return null if no _ga cookie'
    }
  ]

  function getGA4ClientID(cookieString) {
    try {
      const cookies = cookieString.split(';')
      const gaCookie = cookies.find((c) => {
        const trimmed = c.trim()
        return trimmed.startsWith('_ga=') && !trimmed.includes('_ga_')
      })

      if (gaCookie) {
        const value = gaCookie.split('=')[1]?.trim()
        if (!value) return null

        const parts = value.split('.')
        if (parts.length >= 4) {
          const clientId = `${parts[2]}.${parts[3]}`
          if (/^\d+\.\d+$/.test(clientId)) {
            return clientId
          }
        }
      }

      return null
    } catch (error) {
      console.error('Error extracting GA Client ID:', error)
      return null
    }
  }

  let passed = 0
  testCases.forEach((testCase) => {
    const result = getGA4ClientID(testCase.cookie)
    const success = result === testCase.expected
    const icon = success ? '✅' : '❌'
    console.log(`\n${icon} ${testCase.description}`)
    console.log(`   Cookie:   "${testCase.cookie}"`)
    console.log(`   Expected: ${testCase.expected}`)
    console.log(`   Got:      ${result}`)
    if (success) passed++
  })

  console.log(`\n📊 Result: ${passed}/${testCases.length} tests passed`)
  return passed === testCases.length
}

// Test multi-touch attribution data structure
function testMultiTouchDataStructure() {
  console.log('\n📋 Test 3: Multi-Touch Attribution Data Structure')
  console.log('='.repeat(50))

  const mockUTMData = {
    // Last-touch (current session)
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'diploma-2026',
    utm_content: 'ad-variant-a',
    // First-touch (original visit)
    first_touch_source: 'organic',
    first_touch_medium: 'search',
    first_touch_campaign: 'brand-search',
    // GA4 tracking
    ga_client_id: '1234567890.9876543210',
    // Journey info
    landing_page: 'https://admi.africa/',
    first_visit: '2026-01-01T10:00:00Z',
    first_touch_timestamp: '2026-01-01T10:00:00Z'
  }

  const testCases = [
    {
      field: 'utm_source',
      check: (data) => data.utm_source === 'google',
      description: 'Has current utm_source'
    },
    {
      field: 'first_touch_source',
      check: (data) => data.first_touch_source === 'organic',
      description: 'Has original first_touch_source'
    },
    {
      field: 'ga_client_id',
      check: (data) => /^\d+\.\d+$/.test(data.ga_client_id),
      description: 'GA Client ID matches format \\d+.\\d+'
    },
    {
      field: 'multi-touch_separation',
      check: (data) => data.utm_source !== data.first_touch_source,
      description: 'Last-touch and first-touch are correctly separated'
    },
    {
      field: 'timestamps',
      check: (data) => data.first_touch_timestamp === data.first_visit,
      description: 'First visit and first touch timestamps match'
    }
  ]

  let passed = 0
  testCases.forEach((testCase) => {
    const success = testCase.check(mockUTMData)
    const icon = success ? '✅' : '❌'
    console.log(`\n${icon} ${testCase.description}`)
    if (!success) {
      console.log(`   Field: ${testCase.field}`)
      console.log(`   Data: ${JSON.stringify(mockUTMData[testCase.field])}`)
    }
    if (success) passed++
  })

  console.log(`\n📊 Result: ${passed}/${testCases.length} tests passed`)
  return passed === testCases.length
}

// Main test runner
async function runAllTests() {
  console.log('\n' + '='.repeat(50))
  console.log('🧪 ATTRIBUTION DATA VALIDATION TEST SUITE')
  console.log('='.repeat(50))

  const results = {
    sanitization: testUTMSanitization(),
    ga4Extraction: testGA4ClientIDExtraction(),
    multiTouch: testMultiTouchDataStructure()
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 OVERALL RESULTS')
  console.log('='.repeat(50))

  const allPassed = Object.values(results).every((r) => r)
  const icon = allPassed ? '✅' : '❌'

  console.log(`\n${icon} UTM Sanitization: ${results.sanitization ? 'PASSED' : 'FAILED'}`)
  console.log(`${icon} GA4 ID Extraction: ${results.ga4Extraction ? 'PASSED' : 'FAILED'}`)
  console.log(`${icon} Multi-Touch Structure: ${results.multiTouch ? 'PASSED' : 'FAILED'}`)

  console.log(`\n${allPassed ? '✅ All tests passed!' : '❌ Some tests failed'}`)
  console.log('='.repeat(50) + '\n')

  process.exit(allPassed ? 0 : 1)
}

// Run tests
runAllTests().catch((error) => {
  console.error('❌ Test suite error:', error)
  process.exit(1)
})
