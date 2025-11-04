/* eslint-disable @typescript-eslint/no-var-requires */
const { GoogleAdsApi } = require('google-ads-api')
const fs = require('fs')
require('dotenv').config()

/**
 * ADMI Google Ads Recovery Analysis
 * Customer ID: 392-935-5931 (3929355931)
 * Extract detailed campaign data to understand 2024 strategy and plan recovery
 */

class ADMIGoogleAdsRecovery {
  constructor() {
    this.customerId = '3929355931' // ADMI's Google Ads account
    this.client = null
    this.customer = null
  }

  async initializeClient() {
    console.log('🚀 Initializing Google Ads API for ADMI account: 392-935-5931')
    
    try {
      // Check if we have the required credentials
      if (!process.env.GOOGLE_ADS_CLIENT_ID) {
        console.log('❌ Google Ads API credentials not found in .env')
        console.log('\n💡 To get historical campaign data, you need to:')
        console.log('1. Set up Google Ads API credentials (see google-ads-setup-guide.md)')
        console.log('2. Or manually export campaign data from Google Ads interface')
        console.log('3. Or check current campaign status in Google Ads dashboard')
        console.log('\n🔍 Alternative: Check Google Ads account directly at:')
        console.log('   https://ads.google.com/aw/campaigns?ocid=3929355931')
        return false
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

      console.log('✅ Google Ads API client initialized for ADMI account')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Google Ads client:', error.message)
      return false
    }
  }

  async analyzeADMICampaigns() {
    console.log('\n📊 Analyzing ADMI Google Ads campaigns...')
    console.log('Looking for campaigns that drove 267K+ paid sessions in 2024\n')
    
    try {
      // Get all campaigns for 2024-2025 period
      const campaignQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.start_date,
          campaign.end_date,
          campaign.bidding_strategy_type,
          campaign.budget.amount_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc,
          segments.date
        FROM campaign 
        WHERE segments.date BETWEEN '2024-01-01' AND '2025-11-03'
        ORDER BY metrics.cost_micros DESC
      `

      console.log('🔍 Querying campaign data...')
      const campaigns = await this.customer.query(campaignQuery)
      
      if (campaigns.length === 0) {
        console.log('❌ No campaign data found')
        console.log('\n💡 This could mean:')
        console.log('1. Campaigns were deleted or removed')
        console.log('2. Account access permissions issue')
        console.log('3. Different date range needed')
        console.log('4. Account may be suspended or inactive')
        return null
      }

      console.log(`✅ Found ${campaigns.length} campaign records`)
      
      // Process and analyze campaigns
      const analysis = this.processCampaignData(campaigns)
      
      // Get current campaign status
      const currentStatus = await this.getCurrentCampaignStatus()
      
      // Get keyword performance for top campaigns
      const keywordAnalysis = await this.getTopKeywords()
      
      return {
        customerId: this.customerId,
        totalRecords: campaigns.length,
        analysis,
        currentStatus,
        keywordAnalysis,
        rawData: campaigns,
        recoveryPlan: this.generateRecoveryPlan(analysis, currentStatus)
      }
    } catch (error) {
      console.error('❌ Error analyzing campaigns:', error.message)
      
      if (error.message.includes('PERMISSION_DENIED')) {
        console.log('\n💡 Permission denied - this could mean:')
        console.log('1. Service account needs access to this Google Ads account')
        console.log('2. Developer token not approved yet')
        console.log('3. OAuth refresh token expired')
      }
      
      return null
    }
  }

  processCampaignData(campaigns) {
    console.log('\n📈 Processing campaign performance data...')
    
    const campaignSummary = {}
    const monthlyData = {}
    let totalCost = 0
    let totalClicks = 0
    let totalImpressions = 0
    let totalConversions = 0

    campaigns.forEach(record => {
      const campaignId = record.campaign.id
      const campaignName = record.campaign.name
      const date = record.segments.date
      const month = date.substring(0, 7) // YYYY-MM
      
      const cost = parseInt(record.metrics.cost_micros || 0) / 1000000
      const clicks = parseInt(record.metrics.clicks || 0)
      const impressions = parseInt(record.metrics.impressions || 0)
      const conversions = parseFloat(record.metrics.conversions || 0)

      totalCost += cost
      totalClicks += clicks
      totalImpressions += impressions
      totalConversions += conversions

      // Campaign summary
      if (!campaignSummary[campaignId]) {
        campaignSummary[campaignId] = {
          id: campaignId,
          name: campaignName,
          status: record.campaign.status,
          channelType: record.campaign.advertising_channel_type,
          startDate: record.campaign.start_date,
          endDate: record.campaign.end_date,
          totalCost: 0,
          totalClicks: 0,
          totalImpressions: 0,
          totalConversions: 0,
          avgCPC: 0,
          avgCTR: 0,
          conversionRate: 0
        }
      }

      campaignSummary[campaignId].totalCost += cost
      campaignSummary[campaignId].totalClicks += clicks
      campaignSummary[campaignId].totalImpressions += impressions
      campaignSummary[campaignId].totalConversions += conversions

      // Monthly breakdown
      if (!monthlyData[month]) {
        monthlyData[month] = {
          cost: 0,
          clicks: 0,
          impressions: 0,
          conversions: 0,
          activeCampaigns: new Set()
        }
      }

      monthlyData[month].cost += cost
      monthlyData[month].clicks += clicks
      monthlyData[month].impressions += impressions
      monthlyData[month].conversions += conversions
      monthlyData[month].activeCampaigns.add(campaignName)
    })

    // Calculate campaign averages
    Object.values(campaignSummary).forEach(campaign => {
      if (campaign.totalClicks > 0) {
        campaign.avgCPC = campaign.totalCost / campaign.totalClicks
      }
      if (campaign.totalImpressions > 0) {
        campaign.avgCTR = (campaign.totalClicks / campaign.totalImpressions) * 100
      }
      if (campaign.totalClicks > 0) {
        campaign.conversionRate = (campaign.totalConversions / campaign.totalClicks) * 100
      }
    })

    // Convert monthly active campaigns set to count
    Object.values(monthlyData).forEach(month => {
      month.activeCampaigns = month.activeCampaigns.size
    })

    // Sort campaigns by cost
    const topCampaigns = Object.values(campaignSummary)
      .sort((a, b) => b.totalCost - a.totalCost)
      .slice(0, 10)

    console.log(`✅ Processed ${Object.keys(campaignSummary).length} unique campaigns`)
    console.log(`💰 Total ad spend: $${totalCost.toFixed(2)}`)
    console.log(`👆 Total clicks: ${totalClicks.toLocaleString()}`)
    console.log(`👁️  Total impressions: ${totalImpressions.toLocaleString()}`)

    return {
      totalCost: Math.round(totalCost),
      totalClicks,
      totalImpressions,
      totalConversions,
      averageCPC: totalClicks > 0 ? (totalCost / totalClicks).toFixed(2) : 0,
      averageCTR: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0,
      totalCampaigns: Object.keys(campaignSummary).length,
      topCampaigns,
      monthlyBreakdown: monthlyData,
      campaignDetails: campaignSummary
    }
  }

  async getCurrentCampaignStatus() {
    console.log('\n🔍 Checking current campaign status...')
    
    try {
      const currentQuery = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.budget.amount_micros
        FROM campaign 
        WHERE campaign.status IN ('ENABLED', 'PAUSED')
        ORDER BY campaign.name
      `

      const currentCampaigns = await this.customer.query(currentQuery)
      
      const statusSummary = {
        enabled: [],
        paused: [],
        total: currentCampaigns.length
      }

      currentCampaigns.forEach(campaign => {
        const campaignData = {
          id: campaign.campaign.id,
          name: campaign.campaign.name,
          status: campaign.campaign.status,
          channelType: campaign.campaign.advertising_channel_type,
          dailyBudget: campaign.campaign.budget ? 
            (parseInt(campaign.campaign.budget.amount_micros) / 1000000).toFixed(2) : 'Unknown'
        }

        if (campaign.campaign.status === 'ENABLED') {
          statusSummary.enabled.push(campaignData)
        } else if (campaign.campaign.status === 'PAUSED') {
          statusSummary.paused.push(campaignData)
        }
      })

      console.log(`✅ Current status: ${statusSummary.enabled.length} enabled, ${statusSummary.paused.length} paused`)
      
      return statusSummary
    } catch (error) {
      console.log('⚠️  Could not fetch current campaign status:', error.message)
      return null
    }
  }

  async getTopKeywords() {
    console.log('\n🔑 Analyzing top-performing keywords...')
    
    try {
      const keywordQuery = `
        SELECT 
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          campaign.name,
          ad_group.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions
        FROM keyword_view 
        WHERE segments.date BETWEEN '2024-01-01' AND '2025-11-03'
        AND ad_group_criterion.status = 'ENABLED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 50
      `

      const keywords = await this.customer.query(keywordQuery)
      
      const keywordAnalysis = keywords.map(kw => ({
        keyword: kw.ad_group_criterion?.keyword?.text || 'Unknown',
        matchType: kw.ad_group_criterion?.keyword?.match_type || 'Unknown',
        campaign: kw.campaign?.name || 'Unknown',
        adGroup: kw.ad_group?.name || 'Unknown',
        impressions: parseInt(kw.metrics?.impressions || 0),
        clicks: parseInt(kw.metrics?.clicks || 0),
        cost: (parseInt(kw.metrics?.cost_micros || 0) / 1000000).toFixed(2),
        conversions: parseFloat(kw.metrics?.conversions || 0),
        cpc: kw.metrics?.clicks > 0 ? 
          ((parseInt(kw.metrics?.cost_micros || 0) / 1000000) / parseInt(kw.metrics?.clicks)).toFixed(2) : 0
      }))

      console.log(`✅ Found ${keywordAnalysis.length} top keywords`)
      
      return keywordAnalysis
    } catch (error) {
      console.log('⚠️  Could not fetch keyword data:', error.message)
      return []
    }
  }

  generateRecoveryPlan(analysis, currentStatus) {
    const plan = {
      priority: 'CRITICAL',
      timeline: '30-60-90 days',
      phases: [],
      budgetRecommendation: {},
      campaignActions: []
    }

    if (!analysis || !currentStatus) {
      plan.phases.push({
        phase: 'Setup Required',
        action: 'Complete Google Ads API setup to access detailed campaign data',
        timeline: '1-2 days'
      })
      return plan
    }

    // Phase 1: Immediate restart (0-30 days)
    plan.phases.push({
      phase: 'Phase 1: Emergency Restart',
      timeline: '0-30 days',
      target: 'Restore 25% of 2024 paid volume',
      actions: [
        'Reactivate top-performing paused campaigns',
        'Start with $5,000/month budget',
        'Focus on proven course-specific campaigns',
        'Monitor performance daily'
      ]
    })

    // Budget recommendation based on 2024 data
    if (analysis.totalCost > 0) {
      const monthlySpend2024 = Math.round(analysis.totalCost / 12)
      plan.budgetRecommendation = {
        historical2024Monthly: monthlySpend2024,
        phase1Budget: Math.min(5000, monthlySpend2024 * 0.5),
        phase2Budget: Math.min(10000, monthlySpend2024 * 0.8),
        phase3Budget: Math.min(15000, monthlySpend2024)
      }
    }

    // Campaign-specific actions
    if (currentStatus.paused.length > 0) {
      plan.campaignActions.push({
        action: 'REACTIVATE_PAUSED',
        campaigns: currentStatus.paused.slice(0, 5), // Top 5 paused campaigns
        priority: 'HIGH'
      })
    }

    if (analysis.topCampaigns.length > 0) {
      plan.campaignActions.push({
        action: 'SCALE_TOP_PERFORMERS',
        campaigns: analysis.topCampaigns.slice(0, 3),
        priority: 'HIGH'
      })
    }

    return plan
  }

  async runADMIRecoveryAnalysis() {
    console.log('🚀 ADMI Google Ads Recovery Analysis')
    console.log('Customer ID: 392-935-5931 (3929355931)')
    console.log('Goal: Understand 2024 strategy and plan recovery from 94.7% traffic decline\n')
    
    const clientReady = await this.initializeClient()
    if (!clientReady) {
      // Provide manual analysis guidance
      console.log('\n📋 MANUAL ANALYSIS STEPS:')
      console.log('1. Login to Google Ads: https://ads.google.com/aw/campaigns?ocid=3929355931')
      console.log('2. Check campaign status (enabled/paused/removed)')
      console.log('3. Export campaign performance data for 2024-2025')
      console.log('4. Look for campaigns matching GA4 data:')
      console.log('   - "Creative Media and Tech" campaign')
      console.log('   - "sep2024" or similar Meta campaigns')
      console.log('   - Course-specific campaigns (Data Analysis, Digital Content)')
      console.log('5. Check current daily budgets and spending')
      
      return null
    }

    const results = await this.analyzeADMICampaigns()
    
    if (results) {
      // Save detailed results
      fs.writeFileSync('admi-google-ads-recovery-analysis.json', JSON.stringify(results, null, 2))
      console.log('\n✅ Analysis saved to: admi-google-ads-recovery-analysis.json')
      
      // Print summary
      console.log('\n🎯 RECOVERY ANALYSIS SUMMARY:')
      console.log(`💰 Total 2024-2025 ad spend: $${results.analysis.totalCost.toLocaleString()}`)
      console.log(`👆 Total clicks: ${results.analysis.totalClicks.toLocaleString()}`)
      console.log(`📊 Active campaigns: ${results.currentStatus?.enabled.length || 0}`)
      console.log(`⏸️  Paused campaigns: ${results.currentStatus?.paused.length || 0}`)
      console.log(`🔑 Top keywords analyzed: ${results.keywordAnalysis.length}`)
      
      if (results.currentStatus?.paused.length > 0) {
        console.log('\n🚨 IMMEDIATE ACTION REQUIRED:')
        console.log(`${results.currentStatus.paused.length} campaigns are PAUSED`)
        console.log('These may be the campaigns that drove 2024\'s high volume!')
      }
    }
    
    return results
  }
}

// Run the ADMI recovery analysis
if (require.main === module) {
  const analyzer = new ADMIGoogleAdsRecovery()
  analyzer.runADMIRecoveryAnalysis()
    .then((results) => {
      if (results) {
        console.log('\n🎉 ADMI Google Ads recovery analysis completed!')
        console.log('Check the JSON file for detailed campaign data and recovery plan')
      } else {
        console.log('\n⚠️  Analysis completed with limited data')
        console.log('Follow manual steps to access Google Ads account directly')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = ADMIGoogleAdsRecovery
