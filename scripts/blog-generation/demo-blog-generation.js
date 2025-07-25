const SEORocketBlogGenerator = require('./seo-rocket-blog-generator')
const { getRandomTopic, getTopicsByCategory } = require('./blog-topics-database')

async function runDemo() {
  console.log('🚀 SEO Rocket Blog Generator Demo\n')
  console.log('This demo will generate a single blog article and save it as a draft in Contentful.\n')

  try {
    // Initialize the generator
    const generator = new SEORocketBlogGenerator()

    // Show available categories
    console.log('📚 Available topic categories:')
    console.log('  - creativeEconomy: Digital art, film, music, creative business')
    console.log('  - techEconomy: Video game development, virtual film production, AI film/animation production')
    console.log('  - digitalMarketing: Social media, SEO, content marketing')
    console.log('  - gaming: Game development, VR/AR, mobile games')
    console.log('  - edtech: Online learning, educational content\n')

    // Get a random topic for demo
    const selectedTopic = getRandomTopic()
    console.log('🎯 Selected topic for demo:')
    console.log(`   Topic: ${selectedTopic.topic}`)
    console.log(`   Category: ${selectedTopic.category}`)
    console.log(`   Type: ${selectedTopic.categoryType}`)
    console.log(`   Keywords: ${selectedTopic.keywords.join(', ')}`)
    console.log(`   Difficulty: ${selectedTopic.difficulty}\n`)

    // Generate the article
    console.log('⏳ Starting article generation process...\n')
    const result = await generator.generateBlogArticle(selectedTopic)

    if (result) {
      console.log('\n🎉 Demo completed successfully!')
      console.log('\n📄 Generated Article Details:')
      console.log(`   Title: ${result.title}`)
      console.log(`   Entry ID: ${result.entryId}`)
      console.log(`   Slug: ${result.slug}`)
      console.log(`   Status: ${result.status}`)
      console.log(`   Created: ${result.createdAt}`)

      console.log('\n📋 Next Steps:')
      console.log('   1. Check your Contentful space for the new draft article')
      console.log('   2. Review the content quality and accuracy')
      console.log('   3. Add an appropriate cover image')
      console.log('   4. Make any necessary edits')
      console.log('   5. Publish when ready')

      console.log('\n🔗 The article will be available at:')
      console.log(`   https://admi.africa/news-events/news/${result.slug}`)
      console.log('   (after publishing and cache refresh)')
    } else {
      console.log('\n❌ Demo failed to generate article')
      console.log('Check your API keys and Contentful configuration')
    }
  } catch (error) {
    console.error('\n❌ Demo error:', error.message)

    console.log('\n🔧 Troubleshooting Tips:')
    console.log('   1. Verify your .env file has all required API keys')
    console.log('   2. Check that PERPLEXITY_API_KEY is valid')
    console.log('   3. Ensure CONTENTFUL_MANAGEMENT_TOKEN has write permissions')
    console.log('   4. Confirm CONTENTFUL_SPACE_ID is correct')
    console.log('   5. Make sure your internet connection is stable')
  }
}

// Run the demo
if (require.main === module) {
  runDemo()
}
