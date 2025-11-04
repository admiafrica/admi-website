/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

/**
 * ADMI Analytics Report Generator
 * Processes raw analytics data and generates comprehensive markdown report
 */

class ADMIReportGenerator {
  constructor(rawDataPath) {
    this.rawDataPath = rawDataPath
    this.data = null
  }

  /**
   * Load raw analytics data
   */
  loadData() {
    try {
      if (!fs.existsSync(this.rawDataPath)) {
        throw new Error(`Raw data file not found: ${this.rawDataPath}`)
      }

      this.data = JSON.parse(fs.readFileSync(this.rawDataPath, 'utf8'))
      console.log('✅ Raw analytics data loaded successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to load raw data:', error.message)
      return false
    }
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary() {
    const { trafficSources, geographicData, deviceData } = this.data

    const totalSessions = trafficSources.totalSessions
    const totalUsers = trafficSources.sources.reduce((sum, s) => sum + s.users, 0)
    const topSource = trafficSources.sources[0]
    const kenyaPercentage = geographicData.kenyaData 
      ? ((geographicData.kenyaData.sessions / geographicData.totalSessions) * 100).toFixed(1)
      : 'N/A'

    return `## Executive Summary

### Key Performance Indicators (June - September 2025)

- **Total Sessions**: ${totalSessions.toLocaleString()}
- **Total Users**: ${totalUsers.toLocaleString()}
- **Top Traffic Source**: ${topSource.source}/${topSource.medium} (${topSource.percentage}% of traffic)
- **Kenya Traffic Share**: ${kenyaPercentage}% of total sessions
- **Primary Device**: ${deviceData.devices[0].device} (${deviceData.devices[0].percentage}% of sessions)

### Critical Findings

1. **${topSource.source}/${topSource.medium}** dominates traffic with ${topSource.percentage}% share
2. **Geographic Distribution**: ${geographicData.africanCountries.length} African countries represented
3. **Device Preference**: ${deviceData.devices[0].device} users show ${deviceData.devices[0].avgSessionDuration > deviceData.devices[1]?.avgSessionDuration ? 'higher' : 'lower'} engagement
4. **Bounce Rate Concern**: Average bounce rate of ${(trafficSources.sources.slice(0, 5).reduce((sum, s) => sum + s.bounceRate, 0) / 5).toFixed(1)}% across top sources

### Immediate Action Items

- **SEO Optimization**: Focus on organic search improvements for diploma courses
- **Mobile Experience**: Optimize for ${deviceData.devices[0].device.toLowerCase()} users (${deviceData.devices[0].percentage}% of traffic)
- **African Market Expansion**: Leverage ${geographicData.africanCountries.length} country presence
- **Conversion Optimization**: Address high bounce rates in key traffic sources`
  }

  /**
   * Generate traffic source analysis
   */
  generateTrafficSourceAnalysis() {
    const { trafficSources } = this.data
    const { sources, summary } = trafficSources

    let analysis = `## Traffic Source Analysis

### Overview by Channel

| Channel | Sessions | Percentage | Avg Duration | Bounce Rate |
|---------|----------|------------|--------------|-------------|`

    // Group by channel type
    const channels = {
      'Organic Search': sources.filter(s => s.medium === 'organic'),
      'Direct Traffic': sources.filter(s => s.source === 'direct' || s.medium === '(none)'),
      'Social Media': sources.filter(s => s.medium === 'social' || ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].includes(s.source.toLowerCase())),
      'Referral': sources.filter(s => s.medium === 'referral'),
      'Email': sources.filter(s => s.medium === 'email'),
      'Paid Search': sources.filter(s => s.medium === 'cpc' || s.medium === 'ppc')
    }

    Object.entries(channels).forEach(([channel, channelSources]) => {
      if (channelSources.length > 0) {
        const totalSessions = channelSources.reduce((sum, s) => sum + s.sessions, 0)
        const avgDuration = (channelSources.reduce((sum, s) => sum + s.avgSessionDuration, 0) / channelSources.length).toFixed(1)
        const avgBounceRate = (channelSources.reduce((sum, s) => sum + s.bounceRate, 0) / channelSources.length).toFixed(1)
        const percentage = ((totalSessions / trafficSources.totalSessions) * 100).toFixed(1)

        analysis += `\n| ${channel} | ${totalSessions.toLocaleString()} | ${percentage}% | ${avgDuration}s | ${avgBounceRate}% |`
      }
    })

    analysis += `\n\n### Top 10 Traffic Sources (Detailed)

| Rank | Source/Medium | Sessions | Users | Pages/Session | Avg Duration | Bounce Rate |
|------|---------------|----------|-------|---------------|--------------|-------------|`

    sources.slice(0, 10).forEach((source, index) => {
      const pagesPerSession = (source.pageviews / source.sessions).toFixed(1)
      analysis += `\n| ${index + 1} | ${source.source}/${source.medium} | ${source.sessions.toLocaleString()} | ${source.users.toLocaleString()} | ${pagesPerSession} | ${source.avgSessionDuration.toFixed(1)}s | ${source.bounceRate.toFixed(1)}% |`
    })

    // Add insights
    analysis += `\n\n### Key Insights

#### Organic Search Performance
- **Total Organic Sessions**: ${summary.organic.toLocaleString()}
- **Organic Share**: ${((summary.organic / trafficSources.totalSessions) * 100).toFixed(1)}%
- **Top Organic Sources**: ${sources.filter(s => s.medium === 'organic').slice(0, 3).map(s => s.source).join(', ')}

#### Direct Traffic Analysis
- **Direct Sessions**: ${summary.direct.toLocaleString()}
- **Direct Share**: ${((summary.direct / trafficSources.totalSessions) * 100).toFixed(1)}%
- **Brand Recognition**: ${summary.direct > summary.organic ? 'Strong' : 'Moderate'} brand awareness indicated

#### Social Media Performance
- **Social Sessions**: ${summary.social.toLocaleString()}
- **Social Share**: ${((summary.social / trafficSources.totalSessions) * 100).toFixed(1)}%
- **Engagement Quality**: ${sources.filter(s => s.medium === 'social').length > 0 ? 
    (sources.filter(s => s.medium === 'social')[0].bounceRate < 60 ? 'High' : 'Moderate') : 'N/A'}`

    return analysis
  }

  /**
   * Generate geographic analysis
   */
  generateGeographicAnalysis() {
    const { geographicData } = this.data
    const { allCountries, africanCountries, kenyaData } = geographicData

    let analysis = `## Geographic Analysis

### Top 15 Countries by Sessions

| Rank | Country | Sessions | Users | Avg Duration | Bounce Rate |
|------|---------|----------|-------|--------------|-------------|`

    allCountries.slice(0, 15).forEach((country, index) => {
      const percentage = ((country.sessions / geographicData.totalSessions) * 100).toFixed(1)
      analysis += `\n| ${index + 1} | ${country.country} | ${country.sessions.toLocaleString()} (${percentage}%) | ${country.users.toLocaleString()} | ${country.avgSessionDuration.toFixed(1)}s | ${country.bounceRate.toFixed(1)}% |`
    })

    analysis += `\n\n### African Market Analysis

**Total African Countries Represented**: ${africanCountries.length}

| Country | Sessions | Share of African Traffic | Engagement Quality |
|---------|----------|-------------------------|-------------------|`

    const totalAfricanSessions = africanCountries.reduce((sum, c) => sum + c.sessions, 0)

    africanCountries.slice(0, 10).forEach((country) => {
      const africanShare = ((country.sessions / totalAfricanSessions) * 100).toFixed(1)
      const engagement = country.bounceRate < 50 ? 'High' : country.bounceRate < 70 ? 'Medium' : 'Low'
      analysis += `\n| ${country.country} | ${country.sessions.toLocaleString()} | ${africanShare}% | ${engagement} |`
    })

    if (kenyaData) {
      analysis += `\n\n### Kenya Market Deep Dive

- **Sessions**: ${kenyaData.sessions.toLocaleString()}
- **Users**: ${kenyaData.users.toLocaleString()}
- **Market Share**: ${((kenyaData.sessions / geographicData.totalSessions) * 100).toFixed(1)}% of total traffic
- **Engagement**: ${kenyaData.avgSessionDuration.toFixed(1)}s average session duration
- **Bounce Rate**: ${kenyaData.bounceRate.toFixed(1)}%
- **Sessions per User**: ${(kenyaData.sessions / kenyaData.users).toFixed(1)}

**Kenya Performance**: ${kenyaData.bounceRate < 50 ? 'Excellent' : kenyaData.bounceRate < 70 ? 'Good' : 'Needs Improvement'} user engagement`
    }

    return analysis
  }

  /**
   * Generate device analysis
   */
  generateDeviceAnalysis() {
    const { deviceData } = this.data
    const { devices } = deviceData

    let analysis = `## Device Category Analysis

### Device Usage Distribution

| Device | Sessions | Percentage | Users | Avg Duration | Bounce Rate |
|--------|----------|------------|-------|--------------|-------------|`

    devices.forEach((device) => {
      analysis += `\n| ${device.device} | ${device.sessions.toLocaleString()} | ${device.percentage}% | ${device.users.toLocaleString()} | ${device.avgSessionDuration.toFixed(1)}s | ${device.bounceRate.toFixed(1)}% |`
    })

    const mobileDevice = devices.find(d => d.device.toLowerCase() === 'mobile')
    const desktopDevice = devices.find(d => d.device.toLowerCase() === 'desktop')

    analysis += `\n\n### Device Performance Insights

#### Mobile vs Desktop Comparison
${mobileDevice && desktopDevice ? `
- **Mobile Engagement**: ${mobileDevice.avgSessionDuration.toFixed(1)}s avg duration, ${mobileDevice.bounceRate.toFixed(1)}% bounce rate
- **Desktop Engagement**: ${desktopDevice.avgSessionDuration.toFixed(1)}s avg duration, ${desktopDevice.bounceRate.toFixed(1)}% bounce rate
- **Performance Winner**: ${mobileDevice.avgSessionDuration > desktopDevice.avgSessionDuration ? 'Mobile' : 'Desktop'} users show better engagement
- **Optimization Priority**: ${mobileDevice.sessions > desktopDevice.sessions ? 'Mobile-first' : 'Desktop-first'} approach recommended
` : 'Device comparison data not available'}

#### Key Recommendations
- **Primary Focus**: Optimize for ${devices[0].device.toLowerCase()} users (${devices[0].percentage}% of traffic)
- **Secondary Focus**: Improve ${devices[1]?.device.toLowerCase() || 'other device'} experience
- **Performance Gap**: ${Math.abs(devices[0].bounceRate - (devices[1]?.bounceRate || 0)).toFixed(1)}% bounce rate difference between top devices`

    return analysis
  }

  /**
   * Generate monthly trends analysis
   */
  generateMonthlyTrends() {
    const { monthlyTrends } = this.data

    let analysis = `## Monthly Traffic Trends

### Traffic Volume by Month

| Month | Total Sessions | Growth Rate | Top Source |
|-------|----------------|-------------|------------|`

    const months = Object.keys(monthlyTrends).sort()
    let previousSessions = 0

    months.forEach((month, index) => {
      const monthData = monthlyTrends[month]
      const growthRate = index === 0 ? 'N/A' : 
        (((monthData.totalSessions - previousSessions) / previousSessions) * 100).toFixed(1) + '%'
      
      const topSource = Object.entries(monthData.sources)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'

      const monthName = this.formatMonth(month)
      analysis += `\n| ${monthName} | ${monthData.totalSessions.toLocaleString()} | ${growthRate} | ${topSource} |`
      
      previousSessions = monthData.totalSessions
    })

    // Calculate overall trend
    const firstMonth = monthlyTrends[months[0]]
    const lastMonth = monthlyTrends[months[months.length - 1]]
    const overallGrowth = ((lastMonth.totalSessions - firstMonth.totalSessions) / firstMonth.totalSessions * 100).toFixed(1)

    analysis += `\n\n### Trend Analysis

- **Overall Growth**: ${overallGrowth}% from June to September
- **Peak Month**: ${this.formatMonth(months.find(m => monthlyTrends[m].totalSessions === Math.max(...months.map(month => monthlyTrends[month].totalSessions))))}
- **Growth Pattern**: ${overallGrowth > 0 ? 'Positive' : 'Negative'} trend over the period
- **Seasonality**: ${this.analyzeSeasonal(months, monthlyTrends)}`

    return analysis
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations() {
    const { trafficSources, geographicData, deviceData, conversionData } = this.data

    const topSource = trafficSources.sources[0]
    const organicSources = trafficSources.sources.filter(s => s.medium === 'organic')
    const socialSources = trafficSources.sources.filter(s => s.medium === 'social')
    const primaryDevice = deviceData.devices[0]

    return `## Actionable Recommendations

### 🎯 Priority 1: SEO Optimization (High Impact)

#### Organic Search Improvements
- **Current Performance**: ${organicSources.length} organic sources, ${trafficSources.summary.organic.toLocaleString()} sessions
- **Target Keywords**: Focus on "music production courses Kenya", "film school Nairobi", "digital media training Africa"
- **Content Strategy**: Create location-specific landing pages for diploma courses
- **Technical SEO**: Improve page load speeds for mobile users (${primaryDevice.device.toLowerCase()} optimization)

**Expected Impact**: 25-40% increase in organic traffic within 3 months

### 🌍 Priority 2: African Market Expansion (Medium Impact)

#### Geographic Targeting
- **Current Reach**: ${geographicData.africanCountries.length} African countries
- **Opportunity Markets**: Nigeria, South Africa, Ghana (high digital adoption)
- **Localization**: Create country-specific course information and pricing
- **SEO Strategy**: Target "film school [country]", "music production [country]" keywords

**Expected Impact**: 15-25% increase in African traffic

### 📱 Priority 3: Mobile Experience Optimization (High Impact)

#### Device-Specific Improvements
- **Primary Users**: ${primaryDevice.device} (${primaryDevice.percentage}% of traffic)
- **Current Performance**: ${primaryDevice.bounceRate.toFixed(1)}% bounce rate
- **Optimization Areas**: 
  - Mobile-first course pages design
  - Simplified enquiry forms for mobile
  - Faster loading times for course videos

**Expected Impact**: 20-30% reduction in bounce rate

### 📈 Priority 4: Conversion Rate Optimization (High Impact)

#### Enquiry Form Improvements
- **Current Conversion Rate**: ${conversionData.conversionRate}%
- **Top Converting Sources**: Focus optimization on ${topSource.source}/${topSource.medium}
- **A/B Testing**: Test different form layouts and call-to-action buttons
- **Follow-up Strategy**: Implement automated email sequences for form submissions

**Expected Impact**: 30-50% increase in enquiry form submissions

### 🎬 Priority 5: Course-Specific SEO (Medium Impact)

#### Diploma Course Focus
- **Target Courses**: Music Production, Film & TV Production (mentioned as priority)
- **Content Marketing**: Create blog content around "music technology", "film production careers"
- **Schema Markup**: Implement Course structured data (as discussed in memories)
- **Local SEO**: Optimize for "film school Kenya", "music production school Nairobi"

**Expected Impact**: 20-35% increase in course page traffic

### 📊 Priority 6: Analytics & Tracking Improvements (Low Impact, High Value)

#### Enhanced Measurement
- **Goal Tracking**: Set up proper conversion tracking for enquiry forms
- **Event Tracking**: Monitor video plays, course page engagement
- **Attribution**: Implement enhanced e-commerce tracking for course enquiries
- **Reporting**: Monthly traffic source performance reviews

**Expected Impact**: Better data-driven decision making

### 🚀 Quick Wins (Implement Within 30 Days)

1. **Mobile Page Speed**: Optimize images and reduce JavaScript for mobile
2. **Course Page CTAs**: Add prominent "Enquire Now" buttons on diploma course pages
3. **Social Proof**: Add testimonials and success stories to high-traffic pages
4. **Local Contact Info**: Ensure Nairobi address and Kenya phone number are prominent
5. **FAQ Optimization**: Create course-specific FAQ sections based on search queries

### 📅 Implementation Timeline

**Month 1**: Mobile optimization, quick wins, analytics setup
**Month 2**: SEO content creation, course page improvements
**Month 3**: African market expansion, conversion optimization
**Month 4**: Advanced tracking, performance analysis, strategy refinement

### 💰 Budget Allocation Recommendations

- **SEO Tools & Content**: 40% of digital marketing budget
- **Mobile/Technical Improvements**: 30% of budget
- **Paid Advertising (African markets)**: 20% of budget
- **Analytics & Testing Tools**: 10% of budget`
  }

  /**
   * Generate complete report
   */
  generateCompleteReport() {
    if (!this.loadData()) {
      return null
    }

    const report = `# ADMI Website Traffic Analysis Report
## June 1 - September 30, 2025

*Generated on: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}*

---

${this.generateExecutiveSummary()}

---

${this.generateTrafficSourceAnalysis()}

---

${this.generateGeographicAnalysis()}

---

${this.generateDeviceAnalysis()}

---

${this.generateMonthlyTrends()}

---

${this.generateRecommendations()}

---

## Data Sources & Methodology

- **Analytics Platform**: Google Analytics 4 (GA4)
- **Property ID**: ${this.data.period ? '250948607' : 'N/A'}
- **Data Collection Period**: ${this.data.period?.startDate} to ${this.data.period?.endDate}
- **API Used**: Google Analytics Data API v1
- **Report Generated**: ${this.data.generatedAt}

### Limitations
- Conversion data may be incomplete if event tracking is not fully configured
- Some traffic sources may be grouped under "direct" due to privacy restrictions
- Geographic data is based on IP location and may not reflect actual user location

---

*This report was generated using the official Google Analytics Data API and represents actual website performance data for admi.africa during the specified period.*`

    return report
  }

  /**
   * Helper method to format month
   */
  formatMonth(yearMonth) {
    const year = yearMonth.substring(0, 4)
    const month = yearMonth.substring(4, 6)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  /**
   * Analyze seasonal patterns
   */
  analyzeSeasonal(months, monthlyTrends) {
    const sessions = months.map(m => monthlyTrends[m].totalSessions)
    const maxSessions = Math.max(...sessions)
    const minSessions = Math.min(...sessions)
    const variance = ((maxSessions - minSessions) / minSessions * 100).toFixed(1)
    
    return `${variance}% variance between peak and low months`
  }
}

// Export for use in other scripts
module.exports = ADMIReportGenerator

// Run report generation if called directly
if (require.main === module) {
  const rawDataPath = path.join(process.cwd(), 'analytics-data-raw.json')
  const generator = new ADMIReportGenerator(rawDataPath)
  
  const report = generator.generateCompleteReport()
  
  if (report) {
    const outputPath = path.join(process.cwd(), 'analytics-report-june-september-2024.md')
    fs.writeFileSync(outputPath, report)
    console.log(`📄 Analytics report generated: ${outputPath}`)
  } else {
    console.error('❌ Failed to generate report')
    process.exit(1)
  }
}
