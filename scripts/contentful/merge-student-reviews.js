#!/usr/bin/env node
/**
 * Merge studentReview entries into testimonial content type
 * 
 * This script:
 * 1. Adds testimonialType field to testimonial (student, alumni, parent, employer, industry_partner, staff)
 * 2. Migrates studentReview entries to testimonial with type="alumni"
 * 3. Deletes studentReview entries and content type
 * 
 * Field mapping:
 * - studentReview.description → testimonial.testimonial (RichText)
 * - studentReview.authorName → testimonial.fullName (Symbol)
 * - studentReview.authorRole → testimonial.role (Symbol)
 * - studentReview.authorImage → testimonial.image (Link)
 * - studentReview.relatedCourses → testimonial.relatedCourses (Array)
 * - NEW: testimonialType = "alumni" (for migrated entries)
 * 
 * Usage: node scripts/contentful/merge-student-reviews.js [--dry-run]
 */

require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing required environment variables:')
  console.error('  - ADMI_CONTENTFUL_SPACE_ID')
  console.error('  - CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

const deliveryApi = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`,
  params: { access_token: ACCESS_TOKEN }
})

const managementApi = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }
})

async function addTestimonialTypeField() {
  console.log('📝 Adding testimonialType field to testimonial content type...')
  
  try {
    const ct = await managementApi.get('/content_types/testimonial')
    const fields = ct.data.fields
    const version = ct.data.sys.version
    
    // Check if field already exists
    if (fields.some(f => f.id === 'testimonialType')) {
      console.log('   ✅ testimonialType field already exists')
      return true
    }
    
    // Add testimonialType field
    fields.push({
      id: 'testimonialType',
      name: 'Testimonial Type',
      type: 'Symbol',
      required: false,
      validations: [{
        in: ['student', 'alumni', 'parent', 'employer', 'industry_partner', 'staff']
      }]
    })
    
    // Update content type
    const updateRes = await managementApi.put('/content_types/testimonial', 
      { name: ct.data.name, description: ct.data.description, displayField: ct.data.displayField, fields },
      { headers: { 'X-Contentful-Version': version } }
    )
    
    // Publish
    await managementApi.put('/content_types/testimonial/published', null, {
      headers: { 'X-Contentful-Version': updateRes.data.sys.version }
    })
    
    console.log('   ✅ Added testimonialType field with options:')
    console.log('      student, alumni, parent, employer, industry_partner, staff')
    return true
  } catch (error) {
    console.error('   ❌ Failed to add field:', error.response?.data?.message || error.message)
    return false
  }
}

async function getStudentReviews() {
  console.log('📥 Fetching studentReview entries...')
  const response = await deliveryApi.get('/entries', {
    params: {
      content_type: 'studentReview',
      limit: 100,
      include: 2
    }
  })
  console.log(`   Found ${response.data.total} studentReview entries`)
  return response.data.items
}

async function createTestimonialEntry(review) {
  const fields = review.fields
  
  // Map studentReview fields to testimonial fields
  const testimonialFields = {
    fullName: { 'en-US': fields.authorName || 'Unknown' },
    testimonial: { 'en-US': fields.description || { nodeType: 'document', content: [], data: {} } },
    role: { 'en-US': fields.authorRole || 'Student' },
    testimonialType: { 'en-US': 'alumni' }, // Mark migrated reviews as alumni
  }
  
  // Map image if present
  if (fields.authorImage) {
    testimonialFields.image = { 
      'en-US': { 
        sys: { 
          type: 'Link', 
          linkType: 'Asset', 
          id: fields.authorImage.sys.id 
        } 
      } 
    }
  }
  
  // Map relatedCourses if present
  if (fields.relatedCourses?.length > 0) {
    testimonialFields.relatedCourses = {
      'en-US': fields.relatedCourses.map(course => ({
        sys: { type: 'Link', linkType: 'Entry', id: course.sys.id }
      }))
    }
  }
  
  console.log(`   Creating testimonial for: ${fields.authorName} (type: alumni)`)
  
  try {
    // Create entry
    const createResponse = await managementApi.post('/entries', 
      { fields: testimonialFields },
      { headers: { 'X-Contentful-Content-Type': 'testimonial' } }
    )
    
    const entryId = createResponse.data.sys.id
    const version = createResponse.data.sys.version
    
    // Publish entry
    await managementApi.put(
      `/entries/${entryId}/published`,
      null,
      { headers: { 'X-Contentful-Version': version } }
    )
    
    console.log(`   ✅ Published testimonial: ${entryId}`)
    return { success: true, id: entryId, name: fields.authorName }
  } catch (error) {
    console.error(`   ❌ Failed for ${fields.authorName}:`, error.response?.data?.message || error.message)
    return { success: false, name: fields.authorName, error: error.response?.data }
  }
}

async function deleteStudentReviewEntry(entryId, name) {
  try {
    // First unpublish
    const entry = await managementApi.get(`/entries/${entryId}`)
    if (entry.data.sys.publishedVersion) {
      await managementApi.delete(`/entries/${entryId}/published`)
    }
    
    // Then delete
    const updated = await managementApi.get(`/entries/${entryId}`)
    await managementApi.delete(`/entries/${entryId}`, {
      headers: { 'X-Contentful-Version': updated.data.sys.version }
    })
    
    console.log(`   🗑️  Deleted studentReview: ${name}`)
    return true
  } catch (error) {
    console.error(`   ❌ Failed to delete ${name}:`, error.response?.data?.message || error.message)
    return false
  }
}

async function deleteContentType(contentTypeId) {
  console.log(`\n🗑️  Deleting content type: ${contentTypeId}...`)
  try {
    // Get current version
    const ct = await managementApi.get(`/content_types/${contentTypeId}`)
    
    // Unpublish if published
    if (ct.data.sys.publishedVersion) {
      await managementApi.delete(`/content_types/${contentTypeId}/published`)
    }
    
    // Delete
    const updated = await managementApi.get(`/content_types/${contentTypeId}`)
    await managementApi.delete(`/content_types/${contentTypeId}`, {
      headers: { 'X-Contentful-Version': updated.data.sys.version }
    })
    
    console.log(`   ✅ Content type ${contentTypeId} deleted successfully`)
    return true
  } catch (error) {
    console.error(`   ❌ Failed to delete content type:`, error.response?.data?.message || error.message)
    return false
  }
}

async function main() {
  console.log('🔄 Student Review → Testimonial Migration\n')
  console.log('This script will:')
  console.log('  1. Add testimonialType field to testimonial content type')
  console.log('  2. Migrate studentReview entries to testimonial (as type: alumni)')
  console.log('  3. Delete the original studentReview entries')
  console.log('  4. Delete the studentReview content type\n')
  
  const dryRun = process.argv.includes('--dry-run')
  if (dryRun) {
    console.log('🧪 DRY RUN MODE - No changes will be made\n')
  }
  
  try {
    // Step 0: Add testimonialType field to testimonial content type
    if (!dryRun) {
      const fieldAdded = await addTestimonialTypeField()
      if (!fieldAdded) {
        console.log('⚠️  Could not add testimonialType field. Continuing anyway...')
      }
    } else {
      console.log('📝 Would add testimonialType field to testimonial content type')
    }
    
    // Step 1: Fetch all studentReview entries
    const reviews = await getStudentReviews()
    
    if (reviews.length === 0) {
      console.log('\n✅ No studentReview entries to migrate')
      return
    }
    
    // Step 2: Create testimonial entries for each
    console.log('\n📝 Creating testimonial entries...')
    const results = []
    for (const review of reviews) {
      if (dryRun) {
        console.log(`   Would create testimonial for: ${review.fields.authorName}`)
        results.push({ success: true, name: review.fields.authorName })
      } else {
        const result = await createTestimonialEntry(review)
        results.push(result)
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500))
      }
    }
    
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)
    
    console.log(`\n📊 Migration Results:`)
    console.log(`   ✅ Successful: ${successful.length}`)
    console.log(`   ❌ Failed: ${failed.length}`)
    
    if (failed.length > 0) {
      console.log('\n⚠️  Some migrations failed. Aborting deletion step.')
      console.log('   Fix the failures and re-run, or manually clean up.')
      return
    }
    
    // Step 3: Delete original studentReview entries
    if (!dryRun) {
      console.log('\n🗑️  Deleting original studentReview entries...')
      for (const review of reviews) {
        await deleteStudentReviewEntry(review.sys.id, review.fields.authorName)
        await new Promise(r => setTimeout(r, 500))
      }
    } else {
      console.log('\n🗑️  Would delete original studentReview entries')
    }
    
    // Step 4: Delete the studentReview content type
    if (!dryRun) {
      const deleted = await deleteContentType('studentReview')
      if (deleted) {
        console.log('\n🎉 Migration complete! studentReview content type has been removed.')
        console.log('   You now have one free content type slot.')
      }
    } else {
      console.log('\n🗑️  Would delete studentReview content type')
    }
    
    console.log('\n📝 Next steps:')
    console.log('   1. Update code to remove studentReview references')
    console.log('   2. Run the learningOutcomes migration')
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    if (error.response?.data) {
      console.error('   API Error:', JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

main()
