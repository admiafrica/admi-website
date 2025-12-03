/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Meta Ads Real-Time Monitoring Dashboard
 * Monitors retargeting performance and pre-qualification form conversions
 * Tracks budget utilization and ROI for the 150-student campaign
 */

class MetaAdsMonitor {
  constructor(refreshInterval = 300000) {
    // Default 5 minutes
    this.accessToken = process.env.META_ACCESS_TOKEN
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID
    this.pixelId = process.env.META_PIXEL_ID
    this.baseUrl = 'https://graph.instagram.com/v18.0'
    this.refreshInterval = refreshInterval
    this.monitoringStartTime = Date.now()
  }

  /**
   * Get real-time campaign metrics
   */
  async getCampaignMetrics(accountId, campaignId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${campaignId}/insights?` +
          'fields=campaign_id,campaign_name,spend,impressions,clicks,actions,action_values,state&' +
          'date_preset=today&' +
          `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (!data.data || data.data.length === 0) {
        return null
      }

      const insight = data.data[0]

      // Parse actions for conversions
      let conversions = 0
      let leads = 0

      if (insight.actions) {
        insight.actions.forEach((action) => {
          if (action.action_type === 'offsite_conversion.fb_pixel_purchase') {
            conversions = parseInt(action.value || 0)
          }
          if (action.action_type === 'offsite_conversion.fb_pixel_lead') {
            leads = parseInt(action.value || 0)
          }
        })
      }

      return {
        campaignId: insight.campaign_id,
        campaignName: insight.campaign_name,
        spend: parseFloat(insight.spend || 0),
        impressions: parseInt(insight.impressions || 0),
        clicks: parseInt(insight.clicks || 0),
        conversions: conversions,
        leads: leads,
        cpc: parseFloat(insight.spend || 0) / parseInt(insight.clicks || 1),
        cpm: (parseFloat(insight.spend || 0) / parseInt(insight.impressions || 1)) * 1000,
        cpa: conversions > 0 ? parseFloat(insight.spend || 0) / conversions : 0,
        state: insight.state
      }
    } catch (error) {
      console.error(`Error getting metrics for campaign ${campaignId}:`, error.message)
      return null
    }
  }

  /**
   * Get real-time audience segmentation metrics
   */
  async getAudienceMetrics(accountId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${accountId}/campaigns?` + 'fields=id,name&status=ACTIVE&' + `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error || !data.data) {
        return []
      }

      const metrics = []

      for (const campaign of data.data) {
        const adsets = await fetch(
          `${this.baseUrl}/${campaign.id}/adsets?` +
            'fields=id,name,targeting&status=ACTIVE&' +
            `access_token=${this.accessToken}`
        )

        const adsetData = await adsets.json()

        if (adsetData.data) {
          for (const adset of adsetData.data) {
            const insights = await this.getCampaignMetrics(accountId, adset.id)

            if (insights) {
              metrics.push({
                campaignName: campaign.name,
                audience: this.parseTargeting(adset.targeting),
                ...insights
              })
            }
          }
        }
      }

      return metrics
    } catch (error) {
      console.error('Error getting audience metrics:', error.message)
      return []
    }
  }

  /**
   * Parse targeting to readable format
   */
  parseTargeting(targeting) {
    if (!targeting) return 'Unknown'

    const targetingObj = typeof targeting === 'string' ? JSON.parse(targeting) : targeting

    const parts = []

    if (targetingObj.geo_locations) {
      parts.push(`Geo: ${targetingObj.geo_locations.regions?.length || 0} regions`)
    }
    if (targetingObj.age_min || targetingObj.age_max) {
      parts.push(`Age: ${targetingObj.age_min || 'Any'}-${targetingObj.age_max || 'Any'}`)
    }
    if (targetingObj.interests) {
      parts.push(`Interests: ${targetingObj.interests.length || 0}`)
    }

    return parts.length > 0 ? parts.join(' • ') : 'Broad targeting'
  }

  /**
   * Calculate pre-qualification form completion rate
   */
  async getFormCompletionMetrics(pixelId) {
    try {
      // Get pixel events
      const response = await fetch(
        `${this.baseUrl}/${pixelId}/events?` +
          'fields=event_name,count&date_preset=today&' +
          `access_token=${this.accessToken}`
      )

      const data = await response.json()

      if (data.error || !data.data) {
        return null
      }

      let pageViews = 0
      let formStarts = 0
      let formCompletions = 0
      let purchases = 0

      data.data.forEach((event) => {
        if (event.event_name === 'PageView') pageViews = event.count
        if (event.event_name === 'InitiateCheckout') formStarts = event.count
        if (event.event_name === 'Lead') formCompletions = event.count
        if (event.event_name === 'Purchase') purchases = event.count
      })

      return {
        pageViews,
        formStarts,
        formCompletions,
        purchases,
        viewToFormRate: pageViews > 0 ? (formStarts / pageViews) * 100 : 0,
        completionRate: formStarts > 0 ? (formCompletions / formStarts) * 100 : 0,
        purchaseRate: formCompletions > 0 ? (purchases / formCompletions) * 100 : 0
      }
    } catch (error) {
      console.error('Error getting form metrics:', error.message)
      return null
    }
  }

  /**
   * Format metrics for dashboard display
   */
  formatDashboard(metrics, formMetrics) {
    console.clear()
    console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════')
    console.log('\x1b[36m%s\x1b[0m', '📊 ADMI META ADS REAL-TIME MONITORING DASHBOARD')
    console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════')

    console.log(`\n⏱️  Last updated: ${new Date().toLocaleString()}`)
    console.log(`🚀 Monitoring since: ${new Date(this.monitoringStartTime).toLocaleString()}\n`)

    // Campaign summary
    console.log('\x1b[33m%s\x1b[0m', '💰 CAMPAIGN PERFORMANCE:')
    let totalSpend = 0
    let totalImpressions = 0
    let totalClicks = 0

    metrics.forEach((m) => {
      totalSpend += m.spend
      totalImpressions += m.impressions
      totalClicks += m.clicks

      console.log(`\n  📢 ${m.campaignName}`)
      console.log(`     Audience: ${m.audience}`)
      console.log(
        `     💵 Spend: $${m.spend.toFixed(2)} | Impressions: ${m.impressions.toLocaleString()} | Clicks: ${m.clicks.toLocaleString()}`
      )
      console.log(`     📊 CPC: $${m.cpc.toFixed(2)} | CPM: $${m.cpm.toFixed(2)} | CPA: $${m.cpa.toFixed(2)}`)
      if (m.conversions > 0) {
        console.log(`     ✅ Conversions: ${m.conversions} | Status: ${m.state}`)
      }
    })

    // Totals
    console.log('\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(
      `  💹 TOTAL: $${totalSpend.toFixed(2)} spent | ${totalImpressions.toLocaleString()} impressions | ${totalClicks.toLocaleString()} clicks`
    )

    if (totalClicks > 0) {
      const avgCPC = totalSpend / totalClicks
      const avgCPM = (totalSpend / totalImpressions) * 1000
      console.log(`  📈 Avg CPC: $${avgCPC.toFixed(2)} | Avg CPM: $${avgCPM.toFixed(2)}`)
    }

    // Pre-qualification form metrics
    if (formMetrics) {
      console.log('\n\x1b[33m%s\x1b[0m', '📋 PRE-QUALIFICATION FORM METRICS:')
      console.log(`  👁️  Page Views: ${formMetrics.pageViews.toLocaleString()}`)
      console.log(
        `  ✍️  Form Starts: ${formMetrics.formStarts.toLocaleString()} (${formMetrics.viewToFormRate.toFixed(1)}% of views)`
      )
      console.log(
        `  ✅ Form Completions: ${formMetrics.formCompletions.toLocaleString()} (${formMetrics.completionRate.toFixed(1)}% completion)`
      )
      console.log(
        `  🎓 Enrollments: ${formMetrics.purchases.toLocaleString()} (${formMetrics.purchaseRate.toFixed(1)}% of completions)`
      )

      // Calculate cost per enrollment
      if (formMetrics.purchases > 0) {
        const costPerEnrollment = totalSpend / formMetrics.purchases
        const targetCost = 1600 / 150 // $10.67 per student
        const efficiency = (targetCost / costPerEnrollment) * 100

        console.log('\n  💰 ENROLLMENT ECONOMICS:')
        console.log(`     Cost per Enrollment: $${costPerEnrollment.toFixed(2)}`)
        console.log(`     Target Cost: $${targetCost.toFixed(2)}`)
        console.log(`     Efficiency: ${efficiency.toFixed(1)}% of target`)

        if (efficiency >= 100) {
          console.log('     \x1b[32m✅ ON TRACK TO MEET GOALS\x1b[0m')
        } else {
          console.log('     \x1b[31m⚠️  Below target - optimize audience targeting\x1b[0m')
        }
      }
    }

    // Budget tracking
    console.log('\n\x1b[33m%s\x1b[0m', '💵 BUDGET TRACKING:')
    const dailyBudget = 400 / 30 // Meta retargeting budget spread over 30 days
    const dayOfMonth = new Date().getDate()
    const expectedSpend = dailyBudget * dayOfMonth
    const burnRate = (totalSpend / expectedSpend) * 100

    console.log(`  Daily Budget: $${dailyBudget.toFixed(2)}`)
    console.log(`  Day of Month: ${dayOfMonth}/30`)
    console.log(`  Expected Spend: $${expectedSpend.toFixed(2)}`)
    console.log(`  Actual Spend: $${totalSpend.toFixed(2)}`)
    console.log(`  Burn Rate: ${burnRate.toFixed(1)}%`)

    if (burnRate > 110) {
      console.log('  \x1b[31m⚠️  Over budget - consider pausing low-performing campaigns\x1b[0m')
    } else if (burnRate < 90) {
      console.log('  \x1b[32m💡 Under budget - consider increasing bid or expanding audience\x1b[0m')
    }

    console.log('\n\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════')
  }

  /**
   * Start continuous monitoring
   */
  async startMonitoring() {
    console.log('🚀 Starting Meta Ads monitoring...')
    console.log(`Refresh interval: ${this.refreshInterval / 1000}s`)

    if (!this.accessToken) {
      console.log('❌ Missing META_ACCESS_TOKEN')
      return
    }

    const loop = async () => {
      try {
        // Get accounts
        const accountsResponse = await fetch(
          `${this.baseUrl}/me/adaccounts?fields=id,name&access_token=${this.accessToken}`
        )

        const accountsData = await accountsResponse.json()

        if (accountsData.error || !accountsData.data) {
          console.log('Error fetching accounts:', accountsData.error?.message)
          return
        }

        // Collect metrics from all accounts
        let allMetrics = []

        for (const account of accountsData.data) {
          const audienceMetrics = await this.getAudienceMetrics(account.id)
          allMetrics = allMetrics.concat(audienceMetrics)
        }

        // Get form metrics if pixel is configured
        let formMetrics = null
        if (this.pixelId) {
          formMetrics = await this.getFormCompletionMetrics(this.pixelId)
        }

        // Display dashboard
        this.formatDashboard(allMetrics, formMetrics)

        // Save metrics to file
        const metricsPath = path.join(process.cwd(), 'reports', 'meta-ads', `metrics-${Date.now()}.json`)

        const metricsDir = path.dirname(metricsPath)

        if (!fs.existsSync(metricsDir)) {
          fs.mkdirSync(metricsDir, { recursive: true })
        }

        fs.writeFileSync(
          metricsPath,
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              campaigns: allMetrics,
              formMetrics: formMetrics
            },
            null,
            2
          )
        )
      } catch (error) {
        console.error('Monitoring error:', error.message)
      }

      // Schedule next refresh
      setTimeout(loop, this.refreshInterval)
    }

    // Start loop
    loop()
  }
}

// Run monitoring
if (require.main === module) {
  const interval = process.argv[2] ? parseInt(process.argv[2]) : 300000 // Default 5 minutes
  const monitor = new MetaAdsMonitor(interval)
  monitor.startMonitoring()
}

module.exports = MetaAdsMonitor
