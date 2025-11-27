#!/usr/bin/env node

/**
 * UTM Performance Analyzer
 * Analyzes Google Analytics 4 data to identify best performing ads, campaigns, and creatives
 * Uses the tracking template parameters from Google Ads
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

class UTMPerformanceAnalyzer {
  constructor() {
    this.propertyId = process.env.GA4_PROPERTY_ID || '250875907'
    
    // Initialize with service account
    const keyFilePath = path.join(process.cwd(), 'ga-service-account.json')
    if (fs.existsSync(keyFilePath)) {
      this.analyticsClient = new BetaAnalyticsDataClient({
        keyFilename: keyFilePath
      })
    } else {
      throw new Error('GA4 service account credentials not found at ga-service-account.json')
    }
  }

  /**
   * Get performance by UTM Campaign (campaign ID from tracking template)
   */
  async getCampaignPerformance(daysBack = 30) {
    console.log(`\n📊 Analyzing UTM Campaign Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'sessionCampaignId' },
        { name: 'sessionCampaignName' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' },
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionMedium',
          stringFilter: {
            matchType: 'EXACT',
            value: 'cpc'
          }
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 50
    })

    const campaigns = response.rows?.map(row => ({
      campaignId: row.dimensionValues[0]?.value || 'unknown',
      campaignName: row.dimensionValues[1]?.value || 'Unknown Campaign',
      source: row.dimensionValues[2]?.value || 'google',
      medium: row.dimensionValues[3]?.value || 'cpc',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      newUsers: parseInt(row.metricValues[2]?.value || 0),
      engagedSessions: parseInt(row.metricValues[3]?.value || 0),
      engagementRate: parseFloat(row.metricValues[4]?.value || 0) * 100,
      avgSessionDuration: parseFloat(row.metricValues[5]?.value || 0),
      bounceRate: parseFloat(row.metricValues[6]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[7]?.value || 0),
      events: parseInt(row.metricValues[8]?.value || 0)
    })) || []

    return campaigns
  }

  /**
   * Get performance by Ad Creative (creative ID from {creative} parameter)
   */
  async getAdCreativePerformance(daysBack = 30) {
    console.log(`\n🎨 Analyzing Ad Creative Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'sessionManualAdContent' }, // utm_content = {creative}
        { name: 'sessionCampaignName' },
        { name: 'sessionSource' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'sessionMedium',
                stringFilter: { matchType: 'EXACT', value: 'cpc' }
              }
            },
            {
              notExpression: {
                filter: {
                  fieldName: 'sessionManualAdContent',
                  stringFilter: { matchType: 'EXACT', value: '(not set)' }
                }
              }
            }
          ]
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 100
    })

    const creatives = response.rows?.map(row => ({
      creativeId: row.dimensionValues[0]?.value || 'unknown',
      campaignName: row.dimensionValues[1]?.value || 'Unknown',
      source: row.dimensionValues[2]?.value || 'google',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      engagedSessions: parseInt(row.metricValues[2]?.value || 0),
      engagementRate: parseFloat(row.metricValues[3]?.value || 0) * 100,
      avgSessionDuration: parseFloat(row.metricValues[4]?.value || 0),
      bounceRate: parseFloat(row.metricValues[5]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[6]?.value || 0)
    })) || []

    return creatives
  }

  /**
   * Get performance by Ad Group (adgroupid from tracking template)
   */
  async getAdGroupPerformance(daysBack = 30) {
    console.log(`\n📁 Analyzing Ad Group Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'sessionGoogleAdsAdGroupId' },
        { name: 'sessionGoogleAdsAdGroupName' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionMedium',
          stringFilter: { matchType: 'EXACT', value: 'cpc' }
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 50
    })

    const adGroups = response.rows?.map(row => ({
      adGroupId: row.dimensionValues[0]?.value || 'unknown',
      adGroupName: row.dimensionValues[1]?.value || 'Unknown',
      campaignName: row.dimensionValues[2]?.value || 'Unknown',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      engagedSessions: parseInt(row.metricValues[2]?.value || 0),
      engagementRate: parseFloat(row.metricValues[3]?.value || 0) * 100,
      bounceRate: parseFloat(row.metricValues[4]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[5]?.value || 0)
    })) || []

    return adGroups
  }

  /**
   * Get performance by Keyword (utm_term from tracking template)
   */
  async getKeywordPerformance(daysBack = 30) {
    console.log(`\n🔑 Analyzing Keyword Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'sessionManualTerm' }, // utm_term = {keyword}
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'sessionMedium',
                stringFilter: { matchType: 'EXACT', value: 'cpc' }
              }
            },
            {
              notExpression: {
                filter: {
                  fieldName: 'sessionManualTerm',
                  stringFilter: { matchType: 'EXACT', value: '(not set)' }
                }
              }
            }
          ]
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 100
    })

    const keywords = response.rows?.map(row => ({
      keyword: row.dimensionValues[0]?.value || 'unknown',
      campaignName: row.dimensionValues[1]?.value || 'Unknown',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      engagedSessions: parseInt(row.metricValues[2]?.value || 0),
      engagementRate: parseFloat(row.metricValues[3]?.value || 0) * 100,
      bounceRate: parseFloat(row.metricValues[4]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[5]?.value || 0)
    })) || []

    return keywords
  }

  /**
   * Get device performance breakdown
   */
  async getDevicePerformance(daysBack = 30) {
    console.log(`\n📱 Analyzing Device Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'deviceCategory' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionMedium',
          stringFilter: { matchType: 'EXACT', value: 'cpc' }
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 20
    })

    const devices = response.rows?.map(row => ({
      device: row.dimensionValues[0]?.value || 'unknown',
      campaignName: row.dimensionValues[1]?.value || 'Unknown',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      engagedSessions: parseInt(row.metricValues[2]?.value || 0),
      engagementRate: parseFloat(row.metricValues[3]?.value || 0) * 100,
      bounceRate: parseFloat(row.metricValues[4]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[5]?.value || 0)
    })) || []

    return devices
  }

  /**
   * Get landing page performance for paid traffic
   */
  async getLandingPagePerformance(daysBack = 30) {
    console.log(`\n🌐 Analyzing Landing Page Performance (${daysBack} days)`)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    const [response] = await this.analyticsClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: 'today'
      }],
      dimensions: [
        { name: 'landingPage' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionMedium',
          stringFilter: { matchType: 'EXACT', value: 'cpc' }
        }
      },
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true }
      ],
      limit: 30
    })

    const pages = response.rows?.map(row => ({
      landingPage: row.dimensionValues[0]?.value || 'unknown',
      campaignName: row.dimensionValues[1]?.value || 'Unknown',
      sessions: parseInt(row.metricValues[0]?.value || 0),
      users: parseInt(row.metricValues[1]?.value || 0),
      engagedSessions: parseInt(row.metricValues[2]?.value || 0),
      engagementRate: parseFloat(row.metricValues[3]?.value || 0) * 100,
      bounceRate: parseFloat(row.metricValues[4]?.value || 0) * 100,
      conversions: parseInt(row.metricValues[5]?.value || 0)
    })) || []

    return pages
  }

  /**
   * Generate comprehensive UTM performance report
   */
  async generateReport(daysBack = 30) {
    console.log('\n' + '='.repeat(80))
    console.log('📊 UTM PERFORMANCE ANALYSIS REPORT')
    console.log('='.repeat(80))
    console.log(`Period: Last ${daysBack} days`)
    console.log(`Generated: ${new Date().toLocaleString()}`)

    const campaigns = await this.getCampaignPerformance(daysBack)
    const creatives = await this.getAdCreativePerformance(daysBack)
    const adGroups = await this.getAdGroupPerformance(daysBack)
    const keywords = await this.getKeywordPerformance(daysBack)
    const devices = await this.getDevicePerformance(daysBack)
    const landingPages = await this.getLandingPagePerformance(daysBack)

    // Campaign Performance Summary
    console.log('\n' + '─'.repeat(80))
    console.log('🎯 CAMPAIGN PERFORMANCE')
    console.log('─'.repeat(80))
    
    if (campaigns.length === 0) {
      console.log('   No paid campaign data found for this period.')
      console.log('   Note: Data will appear once campaigns start running with the tracking template.')
    } else {
      campaigns.slice(0, 10).forEach((c, i) => {
        console.log(`\n${i + 1}. ${c.campaignName} (ID: ${c.campaignId})`)
        console.log(`   Sessions: ${c.sessions.toLocaleString()} | Users: ${c.users.toLocaleString()}`)
        console.log(`   Engagement: ${c.engagementRate.toFixed(1)}% | Bounce: ${c.bounceRate.toFixed(1)}%`)
        console.log(`   Conversions: ${c.conversions} | Conv. Rate: ${c.sessions > 0 ? (c.conversions / c.sessions * 100).toFixed(2) : 0}%`)
      })
    }

    // Ad Creative Performance
    console.log('\n' + '─'.repeat(80))
    console.log('🎨 TOP AD CREATIVES (by Sessions)')
    console.log('─'.repeat(80))
    
    if (creatives.length === 0) {
      console.log('   No ad creative data found.')
      console.log('   Note: {creative} parameter from tracking template maps to utm_content.')
    } else {
      creatives.slice(0, 10).forEach((c, i) => {
        console.log(`\n${i + 1}. Creative ID: ${c.creativeId}`)
        console.log(`   Campaign: ${c.campaignName}`)
        console.log(`   Sessions: ${c.sessions.toLocaleString()} | Engagement: ${c.engagementRate.toFixed(1)}%`)
        console.log(`   Conversions: ${c.conversions} | Conv. Rate: ${c.sessions > 0 ? (c.conversions / c.sessions * 100).toFixed(2) : 0}%`)
      })
    }

    // Keyword Performance
    console.log('\n' + '─'.repeat(80))
    console.log('🔑 TOP KEYWORDS (by Sessions)')
    console.log('─'.repeat(80))
    
    if (keywords.length === 0) {
      console.log('   No keyword data found.')
    } else {
      keywords.slice(0, 15).forEach((k, i) => {
        console.log(`${i + 1}. "${k.keyword}" → ${k.sessions} sessions, ${k.conversions} conv, ${k.engagementRate.toFixed(1)}% engaged`)
      })
    }

    // Device Performance
    console.log('\n' + '─'.repeat(80))
    console.log('📱 DEVICE PERFORMANCE')
    console.log('─'.repeat(80))
    
    const deviceTotals = devices.reduce((acc, d) => {
      if (!acc[d.device]) {
        acc[d.device] = { sessions: 0, conversions: 0, engagedSessions: 0 }
      }
      acc[d.device].sessions += d.sessions
      acc[d.device].conversions += d.conversions
      acc[d.device].engagedSessions += d.engagedSessions
      return acc
    }, {})

    Object.entries(deviceTotals).forEach(([device, data]) => {
      console.log(`   ${device}: ${data.sessions.toLocaleString()} sessions, ${data.conversions} conversions, ${data.sessions > 0 ? (data.engagedSessions / data.sessions * 100).toFixed(1) : 0}% engaged`)
    })

    // Landing Page Performance
    console.log('\n' + '─'.repeat(80))
    console.log('🌐 TOP LANDING PAGES (by Conversions)')
    console.log('─'.repeat(80))
    
    const topPages = landingPages.sort((a, b) => b.conversions - a.conversions).slice(0, 10)
    topPages.forEach((p, i) => {
      console.log(`${i + 1}. ${p.landingPage}`)
      console.log(`   ${p.sessions} sessions → ${p.conversions} conv (${p.sessions > 0 ? (p.conversions / p.sessions * 100).toFixed(2) : 0}%)`)
    })

    // Best Performers Summary
    console.log('\n' + '='.repeat(80))
    console.log('⭐ BEST PERFORMERS')
    console.log('='.repeat(80))

    const bestCampaign = campaigns.sort((a, b) => b.conversions - a.conversions)[0]
    const bestCreative = creatives.sort((a, b) => b.conversions - a.conversions)[0]
    const bestKeyword = keywords.sort((a, b) => b.conversions - a.conversions)[0]
    const bestPage = landingPages.sort((a, b) => b.conversions - a.conversions)[0]

    if (bestCampaign) console.log(`   🎯 Campaign: ${bestCampaign.campaignName} (${bestCampaign.conversions} conversions)`)
    if (bestCreative) console.log(`   🎨 Creative: ID ${bestCreative.creativeId} (${bestCreative.conversions} conversions)`)
    if (bestKeyword) console.log(`   🔑 Keyword: "${bestKeyword.keyword}" (${bestKeyword.conversions} conversions)`)
    if (bestPage) console.log(`   🌐 Landing Page: ${bestPage.landingPage} (${bestPage.conversions} conversions)`)

    // Save report
    const report = {
      generatedAt: new Date().toISOString(),
      period: `${daysBack} days`,
      campaigns,
      creatives,
      adGroups,
      keywords,
      devices: deviceTotals,
      landingPages,
      bestPerformers: {
        campaign: bestCampaign,
        creative: bestCreative,
        keyword: bestKeyword,
        landingPage: bestPage
      }
    }

    const reportsDir = path.join(__dirname, '../../reports/google-ads')
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true })
    }

    const reportPath = path.join(reportsDir, `utm-analysis-${new Date().toISOString().split('T')[0]}.json`)
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`\n✅ Report saved: ${reportPath}`)

    return report
  }
}

module.exports = UTMPerformanceAnalyzer

// CLI usage
if (require.main === module) {
  const analyzer = new UTMPerformanceAnalyzer()
  const daysBack = parseInt(process.argv[2]) || 30

  analyzer.generateReport(daysBack)
    .then(() => {
      console.log('\n✅ Analysis complete!')
    })
    .catch(error => {
      console.error('❌ Error:', error.message)
      process.exit(1)
    })
}
