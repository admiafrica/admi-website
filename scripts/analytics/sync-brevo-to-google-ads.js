#!/usr/bin/env node

/**
 * Automated Brevo → Google Ads Sync Job
 * Syncs enrolled/qualified customers from Brevo to Google Ads Customer Match daily
 */

const GoogleAdsCustomerMatchUploader = require('./google-ads-customer-match-uploader')
const EmailNotificationService = require('./email-notification-service')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_BASE_URL = 'https://api.brevo.com/v3'
const SYNC_STATE_FILE = path.join(__dirname, '../../data/sync-state.json')
const CUSTOMER_LIST_NAME = 'ADMI - Auto-Synced Customers'

class BrevoGoogleAdsSync {
  constructor() {
    this.uploader = new GoogleAdsCustomerMatchUploader()
    this.emailService = new EmailNotificationService()
    this.syncState = this.loadSyncState()
    this.emailRecipients = process.env.GOOGLE_ADS_REPORT_EMAILS
      ? process.env.GOOGLE_ADS_REPORT_EMAILS.split(',')
      : ['wilfred@admi.africa']
  }

  /**
   * Load sync state (last sync timestamp)
   */
  loadSyncState() {
    try {
      if (fs.existsSync(SYNC_STATE_FILE)) {
        return JSON.parse(fs.readFileSync(SYNC_STATE_FILE, 'utf8'))
      }
    } catch (error) {
      console.log('⚠️  No previous sync state found')
    }
    
    return {
      lastSync: null,
      lastSyncedCount: 0,
      totalSynced: 0,
      userListResourceName: null
    }
  }

  /**
   * Save sync state
   */
  saveSyncState() {
    const dir = path.dirname(SYNC_STATE_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(SYNC_STATE_FILE, JSON.stringify(this.syncState, null, 2))
  }

  /**
   * Get all Brevo contacts (with optional modified date filter)
   */
  async getBrevoContacts(modifiedSince = null) {
    console.log('📊 Fetching contacts from Brevo...')
    if (modifiedSince) {
      console.log(`   Only contacts modified since: ${modifiedSince}`)
    }

    try {
      let allContacts = []
      let offset = 0
      const limit = 500

      while (true) {
        const params = {
          limit,
          offset,
          sort: 'desc'
        }

        if (modifiedSince) {
          params.modifiedSince = modifiedSince
        }

        const response = await axios.get(`${BREVO_BASE_URL}/contacts`, {
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          params
        })

        const contacts = response.data.contacts || []
        if (contacts.length === 0) break

        allContacts = allContacts.concat(contacts)
        
        if (contacts.length < limit) break
        offset += limit

        await new Promise(resolve => setTimeout(resolve, 200))
      }

      console.log(`✅ Fetched ${allContacts.length} contact(s)`)
      return allContacts
    } catch (error) {
      console.error('❌ Failed to fetch Brevo contacts:', error.message)
      throw error
    }
  }

  /**
   * Get all deals from Brevo CRM
   */
  async getBrevoDeals() {
    console.log('💼 Fetching deals from Brevo CRM...')

    try {
      let allDeals = []
      let offset = 0
      const limit = 50

      while (true) {
        const response = await axios.get(`${BREVO_BASE_URL}/crm/deals`, {
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          params: {
            limit,
            offset,
            sort: 'desc'
          }
        })

        const deals = response.data.items || []
        if (deals.length === 0) break

        allDeals = allDeals.concat(deals)
        
        if (deals.length < limit) break
        offset += limit

        await new Promise(resolve => setTimeout(resolve, 200))
      }

      console.log(`✅ Fetched ${allDeals.length} deal(s)`)
      return allDeals
    } catch (error) {
      console.error('❌ Failed to fetch deals:', error.message)
      return []
    }
  }

  /**
   * Get contact by ID
   */
  async getContact(contactId) {
    try {
      const response = await axios.get(`${BREVO_BASE_URL}/contacts/${contactId}`, {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      return null
    }
  }

  /**
   * Filter qualified customers
   */
  filterQualifiedCustomers(contacts, deals) {
    console.log('\n🎯 Filtering qualified customers...')

    // Get enrolled customer emails from deals
    const enrolledStageIds = new Set([
      '5pm1vv6452ld45bmo3rqikf',  // Sept 2025: Enrolled/Won
      'EDQivD6BzweY7hTQKhY38Fe',  // Sept 2024: Won
      'ff0d23bc-2649-439e-9db5-1f1676a64008',  // May 2024: Won
      'fd77ccnz5j3vlg1fjsc71oi',  // 2D Animation: Won
      'yfolpbrufra96wvah5lw3i6',  // Jan 2025: Won
      'i1a95qkz295gpevymty7lt5h',  // May 2025: Won
      '7s2qqq3i6xla8uzrwwgpia2'   // Jan 2026: Enrolled
    ])

    const enrolledContactIds = new Set()
    deals.forEach(deal => {
      const stageId = deal.attributes?.deal_stage
      if (enrolledStageIds.has(stageId)) {
        const contactIds = deal.linkedContactsIds || []
        contactIds.forEach(id => enrolledContactIds.add(id))
      }
    })

    // Filter contacts
    const qualifiedContacts = contacts.filter(contact => {
      if (!contact.email) return false

      // Enrolled customers (highest priority)
      if (enrolledContactIds.has(contact.id)) {
        return true
      }

      // High qualification score
      const score = contact.attributes?.QUALIFICATION_SCORE || 0
      if (score >= 70) return true

      // Qualified status
      const status = contact.attributes?.QUALIFICATION_STATUS?.toLowerCase() || ''
      if (status.includes('qualified') || status.includes('enrolled') || status.includes('customer')) {
        return true
      }

      // Medium score with course interest
      if (score >= 40 && (contact.attributes?.PREFERRED_COURSE || contact.attributes?.COURSE_INTERESTED_IN)) {
        return true
      }

      // Recent activity (2024-2025) with course interest
      const modifiedDate = new Date(contact.modifiedAt || contact.createdAt)
      const hasCourseInterest = contact.attributes?.PREFERRED_COURSE || contact.attributes?.COURSE_INTERESTED_IN
      if (modifiedDate >= new Date('2024-01-01') && hasCourseInterest) {
        return true
      }

      return false
    })

    console.log(`   ✅ ${qualifiedContacts.length} qualified customers`)
    console.log(`      (${enrolledContactIds.size} enrolled from deals)`)

    return qualifiedContacts
  }

  /**
   * Format customers for Google Ads upload
   */
  formatCustomersForUpload(contacts) {
    return contacts.map(contact => ({
      email: contact.email,
      phone: contact.attributes?.SMS || '',
      firstName: contact.attributes?.FIRSTNAME || '',
      lastName: contact.attributes?.LASTNAME || '',
      country: contact.attributes?.COUNTRY || '',
      zip: contact.attributes?.ZIP || ''
    }))
  }

  /**
   * Run sync
   */
  async sync(fullSync = false) {
    console.log('🚀 BREVO → GOOGLE ADS SYNC JOB')
    console.log('='.repeat(80))
    console.log(`Date: ${new Date().toLocaleString()}`)
    console.log(`Mode: ${fullSync ? 'FULL SYNC' : 'INCREMENTAL SYNC'}`)
    console.log('='.repeat(80))

    try {
      // Fetch data from Brevo
      const modifiedSince = fullSync ? null : this.syncState.lastSync
      const contacts = await this.getBrevoContacts(modifiedSince)
      const deals = await this.getBrevoDeals()

      // Filter qualified customers
      const qualifiedContacts = this.filterQualifiedCustomers(contacts, deals)

      if (qualifiedContacts.length === 0) {
        console.log('\n✅ No new qualified customers to sync')
        return
      }

      // Format for upload
      const customersToUpload = this.formatCustomersForUpload(qualifiedContacts)

      console.log(`\n📤 Preparing to upload ${customersToUpload.length} customers to Google Ads`)

      // Check if list exists
      let userListResourceName = this.syncState.userListResourceName
      
      if (!userListResourceName) {
        console.log('\n🔍 Checking for existing customer list...')
        const existingList = await this.uploader.findListByName(CUSTOMER_LIST_NAME)
        
        if (existingList) {
          console.log(`✅ Found existing list: ${existingList.name}`)
          userListResourceName = existingList.resourceName
        } else {
          console.log('📋 Creating new customer list...')
          const result = await this.uploader.createCustomerList(
            CUSTOMER_LIST_NAME,
            'Auto-synced qualified customers from Brevo CRM (enrolled + qualified leads)',
            540
          )
          userListResourceName = result.resourceName
        }

        this.syncState.userListResourceName = userListResourceName
        this.saveSyncState()
      }

      // Upload to Google Ads
      console.log(`\n📤 Uploading to list: ${userListResourceName}`)
      const uploadedCount = await this.uploader.uploadCustomers(
        userListResourceName,
        customersToUpload,
        fullSync ? 'CREATE' : 'CREATE'  // Always use CREATE, Google deduplicates
      )

      // Update sync state
      this.syncState.lastSync = new Date().toISOString()
      this.syncState.lastSyncedCount = uploadedCount
      this.syncState.totalSynced += uploadedCount
      this.saveSyncState()

      console.log('\n' + '='.repeat(80))
      console.log('✅ SYNC COMPLETED SUCCESSFULLY')
      console.log('='.repeat(80))
      console.log(`   Customers synced: ${uploadedCount}`)
      console.log(`   Total synced (lifetime): ${this.syncState.totalSynced}`)
      console.log(`   Next sync: Tomorrow at 2 AM`)
      console.log('\n⏳ Google Ads will process this data within 24-48 hours')
      console.log('   Check Audience Manager for match rate\n')

      // Send email notification
      try {
        await this.emailService.sendSyncNotification({
          success: true,
          syncedCount: uploadedCount,
          totalSynced: this.syncState.totalSynced
        }, this.emailRecipients)
      } catch (error) {
        console.error('⚠️  Failed to send email notification:', error.message)
      }

      return {
        success: true,
        syncedCount: uploadedCount,
        totalSynced: this.syncState.totalSynced
      }

    } catch (error) {
      console.error('\n❌ SYNC FAILED:', error.message)
      
      // Send failure notification
      try {
        await this.emailService.sendSyncNotification({
          success: false,
          error: error.message
        }, this.emailRecipients)
      } catch (emailError) {
        console.error('⚠️  Failed to send failure notification:', emailError.message)
      }
      
      throw error
    }
  }
}

module.exports = BrevoGoogleAdsSync

// CLI usage
if (require.main === module) {
  const sync = new BrevoGoogleAdsSync()
  const fullSync = process.argv.includes('--full')

  sync.sync(fullSync)
    .then(() => {
      console.log('Done!')
      process.exit(0)
    })
    .catch(error => {
      console.error('Error:', error)
      process.exit(1)
    })
}
