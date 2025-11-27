#!/usr/bin/env node

/**
 * Google Ads Customer Match Upload via API
 * Uploads customer data from Brevo to Google Ads Customer Match
 */

const { GoogleAdsApi, enums } = require('google-ads-api')
const crypto = require('crypto')
require('dotenv').config()

class GoogleAdsCustomerMatchUploader {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    })

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '')
    this.customer = this.client.Customer({
      customer_id: this.customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
    })
  }

  /**
   * Hash email for Customer Match
   */
  hashEmail(email) {
    return crypto.createHash('sha256')
      .update(email.toLowerCase().trim())
      .digest('hex')
  }

  /**
   * Hash phone number for Customer Match
   */
  hashPhone(phone) {
    const cleaned = phone.replace(/[^\d]/g, '')
    return crypto.createHash('sha256')
      .update(cleaned)
      .digest('hex')
  }

  /**
   * Create a new Customer Match user list
   */
  async createCustomerList(name, description, membershipLifeSpan = 540) {
    console.log(`\n📋 Creating Customer Match list: "${name}"`)

    try {
      const userList = {
        name,
        description,
        membership_life_span: membershipLifeSpan,
        crm_based_user_list: {
          upload_key_type: enums.CustomerMatchUploadKeyType.CONTACT_INFO,
          data_source_type: enums.UserListCrmDataSourceType.FIRST_PARTY
        }
      }

      const response = await this.customer.userLists.create([userList])
      const resourceName = response.results[0].resource_name
      const listId = resourceName.split('/').pop()

      console.log(`✅ List created: ${resourceName}`)
      console.log(`   List ID: ${listId}`)

      return { resourceName, listId }
    } catch (error) {
      console.error('❌ Failed to create list:', error.message)
      if (error.errors) {
        error.errors.forEach(err => console.error('   -', err.message))
      }
      throw error
    }
  }

  /**
   * Upload customer data to existing list
   */
  async uploadCustomers(userListResourceName, customers, operationType = 'CREATE') {
    console.log(`\n📤 Uploading ${customers.length} customers to list...`)
    console.log(`   Operation: ${operationType}`)

    try {
      // Process in batches of 10,000 (Google Ads limit)
      const batchSize = 10000
      const batches = []
      
      for (let i = 0; i < customers.length; i += batchSize) {
        batches.push(customers.slice(i, i + batchSize))
      }

      console.log(`   Processing ${batches.length} batch(es)`)

      let totalUploaded = 0

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        console.log(`\n   Batch ${i + 1}/${batches.length}: ${batch.length} customers`)

        // Format customer data for Google Ads API
        const operations = batch.map(customer => ({
          create: {
            user_identifier: [
              // Email (always present)
              {
                hashed_email: this.hashEmail(customer.email)
              },
              // Phone (if available)
              ...(customer.phone ? [{
                hashed_phone_number: this.hashPhone(customer.phone)
              }] : []),
              // Address info (if available)
              ...(customer.firstName || customer.lastName ? [{
                address_info: {
                  hashed_first_name: customer.firstName ? 
                    crypto.createHash('sha256').update(customer.firstName.toLowerCase().trim()).digest('hex') : undefined,
                  hashed_last_name: customer.lastName ? 
                    crypto.createHash('sha256').update(customer.lastName.toLowerCase().trim()).digest('hex') : undefined,
                  country_code: customer.country || undefined,
                  postal_code: customer.zip || undefined
                }
              }] : [])
            ]
          }
        }))

        const jobRequest = {
          customer_id: this.customerId,
          operations,
          customer_match_user_list_metadata: {
            user_list: userListResourceName,
            consent: {
              ad_user_data: enums.ConsentStatus.GRANTED,
              ad_personalization: enums.ConsentStatus.GRANTED
            }
          }
        }

        const response = await this.customer.offlineUserDataJobs.create(jobRequest)
        
        console.log(`   ✅ Batch ${i + 1} uploaded`)
        console.log(`      Job resource: ${response.resource_name}`)

        totalUploaded += batch.length

        // Rate limiting between batches
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      console.log(`\n✅ Total uploaded: ${totalUploaded} customers`)
      console.log(`\n⏳ Processing will take 24-48 hours`)
      console.log(`   Check status in Google Ads > Audience Manager`)

      return totalUploaded
    } catch (error) {
      console.error('❌ Upload failed:', error.message)
      if (error.errors) {
        error.errors.forEach(err => console.error('   -', err.message))
      }
      throw error
    }
  }

  /**
   * Get existing user lists
   */
  async getUserLists() {
    console.log('\n📋 Fetching existing Customer Match lists...')

    try {
      const query = `
        SELECT 
          user_list.id,
          user_list.name,
          user_list.description,
          user_list.membership_status,
          user_list.size_for_display,
          user_list.size_for_search,
          user_list.match_rate_percentage
        FROM user_list
        WHERE user_list.type = 'CRM_BASED'
        ORDER BY user_list.name
      `

      const results = await this.customer.query(query)

      if (results.length === 0) {
        console.log('   No Customer Match lists found')
        return []
      }

      console.log(`\n✅ Found ${results.length} Customer Match list(s):`)
      results.forEach(row => {
        const list = row.user_list
        console.log(`\n   • ${list.name}`)
        console.log(`     ID: ${list.id}`)
        console.log(`     Status: ${list.membership_status}`)
        console.log(`     Display size: ${list.size_for_display || 0}`)
        console.log(`     Search size: ${list.size_for_search || 0}`)
        if (list.match_rate_percentage) {
          console.log(`     Match rate: ${list.match_rate_percentage}%`)
        }
      })

      return results.map(row => ({
        id: row.user_list.id,
        resourceName: row.user_list.resource_name,
        name: row.user_list.name,
        description: row.user_list.description,
        status: row.user_list.membership_status,
        displaySize: row.user_list.size_for_display,
        searchSize: row.user_list.size_for_search,
        matchRate: row.user_list.match_rate_percentage
      }))
    } catch (error) {
      console.error('❌ Failed to fetch lists:', error.message)
      throw error
    }
  }

  /**
   * Find list by name
   */
  async findListByName(name) {
    const lists = await this.getUserLists()
    return lists.find(list => list.name === name)
  }
}

module.exports = GoogleAdsCustomerMatchUploader

// CLI usage
if (require.main === module) {
  const uploader = new GoogleAdsCustomerMatchUploader()

  const command = process.argv[2] || 'list'

  async function main() {
    try {
      if (command === 'list') {
        await uploader.getUserLists()
      } else if (command === 'create') {
        const name = process.argv[3] || 'ADMI - Customer List'
        const description = process.argv[4] || 'Customer Match list from Brevo CRM'
        await uploader.createCustomerList(name, description)
      } else {
        console.log('Usage:')
        console.log('  node google-ads-customer-match-uploader.js list')
        console.log('  node google-ads-customer-match-uploader.js create "List Name" "Description"')
      }
    } catch (error) {
      console.error('Error:', error.message)
      process.exit(1)
    }
  }

  main()
}
