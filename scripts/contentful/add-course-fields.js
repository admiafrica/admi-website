#!/usr/bin/env node

/**
 * Add subtitle and intakeMonths fields to existing course content type.
 *
 * Usage:
 *   node -r dotenv/config scripts/contentful/add-course-fields.js
 */

const { getEnvironment } = require('./utils/contentful-helpers')

async function main() {
  const env = await getEnvironment()

  const courseType = await env.getContentType('course')
  const existingFieldIds = courseType.fields.map((f) => f.id)
  let changed = false

  if (!existingFieldIds.includes('subtitle')) {
    courseType.fields.push({
      id: 'subtitle',
      name: 'Hero Subtitle',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [{ size: { max: 250 } }]
    })
    changed = true
    console.log('Added: subtitle field')
  } else {
    console.log('Already exists: subtitle field')
  }

  if (!existingFieldIds.includes('intakeMonths')) {
    courseType.fields.push({
      id: 'intakeMonths',
      name: 'Intake Months',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [{ size: { max: 100 } }]
    })
    changed = true
    console.log('Added: intakeMonths field')
  } else {
    console.log('Already exists: intakeMonths field')
  }

  if (changed) {
    const updated = await courseType.update()
    await updated.publish()
    console.log('Course content type updated and published')
  } else {
    console.log('No changes needed')
  }

  // Show final count
  const types = await env.getContentTypes({ limit: 100 })
  console.log('\nFinal content type count:', types.total, '/ 25')
}

main().catch((err) => {
  console.error('Error:', err.message || err)
  process.exit(1)
})
