/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs').promises
const path = require('path')

/**
 * Update existing location landing pages with AI-generated content
 */
async function updateLocationPage(course, location, content) {
  const locationName = location.charAt(0).toUpperCase() + location.slice(1)

  const pagePath = path.join(__dirname, '../../src/pages/courses', `${course}-${location}.tsx`)

  try {
    // Read existing page
    const existingContent = await fs.readFile(pagePath, 'utf8')

    // Extract the enhanced content sections
    const localOpportunity = content.localOpportunity || 'Professional training opportunities available in this region.'
    const transportSolution = content.transportSolution || 'Convenient access to ADMI Nairobi campus.'
    const faqs = content.faqs || []
    const localSuccess = content.localSuccess || 'Local graduates finding success in their careers.'

    // Create FAQ accordion section
    const faqSection =
      faqs.length > 0
        ? `
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">Frequently Asked Questions - ${locationName} Students</Title>
              <Accordion>
                ${faqs
                  .map(
                    (faq, index) => `
                <Accordion.Item key={${index}} value={\`faq-${index}\`}>
                  <Accordion.Control>${faq.question}</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">${faq.answer}</Text>
                  </Accordion.Panel>
                </Accordion.Item>`
                  )
                  .join('')}
              </Accordion>
            </Card>`
        : ''

    // Update the page content
    let updatedContent = existingContent

    // Update imports to include Accordion
    updatedContent = updatedContent.replace(
      'import { Title, Text, Button, Grid, Card, List }',
      'import { Title, Text, Button, Grid, Card, List, Accordion }'
    )

    // Remove population stats
    updatedContent = updatedContent.replace(/<Text mb="sm">\s*<strong>Population:<\/strong>.*?<\/Text>\s*/g, '')

    // Clean up location field
    updatedContent = updatedContent.replace(
      /<strong>Location:<\/strong> [^<]*<\/Text>/,
      `<strong>Location:</strong> ${locationName} Campus (Central Location)</Text>`
    )

    // Update the main description
    updatedContent = updatedContent.replace(
      /Professional .* training in .* with industry experts and guaranteed job placement support/,
      localOpportunity
    )

    // Update the "Why Choose" section content
    const whyChoosePattern =
      /(<Title order={2} mb="md">\s*Why Choose.*?<\/Title>\s*)(.*?)(<List spacing="sm" size="sm">)/s
    updatedContent = updatedContent.replace(
      whyChoosePattern,
      `$1
              <Text mb="md">${localOpportunity}</Text>
              
              <Title order={3} mb="sm">Easy Access from ${locationName}</Title>
              <Text mb="md">${transportSolution}</Text>
              
              <Text size="sm" c="dimmed" mb="md">💫 ${localSuccess}</Text>
              $3`
    )

    // Add FAQ section before the closing Grid.Col
    const gridColPattern = /(.*<\/Card>\s*)(<\/Grid\.Col>\s*<Grid\.Col span=)/s
    if (faqSection && gridColPattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        gridColPattern,
        `$1${faqSection}
          $2`
      )
    }

    // Write updated content
    await fs.writeFile(pagePath, updatedContent)

    console.log(`✅ Updated: ${course}-${location}.tsx`)
    return true
  } catch (error) {
    console.error(`❌ Error updating ${course}-${location}.tsx:`, error.message)
    return false
  }
}

/**
 * Update all pages with available AI-generated content
 */
async function updateAllPages() {
  const scriptDir = __dirname
  const files = await fs.readdir(scriptDir)

  // Find all generated content files
  const contentFiles = files.filter(
    (file) => file.startsWith('generated-location-content-') && file.endsWith('.json') && !file.includes('batch')
  )

  console.log(`🔄 Found ${contentFiles.length} generated content files`)

  let successCount = 0
  let errorCount = 0

  for (const file of contentFiles) {
    // Parse filename to get course and location
    const match = file.match(/generated-location-content-(.+)-(.+)\.json/)
    if (!match) continue

    const [, course, location] = match

    try {
      // Read the generated content
      const contentPath = path.join(scriptDir, file)
      const contentData = JSON.parse(await fs.readFile(contentPath, 'utf8'))

      // Update the page
      const success = await updateLocationPage(course, location, contentData)

      if (success) {
        successCount++
      } else {
        errorCount++
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message)
      errorCount++
    }
  }

  console.log('\n📊 Update Summary:')
  console.log(`✅ Successfully updated: ${successCount} pages`)
  console.log(`❌ Errors: ${errorCount} pages`)
  console.log(`📈 Total processed: ${successCount + errorCount} pages`)
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    updateAllPages().catch(console.error)
  } else if (args.length === 2) {
    // Update single page
    const [course, location] = args

    // Load content from file
    const contentFile = path.join(__dirname, `generated-location-content-${course}-${location}.json`)

    fs.readFile(contentFile, 'utf8')
      .then((data) => JSON.parse(data))
      .then((content) => updateLocationPage(course, location, content))
      .then((success) => {
        if (success) {
          console.log(`✅ Successfully updated ${course}-${location}`)
        } else {
          console.log(`❌ Failed to update ${course}-${location}`)
        }
      })
      .catch((error) => console.error('❌ Error:', error.message))
  } else {
    console.log('Usage:')
    console.log('  node update-location-pages.js                    # Update all pages')
    console.log('  node update-location-pages.js <course> <location>  # Update single page')
  }
}

module.exports = { updateLocationPage, updateAllPages }
