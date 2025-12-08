const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const DELIVERY_TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'
const MGMT_TOKEN = 'CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs'

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${DELIVERY_TOKEN}` }
})

const mgmtClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE}`,
  headers: {
    Authorization: `Bearer ${MGMT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

// Map keywords to relevant tags
const tagMappings = {
  animation: ['Animation', 'Digital Art', 'Creative Skills'],
  film: ['Film Production', 'Filmmaking', 'Creative Skills', 'Video Production'],
  game: ['Game Development', 'Creative Technology', 'Digital Art'],
  music: ['Music Production', 'Audio Engineering', 'Creative Skills'],
  photography: ['Photography', 'Visual Arts', 'Creative Skills'],
  graphic: ['Graphic Design', 'Visual Design', 'Digital Art', 'Creative Skills'],
  video: ['Video Production', 'Digital Media', 'Creative Technology'],
  sound: ['Sound Engineering', 'Audio Production', 'Technical Skills'],
  'digital marketing': ['Digital Marketing', 'Marketing Strategy', 'Business Skills'],
  'content creation': ['Content Creation', 'Digital Media', 'Creative Skills'],
  ai: ['AI & Technology', 'Emerging Tech', 'Future Skills'],
  parent: ['Parenting Tips', 'Career Guidance', 'Education'],
  student: ['Student Success', 'Career Development', 'Education'],
  career: ['Career Development', 'Career Guidance', 'Professional Skills'],
  entrepreneur: ['Entrepreneurship', 'Business Skills', 'Career Development'],
  tech: ['Technology', 'Digital Skills', 'Technical Training'],
  'creative industry': ['Creative Industries', 'Career Development', 'Industry Insights'],
  africa: ['African Creatives', 'African Innovation', 'ADMI Training'],
}

const baselineTags = ['Career Guide', 'Industry Insights', 'ADMI Training']

function generateTags(title, summary, category) {
  const text = `${title} ${summary}`.toLowerCase()
  const tagsSet = new Set(baselineTags)

  // Add category-based tags
  if (category === 'Resources') {
    tagsSet.add('Resources')
  }

  // Check title and summary for keywords
  Object.entries(tagMappings).forEach(([keyword, tags]) => {
    if (text.includes(keyword)) {
      tags.forEach(tag => tagsSet.add(tag))
    }
  })

  return Array.from(tagsSet)
}

async function batchUpdateArticles() {
  try {
    console.log('📚 Fetching all articles...\n')

    // Get all articles
    const articlesResponse = await deliveryClient.get('/entries', {
      params: {
        content_type: 'article',
        limit: 1000,
        select: 'fields.title,fields.summary,fields.category,sys.id'
      }
    })

    const articles = articlesResponse.data.items
    console.log(`Found ${articles.length} articles to process\n`)

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const article of articles) {
      const entryId = article.sys.id
      const title = article.fields.title
      const summary = article.fields.summary || ''
      const category = article.fields.category || ''

      try {
        // Get published version from delivery API
        const publishedData = await deliveryClient.get(`/entries/${entryId}`)
        const publishedFields = publishedData.data.fields

        // Skip if already has tags
        if (publishedFields.tags && publishedFields.tags.length > 0) {
          console.log(`⏭️  SKIP: "${title}" (already has ${publishedFields.tags.length} tags)`)
          skipCount++
          continue
        }

        // Get draft version
        const draftData = await mgmtClient.get(`/entries/${entryId}`)
        const draftVersion = draftData.data.sys.version

        // Build full fields update
        const updatedFields = {}
        Object.keys(publishedFields).forEach(fieldName => {
          const fieldValue = publishedFields[fieldName]
          if (fieldValue !== null && fieldValue !== undefined) {
            updatedFields[fieldName] = {
              'en-US': fieldValue
            }
          }
        })

        // Generate and add tags
        const tags = generateTags(title, summary, category)
        updatedFields.tags = {
          'en-US': tags
        }

        // Update entry
        const updateResponse = await mgmtClient.put(`/entries/${entryId}`, {
          fields: updatedFields
        }, {
          headers: {
            'X-Contentful-Version': draftVersion
          }
        })

        const newVersion = updateResponse.data.sys.version

        // Publish
        await mgmtClient.put(`/entries/${entryId}/published`, {}, {
          headers: {
            'X-Contentful-Version': newVersion
          }
        })

        console.log(`✅ "${title.substring(0, 60)}..." → ${tags.length} tags`)
        successCount++

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (error) {
        console.log(`❌ ERROR: "${title}" - ${error.response?.data?.message || error.message}`)
        errorCount++
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`  ✅ Updated: ${successCount}`)
    console.log(`  ⏭️  Skipped: ${skipCount}`)
    console.log(`  ❌ Errors: ${errorCount}`)
    console.log(`\n✨ Batch tag update complete!`)
  } catch (error) {
    console.error('Fatal error:', error.response?.data?.message || error.message)
  }
}

batchUpdateArticles()
