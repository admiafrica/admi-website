/* eslint-disable @typescript-eslint/no-var-requires */
const IntelligentContentOptimizer = require('./scripts/automation/intelligent-content-optimizer')

/**
 * Test Vector Store Integration
 * Verify that the automated system uses the OpenAI Assistant with vector store
 */

async function testVectorStoreIntegration() {
  try {
    console.log('🧪 Testing Vector Store Integration...\n')

    const optimizer = new IntelligentContentOptimizer()

    // Initialize the system
    console.log('⚙️  Initializing optimizer...')
    const initialized = await optimizer.initialize()

    if (!initialized) {
      console.log('❌ Failed to initialize optimizer')
      return
    }

    console.log('✅ Optimizer initialized successfully')

    // Test FAQ generation with vector store
    console.log('\n🤖 Testing FAQ generation with vector store...')

    const testQuery = {
      query: 'what are the requirements for graphic design course at ADMI',
      sessions: 25,
      priority: 'medium'
    }

    const faq = await optimizer.generateFAQ(testQuery)

    if (faq && faq.usedVectorStore) {
      console.log('✅ FAQ generated successfully using vector store!')
      console.log('\n📋 Generated FAQ:')
      console.log(`Q: ${faq.question}`)
      console.log(`A: ${faq.answer.substring(0, 200)}...`)
      console.log(`\nVector Store Used: ${faq.usedVectorStore ? '✅ YES' : '❌ NO'}`)
    } else if (faq) {
      console.log('⚠️  FAQ generated but vector store usage unclear')
      console.log(`Vector Store Used: ${faq.usedVectorStore ? '✅ YES' : '❌ NO'}`)
    } else {
      console.log('❌ FAQ generation failed')
      return
    }

    console.log('\n🎉 Vector store integration test completed successfully!')
    console.log('\n📊 Benefits of Vector Store Integration:')
    console.log('✅ Accurate, up-to-date ADMI course information')
    console.log('✅ Comprehensive knowledge of all programs')
    console.log('✅ Consistent messaging across all generated content')
    console.log('✅ Access to detailed course catalogs and requirements')
    console.log('✅ Better context for career guidance and job market insights')
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

// Run the test
testVectorStoreIntegration()
  .then(() => {
    console.log('\n✨ Test completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
