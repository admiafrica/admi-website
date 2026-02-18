#!/usr/bin/env node

/**
 * Migration: Convert learningOutcomes from RichText to Array<Link> of courseLearningOutcome entries.
 * 
 * This script:
 * 1. Creates the courseLearningOutcome content type
 * 2. Updates the course content type to use Array<Link> instead of RichText
 * 
 * Note: Existing RichText content will need to be manually migrated to individual entries.
 *
 * Usage:
 *   node -r dotenv/config scripts/contentful/migrate-learning-outcomes.js
 */

const { getEnvironment } = require('./utils/contentful-helpers')

async function main() {
  const env = await getEnvironment()

  // Step 1: Check if courseLearningOutcome content type already exists
  let learningOutcomeType
  try {
    learningOutcomeType = await env.getContentType('courseLearningOutcome')
    console.log('✓ courseLearningOutcome content type already exists')
  } catch (error) {
    // Create the content type
    console.log('Creating courseLearningOutcome content type...')
    
    learningOutcomeType = await env.createContentTypeWithId('courseLearningOutcome', {
      name: 'Course Learning Outcome',
      description: 'Individual learning outcome for a course. Each course should have 4-5 outcomes.',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [{ size: { max: 100 } }]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false,
          localized: false,
          validations: [{ size: { max: 500 } }]
        },
        {
          id: 'icon',
          name: 'Icon Name',
          type: 'Symbol',
          required: false,
          localized: false,
          validations: [
            {
              in: [
                'certificate',
                'briefcase',
                'tools',
                'users',
                'trending-up',
                'award',
                'book',
                'lightbulb',
                'target',
                'star',
                'check-circle',
                'code',
                'camera',
                'music',
                'film',
                'palette',
                'mic',
                'speaker',
                'video',
                'edit'
              ]
            }
          ]
        },
        {
          id: 'order',
          name: 'Display Order',
          type: 'Integer',
          required: false,
          localized: false,
          validations: [{ range: { min: 1, max: 10 } }]
        }
      ]
    })
    
    // Publish the new content type
    await learningOutcomeType.publish()
    console.log('✅ Created and published courseLearningOutcome content type')
  }

  // Step 2: Add a NEW field to course content type (don't replace existing RichText)
  console.log('\nAdding learningOutcomesList field to course content type...')
  const courseType = await env.getContentType('course')
  
  // Check if new field already exists
  const existingField = courseType.fields.find(f => f.id === 'learningOutcomesList')
  
  if (existingField) {
    console.log('✓ learningOutcomesList field already exists on course content type')
  } else {
    // Add new Array<Link> field (keep old RichText field temporarily)
    courseType.fields.push({
      id: 'learningOutcomesList',
      name: 'Learning Outcomes List (4-5 items)',
      type: 'Array',
      required: false,
      localized: false,
      validations: [
        { size: { min: 0, max: 10 } }
      ],
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: ['courseLearningOutcome'] }
        ]
      }
    })

    // Update and publish
    const updatedCourseType = await courseType.update()
    await updatedCourseType.publish()
    
    console.log('✅ Added course.learningOutcomesList as Array<Link> to courseLearningOutcome')
    console.log('   Note: Old learningOutcomes RichText field kept for backward compatibility')
  }
  
  console.log('\n📝 Next steps:')
  console.log('   1. Go to Contentful and create 4-5 Learning Outcome entries per course')
  console.log('   2. Link them to each course in the learningOutcomesList field')
  console.log('   3. Update code to prefer learningOutcomesList over learningOutcomes')
  console.log('   4. Once all courses migrated, remove old learningOutcomes field')

  // Show final count
  const types = await env.getContentTypes({ limit: 100 })
  console.log('\nFinal content type count:', types.total, '/ 25')
}

main().catch((err) => {
  console.error('❌ Error:', err.message || err)
  process.exit(1)
})
