/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * FAQ Performance Monitoring System
 *
 * This script provides tools to monitor FAQ engagement, track conversion impact,
 * and generate performance reports for continuous optimization.
 */

/**
 * Sample FAQ engagement metrics (replace with real analytics data when MCP is set up)
 */
const SAMPLE_FAQ_METRICS = {
  mainFAQPage: {
    pageViews: 2450,
    uniqueVisitors: 1820,
    averageTimeOnPage: 185, // seconds
    bounceRate: 42.3, // percentage
    faqExpansions: [
      { question: 'What job opportunities are available for ADMI graduates?', expansions: 456 },
      { question: 'How much does it cost to study a course at ADMI?', expansions: 398 },
      { question: 'What are the admission requirements for ADMI courses?', expansions: 367 },
      { question: 'What are the salary prospects for ADMI graduates in Kenya?', expansions: 298 },
      { question: 'What is the duration of ADMI courses?', expansions: 267 },
      { question: 'Is ADMI accredited and recognized internationally?', expansions: 234 },
      { question: 'Where is ADMI located in Nairobi?', expansions: 189 },
      { question: 'Does ADMI offer scholarships or financial aid?', expansions: 156 }
    ]
  },
  conversionFunnel: {
    faqPageViews: 2450,
    coursePageVisitsFromFAQ: 892, // 36.4%
    applicationStartsFromFAQ: 147, // 6.0%
    applicationCompletionsFromFAQ: 89 // 3.6%
  },
  courseSpecificFAQs: {
    'music-production-diploma': { views: 345, expansions: 178, conversions: 23 },
    'graphic-design-diploma': { views: 298, expansions: 156, conversions: 19 },
    'film-and-television-production-diploma': { views: 267, expansions: 134, conversions: 16 },
    'digital-marketing-certificate': { views: 234, expansions: 123, conversions: 15 },
    'animation-and-motion-graphics-diploma': { views: 189, expansions: 98, conversions: 12 }
  }
}

/**
 * Calculate FAQ performance scores
 */
function calculatePerformanceMetrics(metrics) {
  const mainFAQ = metrics.mainFAQPage
  const funnel = metrics.conversionFunnel

  // Engagement score (0-100)
  const engagementScore = Math.min(
    100,
    (mainFAQ.averageTimeOnPage / 300) * 30 + // Time on page (max 5 min = 30 points)
      ((100 - mainFAQ.bounceRate) / 100) * 25 + // Low bounce rate = 25 points
      (getTotalExpansions(mainFAQ.faqExpansions) / mainFAQ.pageViews) * 45 // Expansion rate = 45 points
  )

  // Conversion score (0-100)
  const conversionScore =
    ((funnel.coursePageVisitsFromFAQ / funnel.faqPageViews) * 40 + // Page visit rate = 40 points
      (funnel.applicationStartsFromFAQ / funnel.faqPageViews) * 35 + // Application start rate = 35 points
      (funnel.applicationCompletionsFromFAQ / funnel.faqPageViews) * 25) * // Completion rate = 25 points
    100

  return {
    engagementScore: Math.round(engagementScore),
    conversionScore: Math.round(conversionScore),
    overallScore: Math.round((engagementScore + conversionScore) / 2)
  }
}

function getTotalExpansions(faqExpansions) {
  return faqExpansions.reduce((total, faq) => total + faq.expansions, 0)
}

/**
 * Generate FAQ performance report
 */
function generatePerformanceReport(metrics) {
  const scores = calculatePerformanceMetrics(metrics)
  const mainFAQ = metrics.mainFAQPage
  const funnel = metrics.conversionFunnel

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      overallScore: scores.overallScore,
      engagementScore: scores.engagementScore,
      conversionScore: scores.conversionScore,
      status: getPerformanceStatus(scores.overallScore)
    },
    engagement: {
      pageViews: mainFAQ.pageViews,
      uniqueVisitors: mainFAQ.uniqueVisitors,
      averageTimeOnPage: `${Math.floor(mainFAQ.averageTimeOnPage / 60)}m ${mainFAQ.averageTimeOnPage % 60}s`,
      bounceRate: `${mainFAQ.bounceRate}%`,
      totalFAQExpansions: getTotalExpansions(mainFAQ.faqExpansions),
      expansionRate: `${((getTotalExpansions(mainFAQ.faqExpansions) / mainFAQ.pageViews) * 100).toFixed(1)}%`
    },
    topPerformingFAQs: mainFAQ.faqExpansions
      .sort((a, b) => b.expansions - a.expansions)
      .slice(0, 5)
      .map((faq, index) => ({
        rank: index + 1,
        question: faq.question,
        expansions: faq.expansions,
        expansionRate: `${((faq.expansions / mainFAQ.pageViews) * 100).toFixed(1)}%`
      })),
    conversionFunnel: {
      faqPageViews: funnel.faqPageViews,
      coursePageVisits: `${funnel.coursePageVisitsFromFAQ} (${((funnel.coursePageVisitsFromFAQ / funnel.faqPageViews) * 100).toFixed(1)}%)`,
      applicationStarts: `${funnel.applicationStartsFromFAQ} (${((funnel.applicationStartsFromFAQ / funnel.faqPageViews) * 100).toFixed(1)}%)`,
      applicationCompletions: `${funnel.applicationCompletionsFromFAQ} (${((funnel.applicationCompletionsFromFAQ / funnel.faqPageViews) * 100).toFixed(1)}%)`
    },
    courseSpecificPerformance: Object.entries(metrics.courseSpecificFAQs)
      .map(([courseSlug, data]) => ({
        course: courseSlug,
        views: data.views,
        expansions: data.expansions,
        conversions: data.conversions,
        conversionRate: `${((data.conversions / data.views) * 100).toFixed(1)}%`
      }))
      .sort((a, b) => b.conversions - a.conversions),
    recommendations: generateRecommendations(metrics, scores)
  }

  return report
}

function getPerformanceStatus(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Average'
  if (score >= 35) return 'Below Average'
  return 'Needs Improvement'
}

/**
 * Generate optimization recommendations based on performance data
 */
function generateRecommendations(metrics, scores) {
  const recommendations = []
  const mainFAQ = metrics.mainFAQPage
  const funnel = metrics.conversionFunnel

  // Engagement recommendations
  if (scores.engagementScore < 70) {
    if (mainFAQ.bounceRate > 50) {
      recommendations.push({
        type: 'engagement',
        priority: 'high',
        issue: 'High bounce rate',
        recommendation: 'Improve FAQ page loading speed and add compelling introduction text'
      })
    }

    if (mainFAQ.averageTimeOnPage < 120) {
      recommendations.push({
        type: 'engagement',
        priority: 'medium',
        issue: 'Low time on page',
        recommendation: 'Add more detailed FAQ answers and related questions section'
      })
    }
  }

  // Conversion recommendations
  if (scores.conversionScore < 60) {
    const courseVisitRate = (funnel.coursePageVisitsFromFAQ / funnel.faqPageViews) * 100
    if (courseVisitRate < 30) {
      recommendations.push({
        type: 'conversion',
        priority: 'high',
        issue: 'Low FAQ to course page conversion',
        recommendation: 'Add more course-specific CTAs and links within FAQ answers'
      })
    }

    const applicationRate = (funnel.applicationStartsFromFAQ / funnel.faqPageViews) * 100
    if (applicationRate < 5) {
      recommendations.push({
        type: 'conversion',
        priority: 'high',
        issue: 'Low application start rate',
        recommendation: 'Add "Apply Now" buttons after key FAQ answers about admission and fees'
      })
    }
  }

  // Content recommendations
  const lowPerformingFAQs = mainFAQ.faqExpansions.filter((faq) => faq.expansions / mainFAQ.pageViews < 0.1) // Less than 10% expansion rate

  if (lowPerformingFAQs.length > 0) {
    recommendations.push({
      type: 'content',
      priority: 'medium',
      issue: `${lowPerformingFAQs.length} FAQs have low engagement`,
      recommendation: 'Review and improve FAQ questions that have less than 10% expansion rate'
    })
  }

  return recommendations
}

/**
 * Save performance report to file
 */
function savePerformanceReport(report) {
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `faq-performance-report-${timestamp}.json`
  const filepath = path.join(__dirname, 'reports', filename)

  // Ensure reports directory exists
  const reportsDir = path.join(__dirname, 'reports')
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  fs.writeFileSync(filepath, JSON.stringify(report, null, 2))
  return filepath
}

/**
 * Display performance report in console
 */
function displayPerformanceReport(report) {
  console.log('📊 FAQ Performance Report')
  console.log(`📅 Generated: ${new Date(report.generatedAt).toLocaleString()}`)
  console.log('\n🎯 Performance Summary:')
  console.log(`   Overall Score: ${report.summary.overallScore}/100 (${report.summary.status})`)
  console.log(`   Engagement Score: ${report.summary.engagementScore}/100`)
  console.log(`   Conversion Score: ${report.summary.conversionScore}/100`)

  console.log('\n📈 Engagement Metrics:')
  console.log(`   Page Views: ${report.engagement.pageViews.toLocaleString()}`)
  console.log(`   Unique Visitors: ${report.engagement.uniqueVisitors.toLocaleString()}`)
  console.log(`   Avg Time on Page: ${report.engagement.averageTimeOnPage}`)
  console.log(`   Bounce Rate: ${report.engagement.bounceRate}`)
  console.log(`   FAQ Expansion Rate: ${report.engagement.expansionRate}`)

  console.log('\n🥇 Top Performing FAQs:')
  report.topPerformingFAQs.forEach((faq) => {
    console.log(`   ${faq.rank}. ${faq.question}`)
    console.log(`      Expansions: ${faq.expansions} (${faq.expansionRate})`)
  })

  console.log('\n🎯 Conversion Funnel:')
  console.log(`   FAQ Page Views: ${report.conversionFunnel.faqPageViews.toLocaleString()}`)
  console.log(`   → Course Page Visits: ${report.conversionFunnel.coursePageVisits}`)
  console.log(`   → Application Starts: ${report.conversionFunnel.applicationStarts}`)
  console.log(`   → Applications Completed: ${report.conversionFunnel.applicationCompletions}`)

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    report.recommendations.forEach((rec) => {
      const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'
      console.log(`   ${priority} ${rec.issue}`)
      console.log(`      → ${rec.recommendation}`)
    })
  }
}

/**
 * Main monitoring functions
 */
async function runPerformanceMonitoring() {
  console.log('🔍 Analyzing FAQ performance...')

  // Use sample data for now (replace with real analytics when MCP is set up)
  const metrics = SAMPLE_FAQ_METRICS

  // Generate report
  const report = generatePerformanceReport(metrics)

  // Display report
  displayPerformanceReport(report)

  // Save report
  const savedPath = savePerformanceReport(report)
  console.log(`\n💾 Report saved to: ${savedPath}`)

  return report
}

/**
 * Setup performance monitoring alerts
 */
function setupPerformanceAlerts() {
  const alertThresholds = {
    minOverallScore: 60,
    maxBounceRate: 60,
    minConversionRate: 4,
    minEngagementScore: 65
  }

  console.log('🚨 Performance Alert Thresholds:')
  console.log(`   Minimum Overall Score: ${alertThresholds.minOverallScore}`)
  console.log(`   Maximum Bounce Rate: ${alertThresholds.maxBounceRate}%`)
  console.log(`   Minimum Conversion Rate: ${alertThresholds.minConversionRate}%`)
  console.log(`   Minimum Engagement Score: ${alertThresholds.minEngagementScore}`)

  return alertThresholds
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'monitor':
      await runPerformanceMonitoring()
      break
    case 'alerts':
      setupPerformanceAlerts()
      break
    case 'test-report':
      const report = generatePerformanceReport(SAMPLE_FAQ_METRICS)
      displayPerformanceReport(report)
      break
    default:
      console.log('📊 FAQ Performance Monitoring System')
      console.log('\nUsage:')
      console.log('  npm run faq:monitor monitor      # Run performance analysis')
      console.log('  npm run faq:monitor alerts       # Setup performance alerts')
      console.log('  npm run faq:monitor test-report  # Generate test report with sample data')
      console.log('\nFeatures:')
      console.log('  ✅ Engagement metrics analysis')
      console.log('  ✅ Conversion funnel tracking')
      console.log('  ✅ Performance scoring system')
      console.log('  ✅ Optimization recommendations')
      console.log('  ✅ Automated report generation')
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Performance monitoring failed:', error)
    process.exit(1)
  })
}

module.exports = {
  generatePerformanceReport,
  calculatePerformanceMetrics,
  runPerformanceMonitoring,
  setupPerformanceAlerts
}
