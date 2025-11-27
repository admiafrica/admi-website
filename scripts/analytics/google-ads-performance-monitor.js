#!/usr/bin/env node

/**
 * Daily Google Ads Performance Monitor
 * Tracks campaign performance, compares against targets, and suggests optimizations
 */

const { GoogleAdsApi } = require('google-ads-api')
const EmailNotificationService = require('./email-notification-service')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

class GoogleAdsPerformanceMonitor {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    })

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
    this.customer = this.client.Customer({
      customer_id: this.customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
    })

    this.emailService = new EmailNotificationService()
    this.emailRecipients = process.env.GOOGLE_ADS_REPORT_EMAILS
      ? process.env.GOOGLE_ADS_REPORT_EMAILS.split(',')
      : ['wilfred@admi.africa']

    // Performance targets (adjust based on ADMI goals)
    this.targets = {
      ctr: 2.0,              // 2% click-through rate
      cpc: 50,               // KES 50 cost per click (adjust to your currency)
      conversionRate: 5.0,   // 5% conversion rate (applications)
      cpa: 5000,             // KES 5,000 cost per application
      roas: 3.0,             // 3x return on ad spend
      qualityScore: 7,       // Minimum quality score
      impressionShare: 70    // 70% impression share target
    }
  }

  /**
   * Get campaign performance for date range
   */
  async getCampaignPerformance(daysBack = 7) {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const formatDate = (date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '')
    }

    console.log(`\n📊 Fetching performance data (${daysBack} days)`)
    console.log(`   Period: ${formatDate(startDate)} - ${formatDate(endDate)}`)

    try {
      const query = `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value,
          metrics.cost_per_conversion,
          metrics.conversion_rate
        FROM campaign
        WHERE 
          campaign.status IN ('ENABLED', 'PAUSED')
          AND segments.date BETWEEN '${formatDate(startDate)}' AND '${formatDate(endDate)}'
        ORDER BY metrics.cost_micros DESC
      `

      const results = await this.customer.query(query)

      const campaigns = results.map(row => ({
        id: row.campaign.id,
        name: row.campaign.name,
        status: row.campaign.status,
        type: row.campaign.advertising_channel_type,
        budget: 0, // Budget is in separate resource, skip for now
        impressions: row.metrics.impressions,
        clicks: row.metrics.clicks,
        ctr: row.metrics.ctr * 100,
        avgCpc: row.metrics.average_cpc / 1_000_000,
        cost: row.metrics.cost_micros / 1_000_000,
        conversions: row.metrics.conversions,
        conversionValue: row.metrics.conversions_value,
        costPerConversion: row.metrics.cost_per_conversion / 1_000_000,
        conversionRate: row.metrics.conversion_rate * 100,
        impressionShare: 0, // Not available for all campaign types
        rankLostIS: 0,
        budgetLostIS: 0
      }))

      return campaigns
    } catch (error) {
      console.error('❌ Failed to fetch performance:', error.message)
      throw error
    }
  }

  /**
   * Get ad-level performance (by creative)
   */
  async getAdPerformance(daysBack = 7) {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const formatDate = (date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '')
    }

    console.log(`\n🎨 Fetching ad creative performance`)

    try {
      const query = `
        SELECT
          ad_group_ad.ad.id,
          ad_group_ad.ad.name,
          ad_group_ad.ad.type,
          ad_group.name,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_micros,
          metrics.conversions
        FROM ad_group_ad
        WHERE 
          ad_group_ad.status IN ('ENABLED', 'PAUSED')
          AND segments.date BETWEEN '${formatDate(startDate)}' AND '${formatDate(endDate)}'
        ORDER BY metrics.conversions DESC
        LIMIT 20
      `

      const results = await this.customer.query(query)

      const ads = results.map(row => ({
        adId: row.ad_group_ad.ad.id,
        adName: row.ad_group_ad.ad.name || `Ad ${row.ad_group_ad.ad.id}`,
        adType: row.ad_group_ad.ad.type,
        adGroupName: row.ad_group.name,
        campaignName: row.campaign.name,
        impressions: row.metrics.impressions,
        clicks: row.metrics.clicks,
        ctr: row.metrics.ctr * 100,
        avgCpc: row.metrics.average_cpc / 1_000_000,
        cost: row.metrics.cost_micros / 1_000_000,
        conversions: row.metrics.conversions
      }))

      return ads
    } catch (error) {
      console.error('⚠️ Failed to fetch ad performance:', error.message)
      return [] // Return empty array, don't fail the whole report
    }
  }

  /**
   * Get keyword performance
   */
  async getKeywordPerformance(daysBack = 7) {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const formatDate = (date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '')
    }

    console.log(`\n🔑 Fetching keyword performance`)

    try {
      const query = `
        SELECT
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_micros,
          metrics.conversions
        FROM keyword_view
        WHERE 
          ad_group_criterion.status IN ('ENABLED', 'PAUSED')
          AND segments.date BETWEEN '${formatDate(startDate)}' AND '${formatDate(endDate)}'
        ORDER BY metrics.conversions DESC
        LIMIT 20
      `

      const results = await this.customer.query(query)

      const keywords = results.map(row => ({
        keyword: row.ad_group_criterion.keyword.text,
        matchType: row.ad_group_criterion.keyword.match_type,
        campaignName: row.campaign.name,
        impressions: row.metrics.impressions,
        clicks: row.metrics.clicks,
        ctr: row.metrics.ctr * 100,
        avgCpc: row.metrics.average_cpc / 1_000_000,
        cost: row.metrics.cost_micros / 1_000_000,
        conversions: row.metrics.conversions
      }))

      return keywords
    } catch (error) {
      console.error('⚠️ Failed to fetch keyword performance:', error.message)
      return []
    }
  }

  /**
   * Analyze performance and generate recommendations
   */
  analyzePerformance(campaigns) {
    console.log('\n' + '='.repeat(80))
    console.log('📈 CAMPAIGN PERFORMANCE ANALYSIS')
    console.log('='.repeat(80))

    const recommendations = []
    const alerts = []

    campaigns.forEach(campaign => {
      console.log(`\n🎯 ${campaign.name}`)
      console.log('─'.repeat(80))
      
      // Key metrics
      console.log(`   Status: ${campaign.status}`)
      console.log(`   Type: ${campaign.type}`)
      console.log(`   Budget: ${campaign.budget.toLocaleString()} (daily)`)
      console.log(`   Spend: ${campaign.cost.toLocaleString()}`)
      console.log(`   Impressions: ${campaign.impressions.toLocaleString()}`)
      console.log(`   Clicks: ${campaign.clicks.toLocaleString()}`)
      console.log(`   CTR: ${campaign.ctr.toFixed(2)}% (target: ${this.targets.ctr}%)`)
      console.log(`   Avg CPC: ${campaign.avgCpc.toFixed(2)} (target: ≤${this.targets.cpc})`)
      console.log(`   Conversions: ${campaign.conversions}`)
      console.log(`   Conversion Rate: ${campaign.conversionRate.toFixed(2)}% (target: ${this.targets.conversionRate}%)`)
      
      if (campaign.conversions > 0) {
        console.log(`   Cost/Conversion: ${campaign.costPerConversion.toFixed(2)} (target: ≤${this.targets.cpa})`)
      }

      if (campaign.impressionShare > 0) {
        console.log(`   Impression Share: ${campaign.impressionShare.toFixed(1)}% (target: ${this.targets.impressionShare}%)`)
      }

      // Performance vs targets
      const issues = []
      const wins = []

      // CTR analysis
      if (campaign.ctr < this.targets.ctr) {
        issues.push({
          metric: 'CTR',
          current: campaign.ctr.toFixed(2) + '%',
          target: this.targets.ctr + '%',
          severity: 'MEDIUM',
          recommendation: 'Improve ad copy and targeting. Test new ad variations.'
        })
      } else {
        wins.push(`CTR above target (${campaign.ctr.toFixed(2)}%)`)
      }

      // CPC analysis
      if (campaign.avgCpc > this.targets.cpc) {
        issues.push({
          metric: 'CPC',
          current: campaign.avgCpc.toFixed(2),
          target: `≤${this.targets.cpc}`,
          severity: 'HIGH',
          recommendation: 'Optimize for lower-cost keywords. Improve Quality Score. Adjust bids.'
        })
      } else {
        wins.push(`CPC within target (${campaign.avgCpc.toFixed(2)})`)
      }

      // Conversion rate analysis
      if (campaign.clicks > 0) {
        if (campaign.conversionRate < this.targets.conversionRate) {
          issues.push({
            metric: 'Conversion Rate',
            current: campaign.conversionRate.toFixed(2) + '%',
            target: this.targets.conversionRate + '%',
            severity: 'HIGH',
            recommendation: 'Improve landing page. Enhance pre-qualification form. Review user journey.'
          })
        } else {
          wins.push(`Conversion rate above target (${campaign.conversionRate.toFixed(2)}%)`)
        }
      }

      // CPA analysis
      if (campaign.conversions > 0) {
        if (campaign.costPerConversion > this.targets.cpa) {
          issues.push({
            metric: 'Cost per Acquisition',
            current: campaign.costPerConversion.toFixed(2),
            target: `≤${this.targets.cpa}`,
            severity: 'CRITICAL',
            recommendation: 'URGENT: Reduce CPA by improving targeting, Quality Score, and conversion rate.'
          })
        } else {
          wins.push(`CPA within target (${campaign.costPerConversion.toFixed(2)})`)
        }
      }

      // Impression share analysis
      if (campaign.impressionShare > 0) {
        if (campaign.impressionShare < this.targets.impressionShare) {
          if (campaign.budgetLostIS > 10) {
            issues.push({
              metric: 'Impression Share',
              current: campaign.impressionShare.toFixed(1) + '%',
              target: this.targets.impressionShare + '%',
              severity: 'MEDIUM',
              recommendation: `Increase budget. Currently losing ${campaign.budgetLostIS.toFixed(1)}% due to budget constraints.`
            })
          } else if (campaign.rankLostIS > 10) {
            issues.push({
              metric: 'Impression Share',
              current: campaign.impressionShare.toFixed(1) + '%',
              target: this.targets.impressionShare + '%',
              severity: 'MEDIUM',
              recommendation: `Improve ad rank. Currently losing ${campaign.rankLostIS.toFixed(1)}% due to low rank. Increase bids or Quality Score.`
            })
          }
        }
      }

      // Low traffic alert
      if (campaign.impressions < 100) {
        alerts.push({
          campaign: campaign.name,
          type: 'LOW_TRAFFIC',
          message: `Only ${campaign.impressions} impressions. Check targeting and bid strategy.`
        })
      }

      // No conversions alert
      if (campaign.clicks > 50 && campaign.conversions === 0) {
        alerts.push({
          campaign: campaign.name,
          type: 'NO_CONVERSIONS',
          message: `${campaign.clicks} clicks but 0 conversions. Review landing page and conversion tracking.`
        })
      }

      // Display results
      if (wins.length > 0) {
        console.log(`\n   ✅ PERFORMING WELL:`)
        wins.forEach(win => console.log(`      • ${win}`))
      }

      if (issues.length > 0) {
        console.log(`\n   ⚠️  NEEDS ATTENTION:`)
        issues.forEach(issue => {
          console.log(`      • ${issue.metric}: ${issue.current} (target: ${issue.target})`)
          console.log(`        → ${issue.recommendation}`)
        })

        recommendations.push({
          campaign: campaign.name,
          issues
        })
      }
    })

    return { recommendations, alerts }
  }

  /**
   * Generate daily report
   */
  async generateDailyReport(daysBack = 7) {
    console.log('🚀 GOOGLE ADS DAILY PERFORMANCE MONITOR')
    console.log('='.repeat(80))
    console.log(`Date: ${new Date().toLocaleDateString()}`)
    console.log(`Analyzing last ${daysBack} days`)

    const campaigns = await this.getCampaignPerformance(daysBack)

    if (campaigns.length === 0) {
      console.log('\n⚠️  No active campaigns found')
      return
    }

    console.log(`\n✅ Found ${campaigns.length} active campaign(s)`)

    // Calculate totals
    const totals = campaigns.reduce((acc, c) => ({
      cost: acc.cost + c.cost,
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks,
      conversions: acc.conversions + c.conversions
    }), { cost: 0, impressions: 0, clicks: 0, conversions: 0 })

    console.log('\n📊 OVERALL PERFORMANCE:')
    console.log(`   Total Spend: ${totals.cost.toLocaleString()}`)
    console.log(`   Total Impressions: ${totals.impressions.toLocaleString()}`)
    console.log(`   Total Clicks: ${totals.clicks.toLocaleString()}`)
    console.log(`   Total Conversions: ${totals.conversions}`)
    console.log(`   Overall CTR: ${(totals.clicks / totals.impressions * 100).toFixed(2)}%`)
    console.log(`   Overall CPC: ${(totals.cost / totals.clicks).toFixed(2)}`)
    if (totals.conversions > 0) {
      console.log(`   Overall CPA: ${(totals.cost / totals.conversions).toFixed(2)}`)
      console.log(`   Overall Conversion Rate: ${(totals.conversions / totals.clicks * 100).toFixed(2)}%`)
    }

    // Analyze and get recommendations
    const { recommendations, alerts } = this.analyzePerformance(campaigns)

    // Priority alerts
    if (alerts.length > 0) {
      console.log('\n' + '='.repeat(80))
      console.log('🚨 PRIORITY ALERTS')
      console.log('='.repeat(80))
      alerts.forEach(alert => {
        console.log(`\n⚠️  ${alert.type}: ${alert.campaign}`)
        console.log(`   ${alert.message}`)
      })
    }

    // Get ad and keyword performance for detailed breakdown
    const topAds = await this.getAdPerformance(daysBack)
    const topKeywords = await this.getKeywordPerformance(daysBack)

    // Log ad performance
    if (topAds.length > 0) {
      console.log('\n' + '─'.repeat(80))
      console.log('🎨 TOP PERFORMING ADS (by conversions)')
      console.log('─'.repeat(80))
      topAds.slice(0, 5).forEach((ad, i) => {
        console.log(`   ${i + 1}. Ad ID ${ad.adId} (${ad.campaignName})`)
        console.log(`      Clicks: ${ad.clicks} | Conv: ${ad.conversions} | CTR: ${ad.ctr.toFixed(2)}%`)
      })
    }

    // Log keyword performance
    if (topKeywords.length > 0) {
      console.log('\n' + '─'.repeat(80))
      console.log('🔑 TOP PERFORMING KEYWORDS (by conversions)')
      console.log('─'.repeat(80))
      topKeywords.slice(0, 5).forEach((kw, i) => {
        console.log(`   ${i + 1}. "${kw.keyword}" [${kw.matchType}]`)
        console.log(`      Clicks: ${kw.clicks} | Conv: ${kw.conversions} | CTR: ${kw.ctr.toFixed(2)}%`)
      })
    }

    // Save report with ad and keyword data
    const report = {
      date: new Date().toISOString(),
      period: `${daysBack} days`,
      totals,
      campaigns,
      topAds,
      topKeywords,
      recommendations,
      alerts,
      targets: this.targets
    }

    const reportPath = path.join(
      __dirname,
      '../../reports/google-ads',
      `daily-performance-${new Date().toISOString().split('T')[0]}.json`
    )

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`\n✅ Report saved: ${reportPath}`)

    // Send email report
    try {
      console.log(`\n📧 Sending email report to ${this.emailRecipients.join(', ')}`)
      await this.emailService.sendPerformanceReport(report, this.emailRecipients)
      console.log(`✅ Email report sent successfully`)
    } catch (error) {
      console.error(`⚠️  Failed to send email report:`, error.message)
      // Don't fail the whole job if email fails
    }

    // Summary
    console.log('\n' + '='.repeat(80))
    console.log('📋 SUMMARY')
    console.log('='.repeat(80))
    console.log(`   Campaigns analyzed: ${campaigns.length}`)
    console.log(`   Campaigns needing attention: ${recommendations.length}`)
    console.log(`   Priority alerts: ${alerts.length}`)

    if (recommendations.length > 0) {
      console.log('\n🎯 TOP PRIORITY OPTIMIZATIONS:')
      recommendations.forEach((rec, idx) => {
        const criticalIssues = rec.issues.filter(i => i.severity === 'CRITICAL')
        if (criticalIssues.length > 0) {
          console.log(`\n   ${idx + 1}. ${rec.campaign}`)
          criticalIssues.forEach(issue => {
            console.log(`      🔴 ${issue.metric}: ${issue.recommendation}`)
          })
        }
      })
    }

    console.log('\n')

    return report
  }
}

module.exports = GoogleAdsPerformanceMonitor

// CLI usage
if (require.main === module) {
  const monitor = new GoogleAdsPerformanceMonitor()
  const daysBack = parseInt(process.argv[2]) || 7

  monitor.generateDailyReport(daysBack)
    .catch(error => {
      console.error('Error:', error.message)
      process.exit(1)
    })
}
