/* eslint-disable @typescript-eslint/no-var-requires */
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * ADMI Historical Analysis 2017-2025
 * Comprehensive analysis to identify gaps and recovery opportunities
 */

class HistoricalAnalyzer {
  constructor() {
    this.client = null
    this.propertyId = process.env.GA4_PROPERTY_ID || '250948607'
    this.years = [2017, 2018, 2019, 2024, 2025]
  }

  async initializeClient() {
    try {
      this.client = new BetaAnalyticsDataClient({
        keyFilename: 'ga-service-account.json'
      })
      console.log('✅ Google Analytics client initialized')
    } catch (error) {
      console.error('❌ Failed to initialize GA client:', error.message)
      throw error
    }
  }

  async getYearlyData(year) {
    console.log(`📊 Fetching data for ${year}...`)
    
    const startDate = `${year}-01-01`
    const endDate = `${year}-12-31`
    
    try {
      // Get traffic sources
      const [trafficResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 100
      })

      // Get monthly breakdown
      const [monthlyResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'yearMonth' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' }
        ],
        orderBys: [{ dimension: { dimensionName: 'yearMonth' } }]
      })

      // Get device data
      const [deviceResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
      })

      // Get geographic data
      const [geoResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 20
      })

      // Get overall metrics
      const [overallResponse] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'screenPageViewsPerSession' }
        ]
      })

      return this.processYearlyData(year, {
        traffic: trafficResponse,
        monthly: monthlyResponse,
        device: deviceResponse,
        geo: geoResponse,
        overall: overallResponse
      })

    } catch (error) {
      console.error(`❌ Error fetching data for ${year}:`, error.message)
      // Return null for years with no data
      return {
        year,
        hasData: false,
        error: error.message,
        totalSessions: 0,
        organicPercentage: 0,
        directPercentage: 0,
        paidPercentage: 0
      }
    }
  }

  processYearlyData(year, responses) {
    const { traffic, monthly, device, geo, overall } = responses

    // Process traffic sources
    const sources = traffic.rows?.map(row => ({
      source: row.dimensionValues[0].value,
      medium: row.dimensionValues[1].value,
      campaign: row.dimensionValues[2].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
      pageviews: parseInt(row.metricValues[2].value),
      avgSessionDuration: parseFloat(row.metricValues[3].value),
      bounceRate: parseFloat(row.metricValues[4].value)
    })) || []

    const totalSessions = sources.reduce((sum, s) => sum + s.sessions, 0)

    // Categorize traffic
    const organicSessions = sources.filter(s => s.medium === 'organic').reduce((sum, s) => sum + s.sessions, 0)
    const directSessions = sources.filter(s => s.source === '(direct)' && s.medium === '(none)').reduce((sum, s) => sum + s.sessions, 0)
    const paidSessions = sources.filter(s => ['cpc', 'ppc', 'adwords'].includes(s.medium)).reduce((sum, s) => sum + s.sessions, 0)
    const socialSessions = sources.filter(s => s.medium === 'social').reduce((sum, s) => sum + s.sessions, 0)
    const referralSessions = sources.filter(s => s.medium === 'referral').reduce((sum, s) => sum + s.sessions, 0)

    // Process monthly data
    const monthlyData = monthly.rows?.map(row => ({
      month: row.dimensionValues[0].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
      pageviews: parseInt(row.metricValues[2].value)
    })) || []

    // Process device data
    const devices = device.rows?.map(row => ({
      device: row.dimensionValues[0].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
      avgSessionDuration: parseFloat(row.metricValues[2].value),
      bounceRate: parseFloat(row.metricValues[3].value)
    })) || []

    // Process geographic data
    const countries = geo.rows?.map(row => ({
      country: row.dimensionValues[0].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value)
    })) || []

    // Process overall metrics
    const overallMetrics = overall.rows?.[0] ? {
      totalSessions: parseInt(overall.rows[0].metricValues[0].value),
      activeUsers: parseInt(overall.rows[0].metricValues[1].value),
      newUsers: parseInt(overall.rows[0].metricValues[2].value),
      pageViews: parseInt(overall.rows[0].metricValues[3].value),
      avgSessionDuration: parseFloat(overall.rows[0].metricValues[4].value),
      bounceRate: parseFloat(overall.rows[0].metricValues[5].value),
      pagesPerSession: parseFloat(overall.rows[0].metricValues[6].value)
    } : null

    return {
      year,
      hasData: true,
      totalSessions,
      overallMetrics,
      trafficSources: {
        sources: sources.map(s => ({
          ...s,
          percentage: ((s.sessions / totalSessions) * 100).toFixed(2)
        })),
        summary: {
          organic: { sessions: organicSessions, percentage: ((organicSessions / totalSessions) * 100).toFixed(2) },
          direct: { sessions: directSessions, percentage: ((directSessions / totalSessions) * 100).toFixed(2) },
          paid: { sessions: paidSessions, percentage: ((paidSessions / totalSessions) * 100).toFixed(2) },
          social: { sessions: socialSessions, percentage: ((socialSessions / totalSessions) * 100).toFixed(2) },
          referral: { sessions: referralSessions, percentage: ((referralSessions / totalSessions) * 100).toFixed(2) }
        }
      },
      monthlyData,
      devices: devices.map(d => ({
        ...d,
        percentage: ((d.sessions / totalSessions) * 100).toFixed(2)
      })),
      countries: countries.map(c => ({
        ...c,
        percentage: ((c.sessions / totalSessions) * 100).toFixed(2)
      })),
      dailyAverage: Math.round(totalSessions / 365),
      organicPercentage: ((organicSessions / totalSessions) * 100).toFixed(2),
      directPercentage: ((directSessions / totalSessions) * 100).toFixed(2),
      paidPercentage: ((paidSessions / totalSessions) * 100).toFixed(2)
    }
  }

  async runHistoricalAnalysis() {
    console.log('🚀 Starting Historical Analysis 2017-2025...')
    
    await this.initializeClient()

    const yearlyData = {}
    
    // Analyze each year
    for (const year of this.years) {
      try {
        yearlyData[year] = await this.getYearlyData(year)
        
        if (yearlyData[year].hasData) {
          console.log(`✅ ${year}: ${yearlyData[year].totalSessions.toLocaleString()} sessions, ${yearlyData[year].organicPercentage}% organic`)
        } else {
          console.log(`❌ ${year}: No data available`)
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`❌ Failed to analyze ${year}:`, error.message)
        yearlyData[year] = { year, hasData: false, error: error.message }
      }
    }

    // Generate analysis
    const analysis = this.generateGapAnalysis(yearlyData)
    
    const finalData = {
      generatedAt: new Date().toISOString(),
      period: '2017-2025 Historical Analysis',
      yearlyData,
      analysis,
      recommendations: this.generateRecommendations(yearlyData, analysis)
    }

    // Save to file
    const outputPath = 'analytics-historical-2017-2025.json'
    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2))
    
    console.log(`✅ Historical analysis complete! Data saved to: ${outputPath}`)
    
    return finalData
  }

  generateGapAnalysis(yearlyData) {
    const validYears = Object.keys(yearlyData).filter(year => yearlyData[year].hasData)
    
    if (validYears.length === 0) {
      return { error: 'No valid data found for any year' }
    }

    // Find peak performance
    const peakYear = validYears.reduce((peak, year) => 
      yearlyData[year].totalSessions > yearlyData[peak].totalSessions ? year : peak
    )

    const current2025 = yearlyData[2025]
    const peak = yearlyData[peakYear]

    return {
      peakYear: parseInt(peakYear),
      peakSessions: peak.totalSessions,
      current2025Sessions: current2025?.totalSessions || 0,
      sessionGap: peak.totalSessions - (current2025?.totalSessions || 0),
      sessionGapPercentage: (((peak.totalSessions - (current2025?.totalSessions || 0)) / peak.totalSessions) * 100).toFixed(1),
      organicGap: parseFloat(peak.organicPercentage) - parseFloat(current2025?.organicPercentage || 0),
      trends: this.analyzeTrends(yearlyData, validYears),
      keyFindings: this.identifyKeyFindings(yearlyData, validYears)
    }
  }

  analyzeTrends(yearlyData, validYears) {
    const trends = []
    
    for (let i = 1; i < validYears.length; i++) {
      const prevYear = validYears[i-1]
      const currYear = validYears[i]
      const prev = yearlyData[prevYear]
      const curr = yearlyData[currYear]
      
      const sessionChange = ((curr.totalSessions - prev.totalSessions) / prev.totalSessions * 100).toFixed(1)
      const organicChange = (parseFloat(curr.organicPercentage) - parseFloat(prev.organicPercentage)).toFixed(1)
      
      trends.push({
        period: `${prevYear}-${currYear}`,
        sessionChange: parseFloat(sessionChange),
        organicChange: parseFloat(organicChange),
        status: parseFloat(sessionChange) > 0 ? 'growth' : 'decline'
      })
    }
    
    return trends
  }

  identifyKeyFindings(yearlyData, validYears) {
    const findings = []
    
    // Find best and worst performing years
    const sessions = validYears.map(year => ({ year, sessions: yearlyData[year].totalSessions }))
    const bestYear = sessions.reduce((best, curr) => curr.sessions > best.sessions ? curr : best)
    const worstYear = sessions.reduce((worst, curr) => curr.sessions < worst.sessions ? curr : worst)
    
    findings.push(`Best year: ${bestYear.year} with ${bestYear.sessions.toLocaleString()} sessions`)
    findings.push(`Worst year: ${worstYear.year} with ${worstYear.sessions.toLocaleString()} sessions`)
    
    // Analyze organic traffic trends
    const organicTrends = validYears.map(year => ({ 
      year, 
      organic: parseFloat(yearlyData[year].organicPercentage) 
    }))
    const bestOrganic = organicTrends.reduce((best, curr) => curr.organic > best.organic ? curr : best)
    
    findings.push(`Best organic performance: ${bestOrganic.year} with ${bestOrganic.organic}% organic traffic`)
    
    return findings
  }

  generateRecommendations(yearlyData, analysis) {
    const recommendations = []
    
    if (analysis.sessionGap > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Traffic Recovery',
        action: `Recover ${analysis.sessionGap.toLocaleString()} sessions to reach ${analysis.peakYear} peak performance`,
        impact: 'High - Core business metric'
      })
    }
    
    if (analysis.organicGap > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'SEO Recovery',
        action: `Improve organic traffic by ${analysis.organicGap.toFixed(1)} percentage points`,
        impact: 'High - Sustainable growth'
      })
    }
    
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Historical Analysis',
      action: 'Analyze successful strategies from peak performance years',
      impact: 'Medium - Strategic insights'
    })
    
    return recommendations
  }
}

// Run the analysis
if (require.main === module) {
  const analyzer = new HistoricalAnalyzer()
  analyzer.runHistoricalAnalysis()
    .then(() => {
      console.log('🎉 Historical analysis completed successfully!')
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Historical analysis failed:', error.message)
      process.exit(1)
    })
}

module.exports = HistoricalAnalyzer
