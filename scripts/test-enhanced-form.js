#!/usr/bin/env node

/**
 * Test script for Enhanced Enquiry Form API
 * Tests the new pre-qualification form submission and Brevo integration
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

// Test data for different lead score scenarios
const testCases = [
  {
    name: 'Hot Lead Test',
    description: 'High-scoring lead (should get 18-20 points)',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: `test-hot-${Date.now()}@example.com`,
      phone: '712 345 678', // Kenya mobile format
      courseName: 'Music Production Diploma',
      studyTimeline: 'january-2026',
      programType: 'full-time-diploma',
      investmentRange: '500k-plus',
      careerGoals: 'career-change',
      experienceLevel: 'some-experience',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'january-2026-intake',
      utm_term: 'film school kenya',
      utm_content: 'ad-variant-a',
      leadScore: 0, // Will be calculated by API
      formType: 'enhanced-enquiry',
      submissionDate: new Date().toISOString()
    }
  },
  {
    name: 'Warm Lead Test',
    description: 'Medium-scoring lead (should get 10-14 points)',
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: `test-warm-${Date.now()}@example.com`,
      phone: '723 456 789', // Kenya mobile format
      courseName: 'Animation Diploma',
      studyTimeline: 'september-2026',
      programType: 'professional-certificate',
      investmentRange: '100k-300k',
      careerGoals: 'skill-upgrade',
      experienceLevel: 'intermediate',
      utm_source: 'facebook',
      utm_medium: 'social',
      utm_campaign: 'music-production-awareness',
      utm_term: '',
      utm_content: 'video-testimonial',
      leadScore: 0,
      formType: 'enhanced-enquiry',
      submissionDate: new Date().toISOString()
    }
  },
  {
    name: 'Cold Lead Test',
    description: 'Low-scoring lead (should get 5-9 points)',
    data: {
      firstName: 'Bob',
      lastName: 'Wilson',
      email: `test-cold-${Date.now()}@example.com`,
      phone: '734 567 890', // Kenya mobile format
      courseName: 'Foundation Certificate in Digital Media',
      studyTimeline: 'researching',
      programType: 'weekend-parttime',
      investmentRange: 'under-100k',
      careerGoals: 'personal-interest',
      experienceLevel: 'complete-beginner',
      utm_source: 'direct',
      utm_medium: 'none',
      utm_campaign: 'organic',
      utm_term: '',
      utm_content: '',
      leadScore: 0,
      formType: 'enhanced-enquiry',
      submissionDate: new Date().toISOString()
    }
  }
]

async function testEnhancedForm() {
  console.log('🧪 Testing Enhanced Enquiry Form API\n')
  console.log('=' .repeat(60))

  const baseUrl = process.env.TEST_URL || 'http://localhost:3000'
  const apiEndpoint = `${baseUrl}/api/v3/push-enhanced-lead`

  console.log(`Testing endpoint: ${apiEndpoint}\n`)

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    console.log(`\n${i + 1}. ${testCase.name}`)
    console.log(`   ${testCase.description}`)
    console.log('   ' + '-'.repeat(50))

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCase.data)
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log(`   ✅ SUCCESS (${response.status})`)
        console.log(`   📊 Lead Score: ${responseData.leadScore}/20`)
        console.log(`   🏷️  Category: ${responseData.leadCategory}`)
        console.log(`   ⚡ Priority: ${responseData.leadPriority}`)

        if (responseData.qualificationData) {
          console.log('   📋 Qualification Data:')
          console.log(`      Timeline: ${responseData.qualificationData.studyTimeline}`)
          console.log(`      Program: ${responseData.qualificationData.programType}`)
          console.log(`      Investment: ${responseData.qualificationData.investmentRange}`)
          console.log(`      Goals: ${responseData.qualificationData.careerGoals}`)
          console.log(`      Experience: ${responseData.qualificationData.experienceLevel}`)
        }

        // Validate expected score ranges
        const score = responseData.leadScore
        let expectedRange = ''

        if (testCase.name.includes('Hot')) {
          expectedRange = '15-20'
          if (score < 15) {
            console.log(`   ⚠️  WARNING: Expected hot lead (15-20), got ${score}`)
          }
        } else if (testCase.name.includes('Warm')) {
          expectedRange = '10-14'
          if (score < 10 || score > 14) {
            console.log(`   ⚠️  WARNING: Expected warm lead (10-14), got ${score}`)
          }
        } else if (testCase.name.includes('Cold')) {
          expectedRange = '5-9'
          if (score < 5 || score > 9) {
            console.log(`   ⚠️  WARNING: Expected cold lead (5-9), got ${score}`)
          }
        }

        console.log(`   🎯 Expected Range: ${expectedRange} points`)

      } else {
        console.log(`   ❌ FAILED (${response.status})`)
        console.log(`   Error: ${responseData.error || 'Unknown error'}`)
      }

    } catch (error) {
      console.log(`   💥 EXCEPTION: ${error.message}`)
    }

    // Wait between requests to avoid rate limiting
    if (i < testCases.length - 1) {
      console.log('   ⏳ Waiting 2 seconds...')
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('🏁 Testing Complete!')
  console.log('\n📋 Next Steps:')
  console.log('1. Check Brevo CRM for new contacts with enhanced data')
  console.log('2. Verify lead scoring is working correctly')
  console.log('3. Check if hot lead email notifications were sent')
  console.log('4. Confirm deals were created in appropriate pipelines')
  console.log('5. Test the form UI at: /test-enhanced-enquiry')

  console.log('\n🔍 Manual Testing:')
  console.log(`Visit: ${baseUrl}/test-enhanced-enquiry`)
  console.log('Fill out the form with different combinations to test:')
  console.log('- Multi-step form navigation')
  console.log('- Form validation')
  console.log('- Lead score calculation')
  console.log('- Success/error handling')

  console.log('\n📊 Expected Lead Score Breakdown:')
  console.log('Timeline: January 2026 (5pts) > May 2026 (4pts) > September 2026 (3pts) > Researching (1pt)')
  console.log('Program: Full-time Diploma (4pts) > Professional Cert (3pts) > Foundation (2pts) > Weekend (1pt)')
  console.log('Investment: 500K+ (4pts) > 300-500K (3pts) > 100-300K (2pts) > Under 100K (1pt)')
  console.log('Goals: Career Change/Business (4pts) > Skill Upgrade (3pts) > University Prep (2pts) > Personal (1pt)')
  console.log('Experience: Professional (3pts) > Intermediate/Some (2pts) > Beginner (1pt)')
  console.log('\nTotal possible: 20 points')
  console.log('Hot Leads: 15-20 | Warm Leads: 10-14 | Cold Leads: 5-9 | Unqualified: 0-4')
}

// Run the test
if (require.main === module) {
  testEnhancedForm().catch(console.error)
}

module.exports = { testEnhancedForm }
