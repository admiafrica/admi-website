#!/usr/bin/env node

/**
 * Upload Customer List to Google Ads via API
 * Reads CSV file and uploads customers using Customer Match API
 */

const fs = require('fs')
const path = require('path')
const GoogleAdsCustomerMatchUploader = require('./google-ads-customer-match-uploader')
require('dotenv').config()

class CustomerListUploader {
  constructor() {
    this.uploader = new GoogleAdsCustomerMatchUploader()
  }

  /**
   * Parse CSV file and return customer data
   */
  parseCSV(filePath) {
    console.log(`\n📂 Reading CSV file: ${filePath}`)
    
    const csvContent = fs.readFileSync(filePath, 'utf-8')
    const lines = csvContent.split('\n').filter(line => line.trim())
    
    // Parse header
    const headers = lines[0].split(',').map(h => h.trim())
    console.log(`   Headers: ${headers.join(', ')}`)
    
    // Parse data rows
    const customers = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const customer = {}
      
      headers.forEach((header, index) => {
        customer[header] = values[index] || ''
      })
      
      // Only include if we have at least email
      if (customer.Email) {
        customers.push({
          email: customer.Email,
          phone: customer.Phone || customer['Phone Number'] || '',
          firstName: customer['First Name'] || '',
          lastName: customer['Last Name'] || '',
          country: customer.Country || 'KE', // Default to Kenya
          zip: customer['Zip Code'] || customer.Zip || ''
        })
      }
    }
    
    console.log(`   ✅ Parsed ${customers.length} customers from CSV`)
    return customers
  }

  /**
   * Main upload process
   */
  async uploadFromCSV(csvPath, listName, createNew = false) {
    console.log('\n' + '='.repeat(60))
    console.log('🚀 Google Ads Customer Match Upload')
    console.log('='.repeat(60))
    
    // Parse CSV
    const customers = this.parseCSV(csvPath)
    
    if (customers.length === 0) {
      console.error('\n❌ No customers found in CSV file')
      return
    }
    
    // Find or create user list
    let userListResourceName
    let result
    
    if (createNew) {
      result = await this.uploader.createCustomerList(listName, 'Customer list uploaded from CSV via API')
      userListResourceName = result.resourceName
    } else {
      const existingList = await this.uploader.findListByName(listName)
      
      if (existingList) {
        console.log(`\n✅ Using existing list: ${existingList.name}`)
        userListResourceName = existingList.resourceName
      } else {
        result = await this.uploader.createCustomerList(listName, 'Customer list uploaded from CSV via API')
        userListResourceName = result.resourceName
      }
    }
    
    // Upload customers
    const totalUploaded = await this.uploader.uploadCustomers(userListResourceName, customers)
    
    console.log('\n' + '='.repeat(60))
    console.log('✅ UPLOAD COMPLETE')
    console.log('='.repeat(60))
    console.log('📊 Summary:')
    console.log(`   • Customers uploaded: ${totalUploaded}`)
    console.log(`   • User list: ${listName}`)
    console.log(`   • Resource: ${userListResourceName}`)
    console.log('\n📅 Next Steps:')
    console.log('   1. Wait 24-48 hours for Google to match customers')
    console.log('   2. Check match rate in Google Ads UI')
    console.log('   3. Create Similar Audiences (1%, 3%, 5%) after matching')
    console.log('   4. Build campaigns targeting these audiences')
    console.log('='.repeat(60) + '\n')
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('\nUsage:')
    console.log('  npm run ads:upload-csv <csv-file> [list-name] [--create-new]')
    console.log('\nExamples:')
    console.log('  npm run ads:upload-csv reports/google-ads/expanded-customer-list.csv')
    console.log('  npm run ads:upload-csv reports/google-ads/enrolled-customers-from-deals.csv "ADMI - Enrolled Students"')
    console.log('  npm run ads:upload-csv reports/google-ads/expanded-customer-list.csv "ADMI - Expanded List" --create-new')
    console.log('\nAvailable CSV files:')
    console.log('  • reports/google-ads/expanded-customer-list.csv (42,330 contacts)')
    console.log('  • reports/google-ads/enrolled-customers-from-deals.csv (428 enrolled)')
    process.exit(1)
  }
  
  const csvPath = args[0]
  const listName = args[1] || 'ADMI - Customer Match List'
  const createNew = args.includes('--create-new')
  
  // Validate CSV file exists
  if (!fs.existsSync(csvPath)) {
    console.error(`\n❌ Error: CSV file not found: ${csvPath}`)
    process.exit(1)
  }
  
  const uploader = new CustomerListUploader()
  
  uploader.uploadFromCSV(csvPath, listName, createNew)
    .then(() => {
      console.log('\n✅ Success!')
      process.exit(0)
    })
    .catch(error => {
      console.error('\n❌ Error:', error.message)
      if (error.errors) {
        error.errors.forEach(err => {
          console.error(`   • ${err.message}`)
        })
      }
      process.exit(1)
    })
}

module.exports = CustomerListUploader
