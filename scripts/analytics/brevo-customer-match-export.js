#!/usr/bin/env node

/**
 * Brevo to Google Ads Customer Match Export
 * Extracts enrolled students/customers from Brevo for Google Ads Customer Match
 */

const axios = require('axios')
const fs = require('fs')
const crypto = require('crypto')
require('dotenv').config()

class BrevoCustomerExporter {
  constructor() {
    this.apiKey = process.env.BREVO_API_KEY
    this.baseURL = 'https://api.brevo.com/v3'
  }

  /**
   * Hash email for Google Ads (SHA256)
   */
  hashEmail(email) {
    return crypto
      .createHash('sha256')
      .update(email.toLowerCase().trim())
      .digest('hex')
  }

  /**
   * Hash phone for Google Ads (SHA256)
   * Phone must be in E.164 format: +[country code][number]
   */
  hashPhone(phone) {
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    return crypto
      .createHash('sha256')
      .update(cleanPhone)
      .digest('hex')
  }

  /**
   * Get all contacts from Brevo with enrolled/customer status
   * Uses actual Brevo fields: QUALIFICATION_STATUS and QUALIFICATION_SCORE
   */
  async getEnrolledCustomers(options = {}) {
    const {
      minQualificationScore = 70, // Minimum score to be considered "quality"
      qualificationStatuses = ['qualified'], // Can be: 'qualified', 'enrolled', 'customer'
      specificLists = [], // Optional: filter by specific list IDs
      includeAll = false // If true, export ALL contacts (for remarketing lists)
    } = options

    console.log('📊 Fetching customer data from Brevo...\n')
    console.log('Filters:')
    if (includeAll) {
      console.log('   ⚠️  Exporting ALL contacts (remarketing mode)')
    } else {
      console.log(`   Min qualification score: ${minQualificationScore}`)
      console.log(`   Qualification statuses: ${qualificationStatuses.join(', ')}`)
      if (specificLists.length > 0) {
        console.log(`   Specific lists: ${specificLists.join(', ')}`)
      }
    }
    console.log('')

    try {
      let allContacts = []
      let offset = 0
      const limit = 500 // Max per request

      while (true) {
        const response = await axios.get(`${this.baseURL}/contacts`, {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          params: {
            limit: limit,
            offset: offset,
            sort: 'desc'
          }
        })

        const contacts = response.data.contacts || []
        
        if (contacts.length === 0) break

        // Filter based on options
        const filteredContacts = contacts.filter(contact => {
          if (includeAll) return true

          const attributes = contact.attributes || {}
          
          // Check qualification score
          const score = parseInt(attributes.QUALIFICATION_SCORE) || 0
          const hasGoodScore = score >= minQualificationScore
          
          // Check qualification status
          const status = (attributes.QUALIFICATION_STATUS || '').toLowerCase()
          const hasGoodStatus = qualificationStatuses.some(s => 
            status.includes(s.toLowerCase())
          )
          
          // Check list membership if specified
          const inCorrectList = specificLists.length === 0 || 
            specificLists.some(listId => contact.listIds?.includes(listId))

          return (hasGoodScore || hasGoodStatus) && inCorrectList
        })

        allContacts = allContacts.concat(filteredContacts)
        
        console.log(`   Processed ${offset + contacts.length} contacts (${filteredContacts.length} matching criteria)...`)
        
        offset += limit

        // Break if we've fetched all contacts
        if (contacts.length < limit) break
      }

      console.log(`\n✅ Found ${allContacts.length} matching customers\n`)
      return allContacts

    } catch (error) {
      console.error('❌ Failed to fetch contacts:', error.message)
      if (error.response) {
        console.error('   Response:', error.response.data)
      }
      throw error
    }
  }

  /**
   * Prepare customer match data for Google Ads
   */
  prepareCustomerMatchData(contacts) {
    console.log('🔄 Preparing customer match data...\n')

    const customerData = {
      unhashed: [],
      hashed: [],
      stats: {
        total: contacts.length,
        withEmail: 0,
        withPhone: 0,
        withBoth: 0,
        withName: 0
      }
    }

    contacts.forEach(contact => {
      const email = contact.email
      const phone = contact.attributes?.SMS || contact.attributes?.PHONE || contact.attributes?.MOBILE
      const firstName = contact.attributes?.FIRSTNAME || contact.attributes?.FIRST_NAME
      const lastName = contact.attributes?.LASTNAME || contact.attributes?.LAST_NAME
      const country = contact.attributes?.COUNTRY || 'KE' // Default to Kenya

      if (!email && !phone) return // Need at least email or phone

      // Unhashed data (for CSV export to upload in Google Ads UI)
      const unhashedRecord = {
        email: email || '',
        phone: phone || '',
        firstName: firstName || '',
        lastName: lastName || '',
        country: country || '',
        enrollmentDate: contact.attributes?.ENROLLMENT_DATE || '',
        course: contact.attributes?.COURSE || ''
      }
      customerData.unhashed.push(unhashedRecord)

      // Hashed data (for API upload)
      const hashedRecord = {
        hashedEmail: email ? this.hashEmail(email) : '',
        hashedPhoneNumber: phone ? this.hashPhone(phone) : '',
        addressInfo: {
          hashedFirstName: firstName ? this.hashEmail(firstName) : '',
          hashedLastName: lastName ? this.hashEmail(lastName) : '',
          countryCode: country
        }
      }
      customerData.hashed.push(hashedRecord)

      // Update stats
      if (email) customerData.stats.withEmail++
      if (phone) customerData.stats.withPhone++
      if (email && phone) customerData.stats.withBoth++
      if (firstName && lastName) customerData.stats.withName++
    })

    return customerData
  }

  /**
   * Export to CSV for manual upload to Google Ads
   */
  exportToCSV(customerData, filename = 'google-ads-customer-match.csv') {
    console.log('📄 Exporting to CSV...\n')

    // CSV headers for Google Ads Customer Match
    const headers = 'Email,Phone,First Name,Last Name,Country,Zip'
    const rows = customerData.unhashed.map(record => {
      return [
        record.email,
        record.phone,
        record.firstName,
        record.lastName,
        record.country,
        '' // Zip code (optional)
      ].map(field => `"${field}"`).join(',')
    })

    const csv = [headers, ...rows].join('\n')
    
    fs.writeFileSync(filename, csv)
    console.log(`✅ CSV exported: ${filename}`)
    console.log(`   ${customerData.unhashed.length} records ready for upload\n`)
  }

  /**
   * Export hashed data for API upload
   */
  exportToJSON(customerData, filename = 'google-ads-customer-match-hashed.json') {
    console.log('📄 Exporting hashed data to JSON...\n')

    const jsonData = {
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID,
      customerData: customerData.hashed,
      stats: customerData.stats,
      generatedAt: new Date().toISOString(),
      instructions: {
        message: 'This file contains SHA256 hashed customer data for Google Ads Customer Match API',
        apiEndpoint: 'https://developers.google.com/google-ads/api/docs/remarketing/audience-types/customer-match',
        uploadMethod: 'Use uploadClickConversions or OfflineUserDataService'
      }
    }

    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2))
    console.log(`✅ JSON exported: ${filename}\n`)
  }

  /**
   * Display statistics
   */
  displayStats(stats) {
    console.log('📊 Customer Match Data Statistics')
    console.log('=' .repeat(50))
    console.log(`Total enrolled customers: ${stats.total}`)
    console.log(`With email: ${stats.withEmail} (${(stats.withEmail/stats.total*100).toFixed(1)}%)`)
    console.log(`With phone: ${stats.withPhone} (${(stats.withPhone/stats.total*100).toFixed(1)}%)`)
    console.log(`With both: ${stats.withBoth} (${(stats.withBoth/stats.total*100).toFixed(1)}%)`)
    console.log(`With names: ${stats.withName} (${(stats.withName/stats.total*100).toFixed(1)}%)`)
    console.log('=' .repeat(50))
  }

  /**
   * Run complete export
   */
  async run(options = {}) {
    const {
      exportType = 'qualified', // 'qualified', 'all', 'custom'
      minScore = 70,
      outputPrefix = 'customer-match'
    } = options

    console.log('🚀 Brevo to Google Ads Customer Match Export')
    console.log('=' .repeat(50))
    
    let exportOptions = {}
    
    if (exportType === 'all') {
      console.log('Mode: Export ALL contacts (for remarketing)\n')
      exportOptions = { includeAll: true }
    } else if (exportType === 'qualified') {
      console.log('Mode: Export QUALIFIED leads only\n')
      exportOptions = {
        minQualificationScore: minScore,
        qualificationStatuses: ['qualified']
      }
    }

    try {
      // Fetch customers from Brevo
      const contacts = await this.getEnrolledCustomers(exportOptions)

      if (contacts.length === 0) {
        console.log('⚠️  No matching customers found')
        console.log('\n💡 Tips:')
        console.log('1. Try lowering minScore (currently: ' + minScore + ')')
        console.log('2. Run with exportType="all" to export all contacts')
        console.log('3. Check Brevo for actual contact data\n')
        return
      }

      // Prepare customer match data
      const customerData = this.prepareCustomerMatchData(contacts)

      // Export to CSV (for manual upload)
      this.exportToCSV(customerData, `reports/google-ads/${outputPrefix}-upload.csv`)

      // Export to JSON (for API upload)
      this.exportToJSON(customerData, `reports/google-ads/${outputPrefix}-hashed.json`)

      // Display statistics
      this.displayStats(customerData.stats)

      console.log('\n🎯 Next Steps:')
      console.log('1. Upload CSV to Google Ads UI:')
      console.log('   - Go to Tools → Audience Manager → "+"')
      console.log('   - Select "Customer list"')
      console.log('   - Upload CSV file')
      console.log('   - Name: "ADMI Qualified Leads" or "ADMI All Contacts"')
      console.log('')
      console.log('2. Wait for Processing (24-48 hours):')
      console.log('   - Google will match emails/phones to Google accounts')
      console.log('   - Expect 30-70% match rate')
      console.log('')
      console.log('3. Create Similar Audiences:')
      console.log('   - Once list has 1,000+ matched users')
      console.log('   - Create "Similar Audiences" targeting')
      console.log('   - Use for lookalike campaigns')
      console.log('')
      console.log('4. Use for Campaign Targeting:')
      console.log('   - Create new Search/Display campaigns')
      console.log('   - Target: Similar audiences')
      console.log('   - This finds people like your qualified leads\n')

    } catch (error) {
      console.error('\n❌ Export failed:', error.message)
      process.exit(1)
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const exportType = args[0] || 'qualified' // 'qualified', 'all'
  const minScore = parseInt(args[1]) || 70

  const exporter = new BrevoCustomerExporter()
  
  await exporter.run({
    exportType,
    minScore,
    outputPrefix: exportType === 'all' ? 'all-contacts' : 'qualified-leads'
  })
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = BrevoCustomerExporter
