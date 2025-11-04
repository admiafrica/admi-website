/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
require('dotenv').config()

/**
 * Enhanced GA4 Paid Advertising Analysis
 * Extract paid advertising insights from existing GA4 data
 * This helps understand paid traffic patterns without direct Google Ads API access
 */

class EnhancedGA4PaidAnalysis {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID || '250948607'
  }

  async initializeClient() {
    try {
      this.client = new BetaAnalyticsDataClient({
        keyFilename: 'ga-service-account.json'
      })
      console.log('✅ GA4 client initialized for paid advertising analysis')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize GA4 client:', error.message)
      return false
    }
  }

  async getPaidTrafficAnalysis(startDate, endDate) {
    console.log(`📊 Analyzing paid traffic: ${startDate} to ${endDate}`)
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' },
          { name: 'date' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'conversions' }
        ],
        dimensionFilter: {
          orGroup: {
            expressions: [
              {
                filter: {
                  fieldName: 'sessionMedium',
                  stringFilter: {
                    matchType: 'CONTAINS',
                    value: 'cpc'
                  }
                }
              },
              {
                filter: {
                  fieldName: 'sessionMedium',
                  stringFilter: {
                    matchType: 'CONTAINS',
                    value: 'ppc'
                  }
                }
              },
              {
                filter: {
                  fieldName: 'sessionMedium',
                  stringFilter: {
                    matchType: 'CONTAINS',
                    value: 'adwords'
                  }
                }
              },
              {
                filter: {
                  fieldName: 'sessionMedium',
                  stringFilter: {
                    matchType: 'CONTAINS',
                    value: 'paid'
                  }
                }
              },
              {
                filter: {
                  fieldName: 'sessionSource',
                  stringFilter: {
                    matchType: 'CONTAINS',
                    value: 'google'
                  }
                }
              }
            ]
          }
        },
        orderBys: [
          {
            metric: { metricName: 'sessions' },
            desc: true
          }
        ],
        limit: 1000
      })

      return this.processPaidTrafficData(response)
    } catch (error) {
      console.error('❌ Error fetching paid traffic data:', error.message)
      return null
    }
  }

  processPaidTrafficData(response) {
    if (!response.rows || response.rows.length === 0) {
      return {
        totalSessions: 0,
        campaigns: [],
        sources: [],
        monthlyBreakdown: {},
        summary: 'No paid traffic data found'
      }
    }

    const campaigns = {}
    const sources = {}
    const monthlyBreakdown = {}
    let totalSessions = 0
    let totalUsers = 0
    let totalPageViews = 0
    let totalConversions = 0

    response.rows.forEach(row => {
      const source = row.dimensionValues[0].value
      const medium = row.dimensionValues[1].value
      const campaign = row.dimensionValues[2].value
      const date = row.dimensionValues[3].value
      
      const sessions = parseInt(row.metricValues[0].value || 0)
      const users = parseInt(row.metricValues[1].value || 0)
      const pageViews = parseInt(row.metricValues[2].value || 0)
      const avgDuration = parseFloat(row.metricValues[3].value || 0)
      const bounceRate = parseFloat(row.metricValues[4].value || 0)
      const conversions = parseFloat(row.metricValues[5].value || 0)

      totalSessions += sessions
      totalUsers += users
      totalPageViews += pageViews
      totalConversions += conversions

      // Track campaigns
      if (!campaigns[campaign]) {
        campaigns[campaign] = {
          name: campaign,
          source,
          medium,
          sessions: 0,
          users: 0,
          pageViews: 0,
          conversions: 0,
          avgDuration: 0,
          bounceRate: 0,
          records: 0
        }
      }
      campaigns[campaign].sessions += sessions
      campaigns[campaign].users += users
      campaigns[campaign].pageViews += pageViews
      campaigns[campaign].conversions += conversions
      campaigns[campaign].avgDuration += avgDuration
      campaigns[campaign].bounceRate += bounceRate
      campaigns[campaign].records++

      // Track sources
      const sourceKey = `${source}/${medium}`
      if (!sources[sourceKey]) {
        sources[sourceKey] = {
          source,
          medium,
          sessions: 0,
          users: 0,
          conversions: 0
        }
      }
      sources[sourceKey].sessions += sessions
      sources[sourceKey].users += users
      sources[sourceKey].conversions += conversions

      // Monthly breakdown
      const month = date.substring(0, 7) // YYYY-MM
      if (!monthlyBreakdown[month]) {
        monthlyBreakdown[month] = {
          sessions: 0,
          users: 0,
          conversions: 0
        }
      }
      monthlyBreakdown[month].sessions += sessions
      monthlyBreakdown[month].users += users
      monthlyBreakdown[month].conversions += conversions
    })

    // Calculate averages for campaigns
    Object.values(campaigns).forEach(campaign => {
      if (campaign.records > 0) {
        campaign.avgDuration = campaign.avgDuration / campaign.records
        campaign.bounceRate = campaign.bounceRate / campaign.records
      }
    })

    return {
      totalSessions,
      totalUsers,
      totalPageViews,
      totalConversions,
      campaigns: Object.values(campaigns).sort((a, b) => b.sessions - a.sessions),
      sources: Object.values(sources).sort((a, b) => b.sessions - a.sessions),
      monthlyBreakdown,
      summary: `Found ${totalSessions.toLocaleString()} paid sessions across ${Object.keys(campaigns).length} campaigns`
    }
  }

  async getSourceMediumAnalysis(startDate, endDate) {
    console.log(`🔍 Analyzing all traffic sources: ${startDate} to ${endDate}`)
    
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'conversions' }
        ],
        orderBys: [
          {
            metric: { metricName: 'sessions' },
            desc: true
          }
        ],
        limit: 100
      })

      const allSources = []
      let totalSessions = 0

      response.rows?.forEach(row => {
        const source = row.dimensionValues[0].value
        const medium = row.dimensionValues[1].value
        const sessions = parseInt(row.metricValues[0].value || 0)
        const users = parseInt(row.metricValues[1].value || 0)
        const conversions = parseFloat(row.metricValues[2].value || 0)

        totalSessions += sessions

        // Categorize traffic type
        let trafficType = 'Other'
        if (medium === 'organic') {
          trafficType = 'Organic'
        } else if (medium === '(none)' && source === '(direct)') {
          trafficType = 'Direct'
        } else if (['cpc', 'ppc', 'adwords', 'paid'].includes(medium.toLowerCase())) {
          trafficType = 'Paid'
        } else if (medium === 'referral') {
          trafficType = 'Referral'
        } else if (medium === 'social') {
          trafficType = 'Social'
        } else if (medium === 'email') {
          trafficType = 'Email'
        }

        allSources.push({
          source,
          medium,
          trafficType,
          sessions,
          users,
          conversions,
          percentage: 0 // Will calculate after processing all rows
        })
      })

      // Calculate percentages
      allSources.forEach(source => {
        source.percentage = ((source.sessions / totalSessions) * 100).toFixed(2)
      })

      // Group by traffic type
      const trafficTypesSummary = {}
      allSources.forEach(source => {
        if (!trafficTypesSummary[source.trafficType]) {
          trafficTypesSummary[source.trafficType] = {
            sessions: 0,
            users: 0,
            conversions: 0,
            percentage: 0
          }
        }
        trafficTypesSummary[source.trafficType].sessions += source.sessions
        trafficTypesSummary[source.trafficType].users += source.users
        trafficTypesSummary[source.trafficType].conversions += source.conversions
      })

      // Calculate traffic type percentages
      Object.values(trafficTypesSummary).forEach(type => {
        type.percentage = ((type.sessions / totalSessions) * 100).toFixed(2)
      })

      return {
        totalSessions,
        allSources,
        trafficTypesSummary,
        paidTrafficSources: allSources.filter(s => s.trafficType === 'Paid')
      }
    } catch (error) {
      console.error('❌ Error fetching source/medium data:', error.message)
      return null
    }
  }

  async runEnhancedPaidAnalysis() {
    console.log('🚀 Starting Enhanced GA4 Paid Advertising Analysis...')
    console.log('Extracting paid advertising insights from GA4 data\n')
    
    const clientReady = await this.initializeClient()
    if (!clientReady) {
      return null
    }

    // Analyze different periods
    const periods = [
      { name: '2024 Full Year', startDate: '2024-01-01', endDate: '2024-12-31' },
      { name: '2025 Current', startDate: '2025-01-01', endDate: '2025-11-03' },
      { name: 'June-July 2025', startDate: '2025-06-01', endDate: '2025-07-03' },
      { name: 'Oct-Nov 2025', startDate: '2025-10-01', endDate: '2025-11-03' }
    ]

    const results = {}

    for (const period of periods) {
      console.log(`\n📊 Analyzing period: ${period.name}`)
      
      // Get paid traffic analysis
      const paidAnalysis = await this.getPaidTrafficAnalysis(period.startDate, period.endDate)
      
      // Get overall source/medium analysis
      const sourceAnalysis = await this.getSourceMediumAnalysis(period.startDate, period.endDate)
      
      results[period.name] = {
        period,
        paidAnalysis,
        sourceAnalysis,
        insights: this.generatePeriodInsights(paidAnalysis, sourceAnalysis)
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Generate comparative analysis
    const comparativeAnalysis = this.generateComparativeAnalysis(results)

    const finalResults = {
      generatedAt: new Date().toISOString(),
      propertyId: this.propertyId,
      periods: results,
      comparativeAnalysis,
      recommendations: this.generateRecommendations(results, comparativeAnalysis)
    }

    // Save results
    fs.writeFileSync('admi-enhanced-paid-analysis.json', JSON.stringify(finalResults, null, 2))
    console.log('\n✅ Enhanced paid analysis saved to: admi-enhanced-paid-analysis.json')
    
    return finalResults
  }

  generatePeriodInsights(paidAnalysis, sourceAnalysis) {
    const insights = []

    if (paidAnalysis && paidAnalysis.totalSessions > 0) {
      insights.push(`Found ${paidAnalysis.totalSessions.toLocaleString()} paid sessions`)
      insights.push(`Top paid campaign: ${paidAnalysis.campaigns[0]?.name || 'Unknown'}`)
      
      if (paidAnalysis.totalConversions > 0) {
        const conversionRate = ((paidAnalysis.totalConversions / paidAnalysis.totalSessions) * 100).toFixed(2)
        insights.push(`Paid conversion rate: ${conversionRate}%`)
      }
    } else {
      insights.push('No significant paid traffic detected')
    }

    if (sourceAnalysis) {
      const paidPercentage = sourceAnalysis.trafficTypesSummary.Paid?.percentage || 0
      insights.push(`Paid traffic represents ${paidPercentage}% of total traffic`)
      
      const organicPercentage = sourceAnalysis.trafficTypesSummary.Organic?.percentage || 0
      insights.push(`Organic traffic represents ${organicPercentage}% of total traffic`)
    }

    return insights
  }

  generateComparativeAnalysis(results) {
    const periods = Object.keys(results)
    const analysis = {
      paidTrafficTrends: {},
      organicVsPaidShift: {},
      campaignPerformanceChanges: {}
    }

    // Compare paid traffic percentages
    periods.forEach(period => {
      const paidPercentage = results[period].sourceAnalysis?.trafficTypesSummary.Paid?.percentage || 0
      const organicPercentage = results[period].sourceAnalysis?.trafficTypesSummary.Organic?.percentage || 0
      
      analysis.paidTrafficTrends[period] = parseFloat(paidPercentage)
      analysis.organicVsPaidShift[period] = {
        paid: parseFloat(paidPercentage),
        organic: parseFloat(organicPercentage)
      }
    })

    return analysis
  }

  generateRecommendations(results, comparativeAnalysis) {
    const recommendations = []

    // Check if 2024 had high paid traffic
    const paid2024 = comparativeAnalysis.paidTrafficTrends['2024 Full Year'] || 0
    const paid2025 = comparativeAnalysis.paidTrafficTrends['2025 Current'] || 0

    if (paid2024 > 20 && paid2025 < 5) {
      recommendations.push({
        priority: 'CRITICAL',
        action: 'Restart paid advertising campaigns',
        reason: `Paid traffic dropped from ${paid2024}% to ${paid2025}% - major volume loss driver`
      })
    }

    if (paid2025 < 10) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Implement balanced traffic strategy',
        reason: 'Current paid traffic too low for sustainable volume growth'
      })
    }

    recommendations.push({
      priority: 'MEDIUM',
      action: 'Set up Google Ads API integration',
      reason: 'Need detailed campaign data for optimization'
    })

    return recommendations
  }
}

// Run the enhanced paid analysis
if (require.main === module) {
  const analyzer = new EnhancedGA4PaidAnalysis()
  analyzer.runEnhancedPaidAnalysis()
    .then((results) => {
      if (results) {
        console.log('\n🎉 Enhanced paid analysis completed!')
        console.log('Check admi-enhanced-paid-analysis.json for detailed insights')
      } else {
        console.log('\n❌ Enhanced paid analysis failed')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Enhanced paid analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = EnhancedGA4PaidAnalysis
