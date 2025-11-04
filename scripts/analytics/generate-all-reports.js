/* eslint-disable @typescript-eslint/no-var-requires */
const { ExcelReportGenerator } = require('./generate-excel-report')
const { PDFReportGenerator } = require('./generate-pdf-report')
const fs = require('fs')
const path = require('path')

/**
 * Generate all report formats (Markdown, Excel, PDF)
 */
async function generateAllReports() {
  console.log('🚀 ADMI Analytics Report Generation Pipeline')
  console.log('==================================================')
  
  try {
    // Check if raw data exists
    const rawDataPath = path.join(process.cwd(), 'analytics-data-raw.json')
    if (!fs.existsSync(rawDataPath)) {
      console.log('❌ Raw analytics data not found.')
      console.log('💡 Please run the analysis first: node scripts/analytics/run-analysis.js')
      process.exit(1)
    }
    
    console.log('✅ Raw analytics data found')
    
    // Generate Excel report
    console.log('\n📊 Step 1: Generating Excel Report...')
    const excelGenerator = new ExcelReportGenerator()
    const excelPath = await excelGenerator.generateReport()
    console.log(`✅ Excel report: ${path.basename(excelPath)}`)
    
    // Generate PDF report
    console.log('\n📄 Step 2: Generating PDF Report...')
    const pdfGenerator = new PDFReportGenerator()
    const pdfPath = await pdfGenerator.generateReport()
    console.log(`✅ PDF report: ${path.basename(pdfPath)}`)
    
    // Check if Markdown report exists
    const markdownPath = path.join(process.cwd(), 'analytics-report-june-september-2024.md')
    const markdownExists = fs.existsSync(markdownPath)
    
    console.log('\n🎉 Report Generation Complete!')
    console.log('==================================================')
    console.log('📋 Generated Reports:')
    
    if (markdownExists) {
      console.log(`   📝 Markdown: analytics-report-june-september-2024.md`)
    }
    console.log(`   📊 Excel:    analytics-report-june-september-2024.xlsx`)
    console.log(`   📄 PDF:      analytics-report-june-september-2024.pdf`)
    
    console.log('\n📈 Report Summary:')
    
    // Load and display key metrics
    const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'))
    const totalSessions = rawData.trafficSources.sources.reduce((sum, source) => sum + source.sessions, 0)
    const topSource = rawData.trafficSources.sources[0]
    const countries = rawData.geographicData?.allCountries || []
    const devices = rawData.deviceData?.devices || []
    
    console.log(`   • Total Sessions: ${totalSessions.toLocaleString()}`)
    console.log(`   • Top Source: ${topSource.source}/${topSource.medium} (${topSource.percentage}%)`)
    console.log(`   • Countries: ${countries.length}`)
    console.log(`   • Device Types: ${devices.length}`)
    console.log(`   • Analysis Period: June 1 - September 30, 2025`)
    
    console.log('\n💡 Next Steps:')
    console.log('   1. Review the comprehensive analysis in all three formats')
    console.log('   2. Share the Excel/PDF versions with stakeholders')
    console.log('   3. Implement the prioritized recommendations')
    console.log('   4. Schedule monthly report generation for ongoing monitoring')
    
    console.log('\n🔄 To regenerate reports anytime, run:')
    console.log('   node scripts/analytics/generate-all-reports.js')
    
  } catch (error) {
    console.error('❌ Report generation failed:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Ensure analytics data exists: node scripts/analytics/run-analysis.js')
    console.error('   2. Check Google Analytics API credentials')
    console.error('   3. Verify all dependencies are installed: npm install')
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  generateAllReports()
}

module.exports = { generateAllReports }
