#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const ADMITrafficAnalyzer = require('./traffic-analysis')
const ADMIReportGenerator = require('./report-generator')

/**
 * Complete ADMI Analytics Pipeline
 * Runs traffic analysis and generates comprehensive report
 */

async function runCompleteAnalysis() {
  console.log('🚀 ADMI Website Traffic Analysis Pipeline')
  console.log('=' .repeat(50))
  
  try {
    // Step 1: Run traffic analysis
    console.log('\n📊 Step 1: Collecting Analytics Data...')
    const analyzer = new ADMITrafficAnalyzer()
    const rawData = await analyzer.runCompleteAnalysis()
    
    if (!rawData) {
      console.error('❌ Failed to collect analytics data')
      process.exit(1)
    }
    
    // Step 2: Save raw data
    const rawDataPath = path.join(process.cwd(), 'analytics-data-raw.json')
    require('fs').writeFileSync(rawDataPath, JSON.stringify(rawData, null, 2))
    console.log(`✅ Raw data saved: ${rawDataPath}`)
    
    // Step 3: Generate report
    console.log('\n📄 Step 2: Generating Comprehensive Report...')
    const generator = new ADMIReportGenerator(rawDataPath)
    const report = generator.generateCompleteReport()
    
    if (!report) {
      console.error('❌ Failed to generate report')
      process.exit(1)
    }
    
    // Step 4: Save final report
    const reportPath = path.join(process.cwd(), 'analytics-report-june-september-2024.md')
    require('fs').writeFileSync(reportPath, report)
    
    console.log('\n🎉 Analysis Complete!')
    console.log('=' .repeat(50))
    console.log(`📊 Raw Data: ${rawDataPath}`)
    console.log(`📄 Final Report: ${reportPath}`)
    console.log('\n📈 Key Metrics Summary:')
    console.log(`   • Total Sessions: ${rawData.trafficSources.totalSessions.toLocaleString()}`)
    console.log(`   • Top Source: ${rawData.trafficSources.sources[0].source}/${rawData.trafficSources.sources[0].medium}`)
    console.log(`   • Countries: ${rawData.geographicData.allCountries.length}`)
    console.log(`   • African Markets: ${rawData.geographicData.africanCountries.length}`)
    console.log(`   • Primary Device: ${rawData.deviceData.devices[0].device}`)
    
    return {
      success: true,
      rawDataPath,
      reportPath,
      summary: {
        totalSessions: rawData.trafficSources.totalSessions,
        topSource: `${rawData.trafficSources.sources[0].source}/${rawData.trafficSources.sources[0].medium}`,
        countries: rawData.geographicData.allCountries.length,
        africanMarkets: rawData.geographicData.africanCountries.length
      }
    }
    
  } catch (error) {
    console.error('\n❌ Analysis Pipeline Failed:', error.message)
    
    if (error.message.includes('Service account credentials')) {
      console.log('\n🔧 Setup Required:')
      console.log('1. Create Google Cloud service account')
      console.log('2. Enable Google Analytics Data API')
      console.log('3. Download service account key as ga-service-account.json')
      console.log('4. Add service account to Google Analytics with Viewer permissions')
      console.log('\nSee scripts/analytics/traffic-analysis.js for detailed setup instructions')
    }
    
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  runCompleteAnalysis()
}

module.exports = { runCompleteAnalysis }
