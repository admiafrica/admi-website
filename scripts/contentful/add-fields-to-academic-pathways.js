/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')
require('dotenv').config()

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const CONTENT_TYPE_ID = '7hj7s6Ixd6yXVG9PrDodkX' // Academic Pathways content type

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Missing environment variables.')
  process.exit(1)
}

console.log('Using Space ID:', SPACE_ID)
console.log('Using Content Type ID:', CONTENT_TYPE_ID)

const client = axios.create({
  baseURL: 'https://api.contentful.com/spaces/' + SPACE_ID,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

async function addFieldsToContentType() {
  try {
    // Get the current content type
    const getResponse = await client.get(`/content_types/${CONTENT_TYPE_ID}`)
    const contentType = getResponse.data
    const version = contentType.sys.version

    console.log(`Current content type version: ${version}`)
    console.log('Current fields:', contentType.fields.map(f => f.id))

    // Add new fields if they don't exist
    const newFields = [
      {
        id: 'benefitsTitle',
        name: 'Benefits Section Title',
        type: 'Symbol',
        required: false
      },
      {
        id: 'woolfMembershipTitle',
        name: 'Woolf Membership Section Title',
        type: 'Symbol',
        required: false
      },
      {
        id: 'woolfMembershipDescription',
        name: 'Woolf Membership Description',
        type: 'Text',
        required: false
      },
      {
        id: 'woolfMembershipSecondDescription',
        name: 'Woolf Membership Second Description',
        type: 'Text',
        required: false
      },
      {
        id: 'globalOpportunitiesTitle',
        name: 'Global Opportunities Title',
        type: 'Symbol',
        required: false
      },
      {
        id: 'globalOpportunitiesDescription',
        name: 'Global Opportunities Description',
        type: 'Text',
        required: false
      },
      {
        id: 'globalOpportunitiesSecondDescription',
        name: 'Global Opportunities Second Description',
        type: 'Text',
        required: false
      }
    ]

    // Add new fields that don't already exist
    for (const newField of newFields) {
      if (!contentType.fields.find(f => f.id === newField.id)) {
        contentType.fields.push(newField)
        console.log(`Added field: ${newField.id}`)
      }
    }

    // Update the content type
    const updateResponse = await client.put(`/content_types/${CONTENT_TYPE_ID}`, contentType, {
      headers: {
        'X-Contentful-Version': version
      }
    })

    console.log('Content type updated successfully!')
    console.log('New version:', updateResponse.data.sys.version)

    // Publish the content type
    const publishResponse = await client.put(`/content_types/${CONTENT_TYPE_ID}/published`, {}, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log('Content type published successfully!')
    console.log('Published version:', publishResponse.data.sys.version)
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.status, error.response.data)
    } else {
      console.error('Error:', error.message)
    }
    process.exit(1)
  }
}

addFieldsToContentType()
