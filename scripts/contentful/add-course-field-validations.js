#!/usr/bin/env node

/**
 * Add character/word count validations to course description and hero subtitle fields.
 * 
 * Validations:
 * - subtitle: 150 characters max (hero excerpt)
 * - tagline: 150 characters max (hero excerpt)
 *
 * Note: Rich Text fields (aboutTheCourse) don't support character limits in Contentful.
 * Content guidance is provided via field name/instructions in the Contentful UI.
 *
 * Usage:
 *   node -r dotenv/config scripts/contentful/add-course-field-validations.js
 */

const { getEnvironment } = require('./utils/contentful-helpers')

async function main() {
  const env = await getEnvironment()

  const courseType = await env.getContentType('course')
  let changed = false

  // Update field validations
  courseType.fields = courseType.fields.map((field) => {
    // subtitle (Symbol) - enforce 150 char max for hero excerpt
    if (field.id === 'subtitle' && field.type === 'Symbol') {
      const existingValidations = field.validations || []
      const hasSizeValidation = existingValidations.some(v => v.size)
      
      if (!hasSizeValidation) {
        console.log('Adding character limit to subtitle field: max 150 chars')
        field.validations = [
          ...existingValidations.filter(v => !v.size),
          { size: { max: 150 } }
        ]
        changed = true
      } else {
        const currentMax = existingValidations.find(v => v.size)?.size?.max
        if (currentMax !== 150) {
          field.validations = existingValidations.map(v => 
            v.size ? { size: { max: 150 } } : v
          )
          console.log('Updated subtitle field: max 150 chars')
          changed = true
        } else {
          console.log('subtitle field already has 150 char limit')
        }
      }
      
      return field
    }

    // tagline (fallback field name) - same treatment as subtitle
    if (field.id === 'tagline' && field.type === 'Symbol') {
      const existingValidations = field.validations || []
      const hasSizeValidation = existingValidations.some(v => v.size)
      
      if (!hasSizeValidation) {
        console.log('Adding character limit to tagline field: max 150 chars')
        field.validations = [
          ...existingValidations.filter(v => !v.size),
          { size: { max: 150 } }
        ]
        changed = true
      }
      
      return field
    }

    return field
  })

  if (changed) {
    const updated = await courseType.update()
    await updated.publish()
    console.log('\n✅ Course content type updated and published')
    console.log('   - subtitle: 150 character limit enforced')
  } else {
    console.log('\n✓ No changes needed - validations already in place')
  }
  
  console.log('\n📝 Note: aboutTheCourse (Rich Text) cannot have character limits.')
  console.log('   Please update the field name/description in Contentful UI to guide editors.')
}

main().catch((err) => {
  console.error('❌ Error:', err.message || err)
  process.exit(1)
})
