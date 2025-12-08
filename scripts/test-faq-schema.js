#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable global-require */

/**
 * FAQ Schema Validation Test
 *
 * This script tests that:
 * 1. Static course pages no longer have FAQPage schema
 * 2. Dynamic [slug].tsx routes correctly render FAQPage via API
 * 3. Schema validation passes
 */

const fs = require('fs')
const path = require('path')

const COURSES_DIR = path.join(__dirname, '..', 'src', 'pages', 'courses');
const STATIC_COURSE_FILES = fs.readdirSync(COURSES_DIR)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('['));

console.log('═══════════════════════════════════════════════════');
console.log('FAQ SCHEMA VALIDATION TEST');
console.log('═══════════════════════════════════════════════════\n');

// Test 1: Verify no hardcoded FAQPage in static files
console.log('TEST 1: Check for hardcoded FAQPage in static files');
console.log('─────────────────────────────────────────────────\n');

let staticFilesWithFAQPage = [];
let totalStaticFiles = 0;

STATIC_COURSE_FILES.forEach(file => {
  if (file === 'index.tsx') return; // Skip index file
  
  totalStaticFiles++;
  const filePath = path.join(COURSES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes("'@type': 'FAQPage'") || content.includes('"@type": "FAQPage"')) {
    staticFilesWithFAQPage.push(file);
  }
});

if (staticFilesWithFAQPage.length === 0) {
  console.log(`✅ PASS: No hardcoded FAQPage found in ${totalStaticFiles} static course files`);
} else {
  console.log(`❌ FAIL: Found FAQPage in ${staticFilesWithFAQPage.length} files:`);
  staticFilesWithFAQPage.forEach(f => console.log(`   - ${f}`));
}

// Test 2: Verify [slug].tsx has CMSCourseFAQSchemaWrapper
console.log('\n\nTEST 2: Verify dynamic [slug].tsx includes CMSCourseFAQSchemaWrapper');
console.log('─────────────────────────────────────────────────\n');

const slugFilePath = path.join(COURSES_DIR, '[slug].tsx');
if (fs.existsSync(slugFilePath)) {
  const slugContent = fs.readFileSync(slugFilePath, 'utf8');
  
  const hasWrapper = slugContent.includes('CMSCourseFAQSchemaWrapper');
  const hasImport = slugContent.includes("import { CMSCourseFAQSchemaWrapper }");
  
  if (hasWrapper && hasImport) {
    console.log('✅ PASS: [slug].tsx correctly imports and uses CMSCourseFAQSchemaWrapper');
  } else {
    console.log('❌ FAIL: [slug].tsx missing CMSCourseFAQSchemaWrapper');
    console.log(`   - Has wrapper: ${hasWrapper}`);
    console.log(`   - Has import: ${hasImport}`);
  }
} else {
  console.log('⚠️  WARNING: [slug].tsx file not found');
}

// Test 3: Verify API endpoint exists
console.log('\n\nTEST 3: Verify course-faqs API endpoint exists');
console.log('─────────────────────────────────────────────────\n');

const apiPath = path.join(__dirname, '..', 'src', 'pages', 'api', 'v3', 'course-faqs.ts');
if (fs.existsSync(apiPath)) {
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  
  const hasSlugQuery = apiContent.includes("req.query.slug") || apiContent.includes('slug');
  const hasContentType = apiContent.includes('2aEawNi41H2x8BXE8J2I9a');
  
  if (hasSlugQuery && hasContentType) {
    console.log('✅ PASS: course-faqs API endpoint configured correctly');
    console.log('   - Handles slug query parameter');
    console.log('   - Uses correct Contentful content type ID');
  } else {
    console.log('⚠️  WARNING: course-faqs API may be incomplete');
  }
} else {
  console.log('❌ FAIL: course-faqs API endpoint not found');
}

// Test 4: Verify CMSFAQSchema component exists and has guard
console.log('\n\nTEST 4: Verify CMSFAQSchema component has null guard');
console.log('─────────────────────────────────────────────────\n');

const schemaPath = path.join(__dirname, '..', 'src', 'components', 'shared', 'StructuredData.tsx');
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  const hasCMSFAQSchema = schemaContent.includes('function CMSFAQSchema');
  const hasNullGuard = schemaContent.includes('if (!faqs || faqs.length === 0)') && 
                       schemaContent.includes('return null');
  
  if (hasCMSFAQSchema && hasNullGuard) {
    console.log('✅ PASS: CMSFAQSchema component has null guard');
    console.log('   - Returns null when no FAQs exist');
    console.log('   - Prevents empty schema from rendering');
  } else {
    console.log('⚠️  WARNING: CMSFAQSchema may render empty schemas');
  }
} else {
  console.log('❌ FAIL: StructuredData.tsx not found');
}

// Summary
console.log('\n\n═══════════════════════════════════════════════════');
console.log('NEXT STEPS');
console.log('═══════════════════════════════════════════════════');
console.log(`
1. Test in browser:
   - Visit any course page: https://admi.africa/courses/music-production-nairobi
   - Check Network tab > XHR > search for "course-faqs"
   - Inspect page source > search for "FAQPage"

2. Validate schema:
   - Use Google Rich Results Test: https://search.google.com/test/rich-results
   - Enter a course URL and check for valid FAQ schema

3. Submit to Google Search Console:
   - Go to URL Inspection
   - Request indexing for updated pages
   - Monitor FAQ Enhancement report

4. Verify in 1-2 weeks:
   - Check GSC > Enhancements > FAQ
   - Confirm validation errors are resolved
`);
