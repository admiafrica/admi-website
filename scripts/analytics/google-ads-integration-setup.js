/* eslint-disable @typescript-eslint/no-var-requires */
const { GoogleAdsApi } = require('google-ads-api')
const fs = require('fs')
require('dotenv').config()

/**
 * Google Ads Integration for ADMI Analytics
 * This script helps access Google Ads historical data to understand:
 * - 2024 high-volume paid strategy performance
 * - Current 2025 minimal paid advertising status
 * - Campaign performance and cost analysis
 * - Recovery strategy for paid advertising
 */

class GoogleAdsAnalyzer {
  constructor() {
    this.client = null
    this.customerId = null // Will be discovered
  }

  async initializeClient() {
    console.log('🚀 Initializing Google Ads API client...')
    
    try {
      // Check for required credentials
      const requiredEnvVars = [
        'GOOGLE_ADS_CLIENT_ID',
        'GOOGLE_ADS_CLIENT_SECRET', 
        'GOOGLE_ADS_REFRESH_TOKEN',
        'GOOGLE_ADS_DEVELOPER_TOKEN'
      ]
      
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
      
      if (missingVars.length > 0) {
        console.log('❌ Missing Google Ads API credentials:')
        missingVars.forEach(varName => {
          console.log(`   - ${varName}`)
        })
        console.log('\n💡 Setup Instructions:')
        console.log('1. Go to Google Ads API Console: https://console.developers.google.com/')
        console.log('2. Create OAuth 2.0 credentials')
        console.log('3. Get developer token from Google Ads account')
        console.log('4. Add credentials to .env file')
        console.log('\n📋 Required .env variables:')
        console.log('GOOGLE_ADS_CLIENT_ID=your_client_id')
        console.log('GOOGLE_ADS_CLIENT_SECRET=your_client_secret')
        console.log('GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token')
        console.log('GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token')
        console.log('GOOGLE_ADS_CUSTOMER_ID=your_customer_id (optional - will be discovered)')
        return false
      }

      // Initialize Google Ads client
      this.client = new GoogleAdsApi({
        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
      })

      console.log('✅ Google Ads API client initialized')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Google Ads client:', error.message)
      return false
    }
  }

  async discoverCustomerAccounts() {
    console.log('🔍 Discovering Google Ads customer accounts...')
    
    try {
      const customer = this.client.Customer({
        customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID || 'customers',
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      })

      // Get accessible customers
      const customers = await customer.listAccessibleCustomers()
      
      console.log(`✅ Found ${customers.length} accessible customer accounts:`)
      
      const admiAccounts = []
      
      for (const customerResource of customers) {
        try {
          const customerData = await customer.query(`
            SELECT 
              customer.id,
              customer.descriptive_name,
              customer.currency_code,
              customer.time_zone,
              customer.status
            FROM customer
            WHERE customer.id = ${customerResource.id}
          `)
          
          const account = customerData[0]?.customer
          if (account) {
            console.log(`   • ${account.descriptive_name} (ID: ${account.id})`)
            console.log(`     Currency: ${account.currency_code}, Status: ${account.status}`)
            
            // Check if this looks like ADMI account
            const isADMI = account.descriptive_name?.toLowerCase().includes('admi') ||
                          account.descriptive_name?.toLowerCase().includes('africa digital media')
            
            if (isADMI) {
              console.log(`     🎯 POTENTIAL ADMI ACCOUNT FOUND!`)
              admiAccounts.push({
                id: account.id,
                name: account.descriptive_name,
                currency: account.currency_code,
                timezone: account.time_zone,
                status: account.status
              })
            }
          }
        } catch (accountError) {
          console.log(`   ⚠️  Could not fetch details for account ${customerResource.id}`)
        }
      }
      
      return admiAccounts
    } catch (error) {
      console.error('❌ Error discovering customer accounts:', error.message)
      return []
    }
  }

  async analyzeHistoricalCampaigns(customerId, startDate = '2024-01-01', endDate = '2025-11-03') {
    console.log(`📊 Analyzing historical campaigns for customer: ${customerId}`)
    console.log(`   Date range: ${startDate} to ${endDate}`)
    
    try {
      const customer = this.client.Customer({
        customer_id: customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      })

      // Get campaign performance data
      const campaignQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.start_date,
          campaign.end_date,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc,
          segments.date
        FROM campaign 
        WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
      `

      const campaigns = await customer.query(campaignQuery)
      
      if (campaigns.length === 0) {
        console.log('❌ No campaign data found for the specified period')
        return null
      }

      console.log(`✅ Found ${campaigns.length} campaign records`)
      
      // Process campaign data
      const campaignSummary = this.processCampaignData(campaigns)
      
      // Get keyword performance
      const keywordData = await this.getKeywordPerformance(customer, startDate, endDate)
      
      // Get ad group performance
      const adGroupData = await this.getAdGroupPerformance(customer, startDate, endDate)
      
      return {
        customerId,
        dateRange: { startDate, endDate },
        campaignSummary,
        keywordData,
        adGroupData,
        rawCampaigns: campaigns
      }
    } catch (error) {
      console.error('❌ Error analyzing campaigns:', error.message)
      return null
    }
  }

  processCampaignData(campaigns) {
    const summary = {
      totalCampaigns: new Set(campaigns.map(c => c.campaign.id)).size,
      totalImpressions: 0,
      totalClicks: 0,
      totalCost: 0,
      totalConversions: 0,
      averageCTR: 0,
      averageCPC: 0,
      campaignTypes: {},
      monthlyBreakdown: {},
      topCampaigns: []
    }

    // Aggregate data
    campaigns.forEach(record => {
      summary.totalImpressions += parseInt(record.metrics.impressions || 0)
      summary.totalClicks += parseInt(record.metrics.clicks || 0)
      summary.totalCost += parseInt(record.metrics.cost_micros || 0) / 1000000 // Convert from micros
      summary.totalConversions += parseFloat(record.metrics.conversions || 0)
      
      // Track campaign types
      const channelType = record.campaign.advertising_channel_type
      if (!summary.campaignTypes[channelType]) {
        summary.campaignTypes[channelType] = {
          campaigns: 0,
          cost: 0,
          clicks: 0,
          impressions: 0
        }
      }
      summary.campaignTypes[channelType].campaigns++
      summary.campaignTypes[channelType].cost += parseInt(record.metrics.cost_micros || 0) / 1000000
      summary.campaignTypes[channelType].clicks += parseInt(record.metrics.clicks || 0)
      summary.campaignTypes[channelType].impressions += parseInt(record.metrics.impressions || 0)
      
      // Monthly breakdown
      const month = record.segments.date.substring(0, 7) // YYYY-MM
      if (!summary.monthlyBreakdown[month]) {
        summary.monthlyBreakdown[month] = {
          cost: 0,
          clicks: 0,
          impressions: 0,
          conversions: 0
        }
      }
      summary.monthlyBreakdown[month].cost += parseInt(record.metrics.cost_micros || 0) / 1000000
      summary.monthlyBreakdown[month].clicks += parseInt(record.metrics.clicks || 0)
      summary.monthlyBreakdown[month].impressions += parseInt(record.metrics.impressions || 0)
      summary.monthlyBreakdown[month].conversions += parseFloat(record.metrics.conversions || 0)
    })

    // Calculate averages
    if (summary.totalImpressions > 0) {
      summary.averageCTR = (summary.totalClicks / summary.totalImpressions) * 100
    }
    if (summary.totalClicks > 0) {
      summary.averageCPC = summary.totalCost / summary.totalClicks
    }

    // Get top campaigns by cost
    const campaignCosts = {}
    campaigns.forEach(record => {
      const campaignId = record.campaign.id
      if (!campaignCosts[campaignId]) {
        campaignCosts[campaignId] = {
          id: campaignId,
          name: record.campaign.name,
          cost: 0,
          clicks: 0,
          impressions: 0,
          conversions: 0
        }
      }
      campaignCosts[campaignId].cost += parseInt(record.metrics.cost_micros || 0) / 1000000
      campaignCosts[campaignId].clicks += parseInt(record.metrics.clicks || 0)
      campaignCosts[campaignId].impressions += parseInt(record.metrics.impressions || 0)
      campaignCosts[campaignId].conversions += parseFloat(record.metrics.conversions || 0)
    })

    summary.topCampaigns = Object.values(campaignCosts)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 10)

    return summary
  }

  async getKeywordPerformance(customer, startDate, endDate) {
    try {
      const keywordQuery = `
        SELECT 
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          campaign.name,
          ad_group.name
        FROM keyword_view 
        WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND ad_group_criterion.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 100
      `

      const keywords = await customer.query(keywordQuery)
      
      return keywords.map(kw => ({
        keyword: kw.ad_group_criterion?.keyword?.text || 'Unknown',
        matchType: kw.ad_group_criterion?.keyword?.match_type || 'Unknown',
        campaign: kw.campaign?.name || 'Unknown',
        adGroup: kw.ad_group?.name || 'Unknown',
        impressions: parseInt(kw.metrics?.impressions || 0),
        clicks: parseInt(kw.metrics?.clicks || 0),
        cost: parseInt(kw.metrics?.cost_micros || 0) / 1000000,
        conversions: parseFloat(kw.metrics?.conversions || 0)
      }))
    } catch (error) {
      console.log('⚠️  Could not fetch keyword data:', error.message)
      return []
    }
  }

  async getAdGroupPerformance(customer, startDate, endDate) {
    try {
      const adGroupQuery = `
        SELECT 
          ad_group.id,
          ad_group.name,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions
        FROM ad_group 
        WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND ad_group.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 50
      `

      const adGroups = await customer.query(adGroupQuery)
      
      return adGroups.map(ag => ({
        id: ag.ad_group?.id || 'Unknown',
        name: ag.ad_group?.name || 'Unknown',
        campaign: ag.campaign?.name || 'Unknown',
        impressions: parseInt(ag.metrics?.impressions || 0),
        clicks: parseInt(ag.metrics?.clicks || 0),
        cost: parseInt(ag.metrics?.cost_micros || 0) / 1000000,
        conversions: parseFloat(ag.metrics?.conversions || 0)
      }))
    } catch (error) {
      console.log('⚠️  Could not fetch ad group data:', error.message)
      return []
    }
  }

  async runGoogleAdsAnalysis() {
    console.log('🚀 Starting Google Ads Historical Analysis...')
    console.log('This will help understand ADMI\'s paid advertising performance 2024-2025\n')
    
    // Initialize client
    const clientReady = await this.initializeClient()
    if (!clientReady) {
      return null
    }

    // Discover customer accounts
    const admiAccounts = await this.discoverCustomerAccounts()
    
    if (admiAccounts.length === 0) {
      console.log('\n❌ No ADMI Google Ads accounts found')
      console.log('\n💡 This could mean:')
      console.log('1. ADMI uses a different Google account for advertising')
      console.log('2. Account access permissions need to be granted')
      console.log('3. Customer ID needs to be specified manually')
      console.log('4. ADMI may not be using Google Ads currently')
      return null
    }

    console.log(`\n🎯 Found ${admiAccounts.length} ADMI Google Ads account(s)`)
    
    // Analyze each ADMI account
    const allResults = []
    
    for (const account of admiAccounts) {
      console.log(`\n📊 Analyzing account: ${account.name} (${account.id})`)
      
      const analysisResult = await this.analyzeHistoricalCampaigns(account.id)
      
      if (analysisResult) {
        allResults.push({
          account,
          analysis: analysisResult
        })
      }
    }

    // Save results
    const finalResults = {
      generatedAt: new Date().toISOString(),
      admiAccounts,
      analysisResults: allResults,
      summary: this.generateOverallSummary(allResults)
    }

    fs.writeFileSync('admi-google-ads-analysis.json', JSON.stringify(finalResults, null, 2))
    console.log('\n✅ Google Ads analysis saved to: admi-google-ads-analysis.json')
    
    return finalResults
  }

  generateOverallSummary(results) {
    if (results.length === 0) {
      return { error: 'No analysis results available' }
    }

    let totalCost = 0
    let totalClicks = 0
    let totalImpressions = 0
    let totalConversions = 0

    results.forEach(result => {
      const summary = result.analysis.campaignSummary
      totalCost += summary.totalCost
      totalClicks += summary.totalClicks
      totalImpressions += summary.totalImpressions
      totalConversions += summary.totalConversions
    })

    return {
      totalAccounts: results.length,
      totalCost: Math.round(totalCost),
      totalClicks,
      totalImpressions,
      totalConversions,
      averageCPC: totalClicks > 0 ? (totalCost / totalClicks).toFixed(2) : 0,
      averageCTR: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0,
      costPerConversion: totalConversions > 0 ? (totalCost / totalConversions).toFixed(2) : 0
    }
  }
}

// Run the Google Ads analysis
if (require.main === module) {
  const analyzer = new GoogleAdsAnalyzer()
  analyzer.runGoogleAdsAnalysis()
    .then((results) => {
      if (results) {
        console.log('\n🎉 Google Ads analysis completed!')
        console.log(`Total cost analyzed: $${results.summary.totalCost}`)
        console.log(`Total clicks: ${results.summary.totalClicks.toLocaleString()}`)
        console.log(`Average CPC: $${results.summary.averageCPC}`)
      } else {
        console.log('\n❌ Google Ads analysis completed with no results')
        console.log('Setup Google Ads API credentials to access historical data')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Google Ads analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = GoogleAdsAnalyzer
