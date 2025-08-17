/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

/**
 * Content Optimization Dashboard
 * Monitors and displays system status, recent activity, and performance metrics
 */

class ContentOptimizationDashboard {
  constructor() {
    this.logsDir = path.join(__dirname, '../../logs/content-optimization')
    this.reportsDir = path.join(__dirname, '../../reports/monthly')
    this.scriptsDir = __dirname
  }

  async generateDashboard() {
    try {
      console.log('📊 ADMI Content Optimization Dashboard')
      console.log('='.repeat(60))
      console.log(`Generated: ${new Date().toLocaleString()}\n`)

      // System Status
      await this.checkSystemStatus()

      // Recent Activity
      await this.showRecentActivity()

      // Performance Metrics
      await this.showPerformanceMetrics()

      // Upcoming Schedule
      await this.showUpcomingRuns()

      // Recommendations
      await this.showRecommendations()

      console.log('\n' + '='.repeat(60))
      console.log('✨ Dashboard generated successfully!')
    } catch (error) {
      console.error('❌ Error generating dashboard:', error.message)
    }
  }

  async checkSystemStatus() {
    try {
      console.log('🔧 SYSTEM STATUS')
      console.log('-'.repeat(20))

      // Check if main script exists
      const mainScript = path.join(this.scriptsDir, 'intelligent-content-optimizer.js')
      const scriptExists = fs.existsSync(mainScript)
      console.log(`Main Optimizer Script: ${scriptExists ? '✅ Ready' : '❌ Missing'}`)

      // Check cron jobs
      try {
        const { stdout } = await execAsync('crontab -l | grep content-optimization')
        const cronCount = stdout
          .trim()
          .split('\n')
          .filter((line) => line.includes('content-optimization')).length
        console.log(`Cron Jobs Installed: ${cronCount > 0 ? '✅ ' + cronCount + ' jobs' : '❌ Not configured'}`)
      } catch (error) {
        console.log('Cron Jobs Installed: ❌ Not configured')
      }

      // Check directories
      const logsExist = fs.existsSync(this.logsDir)
      const reportsExist = fs.existsSync(this.reportsDir)
      console.log(`Logs Directory: ${logsExist ? '✅ Ready' : '❌ Missing'}`)
      console.log(`Reports Directory: ${reportsExist ? '✅ Ready' : '❌ Missing'}`)

      // Check environment variables
      const hasOpenAI = process.env.OPENAI_API_KEY || process.env.NEXT_OPENAI_API_KEY
      const hasContentful = process.env.CONTENTFUL_MANAGEMENT_TOKEN && process.env.CONTENTFUL_SPACE_ID
      console.log(`OpenAI API: ${hasOpenAI ? '✅ Configured' : '❌ Missing'}`)
      console.log(`Contentful API: ${hasContentful ? '✅ Configured' : '❌ Missing'}`)
    } catch (error) {
      console.error('Error checking system status:', error.message)
    }
  }

  async showRecentActivity() {
    try {
      console.log('\n📈 RECENT ACTIVITY (Last 7 Days)')
      console.log('-'.repeat(35))

      if (!fs.existsSync(this.logsDir)) {
        console.log('No activity logs found')
        return
      }

      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const logFiles = fs
        .readdirSync(this.logsDir)
        .filter((f) => f.endsWith('.log'))
        .map((f) => ({
          file: f,
          path: path.join(this.logsDir, f),
          date: fs.statSync(path.join(this.logsDir, f)).mtime
        }))
        .filter((f) => f.date > oneWeekAgo)
        .sort((a, b) => b.date - a.date)

      if (logFiles.length === 0) {
        console.log('No recent activity (last 7 days)')
        return
      }

      let totalRuns = 0
      let totalFAQs = 0
      let totalArticles = 0
      let totalUploads = 0

      console.log('Recent Optimization Runs:')
      logFiles.slice(0, 10).forEach((logFile) => {
        try {
          const content = fs.readFileSync(logFile.path, 'utf8')
          const isComplete = content.includes('Optimization Complete')

          if (isComplete) {
            totalRuns++

            // Extract metrics
            const faqMatch = content.match(/FAQs Generated: (\d+)/)
            const articleMatch = content.match(/Articles Generated: (\d+)/)
            const uploadMatch = content.match(/Contentful Uploads: (\d+)/)

            const faqs = faqMatch ? parseInt(faqMatch[1]) : 0
            const articles = articleMatch ? parseInt(articleMatch[1]) : 0
            const uploads = uploadMatch ? parseInt(uploadMatch[1]) : 0

            totalFAQs += faqs
            totalArticles += articles
            totalUploads += uploads

            console.log(
              `  ${logFile.date.toLocaleDateString()}: ✅ ${faqs} FAQs, ${articles} articles, ${uploads} uploads`
            )
          } else {
            console.log(`  ${logFile.date.toLocaleDateString()}: ❌ Failed or incomplete`)
          }
        } catch (error) {
          console.log(`  ${logFile.date.toLocaleDateString()}: ❓ Log parse error`)
        }
      })

      console.log('\n📊 7-Day Summary:')
      console.log(`   Total Runs: ${totalRuns}`)
      console.log(`   FAQs Generated: ${totalFAQs}`)
      console.log(`   Articles Generated: ${totalArticles}`)
      console.log(`   Contentful Uploads: ${totalUploads}`)
    } catch (error) {
      console.error('Error showing recent activity:', error.message)
    }
  }

  async showPerformanceMetrics() {
    try {
      console.log('\n📊 PERFORMANCE METRICS')
      console.log('-'.repeat(25))

      // Try to get latest analytics data
      const analyticsEndpoint = process.env.ANALYTICS_API_BASE_URL || 'http://localhost:3003'

      console.log(`Analytics Endpoint: ${analyticsEndpoint}`)
      console.log('Note: Start dev server (npm run dev) for live metrics')

      // Show latest report if available
      if (fs.existsSync(this.reportsDir)) {
        const reportFiles = fs
          .readdirSync(this.reportsDir)
          .filter((f) => f.includes('monthly-report') && f.endsWith('.json'))
          .sort()
          .reverse()

        if (reportFiles.length > 0) {
          try {
            const latestReport = JSON.parse(fs.readFileSync(path.join(this.reportsDir, reportFiles[0]), 'utf8'))
            console.log('\n📋 Latest Monthly Report:')
            console.log(`   Period: ${latestReport.period}`)
            console.log(`   Page Views: ${latestReport.executiveSummary?.totalPageViews?.toLocaleString() || 'N/A'}`)
            console.log(`   Users: ${latestReport.executiveSummary?.totalUsers?.toLocaleString() || 'N/A'}`)
            console.log(`   Bounce Rate: ${latestReport.executiveSummary?.bounceRate || 'N/A'}%`)
            console.log(`   Conversion Rate: ${latestReport.executiveSummary?.conversionRate || 'N/A'}%`)
          } catch (error) {
            console.log('Unable to parse latest report')
          }
        }
      }
    } catch (error) {
      console.error('Error showing performance metrics:', error.message)
    }
  }

  async showUpcomingRuns() {
    try {
      console.log('\n⏰ SCHEDULED RUNS')
      console.log('-'.repeat(18))

      try {
        const { stdout } = await execAsync('crontab -l | grep content-optimization')
        const cronJobs = stdout
          .trim()
          .split('\n')
          .filter((line) => line.includes('content-optimization'))

        if (cronJobs.length > 0) {
          console.log('Scheduled Automation:')
          cronJobs.forEach((job) => {
            const parts = job.trim().split(' ')
            const minute = parts[0]
            const hour = parts[1]
            const dom = parts[2]
            const month = parts[3]
            const dow = parts[4]

            let schedule = ''
            if (dow === '1-5') {
              schedule = `Weekdays at ${hour}:${minute.padStart(2, '0')}`
            } else if (dow === '0') {
              schedule = `Sundays at ${hour}:${minute.padStart(2, '0')}`
            } else if (dom === '1') {
              schedule = `1st of month at ${hour}:${minute.padStart(2, '0')}`
            } else {
              schedule = `${minute} ${hour} ${dom} ${month} ${dow}`
            }

            console.log(`  📅 ${schedule}`)
          })

          // Calculate next run
          const now = new Date()
          const nextDaily = this.getNextWeekdayAt(2, 0) // 2:00 AM weekdays
          const nextWeekly = this.getNextSundayAt(1, 0) // 1:00 AM Sundays
          const nextMonthly = this.getNextFirstAt(3, 0) // 3:00 AM 1st of month

          const nextRun = [nextDaily, nextWeekly, nextMonthly].sort((a, b) => a - b)[0]
          const timeDiff = Math.round((nextRun - now) / (1000 * 60 * 60))

          console.log(
            `\n⏭️  Next Run: ${nextRun.toLocaleDateString()} ${nextRun.toLocaleTimeString()} (in ${timeDiff}h)`
          )
        } else {
          console.log('❌ No scheduled runs configured')
        }
      } catch (error) {
        console.log('❌ Unable to read cron schedule')
      }
    } catch (error) {
      console.error('Error showing upcoming runs:', error.message)
    }
  }

  getNextWeekdayAt(hour, minute) {
    const now = new Date()
    const next = new Date(now)
    next.setHours(hour, minute, 0, 0)

    // If time has passed today, move to next weekday
    if (next <= now) {
      next.setDate(next.getDate() + 1)
    }

    // Skip weekends
    while (next.getDay() === 0 || next.getDay() === 6) {
      next.setDate(next.getDate() + 1)
    }

    return next
  }

  getNextSundayAt(hour, minute) {
    const now = new Date()
    const next = new Date(now)
    next.setHours(hour, minute, 0, 0)

    const daysUntilSunday = (7 - next.getDay()) % 7 || 7
    if (next.getDay() === 0 && next > now) {
      // Already Sunday and time hasn't passed
      return next
    }

    next.setDate(next.getDate() + daysUntilSunday)
    return next
  }

  getNextFirstAt(hour, minute) {
    const now = new Date()
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1, hour, minute, 0, 0)

    if (now.getDate() === 1 && now.getHours() < hour) {
      next.setMonth(now.getMonth())
    }

    return next
  }

  async showRecommendations() {
    try {
      console.log('\n💡 RECOMMENDATIONS')
      console.log('-'.repeat(20))

      const recommendations = []

      // Check if system is running
      const logsExist = fs.existsSync(this.logsDir)
      if (!logsExist) {
        recommendations.push('🔧 Create logs directory: mkdir -p logs/content-optimization')
      }

      // Check recent activity
      if (logsExist) {
        const recentLogs = fs
          .readdirSync(this.logsDir)
          .filter((f) => f.endsWith('.log'))
          .filter((f) => {
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            const fileTime = fs.statSync(path.join(this.logsDir, f)).mtime
            return fileTime > weekAgo
          })

        if (recentLogs.length === 0) {
          recommendations.push('⚠️  No recent activity - check if cron jobs are running')
          recommendations.push(
            '🧪 Test manually: node scripts/automation/intelligent-content-optimizer.js --max-faqs 1 --no-upload'
          )
        }
      }

      // Check environment
      if (!process.env.OPENAI_API_KEY && !process.env.NEXT_OPENAI_API_KEY) {
        recommendations.push('🔑 Configure OpenAI API key in .env file')
      }

      if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
        recommendations.push('🔑 Configure Contentful management token in .env file')
      }

      // General recommendations
      recommendations.push('📊 Start dev server for real-time analytics: npm run dev')
      recommendations.push('📋 Generate monthly report: node scripts/automation/monthly-analytics-report.js')
      recommendations.push('🔍 Monitor system: scripts/automation/check-optimization-status.sh')

      if (recommendations.length > 0) {
        recommendations.forEach((rec) => console.log(`  ${rec}`))
      } else {
        console.log('  ✅ System is operating optimally!')
      }
    } catch (error) {
      console.error('Error showing recommendations:', error.message)
    }
  }
}

// CLI usage
if (require.main === module) {
  const dashboard = new ContentOptimizationDashboard()
  dashboard.generateDashboard()
}

module.exports = ContentOptimizationDashboard
