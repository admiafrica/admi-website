#!/usr/bin/env node

/**
 * Check Brevo contact attributes to understand data structure
 */

const axios = require('axios')
require('dotenv').config()

async function checkBrevoAttributes() {
  const apiKey = process.env.BREVO_API_KEY
  const baseURL = 'https://api.brevo.com/v3'

  console.log('🔍 Checking Brevo contact attributes...\n')

  try {
    // Get first 10 contacts to see structure
    const response = await axios.get(`${baseURL}/contacts`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      params: {
        limit: 10
      }
    })

    const contacts = response.data.contacts || []
    
    if (contacts.length > 0) {
      console.log('📊 Sample Contact Structure:')
      console.log('=' .repeat(60))
      
      const sample = contacts[0]
      console.log('\nContact #1:')
      console.log('Email:', sample.email)
      console.log('ID:', sample.id)
      console.log('List IDs:', sample.listIds)
      console.log('\nAttributes:')
      console.log(JSON.stringify(sample.attributes, null, 2))
      console.log('\n' + '=' .repeat(60))

      // Collect all unique attribute keys
      const allAttributes = new Set()
      contacts.forEach(contact => {
        if (contact.attributes) {
          Object.keys(contact.attributes).forEach(key => allAttributes.add(key))
        }
      })

      console.log('\n📋 Available Attributes Across Sample:')
      Array.from(allAttributes).sort().forEach(attr => {
        console.log(`   - ${attr}`)
      })

      // Check lists
      console.log('\n📑 Getting all lists...')
      const listsResponse = await axios.get(`${baseURL}/contacts/lists`, {
        headers: {
          'api-key': apiKey
        }
      })

      console.log('\nAvailable Lists:')
      listsResponse.data.lists.forEach(list => {
        console.log(`   - ${list.name} (ID: ${list.id}) - ${list.totalSubscribers} subscribers`)
      })

    } else {
      console.log('⚠️  No contacts found')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response.data)
    }
  }
}

checkBrevoAttributes().catch(console.error)
