/* eslint-disable @typescript-eslint/no-var-requires */
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

/**
 * Generate June-September 2025 Analytics Report PDF
 * Comprehensive analysis of the baseline period
 */
class JuneSeptember2025PDF {
  constructor() {
    this.doc = new PDFDocument({ 
      margin: 50,
      size: 'A4'
    })
    this.colors = {
      primary: '#1F4E79',
      secondary: '#4472C4',
      success: '#28A745',
      warning: '#FFC107',
      danger: '#DC3545',
      text: '#333333',
      lightGray: '#F8F9FA',
      darkGray: '#6C757D',
      blue: '#007BFF'
    }
  }

  async generateReport() {
    console.log('📄 Generating June-September 2025 Analytics Report PDF...')
    
    // Load the data
    const dataPath = path.join(process.cwd(), 'analytics-june-september-2025-raw.json')
    if (!fs.existsSync(dataPath)) {
      throw new Error('June-September 2025 data file not found')
    }
    
    this.data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    
    const outputPath = path.join(process.cwd(), 'admi-june-september-2025-report.pdf')
    
    // Create PDF stream
    this.doc.pipe(fs.createWriteStream(outputPath))
    
    // Generate content
    this.createCoverPage()
    this.createExecutiveSummary()
    this.createTrafficSourceAnalysis()
    this.createGeographicAnalysis()
    this.createDeviceAnalysis()
    this.createMonthlyTrends()
    this.createKeyInsights()
    
    // Finalize PDF
    this.doc.end()
    
    console.log(`✅ June-September 2025 Report PDF saved: ${outputPath}`)
    return outputPath
  }

  createCoverPage() {
    // Background
    this.doc.rect(0, 0, 612, 792)
      .fill(this.colors.primary)
    
    // Title
    this.doc.fontSize(32)
      .fillColor('white')
      .text('ADMI ANALYTICS REPORT', 50, 150, { align: 'center' })
    
    // Period
    this.doc.fontSize(24)
      .fillColor(this.colors.warning)
      .text('June - September 2025', 50, 200, { align: 'center' })
    
    // Key metrics box
    this.doc.rect(80, 280, 452, 200)
      .fillAndStroke('white', this.colors.warning)
      .lineWidth(3)
    
    this.doc.fontSize(18)
      .fillColor(this.colors.primary)
      .text('📊 PERIOD OVERVIEW', 100, 310, { align: 'center' })
    
    const overview = [
      `📈 Total Sessions: ${this.data.trafficSources.totalSessions.toLocaleString()}`,
      `👥 Active Users: ${this.data.trafficSources.sources.reduce((sum, s) => sum + s.users, 0).toLocaleString()}`,
      `🌍 Top Country: ${this.data.geographicData.countries[0].country} (${this.data.geographicData.countries[0].percentage}%)`,
      `📱 Mobile Traffic: ${this.data.deviceData.devices.find(d => d.device === 'mobile')?.percentage}%`,
      `🔝 Top Source: ${this.data.trafficSources.sources[0].source}/${this.data.trafficSources.sources[0].medium}`
    ]
    
    let yPos = 345
    overview.forEach(item => {
      this.doc.fontSize(14)
        .fillColor(this.colors.text)
        .text(item, 100, yPos, { align: 'center' })
      yPos += 25
    })
    
    // Footer
    this.doc.fontSize(10)
      .fillColor('white')
      .text(`Generated: ${new Date().toLocaleDateString()} | ADMI Creative Media & Technology Training`, 50, 750, { align: 'center' })
    
    this.doc.addPage()
  }

  createExecutiveSummary() {
    this.addHeader('🎯 Executive Summary')
    
    const totalSessions = this.data.trafficSources.totalSessions
    const totalUsers = this.data.trafficSources.sources.reduce((sum, s) => sum + s.users, 0)
    const topSource = this.data.trafficSources.sources[0]
    const organicSummary = this.data.trafficSources.summary.organic
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('June - September 2025 Performance Summary', 50, 120)
    
    // Key metrics cards
    const metrics = [
      { label: 'Total Sessions', value: totalSessions.toLocaleString(), color: this.colors.primary },
      { label: 'Active Users', value: totalUsers.toLocaleString(), color: this.colors.success },
      { label: 'Organic Traffic', value: `${organicSummary.percentage}%`, color: this.colors.blue },
      { label: 'Top Source Share', value: `${topSource.percentage}%`, color: this.colors.secondary }
    ]
    
    let xPos = 70
    let yPos = 160
    metrics.forEach((metric, index) => {
      if (index === 2) {
        xPos = 70
        yPos = 260
      }
      
      // Card background
      this.doc.rect(xPos, yPos, 200, 80)
        .fillAndStroke(this.colors.lightGray, metric.color)
      
      // Value
      this.doc.fontSize(24)
        .fillColor(metric.color)
        .text(metric.value, xPos + 10, yPos + 20, { width: 180, align: 'center' })
      
      // Label
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(metric.label, xPos + 10, yPos + 55, { width: 180, align: 'center' })
      
      xPos += 220
    })
    
    // Performance highlights
    yPos = 380
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('📈 Performance Highlights', 50, yPos)
    
    const highlights = [
      `🎯 Top Traffic Source: ${topSource.source}/${topSource.medium} (${topSource.sessions.toLocaleString()} sessions)`,
      `🌍 Geographic Focus: Kenya dominates with ${this.data.geographicData.kenyaData?.percentage}% of traffic`,
      `📱 Device Distribution: ${this.data.deviceData.devices.find(d => d.device === 'mobile')?.percentage}% mobile, ${this.data.deviceData.devices.find(d => d.device === 'desktop')?.percentage}% desktop`,
      `📊 Organic Performance: ${organicSummary.sessions} organic sessions (${organicSummary.percentage}% of total)`,
      `👥 User Engagement: Average ${(totalSessions / totalUsers).toFixed(1)} sessions per user`
    ]
    
    yPos += 30
    highlights.forEach(highlight => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(highlight, 70, yPos, { width: 472 })
      yPos += 22
    })
    
    // Period context
    yPos += 20
    this.doc.fontSize(14)
      .fillColor(this.colors.secondary)
      .text('📅 Period Context', 50, yPos)
    
    this.doc.fontSize(11)
      .fillColor(this.colors.text)
      .text('This 4-month period (June-September 2025) represents the baseline performance before the significant organic traffic growth observed in October-November 2025. The data shows healthy user engagement and establishes the foundation for subsequent SEO success.', 70, yPos + 25, { width: 472 })
    
    this.doc.addPage()
  }

  createTrafficSourceAnalysis() {
    this.addHeader('📊 Traffic Source Analysis')
    
    const sources = this.data.trafficSources.sources
    const summary = this.data.trafficSources.summary
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Traffic Source Distribution', 50, 120)
    
    // Top sources table
    const topSources = sources.slice(0, 10)
    const tableHeaders = ['Source/Medium', 'Sessions', '%', 'Users', 'Avg Duration', 'Bounce Rate']
    
    let yPos = 150
    // Headers
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)
    
    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text(tableHeaders[0], 80, yPos, { width: 120 })
      .text(tableHeaders[1], 200, yPos, { width: 60 })
      .text(tableHeaders[2], 260, yPos, { width: 40 })
      .text(tableHeaders[3], 300, yPos, { width: 60 })
      .text(tableHeaders[4], 360, yPos, { width: 80 })
      .text(tableHeaders[5], 440, yPos, { width: 80 })
    
    yPos += 30
    
    // Data rows
    topSources.forEach(source => {
      const avgDuration = Math.round(source.avgSessionDuration / 1000)
      const bounceRate = (source.bounceRate * 100).toFixed(1)
      
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(`${source.source}/${source.medium}`, 80, yPos, { width: 120 })
        .text(source.sessions.toLocaleString(), 200, yPos, { width: 60 })
        .text(`${source.percentage}%`, 260, yPos, { width: 40 })
        .text(source.users.toLocaleString(), 300, yPos, { width: 60 })
        .text(`${avgDuration}s`, 360, yPos, { width: 80 })
        .text(`${bounceRate}%`, 440, yPos, { width: 80 })
      
      yPos += 18
    })
    
    // Traffic source summary
    yPos += 30
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('📈 Traffic Source Categories', 50, yPos)
    
    const categories = [
      { name: 'Organic Search', data: summary.organic, icon: '🔍' },
      { name: 'Direct Traffic', data: summary.direct, icon: '🎯' },
      { name: 'Paid Advertising', data: summary.paid, icon: '💰' },
      { name: 'Social Media', data: summary.social, icon: '📱' },
      { name: 'Referral Traffic', data: summary.referral, icon: '🔗' }
    ]
    
    yPos += 30
    categories.forEach(category => {
      this.doc.fontSize(12)
        .fillColor(this.colors.secondary)
        .text(`${category.icon} ${category.name}`, 70, yPos)
      
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(`${category.data.sessions} sessions (${category.data.percentage}%)`, 250, yPos)
      
      yPos += 25
    })
    
    // Key insights
    yPos += 20
    this.doc.fontSize(14)
      .fillColor(this.colors.success)
      .text('💡 Traffic Source Insights', 50, yPos)
    
    const insights = [
      `• Top performing source: ${sources[0].source}/${sources[0].medium} with ${sources[0].percentage}% of traffic`,
      `• Organic search accounts for ${summary.organic.percentage}% of total traffic`,
      `• Direct traffic represents ${summary.direct.percentage}% showing strong brand recognition`,
      `• Paid advertising contributes ${summary.paid.percentage}% of sessions`,
      `• Social media drives ${summary.social.percentage}% of traffic`
    ]
    
    yPos += 25
    insights.forEach(insight => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(insight, 70, yPos, { width: 472 })
      yPos += 18
    })
    
    this.doc.addPage()
  }

  createGeographicAnalysis() {
    this.addHeader('🌍 Geographic Analysis')
    
    const countries = this.data.geographicData.countries
    const kenyaData = this.data.geographicData.kenyaData
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Geographic Distribution of Traffic', 50, 120)
    
    // Top countries table
    const topCountries = countries.slice(0, 15)
    
    let yPos = 150
    // Headers
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)
    
    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text('Country', 80, yPos, { width: 100 })
      .text('City', 180, yPos, { width: 100 })
      .text('Sessions', 280, yPos, { width: 80 })
      .text('Users', 360, yPos, { width: 80 })
      .text('Percentage', 440, yPos, { width: 80 })
    
    yPos += 30
    
    // Data rows
    topCountries.forEach(country => {
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(country.country, 80, yPos, { width: 100 })
        .text(country.city, 180, yPos, { width: 100 })
        .text(country.sessions.toLocaleString(), 280, yPos, { width: 80 })
        .text(country.users.toLocaleString(), 360, yPos, { width: 80 })
        .text(`${country.percentage}%`, 440, yPos, { width: 80 })
      
      yPos += 18
    })
    
    // Kenya focus section
    if (kenyaData) {
      yPos += 30
      this.doc.fontSize(16)
        .fillColor(this.colors.success)
        .text('🇰🇪 Kenya Market Analysis', 50, yPos)
      
      yPos += 30
      this.doc.rect(70, yPos, 472, 100)
        .fillAndStroke(this.colors.lightGray, this.colors.success)
      
      this.doc.fontSize(14)
        .fillColor(this.colors.success)
        .text('Kenya Performance Highlights', 80, yPos + 15)
      
      const kenyaHighlights = [
        `• ${kenyaData.sessions.toLocaleString()} sessions (${kenyaData.percentage}% of total traffic)`,
        `• ${kenyaData.users.toLocaleString()} active users from Kenya`,
        `• Primary city: ${kenyaData.city} driving majority of Kenyan traffic`,
        `• Strong market dominance in East African region`
      ]
      
      let kenyaYPos = yPos + 40
      kenyaHighlights.forEach(highlight => {
        this.doc.fontSize(10)
          .fillColor(this.colors.text)
          .text(highlight, 90, kenyaYPos, { width: 452 })
        kenyaYPos += 15
      })
      
      yPos += 120
    }
    
    // Geographic insights
    yPos += 20
    this.doc.fontSize(14)
      .fillColor(this.colors.primary)
      .text('🗺️ Geographic Insights', 50, yPos)
    
    const geoInsights = [
      `• ${countries.length} countries represented in traffic data`,
      `• Kenya dominates with ${kenyaData?.percentage}% of total sessions`,
      `• African market focus evident from geographic distribution`,
      `• Opportunity for expansion in other African markets`,
      `• Strong local presence in major Kenyan cities`
    ]
    
    yPos += 25
    geoInsights.forEach(insight => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(insight, 70, yPos, { width: 472 })
      yPos += 18
    })
    
    this.doc.addPage()
  }

  createDeviceAnalysis() {
    this.addHeader('📱 Device & Technology Analysis')
    
    const devices = this.data.deviceData.devices
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Device Category Distribution', 50, 120)
    
    // Device breakdown
    let yPos = 160
    devices.forEach(device => {
      const deviceIcon = device.device === 'mobile' ? '📱' : 
                        device.device === 'desktop' ? '💻' : '📟'
      
      // Device card
      this.doc.rect(70, yPos, 472, 60)
        .fillAndStroke(this.colors.lightGray, this.colors.secondary)
      
      this.doc.fontSize(16)
        .fillColor(this.colors.secondary)
        .text(`${deviceIcon} ${device.device.toUpperCase()}`, 80, yPos + 10)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`${device.sessions.toLocaleString()} sessions (${device.percentage}%)`, 80, yPos + 35)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`${device.users.toLocaleString()} users`, 250, yPos + 35)
      
      const avgDuration = Math.round(device.avgSessionDuration / 1000)
      const bounceRate = (device.bounceRate * 100).toFixed(1)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`${avgDuration}s avg duration`, 350, yPos + 35)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`${bounceRate}% bounce rate`, 450, yPos + 35)
      
      yPos += 80
    })
    
    // Device insights
    yPos += 20
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('📊 Device Usage Insights', 50, yPos)
    
    const mobileDevice = devices.find(d => d.device === 'mobile')
    const desktopDevice = devices.find(d => d.device === 'desktop')
    
    const deviceInsights = [
      `• Mobile traffic: ${mobileDevice?.percentage}% of total sessions`,
      `• Desktop traffic: ${desktopDevice?.percentage}% of total sessions`,
      `• Mobile users: ${mobileDevice?.users.toLocaleString()} active users`,
      `• Desktop users: ${desktopDevice?.users.toLocaleString()} active users`,
      `• Mobile-first audience requires optimized mobile experience`,
      `• Desktop users show different engagement patterns`
    ]
    
    yPos += 30
    deviceInsights.forEach(insight => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(insight, 70, yPos, { width: 472 })
      yPos += 20
    })
    
    // Mobile optimization recommendation
    yPos += 20
    this.doc.rect(70, yPos, 472, 80)
      .fillAndStroke(this.colors.lightGray, this.colors.warning)
    
    this.doc.fontSize(14)
      .fillColor(this.colors.warning)
      .text('📱 Mobile Optimization Priority', 80, yPos + 15)
    
    this.doc.fontSize(11)
      .fillColor(this.colors.text)
      .text(`With ${mobileDevice?.percentage}% mobile traffic, ensuring optimal mobile experience is critical for user engagement and conversion rates. Focus on mobile page speed, touch-friendly navigation, and mobile-specific content optimization.`, 80, yPos + 40, { width: 452 })
    
    this.doc.addPage()
  }

  createMonthlyTrends() {
    this.addHeader('📈 Monthly Trends Analysis')
    
    const monthlyData = this.data.monthlyTrends
    const months = Object.keys(monthlyData).sort()
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Month-by-Month Performance', 50, 120)
    
    // Monthly summary table
    let yPos = 150
    
    // Headers
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)
    
    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text('Month', 80, yPos, { width: 80 })
      .text('Sessions', 160, yPos, { width: 80 })
      .text('Users', 240, yPos, { width: 80 })
      .text('Pageviews', 320, yPos, { width: 80 })
      .text('Top Source', 400, yPos, { width: 140 })
    
    yPos += 30
    
    // Monthly data rows
    months.forEach(month => {
      const data = monthlyData[month]
      const topSource = Object.entries(data.sources)
        .sort(([,a], [,b]) => b - a)[0]
      
      const monthName = new Date(month.substring(0,4), month.substring(4,6) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(monthName, 80, yPos, { width: 80 })
        .text(data.totalSessions.toLocaleString(), 160, yPos, { width: 80 })
        .text(data.totalUsers.toLocaleString(), 240, yPos, { width: 80 })
        .text(data.totalPageviews.toLocaleString(), 320, yPos, { width: 80 })
        .text(topSource ? topSource[0] : 'N/A', 400, yPos, { width: 140 })
      
      yPos += 20
    })
    
    // Trend analysis
    yPos += 30
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('📊 Trend Analysis', 50, yPos)
    
    const totalSessions = months.reduce((sum, month) => sum + monthlyData[month].totalSessions, 0)
    const avgSessionsPerMonth = Math.round(totalSessions / months.length)
    
    const trendInsights = [
      `• Average sessions per month: ${avgSessionsPerMonth.toLocaleString()}`,
      `• Total 4-month period: ${totalSessions.toLocaleString()} sessions`,
      `• Consistent user engagement across the period`,
      `• Traffic sources show stability in the baseline period`,
      `• Foundation established for subsequent growth in October-November`
    ]
    
    yPos += 30
    trendInsights.forEach(insight => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(insight, 70, yPos, { width: 472 })
      yPos += 20
    })
    
    this.doc.addPage()
  }

  createKeyInsights() {
    this.addHeader('💡 Key Insights & Recommendations')
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Strategic Insights from June-September 2025', 50, 120)
    
    // Performance summary
    const totalSessions = this.data.trafficSources.totalSessions
    const totalUsers = this.data.trafficSources.sources.reduce((sum, s) => sum + s.users, 0)
    const organicPercentage = this.data.trafficSources.summary.organic.percentage
    const topSource = this.data.trafficSources.sources[0]
    
    let yPos = 160
    
    // Key findings
    this.doc.fontSize(14)
      .fillColor(this.colors.success)
      .text('🎯 Key Findings', 50, yPos)
    
    const findings = [
      {
        title: 'Baseline Performance Established',
        description: `${totalSessions.toLocaleString()} sessions and ${totalUsers.toLocaleString()} users over 4 months provide solid baseline metrics for comparison with future periods.`
      },
      {
        title: 'Traffic Source Distribution',
        description: `${topSource.source}/${topSource.medium} leads with ${topSource.percentage}% of traffic. Organic search accounts for ${organicPercentage}% of sessions.`
      },
      {
        title: 'Geographic Concentration',
        description: `Kenya dominates with ${this.data.geographicData.kenyaData?.percentage}% of traffic, indicating strong local market presence and opportunity for regional expansion.`
      },
      {
        title: 'Mobile-First Audience',
        description: `${this.data.deviceData.devices.find(d => d.device === 'mobile')?.percentage}% mobile traffic confirms the need for mobile-optimized experiences.`
      }
    ]
    
    yPos += 30
    findings.forEach(finding => {
      this.doc.fontSize(12)
        .fillColor(this.colors.primary)
        .text(`• ${finding.title}`, 70, yPos)
      
      yPos += 18
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(finding.description, 90, yPos, { width: 452 })
      
      yPos += 30
    })
    
    // Recommendations
    yPos += 20
    this.doc.fontSize(14)
      .fillColor(this.colors.warning)
      .text('🚀 Strategic Recommendations', 50, yPos)
    
    const recommendations = [
      'Focus on organic search optimization to increase the current organic percentage',
      'Develop mobile-first content and user experience strategies',
      'Expand geographic targeting to other African markets',
      'Analyze top-performing traffic sources for scaling opportunities',
      'Establish conversion tracking to measure business impact'
    ]
    
    yPos += 30
    recommendations.forEach(rec => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(`• ${rec}`, 70, yPos, { width: 472 })
      yPos += 22
    })
    
    // Conclusion
    yPos += 30
    this.doc.rect(70, yPos, 472, 80)
      .fillAndStroke(this.colors.lightGray, this.colors.primary)
    
    this.doc.fontSize(14)
      .fillColor(this.colors.primary)
      .text('📋 Period Summary', 80, yPos + 15)
    
    this.doc.fontSize(11)
      .fillColor(this.colors.text)
      .text('June-September 2025 establishes a solid baseline with healthy user engagement and geographic focus. This period provides the foundation for the significant organic growth achieved in October-November 2025.', 80, yPos + 40, { width: 452 })
    
    // Footer
    this.doc.fontSize(10)
      .fillColor(this.colors.darkGray)
      .text(`Report Generated: ${new Date().toLocaleDateString()} | Data Period: June 1 - September 30, 2025`, 50, 750, { align: 'center' })
  }

  addHeader(title) {
    this.doc.fontSize(18)
      .fillColor(this.colors.primary)
      .text(title, 50, 50)
    
    // Add line under header
    this.doc.moveTo(50, 80)
      .lineTo(562, 80)
      .stroke(this.colors.secondary)
      .lineWidth(2)
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new JuneSeptember2025PDF()
  generator.generateReport()
    .then(outputPath => {
      console.log(`🎉 June-September 2025 Report PDF generated: ${outputPath}`)
    })
    .catch(error => {
      console.error('❌ Failed to generate PDF:', error.message)
      process.exit(1)
    })
}

module.exports = { JuneSeptember2025PDF }
