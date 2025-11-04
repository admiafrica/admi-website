/* eslint-disable @typescript-eslint/no-var-requires */
const ExcelJS = require('exceljs')
const fs = require('fs')
const path = require('path')

/**
 * Generate Excel version of the analytics report
 */
class ExcelReportGenerator {
  constructor() {
    this.workbook = new ExcelJS.Workbook()
    this.workbook.creator = 'ADMI Analytics System'
    this.workbook.created = new Date()
  }

  async generateReport() {
    console.log('📊 Generating Excel Report...')
    
    // Load raw data
    const rawDataPath = path.join(process.cwd(), 'analytics-data-raw.json')
    if (!fs.existsSync(rawDataPath)) {
      throw new Error('Raw analytics data not found. Please run the analysis first.')
    }
    
    const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'))
    
    // Create worksheets
    this.createExecutiveSummary(rawData)
    this.createTrafficSourcesSheet(rawData)
    this.createGeographicSheet(rawData)
    this.createDeviceSheet(rawData)
    this.createMonthlyTrendsSheet(rawData)
    this.createRecommendationsSheet()
    
    // Save the workbook
    const outputPath = path.join(process.cwd(), 'analytics-report-june-september-2024.xlsx')
    await this.workbook.xlsx.writeFile(outputPath)
    
    console.log(`✅ Excel report saved: ${outputPath}`)
    return outputPath
  }

  createExecutiveSummary(rawData) {
    const worksheet = this.workbook.addWorksheet('Executive Summary')
    
    // Set column widths
    worksheet.columns = [
      { width: 25 },
      { width: 20 },
      { width: 15 },
      { width: 30 }
    ]
    
    // Title
    worksheet.mergeCells('A1:D1')
    const titleCell = worksheet.getCell('A1')
    titleCell.value = 'ADMI Website Traffic Analysis Report'
    titleCell.font = { size: 16, bold: true, color: { argb: 'FF1F4E79' } }
    titleCell.alignment = { horizontal: 'center' }
    
    // Subtitle
    worksheet.mergeCells('A2:D2')
    const subtitleCell = worksheet.getCell('A2')
    subtitleCell.value = 'June 1 - September 30, 2025'
    subtitleCell.font = { size: 12, italic: true }
    subtitleCell.alignment = { horizontal: 'center' }
    
    // Key metrics
    let row = 4
    worksheet.getCell(`A${row}`).value = 'Key Performance Indicators'
    worksheet.getCell(`A${row}`).font = { bold: true, size: 14 }
    row += 2
    
    const totalSessions = rawData.trafficSources.sources.reduce((sum, source) => sum + source.sessions, 0)
    const topSource = rawData.trafficSources.sources[0]
    
    const kpis = [
      ['Total Sessions', totalSessions.toLocaleString()],
      ['Top Traffic Source', `${topSource.source}/${topSource.medium} (${topSource.percentage}%)`],
      ['Kenya Traffic Share', '83.7%'],
      ['Primary Device', 'Mobile (87.18%)'],
      ['Analysis Period', '4 months'],
      ['Countries Reached', '20']
    ]
    
    kpis.forEach(([metric, value]) => {
      worksheet.getCell(`A${row}`).value = metric
      worksheet.getCell(`B${row}`).value = value
      worksheet.getCell(`A${row}`).font = { bold: true }
      row++
    })
    
    // Critical findings
    row += 2
    worksheet.getCell(`A${row}`).value = 'Critical Findings'
    worksheet.getCell(`A${row}`).font = { bold: true, size: 14 }
    row += 1
    
    const findings = [
      'Meta/Facebook paid ads dominate with 53.23% of traffic',
      '19 African countries represented in traffic',
      'Mobile users account for 87.18% of sessions',
      'Strong organic search opportunity (only 9.2% current share)'
    ]
    
    findings.forEach(finding => {
      worksheet.getCell(`A${row}`).value = `• ${finding}`
      row++
    })
  }

  createTrafficSourcesSheet(rawData) {
    const worksheet = this.workbook.addWorksheet('Traffic Sources')
    
    // Headers
    const headers = ['Rank', 'Source', 'Medium', 'Campaign', 'Sessions', 'Percentage', 'Pageviews', 'Avg Duration (s)', 'Bounce Rate']
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1)
      cell.value = header
      cell.font = { bold: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } }
    })
    
    // Data
    rawData.trafficSources.sources.forEach((source, index) => {
      const row = index + 2
      worksheet.getCell(row, 1).value = index + 1
      worksheet.getCell(row, 2).value = source.source
      worksheet.getCell(row, 3).value = source.medium
      worksheet.getCell(row, 4).value = source.campaign
      worksheet.getCell(row, 5).value = source.sessions
      worksheet.getCell(row, 6).value = `${source.percentage}%`
      worksheet.getCell(row, 7).value = source.pageviews
      worksheet.getCell(row, 8).value = source.avgSessionDuration.toFixed(2)
      worksheet.getCell(row, 9).value = (source.bounceRate * 100).toFixed(2) + '%'
    })
    
    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 15
    })
  }

  createGeographicSheet(rawData) {
    const worksheet = this.workbook.addWorksheet('Geographic Analysis')
    
    // Headers
    const headers = ['Rank', 'Country', 'City', 'Sessions', 'Percentage', 'Avg Duration (s)', 'Bounce Rate']
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1)
      cell.value = header
      cell.font = { bold: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } }
    })
    
    // Data
    const countries = rawData.geographicData?.allCountries || []
    const totalSessions = countries.reduce((sum, country) => sum + country.sessions, 0)
    countries.forEach((country, index) => {
      const row = index + 2
      const percentage = ((country.sessions / totalSessions) * 100).toFixed(1)
      
      worksheet.getCell(row, 1).value = index + 1
      worksheet.getCell(row, 2).value = country.country
      worksheet.getCell(row, 3).value = country.city
      worksheet.getCell(row, 4).value = country.sessions
      worksheet.getCell(row, 5).value = `${percentage}%`
      worksheet.getCell(row, 6).value = country.avgSessionDuration.toFixed(2)
      worksheet.getCell(row, 7).value = (country.bounceRate * 100).toFixed(2) + '%'
    })
    
    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 15
    })
  }

  createDeviceSheet(rawData) {
    const worksheet = this.workbook.addWorksheet('Device Analysis')
    
    // Headers
    const headers = ['Device', 'Sessions', 'Percentage', 'Avg Duration (s)', 'Bounce Rate']
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1)
      cell.value = header
      cell.font = { bold: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } }
    })
    
    // Data
    const devices = rawData.deviceData?.devices || []
    devices.forEach((device, index) => {
      const row = index + 2
      worksheet.getCell(row, 1).value = device.device
      worksheet.getCell(row, 2).value = device.sessions
      worksheet.getCell(row, 3).value = `${device.percentage}%`
      worksheet.getCell(row, 4).value = device.avgSessionDuration.toFixed(2)
      worksheet.getCell(row, 5).value = (device.bounceRate * 100).toFixed(2) + '%'
    })
    
    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 15
    })
  }

  createMonthlyTrendsSheet(rawData) {
    const worksheet = this.workbook.addWorksheet('Monthly Trends')
    
    // Headers
    const headers = ['Month', 'Total Sessions', 'Top Source', 'Growth Rate']
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1)
      cell.value = header
      cell.font = { bold: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } }
    })
    
    // Process monthly data
    const monthlyTrends = rawData.monthlyTrends || {}
    const months = Object.keys(monthlyTrends).sort()
    let previousSessions = null
    
    months.forEach((month, index) => {
      const row = index + 2
      const monthData = monthlyTrends[month]
      const topSource = Object.keys(monthData.sources).reduce((a, b) => 
        monthData.sources[a] > monthData.sources[b] ? a : b
      )
      
      let growthRate = 'N/A'
      if (previousSessions !== null) {
        growthRate = (((monthData.totalSessions - previousSessions) / previousSessions) * 100).toFixed(1) + '%'
      }
      
      worksheet.getCell(row, 1).value = month
      worksheet.getCell(row, 2).value = monthData.totalSessions
      worksheet.getCell(row, 3).value = topSource
      worksheet.getCell(row, 4).value = growthRate
      
      previousSessions = monthData.totalSessions
    })
    
    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 20
    })
  }

  createRecommendationsSheet() {
    const worksheet = this.workbook.addWorksheet('Recommendations')
    
    // Title
    worksheet.mergeCells('A1:D1')
    const titleCell = worksheet.getCell('A1')
    titleCell.value = 'Actionable Recommendations'
    titleCell.font = { size: 14, bold: true }
    
    let row = 3
    const recommendations = [
      {
        priority: 'Priority 1',
        category: 'SEO Optimization',
        action: 'Focus on organic search improvements for diploma courses',
        impact: 'High',
        timeline: '3 months'
      },
      {
        priority: 'Priority 1',
        category: 'Mobile Experience',
        action: 'Optimize for mobile users (87.18% of traffic)',
        impact: 'High',
        timeline: '1 month'
      },
      {
        priority: 'Priority 2',
        category: 'African Market Expansion',
        action: 'Leverage presence in 19 African countries',
        impact: 'Medium',
        timeline: '6 months'
      },
      {
        priority: 'Priority 1',
        category: 'Conversion Optimization',
        action: 'Improve enquiry form performance',
        impact: 'High',
        timeline: '2 months'
      }
    ]
    
    // Headers
    const headers = ['Priority', 'Category', 'Action', 'Impact', 'Timeline']
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(row, index + 1)
      cell.value = header
      cell.font = { bold: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E6E6' } }
    })
    row++
    
    // Data
    recommendations.forEach(rec => {
      worksheet.getCell(row, 1).value = rec.priority
      worksheet.getCell(row, 2).value = rec.category
      worksheet.getCell(row, 3).value = rec.action
      worksheet.getCell(row, 4).value = rec.impact
      worksheet.getCell(row, 5).value = rec.timeline
      row++
    })
    
    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 25
    })
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new ExcelReportGenerator()
  generator.generateReport()
    .then(outputPath => {
      console.log(`🎉 Excel report generated successfully: ${outputPath}`)
    })
    .catch(error => {
      console.error('❌ Failed to generate Excel report:', error.message)
      process.exit(1)
    })
}

module.exports = { ExcelReportGenerator }
