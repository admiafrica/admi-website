/* eslint-disable @typescript-eslint/no-var-requires */
const PDFDocument = require('pdfkit')
const fs = require('fs')

/**
 * Apples-to-Apples Comparison PDF Generator
 * June 1 - July 3, 2025 (34 days) vs October 1 - November 3, 2025 (34 days)
 */

class ApplesToApplesComparisonPDF {
  constructor() {
    this.doc = new PDFDocument({ margin: 50, size: 'A4' })
    this.colors = {
      primary: '#1F4E79',
      secondary: '#4472C4',
      success: '#28A745',
      warning: '#FFC107',
      danger: '#DC3545',
      text: '#333333',
      lightGray: '#F8F9FA',
      mediumGray: '#6C757D'
    }
  }

  addHeader(title) {
    this.doc.rect(0, 0, this.doc.page.width, 80)
      .fill(this.colors.primary)
    
    this.doc.fontSize(24)
      .fillColor('white')
      .text('ADMI Analytics', 50, 25)
    
    this.doc.fontSize(14)
      .text(title, 50, 50)
  }

  addFooter(pageNumber) {
    this.doc.fontSize(10)
      .fillColor(this.colors.mediumGray)
      .text(`Generated: ${new Date().toLocaleDateString()} | Page ${pageNumber}`, 50, 750, { align: 'center' })
  }

  createCoverPage() {
    this.addHeader('Apples-to-Apples Period Comparison')
    
    this.doc.fontSize(28)
      .fillColor(this.colors.primary)
      .text('34-Day Period Comparison', 50, 150, { align: 'center' })
    
    this.doc.fontSize(18)
      .fillColor(this.colors.secondary)
      .text('June 1 - July 3, 2025', 50, 200, { align: 'center' })
      .text('vs', 50, 230, { align: 'center' })
      .text('October 1 - November 3, 2025', 50, 260, { align: 'center' })
    
    // Key metrics boxes
    const period1Sessions = this.period1Data.engagementMetrics?.totalSessions || this.period1Data.trafficSources.totalSessions
    const period2Sessions = this.period2Data.engagementMetrics?.totalSessions || this.period2Data.trafficSources.totalSessions

    const metrics = [
      { label: 'Period 1 Sessions', value: period1Sessions.toLocaleString() },
      { label: 'Period 2 Sessions', value: period2Sessions.toLocaleString() },
      { label: 'Period 1 Organic %', value: this.period1Data.trafficSources.summary.organic.percentage + '%' },
      { label: 'Period 2 Organic %', value: this.period2Data.trafficSources.summary.organic.percentage + '%' }
    ]
    
    let yPos = 350
    metrics.forEach((metric, index) => {
      const xPos = index % 2 === 0 ? 80 : 320
      if (index % 2 === 0 && index > 0) yPos += 80
      
      this.doc.rect(xPos, yPos, 200, 60)
        .stroke(this.colors.lightGray)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(metric.label, xPos + 10, yPos + 15)
      
      this.doc.fontSize(20)
        .fillColor(this.colors.primary)
        .text(metric.value, xPos + 10, yPos + 35)
    })
    
    this.addFooter(1)
    this.doc.addPage()
  }

  createExecutiveSummary() {
    this.addHeader('Executive Summary')
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('34-Day Period Comparison Results', 50, 120)
    
    // Calculate key changes
    const period1Sessions = this.period1Data.engagementMetrics?.totalSessions || this.period1Data.trafficSources.totalSessions
    const period2Sessions = this.period2Data.engagementMetrics?.totalSessions || this.period2Data.trafficSources.totalSessions

    const sessionsChange = ((period2Sessions - period1Sessions) / period1Sessions * 100).toFixed(1)
    const organicChange = (parseFloat(this.period2Data.trafficSources.summary.organic.percentage) - parseFloat(this.period1Data.trafficSources.summary.organic.percentage)).toFixed(2)
    const directChange = (parseFloat(this.period2Data.trafficSources.summary.direct.percentage) - parseFloat(this.period1Data.trafficSources.summary.direct.percentage)).toFixed(2)
    
    const summaryPoints = [
      {
        title: 'Total Sessions Change',
        value: `${sessionsChange}%`,
        description: `From ${period1Sessions.toLocaleString()} to ${period2Sessions.toLocaleString()} sessions`,
        status: parseFloat(sessionsChange) > 0 ? 'increase' : 'decrease'
      },
      {
        title: 'Organic Traffic Change',
        value: `${organicChange}pp`,
        description: `From ${this.period1Data.trafficSources.summary.organic.percentage}% to ${this.period2Data.trafficSources.summary.organic.percentage}%`,
        status: parseFloat(organicChange) > 0 ? 'increase' : 'decrease'
      },
      {
        title: 'Direct Traffic Change',
        value: `${directChange}pp`,
        description: `From ${this.period1Data.trafficSources.summary.direct.percentage}% to ${this.period2Data.trafficSources.summary.direct.percentage}%`,
        status: parseFloat(directChange) > 0 ? 'increase' : 'decrease'
      }
    ]
    
    let yPos = 160
    summaryPoints.forEach(point => {
      const color = point.status === 'increase' ? this.colors.success : this.colors.danger
      
      this.doc.fontSize(14)
        .fillColor(this.colors.secondary)
        .text(`• ${point.title}`, 70, yPos)
      
      this.doc.fontSize(16)
        .fillColor(color)
        .text(point.value, 300, yPos)
      
      yPos += 20
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(point.description, 90, yPos)
      
      yPos += 40
    })
    
    this.addFooter(2)
    this.doc.addPage()
  }

  createTrafficSourceComparison() {
    this.addHeader('Traffic Source Comparison')

    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Traffic Source Distribution (34-Day Periods)', 50, 120)

    // Traffic source comparison table
    let yPos = 160

    // Headers
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)

    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text('Source Type', 80, yPos, { width: 100 })
      .text('Jun 1 - Jul 3', 180, yPos, { width: 80 })
      .text('Oct 1 - Nov 3', 260, yPos, { width: 80 })
      .text('Change', 340, yPos, { width: 60 })
      .text('Analysis', 400, yPos, { width: 140 })

    yPos += 30

    // Traffic source data
    const sourceTypes = [
      {
        name: 'Organic Search',
        period1: this.period1Data.trafficSources.summary.organic.percentage + '%',
        period2: this.period2Data.trafficSources.summary.organic.percentage + '%',
        change: (parseFloat(this.period2Data.trafficSources.summary.organic.percentage) - parseFloat(this.period1Data.trafficSources.summary.organic.percentage)).toFixed(2) + 'pp'
      },
      {
        name: 'Direct Traffic',
        period1: this.period1Data.trafficSources.summary.direct.percentage + '%',
        period2: this.period2Data.trafficSources.summary.direct.percentage + '%',
        change: (parseFloat(this.period2Data.trafficSources.summary.direct.percentage) - parseFloat(this.period1Data.trafficSources.summary.direct.percentage)).toFixed(2) + 'pp'
      },
      {
        name: 'Paid Advertising',
        period1: this.period1Data.trafficSources.summary.paid.percentage + '%',
        period2: this.period2Data.trafficSources.summary.paid.percentage + '%',
        change: (parseFloat(this.period2Data.trafficSources.summary.paid.percentage) - parseFloat(this.period1Data.trafficSources.summary.paid.percentage)).toFixed(2) + 'pp'
      },
      {
        name: 'Social Media',
        period1: this.period1Data.trafficSources.summary.social.percentage + '%',
        period2: this.period2Data.trafficSources.summary.social.percentage + '%',
        change: (parseFloat(this.period2Data.trafficSources.summary.social.percentage) - parseFloat(this.period1Data.trafficSources.summary.social.percentage)).toFixed(2) + 'pp'
      }
    ]

    sourceTypes.forEach(source => {
      const changeValue = parseFloat(source.change)
      const analysis = Math.abs(changeValue) > 5 ? 'Significant' : Math.abs(changeValue) > 2 ? 'Moderate' : 'Stable'
      const changeColor = changeValue > 0 ? this.colors.success : changeValue < 0 ? this.colors.danger : this.colors.text

      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(source.name, 80, yPos, { width: 100 })
        .text(source.period1, 180, yPos, { width: 80 })
        .text(source.period2, 260, yPos, { width: 80 })

      this.doc.fillColor(changeColor)
        .text(source.change, 340, yPos, { width: 60 })

      this.doc.fillColor(this.colors.text)
        .text(analysis, 400, yPos, { width: 140 })

      yPos += 20
    })

    // Key insights
    yPos += 30
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Key Insights', 50, yPos)

    const period1Sessions = this.period1Data.engagementMetrics?.totalSessions || this.period1Data.trafficSources.totalSessions
    const period2Sessions = this.period2Data.engagementMetrics?.totalSessions || this.period2Data.trafficSources.totalSessions

    const insights = [
      `Total Sessions: ${period1Sessions.toLocaleString()} → ${period2Sessions.toLocaleString()}`,
      `Organic Traffic: ${this.period1Data.trafficSources.summary.organic.percentage}% → ${this.period2Data.trafficSources.summary.organic.percentage}%`,
      `Direct Traffic: ${this.period1Data.trafficSources.summary.direct.percentage}% → ${this.period2Data.trafficSources.summary.direct.percentage}%`,
      `Daily Average: ${Math.round(period1Sessions / 34)} → ${Math.round(period2Sessions / 34)} sessions/day`
    ]

    yPos += 30
    insights.forEach(insight => {
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`• ${insight}`, 70, yPos)
      yPos += 20
    })

    this.addFooter(3)
    this.doc.addPage()
  }

  async generateReport() {
    console.log('📄 Generating Apples-to-Apples Comparison PDF...')
    
    // Load data
    this.period1Data = JSON.parse(fs.readFileSync('analytics-june-july-2025-raw.json'))
    this.period2Data = JSON.parse(fs.readFileSync('analytics-current-period-raw.json'))
    
    // Set up PDF stream
    const outputPath = 'admi-apples-to-apples-comparison-report.pdf'
    this.doc.pipe(fs.createWriteStream(outputPath))
    
    // Generate pages
    this.createCoverPage()
    this.createExecutiveSummary()
    this.createTrafficSourceComparison()
    
    // Finalize PDF
    this.doc.end()
    
    console.log(`✅ Apples-to-Apples Comparison PDF saved: ${process.cwd()}/${outputPath}`)
    console.log(`🎉 Apples-to-Apples Comparison PDF generated: ${process.cwd()}/${outputPath}`)
    
    return outputPath
  }
}

// Generate the report
if (require.main === module) {
  const generator = new ApplesToApplesComparisonPDF()
  generator.generateReport()
    .then(() => {
      console.log('✅ PDF generation completed!')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ PDF generation failed:', error.message)
      process.exit(1)
    })
}

module.exports = ApplesToApplesComparisonPDF
