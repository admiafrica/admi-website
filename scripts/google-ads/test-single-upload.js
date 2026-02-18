#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * Test single conversion upload to debug the API
 */

const { GoogleAdsApi } = require('google-ads-api')
const crypto = require('crypto')
require('dotenv').config()

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID

function sha256Hash(value) {
  if (!value) return null
  const normalized = String(value).toLowerCase().trim()
  if (!normalized) return null
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

async function testUpload() {
  console.log('🧪 Testing single conversion upload...\n')

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  })

  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
  })

  // Test with one conversion
  const testConversion = {
    conversion_action: `customers/${CUSTOMER_ID}/conversionActions/7471572933`,
    conversion_date_time: '2025-01-20 10:00:00+03:00',
    conversion_value: 300000,
    currency_code: 'KES',
    order_id: 'TEST-' + Date.now(),
    user_identifiers: [{ hashed_email: sha256Hash('test@example.com') }],
    consent: {
      ad_user_data: 'GRANTED',
      ad_personalization: 'GRANTED'
    }
  }

  console.log('📤 Conversion to upload:')
  console.log(JSON.stringify(testConversion, null, 2))

  try {
    console.log('\n⬆️  Calling uploadClickConversions...')
    const response = await customer.conversionUploads.uploadClickConversions({
      customer_id: CUSTOMER_ID,
      conversions: [testConversion],
      partial_failure: true
    })

    console.log('\n✅ Response received:')
    console.log(JSON.stringify(response, null, 2))

    // Check results
    if (response.results && response.results.length > 0) {
      console.log('\n📊 Results:')
      response.results.forEach((r, i) => {
        console.log(`  ${i + 1}. ${JSON.stringify(r)}`)
      })
    }

    if (response.partial_failure_error) {
      console.log('\n⚠️  Partial failure errors:')
      console.log(JSON.stringify(response.partial_failure_error, null, 2))
    }
  } catch (error) {
    console.log('\n❌ Error:', error.message)
    if (error.errors) {
      console.log('Details:', JSON.stringify(error.errors, null, 2))
    }
    if (error.stack) {
      console.log('\nStack:', error.stack)
    }
  }
}

testUpload()
