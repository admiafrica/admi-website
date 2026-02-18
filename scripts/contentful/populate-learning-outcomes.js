#!/usr/bin/env node
/**
 * Populate Learning Outcomes in Contentful
 * 
 * Creates courseLearningOutcome entries and links them to courses.
 * Based on content guide and diploma-course-data.ts
 * 
 * Usage: node -r dotenv/config scripts/contentful/populate-learning-outcomes.js
 */

require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const api = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }
})

// Learning outcomes per course - based on content guide
const COURSE_LEARNING_OUTCOMES = {
  'film-and-television-production-diploma': {
    courseId: '18HwDFfYH5d4D4Gt8OGpem',
    outcomes: [
      {
        title: 'Master Camera Operations',
        description: 'Operate professional cameras including RED, Blackmagic, and DSLR for narrative and documentary projects.',
        icon: 'camera',
        order: 1
      },
      {
        title: 'Execute Professional Lighting',
        description: 'Design and execute lighting setups for narrative, documentary, and commercial productions using industry-standard equipment.',
        icon: 'lightbulb',
        order: 2
      },
      {
        title: 'Edit Multi-Camera Projects',
        description: 'Edit professional video content using DaVinci Resolve, Final Cut Pro, and Adobe Premiere Pro.',
        icon: 'film',
        order: 3
      },
      {
        title: 'Direct Actors and Crew',
        description: 'Direct actors and manage production crews on location and in-studio for short films and documentaries.',
        icon: 'users',
        order: 4
      },
      {
        title: 'Manage Full Productions',
        description: 'Plan and execute film productions from script development through post-production and distribution.',
        icon: 'briefcase',
        order: 5
      }
    ]
  },
  'sound-engineering-diploma': {
    courseId: '67eW1oyZsfG5XXRXbQeoGR',
    outcomes: [
      {
        title: 'Operate Recording Equipment',
        description: 'Set up and operate professional recording equipment including SSL consoles, Neumann microphones, and Pro Tools HDX systems.',
        icon: 'mic',
        order: 1
      },
      {
        title: 'Record Multi-Track Sessions',
        description: 'Record multi-track sessions for various genres including afrobeats, gospel, hip-hop, and live bands.',
        icon: 'music',
        order: 2
      },
      {
        title: 'Mix and Master to Industry Standards',
        description: 'Mix and master audio to broadcast and streaming standards using professional plugins and outboard gear.',
        icon: 'speaker',
        order: 3
      },
      {
        title: 'Design Live Sound Systems',
        description: 'Design and operate live sound systems for concerts, events, and broadcast using digital mixing consoles.',
        icon: 'tools',
        order: 4
      },
      {
        title: 'Apply Acoustic Principles',
        description: 'Apply acoustic principles to studio design and optimize recording environments for various applications.',
        icon: 'target',
        order: 5
      }
    ]
  },
  'graphic-design-diploma': {
    courseId: '53H3cuBU18u0Bcn1r8jYlu',
    outcomes: [
      {
        title: 'Create Professional Brand Identities',
        description: 'Design complete brand identity systems including logos, color palettes, typography, and brand guidelines.',
        icon: 'palette',
        order: 1
      },
      {
        title: 'Design for Print and Digital',
        description: 'Create designs for print media (brochures, packaging, signage) and digital platforms (social media, web, apps).',
        icon: 'edit',
        order: 2
      },
      {
        title: 'Master Typography and Color Theory',
        description: 'Apply advanced typography techniques and color theory principles to create visually compelling designs.',
        icon: 'target',
        order: 3
      },
      {
        title: 'Present and Defend Design Decisions',
        description: 'Present design concepts to clients and stakeholders, articulating creative rationale and strategic thinking.',
        icon: 'briefcase',
        order: 4
      },
      {
        title: 'Manage Client Relationships',
        description: 'Work with clients from brief to delivery, managing feedback, revisions, and professional communication.',
        icon: 'users',
        order: 5
      }
    ]
  },
  'digital-content-creation-diploma': {
    courseId: '7Inh4ajHu0AIfSmMzdCwbp',
    outcomes: [
      {
        title: 'Create Engaging Multi-Platform Content',
        description: 'Produce professional content for YouTube, TikTok, Instagram, podcasts, and emerging platforms.',
        icon: 'video',
        order: 1
      },
      {
        title: 'Develop Content Strategies',
        description: 'Create and execute content strategies aligned with audience growth, engagement, and monetization goals.',
        icon: 'target',
        order: 2
      },
      {
        title: 'Analyze Performance Data',
        description: 'Use analytics tools to track content performance, understand audience behavior, and optimize future content.',
        icon: 'trending-up',
        order: 3
      },
      {
        title: 'Monetize Digital Audiences',
        description: 'Build and monetize audiences through ads, sponsorships, affiliate marketing, and direct products.',
        icon: 'award',
        order: 4
      },
      {
        title: 'Manage Brand Partnerships',
        description: 'Negotiate and execute brand partnership deals with professional communication and deliverables.',
        icon: 'briefcase',
        order: 5
      }
    ]
  }
}

async function createLearningOutcome(outcome) {
  try {
    const entry = await api.post('/entries', {
      fields: {
        title: { 'en-US': outcome.title },
        description: { 'en-US': outcome.description },
        icon: { 'en-US': outcome.icon },
        order: { 'en-US': outcome.order }
      }
    }, {
      headers: { 'X-Contentful-Content-Type': 'courseLearningOutcome' }
    })
    
    // Publish the entry
    await api.put(`/entries/${entry.data.sys.id}/published`, null, {
      headers: { 'X-Contentful-Version': entry.data.sys.version }
    })
    
    console.log(`   ✅ Created: ${outcome.title} (${entry.data.sys.id})`)
    return entry.data.sys.id
  } catch (error) {
    console.error(`   ❌ Failed: ${outcome.title}`, error.response?.data?.message || error.message)
    return null
  }
}

async function linkOutcomesToCourse(courseId, outcomeIds) {
  try {
    // Get current course entry
    const course = await api.get(`/entries/${courseId}`)
    const version = course.data.sys.version
    
    // Update learningOutcomesList field
    const fields = course.data.fields || {}
    fields.learningOutcomesList = {
      'en-US': outcomeIds.map(id => ({
        sys: { type: 'Link', linkType: 'Entry', id }
      }))
    }
    
    // Update the entry
    const updated = await api.put(`/entries/${courseId}`, { fields }, {
      headers: { 'X-Contentful-Version': version }
    })
    
    // Publish the course
    await api.put(`/entries/${courseId}/published`, null, {
      headers: { 'X-Contentful-Version': updated.data.sys.version }
    })
    
    console.log(`   ✅ Linked ${outcomeIds.length} outcomes to course`)
    return true
  } catch (error) {
    console.error(`   ❌ Failed to link outcomes:`, error.response?.data?.message || error.message)
    return false
  }
}

async function main() {
  console.log('🎯 Populating Learning Outcomes in Contentful\n')
  
  const dryRun = process.argv.includes('--dry-run')
  if (dryRun) {
    console.log('🧪 DRY RUN MODE - No changes will be made\n')
  }
  
  for (const [slug, data] of Object.entries(COURSE_LEARNING_OUTCOMES)) {
    console.log(`\n📚 ${slug}`)
    console.log(`   Course ID: ${data.courseId}`)
    
    if (dryRun) {
      data.outcomes.forEach(o => console.log(`   Would create: ${o.title} (${o.icon})`))
      continue
    }
    
    // Create learning outcome entries
    const outcomeIds = []
    for (const outcome of data.outcomes) {
      const id = await createLearningOutcome(outcome)
      if (id) outcomeIds.push(id)
      await new Promise(r => setTimeout(r, 300)) // Rate limiting
    }
    
    // Link outcomes to course
    if (outcomeIds.length > 0) {
      console.log(`\n   Linking to course...`)
      await linkOutcomesToCourse(data.courseId, outcomeIds)
    }
  }
  
  console.log('\n✅ Done! Check Contentful to verify the learning outcomes.')
  console.log('\n📝 Next steps:')
  console.log('   1. Review outcomes in Contentful')
  console.log('   2. Add outcomes for certificate courses')
  console.log('   3. Update frontend to display learningOutcomesList')
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
