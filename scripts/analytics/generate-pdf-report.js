/* eslint-disable @typescript-eslint/no-var-requires */
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

/**
 * Generate PDF version of the analytics report
 */
class PDFReportGenerator {
  constructor() {
    this.doc = new PDFDocument({ 
      margin: 50,
      size: 'A4'
    })
    this.colors = {
      primary: '#1F4E79',
      secondary: '#4472C4',
      accent: '#70AD47',
      text: '#333333',
      lightGray: '#F2F2F2'
    }
  }

  async generateReport() {
    console.log('📄 Generating PDF Report...')
    
    // Load raw data
    const rawDataPath = path.join(process.cwd(), 'analytics-data-raw.json')
    if (!fs.existsSync(rawDataPath)) {
      throw new Error('Raw analytics data not found. Please run the analysis first.')
    }
    
    const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'))
    const outputPath = path.join(process.cwd(), 'analytics-report-june-september-2024.pdf')
    
    // Create PDF stream
    this.doc.pipe(fs.createWriteStream(outputPath))
    
    // Generate content
    this.createCoverPage()
    this.createExecutiveSummary(rawData)
    this.createTrafficSourcesPage(rawData)
    this.createGeographicPage(rawData)
    this.createDevicePage(rawData)
    this.createRecommendationsPage()
    
    // Finalize PDF
    this.doc.end()
    
    console.log(`✅ PDF report saved: ${outputPath}`)
    return outputPath
  }

  createCoverPage() {
    // Title
    this.doc.fontSize(24)
      .fillColor(this.colors.primary)
      .text('ADMI Website Traffic Analysis Report', 50, 150, { align: 'center' })
    
    // Subtitle
    this.doc.fontSize(16)
      .fillColor(this.colors.secondary)
      .text('June 1 - September 30, 2025', 50, 200, { align: 'center' })
    
    // Logo placeholder (you can add actual logo here)
    this.doc.rect(250, 250, 100, 100)
      .stroke(this.colors.lightGray)
    
    this.doc.fontSize(12)
      .fillColor(this.colors.text)
      .text('ADMI Logo', 275, 295, { align: 'center' })
    
    // Generated date
    this.doc.fontSize(10)
      .fillColor(this.colors.text)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 700, { align: 'center' })
    
    // Footer
    this.doc.fontSize(8)
      .fillColor(this.colors.text)
      .text('Creative Media and Technology Training Institution', 50, 750, { align: 'center' })
      .text('Nairobi, Kenya', 50, 765, { align: 'center' })
    
    this.doc.addPage()
  }

  createExecutiveSummary(rawData) {
    this.addHeader('Executive Summary')
    
    const totalSessions = rawData.trafficSources.sources.reduce((sum, source) => sum + source.sessions, 0)
    const topSource = rawData.trafficSources.sources[0]
    
    // Key metrics box
    this.doc.rect(50, 120, 495, 150)
      .fillAndStroke(this.colors.lightGray, this.colors.secondary)
    
    this.doc.fontSize(14)
      .fillColor(this.colors.primary)
      .text('Key Performance Indicators', 70, 140)
    
    const kpis = [
      `Total Sessions: ${totalSessions.toLocaleString()}`,
      `Top Traffic Source: ${topSource.source}/${topSource.medium} (${topSource.percentage}%)`,
      `Kenya Traffic Share: 83.7% of total sessions`,
      `Primary Device: Mobile (87.18% of sessions)`,
      `Countries Reached: 20 (19 African countries)`
    ]
    
    let yPos = 165
    kpis.forEach(kpi => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(`• ${kpi}`, 70, yPos)
      yPos += 20
    })
    
    // Critical findings
    yPos = 300
    this.doc.fontSize(14)
      .fillColor(this.colors.primary)
      .text('Critical Findings', 50, yPos)
    
    const findings = [
      'Meta/Facebook paid ads dominate with 53.23% of traffic',
      'Strong mobile preference with 87.18% of sessions',
      '19 African countries represented, showing regional reach',
      'Significant organic search opportunity (only 9.2% current share)',
      'Strong brand recognition with 12.5% direct traffic'
    ]
    
    yPos += 30
    findings.forEach(finding => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`• ${finding}`, 50, yPos, { width: 495 })
      yPos += 20
    })
    
    // Immediate action items
    yPos += 20
    this.doc.fontSize(14)
      .fillColor(this.colors.primary)
      .text('Immediate Action Items', 50, yPos)
    
    const actions = [
      'SEO Optimization: Focus on diploma course keywords',
      'Mobile Experience: Optimize for 87% mobile users',
      'African Market: Leverage 19-country presence',
      'Conversion: Improve enquiry form performance'
    ]
    
    yPos += 30
    actions.forEach(action => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`• ${action}`, 50, yPos, { width: 495 })
      yPos += 20
    })
    
    this.doc.addPage()
  }

  createTrafficSourcesPage(rawData) {
    this.addHeader('Traffic Source Analysis')
    
    // Top sources table
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Top 10 Traffic Sources', 50, 120)
    
    // Table headers
    const headers = ['Rank', 'Source/Medium', 'Sessions', '%', 'Pages/Session']
    const colWidths = [40, 150, 80, 50, 80]
    let xPos = 50
    let yPos = 150
    
    headers.forEach((header, index) => {
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(header, xPos, yPos, { width: colWidths[index] })
      xPos += colWidths[index]
    })
    
    // Table data
    yPos += 20
    rawData.trafficSources.sources.slice(0, 10).forEach((source, index) => {
      xPos = 50
      const rowData = [
        (index + 1).toString(),
        `${source.source}/${source.medium}`,
        source.sessions.toLocaleString(),
        `${source.percentage}%`,
        (source.pageviews / source.sessions).toFixed(1)
      ]
      
      rowData.forEach((data, colIndex) => {
        this.doc.fontSize(8)
          .fillColor(this.colors.text)
          .text(data, xPos, yPos, { width: colWidths[colIndex] })
        xPos += colWidths[colIndex]
      })
      yPos += 15
    })
    
    // Channel overview
    yPos += 30
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Channel Performance Overview', 50, yPos)
    
    const channels = [
      { name: 'Paid Search (Meta/Google)', sessions: 52141, percentage: 59.8 },
      { name: 'Direct Traffic', sessions: 10900, percentage: 12.5 },
      { name: 'Social Media', sessions: 8984, percentage: 10.3 },
      { name: 'Organic Search', sessions: 7970, percentage: 9.1 },
      { name: 'Referral', sessions: 3605, percentage: 4.1 }
    ]
    
    yPos += 30
    channels.forEach(channel => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`${channel.name}: ${channel.sessions.toLocaleString()} sessions (${channel.percentage}%)`, 50, yPos)
      yPos += 20
    })
    
    this.doc.addPage()
  }

  createGeographicPage(rawData) {
    this.addHeader('Geographic Analysis')
    
    // Kenya dominance
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Market Distribution', 50, 120)
    
    const countries = rawData.geographicData?.allCountries || []
    const totalSessions = countries.reduce((sum, country) => sum + country.sessions, 0)
    const kenyaSessions = countries
      .filter(country => country.country === 'Kenya')
      .reduce((sum, country) => sum + country.sessions, 0)
    
    this.doc.fontSize(11)
      .fillColor(this.colors.text)
      .text(`Kenya: ${kenyaSessions.toLocaleString()} sessions (${((kenyaSessions/totalSessions)*100).toFixed(1)}%)`, 50, 150)
      .text(`Other Countries: ${(totalSessions-kenyaSessions).toLocaleString()} sessions (${(((totalSessions-kenyaSessions)/totalSessions)*100).toFixed(1)}%)`, 50, 170)
      .text(`Total Countries: 20`, 50, 190)
      .text(`African Countries: 19`, 50, 210)
    
    // Top countries table
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Top 10 Countries by Sessions', 50, 250)
    
    let yPos = 280
    countries.slice(0, 10).forEach((country, index) => {
      const percentage = ((country.sessions / totalSessions) * 100).toFixed(1)
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(`${index + 1}. ${country.country}: ${country.sessions.toLocaleString()} (${percentage}%)`, 50, yPos)
      yPos += 15
    })
    
    // African market insights
    yPos += 30
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('African Market Insights', 50, yPos)

    const africanCountries = rawData.geographicData?.africanCountries || []
    yPos += 30
    this.doc.fontSize(10)
      .fillColor(this.colors.text)
      .text(`• ${africanCountries.length} African countries represented`, 50, yPos)
      .text(`• Strong regional presence across East, West, and Southern Africa`, 50, yPos + 20)
      .text(`• Opportunity for targeted African market campaigns`, 50, yPos + 40)
    
    this.doc.addPage()
  }

  createDevicePage(rawData) {
    this.addHeader('Device Category Analysis')
    
    // Device distribution
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Device Usage Distribution', 50, 120)
    
    let yPos = 150
    const devices = rawData.deviceData?.devices || []
    devices.forEach((device, index) => {
      this.doc.fontSize(11)
        .fillColor(this.colors.text)
        .text(`${device.device}: ${device.sessions.toLocaleString()} sessions (${device.percentage}%)`, 50, yPos)
      yPos += 25
    })
    
    // Mobile insights
    yPos += 30
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Mobile-First Strategy Recommendations', 50, yPos)
    
    const mobileInsights = [
      'Mobile users account for 87.18% of all sessions',
      'Mobile engagement shows strong performance metrics',
      'Mobile-first design approach is critical for success',
      'Page load speed optimization essential for mobile users',
      'Simplified navigation and forms needed for mobile experience'
    ]
    
    yPos += 30
    mobileInsights.forEach(insight => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`• ${insight}`, 50, yPos, { width: 495 })
      yPos += 20
    })
    
    this.doc.addPage()
  }

  createRecommendationsPage() {
    this.addHeader('Actionable Recommendations')
    
    const recommendations = [
      {
        priority: 'Priority 1: SEO Optimization',
        description: 'Focus on organic search improvements for diploma courses',
        actions: [
          'Target "music production courses Kenya" and "film school Nairobi"',
          'Create location-specific landing pages',
          'Improve technical SEO for mobile users',
          'Expected impact: 25-40% increase in organic traffic'
        ]
      },
      {
        priority: 'Priority 1: Mobile Experience',
        description: 'Optimize for mobile users (87.18% of traffic)',
        actions: [
          'Mobile-first course page design',
          'Simplified enquiry forms for mobile',
          'Faster loading times for course videos',
          'Expected impact: 20-30% reduction in bounce rate'
        ]
      },
      {
        priority: 'Priority 2: African Market Expansion',
        description: 'Leverage presence in 19 African countries',
        actions: [
          'Target Nigeria, South Africa, Ghana markets',
          'Create country-specific course information',
          'Localized SEO strategy',
          'Expected impact: 15-25% increase in African traffic'
        ]
      },
      {
        priority: 'Priority 1: Conversion Optimization',
        description: 'Improve enquiry form performance',
        actions: [
          'A/B test different form layouts',
          'Implement automated email sequences',
          'Focus on meta/cpc traffic optimization',
          'Expected impact: 30-50% increase in submissions'
        ]
      }
    ]
    
    let yPos = 120
    recommendations.forEach(rec => {
      this.doc.fontSize(12)
        .fillColor(this.colors.primary)
        .text(rec.priority, 50, yPos)
      
      yPos += 20
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(rec.description, 50, yPos, { width: 495 })
      
      yPos += 25
      rec.actions.forEach(action => {
        this.doc.fontSize(9)
          .fillColor(this.colors.text)
          .text(`• ${action}`, 70, yPos, { width: 475 })
        yPos += 15
      })
      yPos += 15
    })
    
    // Implementation timeline
    yPos += 20
    this.doc.fontSize(12)
      .fillColor(this.colors.primary)
      .text('Implementation Timeline', 50, yPos)
    
    const timeline = [
      'Month 1: Mobile optimization, quick wins, analytics setup',
      'Month 2: SEO content creation, course page improvements',
      'Month 3: African market expansion, conversion optimization',
      'Month 4: Advanced tracking, performance analysis'
    ]
    
    yPos += 30
    timeline.forEach(item => {
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`• ${item}`, 50, yPos, { width: 495 })
      yPos += 20
    })
  }

  addHeader(title) {
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text(title, 50, 50)
    
    // Add line under header
    this.doc.moveTo(50, 80)
      .lineTo(545, 80)
      .stroke(this.colors.secondary)
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new PDFReportGenerator()
  generator.generateReport()
    .then(outputPath => {
      console.log(`🎉 PDF report generated successfully: ${outputPath}`)
    })
    .catch(error => {
      console.error('❌ Failed to generate PDF report:', error.message)
      process.exit(1)
    })
}

module.exports = { PDFReportGenerator }
