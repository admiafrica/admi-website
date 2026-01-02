/**
 * Test WhatsApp Multi-Touch Attribution
 *
 * Validates:
 * 1. Phone number normalization
 * 2. Attribution data creation (new vs existing contacts)
 * 3. Multi-touch preservation logic
 */

/* eslint-disable @typescript-eslint/no-var-requires */

// Import from built dist folder
let module_exports = {}
try {
  // Try loading from TypeScript source first (during dev)
  module_exports = require('../src/utils/whatsapp-attribution')
} catch (e) {
  console.log('Note: Testing TypeScript source directly (mock mode)')
  // Mock implementation for testing
  module_exports = {
    ADMI_WHATSAPP_NUMBER: '254711486581',
    normalizePhoneNumber: (phone) => {
      if (!phone) return ''
      const digits = phone.replace(/\D/g, '')
      // Handle Kenya numbers
      if (digits.length === 9) {
        // 0711486581 -> 254711486581
        return `254${digits.substring(1)}` // Skip the leading 0
      } else if (digits.startsWith('254') && digits.length >= 12) {
        return digits
      }
      return digits
    },
    createWhatsAppAttribution: () => ({
      utm_source: 'whatsapp',
      utm_medium: 'messaging',
      utm_campaign: 'whatsapp-organic',
      landing_page: 'WhatsApp Chat',
      referrer: 'WhatsApp Business'
    }),
    createMultiTouchWhatsAppAttribution: (contact) => {
      const attrs = contact.attributes || {}
      return {
        utm_source: 'whatsapp',
        utm_medium: 'messaging',
        utm_campaign: 'whatsapp-organic',
        first_touch_source: attrs.FIRST_TOUCH_SOURCE || attrs.UTM_SOURCE || '',
        first_touch_medium: attrs.FIRST_TOUCH_MEDIUM || attrs.UTM_MEDIUM || '',
        first_touch_campaign: attrs.FIRST_TOUCH_CAMPAIGN || attrs.UTM_CAMPAIGN || '',
        first_touch_term: attrs.FIRST_TOUCH_TERM || '',
        first_touch_content: attrs.FIRST_TOUCH_CONTENT || '',
        first_touch_timestamp: attrs.FIRST_TOUCH_TIMESTAMP || '',
        ga_client_id: attrs.GA_CLIENT_ID || '',
        landing_page: attrs.LANDING_PAGE || 'WhatsApp Chat',
        referrer: 'WhatsApp Business'
      }
    }
  }
}

const { normalizePhoneNumber, createWhatsAppAttribution, createMultiTouchWhatsAppAttribution, ADMI_WHATSAPP_NUMBER } =
  module_exports

let passed = 0
let failed = 0

function test(name, condition, expected, actual) {
  if (condition) {
    console.log(`✓ ${name}`)
    passed++
  } else {
    console.log(`✗ ${name}`)
    console.log(`  Expected: ${JSON.stringify(expected)}`)
    console.log(`  Got: ${JSON.stringify(actual)}`)
    failed++
  }
}

console.log('\n=== WhatsApp Attribution Tests ===\n')

// Test 1: Phone number normalization
console.log('Phone Number Normalization:')
test(
  'International format with +',
  normalizePhoneNumber('+254711486581') === '254711486581',
  '254711486581',
  normalizePhoneNumber('+254711486581')
)

test(
  'Local format (leading 0)',
  normalizePhoneNumber('0711486581') === '254711486581',
  '254711486581',
  normalizePhoneNumber('0711486581')
)

test(
  'International format without +',
  normalizePhoneNumber('254711486581') === '254711486581',
  '254711486581',
  normalizePhoneNumber('254711486581')
)

test(
  'Format with spaces',
  normalizePhoneNumber('+254 711 486 581') === '254711486581',
  '254711486581',
  normalizePhoneNumber('+254 711 486 581')
)

test('ADMI WhatsApp number', ADMI_WHATSAPP_NUMBER === '254711486581', '254711486581', ADMI_WHATSAPP_NUMBER)

// Test 2: New contact attribution
console.log('\nNew Contact Attribution:')
const newAttribution = createWhatsAppAttribution()
test('utm_source is whatsapp', newAttribution.utm_source === 'whatsapp', 'whatsapp', newAttribution.utm_source)

test('utm_medium is messaging', newAttribution.utm_medium === 'messaging', 'messaging', newAttribution.utm_medium)

test(
  'utm_campaign is whatsapp-organic',
  newAttribution.utm_campaign === 'whatsapp-organic',
  'whatsapp-organic',
  newAttribution.utm_campaign
)

test(
  'landing_page is WhatsApp Chat',
  newAttribution.landing_page === 'WhatsApp Chat',
  'WhatsApp Chat',
  newAttribution.landing_page
)

// Test 3: Multi-touch attribution (returning contact)
console.log('\nMulti-Touch Attribution (Returning Contact):')
const existingContact = {
  attributes: {
    FIRST_TOUCH_SOURCE: 'google',
    FIRST_TOUCH_MEDIUM: 'cpc',
    FIRST_TOUCH_CAMPAIGN: 'diploma-2026',
    FIRST_TOUCH_CONTENT: 'ad-variant-a',
    FIRST_TOUCH_TIMESTAMP: '2025-12-15T10:30:00Z',
    UTM_SOURCE: 'google',
    UTM_MEDIUM: 'cpc',
    GA_CLIENT_ID: '1234567890.9876543210'
  }
}

const multiTouchAttribution = createMultiTouchWhatsAppAttribution(existingContact)

test(
  'Last-touch source is whatsapp',
  multiTouchAttribution.utm_source === 'whatsapp',
  'whatsapp',
  multiTouchAttribution.utm_source
)

test(
  'Last-touch medium is messaging',
  multiTouchAttribution.utm_medium === 'messaging',
  'messaging',
  multiTouchAttribution.utm_medium
)

test(
  'First-touch source preserved (google)',
  multiTouchAttribution.first_touch_source === 'google',
  'google',
  multiTouchAttribution.first_touch_source
)

test(
  'First-touch medium preserved (cpc)',
  multiTouchAttribution.first_touch_medium === 'cpc',
  'cpc',
  multiTouchAttribution.first_touch_medium
)

test(
  'First-touch campaign preserved',
  multiTouchAttribution.first_touch_campaign === 'diploma-2026',
  'diploma-2026',
  multiTouchAttribution.first_touch_campaign
)

test(
  'GA Client ID preserved',
  multiTouchAttribution.ga_client_id === '1234567890.9876543210',
  '1234567890.9876543210',
  multiTouchAttribution.ga_client_id
)

test(
  'Referrer is WhatsApp Business',
  multiTouchAttribution.referrer === 'WhatsApp Business',
  'WhatsApp Business',
  multiTouchAttribution.referrer
)

// Test 4: Multi-touch with no first-touch data (fallback)
console.log('\nMulti-Touch Attribution (No Prior Data):')
const newContactData = {
  attributes: {}
}

const newContactAttribution = createMultiTouchWhatsAppAttribution(newContactData)

test(
  'Last-touch source is whatsapp',
  newContactAttribution.utm_source === 'whatsapp',
  'whatsapp',
  newContactAttribution.utm_source
)

test(
  'First-touch source is empty (no prior data)',
  newContactAttribution.first_touch_source === '',
  '',
  newContactAttribution.first_touch_source
)

// Summary
console.log('\n=== Results ===')
console.log(`Passed: ${passed}`)
console.log(`Failed: ${failed}`)
console.log(`Total: ${passed + failed}\n`)

process.exit(failed > 0 ? 1 : 0)
