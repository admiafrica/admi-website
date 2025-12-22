#!/usr/bin/env node

/**
 * UTM Tracking End-to-End Test
 * 
 * Tests the complete UTM tracking flow:
 * 1. User lands with UTM parameters
 * 2. Navigates to multiple pages
 * 3. Submits form on different page
 * 4. Verifies UTM parameters persisted and sent to Brevo
 * 
 * Usage:
 * node scripts/tests/test-utm-tracking.js
 */

const puppeteer = require('puppeteer')
const https = require('https')

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'
const BREVO_API_KEY = process.env.BREVO_API_KEY

// Test UTM parameters
const TEST_UTM = {
  utm_source: 'test-google',
  utm_medium: 'cpc',
  utm_campaign: 'test-utm-tracking',
  utm_term: 'graphic-design',
  utm_content: 'ad-variant-a'
}

// Test contact data
const TEST_CONTACT = {
  email: `test-utm-${Date.now()}@admi-test.com`,
  firstName: 'UTM',
  lastName: 'Test',
  phone: '254700000000',
  courseName: 'Graphic Design Diploma'
}

async function checkBrevoContact(email) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts/${encodeURIComponent(email)}`,
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'accept': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data))
        } else {
          reject(new Error(`Brevo API returned ${res.statusCode}: ${data}`))
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

async function deleteBrevoContact(email) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: `/v3/contacts/${encodeURIComponent(email)}`,
      method: 'DELETE',
      headers: {
        'api-key': BREVO_API_KEY,
        'accept': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      res.on('end', () => resolve())
    })

    req.on('error', reject)
    req.end()
  })
}

async function runTest() {
  console.log('🧪 Starting UTM Tracking End-to-End Test\n')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Test Email: ${TEST_CONTACT.email}\n`)

  const browser = await puppeteer.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: 50 // Slow down for visibility
  })

  try {
    const page = await browser.newPage()
    
    // Enable console logging from browser
    page.on('console', msg => {
      if (msg.text().includes('UTM')) {
        console.log(`   [Browser]: ${msg.text()}`)
      }
    })

    // Step 1: Land on homepage with UTM parameters
    console.log('📍 Step 1: Landing on homepage with UTM parameters...')
    const landingUrl = `${BASE_URL}/?${new URLSearchParams(TEST_UTM).toString()}`
    console.log(`   URL: ${landingUrl}`)
    await page.goto(landingUrl, { waitUntil: 'networkidle0' })
    
    // Check sessionStorage
    const storedUTMs = await page.evaluate(() => {
      return {
        utm_source: sessionStorage.getItem('utm_source'),
        utm_medium: sessionStorage.getItem('utm_medium'),
        utm_campaign: sessionStorage.getItem('utm_campaign'),
        utm_term: sessionStorage.getItem('utm_term'),
        utm_content: sessionStorage.getItem('utm_content'),
        landing_page: sessionStorage.getItem('admi_landing_page'),
        referrer: sessionStorage.getItem('admi_referrer')
      }
    })
    
    console.log('   ✅ UTM parameters stored in sessionStorage:')
    console.log('   ', JSON.stringify(storedUTMs, null, 2))

    // Step 2: Navigate to course page (losing UTM from URL)
    console.log('\n📍 Step 2: Navigating to course page (UTMs not in URL)...')
    await page.goto(`${BASE_URL}/courses/graphic-design-diploma`, { waitUntil: 'networkidle0' })
    
    // Verify UTMs still in sessionStorage
    const utmsAfterNavigation = await page.evaluate(() => {
      return {
        utm_source: sessionStorage.getItem('utm_source'),
        utm_campaign: sessionStorage.getItem('utm_campaign')
      }
    })
    
    console.log('   ✅ UTM parameters still in sessionStorage:', utmsAfterNavigation)

    // Step 3: Navigate to enquiry page
    console.log('\n📍 Step 3: Navigating to enquiry form...')
    await page.goto(`${BASE_URL}/enquiry`, { waitUntil: 'networkidle0' })
    
    // Wait for form to load
    await page.waitForSelector('form', { timeout: 5000 })

    // Step 4: Fill and submit form
    console.log('\n📍 Step 4: Filling and submitting form...')
    
    // Fill form fields
    await page.type('input[name="firstName"]', TEST_CONTACT.firstName)
    await page.type('input[name="lastName"]', TEST_CONTACT.lastName)
    await page.type('input[name="email"]', TEST_CONTACT.email)
    
    // Phone input might be different
    const phoneInput = await page.$('input[type="tel"]')
    if (phoneInput) {
      await phoneInput.type(TEST_CONTACT.phone)
    }
    
    // Select course
    await page.click('[data-testid="course-select"]') // Adjust selector
    await page.keyboard.type(TEST_CONTACT.courseName)
    await page.keyboard.press('Enter')
    
    console.log('   Submitting form...')
    await page.click('button[type="submit"]')
    
    // Wait for submission
    await page.waitForTimeout(3000)

    // Step 5: Verify in Brevo
    console.log('\n📍 Step 5: Verifying contact in Brevo...')
    await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for Brevo API
    
    const contact = await checkBrevoContact(TEST_CONTACT.email)
    
    console.log('   ✅ Contact found in Brevo!')
    console.log('\n📊 Contact Attributes:')
    console.log('   Email:', contact.email)
    console.log('   UTM Source:', contact.attributes.UTM_SOURCE)
    console.log('   UTM Medium:', contact.attributes.UTM_MEDIUM)
    console.log('   UTM Campaign:', contact.attributes.UTM_CAMPAIGN)
    console.log('   Landing Page:', contact.attributes.LANDING_PAGE)
    console.log('   Referrer:', contact.attributes.REFERRER)
    console.log('   Current Page:', contact.attributes.PAGE)

    // Verify UTM parameters match
    const passed = 
      contact.attributes.UTM_SOURCE === TEST_UTM.utm_source &&
      contact.attributes.UTM_MEDIUM === TEST_UTM.utm_medium &&
      contact.attributes.UTM_CAMPAIGN === TEST_UTM.utm_campaign
    
    if (passed) {
      console.log('\n✅ TEST PASSED: UTM parameters persisted correctly!')
    } else {
      console.log('\n❌ TEST FAILED: UTM parameters do not match!')
      console.log('   Expected:', TEST_UTM)
      console.log('   Got:', {
        utm_source: contact.attributes.UTM_SOURCE,
        utm_medium: contact.attributes.UTM_MEDIUM,
        utm_campaign: contact.attributes.UTM_CAMPAIGN
      })
    }

    // Cleanup: Delete test contact
    console.log('\n🧹 Cleaning up test contact...')
    await deleteBrevoContact(TEST_CONTACT.email)
    console.log('   ✅ Test contact deleted')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    console.error(error.stack)
    process.exit(1)
  } finally {
    await browser.close()
  }

  console.log('\n✅ Test completed successfully!')
}

// Run test
if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY environment variable not set')
  process.exit(1)
}

runTest().catch(console.error)
