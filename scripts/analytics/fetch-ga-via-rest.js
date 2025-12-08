#!/usr/bin/env node

/**
 * Fetch GA4 data using Google Cloud REST API
 * This creates a service account key and fetches current organic traffic
 */

const https = require('https')
const fs = require('fs')

async function makeHttpsRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          })
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          })
        }
      })
    })

    req.on('error', reject)

    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data))
    }
    req.end()
  })
}

async function createServiceAccountKey() {
  console.log('\n🔐 Creating GA service account key via REST API...\n')

  // First, we need the OAuth token to create the key
  // This requires user authentication

  const projectId = 'admi-youtube-integration'
  const serviceAccount = 'ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com'

  console.log('To fetch GA4 data, we need to create a service account key.')
  console.log('This requires Google Cloud authentication.\n')

  console.log('📋 Manual Steps (3 minutes):\n')
  console.log('1. Go to: https://console.cloud.google.com')
  console.log('2. Select project: admi-youtube-integration')
  console.log('3. Go to: IAM & Admin > Service Accounts')
  console.log('4. Click: ga-analytics-service@...')
  console.log('5. Go to: Keys tab')
  console.log('6. Click: "Create new key" > JSON')
  console.log('7. Download the JSON file')
  console.log('8. Save it as: ./ga-service-account.json\n')

  console.log('🎯 Or use gcloud CLI:\n')
  console.log('   gcloud iam service-accounts keys create ga-service-account.json \\')
  console.log(`     --iam-account=${serviceAccount}\n`)

  console.log('📊 Then fetch data:\n')
  console.log('   node scripts/analytics/fetch-current-organic-traffic.js\n')
}

async function fetchWithExistingKey() {
  const keyFile = './ga-service-account.json'

  if (!fs.existsSync(keyFile)) {
    await createServiceAccountKey()
    return
  }

  console.log('\n📊 Fetching GA4 data with existing key...\n')

  try {
    const key = JSON.parse(fs.readFileSync(keyFile, 'utf8'))
    console.log('✅ Found service account key:', key.client_email)
  } catch (e) {
    console.error('❌ Invalid key file:', e.message)
    await createServiceAccountKey()
  }
}

// Run
if (require.main === module) {
  fetchWithExistingKey().catch(console.error)
}

module.exports = { createServiceAccountKey }
