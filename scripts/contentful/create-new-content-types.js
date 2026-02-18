#!/usr/bin/env node

/**
 * Create new course-related content types in Contentful
 *
 * Creates:
 * 1. courseSemesters - Course curriculum breakdown by semester
 * 2. paymentPlans - Payment options and installment plans
 * 3. courseFacilities - Equipment and facilities showcases
 * 4. alumniStories - Success stories from graduates
 * 5. industryPartners - Companies and organizations partnerships
 * 6. industryQuote - Quotes from industry professionals
 * 7. coursePhotos - Photo gallery for courses
 * 8. careerOutcomes - Career statistics and outcomes
 *
 * Safe to run multiple times - will skip if content types already exist
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN environment variable is required')
  console.error('   Get it from: https://app.contentful.com/spaces/' + SPACE_ID + '/api/keys')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

/**
 * Check if content type exists
 */
async function contentTypeExists(contentTypeId) {
  try {
    await client.get(`/content_types/${contentTypeId}`)
    return true
  } catch (error) {
    if (error.response?.status === 404) {
      return false
    }
    throw error
  }
}

/**
 * Create content type
 */
async function createContentType(definition) {
  try {
    const response = await client.put(`/content_types/${definition.sys.id}`, definition)
    return response.data
  } catch (error) {
    console.error(`Error creating ${definition.sys.id}:`, error.response?.data || error.message)
    throw error
  }
}

/**
 * Publish content type
 */
async function publishContentType(contentTypeId, version) {
  try {
    const response = await client.put(
      `/content_types/${contentTypeId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error publishing ${contentTypeId}:`, error.response?.data || error.message)
    throw error
  }
}

/**
 * Content Type: courseSemesters
 * Purpose: Course curriculum breakdown by semester
 */
const courseSemesters = {
  sys: {
    id: 'courseSemesters'
  },
  name: 'Course Semesters',
  description: 'Semester-by-semester curriculum breakdown for courses',
  displayField: 'semesterName',
  fields: [
    {
      id: 'semesterName',
      name: 'Semester Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'semesterNumber',
      name: 'Semester Number',
      type: 'Integer',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'modules',
      name: 'Modules',
      type: 'Array',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'learningOutcomes',
      name: 'Learning Outcomes',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'relatedCourse',
      name: 'Related Course',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkContentType: ['course'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry'
    }
  ]
}

/**
 * Content Type: paymentPlans
 * Purpose: Payment options and installment plans
 */
const paymentPlans = {
  sys: {
    id: 'paymentPlans'
  },
  name: 'Payment Plans',
  description: 'Payment options and installment plans for courses',
  displayField: 'planName',
  fields: [
    {
      id: 'planName',
      name: 'Plan Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'planType',
      name: 'Plan Type',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Full Payment', 'Installments', 'Scholarship', 'Loan', 'Early Bird']
        }
      ],
      disabled: false,
      omitted: false
    },
    {
      id: 'totalAmount',
      name: 'Total Amount',
      type: 'Number',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'installmentCount',
      name: 'Number of Installments',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'installmentAmount',
      name: 'Installment Amount',
      type: 'Number',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'benefits',
      name: 'Benefits',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'eligibilityCriteria',
      name: 'Eligibility Criteria',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourses',
      name: 'Related Courses',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [{ linkContentType: ['course'] }],
        linkType: 'Entry'
      }
    }
  ]
}

/**
 * Content Type: courseFacilities
 * Purpose: Equipment and facilities showcases
 */
const courseFacilities = {
  sys: {
    id: 'courseFacilities'
  },
  name: 'Course Facilities',
  description: 'Equipment, studios, and facilities available for courses',
  displayField: 'facilityName',
  fields: [
    {
      id: 'facilityName',
      name: 'Facility Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'facilityType',
      name: 'Facility Type',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Studio', 'Lab', 'Equipment', 'Software', 'Library', 'Other']
        }
      ],
      disabled: false,
      omitted: false
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'specifications',
      name: 'Specifications',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourses',
      name: 'Related Courses',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [{ linkContentType: ['course'] }],
        linkType: 'Entry'
      }
    }
  ]
}

/**
 * Content Type: alumniStories
 * Purpose: Success stories from graduates
 */
const alumniStories = {
  sys: {
    id: 'alumniStories'
  },
  name: 'Alumni Stories',
  description: 'Success stories and career journeys of alumni',
  displayField: 'alumniName',
  fields: [
    {
      id: 'alumniName',
      name: 'Alumni Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'graduationYear',
      name: 'Graduation Year',
      type: 'Integer',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'currentRole',
      name: 'Current Role',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'company',
      name: 'Company',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'story',
      name: 'Story',
      type: 'Text',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    },
    {
      id: 'videoUrl',
      name: 'Video URL',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'achievements',
      name: 'Key Achievements',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'linkedInUrl',
      name: 'LinkedIn URL',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourse',
      name: 'Related Course',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkContentType: ['course'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry'
    }
  ]
}

/**
 * Content Type: industryPartners
 * Purpose: Companies and organizations partnerships
 */
const industryPartners = {
  sys: {
    id: 'industryPartners'
  },
  name: 'Industry Partners',
  description: 'Companies and organizations partnering with ADMI',
  displayField: 'companyName',
  fields: [
    {
      id: 'companyName',
      name: 'Company Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'partnershipType',
      name: 'Partnership Type',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Employer Partner', 'Equipment Sponsor', 'Guest Lecturer', 'Internship Provider', 'Project Partner']
        }
      ],
      disabled: false,
      omitted: false
    },
    {
      id: 'logo',
      name: 'Logo',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'websiteUrl',
      name: 'Website URL',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourses',
      name: 'Related Courses',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [{ linkContentType: ['course'] }],
        linkType: 'Entry'
      }
    }
  ]
}

/**
 * Content Type: industryQuote
 * Purpose: Quotes from industry professionals
 */
const industryQuote = {
  sys: {
    id: 'industryQuote'
  },
  name: 'Industry Quote',
  description: 'Quotes from industry professionals about courses or careers',
  displayField: 'personName',
  fields: [
    {
      id: 'personName',
      name: 'Person Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'personRole',
      name: 'Person Role',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'company',
      name: 'Company',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'quote',
      name: 'Quote',
      type: 'Text',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      localized: false,
      required: false,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourses',
      name: 'Related Courses',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [{ linkContentType: ['course'] }],
        linkType: 'Entry'
      }
    }
  ]
}

/**
 * Content Type: coursePhotos
 * Purpose: Photo galleries for courses
 */
const coursePhotos = {
  sys: {
    id: 'coursePhotos'
  },
  name: 'Course Photos',
  description: 'Photo galleries showcasing course activities and environment',
  displayField: 'title',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'photoCategory',
      name: 'Photo Category',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Studio', 'Classroom', 'Student Work', 'Events', 'Facilities', 'Campus Life']
        }
      ],
      disabled: false,
      omitted: false
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    },
    {
      id: 'caption',
      name: 'Caption',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourse',
      name: 'Related Course',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkContentType: ['course'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry'
    }
  ]
}

/**
 * Content Type: careerOutcomes
 * Purpose: Career statistics and outcomes for courses
 */
const careerOutcomes = {
  sys: {
    id: 'careerOutcomes'
  },
  name: 'Career Outcomes',
  description: 'Career statistics, employment rates, and outcomes data',
  displayField: 'outcomeName',
  fields: [
    {
      id: 'outcomeName',
      name: 'Outcome Name',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'employmentRate',
      name: 'Employment Rate (%)',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'averageSalary',
      name: 'Average Starting Salary',
      type: 'Number',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'topJobRoles',
      name: 'Top Job Roles',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'topEmployers',
      name: 'Top Employers',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Symbol',
        validations: []
      }
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'dataYear',
      name: 'Data Year',
      type: 'Integer',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false
    },
    {
      id: 'relatedCourse',
      name: 'Related Course',
      type: 'Link',
      localized: false,
      required: true,
      validations: [{ linkContentType: ['course'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry'
    }
  ]
}

/**
 * Create content type helper
 */
async function createContentTypeIfNotExists(definition, name) {
  console.log(`\n📦 Creating ${name}...`)

  const exists = await contentTypeExists(definition.sys.id)
  if (exists) {
    console.log(`   ⏭️  ${name} already exists - skipping`)
    return
  }

  const created = await createContentType(definition)
  await publishContentType(definition.sys.id, created.sys.version)
  console.log(`   ✅ ${name} created and published`)
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🏗️  Creating New Course Content Types')
  console.log(`📦 Space: ${SPACE_ID}`)
  console.log(`🌍 Environment: ${ENVIRONMENT}`)
  console.log('\n' + '='.repeat(80))

  try {
    // Priority 1: Essential for course pages
    await createContentTypeIfNotExists(courseSemesters, 'Course Semesters')
    await createContentTypeIfNotExists(paymentPlans, 'Payment Plans')
    await createContentTypeIfNotExists(courseFacilities, 'Course Facilities')
    await createContentTypeIfNotExists(alumniStories, 'Alumni Stories')

    // Priority 2: Important for credibility
    await createContentTypeIfNotExists(industryPartners, 'Industry Partners')
    await createContentTypeIfNotExists(industryQuote, 'Industry Quote')

    // Priority 3: Nice to have
    await createContentTypeIfNotExists(coursePhotos, 'Course Photos')
    await createContentTypeIfNotExists(careerOutcomes, 'Career Outcomes')

    console.log('\n' + '='.repeat(80))
    console.log('\n✅ All content types created successfully!')
    console.log('\n📝 Content team can now:')
    console.log('   1. Add semester-by-semester curriculum breakdown (courseSemesters)')
    console.log('   2. Configure payment plans and pricing options (paymentPlans)')
    console.log('   3. Showcase equipment and facilities (courseFacilities)')
    console.log('   4. Add alumni success stories (alumniStories)')
    console.log('   5. Add industry partner logos (industryPartners)')
    console.log('   6. Add industry expert quotes (industryQuote)')
    console.log('   7. Upload course photos (coursePhotos)')
    console.log('   8. Add career outcome data (careerOutcomes)')
    console.log('\n💡 Remember to link all entries to their related course(s)\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  }
}

main()
