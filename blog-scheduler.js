const SEORocketBlogGenerator = require('./seo-rocket-blog-generator')
const { getTopicsByCategory, getRandomTopic } = require('./blog-topics-database')
const fs = require('fs').promises
const path = require('path')

class BlogScheduler {
  constructor() {
    this.generator = new SEORocketBlogGenerator()
    this.logFile = path.join(__dirname, 'blog-generation-log.json')
    this.scheduleConfig = {
      // How many articles to generate per run
      articlesPerBatch: 3,
      // Categories to rotate through
      categoryRotation: ['creativeEconomy', 'techEconomy', 'digitalMarketing', 'gaming', 'edtech'],
      // Current category index
      currentCategoryIndex: 0
    }
  }

  // Load generation log
  async loadLog() {
    try {
      const logData = await fs.readFile(this.logFile, 'utf8')
      return JSON.parse(logData)
    } catch (error) {
      // Return default log structure if file doesn't exist
      return {
        totalGenerated: 0,
        lastRun: null,
        generatedArticles: [],
        categoryStats: {},
        errors: []
      }
    }
  }

  // Save generation log
  async saveLog(logData) {
    try {
      await fs.writeFile(this.logFile, JSON.stringify(logData, null, 2))
    } catch (error) {
      console.error('Error saving log:', error.message)
    }
  }

  // Generate multiple articles in a batch
  async generateBatch(articlesToGenerate = null) {
    const count = articlesToGenerate || this.scheduleConfig.articlesPerBatch
    const log = await this.loadLog()
    const batchResults = []

    console.log(`🚀 Starting batch generation of ${count} articles...\n`)

    for (let i = 0; i < count; i++) {
      try {
        console.log(`📝 Generating article ${i + 1} of ${count}...`)

        // Select topic from rotating categories for variety
        const categoryIndex = (log.totalGenerated + i) % this.scheduleConfig.categoryRotation.length
        const selectedCategory = this.scheduleConfig.categoryRotation[categoryIndex]

        // Get topics from the selected category
        const categoryTopics = getTopicsByCategory(selectedCategory)
        let selectedTopic

        if (categoryTopics.length > 0) {
          // Avoid recently used topics
          const recentSlugs = log.generatedArticles
            .slice(-20) // Last 20 articles
            .map((article) => article.slug)

          const availableTopics = categoryTopics.filter((topic) => {
            const slug = this.generateSlug(topic.topic)
            return !recentSlugs.some((recentSlug) => recentSlug.includes(slug.split('-')[0]))
          })

          selectedTopic =
            availableTopics.length > 0
              ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
              : categoryTopics[Math.floor(Math.random() * categoryTopics.length)]
        } else {
          selectedTopic = getRandomTopic()
        }

        // Generate the article
        const result = await this.generator.generateBlogArticle(selectedTopic)

        if (result) {
          batchResults.push({
            ...result,
            category: selectedTopic.category,
            categoryType: selectedCategory,
            batchIndex: i + 1
          })

          console.log(`✅ Article ${i + 1} completed: ${result.title}\n`)

          // Add delay between generations to avoid rate limiting
          if (i < count - 1) {
            console.log('⏱️  Waiting 30 seconds before next generation...\n')
            await new Promise((resolve) => setTimeout(resolve, 30000))
          }
        } else {
          console.error(`❌ Failed to generate article ${i + 1}\n`)
          log.errors.push({
            timestamp: new Date().toISOString(),
            error: `Failed to generate article ${i + 1}`,
            topic: selectedTopic?.topic || 'Unknown'
          })
        }
      } catch (error) {
        console.error(`❌ Error generating article ${i + 1}:`, error.message)
        log.errors.push({
          timestamp: new Date().toISOString(),
          error: error.message,
          articleIndex: i + 1
        })
      }
    }

    // Update log
    log.totalGenerated += batchResults.length
    log.lastRun = new Date().toISOString()
    log.generatedArticles.push(...batchResults)

    // Update category stats
    batchResults.forEach((article) => {
      if (!log.categoryStats[article.categoryType]) {
        log.categoryStats[article.categoryType] = 0
      }
      log.categoryStats[article.categoryType]++
    })

    await this.saveLog(log)

    return {
      successful: batchResults.length,
      failed: count - batchResults.length,
      articles: batchResults,
      totalGenerated: log.totalGenerated
    }
  }

  // Generate daily batch (can be run via cron job)
  async dailyGeneration() {
    console.log('📅 Running daily blog generation...')
    const result = await this.generateBatch(2) // Generate 2 articles daily

    console.log('\n📊 Daily Generation Summary:')
    console.log(`✅ Successfully generated: ${result.successful} articles`)
    console.log(`❌ Failed: ${result.failed} articles`)
    console.log(`📈 Total articles generated: ${result.totalGenerated}`)

    if (result.articles.length > 0) {
      console.log('\n📝 Generated Articles:')
      result.articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title}`)
        console.log(`   Category: ${article.category}`)
        console.log(`   Status: ${article.status}`)
        console.log(`   ID: ${article.entryId}\n`)
      })
    }

    return result
  }

  // Weekly batch (can be run via cron job)
  async weeklyGeneration() {
    console.log('📅 Running weekly blog generation...')
    const result = await this.generateBatch(7) // Generate 7 articles weekly

    console.log('\n📊 Weekly Generation Summary:')
    console.log(`✅ Successfully generated: ${result.successful} articles`)
    console.log(`❌ Failed: ${result.failed} articles`)
    console.log(`📈 Total articles generated: ${result.totalGenerated}`)

    return result
  }

  // Generate articles for a specific category
  async generateByCategory(category, count = 3) {
    console.log(`🎯 Generating ${count} articles for category: ${category}`)

    const categoryTopics = getTopicsByCategory(category)
    if (categoryTopics.length === 0) {
      console.error(`❌ No topics found for category: ${category}`)
      return null
    }

    const results = []
    for (let i = 0; i < Math.min(count, categoryTopics.length); i++) {
      const topic = categoryTopics[i]
      const result = await this.generator.generateBlogArticle(topic)

      if (result) {
        results.push(result)
        console.log(`✅ Generated: ${result.title}`)

        // Add delay between generations
        if (i < count - 1) {
          await new Promise((resolve) => setTimeout(resolve, 30000))
        }
      }
    }

    return results
  }

  // Get generation statistics
  async getStats() {
    const log = await this.loadLog()

    return {
      totalGenerated: log.totalGenerated,
      lastRun: log.lastRun,
      categoryBreakdown: log.categoryStats,
      recentArticles: log.generatedArticles.slice(-10),
      errorCount: log.errors.length,
      recentErrors: log.errors.slice(-5)
    }
  }

  // Helper function to generate slug (same as in generator)
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
}

module.exports = BlogScheduler

// CLI usage
if (require.main === module) {
  const scheduler = new BlogScheduler()
  const command = process.argv[2]
  const param = process.argv[3]

  switch (command) {
    case 'daily':
      scheduler.dailyGeneration()
      break
    case 'weekly':
      scheduler.weeklyGeneration()
      break
    case 'batch':
      const count = parseInt(param) || 3
      scheduler.generateBatch(count)
      break
    case 'category':
      const category = param
      const categoryCount = parseInt(process.argv[4]) || 3
      if (!category) {
        console.error('Please specify a category')
        process.exit(1)
      }
      scheduler.generateByCategory(category, categoryCount)
      break
    case 'stats':
      scheduler.getStats().then((stats) => {
        console.log('📊 Blog Generation Statistics:')
        console.log(JSON.stringify(stats, null, 2))
      })
      break
    default:
      console.log('Usage:')
      console.log('  node blog-scheduler.js daily           - Generate daily batch (2 articles)')
      console.log('  node blog-scheduler.js weekly          - Generate weekly batch (7 articles)')
      console.log('  node blog-scheduler.js batch [count]   - Generate specific number of articles')
      console.log('  node blog-scheduler.js category [name] [count] - Generate articles for specific category')
      console.log('  node blog-scheduler.js stats           - Show generation statistics')
      console.log('')
      console.log('Available categories: creativeEconomy, techEconomy, digitalMarketing, gaming, edtech')
  }
}
