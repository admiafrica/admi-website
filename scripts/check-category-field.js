const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

async function debug() {
  try {
    // Check animator article
    console.log('Animator article fields:')
    const article = await client.get('/entries/1ddR18DnZ6OIz6G19rIvDA')
    console.log('All fields in article:')
    console.log(JSON.stringify(article.data.fields, null, 2))
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

debug()
