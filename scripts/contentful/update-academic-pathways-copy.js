/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')
require('dotenv').config()

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENTRY_ID = '5S7ClljQzI4b219Dfi5kuS' // Academic Pathways page entry ID

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Missing environment variables. Make sure ADMI_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are set.')
  process.exit(1)
}

console.log('Using Space ID:', SPACE_ID)

const client = axios.create({
  baseURL: 'https://api.contentful.com/spaces/' + SPACE_ID,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

async function updateAcademicPathwaysEntry() {
  try {
    // First, get the current entry
    const getResponse = await client.get(`/entries/${ENTRY_ID}`)
    const entry = getResponse.data
    const version = entry.sys.version

    console.log(`Current entry version: ${version}`)

    // Update the fields with new copy
    entry.fields = {
      ...entry.fields,
      heroTitle: { 'en-US': 'As an accredited member of Woolf—a globally recognized collegiate Higher Education Institution—ADMI provides students with world-class education that is recognized across 50+ countries.' },
      heroDescription: { 'en-US': 'Through our membership with Woolf, ADMI graduates receive degrees recognized by treaty obligation in the European Higher Education Area, the United States, Canada, and beyond. Our academic pathways enable seamless transitions to further studies or careers in digital media and creative technology.' },
      benefitsTitle: { 'en-US': 'Why Work at ADMI?' },
      woolfMembershipTitle: { 'en-US': 'Woolf Membership' },
      woolfMembershipDescription: { 'en-US': 'Woolf is a fully accredited collegiate Higher Education Institution modeled on Oxford, Delhi University, and University of California. As a member college, ADMI benefits from Woolf\'s advanced Accreditation Management System and commitment to European Standards and Guidelines 2015.' },
      woolfMembershipSecondDescription: { 'en-US': 'Our students graduate with degrees recognized across the European Qualifications Framework, and verified for immigration, residency, and professional licensing in Canada, the United States, and beyond.' },
      globalOpportunitiesTitle: { 'en-US': 'Global Opportunities' },
      globalOpportunitiesDescription: { 'en-US': 'As a Woolf member college, ADMI offers students industry-focused curricula combined with internationally recognized accreditation. Our graduates earn degrees that facilitate immigration, professional licensing, and educational advancement worldwide.' },
      globalOpportunitiesSecondDescription: { 'en-US': 'Whether pursuing careers in digital media or transitioning to further studies at leading institutions globally, ADMI students benefit from Woolf\'s commitment to academic excellence and the global recognition that comes with European Higher Education standards. Education should be world-class, accessible, and globally transferable—and that\'s exactly what Woolf and ADMI deliver.' }
    }

    // Update the entry
    const updateResponse = await client.put(`/entries/${ENTRY_ID}`, entry, {
      headers: {
        'X-Contentful-Version': version
      }
    })

    console.log('Entry updated successfully!')
    console.log('New version:', updateResponse.data.sys.version)

    // Publish the entry
    const publishResponse = await client.put(`/entries/${ENTRY_ID}/published`, {}, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log('Entry published successfully!')
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

updateAcademicPathwaysEntry()
