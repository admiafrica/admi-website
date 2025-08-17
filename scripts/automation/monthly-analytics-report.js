/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Monthly Analytics Report Generator
 * Comprehensive analysis of website performance and content optimization results
 */

class MonthlyAnalyticsReporter {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_OPENAI_API_KEY
    this.openai = new OpenAI({
      apiKey: this.openaiApiKey
    })

    this.baseUrl = process.env.ANALYTICS_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
  }

  async generateMonthlyReport() {
    try {
      console.log('📊 Generating Monthly Analytics Report...')

      // Fetch comprehensive analytics data
      const analyticsData = await this.fetchComprehensiveAnalytics()

      // Analyze content optimization results
      const optimizationResults = await this.analyzeOptimizationResults()

      // Generate insights and recommendations
      const insights = await this.generateInsights(analyticsData, optimizationResults)

      // Create comprehensive report
      const report = await this.createComprehensiveReport(analyticsData, optimizationResults, insights)

      // Save report
      const reportPath = await this.saveReport(report)

      console.log(`✅ Monthly report generated: ${reportPath}`)
      return reportPath
    } catch (error) {
      console.error('❌ Error generating monthly report:', error.message)
      return null
    }
  }

  async fetchComprehensiveAnalytics() {
    try {
      const [searchQueries, faqMetrics, optimizationReport] = await Promise.all([
        axios.get(`${this.baseUrl}/api/analytics/search-queries?limit=100&refresh=true`),
        axios.get(`${this.baseUrl}/api/analytics/faq-metrics?refresh=true`),
        axios.get(`${this.baseUrl}/api/analytics/optimization-report`)
      ])

      return {
        searchQueries: searchQueries.data.success ? searchQueries.data.data.searchQueries : [],
        faqMetrics: faqMetrics.data.success ? faqMetrics.data.data : {},
        optimizationReport: optimizationReport.data.success ? optimizationReport.data.data : {},
        fetchedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching analytics:', error.message)
      return null
    }
  }

  async analyzeOptimizationResults() {
    try {
      // Read optimization logs from the past month
      const logsDir = path.join(__dirname, '../../logs/content-optimization/')
      if (!fs.existsSync(logsDir)) return null

      const logFiles = fs
        .readdirSync(logsDir)
        .filter((f) => f.includes('optimization') && f.endsWith('.log'))
        .map((f) => ({
          file: f,
          path: path.join(logsDir, f),
          date: fs.statSync(path.join(logsDir, f)).mtime
        }))
        .filter((f) => {
          const oneMonthAgo = new Date()
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
          return f.date > oneMonthAgo
        })
        .sort((a, b) => b.date - a.date)

      let totalOptimizations = 0
      let faqsGenerated = 0
      let articlesGenerated = 0
      let contentfulUploads = 0

      // Parse log files to extract optimization results
      for (const logFile of logFiles) {
        try {
          const logContent = fs.readFileSync(logFile.path, 'utf8')

          if (logContent.includes('Optimization Complete')) {
            totalOptimizations++
          }

          // Count generated content
          const faqMatches = logContent.match(/FAQs Generated: (\d+)/g)
          if (faqMatches) {
            faqsGenerated += faqMatches.reduce((sum, match) => sum + parseInt(match.match(/\d+/)[0]), 0)
          }

          const articleMatches = logContent.match(/Articles Generated: (\d+)/g)
          if (articleMatches) {
            articlesGenerated += articleMatches.reduce((sum, match) => sum + parseInt(match.match(/\d+/)[0]), 0)
          }

          const uploadMatches = logContent.match(/Contentful Uploads: (\d+)/g)
          if (uploadMatches) {
            contentfulUploads += uploadMatches.reduce((sum, match) => sum + parseInt(match.match(/\d+/)[0]), 0)
          }
        } catch (error) {
          // Skip problematic log files
        }
      }

      return {
        totalOptimizations,
        faqsGenerated,
        articlesGenerated,
        contentfulUploads,
        logFilesParsed: logFiles.length
      }
    } catch (error) {
      console.error('Error analyzing optimization results:', error.message)
      return null
    }
  }

  async generateInsights(analyticsData, optimizationResults) {
    try {
      const prompt = `As ADMI's data analyst, analyze this monthly performance data and provide actionable insights.

ANALYTICS DATA:
- Total Search Queries: ${analyticsData.searchQueries?.length || 0}
- FAQ Page Views: ${analyticsData.faqMetrics?.pageViews || 0}
- Users: ${analyticsData.faqMetrics?.users || 0}
- Bounce Rate: ${analyticsData.faqMetrics?.bounceRate || 0}%
- Conversion Rate: ${analyticsData.faqMetrics?.conversionFunnel?.faqToCourseConversionRate || 0}%

CONTENT OPTIMIZATION RESULTS:
- Total Optimizations Run: ${optimizationResults?.totalOptimizations || 0}
- FAQs Generated: ${optimizationResults?.faqsGenerated || 0}
- Articles Generated: ${optimizationResults?.articlesGenerated || 0}
- Content Uploaded: ${optimizationResults?.contentfulUploads || 0}

TOP SEARCH QUERIES:
${
  analyticsData.searchQueries
    ?.slice(0, 10)
    .map((q, i) => `${i + 1}. "${q.query}" (${q.sessions} sessions)`)
    .join('\n') || 'No data'
}

Provide:
1. Key performance insights
2. Content optimization effectiveness
3. User behavior trends
4. Specific recommendations for next month
5. Areas needing attention

Be data-driven, actionable, and focus on improving student enrollment.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating insights:', error.message)
      return 'Unable to generate insights due to API error.'
    }
  }

  async createComprehensiveReport(analyticsData, optimizationResults, insights) {
    const currentDate = new Date()
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    const report = {
      title: `ADMI Website Analytics & Content Optimization Report - ${monthYear}`,
      generatedAt: currentDate.toISOString(),
      period: monthYear,

      executiveSummary: {
        totalPageViews: analyticsData.faqMetrics?.pageViews || 0,
        totalUsers: analyticsData.faqMetrics?.users || 0,
        bounceRate: analyticsData.faqMetrics?.bounceRate || 0,
        conversionRate: analyticsData.faqMetrics?.conversionFunnel?.faqToCourseConversionRate || 0,
        contentGenerated: (optimizationResults?.faqsGenerated || 0) + (optimizationResults?.articlesGenerated || 0)
      },

      searchAnalytics: {
        totalQueries: analyticsData.searchQueries?.length || 0,
        topQueries: analyticsData.searchQueries?.slice(0, 15) || [],
        averageSessionsPerQuery:
          analyticsData.searchQueries?.length > 0
            ? Math.round(
                analyticsData.searchQueries.reduce((sum, q) => sum + (q.sessions || 0), 0) /
                  analyticsData.searchQueries.length
              )
            : 0
      },

      contentOptimization: {
        optimizationsRun: optimizationResults?.totalOptimizations || 0,
        faqsGenerated: optimizationResults?.faqsGenerated || 0,
        articlesGenerated: optimizationResults?.articlesGenerated || 0,
        contentfulUploads: optimizationResults?.contentfulUploads || 0,
        automationEffectiveness: optimizationResults?.contentfulUploads > 0 ? 'High' : 'Needs Review'
      },

      performanceMetrics: {
        userEngagement: {
          avgSessionDuration: analyticsData.faqMetrics?.averageSessionDuration || 0,
          bounceRate: analyticsData.faqMetrics?.bounceRate || 0,
          pagesPerSession: 'N/A' // Would need additional API
        },
        conversionMetrics: {
          faqToCoursePage: analyticsData.faqMetrics?.conversionFunnel?.faqToCourseConversionRate || 0,
          totalConversions: analyticsData.faqMetrics?.conversionFunnel?.courseUsers || 0
        }
      },

      insights: insights,

      recommendations: this.generateRecommendations(analyticsData, optimizationResults),

      nextMonthGoals: [
        'Increase FAQ to course conversion rate by 5%',
        'Reduce bounce rate by 3%',
        'Generate content for 20+ new search queries',
        'Improve average session duration by 15 seconds'
      ]
    }

    return report
  }

  generateRecommendations(analyticsData, optimizationResults) {
    const recommendations = []

    // Based on bounce rate
    if (analyticsData.faqMetrics?.bounceRate > 50) {
      recommendations.push({
        priority: 'High',
        area: 'User Experience',
        recommendation: 'Improve FAQ page loading speed and content relevance to reduce bounce rate',
        action: 'Optimize images, improve content matching for search queries'
      })
    }

    // Based on conversion rate
    if (analyticsData.faqMetrics?.conversionFunnel?.faqToCourseConversionRate < 35) {
      recommendations.push({
        priority: 'High',
        area: 'Conversions',
        recommendation: 'Strengthen call-to-actions in FAQ responses',
        action: 'Add more course enrollment links and improve CTA placement'
      })
    }

    // Based on content automation
    if (optimizationResults?.faqsGenerated < 10) {
      recommendations.push({
        priority: 'Medium',
        area: 'Content Automation',
        recommendation: 'Increase automated content generation frequency',
        action: 'Review search query thresholds and adjust automation settings'
      })
    }

    // Based on search queries
    if (analyticsData.searchQueries?.length > 50) {
      recommendations.push({
        priority: 'Medium',
        area: 'Content Coverage',
        recommendation: 'Many search queries indicate content gaps',
        action: 'Generate FAQs for queries with 3+ sessions, articles for 15+ sessions'
      })
    }

    return recommendations
  }

  async saveReport(report) {
    try {
      const timestamp = new Date().toISOString().split('T')[0]
      const reportsDir = path.join(__dirname, '../../reports/monthly/')

      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true })
      }

      // Save JSON report
      const jsonPath = path.join(reportsDir, `monthly-report-${timestamp}.json`)
      fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2))

      // Save human-readable report
      const textReport = this.formatReportAsText(report)
      const textPath = path.join(reportsDir, `monthly-report-${timestamp}.md`)
      fs.writeFileSync(textPath, textReport)

      console.log('📊 Reports saved:')
      console.log(`   JSON: ${jsonPath}`)
      console.log(`   Markdown: ${textPath}`)

      return { json: jsonPath, markdown: textPath }
    } catch (error) {
      console.error('Error saving report:', error.message)
      return null
    }
  }

  formatReportAsText(report) {
    return `# ${report.title}

Generated: ${new Date(report.generatedAt).toLocaleString()}

## Executive Summary

- **Page Views**: ${report.executiveSummary.totalPageViews.toLocaleString()}
- **Users**: ${report.executiveSummary.totalUsers.toLocaleString()}
- **Bounce Rate**: ${report.executiveSummary.bounceRate}%
- **Conversion Rate**: ${report.executiveSummary.conversionRate}%
- **Content Generated**: ${report.executiveSummary.contentGenerated} pieces

## Search Analytics

- **Total Queries**: ${report.searchAnalytics.totalQueries}
- **Average Sessions/Query**: ${report.searchAnalytics.averageSessionsPerQuery}

### Top Search Queries
${report.searchAnalytics.topQueries
  .map((q, i) => `${i + 1}. "${q.query}" - ${q.sessions} sessions, ${q.users} users`)
  .join('\n')}

## Content Optimization Results

- **Optimizations Run**: ${report.contentOptimization.optimizationsRun}
- **FAQs Generated**: ${report.contentOptimization.faqsGenerated}
- **Articles Generated**: ${report.contentOptimization.articlesGenerated}
- **Contentful Uploads**: ${report.contentOptimization.contentfulUploads}
- **Automation Effectiveness**: ${report.contentOptimization.automationEffectiveness}

## Performance Metrics

### User Engagement
- **Avg Session Duration**: ${report.performanceMetrics.userEngagement.avgSessionDuration}s
- **Bounce Rate**: ${report.performanceMetrics.userEngagement.bounceRate}%

### Conversions
- **FAQ to Course Page**: ${report.performanceMetrics.conversionMetrics.faqToCoursePage}%
- **Total Conversions**: ${report.performanceMetrics.conversionMetrics.totalConversions}

## AI-Generated Insights

${report.insights}

## Recommendations

${report.recommendations
  .map(
    (r) => `### ${r.area} (${r.priority} Priority)\n**Recommendation**: ${r.recommendation}\n**Action**: ${r.action}`
  )
  .join('\n\n')}

## Next Month Goals

${report.nextMonthGoals.map((goal) => `- ${goal}`).join('\n')}

---
*Report generated automatically by ADMI Content Optimization System*`
  }
}

// CLI usage
if (require.main === module) {
  const reporter = new MonthlyAnalyticsReporter()

  reporter
    .generateMonthlyReport()
    .then((result) => {
      if (result) {
        console.log('\n🎉 Monthly analytics report generated successfully!')
        process.exit(0)
      } else {
        console.log('\n❌ Failed to generate monthly report')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

module.exports = MonthlyAnalyticsReporter
