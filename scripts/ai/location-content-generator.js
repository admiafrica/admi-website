/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const fs = require('fs').promises
const path = require('path')

require('dotenv').config()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

// Location-specific data for Kenya
const LOCATIONS = {
  nairobi: {
    city: 'Nairobi',
    region: 'Central Kenya',
    transportHubs: ['CBD', 'Westlands', 'Karen', 'Eastlands', 'South B/C'],
    keyEmployers: ['Safaricom', 'Nation Media Group', 'Standard Group', 'Royal Media Services'],
    uniqueAdvantage: "Direct access to Kenya's largest creative job market",
    transportNote: 'Easy matatu and bus connections from all major estates'
  },
  mombasa: {
    city: 'Mombasa',
    region: 'Coast',
    transportHubs: ['Island', 'Nyali', 'Bamburi', 'Likoni', 'Changamwe'],
    keyEmployers: ['Tourism sector', 'Hospitality brands', 'Coastal media houses'],
    uniqueAdvantage: 'Growing demand for digital content in tourism industry',
    transportNote: 'Direct flights and SGR train service to Nairobi available daily'
  },
  kisumu: {
    city: 'Kisumu',
    region: 'Western Kenya',
    transportHubs: ['Milimani', 'Kondele', 'Mamboleo', 'Kibuye', 'Nyalenda'],
    keyEmployers: ['Lake Region media', 'Agricultural tech firms', 'International NGOs'],
    uniqueAdvantage: 'Emerging tech hub with less competition for creative roles',
    transportNote: 'Daily buses and flights connect Kisumu to Nairobi'
  },
  nakuru: {
    city: 'Nakuru',
    region: 'Rift Valley',
    transportHubs: ['Town Centre', 'Milimani', 'Section 58', 'Lanet', 'Free Area'],
    keyEmployers: ['Manufacturing companies', 'Agricultural firms', 'Tourism businesses'],
    uniqueAdvantage: 'Strategic location serving both Nairobi and Western Kenya markets',
    transportNote: 'Just 2 hours from Nairobi via highway, frequent shuttle services'
  },
  eldoret: {
    city: 'Eldoret',
    region: 'North Rift',
    transportHubs: ['Town Centre', 'Eldoret West', 'Kapsaret', 'Huruma', 'Langas'],
    keyEmployers: ['Agricultural technology', 'Sports organizations', 'Regional media'],
    uniqueAdvantage: 'Growing startup ecosystem with demand for digital skills',
    transportNote: 'Well-connected to Nairobi via road and air transport'
  }
}

// Course-specific prompts
const COURSE_CONTEXTS = {
  'digital-marketing': {
    skills: 'social media marketing, SEO/SEM, content marketing, analytics',
    industries: 'tech startups, e-commerce, corporate marketing departments',
    trends: 'AI-powered marketing, influencer marketing, video content'
  },
  'film-production': {
    skills: 'cinematography, editing, directing, production management',
    industries: 'film studios, TV stations, advertising agencies, content creators',
    trends: 'streaming content, documentary production, commercial video'
  },
  'graphic-design': {
    skills: 'brand design, UI/UX, print design, digital illustration',
    industries: 'advertising agencies, tech companies, media houses, freelance',
    trends: 'digital-first design, motion graphics, sustainable design'
  },
  'music-production': {
    skills: 'audio engineering, mixing, mastering, beat production',
    industries: 'recording studios, media houses, event companies, artists',
    trends: 'home studios, podcast production, live streaming audio'
  },
  animation: {
    skills: '2D/3D animation, motion graphics, VFX, character design',
    industries: 'animation studios, advertising, gaming, film production',
    trends: 'AR/VR content, animated marketing, educational content'
  },
  photography: {
    skills: 'commercial photography, editing, lighting, portrait/event photography',
    industries: 'media houses, events, fashion, real estate, tourism',
    trends: 'drone photography, social media content, virtual tours'
  },
  'web-development': {
    skills: 'front-end, back-end, full-stack, mobile development',
    industries: 'tech companies, startups, agencies, freelance',
    trends: 'AI integration, progressive web apps, no-code platforms'
  },
  'sound-engineering': {
    skills: 'live sound, studio recording, broadcast audio, sound design',
    industries: 'recording studios, broadcast media, event production',
    trends: 'immersive audio, podcast engineering, streaming quality'
  },
  'ui-ux-design': {
    skills: 'user research, wireframing, prototyping, interaction design',
    industries: 'tech companies, startups, agencies, fintech',
    trends: 'AI-assisted design, accessibility, mobile-first design'
  },
  'video-game-development': {
    skills: 'game design, Unity/Unreal, programming, 3D modeling',
    industries: 'gaming studios, educational tech, simulation companies',
    trends: 'mobile gaming, VR/AR games, indie game development'
  },
  'entertainment-business': {
    skills: 'event management, talent management, marketing, production',
    industries: 'entertainment companies, event agencies, media houses',
    trends: 'digital events, influencer management, content monetization'
  }
}

/**
 * Generate location-specific content for a course
 */
async function generateLocationContent(course, location) {
  const locationData = LOCATIONS[location]
  const courseContext = COURSE_CONTEXTS[course] || {}

  const prompt = `Generate UNIQUE location-specific content for ${course} course in ${locationData.city}, Kenya. Make each response different from other cities.

LOCATION CONTEXT:
- City: ${locationData.city}
- Region: ${locationData.region}
- Key areas: ${locationData.transportHubs.join(', ')}
- Major employers: ${locationData.keyEmployers.join(', ')}
- Unique advantage: ${locationData.uniqueAdvantage}
- Transport: ${locationData.transportNote}

COURSE CONTEXT:
- Skills: ${courseContext.skills || 'Industry-relevant skills'}
- Industries: ${courseContext.industries || 'Various creative industries'}
- Trends: ${courseContext.trends || 'Latest industry trends'}

Generate the following UNIQUE content (avoid generic statements):

1. LOCAL OPPORTUNITY (40-60 words):
Specific opportunities for ${course} in ${locationData.city}. Focus on what makes THIS city unique for this course.

2. TRANSPORT SOLUTION (20-30 words):
Practical travel arrangement for ${locationData.city} residents: "${locationData.transportNote}"

3. TWO LOCATION-SPECIFIC FAQs (make questions natural and answers specific):
Q1: Something specific about studying this course while living in ${locationData.city}
Q2: Something about local career opportunities or industry presence

4. LOCAL SUCCESS MENTION (20-25 words):
Mention success relevant to ${locationData.city} area (can reference the region or nearby opportunities).

Format as JSON with keys: localOpportunity, transportSolution, faqs (array with question/answer), localSuccess

IMPORTANT: Make content specific to ${locationData.city}, not generic. Reference actual local context.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a content writer for ADMI, creating location-specific landing page content. Be specific about the local market and opportunities. Keep content concise and conversion-focused.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' }
    })

    return JSON.parse(completion.choices[0].message.content)
  } catch (error) {
    console.error(`Error generating content for ${course} in ${location}:`, error)
    return null
  }
}

/**
 * Generate content for all course-location combinations
 */
async function generateAllLocationContent() {
  const courses = Object.keys(COURSE_CONTEXTS)
  const locations = Object.keys(LOCATIONS)
  const results = {}

  console.log('🚀 Starting location content generation...')
  console.log(`📍 Generating for ${courses.length} courses across ${locations.length} locations`)

  for (const course of courses) {
    results[course] = {}

    for (const location of locations) {
      console.log(`\n⏳ Generating: ${course} in ${location}...`)

      const content = await generateLocationContent(course, location)

      if (content) {
        results[course][location] = content
        console.log(`✅ Success: ${course} in ${location}`)

        // Save individual file
        const filename = `generated-location-content-${course}-${location}.json`
        await fs.writeFile(path.join(__dirname, filename), JSON.stringify(content, null, 2))
      } else {
        console.log(`❌ Failed: ${course} in ${location}`)
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // Save complete results
  await fs.writeFile(path.join(__dirname, 'generated-all-location-content.json'), JSON.stringify(results, null, 2))

  console.log('\n✅ Location content generation complete!')
  console.log(`📊 Generated ${Object.keys(results).length * locations.length} location pages`)

  return results
}

/**
 * Generate TypeScript component with location content
 */
async function generateLocationComponent(course, location, content) {
  const courseName = course
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const locationName = LOCATIONS[location].city

  const template = `import React from 'react'
import { Title, Text, Button, Grid, Card, List, Accordion } from '@mantine/core'
import { MainLayout } from '@/layouts/v3/MainLayout'
import PageSEO from '../../components/shared/v3/PageSEO'

const ${courseName.replace(/\s+/g, '')}${locationName}Page = () => {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '${courseName} Course in ${locationName}',
    description: '${content.marketInsight}',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute',
      sameAs: 'https://admi.africa'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'on-site',
      location: {
        '@type': 'Place',
        name: 'ADMI Nairobi Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 Kenyatta Avenue, 3rd Floor, Caxton House',
          addressLocality: 'Nairobi',
          addressCountry: 'Kenya'
        }
      }
    }
  }

  const locationFAQs = ${JSON.stringify(content.faqs, null, 4)}

  return (
    <MainLayout>
      <PageSEO
        title="${courseName} Course in ${locationName} - ADMI"
        description="Best ${courseName} course in ${locationName}, Kenya. ${content.marketInsight}"
        canonical="https://admi.africa/courses/${course}-${location}"
        keywords="${course.replace('-', ', ')}, ${location}, course, training, kenya, admi"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Title order={1} ta="center" mb="md">
          ${courseName} Course in ${locationName}
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          ${content.marketInsight}
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} mb="md">
                Why Study ${courseName} for ${locationName}?
              </Title>

              <Text mb="md">${content.marketInsight}</Text>

              <Title order={3} mb="sm">Easy Access from ${locationName}</Title>
              <Text mb="md">${content.transportation}</Text>

              <Text mb="md" c="dimmed">${content.successSnippet}</Text>

              <Card mt="md" shadow="sm" padding="md" radius="md" withBorder>
                <Text fw={500} mb="sm">
                  📚 Complete Course Information
                </Text>
                <Text size="sm" mb="md">
                  Get detailed curriculum, admission requirements, and enrollment information for our ${courseName} program.
                </Text>
                <Button component="a" href="/courses/${course}" variant="light" fullWidth>
                  View Full ${courseName} Course Details
                </Button>
              </Card>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              <Title order={3} mb="md">Frequently Asked Questions - ${locationName} Students</Title>
              <Accordion>
                {locationFAQs.map((faq, index) => (
                  <Accordion.Item key={index} value={\`faq-\${index}\`}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Quick Information</Title>
              <List spacing="sm" size="sm">
                <List.Item>📍 Study at ADMI Nairobi Campus</List.Item>
                <List.Item>🚌 Accessible from all parts of ${locationName}</List.Item>
                <List.Item>💼 ${LOCATIONS[location].averageSalaries[course] || 'Competitive salaries'}</List.Item>
                <List.Item>🎓 Industry-recognized certification</List.Item>
                <List.Item>👥 Network with ${locationName} professionals</List.Item>
                <List.Item>📈 Growing opportunities in ${LOCATIONS[location].region}</List.Item>
              </List>

              <Button
                component="a"
                href="/enquiry"
                variant="filled"
                color="orange"
                fullWidth
                mt="md"
                size="lg"
              >
                Apply Now
              </Button>

              <Button
                component="a"
                href="/student-support#fees"
                variant="outline"
                fullWidth
                mt="sm"
              >
                View Fees & Payment Plans
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </MainLayout>
  )
}

export default ${courseName.replace(/\s+/g, '')}${locationName}Page
`

  return template
}

// Main execution
if (require.main === module) {
  generateAllLocationContent()
    .then(() => console.log('✅ All location content generated successfully!'))
    .catch((error) => console.error('❌ Error:', error))
}

module.exports = {
  generateLocationContent,
  generateAllLocationContent,
  generateLocationComponent,
  LOCATIONS,
  COURSE_CONTEXTS
}
