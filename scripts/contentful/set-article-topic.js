#!/usr/bin/env node

/**
 * SAFE: Set topic on a single article (for testing)
 *
 * Usage:
 *   node scripts/contentful/set-article-topic.js <article-slug> <topic>
 *
 * Example:
 *   node scripts/contentful/set-article-topic.js digital-music-production "Music Production"
 *
 * This script:
 * - Sets topic field (e.g., "Music Production")
 * - KEEPS category as "Resources" (unchanged)
 * - Shows preview before making changes
 * - Requires confirmation
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN environment variable is required')
  process.exit(1)
}

if (!ACCESS_TOKEN) {
  console.error('❌ ADMI_CONTENTFUL_ACCESS_TOKEN environment variable is required')
  process.exit(1)
}

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  params: {
    access_token: ACCESS_TOKEN
  }
})

const VALID_TOPICS = [
  'Animation',
  'Film Production',
  'Music Production',
  'Photography',
  'Sound Engineering',
  'Graphic Design',
  'UI/UX Design',
  'Video Game Development',
  'Digital Marketing',
  'Entertainment Business',
  'General'
]

async function findArticleBySlug(slug) {
  try {
    console.log(`🔍 Searching for article with slug: "${slug}"...`)

    const response = await deliveryClient.get('/entries', {
      params: {
        content_type: 'article',
        'fields.slug': slug,
        limit: 1
      }
    })

    if (response.data.items.length === 0) {
      console.error(`❌ No article found with slug: "${slug}"`)
      return null
    }

    const article = response.data.items[0]
    console.log(`✅ Found article: "${article.fields.title}"`)
    console.log(`   ID: ${article.sys.id}`)
    console.log(`   Current category: ${article.fields.category || '(not set)'}`)
    console.log(`   Current topic: ${article.fields.topic || '(not set)'}`)

    return article
  } catch (error) {
    console.error('❌ Error finding article:', error.response?.data || error.message)
    return null
  }
}

async function updateArticleTopic(articleId, topic) {
  try {
    console.log(`\n📝 Fetching article entry (ID: ${articleId})...`)

    const response = await managementClient.get(`/entries/${articleId}`)
    const entry = response.data

    console.log(`✅ Retrieved entry (version: ${entry.sys.version})`)
    console.log('\nCurrent fields:')
    console.log(`   Title: ${entry.fields.title?.['en-US']}`)
    console.log(`   Category: ${entry.fields.category?.['en-US'] || '(not set)'}`)
    console.log(`   Topic: ${entry.fields.topic?.['en-US'] || '(not set)'}`)

    console.log(`\n➡️  Will change topic to: "${topic}"`)
    console.log(`   Category will remain: "${entry.fields.category?.['en-US'] || 'Resources'}"`)

    // Confirmation prompt
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const confirmed = await new Promise((resolve) => {
      readline.question('\nProceed with update? (yes/no): ', (answer) => {
        readline.close()
        resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y')
      })
    })

    if (!confirmed) {
      console.log('❌ Update cancelled by user')
      return null
    }

    // Update the topic field (keep category unchanged)
    entry.fields.topic = {
      'en-US': topic
    }

    // Ensure category stays as "Resources" if not already set
    if (!entry.fields.category) {
      entry.fields.category = {
        'en-US': 'Resources'
      }
      console.log('ℹ️  Also setting category to "Resources" (was not set)')
    }

    console.log('\n📤 Updating entry...')

    const updateResponse = await managementClient.put(`/entries/${articleId}`, entry, {
      headers: {
        'X-Contentful-Version': entry.sys.version
      }
    })

    console.log('✅ Entry updated successfully')

    // Publish the entry
    console.log('📤 Publishing entry...')

    const publishResponse = await managementClient.put(`/entries/${articleId}/published`, null, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log('✅ Entry published successfully')
    console.log('\nFinal values:')
    console.log(`   Category: "${publishResponse.data.fields.category['en-US']}"`)
    console.log(`   Topic: "${publishResponse.data.fields.topic['en-US']}"`)

    return publishResponse.data
  } catch (error) {
    console.error('❌ Error updating article:', error.response?.data || error.message)
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: node set-article-topic.js <article-slug> <topic>')
    console.error('\nExample:')
    console.error('  node set-article-topic.js digital-music-production "Music Production"')
    console.error('\nValid topics:')
    VALID_TOPICS.forEach((topic) => console.error(`  - ${topic}`))
    process.exit(1)
  }

  const slug = args[0]
  const topic = args[1]

  if (!VALID_TOPICS.includes(topic)) {
    console.error(`❌ Invalid topic: "${topic}"`)
    console.error('\nValid topics:')
    VALID_TOPICS.forEach((topic) => console.error(`  - ${topic}`))
    process.exit(1)
  }

  console.log('🚀 ADMI Article Topic Update')
  console.log('='.repeat(50))

  try {
    const article = await findArticleBySlug(slug)
    if (!article) {
      process.exit(1)
    }

    await updateArticleTopic(article.sys.id, topic)

    console.log('\n' + '='.repeat(50))
    console.log('✅ Article topic updated successfully!')
    console.log('='.repeat(50))
  } catch (error) {
    console.error('\n❌ Update failed')
    process.exit(1)
  }
}

main()
