#!/usr/bin/env node

/**
 * SAFE: Set category on a single article (for testing)
 *
 * Usage:
 *   node scripts/contentful/set-article-category.js <article-slug> <category>
 *
 * Example:
 *   node scripts/contentful/set-article-category.js digital-music-production "Music Production"
 *
 * This script:
 * - Updates ONLY the specified article
 * - Shows preview before making changes
 * - Requires confirmation
 * - Is completely reversible
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

// Valid categories
const VALID_CATEGORIES = [
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
  'Resources' // Keep existing "Resources" for backward compatibility
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

    return article
  } catch (error) {
    console.error('❌ Error finding article:', error.response?.data || error.message)
    return null
  }
}

async function updateArticleCategory(articleId, category) {
  try {
    console.log(`\n📝 Fetching article entry (ID: ${articleId})...`)

    // Get the entry with management API
    const response = await managementClient.get(`/entries/${articleId}`)
    const entry = response.data

    console.log(`✅ Retrieved entry (version: ${entry.sys.version})`)
    console.log('\nCurrent fields:')
    console.log(`   Title: ${entry.fields.title?.['en-US']}`)
    console.log(`   Category: ${entry.fields.category?.['en-US'] || '(not set)'}`)

    console.log(`\n➡️  Will change category to: "${category}"`)

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

    // Update the category field
    entry.fields.category = {
      'en-US': category
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
    console.log(`\nNew category: "${publishResponse.data.fields.category['en-US']}"`)

    return publishResponse.data
  } catch (error) {
    console.error('❌ Error updating article:', error.response?.data || error.message)
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: node set-article-category.js <article-slug> <category>')
    console.error('\nExample:')
    console.error('  node set-article-category.js digital-music-production "Music Production"')
    console.error('\nValid categories:')
    VALID_CATEGORIES.forEach((cat) => console.error(`  - ${cat}`))
    process.exit(1)
  }

  const slug = args[0]
  const category = args[1]

  if (!VALID_CATEGORIES.includes(category)) {
    console.error(`❌ Invalid category: "${category}"`)
    console.error('\nValid categories:')
    VALID_CATEGORIES.forEach((cat) => console.error(`  - ${cat}`))
    process.exit(1)
  }

  console.log('🚀 ADMI Article Category Update')
  console.log('='.repeat(50))

  try {
    // Find the article
    const article = await findArticleBySlug(slug)
    if (!article) {
      process.exit(1)
    }

    // Update the category
    await updateArticleCategory(article.sys.id, category)

    console.log('\n' + '='.repeat(50))
    console.log('✅ Article category updated successfully!')
    console.log('='.repeat(50))
  } catch (error) {
    console.error('\n❌ Update failed')
    process.exit(1)
  }
}

main()
