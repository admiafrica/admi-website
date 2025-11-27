#!/usr/bin/env node

/**
 * Bulk Performance Max Campaign Reviewer
 * Reviews all active PMax campaigns and generates summary report
 */

const { GoogleAdsApi } = require('google-ads-api')
const fs = require('fs')
const path = require('path')
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

async function findPerformanceMaxCampaigns() {
  console.log('🔍 Finding all Performance Max campaigns...\n')

  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type
    FROM campaign
    WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
      AND campaign.status IN ('ENABLED', 'PAUSED')
    ORDER BY campaign.name
  `

  const campaigns = await customer.query(query)
  return campaigns.map(c => ({
    id: c.campaign.id,
    name: c.campaign.name,
    status: c.campaign.status
  }))
}

async function main() {
  const campaigns = await findPerformanceMaxCampaigns()
  
  if (campaigns.length === 0) {
    console.log('❌ No Performance Max campaigns found')
    return
  }

  console.log(`Found ${campaigns.length} Performance Max campaign(s):\n`)
  campaigns.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name} (ID: ${c.id}) - ${c.status === 2 ? 'ENABLED' : 'PAUSED'}`)
  })

  console.log('\n📊 Run detailed review with:')
  console.log(`npm run ads:review-pmax ${campaigns.map(c => c.id).join(' ')}\n`)

  // Save campaign list
  const reportsDir = path.join(__dirname, '../../reports/google-ads')
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  const filepath = path.join(reportsDir, 'pmax-campaigns.json')
  fs.writeFileSync(filepath, JSON.stringify({ campaigns, timestamp: new Date().toISOString() }, null, 2))
  console.log(`💾 Campaign list saved: ${filepath}`)
}

main().catch(e => {
  console.error('❌ Error:', e.message)
  process.exit(1)
})
