const axios = require('axios')
require('dotenv').config()

async function testPerplexity() {
  try {
    console.log('🔍 Testing Perplexity API connection...')

    const apiKey = process.env.PERPLEXITY_API_KEY
    console.log(`API Key: ${apiKey?.substring(0, 10)}...`)

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'What are the latest trends in social media marketing in Africa?'
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('✅ Perplexity API test successful!')
    console.log('Response:', response.data.choices[0].message.content.substring(0, 200) + '...')
  } catch (error) {
    console.error('❌ Perplexity API test failed:')
    console.error('Status:', error.response?.status)
    console.error('Status Text:', error.response?.statusText)
    console.error('Error Data:', error.response?.data)
  }
}

testPerplexity()
