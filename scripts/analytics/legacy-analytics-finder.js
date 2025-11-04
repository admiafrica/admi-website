/* eslint-disable @typescript-eslint/no-var-requires */
const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config()

/**
 * Legacy Google Analytics (Universal Analytics) Data Finder
 * This script helps find and access historical data from 2017-2024
 * using Universal Analytics (GA3) instead of GA4
 */

class LegacyAnalyticsFinder {
  constructor() {
    this.auth = null
    this.analytics = null
    this.analyticsReporting = null
  }

  async initializeAuth() {
    try {
      // Initialize Google Auth using service account
      this.auth = new google.auth.GoogleAuth({
        keyFile: 'ga-service-account.json',
        scopes: [
          'https://www.googleapis.com/auth/analytics.readonly',
          'https://www.googleapis.com/auth/analytics.manage.users.readonly'
        ]
      })

      const authClient = await this.auth.getClient()
      
      // Initialize Analytics Management API (to find properties)
      this.analytics = google.analytics({
        version: 'v3',
        auth: authClient
      })

      // Initialize Analytics Reporting API (to get data)
      this.analyticsReporting = google.analyticsreporting({
        version: 'v4',
        auth: authClient
      })

      console.log('✅ Legacy Google Analytics client initialized')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize legacy GA client:', error.message)
      console.log('\n💡 Possible solutions:')
      console.log('1. Ensure ga-service-account.json exists and has proper permissions')
      console.log('2. Make sure the service account has access to Google Analytics')
      console.log('3. Check if Universal Analytics properties still exist (they may have been sunset)')
      return false
    }
  }

  async findLegacyProperties() {
    console.log('🔍 Searching for legacy Universal Analytics properties...')
    
    try {
      // Get all accounts
      const accounts = await this.analytics.management.accounts.list()
      
      if (!accounts.data.items || accounts.data.items.length === 0) {
        console.log('❌ No Google Analytics accounts found')
        return []
      }

      console.log(`✅ Found ${accounts.data.items.length} Google Analytics account(s)`)
      
      const allProperties = []

      for (const account of accounts.data.items) {
        console.log(`\n📊 Account: ${account.name} (ID: ${account.id})`)
        
        try {
          // Get properties for this account
          const properties = await this.analytics.management.webproperties.list({
            accountId: account.id
          })

          if (properties.data.items && properties.data.items.length > 0) {
            console.log(`   Found ${properties.data.items.length} properties:`)
            
            for (const property of properties.data.items) {
              console.log(`   • ${property.name}`)
              console.log(`     - Property ID: ${property.id}`)
              console.log(`     - Website URL: ${property.websiteUrl}`)
              console.log(`     - Created: ${property.created}`)
              console.log(`     - Updated: ${property.updated}`)
              
              // Check if this looks like ADMI property
              const isADMI = property.name?.toLowerCase().includes('admi') || 
                            property.websiteUrl?.includes('admi.') ||
                            property.websiteUrl?.includes('admi-')
              
              if (isADMI) {
                console.log(`     🎯 POTENTIAL ADMI PROPERTY FOUND!`)
              }
              
              allProperties.push({
                accountId: account.id,
                accountName: account.name,
                propertyId: property.id,
                propertyName: property.name,
                websiteUrl: property.websiteUrl,
                created: property.created,
                updated: property.updated,
                isADMI
              })

              // Get views for this property
              try {
                const views = await this.analytics.management.profiles.list({
                  accountId: account.id,
                  webPropertyId: property.id
                })

                if (views.data.items && views.data.items.length > 0) {
                  console.log(`     Views (${views.data.items.length}):`)
                  for (const view of views.data.items) {
                    console.log(`       - ${view.name} (View ID: ${view.id})`)
                  }
                }
              } catch (viewError) {
                console.log(`     ⚠️  Could not fetch views: ${viewError.message}`)
              }
            }
          } else {
            console.log(`   No properties found for this account`)
          }
        } catch (propertyError) {
          console.log(`   ⚠️  Could not fetch properties: ${propertyError.message}`)
        }
      }

      return allProperties
    } catch (error) {
      console.error('❌ Error finding legacy properties:', error.message)
      return []
    }
  }

  async testLegacyDataAccess(viewId, startDate = '2017-01-01', endDate = '2024-12-31') {
    console.log(`\n🧪 Testing data access for View ID: ${viewId}`)
    console.log(`   Date range: ${startDate} to ${endDate}`)
    
    try {
      const response = await this.analyticsReporting.reports.batchGet({
        requestBody: {
          reportRequests: [{
            viewId: viewId,
            dateRanges: [{ startDate, endDate }],
            metrics: [
              { expression: 'ga:sessions' },
              { expression: 'ga:users' },
              { expression: 'ga:pageviews' },
              { expression: 'ga:bounceRate' },
              { expression: 'ga:avgSessionDuration' }
            ],
            dimensions: [
              { name: 'ga:year' },
              { name: 'ga:month' }
            ],
            orderBys: [
              { fieldName: 'ga:year', sortOrder: 'ASCENDING' },
              { fieldName: 'ga:month', sortOrder: 'ASCENDING' }
            ]
          }]
        }
      })

      const report = response.data.reports[0]
      
      if (report.data && report.data.rows && report.data.rows.length > 0) {
        console.log(`✅ Successfully retrieved ${report.data.rows.length} data points`)
        
        // Calculate totals
        let totalSessions = 0
        let totalUsers = 0
        let totalPageviews = 0
        
        console.log('\n📊 Monthly breakdown:')
        report.data.rows.forEach(row => {
          const year = row.dimensions[0]
          const month = row.dimensions[1]
          const sessions = parseInt(row.metrics[0].values[0])
          const users = parseInt(row.metrics[0].values[1])
          const pageviews = parseInt(row.metrics[0].values[2])
          
          totalSessions += sessions
          totalUsers += users
          totalPageviews += pageviews
          
          console.log(`   ${year}-${month.padStart(2, '0')}: ${sessions.toLocaleString()} sessions, ${users.toLocaleString()} users`)
        })
        
        console.log(`\n📈 TOTALS (${startDate} to ${endDate}):`)
        console.log(`   Sessions: ${totalSessions.toLocaleString()}`)
        console.log(`   Users: ${totalUsers.toLocaleString()}`)
        console.log(`   Pageviews: ${totalPageviews.toLocaleString()}`)
        
        return {
          success: true,
          totalSessions,
          totalUsers,
          totalPageviews,
          monthlyData: report.data.rows.map(row => ({
            year: row.dimensions[0],
            month: row.dimensions[1],
            sessions: parseInt(row.metrics[0].values[0]),
            users: parseInt(row.metrics[0].values[1]),
            pageviews: parseInt(row.metrics[0].values[2]),
            bounceRate: parseFloat(row.metrics[0].values[3]),
            avgSessionDuration: parseFloat(row.metrics[0].values[4])
          }))
        }
      } else {
        console.log('❌ No data found for this view and date range')
        return { success: false, error: 'No data found' }
      }
    } catch (error) {
      console.error(`❌ Error accessing data: ${error.message}`)
      return { success: false, error: error.message }
    }
  }

  async runLegacyAnalysisFinder() {
    console.log('🚀 Starting Legacy Analytics Finder...')
    console.log('This will help locate Universal Analytics data from 2017-2024\n')
    
    // Initialize authentication
    const authSuccess = await this.initializeAuth()
    if (!authSuccess) {
      return null
    }

    // Find all legacy properties
    const properties = await this.findLegacyProperties()
    
    if (properties.length === 0) {
      console.log('\n❌ No legacy properties found')
      console.log('\n💡 This could mean:')
      console.log('1. No Universal Analytics properties exist for this service account')
      console.log('2. Universal Analytics properties have been sunset (Google ended UA on July 1, 2023)')
      console.log('3. Service account lacks proper permissions')
      console.log('4. ADMI may have used a different Google account for legacy analytics')
      return null
    }

    // Save findings
    const findings = {
      generatedAt: new Date().toISOString(),
      totalProperties: properties.length,
      admiProperties: properties.filter(p => p.isADMI),
      allProperties: properties,
      recommendations: this.generateRecommendations(properties)
    }

    fs.writeFileSync('legacy-analytics-findings.json', JSON.stringify(findings, null, 2))
    console.log('\n✅ Findings saved to: legacy-analytics-findings.json')

    // Test data access for ADMI properties
    const admiProperties = properties.filter(p => p.isADMI)
    if (admiProperties.length > 0) {
      console.log('\n🧪 Testing data access for ADMI properties...')
      
      for (const property of admiProperties) {
        console.log(`\n📊 Testing property: ${property.propertyName}`)
        // Note: We need the View ID, not Property ID for data access
        // This would require another API call to get views
      }
    }

    return findings
  }

  generateRecommendations(properties) {
    const recommendations = []
    
    const admiProperties = properties.filter(p => p.isADMI)
    
    if (admiProperties.length === 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Check if ADMI used a different Google account for legacy analytics',
        reason: 'No ADMI-related properties found in current account'
      })
      
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Contact previous ADMI team members about legacy analytics setup',
        reason: 'Historical knowledge may be needed to locate legacy data'
      })
    } else {
      recommendations.push({
        priority: 'HIGH',
        action: `Test data access for ${admiProperties.length} ADMI properties found`,
        reason: 'Verify if historical data is still accessible'
      })
    }
    
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Note that Universal Analytics was sunset on July 1, 2023',
      reason: 'Legacy data may no longer be accessible through API'
    })
    
    return recommendations
  }
}

// Run the finder
if (require.main === module) {
  const finder = new LegacyAnalyticsFinder()
  finder.runLegacyAnalysisFinder()
    .then((findings) => {
      if (findings) {
        console.log('\n🎉 Legacy Analytics Finder completed!')
        console.log(`Found ${findings.totalProperties} total properties`)
        console.log(`Found ${findings.admiProperties.length} ADMI-related properties`)
      } else {
        console.log('\n❌ Legacy Analytics Finder completed with no results')
      }
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Legacy Analytics Finder failed:', error.message)
      process.exit(1)
    })
}

module.exports = LegacyAnalyticsFinder
