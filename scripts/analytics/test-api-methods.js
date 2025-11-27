#!/usr/bin/env node

const { GoogleAdsApi } = require('google-ads-api')
require('dotenv').config()

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
})

const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
const customer = client.Customer({
  customer_id: customerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
})

async function testMethods() {
  console.log('Testing API methods...\n')
  console.log('Customer object keys:', Object.keys(customer))
  console.log('\nCustomer object methods:')
  
  for (const key of Object.keys(customer)) {
    console.log(`  ${key}: ${typeof customer[key]}`)
  }
}

testMethods().catch(err => console.error(err))
