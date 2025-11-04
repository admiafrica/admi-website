/* eslint-disable @typescript-eslint/no-var-requires */
const { GoogleAdsApi } = require('google-ads-api')
const fs = require('fs')
require('dotenv').config()

/**
 * OAuth-based Google Ads Analysis for ADMI
 * Customer ID: 392-935-5931 (3929355931)
 * Uses OAuth credentials to access Google Ads data
 */

class OAuthGoogleAdsAnalysis {
  constructor() {
    this.customerId = '3929355931'
    this.client = null
    this.customer = null
  }

  async initializeClient() {
    console.log('🚀 Initializing Google Ads API with OAuth credentials...')
    console.log('Customer ID: 392-935-5931')
    
    try {
      // Check if we have all required credentials
      const requiredEnvVars = [
        'GOOGLE_ADS_CLIENT_ID',
        'GOOGLE_ADS_CLIENT_SECRET', 
        'GOOGLE_ADS_DEVELOPER_TOKEN',
        'GOOGLE_ADS_REFRESH_TOKEN'
      ]

      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar] || process.env[envVar].includes('your_')) {
          console.log(`❌ Missing or invalid ${envVar}`)
          return false
        }
      }

      this.client = new GoogleAdsApi({
        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
      })

      this.customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      })

      console.log('✅ Google Ads API client initialized successfully')
      return true

    } catch (error) {
      console.error('❌ Failed to initialize Google Ads client:', error.message)
      return false
    }
  }

  async testConnection() {
    console.log('\n🧪 Testing Google Ads API connection...')
    
    try {
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
      const customerInfo = await this.customer.query(customerQuery)
      
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
      console.error('❌ Connection test failed:', error.message || error)

      if (error.message && error.message.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
        console.log('\n💡 Developer token not approved:')
        console.log('1. Check your email for approval notification')
        console.log('2. Developer tokens can take 1-2 business days to approve')
        console.log('3. Contact Google Ads support if needed')
      }

      if (error.message && error.message.includes('PERMISSION_DENIED')) {
        console.log('\n💡 Permission denied:')
        console.log('1. Make sure the Google account has access to this Ads account')
        console.log('2. Check if the account is active and not suspended')
        console.log('3. Verify the customer ID is correct')
      }

      if (error.message && error.message.includes('DEVELOPER_TOKEN_NOT_ON_ALLOWLIST')) {
        console.log('\n💡 Developer token not approved:')
        console.log('1. Your developer token needs approval from Google')
        console.log('2. This can take 1-2 business days')
        console.log('3. Check Google Ads > Tools > API Center for status')
      }

      return false
    }
  }

  async getCampaignStatus() {
    console.log('\n📊 Getting current campaign status...')
    
    try {
      const campaignQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.start_date,
          campaign.end_date,
          campaign.budget.amount_micros
        FROM campaign 
        WHERE campaign.status IN ('ENABLED', 'PAUSED', 'REMOVED')
        ORDER BY campaign.name
      `

      const campaigns = await this.customer.query(campaignQuery)
      
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
          endDate: campaign.campaign.end_date,
          dailyBudget: campaign.campaign.budget ? 
            (parseInt(campaign.campaign.budget.amount_micros) / 1000000).toFixed(2) : 'Unknown'
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

      // Show paused campaigns (likely candidates for reactivation)
      if (statusSummary.paused.length > 0) {
        console.log('\n⏸️  PAUSED CAMPAIGNS (Reactivation Candidates):')
        statusSummary.paused.forEach((campaign, index) => {
          console.log(`   ${index + 1}. ${campaign.name} (${campaign.channelType})`)
        })
      }

      return statusSummary

    } catch (error) {
      console.error('❌ Failed to get campaign status:', error.message)
      return null
    }
  }

  async getHistoricalPerformance() {
    console.log('\n📈 Getting historical campaign performance (2024-2025)...')
    
    try {
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
        LIMIT 1000
      `

      const performance = await this.customer.query(performanceQuery)
      
      if (performance.length === 0) {
        console.log('❌ No historical performance data found')
        return null
      }

      // Process performance data
      const campaignSummary = {}
      let totalCost = 0
      let totalClicks = 0
      let totalImpressions = 0
      let totalConversions = 0

      performance.forEach(record => {
        const campaignId = record.campaign.id
        const cost = parseInt(record.metrics.cost_micros || 0) / 1000000
        const clicks = parseInt(record.metrics.clicks || 0)
        const impressions = parseInt(record.metrics.impressions || 0)
        const conversions = parseFloat(record.metrics.conversions || 0)

        totalCost += cost
        totalClicks += clicks
        totalImpressions += impressions
        totalConversions += conversions

        if (!campaignSummary[campaignId]) {
          campaignSummary[campaignId] = {
            name: record.campaign.name,
            totalCost: 0,
            totalClicks: 0,
            totalImpressions: 0,
            totalConversions: 0
          }
        }

        campaignSummary[campaignId].totalCost += cost
        campaignSummary[campaignId].totalClicks += clicks
        campaignSummary[campaignId].totalImpressions += impressions
        campaignSummary[campaignId].totalConversions += conversions
      })

      console.log(`✅ Historical performance summary:`)
      console.log(`   💰 Total cost: $${totalCost.toFixed(2)}`)
      console.log(`   👆 Total clicks: ${totalClicks.toLocaleString()}`)
      console.log(`   👁️  Total impressions: ${totalImpressions.toLocaleString()}`)
      console.log(`   🎯 Total conversions: ${totalConversions.toFixed(1)}`)

      // Show top campaigns by spend
      const topCampaigns = Object.values(campaignSummary)
        .sort((a, b) => b.totalCost - a.totalCost)
        .slice(0, 10)

      console.log('\n🏆 Top 10 campaigns by spend (2024-2025):')
      topCampaigns.forEach((campaign, index) => {
        const cpc = campaign.totalClicks > 0 ? (campaign.totalCost / campaign.totalClicks).toFixed(2) : '0.00'
        console.log(`   ${index + 1}. ${campaign.name}`)
        console.log(`      💰 Spend: $${campaign.totalCost.toFixed(2)} | 👆 Clicks: ${campaign.totalClicks.toLocaleString()} | CPC: $${cpc}`)
      })

      return {
        totalCost,
        totalClicks,
        totalImpressions,
        totalConversions,
        campaignSummary,
        topCampaigns
      }

    } catch (error) {
      console.error('❌ Failed to get historical performance:', error.message)
      return null
    }
  }

  async runCompleteAnalysis() {
    console.log('🚀 ADMI Google Ads Complete Analysis')
    console.log('Customer ID: 392-935-5931')
    console.log('Goal: Find campaigns to reactivate for traffic recovery')
    console.log('=' .repeat(60))
    
    // Initialize client
    const clientReady = await this.initializeClient()
    if (!clientReady) {
      console.log('\n❌ Cannot proceed without proper credentials')
      return null
    }

    // Test connection
    const connectionWorks = await this.testConnection()
    if (!connectionWorks) {
      console.log('\n❌ Cannot access Google Ads data')
      return null
    }

    // Get current campaign status
    const campaignStatus = await this.getCampaignStatus()
    
    // Get historical performance
    const historicalData = await this.getHistoricalPerformance()

    const results = {
      customerId: this.customerId,
      authMethod: 'oauth',
      campaignStatus,
      historicalData,
      generatedAt: new Date().toISOString(),
      recoveryRecommendations: this.generateRecoveryRecommendations(campaignStatus, historicalData)
    }

    // Save results
    fs.writeFileSync('admi-oauth-ads-analysis.json', JSON.stringify(results, null, 2))
    console.log('\n✅ Complete analysis saved to: admi-oauth-ads-analysis.json')

    // Print recovery summary
    this.printRecoverySummary(results)

    return results
  }

  generateRecoveryRecommendations(campaignStatus, historicalData) {
    const recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    }

    if (campaignStatus && campaignStatus.paused.length > 0) {
      recommendations.immediate.push({
        action: 'REACTIVATE_PAUSED_CAMPAIGNS',
        campaigns: campaignStatus.paused.slice(0, 5),
        priority: 'CRITICAL',
        expectedImpact: 'Immediate traffic recovery within 24-48 hours'
      })
    }

    if (historicalData && historicalData.topCampaigns.length > 0) {
      recommendations.shortTerm.push({
        action: 'SCALE_TOP_PERFORMERS',
        campaigns: historicalData.topCampaigns.slice(0, 3),
        priority: 'HIGH',
        expectedImpact: 'Restore 60-80% of 2024 traffic levels'
      })
    }

    return recommendations
  }

  printRecoverySummary(results) {
    console.log('\n🎯 RECOVERY SUMMARY')
    console.log('=' .repeat(40))
    
    if (results.campaignStatus) {
      console.log(`📊 Campaign Status:`)
      console.log(`   🟢 Active: ${results.campaignStatus.enabled.length}`)
      console.log(`   ⏸️  Paused: ${results.campaignStatus.paused.length}`)
      console.log(`   🗑️  Removed: ${results.campaignStatus.removed.length}`)
    }

    if (results.historicalData) {
      console.log(`\n💰 Historical Performance (2024-2025):`)
      console.log(`   Total Spend: $${results.historicalData.totalCost.toFixed(2)}`)
      console.log(`   Total Clicks: ${results.historicalData.totalClicks.toLocaleString()}`)
      console.log(`   Avg CPC: $${(results.historicalData.totalCost / results.historicalData.totalClicks).toFixed(2)}`)
    }

    if (results.campaignStatus && results.campaignStatus.paused.length > 0) {
      console.log('\n🚨 IMMEDIATE ACTION REQUIRED:')
      console.log(`${results.campaignStatus.paused.length} campaigns are PAUSED and can be reactivated immediately!`)
      console.log('These are likely the campaigns that drove your 2024 traffic.')
    }

    console.log('\n🚀 Next Steps:')
    console.log('1. Review the JSON file for detailed campaign data')
    console.log('2. Reactivate paused campaigns with conservative budgets')
    console.log('3. Monitor performance and scale successful campaigns')
  }
}

// Run the complete analysis
if (require.main === module) {
  const analyzer = new OAuthGoogleAdsAnalysis()
  analyzer.runCompleteAnalysis()
    .then((results) => {
      if (results) {
        console.log('\n🎉 ADMI Google Ads analysis completed successfully!')
        console.log('You now have the data needed to recover your traffic.')
      } else {
        console.log('\n⚠️  Analysis completed with limited data')
        console.log('Check your credentials and try again')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = OAuthGoogleAdsAnalysis
