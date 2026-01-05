#!/usr/bin/env node

/**
 * SAFE: Bulk update article topics from existing tags
 *
 * Usage:
 *   node scripts/contentful/bulk-update-article-topics.js [--dry-run]
 *
 * This script:
 * - Fetches all articles with category="Resources"
 * - Analyzes existing tags to determine appropriate topic
 * - Maps tags to topics using intelligent matching
 * - Shows preview of all proposed changes
 * - Requires confirmation before proceeding
 * - Updates articles in batches with progress reporting
 * - Handles errors gracefully
 *
 * Flags:
 *   --dry-run: Show what would be updated without making changes
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

// Tag to topic mapping - intelligent matching
const TAG_TOPIC_MAPPING = {
  // Music Production
  music: 'Music Production',
  audio: 'Music Production',
  production: 'Music Production',
  beats: 'Music Production',
  mixing: 'Music Production',
  mastering: 'Music Production',
  recording: 'Music Production',
  daw: 'Music Production',
  'music production': 'Music Production',

  // Sound Engineering
  sound: 'Sound Engineering',
  'sound design': 'Sound Engineering',
  'sound engineering': 'Sound Engineering',
  acoustics: 'Sound Engineering',

  // Animation
  animation: 'Animation',
  '3d': 'Animation',
  '2d': 'Animation',
  motion: 'Animation',
  'motion graphics': 'Animation',
  blender: 'Animation',
  maya: 'Animation',

  // Film Production
  film: 'Film Production',
  video: 'Film Production',
  filmmaking: 'Film Production',
  cinematography: 'Film Production',
  editing: 'Film Production',
  'video production': 'Film Production',

  // Photography
  photography: 'Photography',
  photo: 'Photography',
  camera: 'Photography',
  portrait: 'Photography',
  landscape: 'Photography',

  // Graphic Design
  'graphic design': 'Graphic Design',
  design: 'Graphic Design',
  photoshop: 'Graphic Design',
  illustrator: 'Graphic Design',
  branding: 'Graphic Design',
  logo: 'Graphic Design',

  // UI/UX Design
  'ui/ux': 'UI/UX Design',
  ux: 'UI/UX Design',
  ui: 'UI/UX Design',
  'user experience': 'UI/UX Design',
  'user interface': 'UI/UX Design',
  figma: 'UI/UX Design',

  // Video Game Development
  'video game': 'Video Game Development',
  'game development': 'Video Game Development',
  gaming: 'Video Game Development',
  unity: 'Video Game Development',
  unreal: 'Video Game Development',
  'game design': 'Video Game Development',

  // Digital Marketing
  marketing: 'Digital Marketing',
  'digital marketing': 'Digital Marketing',
  seo: 'Digital Marketing',
  'social media': 'Digital Marketing',
  advertising: 'Digital Marketing',

  // Entertainment Business
  business: 'Entertainment Business',
  entrepreneurship: 'Entertainment Business',
  'music business': 'Entertainment Business',
  'film business': 'Entertainment Business',
  career: 'Entertainment Business'
}

/**
 * Determine topic from article tags
 */
function determineTopicFromTags(tags) {
  if (!tags || tags.length === 0) {
    return null
  }

  // Normalize tags
  const normalizedTags = tags.map((tag) => tag.toLowerCase().trim())

  // Try to find exact match first
  for (const tag of normalizedTags) {
    if (TAG_TOPIC_MAPPING[tag]) {
      return TAG_TOPIC_MAPPING[tag]
    }
  }

  // Try partial matches
  for (const tag of normalizedTags) {
    for (const [keyword, topic] of Object.entries(TAG_TOPIC_MAPPING)) {
      if (tag.includes(keyword) || keyword.includes(tag)) {
        return topic
      }
    }
  }

  // No match found
  return null
}

/**
 * Fetch all articles with category="Resources"
 */
async function fetchResourcesArticles() {
  try {
    console.log('📚 Fetching all Resources articles...')

    let allArticles = []
    let skip = 0
    const limit = 100

    while (true) {
      const response = await deliveryClient.get('/entries', {
        params: {
          content_type: 'article',
          'fields.category': 'Resources',
          limit,
          skip
        }
      })

      const articles = response.data.items
      allArticles = allArticles.concat(articles)

      console.log(`   Fetched ${allArticles.length} articles...`)

      if (articles.length < limit) {
        break // No more articles
      }

      skip += limit
    }

    console.log(`✅ Found ${allArticles.length} total articles\n`)
    return allArticles
  } catch (error) {
    console.error('❌ Error fetching articles:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Analyze articles and determine topics
 */
function analyzeArticles(articles) {
  const results = {
    canUpdate: [],
    alreadyHasTopic: [],
    noMatch: []
  }

  for (const article of articles) {
    const title = article.fields.title
    const tags = article.fields.tags || []
    const currentTopic = article.fields.topic

    if (currentTopic) {
      results.alreadyHasTopic.push({
        id: article.sys.id,
        slug: article.fields.slug,
        title,
        currentTopic
      })
      continue
    }

    const suggestedTopic = determineTopicFromTags(tags)

    if (suggestedTopic) {
      results.canUpdate.push({
        id: article.sys.id,
        slug: article.fields.slug,
        title,
        tags,
        suggestedTopic
      })
    } else {
      results.noMatch.push({
        id: article.sys.id,
        slug: article.fields.slug,
        title,
        tags
      })
    }
  }

  return results
}

/**
 * Update article topic
 */
async function updateArticleTopic(articleId, topic, title) {
  try {
    // Fetch entry
    const response = await managementClient.get(`/entries/${articleId}`)
    const entry = response.data

    // Update topic field
    entry.fields.topic = {
      'en-US': topic
    }

    // Ensure category stays as "Resources"
    if (!entry.fields.category) {
      entry.fields.category = {
        'en-US': 'Resources'
      }
    }

    // Update entry
    const updateResponse = await managementClient.put(`/entries/${articleId}`, entry, {
      headers: {
        'X-Contentful-Version': entry.sys.version
      }
    })

    // Publish entry
    await managementClient.put(`/entries/${articleId}/published`, null, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log(`   ✅ Updated: "${title}" → "${topic}"`)
    return true
  } catch (error) {
    console.error(`   ❌ Failed: "${title}"`, error.response?.data?.message || error.message)
    return false
  }
}

/**
 * Show preview of changes
 */
function showPreview(results) {
  console.log('='.repeat(70))
  console.log('📊 ANALYSIS RESULTS')
  console.log('='.repeat(70))

  console.log(`\n✅ Can update (${results.canUpdate.length} articles):`)
  if (results.canUpdate.length > 0) {
    const grouped = {}
    for (const article of results.canUpdate) {
      if (!grouped[article.suggestedTopic]) {
        grouped[article.suggestedTopic] = []
      }
      grouped[article.suggestedTopic].push(article)
    }

    for (const [topic, articles] of Object.entries(grouped)) {
      console.log(`\n   ${topic} (${articles.length} articles):`)
      articles.slice(0, 3).forEach((article) => {
        console.log(`      - ${article.title}`)
        console.log(`        Tags: [${article.tags.join(', ')}]`)
      })
      if (articles.length > 3) {
        console.log(`      ... and ${articles.length - 3} more`)
      }
    }
  }

  console.log(`\n⏭️  Already have topic (${results.alreadyHasTopic.length} articles):`)
  if (results.alreadyHasTopic.length > 0) {
    results.alreadyHasTopic.slice(0, 5).forEach((article) => {
      console.log(`   - ${article.title} → ${article.currentTopic}`)
    })
    if (results.alreadyHasTopic.length > 5) {
      console.log(`   ... and ${results.alreadyHasTopic.length - 5} more`)
    }
  }

  console.log(`\n⚠️  No match found (${results.noMatch.length} articles):`)
  if (results.noMatch.length > 0) {
    results.noMatch.slice(0, 5).forEach((article) => {
      console.log(`   - ${article.title}`)
      console.log(`     Tags: [${article.tags.join(', ')}]`)
    })
    if (results.noMatch.length > 5) {
      console.log(`   ... and ${results.noMatch.length - 5} more`)
    }
  }

  console.log('\n' + '='.repeat(70))
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')

  console.log('🚀 ADMI Bulk Article Topic Update')
  console.log('='.repeat(70))
  console.log(`Space: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}`)
  console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes)' : 'LIVE UPDATE'}`)
  console.log('='.repeat(70))
  console.log()

  try {
    // Step 1: Fetch all articles
    const articles = await fetchResourcesArticles()

    // Step 2: Analyze and determine topics
    const results = analyzeArticles(articles)

    // Step 3: Show preview
    showPreview(results)

    if (results.canUpdate.length === 0) {
      console.log('\n✅ No articles need updating!')
      return
    }

    if (isDryRun) {
      console.log('\n🔍 DRY RUN - No changes made')
      console.log('Remove --dry-run flag to perform updates')
      return
    }

    // Step 4: Confirm
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const confirmed = await new Promise((resolve) => {
      readline.question(`\nUpdate ${results.canUpdate.length} articles? (yes/no): `, (answer) => {
        readline.close()
        resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y')
      })
    })

    if (!confirmed) {
      console.log('❌ Update cancelled by user')
      return
    }

    // Step 5: Update articles in batches
    console.log(`\n📤 Updating ${results.canUpdate.length} articles...`)
    console.log('='.repeat(70))

    let successCount = 0
    let failCount = 0
    const batchSize = 5

    for (let i = 0; i < results.canUpdate.length; i += batchSize) {
      const batch = results.canUpdate.slice(i, i + batchSize)

      console.log(`\nBatch ${Math.floor(i / batchSize) + 1}/${Math.ceil(results.canUpdate.length / batchSize)}:`)

      for (const article of batch) {
        const success = await updateArticleTopic(article.id, article.suggestedTopic, article.title)
        if (success) {
          successCount++
        } else {
          failCount++
        }
      }

      // Rate limiting - wait 1 second between batches
      if (i + batchSize < results.canUpdate.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    console.log('\n' + '='.repeat(70))
    console.log('✅ BULK UPDATE COMPLETE')
    console.log('='.repeat(70))
    console.log(`✅ Successfully updated: ${successCount} articles`)
    console.log(`❌ Failed: ${failCount} articles`)
    console.log(`⏭️  Already had topic: ${results.alreadyHasTopic.length} articles`)
    console.log(`⚠️  No match found: ${results.noMatch.length} articles`)
    console.log('='.repeat(70))

    if (results.noMatch.length > 0) {
      console.log('\n💡 TIP: Articles with no match can be manually updated using:')
      console.log('   node scripts/contentful/set-article-topic.js <slug> "<Topic>"')
      console.log('\nAvailable topics:')
      VALID_TOPICS.forEach((topic) => console.log(`   - ${topic}`))
    }
  } catch (error) {
    console.error('\n❌ Bulk update failed')
    process.exit(1)
  }
}

main()
