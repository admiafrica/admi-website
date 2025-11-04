/* eslint-disable @typescript-eslint/no-var-requires */
const PDFDocument = require('pdfkit')
const fs = require('fs')

/**
 * ADMI Gap Analysis & Recovery Strategy PDF Generator
 * Historical Analysis 2017-2025 with Recovery Roadmap
 */

class GapAnalysisRecoveryPDF {
  constructor() {
    this.doc = new PDFDocument({ margin: 50, size: 'A4' })
    this.colors = {
      primary: '#1F4E79',
      secondary: '#4472C4',
      success: '#28A745',
      warning: '#FFC107',
      danger: '#DC3545',
      critical: '#8B0000',
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
    this.addHeader('Gap Analysis & Recovery Strategy')
    
    this.doc.fontSize(32)
      .fillColor(this.colors.critical)
      .text('CRITICAL TRAFFIC DECLINE', 50, 150, { align: 'center' })
    
    this.doc.fontSize(24)
      .fillColor(this.colors.primary)
      .text('Historical Analysis 2017-2025', 50, 200, { align: 'center' })
    
    // Critical metrics
    this.doc.fontSize(18)
      .fillColor(this.colors.danger)
      .text('94.7% TRAFFIC DECLINE', 50, 280, { align: 'center' })
      .text('2024: 537,842 sessions → 2025: 28,565 sessions', 50, 310, { align: 'center' })
    
    // Recovery target box
    this.doc.rect(100, 380, 400, 120)
      .stroke(this.colors.critical)
      .lineWidth(3)
    
    this.doc.fontSize(16)
      .fillColor(this.colors.critical)
      .text('RECOVERY TARGET', 50, 400, { align: 'center' })
    
    this.doc.fontSize(24)
      .fillColor(this.colors.primary)
      .text('509,277 Sessions', 50, 430, { align: 'center' })
    
    this.doc.fontSize(14)
      .fillColor(this.colors.text)
      .text('Need to recover to reach 2024 peak performance', 50, 460, { align: 'center' })
    
    // Key insights
    const insights = [
      '2017-2019: No GA4 data available (likely different tracking)',
      '2024: Peak year with 537K sessions, 6.54% organic',
      '2025: Massive decline but organic improved to 68.88%',
      'Strategy shift: Volume → Quality (but too extreme)'
    ]
    
    let yPos = 550
    this.doc.fontSize(12)
      .fillColor(this.colors.text)
    
    insights.forEach(insight => {
      this.doc.text(`• ${insight}`, 70, yPos)
      yPos += 20
    })
    
    this.addFooter(1)
    this.doc.addPage()
  }

  createHistoricalOverview() {
    this.addHeader('Historical Performance Overview')
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Year-over-Year Performance Analysis', 50, 120)
    
    // Performance table
    let yPos = 160
    
    // Headers
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)
    
    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text('Year', 80, yPos, { width: 60 })
      .text('Total Sessions', 140, yPos, { width: 100 })
      .text('Daily Average', 240, yPos, { width: 80 })
      .text('Organic %', 320, yPos, { width: 60 })
      .text('Status', 380, yPos, { width: 80 })
      .text('Notes', 460, yPos, { width: 80 })
    
    yPos += 30
    
    const yearData = [
      { year: '2017', sessions: '0', daily: '0', organic: 'N/A', status: 'No Data', notes: 'Pre-GA4' },
      { year: '2018', sessions: '0', daily: '0', organic: 'N/A', status: 'No Data', notes: 'Pre-GA4' },
      { year: '2019', sessions: '0', daily: '0', organic: 'N/A', status: 'No Data', notes: 'Pre-GA4' },
      { year: '2024', sessions: '537,842', daily: '1,471', organic: '6.54%', status: 'PEAK', notes: 'High Volume' },
      { year: '2025', sessions: '28,565', daily: '78', organic: '68.88%', status: 'CRITICAL', notes: 'Quality Focus' }
    ]
    
    yearData.forEach(data => {
      const statusColor = data.status === 'PEAK' ? this.colors.success : 
                         data.status === 'CRITICAL' ? this.colors.danger : this.colors.mediumGray
      
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(data.year, 80, yPos, { width: 60 })
        .text(data.sessions, 140, yPos, { width: 100 })
        .text(data.daily, 240, yPos, { width: 80 })
        .text(data.organic, 320, yPos, { width: 60 })
      
      this.doc.fillColor(statusColor)
        .text(data.status, 380, yPos, { width: 80 })
      
      this.doc.fillColor(this.colors.text)
        .text(data.notes, 460, yPos, { width: 80 })
      
      yPos += 20
    })
    
    // Key insights
    yPos += 30
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Critical Insights', 50, yPos)
    
    const insights = [
      {
        title: 'Massive Volume Decline',
        description: '94.7% drop from 2024 peak - most severe decline possible',
        impact: 'CRITICAL'
      },
      {
        title: 'Organic Quality Improvement',
        description: 'Organic traffic improved from 6.54% to 68.88% (+62.34pp)',
        impact: 'POSITIVE'
      },
      {
        title: 'Strategy Overcorrection',
        description: 'Shifted too far from volume to quality - need balance',
        impact: 'STRATEGIC'
      },
      {
        title: 'Historical Data Gap',
        description: '2017-2019 data unavailable - likely different tracking system',
        impact: 'LIMITATION'
      }
    ]
    
    yPos += 30
    insights.forEach(insight => {
      const impactColor = insight.impact === 'CRITICAL' ? this.colors.danger :
                         insight.impact === 'POSITIVE' ? this.colors.success :
                         insight.impact === 'STRATEGIC' ? this.colors.warning : this.colors.mediumGray
      
      this.doc.fontSize(12)
        .fillColor(this.colors.secondary)
        .text(`• ${insight.title}`, 70, yPos)
      
      this.doc.fontSize(8)
        .fillColor(impactColor)
        .text(`[${insight.impact}]`, 450, yPos)
      
      yPos += 18
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(insight.description, 90, yPos, { width: 452 })
      
      yPos += 30
    })
    
    this.addFooter(2)
    this.doc.addPage()
  }

  createGapAnalysis() {
    this.addHeader('Gap Analysis & Root Causes')
    
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Traffic Decline Root Cause Analysis', 50, 120)
    
    // Gap metrics
    const gapMetrics = [
      { metric: 'Session Gap', value: '509,277 sessions', percentage: '94.7% decline', severity: 'CRITICAL' },
      { metric: 'Daily Gap', value: '1,393 sessions/day', percentage: '94.7% decline', severity: 'CRITICAL' },
      { metric: 'Organic Shift', value: '+62.34pp organic', percentage: '1,053% improvement', severity: 'POSITIVE' },
      { metric: 'Volume vs Quality', value: 'Extreme overcorrection', percentage: 'Strategy misalignment', severity: 'STRATEGIC' }
    ]
    
    let yPos = 160
    gapMetrics.forEach(gap => {
      const severityColor = gap.severity === 'CRITICAL' ? this.colors.danger :
                           gap.severity === 'POSITIVE' ? this.colors.success :
                           gap.severity === 'STRATEGIC' ? this.colors.warning : this.colors.text
      
      this.doc.rect(70, yPos - 5, 472, 40)
        .stroke(this.colors.lightGray)
      
      this.doc.fontSize(12)
        .fillColor(this.colors.secondary)
        .text(gap.metric, 80, yPos)
      
      this.doc.fontSize(14)
        .fillColor(severityColor)
        .text(gap.value, 80, yPos + 15)
      
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(gap.percentage, 300, yPos + 10)
      
      this.doc.fontSize(10)
        .fillColor(severityColor)
        .text(gap.severity, 450, yPos + 10)
      
      yPos += 50
    })
    
    // Root causes
    yPos += 20
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Identified Root Causes', 50, yPos)
    
    const rootCauses = [
      {
        cause: 'Extreme Strategy Shift',
        description: 'Moved from high-volume/low-quality to low-volume/high-quality too aggressively',
        impact: 'Lost 94.7% of traffic volume',
        solution: 'Gradual transition with volume protection'
      },
      {
        cause: 'Paid Advertising Reduction',
        description: '2024 likely had significant paid traffic that was eliminated in 2025',
        impact: 'Lost primary traffic source',
        solution: 'Strategic paid advertising reintroduction'
      },
      {
        cause: 'Content/SEO Overcorrection',
        description: 'Focus on organic quality may have reduced content volume/frequency',
        impact: 'Reduced discoverability and reach',
        solution: 'Scale content production while maintaining quality'
      },
      {
        cause: 'Tracking/Measurement Changes',
        description: 'Possible changes in tracking implementation or data collection',
        impact: 'Data accuracy concerns',
        solution: 'Audit tracking implementation'
      }
    ]
    
    yPos += 30
    rootCauses.forEach(cause => {
      this.doc.fontSize(12)
        .fillColor(this.colors.danger)
        .text(`• ${cause.cause}`, 70, yPos)
      
      yPos += 18
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`Problem: ${cause.description}`, 90, yPos, { width: 452 })
      
      yPos += 15
      this.doc.fontSize(10)
        .fillColor(this.colors.mediumGray)
        .text(`Impact: ${cause.impact}`, 90, yPos, { width: 452 })
      
      yPos += 15
      this.doc.fontSize(10)
        .fillColor(this.colors.success)
        .text(`Solution: ${cause.solution}`, 90, yPos, { width: 452 })
      
      yPos += 25
    })
    
    this.addFooter(3)
    this.doc.addPage()
  }

  createRecoveryStrategy() {
    this.addHeader('Recovery Strategy & Action Plan')

    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('90-Day Recovery Roadmap', 50, 120)

    // Recovery phases
    const phases = [
      {
        phase: 'Phase 1: Immediate Actions (0-30 days)',
        priority: 'CRITICAL',
        target: 'Recover 25% of traffic (134K sessions)',
        actions: [
          'Audit tracking implementation for data accuracy',
          'Reintroduce strategic paid advertising campaigns',
          'Scale content production to 3x current volume',
          'Optimize existing high-performing content'
        ]
      },
      {
        phase: 'Phase 2: Strategic Recovery (30-60 days)',
        priority: 'HIGH',
        target: 'Recover 50% of traffic (268K sessions)',
        actions: [
          'Launch comprehensive SEO campaign',
          'Expand keyword targeting to broader African markets',
          'Implement content automation systems',
          'Optimize conversion funnels for quality traffic'
        ]
      },
      {
        phase: 'Phase 3: Growth & Optimization (60-90 days)',
        priority: 'MEDIUM',
        target: 'Recover 75% of traffic (403K sessions)',
        actions: [
          'Launch social media advertising campaigns',
          'Implement advanced retargeting strategies',
          'Expand to new traffic channels',
          'Optimize for both volume and quality'
        ]
      }
    ]

    let yPos = 160
    phases.forEach(phase => {
      const priorityColor = phase.priority === 'CRITICAL' ? this.colors.danger :
                           phase.priority === 'HIGH' ? this.colors.warning :
                           this.colors.success

      // Phase header
      this.doc.rect(70, yPos - 5, 472, 30)
        .fill(priorityColor)

      this.doc.fontSize(12)
        .fillColor('white')
        .text(phase.phase, 80, yPos + 5)

      this.doc.fontSize(10)
        .text(phase.target, 350, yPos + 5)

      yPos += 40

      // Actions
      phase.actions.forEach(action => {
        this.doc.fontSize(10)
          .fillColor(this.colors.text)
          .text(`• ${action}`, 90, yPos)
        yPos += 15
      })

      yPos += 20
    })

    // Success metrics
    yPos += 10
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Success Metrics & KPIs', 50, yPos)

    const metrics = [
      { metric: 'Daily Sessions', current: '78', target: '1,100+', improvement: '1,311%' },
      { metric: 'Monthly Sessions', current: '2,380', target: '33,500+', improvement: '1,307%' },
      { metric: 'Organic %', current: '68.88%', target: '45-55%', improvement: 'Balanced' },
      { metric: 'Traffic Quality', current: 'High', target: 'High', improvement: 'Maintained' }
    ]

    yPos += 30

    // Metrics table header
    this.doc.rect(70, yPos - 5, 472, 25)
      .fill(this.colors.lightGray)

    this.doc.fontSize(10)
      .fillColor(this.colors.primary)
      .text('Metric', 80, yPos, { width: 100 })
      .text('Current', 180, yPos, { width: 80 })
      .text('Target', 260, yPos, { width: 80 })
      .text('Improvement', 340, yPos, { width: 100 })
      .text('Timeline', 440, yPos, { width: 100 })

    yPos += 30

    metrics.forEach(metric => {
      this.doc.fontSize(9)
        .fillColor(this.colors.text)
        .text(metric.metric, 80, yPos, { width: 100 })
        .text(metric.current, 180, yPos, { width: 80 })
        .text(metric.target, 260, yPos, { width: 80 })
        .text(metric.improvement, 340, yPos, { width: 100 })
        .text('90 days', 440, yPos, { width: 100 })

      yPos += 20
    })

    this.addFooter(4)
    this.doc.addPage()
  }

  createImplementationPlan() {
    this.addHeader('Implementation Plan & Next Steps')

    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Immediate Action Items (Week 1)', 50, 120)

    const immediateActions = [
      {
        action: 'Data Audit & Verification',
        owner: 'Analytics Team',
        timeline: '2 days',
        priority: 'CRITICAL',
        description: 'Verify tracking accuracy and identify any measurement issues'
      },
      {
        action: 'Paid Advertising Restart',
        owner: 'Marketing Team',
        timeline: '3 days',
        priority: 'CRITICAL',
        description: 'Launch targeted Google Ads and Meta campaigns for immediate traffic'
      },
      {
        action: 'Content Production Scale-Up',
        owner: 'Content Team',
        timeline: '5 days',
        priority: 'HIGH',
        description: 'Increase content production to 3x current volume while maintaining quality'
      },
      {
        action: 'SEO Quick Wins',
        owner: 'SEO Team',
        timeline: '7 days',
        priority: 'HIGH',
        description: 'Optimize existing high-traffic pages and fix technical SEO issues'
      }
    ]

    let yPos = 160
    immediateActions.forEach(item => {
      const priorityColor = item.priority === 'CRITICAL' ? this.colors.danger :
                           item.priority === 'HIGH' ? this.colors.warning :
                           this.colors.success

      this.doc.rect(70, yPos - 5, 472, 50)
        .stroke(this.colors.lightGray)

      this.doc.fontSize(12)
        .fillColor(this.colors.secondary)
        .text(item.action, 80, yPos)

      this.doc.fontSize(8)
        .fillColor(priorityColor)
        .text(item.priority, 450, yPos)

      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(`Owner: ${item.owner} | Timeline: ${item.timeline}`, 80, yPos + 15)

      this.doc.fontSize(9)
        .fillColor(this.colors.mediumGray)
        .text(item.description, 80, yPos + 30, { width: 452 })

      yPos += 60
    })

    // Risk mitigation
    yPos += 20
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Risk Mitigation Strategies', 50, yPos)

    const risks = [
      {
        risk: 'Quality Degradation',
        mitigation: 'Implement quality gates and content review processes',
        probability: 'Medium'
      },
      {
        risk: 'Budget Constraints',
        mitigation: 'Phase paid advertising spend based on performance',
        probability: 'Low'
      },
      {
        risk: 'Resource Limitations',
        mitigation: 'Prioritize high-impact activities and consider outsourcing',
        probability: 'Medium'
      },
      {
        risk: 'Market Competition',
        mitigation: 'Focus on unique value propositions and niche targeting',
        probability: 'High'
      }
    ]

    yPos += 30
    risks.forEach(risk => {
      const probColor = risk.probability === 'High' ? this.colors.danger :
                       risk.probability === 'Medium' ? this.colors.warning :
                       this.colors.success

      this.doc.fontSize(12)
        .fillColor(this.colors.secondary)
        .text(`• ${risk.risk}`, 70, yPos)

      this.doc.fontSize(8)
        .fillColor(probColor)
        .text(risk.probability, 450, yPos)

      yPos += 18
      this.doc.fontSize(10)
        .fillColor(this.colors.text)
        .text(risk.mitigation, 90, yPos, { width: 452 })

      yPos += 25
    })

    // Final recommendations
    yPos += 20
    this.doc.fontSize(16)
      .fillColor(this.colors.primary)
      .text('Final Recommendations', 50, yPos)

    const finalRecs = [
      'Balance volume and quality - don\'t sacrifice all volume for organic percentage',
      'Implement gradual strategy changes rather than extreme shifts',
      'Monitor daily metrics closely during recovery phase',
      'Maintain focus on African market expansion opportunities',
      'Consider seasonal patterns and intake periods in planning'
    ]

    yPos += 30
    finalRecs.forEach(rec => {
      this.doc.fontSize(12)
        .fillColor(this.colors.text)
        .text(`• ${rec}`, 70, yPos, { width: 472 })
      yPos += 20
    })

    this.addFooter(5)
  }

  async generateReport() {
    console.log('📄 Generating Gap Analysis & Recovery Strategy PDF...')
    
    // Load historical data
    this.historicalData = JSON.parse(fs.readFileSync('analytics-historical-2017-2025.json'))
    
    // Set up PDF stream
    const outputPath = 'admi-gap-analysis-recovery-strategy.pdf'
    this.doc.pipe(fs.createWriteStream(outputPath))
    
    // Generate pages
    this.createCoverPage()
    this.createHistoricalOverview()
    this.createGapAnalysis()
    this.createRecoveryStrategy()
    this.createImplementationPlan()
    
    // Finalize PDF
    this.doc.end()
    
    console.log(`✅ Gap Analysis & Recovery Strategy PDF saved: ${process.cwd()}/${outputPath}`)
    console.log(`🎉 Gap Analysis & Recovery Strategy PDF generated: ${process.cwd()}/${outputPath}`)
    
    return outputPath
  }
}

// Generate the report
if (require.main === module) {
  const generator = new GapAnalysisRecoveryPDF()
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

module.exports = GapAnalysisRecoveryPDF
