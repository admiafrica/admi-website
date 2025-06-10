/**
 * Local Schema Testing Script
 * Run this in browser console to extract and validate schema markup
 */

// Extract all JSON-LD schema from the page
function extractSchema() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  const schemas = []

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.innerHTML)
      schemas.push({
        id: script.id || `schema-${index}`,
        type: data['@type'],
        data: data
      })
    } catch (error) {
      console.error(`Error parsing schema ${index}:`, error)
    }
  })

  return schemas
}

// Validate Course schema specifically
function validateCourseSchema() {
  const schemas = extractSchema()
  const courseSchemas = schemas.filter((s) => s.type === 'Course')

  console.log('🔍 Found Course Schemas:', courseSchemas.length)

  courseSchemas.forEach((schema, index) => {
    console.log(`\n📚 Course Schema ${index + 1}:`)
    console.log('✅ Valid properties:', Object.keys(schema.data))

    // Check for removed properties
    const removedProps = ['creditHours', 'instructor']
    const foundRemoved = removedProps.filter((prop) => schema.data.hasOwnProperty(prop))

    if (foundRemoved.length > 0) {
      console.error('❌ Found removed properties:', foundRemoved)
    } else {
      console.log('✅ No invalid properties found')
    }

    // Check required properties
    const required = ['@context', '@type', 'name', 'description', 'provider']
    const missing = required.filter((prop) => !schema.data.hasOwnProperty(prop))

    if (missing.length > 0) {
      console.error('❌ Missing required properties:', missing)
    } else {
      console.log('✅ All required properties present')
    }

    // Check CourseInstance
    if (schema.data.hasCourseInstance) {
      const instance = schema.data.hasCourseInstance
      if (instance.instructor) {
        console.error('❌ CourseInstance has invalid instructor property')
      } else {
        console.log('✅ CourseInstance is clean')
      }
    }

    console.log('📋 Full schema:', schema.data)
  })
}

// Pretty print all schemas
function printAllSchemas() {
  const schemas = extractSchema()
  console.log('🎯 All Schema Markup on Page:')
  schemas.forEach((schema, index) => {
    console.log(`\n${index + 1}. ${schema.type} (${schema.id})`)
    console.log(JSON.stringify(schema.data, null, 2))
  })
}

// Run validation
console.log('🚀 Starting Schema Validation...')
validateCourseSchema()

// Export functions for manual use
window.schemaTest = {
  extract: extractSchema,
  validate: validateCourseSchema,
  printAll: printAllSchemas
}

console.log('\n💡 Available commands:')
console.log('- schemaTest.extract() - Extract all schemas')
console.log('- schemaTest.validate() - Validate Course schemas')
console.log('- schemaTest.printAll() - Print all schemas')
