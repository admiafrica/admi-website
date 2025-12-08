/**
 * Article SEO Audit Script
 * Analyzes all 120 articles for SEO optimization opportunities
 */

const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

// Calculate reading time (200 words per minute)
function calculateReadingTime(text) {
  if (!text) return 0
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

// Extract plain text from rich text
function extractPlainText(richText) {
  if (!richText || !richText.content) return ''
  const text = []
  
  const walkContent = (nodes) => {
    nodes.forEach(node => {
      if (node.nodeType === 'text' && node.value) {
        text.push(node.value)
      } else if (node.content) {
        walkContent(node.content)
      }
    })
  }
  
  walkContent(richText.content)
  return text.join(' ')
}

async function auditArticles() {
  try {
    console.log('📚 Auditing 120 articles for SEO optimization...\n')
    
    const response = await client.get('/entries', {
      params: {
        content_type: 'article',
        limit: 1000
      }
    })
    
    const articles = response.data.items
    const audit = {
      total: articles.length,
      withTags: 0,
      withoutTags: 0,
      avgReadingTime: 0,
      avgWordCount: 0,
      avgTitleLength: 0,
      missingCoverImage: 0,
      missingCategory: 0,
      details: []
    }
    
    let totalReadingTime = 0
    let totalWordCount = 0
    
    articles.forEach(article => {
      const fields = article.fields
      const plainText = extractPlainText(fields.body)
      const wordCount = plainText.trim().split(/\s+/).length
      const readingTime = calculateReadingTime(plainText)
      
      totalReadingTime += readingTime
      totalWordCount += wordCount
      
      const hasTags = fields.tags && fields.tags.length > 0
      const hasCategory = fields.category ? true : false
      const hasCoverImage = fields.coverImage ? true : false
      
      if (hasTags) audit.withTags++
      else audit.withoutTags++
      
      if (!hasCoverImage) audit.missingCoverImage++
      if (!hasCategory) audit.missingCategory++
      
      audit.details.push({
        title: fields.title,
        slug: fields.slug,
        wordCount,
        readingTime,
        titleLength: fields.title.length,
        tags: fields.tags ? fields.tags.length : 0,
        hasCategory,
        hasCoverImage,
        seoScore: calculateSEOScore(fields, wordCount)
      })
    })
    
    audit.avgReadingTime = Math.round(totalReadingTime / articles.length)
    audit.avgWordCount = Math.round(totalWordCount / articles.length)
    audit.avgTitleLength = Math.round(
      audit.details.reduce((sum, d) => sum + d.titleLength, 0) / articles.length
    )
    
    // Print summary
    console.log('📊 SEO Audit Summary:')
    console.log(`  Total articles: ${audit.total}`)
    console.log(`  With tags: ${audit.withTags} (${Math.round((audit.withTags/audit.total)*100)}%)`)
    console.log(`  Without tags: ${audit.withoutTags} (${Math.round((audit.withoutTags/audit.total)*100)}%)`)
    console.log(`  Average word count: ${audit.avgWordCount} words`)
    console.log(`  Average reading time: ${audit.avgReadingTime} min`)
    console.log(`  Average title length: ${audit.avgTitleLength} chars`)
    console.log(`  Missing cover image: ${audit.missingCoverImage}`)
    console.log(`  Missing category: ${audit.missingCategory}`)
    
    // Print articles by SEO score
    console.log('\n🎯 Top 10 articles by SEO score:')
    audit.details
      .sort((a, b) => b.seoScore - a.seoScore)
      .slice(0, 10)
      .forEach((article, idx) => {
        console.log(`  ${idx + 1}. ${article.title.substring(0, 50)}... (Score: ${article.seoScore})`)
        console.log(`     ${article.wordCount} words, ${article.readingTime}min read, ${article.tags} tags`)
      })
    
    // Print articles needing improvement
    console.log('\n⚠️  Articles needing improvement (low SEO score):')
    audit.details
      .sort((a, b) => a.seoScore - b.seoScore)
      .slice(0, 10)
      .forEach((article, idx) => {
        console.log(`  ${idx + 1}. ${article.title.substring(0, 50)}... (Score: ${article.seoScore})`)
        const issues = []
        if (article.wordCount < 300) issues.push('Too short')
        if (article.tags < 3) issues.push('Few tags')
        if (!article.hasCoverImage) issues.push('No image')
        if (!article.hasCategory) issues.push('No category')
        console.log(`     Issues: ${issues.join(', ')}`)
      })
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

function calculateSEOScore(fields, wordCount) {
  let score = 50 // Base score
  
  // Word count (ideal: 300-3000 words)
  if (wordCount >= 500) score += 15
  else if (wordCount >= 300) score += 10
  
  // Title length (ideal: 50-60 characters)
  if (fields.title && fields.title.length >= 40 && fields.title.length <= 70) score += 15
  
  // Tags (should have 5+)
  if (fields.tags && fields.tags.length >= 5) score += 15
  
  // Category
  if (fields.category) score += 10
  
  // Cover image
  if (fields.coverImage) score += 10
  
  // Description/summary
  if (fields.summary && fields.summary.length > 100) score += 10
  
  return score
}

auditArticles()
