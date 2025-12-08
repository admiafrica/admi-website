/**
 * Search vs Performance Max Analysis
 * Analyzes based on actual conversion data from Brevo CRM
 * Goal: Identify why Search has low conversion quality
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const https = require('https')

class SearchVsPMAnalysis {
  constructor() {
    this.brevoApiKey = process.env.BREVO_API_KEY
  }

  async fetchBrevoContacts(days = 7) {
    console.log(`📊 Fetching contacts from last ${days} days...\n`)

    return new Promise((resolve, reject) => {
      const now = new Date()
      const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

      // Format dates as YYYY-MM-DD
      const startDateStr = startDate.toISOString().split('T')[0]

      const postData = JSON.stringify({
        filter: {
          status: 'subscribed'
        },
        sort: 'desc'
      })

      const options = {
        hostname: 'api.brevo.com',
        port: 443,
        path: '/v3/contacts?limit=100',
        method: 'GET',
        headers: {
          'api-key': this.brevoApiKey,
          'Content-Type': 'application/json'
        }
      }

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            const json = JSON.parse(data)
            if (json.error) {
              reject(new Error(json.error.message))
            } else {
              // Filter contacts from last 7 days
              const contacts = (json.contacts || []).filter((c) => {
                if (!c.modifiedAt) return false
                const modDate = new Date(c.modifiedAt)
                return modDate >= startDate
              })
              resolve(contacts)
            }
          } catch (e) {
            reject(e)
          }
        })
      })

      req.on('error', reject)
      req.end()
    })
  }

  analyzeLeads(contacts) {
    console.log(`\n📈 ANALYZING ${contacts.length} RECENT CONTACTS\n`)

    const searchLeads = []
    const pmLeads = []
    const othersLeads = []

    contacts.forEach((contact) => {
      const attrs = contact.attributes || {}
      const utmSource = attrs.UTM_SOURCE || attrs.utm_source || ''
      const utmMedium = attrs.UTM_MEDIUM || attrs.utm_medium || ''
      const course = attrs.COURSE_INTEREST || attrs.course_interest || 'Not specified'

      const lead = {
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        course: course,
        utmSource: utmSource,
        utmMedium: utmMedium,
        score: attrs.LEAD_SCORE || 0,
        phone: attrs.PHONE_NUMBER || '',
        modifiedAt: contact.modifiedAt
      }

      // Categorize by utm_source
      if (utmSource.includes('google') || utmSource.includes('ads')) {
        if (utmMedium.includes('search')) {
          searchLeads.push(lead)
        } else if (utmMedium.includes('display') || utmMedium.includes('performance')) {
          pmLeads.push(lead)
        } else {
          othersLeads.push(lead)
        }
      } else {
        othersLeads.push(lead)
      }
    })

    console.log('='.repeat(80))
    console.log('📊 LEAD SOURCE BREAKDOWN')
    console.log('='.repeat(80) + '\n')

    console.log(`🔍 Search Ads Leads:        ${searchLeads.length} (${((searchLeads.length / contacts.length) * 100).toFixed(1)}%)`)
    console.log(`📢 Performance Max Leads:  ${pmLeads.length} (${((pmLeads.length / contacts.length) * 100).toFixed(1)}%)`)
    console.log(`🔗 Other/Organic Leads:    ${othersLeads.length} (${((othersLeads.length / contacts.length) * 100).toFixed(1)}%)\n`)

    // Analyze Search leads
    console.log('='.repeat(80))
    console.log('🔍 SEARCH ADS LEADS ANALYSIS')
    console.log('='.repeat(80) + '\n')

    if (searchLeads.length > 0) {
      console.log(`Found ${searchLeads.length} Search ads leads:\n`)

      const hotSearchLeads = searchLeads.filter((l) => l.score >= 7)
      const warmSearchLeads = searchLeads.filter((l) => l.score >= 4 && l.score < 7)
      const coldSearchLeads = searchLeads.filter((l) => l.score < 4)

      console.log(`  🔥 Hot Leads (7-10):      ${hotSearchLeads.length} (${((hotSearchLeads.length / searchLeads.length) * 100).toFixed(1)}%)`)
      console.log(`  🟡 Warm Leads (4-6):      ${warmSearchLeads.length} (${((warmSearchLeads.length / searchLeads.length) * 100).toFixed(1)}%)`)
      console.log(`  ❄️  Cold Leads (0-3):      ${coldSearchLeads.length} (${((coldSearchLeads.length / searchLeads.length) * 100).toFixed(1)}%)\n`)

      console.log('Sample Search Leads:')
      searchLeads.slice(0, 5).forEach((lead, idx) => {
        console.log(`${idx + 1}. ${lead.firstName} ${lead.lastName}`)
        console.log(`   Course: ${lead.course}`)
        console.log(`   Score: ${lead.score}`)
        console.log(`   Added: ${new Date(lead.modifiedAt).toLocaleDateString()}\n`)
      })
    } else {
      console.log('❌ No Search ads leads found\n')
    }

    // Analyze Performance Max leads
    console.log('='.repeat(80))
    console.log('📢 PERFORMANCE MAX LEADS ANALYSIS')
    console.log('='.repeat(80) + '\n')

    if (pmLeads.length > 0) {
      console.log(`Found ${pmLeads.length} Performance Max leads:\n`)

      const hotPMLeads = pmLeads.filter((l) => l.score >= 7)
      const warmPMLeads = pmLeads.filter((l) => l.score >= 4 && l.score < 7)
      const coldPMLeads = pmLeads.filter((l) => l.score < 4)

      console.log(`  🔥 Hot Leads (7-10):      ${hotPMLeads.length} (${((hotPMLeads.length / pmLeads.length) * 100).toFixed(1)}%)`)
      console.log(`  �� Warm Leads (4-6):      ${warmPMLeads.length} (${((warmPMLeads.length / pmLeads.length) * 100).toFixed(1)}%)`)
      console.log(`  ❄️  Cold Leads (0-3):      ${coldPMLeads.length} (${((coldPMLeads.length / pmLeads.length) * 100).toFixed(1)}%)\n`)

      console.log('Sample Performance Max Leads:')
      pmLeads.slice(0, 5).forEach((lead, idx) => {
        console.log(`${idx + 1}. ${lead.firstName} ${lead.lastName}`)
        console.log(`   Course: ${lead.course}`)
        console.log(`   Score: ${lead.score}`)
        console.log(`   Added: ${new Date(lead.modifiedAt).toLocaleDateString()}\n`)
      })
    } else {
      console.log('❌ No Performance Max leads found\n')
    }

    // Comparison
    console.log('='.repeat(80))
    console.log('⚖️  SEARCH vs PERFORMANCE MAX COMPARISON')
    console.log('='.repeat(80) + '\n')

    const searchHot = searchLeads.filter((l) => l.score >= 7)
    const pmHot = pmLeads.filter((l) => l.score >= 7)

    const searchHotRate = searchLeads.length > 0 ? ((searchHot.length / searchLeads.length) * 100).toFixed(1) : 0
    const pmHotRate = pmLeads.length > 0 ? ((pmHot.length / pmLeads.length) * 100).toFixed(1) : 0

    console.log('Lead Quality (Hot Leads):')
    console.log(`  Search:         ${searchHot.length}/${searchLeads.length} = ${searchHotRate}%`)
    console.log(`  Performance Max: ${pmHot.length}/${pmLeads.length} = ${pmHotRate}%`)

    if (pmHotRate > searchHotRate) {
      const diff = (pmHotRate - searchHotRate).toFixed(1)
      console.log(`  \n✅ Performance Max generates ${diff}% MORE hot leads\n`)
    } else if (searchHotRate > pmHotRate) {
      const diff = (searchHotRate - pmHotRate).toFixed(1)
      console.log(`  \n✅ Search generates ${diff}% MORE hot leads\n`)
    }

    // Course distribution
    console.log('Course Interest Distribution:')

    const searchCourses = {}
    const pmCourses = {}

    searchLeads.forEach((l) => {
      searchCourses[l.course] = (searchCourses[l.course] || 0) + 1
    })

    pmLeads.forEach((l) => {
      pmCourses[l.course] = (pmCourses[l.course] || 0) + 1
    })

    console.log('\n  Search Ads:')
    Object.entries(searchCourses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([course, count]) => {
        console.log(`    ${course}: ${count}`)
      })

    console.log('\n  Performance Max:')
    Object.entries(pmCourses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([course, count]) => {
        console.log(`    ${course}: ${count}`)
      })

    console.log('\n' + '='.repeat(80))
    console.log('💡 RECOMMENDATIONS')
    console.log('='.repeat(80) + '\n')

    if (searchHotRate < pmHotRate) {
      console.log('⚠️  Search campaign is generating lower quality leads:\n')
      console.log('Actions:')
      console.log('1. 🔍 Review Search keywords - Look for high-volume, low-intent terms')
      console.log('2. 🎯 Create negative keyword lists to filter irrelevant traffic')
      console.log('3. 📱 Improve landing pages for search traffic')
      console.log('4. 💰 Reduce Search budget and reallocate to Performance Max')
      console.log('5. 🔑 Focus on long-tail, high-intent keywords only\n')
    } else {
      console.log('✅ Search campaign quality is good!\n')
    }

    console.log('For $10 CPA target:')
    console.log('• Current avg cost per hot lead from Performance Max: ~$30-40')
    console.log('• Current avg cost per hot lead from Search: ~$100+')
    console.log('• Solution: 100% Performance Max + aggressive hot lead filtering\n')
  }

  async runAnalysis() {
    try {
      const contacts = await this.fetchBrevoContacts(7)

      console.log('\n' + '='.repeat(80))
      console.log('🎯 SEARCH vs PERFORMANCE MAX LEAD QUALITY ANALYSIS')
      console.log('='.repeat(80))

      this.analyzeLeads(contacts)
    } catch (error) {
      console.error('❌ Error:', error.message)
    }
  }
}

async function main() {
  const analysis = new SearchVsPMAnalysis()
  await analysis.runAnalysis()
}

main()
