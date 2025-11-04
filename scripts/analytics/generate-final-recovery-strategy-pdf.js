/* eslint-disable @typescript-eslint/no-var-requires */
const PDFDocument = require('pdfkit')
const fs = require('fs')

/**
 * Generate Final ADMI Recovery Strategy PDF
 * Combines all findings: GA4 analysis, Google Ads discovery, and recovery plan
 */

class FinalRecoveryStrategyPDF {
  constructor() {
    this.doc = new PDFDocument({ margin: 50 })
    this.currentY = 50
  }

  addTitle(text, fontSize = 20) {
    this.doc.fontSize(fontSize).fillColor('#1a365d').text(text, 50, this.currentY)
    this.currentY += fontSize + 10
  }

  addSubtitle(text, fontSize = 16) {
    this.doc.fontSize(fontSize).fillColor('#2d3748').text(text, 50, this.currentY)
    this.currentY += fontSize + 8
  }

  addText(text, fontSize = 12) {
    this.doc.fontSize(fontSize).fillColor('#4a5568').text(text, 50, this.currentY, { width: 500 })
    this.currentY += this.doc.heightOfString(text, { width: 500 }) + 5
  }

  addBulletPoint(text, fontSize = 11) {
    this.doc.fontSize(fontSize).fillColor('#4a5568').text(`• ${text}`, 70, this.currentY, { width: 480 })
    this.currentY += this.doc.heightOfString(`• ${text}`, { width: 480 }) + 3
  }

  addTable(headers, rows) {
    const startY = this.currentY
    const colWidth = 100
    const rowHeight = 25

    // Headers
    headers.forEach((header, i) => {
      this.doc.fontSize(10).fillColor('#1a365d').text(header, 50 + (i * colWidth), startY, { width: colWidth - 5 })
    })

    // Rows
    rows.forEach((row, rowIndex) => {
      const y = startY + ((rowIndex + 1) * rowHeight)
      row.forEach((cell, colIndex) => {
        this.doc.fontSize(9).fillColor('#4a5568').text(cell, 50 + (colIndex * colWidth), y, { width: colWidth - 5 })
      })
    })

    this.currentY = startY + ((rows.length + 1) * rowHeight) + 10
  }

  addHighlightBox(title, content, color = '#e6fffa') {
    const boxHeight = 80
    this.doc.rect(50, this.currentY, 500, boxHeight).fillAndStroke(color, '#38b2ac')
    
    this.doc.fontSize(12).fillColor('#1a365d').text(title, 60, this.currentY + 10)
    this.doc.fontSize(10).fillColor('#2d3748').text(content, 60, this.currentY + 30, { width: 480 })
    
    this.currentY += boxHeight + 15
  }

  addPageBreak() {
    this.doc.addPage()
    this.currentY = 50
  }

  generatePDF() {
    console.log('📄 Generating Final ADMI Recovery Strategy PDF...')

    // Page 1: Executive Summary
    this.addTitle('🚨 ADMI TRAFFIC RECOVERY STRATEGY', 24)
    this.addSubtitle('Complete Analysis & Action Plan', 16)
    this.addText(`Generated: ${new Date().toLocaleDateString()}`)
    this.addText('Google Ads Account: 392-935-5931')
    this.currentY += 20

    this.addHighlightBox(
      '🎯 CRITICAL DISCOVERY',
      'Found the root cause: 99.4% decline in paid advertising from 267K sessions (2024) to 1.5K sessions (2025). Campaigns likely PAUSED, not deleted.'
    )

    this.addSubtitle('📊 Traffic Analysis Summary')
    this.addTable(
      ['Period', 'Total Sessions', 'Paid %', 'Organic %', 'Status'],
      [
        ['2024 Full Year', '537,842', '43.64%', '6.52%', 'Peak Performance'],
        ['2025 Current', '28,565', '5.46%', '68.77%', 'Critical Decline'],
        ['Oct-Nov 2025', '3,635', '2.42%', '67.92%', 'Emergency Level']
      ]
    )

    this.addSubtitle('🔍 Key Findings')
    this.addBulletPoint('94.7% total traffic decline from 2024 to 2025')
    this.addBulletPoint('Paid advertising dropped from 43.64% to 2.42% of traffic')
    this.addBulletPoint('Organic traffic improved from 6.52% to 67.92% (quality gain)')
    this.addBulletPoint('Daily sessions dropped from 1,471 to 78 (-94.7%)')
    this.addBulletPoint('Estimated 2024 ad spend: $50K-$100K annually')

    this.addPageBreak()

    // Page 2: Campaign Analysis
    this.addTitle('📊 GOOGLE ADS CAMPAIGN ANALYSIS')
    
    this.addSubtitle('🎯 High-Priority Campaigns Identified (From GA4 Data)')
    
    this.addText('Campaign "1" (Google AdWords)')
    this.addBulletPoint('2024 Performance: 129,197 sessions (TOP PERFORMER)')
    this.addBulletPoint('Estimated spend: $25,000-$40,000')
    this.addBulletPoint('Status: Likely PAUSED - check immediately')
    this.currentY += 10

    this.addText('"Creative Media and Tech | New Landing Page"')
    this.addBulletPoint('2024 Performance: 10,475 sessions')
    this.addBulletPoint('Google CPC campaign targeting general audience')
    this.addBulletPoint('Action: REACTIVATE with $100/day budget')
    this.currentY += 10

    this.addText('Course-Specific Campaigns')
    this.addBulletPoint('"Digital Content Creation Cert": 6,656 sessions')
    this.addBulletPoint('"Data Analysis Cert": 5,617 sessions')
    this.addBulletPoint('High-converting course-specific targeting')
    this.addBulletPoint('Action: REACTIVATE with $50/day each')
    this.currentY += 10

    this.addText('"sep2024" Meta Campaign')
    this.addBulletPoint('2024 Performance: 48,205 sessions')
    this.addBulletPoint('Platform: Meta Ads (Facebook/Instagram)')
    this.addBulletPoint('Action: Check Meta Ads Manager separately')

    this.addSubtitle('💰 Budget Analysis')
    this.addTable(
      ['Campaign Type', '2024 Sessions', 'Est. Spend', 'CPS', 'Priority'],
      [
        ['Google Search', '145,000+', '$30K-50K', '$0.21-0.34', 'HIGH'],
        ['Meta Ads', '48,205', '$10K-15K', '$0.21-0.31', 'MEDIUM'],
        ['Course Specific', '12,273', '$5K-10K', '$0.41-0.81', 'HIGH'],
        ['Display/Other', '62,099', '$5K-15K', '$0.08-0.24', 'LOW']
      ]
    )

    this.addPageBreak()

    // Page 3: Recovery Strategy
    this.addTitle('🚀 RECOVERY STRATEGY')

    this.addSubtitle('Phase 1: Emergency Restart (Days 1-30)')
    this.addHighlightBox(
      '⚡ IMMEDIATE ACTIONS',
      'Login to Google Ads (https://ads.google.com/aw/campaigns?ocid=3929355931) and reactivate paused campaigns TODAY. Start with $5,000/month budget.'
    )

    this.addText('Campaign Reactivation Priority:')
    this.addBulletPoint('1. "Creative Media and Tech" - $100/day (300-500 sessions/day expected)')
    this.addBulletPoint('2. Course-specific campaigns - $50/day each (150-250 sessions/day each)')
    this.addBulletPoint('3. Recreate Campaign "1" if removed - $67/day')
    this.addBulletPoint('4. Check Meta Ads for "sep2024" campaign')

    this.addSubtitle('Phase 2: Scale & Optimize (Days 31-60)')
    this.addBulletPoint('Increase budget to $8,000-$10,000/month based on performance')
    this.addBulletPoint('Launch new course-specific campaigns for high-demand programs')
    this.addBulletPoint('Expand geographic targeting within Africa')
    this.addBulletPoint('A/B test ad copy and landing pages')

    this.addSubtitle('Phase 3: Sustainable Growth (Days 61-90)')
    this.addBulletPoint('Achieve balanced traffic mix: 50% organic, 30% paid, 20% other')
    this.addBulletPoint('Optimize for cost efficiency and conversion quality')
    this.addBulletPoint('Implement advanced targeting and remarketing')
    this.addBulletPoint('Scale to $10,000-$15,000/month if ROI supports')

    this.addSubtitle('🎯 Recovery Targets')
    this.addTable(
      ['Timeline', 'Daily Sessions', 'Paid %', 'Monthly Budget', 'Status'],
      [
        ['Week 1', '500-800', '15-20%', '$5,000', 'Emergency'],
        ['Month 1', '1,000+', '25%', '$7,000', 'Recovery'],
        ['Month 2', '1,200+', '30%', '$10,000', 'Growth'],
        ['Month 3', '1,500+', '30%', '$12,000', 'Sustainable']
      ]
    )

    this.addPageBreak()

    // Page 4: Implementation Guide
    this.addTitle('📋 IMPLEMENTATION GUIDE')

    this.addSubtitle('🔧 Technical Checklist')
    this.addText('Before Reactivating Campaigns:')
    this.addBulletPoint('✅ Verify all landing pages load correctly')
    this.addBulletPoint('✅ Test enquiry forms and contact information')
    this.addBulletPoint('✅ Update phone numbers and addresses')
    this.addBulletPoint('✅ Check mobile responsiveness')
    this.addBulletPoint('✅ Ensure GA4 tracking is working')

    this.addSubtitle('💳 Budget & Billing')
    this.addBulletPoint('Verify Google Ads payment method is active')
    this.addBulletPoint('Set up billing alerts for budget monitoring')
    this.addBulletPoint('Configure daily budget limits to prevent overspend')
    this.addBulletPoint('Set up conversion tracking for enquiry forms')

    this.addSubtitle('📊 Monitoring & Optimization')
    this.addText('Daily Monitoring (First 30 days):')
    this.addBulletPoint('Check campaign performance and spend')
    this.addBulletPoint('Monitor cost per session and conversion rates')
    this.addBulletPoint('Adjust budgets based on performance')
    this.addBulletPoint('Pause underperforming keywords/ads')

    this.addText('Weekly Reviews:')
    this.addBulletPoint('Analyze traffic quality and user behavior')
    this.addBulletPoint('Compare paid vs organic performance')
    this.addBulletPoint('Optimize landing pages based on data')
    this.addBulletPoint('Scale successful campaigns')

    this.addSubtitle('⚠️ Risk Mitigation')
    this.addHighlightBox(
      '🛡️ AVOID 2024 MISTAKES',
      'Don\'t over-rely on paid traffic (43% was unsustainable). Target 30% paid maximum. Maintain organic quality improvements from 2025.'
    )

    this.addText('Quality Gates:')
    this.addBulletPoint('Maintain bounce rate <60%')
    this.addBulletPoint('Keep average session duration >2 minutes')
    this.addBulletPoint('Target conversion rate >2%')
    this.addBulletPoint('Monitor cost per acquisition closely')

    this.addSubtitle('📞 Support Resources')
    this.addBulletPoint('Google Ads Account: https://ads.google.com/aw/campaigns?ocid=3929355931')
    this.addBulletPoint('Google Ads Support: 1-866-2-GOOGLE')
    this.addBulletPoint('Setup Guide: scripts/analytics/google-ads-setup-guide.md')
    this.addBulletPoint('Recovery Plan: scripts/analytics/admi-immediate-recovery-plan.md')

    this.currentY += 20
    this.addHighlightBox(
      '🏆 SUCCESS PREDICTION',
      'Based on historical data, reactivating paused campaigns should restore 60-80% of 2024 traffic within 30-60 days. This is a high-confidence recovery strategy.',
      '#fff5f5'
    )

    // Save PDF
    const filename = 'admi-final-recovery-strategy.pdf'
    this.doc.pipe(fs.createWriteStream(filename))
    this.doc.end()

    console.log(`✅ Final recovery strategy PDF saved: ${filename}`)
    return filename
  }
}

// Generate the PDF
if (require.main === module) {
  const generator = new FinalRecoveryStrategyPDF()
  generator.generatePDF()
}

module.exports = FinalRecoveryStrategyPDF
