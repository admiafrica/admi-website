/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Meta Ads Analysis for ADMI
 * Analyzes Meta Ads campaigns and retargeting performance
 * Monitors pre-qualification form engagement from website visitors
 *
 * Features:
 * - Campaign performance analysis
 * - Lead quality metrics from pre-qual form
 * - Retargeting audience performance
 * - Budget utilization tracking
 * - ROI calculation
 */

class MetaAdsAnalysis {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID
    this.pixelId = process.env.META_PIXEL_ID // For tracking pre-qual form events
    this.baseUrl = 'https://graph.instagram.com/v18.0'
  }

  async initialize() {
    console.log('🚀 Initializing Meta Ads Analysis for ADMI')
    console.log('='.repeat(60))

    // Check credentials
    if (!this.accessToken) {
      console.log('❌ Missing META_ACCESS_TOKEN in .env')
      console.log('\nRun: npm run meta:setup')
      return false
    }

    try {
      // Test connection
      const response = await fetch(`${this.baseUrl}/me?fields=id,name&access_token=${this.accessToken}`)

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      console.log('✅ Connected to Meta Ads API')
      console.log(`User: ${data.name}`)
      return true
    } catch (error) {
      console.error('❌ Failed to initialize:', error.message)
      return false
    }
  }

  /**
   * Get all ad accounts accessible by the user
   */
  async getAdAccounts() {
    console.log('\n📊 Retrieving ad accounts...')

    try {
      const response = await fetch(
        `${this.baseUrl}/me/adaccounts?fields=id,name,currency,spend_limit,account_status&access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No ad accounts found')
        return []
      }

      console.log(`✅ Found ${data.data.length} ad account(s):`)
      data.data.forEach((account) => {
        console.log(`   • ${account.name} (${account.id})`)
        console.log(`     Status: ${account.account_status}, Currency: ${account.currency}`)
      })

      return data.data
    } catch (error) {
      console.error('❌ Failed to retrieve accounts:', error.message)
      return []
    }
  }

  /**
   * Get campaigns for an ad account with performance metrics
   */
  async getCampaigns(accountId) {
    console.log(`\n📈 Retrieving campaigns for account ${accountId}...`)

    try {
      const response = await fetch(
        `${this.baseUrl}/${accountId}/campaigns?` +
          'fields=id,name,status,objective,budget_remaining,daily_budget,spend,' +
          'created_time,start_time,stop_time,effective_status&' +
          `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No campaigns found')
        return []
      }

      console.log(`✅ Found ${data.data.length} campaign(s)`)

      const campaigns = data.data.map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        objective: campaign.objective,
        budgetRemaining: campaign.budget_remaining / 100, // Convert from cents
        dailyBudget: campaign.daily_budget / 100,
        totalSpend: campaign.spend / 100,
        createdTime: campaign.created_time,
        startTime: campaign.start_time,
        stopTime: campaign.stop_time,
        effectiveStatus: campaign.effective_status
      }))

      campaigns.forEach((campaign) => {
        console.log(`\n   Campaign: ${campaign.name}`)
        console.log(`   • ID: ${campaign.id}`)
        console.log(`   • Status: ${campaign.status} (${campaign.effectiveStatus})`)
        console.log(`   • Objective: ${campaign.objective}`)
        console.log(`   • Budget: $${campaign.dailyBudget}/day, $${campaign.budgetRemaining} remaining`)
        console.log(`   • Total Spend: $${campaign.totalSpend}`)
      })

      return campaigns
    } catch (error) {
      console.error('❌ Failed to retrieve campaigns:', error.message)
      return []
    }
  }

  /**
   * Get detailed insights for a campaign (clicks, impressions, conversions, etc.)
   */
  async getCampaignInsights(campaignId) {
    console.log(`\n📊 Getting insights for campaign ${campaignId}...`)

    try {
      const response = await fetch(
        `${this.baseUrl}/${campaignId}/insights?` +
          'fields=campaign_id,campaign_name,impressions,clicks,spend,cpc,cpm,ctr,actions&' +
          `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No insights available yet')
        return null
      }

      const insight = data.data[0]
      return {
        campaignId: insight.campaign_id,
        campaignName: insight.campaign_name,
        impressions: parseInt(insight.impressions || 0),
        clicks: parseInt(insight.clicks || 0),
        spend: parseFloat(insight.spend || 0),
        cpc: parseFloat(insight.cpc || 0),
        cpm: parseFloat(insight.cpm || 0),
        ctr: parseFloat(insight.ctr || 0),
        actions: insight.actions || []
      }
    } catch (error) {
      console.error('❌ Failed to retrieve insights:', error.message)
      return null
    }
  }

  /**
   * Get ad sets within a campaign
   */
  async getAdSets(campaignId) {
    console.log(`\n📍 Getting ad sets for campaign ${campaignId}...`)

    try {
      const response = await fetch(
        `${this.baseUrl}/${campaignId}/adsets?` +
          'fields=id,name,status,targeting,budget_remaining,daily_budget,start_time,end_time&' +
          `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        console.log('⚠️  No ad sets found')
        return []
      }

      console.log(`✅ Found ${data.data.length} ad set(s)`)

      return data.data.map((adset) => ({
        id: adset.id,
        name: adset.name,
        status: adset.status,
        targeting: adset.targeting,
        budgetRemaining: adset.budget_remaining / 100,
        dailyBudget: adset.daily_budget / 100,
        startTime: adset.start_time,
        endTime: adset.end_time
      }))
    } catch (error) {
      console.error('❌ Failed to retrieve ad sets:', error.message)
      return []
    }
  }

  /**
   * Get performance breakdown by targeting/audience
   */
  async getAudiencePerformance(campaignId) {
    console.log(`\n👥 Getting audience performance for campaign ${campaignId}...`)

    try {
      const adsets = await this.getAdSets(campaignId)

      const audiencePerformance = []

      for (const adset of adsets) {
        const insights = await fetch(
          `${this.baseUrl}/${adset.id}/insights?` +
            'fields=adset_id,adset_name,impressions,clicks,spend,actions&' +
            `access_token=${this.accessToken}`
        )

        const data = await insights.json()

        if (data.data && data.data.length > 0) {
          const insight = data.data[0]
          audiencePerformance.push({
            adsetId: adset.id,
            adsetName: adset.name,
            targeting: adset.targeting,
            impressions: parseInt(insight.impressions || 0),
            clicks: parseInt(insight.clicks || 0),
            spend: parseFloat(insight.spend || 0),
            cpc: parseFloat(insight.spend || 0) / parseInt(insight.clicks || 1),
            cpm: (parseFloat(insight.spend || 0) / parseInt(insight.impressions || 1)) * 1000,
            actions: insight.actions || []
          })
        }
      }

      return audiencePerformance
    } catch (error) {
      console.error('❌ Failed to get audience performance:', error.message)
      return []
    }
  }

  /**
   * Generate comprehensive analysis report
   */
  async generateReport() {
    try {
      console.log('\n📋 Generating comprehensive Meta Ads analysis...\n')

      const accounts = await this.getAdAccounts()

      if (accounts.length === 0) {
        console.log('❌ No ad accounts accessible')
        return null
      }

      const report = {
        generatedAt: new Date().toISOString(),
        accounts: [],
        summary: {
          totalCampaigns: 0,
          totalSpend: 0,
          totalImpressions: 0,
          totalClicks: 0,
          averageCPC: 0,
          averageCPM: 0
        }
      }

      for (const account of accounts) {
        const campaigns = await this.getCampaigns(account.id)

        const accountData = {
          accountId: account.id,
          accountName: account.name,
          currency: account.currency,
          campaigns: []
        }

        for (const campaign of campaigns) {
          const insights = await this.getCampaignInsights(campaign.id)
          const audiencePerformance = await this.getAudiencePerformance(campaign.id)

          accountData.campaigns.push({
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            objective: campaign.objective,
            budget: campaign.dailyBudget,
            insights: insights,
            audiences: audiencePerformance
          })

          if (insights) {
            report.summary.totalCampaigns++
            report.summary.totalSpend += insights.spend
            report.summary.totalImpressions += insights.impressions
            report.summary.totalClicks += insights.clicks
          }
        }

        report.accounts.push(accountData)
      }

      // Calculate averages
      if (report.summary.totalClicks > 0) {
        report.summary.averageCPC = report.summary.totalSpend / report.summary.totalClicks
      }
      if (report.summary.totalImpressions > 0) {
        report.summary.averageCPM = (report.summary.totalSpend / report.summary.totalImpressions) * 1000
      }

      // Save report
      const reportPath = path.join(process.cwd(), 'reports', 'meta-ads', 'analysis.json')
      const reportDir = path.dirname(reportPath)

      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true })
      }

      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
      console.log(`\n✅ Report saved to ${reportPath}`)

      return report
    } catch (error) {
      console.error('❌ Report generation failed:', error.message)
      return null
    }
  }

  /**
   * Print formatted summary
   */
  printSummary(report) {
    console.log('\n' + '='.repeat(60))
    console.log('📊 META ADS SUMMARY REPORT')
    console.log('='.repeat(60))

    const summary = report.summary
    console.log('\n💰 Spending:')
    console.log(`   Total Spend: $${summary.totalSpend.toFixed(2)}`)
    console.log(`   Campaigns: ${summary.totalCampaigns}`)

    console.log('\n📈 Performance:')
    console.log(`   Impressions: ${summary.totalImpressions.toLocaleString()}`)
    console.log(`   Clicks: ${summary.totalClicks.toLocaleString()}`)
    console.log(`   Avg CPC: $${summary.averageCPC.toFixed(2)}`)
    console.log(`   Avg CPM: $${summary.averageCPM.toFixed(2)}`)

    if (summary.totalClicks > 0) {
      console.log(`   CTR: ${((summary.totalClicks / summary.totalImpressions) * 100).toFixed(2)}%`)
    }

    console.log('\n📊 By Campaign:')
    for (const account of report.accounts) {
      console.log(`\n   Account: ${account.accountName}`)
      for (const campaign of account.campaigns) {
        if (campaign.insights) {
          console.log(`\n      Campaign: ${campaign.name}`)
          console.log(`      • Status: ${campaign.status}`)
          console.log(`      • Spend: $${campaign.insights.spend.toFixed(2)}`)
          console.log(`      • Impressions: ${campaign.insights.impressions.toLocaleString()}`)
          console.log(`      • Clicks: ${campaign.insights.clicks.toLocaleString()}`)
          console.log(`      • CPC: $${campaign.insights.cpc.toFixed(2)}`)
          console.log(`      • CPM: $${campaign.insights.cpm.toFixed(2)}`)
        }
      }
    }

    console.log('\n' + '='.repeat(60))
  }

  /**
   * Main analysis workflow
   */
  async runAnalysis() {
    const initialized = await this.initialize()

    if (!initialized) {
      return null
    }

    const report = await this.generateReport()

    if (report) {
      this.printSummary(report)
      return report
    }

    return null
  }
}

// Run analysis
if (require.main === module) {
  const analysis = new MetaAdsAnalysis()
  analysis
    .runAnalysis()
    .then((report) => {
      if (report) {
        console.log('\n🎉 Meta Ads analysis completed successfully!')
      } else {
        console.log('\n⚠️  Analysis completed with errors')
      }
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = MetaAdsAnalysis
