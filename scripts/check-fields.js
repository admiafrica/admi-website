const axios = require('axios')

const client = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/qtu3mga6n6gc',
  headers: { Authorization: 'Bearer FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc' }
})

client.get('/entries/1ddR18DnZ6OIz6G19rIvDA').then(r => {
  const article = r.data.fields
  console.log('Category:', JSON.stringify(article.category, null, 2))
  console.log('\nCover Image:', article.coverImage ? 'YES' : 'NO - MISSING!')
  console.log('Featured:', article.featured ? 'YES' : 'NO')
  console.log('Title:', article.title ? 'YES' : 'NO')
  console.log('Slug:', article.slug ? 'YES' : 'NO')
  console.log('Summary:', article.summary ? 'YES' : 'NO')
  console.log('Body:', article.body ? 'YES' : 'NO')
})

