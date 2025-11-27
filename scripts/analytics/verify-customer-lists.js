#!/usr/bin/env node

/**
 * Verify Google Ads Customer Match Lists
 * Check list status, sizes, and match rates
 */

const GoogleAdsCustomerMatchUploader = require('./google-ads-customer-match-uploader')
require('dotenv').config()

async function verifyLists() {
  console.log('\n' + '='.repeat(70))
  console.log('🔍 GOOGLE ADS CUSTOMER MATCH LIST VERIFICATION')
  console.log('='.repeat(70))
  
  const uploader = new GoogleAdsCustomerMatchUploader()
  
  try {
    // Get all lists
    const lists = await uploader.getUserLists()
    
    console.log('\n📊 DETAILED LIST STATUS:\n')
    
    const targetLists = [
      'ADMI - Expanded Customer List',
      'ADMI - Enrolled Customers'
    ]
    
    for (const listName of targetLists) {
      const list = lists.find(l => l.name === listName)
      
      if (list) {
        console.log(`📋 ${list.name}`)
        console.log(`   Resource: ${list.resourceName}`)
        console.log(`   ID: ${list.id}`)
        console.log(`   Status: ${list.status === 2 ? 'OPEN' : list.status}`)
        console.log(`   Size for Display: ${list.sizeForDisplay || 0}`)
        console.log(`   Size for Search: ${list.sizeForSearch || 0}`)
        console.log(`   Match Rate: ${list.matchRatePercentage || 'Not available yet'}`)
        console.log(`   Type: ${list.type}`)
        console.log(`   Membership Life Span: ${list.membershipLifeSpan || 'N/A'} days`)
        
        if (list.sizeForDisplay === 0 || list.sizeForDisplay < 100) {
          console.log(`   ⚠️  STATUS: Processing (Google typically takes 24-48 hours)`)
          console.log(`   💡 TIP: Upload was recent, check again in a few hours`)
        } else if (list.sizeForDisplay >= 1000) {
          console.log(`   ✅ STATUS: Ready for Similar Audiences`)
          console.log(`   🎯 Can create 1%, 3%, 5% lookalike audiences`)
        } else {
          console.log(`   ⚠️  STATUS: Matched but below 1,000 threshold`)
          console.log(`   💡 Need 1,000+ for Similar Audiences feature`)
        }
        console.log('')
      } else {
        console.log(`❌ List "${listName}" not found\n`)
      }
    }
    
    // Check for recent upload jobs
    console.log('🔄 UPLOAD JOB STATUS:')
    console.log('   To check upload job status, go to:')
    console.log('   Google Ads → Tools → Audience Manager → Data Manager → Activity')
    console.log('')
    
    // Summary
    console.log('📅 TIMELINE:')
    console.log('   • Upload completed: Just now')
    console.log('   • Processing time: 24-48 hours typically')
    console.log('   • Check again: November 25-26, 2025')
    console.log('   • Email reports: Starting tomorrow at 6 AM UTC')
    console.log('')
    
    console.log('🎯 EXPECTED RESULTS (after processing):')
    console.log('   • Expanded List: ~25,000 matches (60% of 42,330)')
    console.log('   • Enrolled List: ~400 matches (95% of 428)')
    console.log('')
    
    console.log('✅ NEXT STEPS:')
    console.log('   1. Wait 24-48 hours for Google matching')
    console.log('   2. Run this script again: npm run ads:verify-lists')
    console.log('   3. Once 1,000+ matched: Create Similar Audiences')
    console.log('   4. Build campaigns targeting lookalike audiences')
    console.log('')
    
    console.log('='.repeat(70))
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.errors) {
      error.errors.forEach(err => {
        console.error(`   • ${err.message}`)
      })
    }
    process.exit(1)
  }
}

verifyLists()
