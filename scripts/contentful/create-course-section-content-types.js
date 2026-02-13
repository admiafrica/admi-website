#!/usr/bin/env node

/**
 * Create Course Section Content Types in Contentful
 *
 * This script creates content types for course-specific section data:
 * testimonials, mentors, facilities, leaders, industry quotes,
 * benefits, semesters, payment plans, careers, and alumni stories.
 *
 * It also adds subtitle and intakeMonths fields to the existing course content type.
 *
 * Usage:
 *   npm run contentful:create-course-sections
 *   or
 *   node -r dotenv/config scripts/contentful/create-course-section-content-types.js
 *
 * Required environment variables:
 *   - ADMI_CONTENTFUL_SPACE_ID
 *   - CONTENTFUL_MANAGEMENT_TOKEN
 *   - ADMI_CONTENTFUL_ENVIRONMENT (optional, defaults to 'master')
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing required environment variables:')
  if (!SPACE_ID) console.error('   - ADMI_CONTENTFUL_SPACE_ID')
  if (!MANAGEMENT_TOKEN) console.error('   - CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

// Course entry link validation - links to the 'course' content type
const courseLink = {
  id: 'course',
  name: 'Course',
  type: 'Link',
  linkType: 'Entry',
  required: true,
  localized: false,
  validations: [{ linkContentType: ['course'] }]
}

const assetLink = (id, name, required = false) => ({
  id,
  name,
  type: 'Link',
  linkType: 'Asset',
  required,
  localized: false,
  validations: [{ linkMimetypeGroup: ['image'] }]
})

const symbolField = (id, name, required = true, validations = []) => ({
  id,
  name,
  type: 'Symbol',
  required,
  localized: false,
  validations
})

const textField = (id, name, required = true) => ({
  id,
  name,
  type: 'Text',
  required,
  localized: false,
  validations: []
})

const integerField = (id, name, required = false) => ({
  id,
  name,
  type: 'Integer',
  required,
  localized: false,
  validations: []
})

const booleanField = (id, name, required = false) => ({
  id,
  name,
  type: 'Boolean',
  required,
  localized: false
})

const symbolArrayField = (id, name) => ({
  id,
  name,
  type: 'Array',
  required: false,
  localized: false,
  items: { type: 'Symbol', validations: [] }
})

// All content types to create
const CONTENT_TYPES = [
  {
    id: 'courseTestimonial',
    name: 'Course Testimonial',
    displayField: 'name',
    description: 'Student/alumni testimonial linked to a specific course',
    fields: [
      symbolField('name', 'Name'),
      symbolField('role', 'Role'),
      textField('quote', 'Quote'),
      assetLink('image', 'Image'),
      symbolField('videoUrl', 'Video URL', false),
      courseLink,
      integerField('displayOrder', 'Display Order')
    ]
  },
  {
    id: 'courseMentor',
    name: 'Course Mentor',
    displayField: 'name',
    description: 'Mentor/instructor linked to a specific course',
    fields: [
      symbolField('name', 'Name'),
      symbolField('role', 'Role'),
      symbolField('company', 'Company'),
      assetLink('image', 'Image'),
      textField('bio', 'Bio', false),
      courseLink,
      integerField('displayOrder', 'Display Order')
    ]
  },
  {
    id: 'courseFacility',
    name: 'Course Facility',
    displayField: 'name',
    description: 'Equipment/facility linked to a specific course',
    fields: [
      symbolField('name', 'Name'),
      textField('description', 'Description'),
      assetLink('image', 'Image'),
      courseLink
    ]
  },
  {
    id: 'courseLeader',
    name: 'Course Leader',
    displayField: 'name',
    description: 'Course leader/head of department for a specific course',
    fields: [
      symbolField('name', 'Name'),
      symbolField('role', 'Role'),
      textField('bio', 'Bio'),
      assetLink('image', 'Image'),
      textField('quote', 'Quote'),
      courseLink
    ]
  },
  {
    id: 'industryQuote',
    name: 'Industry Quote',
    displayField: 'author',
    description: 'Industry professional quote endorsing a specific course',
    fields: [
      textField('quote', 'Quote'),
      symbolField('author', 'Author'),
      symbolField('role', 'Role'),
      symbolField('company', 'Company'),
      assetLink('backgroundImage', 'Background Image'),
      courseLink
    ]
  },
  {
    id: 'courseBenefit',
    name: 'Course Benefit',
    displayField: 'title',
    description: 'Key benefit/feature of a specific course',
    fields: [
      symbolField('title', 'Title'),
      textField('description', 'Description'),
      symbolField('icon', 'Icon'),
      courseLink,
      integerField('displayOrder', 'Display Order')
    ]
  },
  {
    id: 'courseSemester',
    name: 'Course Semester',
    displayField: 'title',
    description: 'Semester/term in a course curriculum',
    fields: [
      symbolField('title', 'Title'),
      symbolArrayField('modules', 'Modules'),
      integerField('semesterNumber', 'Semester Number'),
      courseLink
    ]
  },
  {
    id: 'coursePaymentPlan',
    name: 'Course Payment Plan',
    displayField: 'title',
    description: 'Payment installment option for a course',
    fields: [
      symbolField('title', 'Title'),
      symbolField('price', 'Price'),
      symbolField('period', 'Period'),
      symbolArrayField('details', 'Details'),
      booleanField('isPopular', 'Is Popular'),
      symbolField('discount', 'Discount', false),
      courseLink
    ]
  },
  {
    id: 'courseCareer',
    name: 'Course Career',
    displayField: 'title',
    description: 'Career outcome/path from a specific course',
    fields: [
      symbolField('title', 'Title'),
      textField('description', 'Description'),
      symbolField('salary', 'Salary', false),
      courseLink,
      integerField('displayOrder', 'Display Order')
    ]
  },
  {
    id: 'courseAlumniStory',
    name: 'Course Alumni Story',
    displayField: 'name',
    description: 'Alumni success story linked to a specific course',
    fields: [
      symbolField('name', 'Name'),
      symbolField('role', 'Role'),
      symbolField('company', 'Company'),
      textField('story', 'Story'),
      assetLink('image', 'Image'),
      symbolField('graduationYear', 'Graduation Year'),
      courseLink
    ]
  }
]

async function createContentType(environment, config) {
  try {
    const existing = await environment.getContentType(config.id)
    console.log(`  Already exists: ${config.id}`)
    return existing
  } catch (error) {
    if (error.name === 'NotFound') {
      console.log(`  Creating: ${config.id}...`)
      const ct = await environment.createContentTypeWithId(config.id, {
        name: config.name,
        description: config.description,
        displayField: config.displayField,
        fields: config.fields
      })
      await ct.publish()
      console.log(`  Published: ${config.id}`)
      return ct
    }
    throw error
  }
}

async function addFieldsToCourseType(environment) {
  console.log('\nAdding fields to existing course content type...')
  try {
    const courseType = await environment.getContentType('course')
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
      console.log('  Added: subtitle field')
    } else {
      console.log('  Already exists: subtitle field')
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
      console.log('  Added: intakeMonths field')
    } else {
      console.log('  Already exists: intakeMonths field')
    }

    if (changed) {
      const updated = await courseType.update()
      await updated.publish()
      console.log('  Course content type updated and published')
    }
  } catch (error) {
    console.error('  Error updating course content type:', error.message)
  }
}

async function main() {
  console.log('Contentful Course Section Content Types Setup')
  console.log('==============================================')
  console.log(`Space: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT_ID}`)
  console.log('')

  try {
    const client = contentful.createClient({
      accessToken: MANAGEMENT_TOKEN
    })

    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    // Create all new content types
    console.log('Creating content types...')
    for (const config of CONTENT_TYPES) {
      await createContentType(environment, config)
    }

    // Add new fields to existing course content type
    await addFieldsToCourseType(environment)

    console.log('')
    console.log('Setup complete!')
    console.log('')
    console.log('Created content types:')
    CONTENT_TYPES.forEach((ct) => {
      console.log(`  - ${ct.id}: ${ct.name}`)
    })
    console.log('')
    console.log('Added fields to course:')
    console.log('  - subtitle: Hero subtitle text')
    console.log('  - intakeMonths: e.g. "Feb, May, Aug"')
    console.log('')
    console.log('You can now add course-specific content in Contentful!')
  } catch (error) {
    console.error('Error:', error.message || error)
    if (error.details?.errors) {
      console.error('Details:', JSON.stringify(error.details.errors, null, 2))
    }
    process.exit(1)
  }
}

main()
