/* eslint-disable @typescript-eslint/no-var-requires */
const { GoogleAdsApi } = require('google-ads-api')
const { GoogleAuth } = require('google-auth-library')
const fs = require('fs')
require('dotenv').config()

/**
 * Service Account-based Google Ads Integration
 * Uses the same service account as GA4: ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com
 * Customer ID: 392-935-5931 (3929355931)
 */

class ServiceAccountGoogleAds {
  constructor() {
    this.customerId = '3929355931'
    this.client = null
    this.auth = null
  }

  async initializeServiceAccountAuth() {
    console.log('🔐 Initializing Google Ads API with Service Account...')
    console.log('Service Account: ga-analytics-service@admi-youtube-integration.iam.gserviceaccount.com')
    console.log('Customer ID: 392-935-5931')
    
    try {
      // Initialize Google Auth with service account
      this.auth = new GoogleAuth({
        keyFile: 'ga-service-account.json',
        scopes: [
          'https://www.googleapis.com/auth/adwords'
        ]
      })

      const authClient = await this.auth.getClient()
      const accessToken = await authClient.getAccessToken()
      
      if (!accessToken.token) {
        throw new Error('Failed to get access token from service account')
      }

      console.log('✅ Service account authentication successful')
      console.log('🔑 Access token obtained')

      // Check if we have a developer token
      if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
        console.log('\n❌ Missing GOOGLE_ADS_DEVELOPER_TOKEN in .env')
        console.log('\n💡 To get a developer token:')
        console.log('1. Go to Google Ads: https://ads.google.com')
        console.log('2. Navigate to Tools & Settings > Setup > API Center')
        console.log('3. Apply for a developer token')
        console.log('4. Add to .env: GOOGLE_ADS_DEVELOPER_TOKEN=your_token_here')
        console.log('\n⚠️  Without developer token, API access is limited')
        return false
      }

      // Try to initialize Google Ads client with service account
      this.client = new GoogleAdsApi({
        client_id: 'service-account', // Placeholder for service account
        client_secret: 'service-account', // Placeholder for service account
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        access_token: accessToken.token
      })

      console.log('✅ Google Ads API client initialized with service account')
      return true

    } catch (error) {
      console.error('❌ Service account authentication failed:', error.message)
      
      if (error.message.includes('ENOENT')) {
        console.log('\n💡 Service account file not found:')
        console.log('Expected: ga-service-account.json')
        console.log('This should be the same file used for GA4 analytics')
      }
      
      return false
    }
  }

  async testGoogleAdsAccess() {
    console.log('\n🧪 Testing Google Ads API access...')
    
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      // Try to get basic customer info
      const customerQuery = `
        SELECT 
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.status
        FROM customer
        WHERE customer.id = ${this.customerId}
      `

      console.log('🔍 Querying customer information...')
      const customerInfo = await customer.query(customerQuery)
      
      if (customerInfo && customerInfo.length > 0) {
        const info = customerInfo[0].customer
        console.log('✅ Successfully connected to Google Ads account!')
        console.log(`📊 Account: ${info.descriptive_name}`)
        console.log(`💰 Currency: ${info.currency_code}`)
        console.log(`🌍 Timezone: ${info.time_zone}`)
        console.log(`📈 Status: ${info.status}`)
        return true
      } else {
        console.log('❌ No customer data returned')
        return false
      }

    } catch (error) {
      console.error('❌ Google Ads API test failed:', error.message)
      
      if (error.message.includes('PERMISSION_DENIED')) {
        console.log('\n💡 Permission denied - possible causes:')
        console.log('1. Service account needs to be granted access to Google Ads account')
        console.log('2. Developer token not approved or invalid')
        console.log('3. Customer ID incorrect or inaccessible')
        console.log('4. Google Ads account may be suspended')
      }
      
      if (error.message.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
        console.log('\n💡 Developer token not approved:')
        console.log('1. Apply for developer token approval in Google Ads')
        console.log('2. This can take 1-2 business days')
        console.log('3. Use test account in the meantime')
      }

      return false
    }
  }

  async getCampaignStatus() {
    console.log('\n📊 Getting current campaign status...')
    
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      const campaignQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.start_date,
          campaign.end_date
        FROM campaign 
        WHERE campaign.status IN ('ENABLED', 'PAUSED', 'REMOVED')
        ORDER BY campaign.name
      `

      const campaigns = await customer.query(campaignQuery)
      
      const statusSummary = {
        enabled: [],
        paused: [],
        removed: [],
        total: campaigns.length
      }

      campaigns.forEach(campaign => {
        const campaignData = {
          id: campaign.campaign.id,
          name: campaign.campaign.name,
          status: campaign.campaign.status,
          channelType: campaign.campaign.advertising_channel_type,
          startDate: campaign.campaign.start_date,
          endDate: campaign.campaign.end_date
        }

        if (campaign.campaign.status === 'ENABLED') {
          statusSummary.enabled.push(campaignData)
        } else if (campaign.campaign.status === 'PAUSED') {
          statusSummary.paused.push(campaignData)
        } else if (campaign.campaign.status === 'REMOVED') {
          statusSummary.removed.push(campaignData)
        }
      })

      console.log(`✅ Found ${campaigns.length} campaigns:`)
      console.log(`   🟢 Enabled: ${statusSummary.enabled.length}`)
      console.log(`   ⏸️  Paused: ${statusSummary.paused.length}`)
      console.log(`   🗑️  Removed: ${statusSummary.removed.length}`)

      // Look for campaigns matching GA4 data
      const targetCampaigns = [
        'Creative Media and Tech',
        'Digital Content Creation',
        'Data Analysis',
        'sep2024',
        '1'
      ]

      console.log('\n🎯 Looking for campaigns matching GA4 data:')
      targetCampaigns.forEach(target => {
        const found = campaigns.find(c => 
          c.campaign.name.toLowerCase().includes(target.toLowerCase())
        )
        if (found) {
          console.log(`   ✅ Found: "${found.campaign.name}" (${found.campaign.status})`)
        } else {
          console.log(`   ❌ Not found: "${target}"`)
        }
      })

      return statusSummary

    } catch (error) {
      console.error('❌ Failed to get campaign status:', error.message)
      return null
    }
  }

  async getHistoricalPerformance() {
    console.log('\n📈 Getting historical campaign performance...')
    
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId
      })

      const performanceQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          segments.date
        FROM campaign 
        WHERE segments.date BETWEEN '2024-01-01' AND '2025-11-03'
        AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 100
      `

      const performance = await customer.query(performanceQuery)
      
      if (performance.length === 0) {
        console.log('❌ No historical performance data found')
        return null
      }

      // Process performance data
      const campaignSummary = {}
      let totalCost = 0
      let totalClicks = 0
      let totalImpressions = 0

      performance.forEach(record => {
        const campaignId = record.campaign.id
        const cost = parseInt(record.metrics.cost_micros || 0) / 1000000
        const clicks = parseInt(record.metrics.clicks || 0)
        const impressions = parseInt(record.metrics.impressions || 0)

        totalCost += cost
        totalClicks += clicks
        totalImpressions += impressions

        if (!campaignSummary[campaignId]) {
          campaignSummary[campaignId] = {
            name: record.campaign.name,
            totalCost: 0,
            totalClicks: 0,
            totalImpressions: 0
          }
        }

        campaignSummary[campaignId].totalCost += cost
        campaignSummary[campaignId].totalClicks += clicks
        campaignSummary[campaignId].totalImpressions += impressions
      })

      console.log(`✅ Historical performance summary:`)
      console.log(`   💰 Total cost: $${totalCost.toFixed(2)}`)
      console.log(`   👆 Total clicks: ${totalClicks.toLocaleString()}`)
      console.log(`   👁️  Total impressions: ${totalImpressions.toLocaleString()}`)

      // Show top campaigns
      const topCampaigns = Object.values(campaignSummary)
        .sort((a, b) => b.totalCost - a.totalCost)
        .slice(0, 5)

      console.log('\n🏆 Top 5 campaigns by spend:')
      topCampaigns.forEach((campaign, index) => {
        console.log(`   ${index + 1}. ${campaign.name}: $${campaign.totalCost.toFixed(2)}`)
      })

      return {
        totalCost,
        totalClicks,
        totalImpressions,
        campaignSummary,
        topCampaigns
      }

    } catch (error) {
      console.error('❌ Failed to get historical performance:', error.message)
      return null
    }
  }

  async runServiceAccountAnalysis() {
    console.log('🚀 ADMI Google Ads Analysis - Service Account Method')
    console.log('=' .repeat(60))
    
    // Initialize service account authentication
    const authSuccess = await this.initializeServiceAccountAuth()
    if (!authSuccess) {
      console.log('\n❌ Cannot proceed without proper authentication')
      console.log('\n📋 Alternative approaches:')
      console.log('1. Set up OAuth credentials (see google-ads-setup-guide.md)')
      console.log('2. Use Google Ads web interface directly')
      console.log('3. Export data manually from Google Ads')
      return null
    }

    // Test API access
    const accessSuccess = await this.testGoogleAdsAccess()
    if (!accessSuccess) {
      console.log('\n❌ Cannot access Google Ads data')
      console.log('Check permissions and developer token status')
      return null
    }

    // Get current campaign status
    const campaignStatus = await this.getCampaignStatus()
    
    // Get historical performance
    const historicalData = await getHistoricalPerformance()

    const results = {
      customerId: this.customerId,
      authMethod: 'service-account',
      campaignStatus,
      historicalData,
      generatedAt: new Date().toISOString()
    }

    // Save results
    fs.writeFileSync('admi-service-account-ads-analysis.json', JSON.stringify(results, null, 2))
    console.log('\n✅ Analysis saved to: admi-service-account-ads-analysis.json')

    return results
  }
}

// Run the service account analysis
if (require.main === module) {
  const analyzer = new ServiceAccountGoogleAds()
  analyzer.runServiceAccountAnalysis()
    .then((results) => {
      if (results) {
        console.log('\n🎉 Service account Google Ads analysis completed!')
        console.log('Check the JSON file for detailed results')
      } else {
        console.log('\n⚠️  Analysis completed with limited access')
        console.log('Consider using OAuth method or manual export')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = ServiceAccountGoogleAds
