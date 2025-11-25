/* Migrate Student Experience pages to Contentful v2 - WITH IMAGES & RICH TEXT
 *
 * This version supports:
 * - Hero images for pages
 * - Section images
 * - Rich text content (with formatting, links)
 * - Better extensibility from Contentful UI
 *
 * Requirements (env):
 * - CONTENTFUL_MANAGEMENT_TOKEN
 * - CONTENTFUL_SPACE_ID (or ADMI_CONTENTFUL_SPACE_ID)
 * - CONTENTFUL_ENVIRONMENT (or ADMI_CONTENTFUL_ENVIRONMENT) -> defaults to "staging"
 *
 * Run:
 *   node scripts/contentful/migrate-student-experience-v2.js
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { createClient } = require('contentful-management')
require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.ADMI_CONTENTFUL_SPACE_ID
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'staging'
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const locale = 'en-US'

if (!spaceId || !managementToken) {
  console.error('❌ Missing Contentful credentials. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN.')
  process.exit(1)
}

const richTextParagraph = (text) => ({
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: text,
          marks: [],
          data: {}
        }
      ]
    }
  ]
})

const richTextFromParagraphs = (paragraphs) => ({
  nodeType: 'document',
  data: {},
  content: paragraphs.map((text) => ({
    nodeType: 'paragraph',
    data: {},
    content: [
      {
        nodeType: 'text',
        value: text,
        marks: [],
        data: {}
      }
    ]
  }))
})

const pageDefinitions = [
  {
    slug: 'campus',
    seoTitle: 'Student Experience | Campus',
    seoDescription:
      "See how ADMI's campus is organized for creative students - from studios and labs to collaboration spaces and support services.",
    heroTitle: 'Campus Experience',
    heroKicker: 'Student Experience',
    intro:
      'Explore how our Nairobi campus is organized for creative work. Everything - from lecture rooms to production suites - is within reach so you can focus on learning, collaborating, and shipping projects.',
    quickLinks: [
      {
        title: 'Facilities',
        description: 'Classrooms, lounges, and creative spaces ready for daily coursework.',
        href: '/student-experience/campus/facilities'
      },
      {
        title: 'Studios',
        description: 'Audio and video studios you can book for productions.',
        href: '/student-experience/studios'
      },
      {
        title: 'Labs',
        description: 'Mac and PC labs with industry software and guided practice.',
        href: '/student-experience/campus/the-labs'
      },
      {
        title: 'Equipment',
        description: 'Camera, sound, and lighting gear supported by our technicians.',
        href: '/student-experience/equipment'
      }
    ],
    sections: [
      {
        title: 'A campus built for creatives',
        paragraphs: [
          "ADMI is based in Caxton House next to the GPO in Nairobi's CBD, keeping lectures, labs, studios, and support services within a short walk of each other.",
          'The layout keeps you close to faculty, technicians, and the equipment vault, making it easy to move from class to production work without leaving campus.'
        ]
      },
      {
        title: 'Where you will spend your time',
        paragraphs: [
          'Every program blends classroom learning with hands-on sessions. Use the guides below to see how each space is set up before you arrive.'
        ],
        bullets: [
          'Campus facilities - classrooms, lounges, and collaboration spaces that support daily study.',
          'Studios - fully treated audio and TV studios ready for production practice.',
          'Labs - Mac and PC setups with the software you will use on projects.',
          'Equipment vault - how to access cameras, audio kits, and lighting with technician support.'
        ]
      },
      {
        title: 'Getting support on campus',
        paragraphs: [
          'Technicians prep labs and studios ahead of your sessions, while program leads stay close by for reviews and feedback.',
          'Visit Student Support whenever you need scheduling help, wellbeing resources, or guidance on internships and career prep.'
        ]
      }
    ]
  },
  {
    slug: 'campus-facilities',
    seoTitle: 'Student Experience | Campus Facilities',
    seoDescription:
      'Explore ADMI campus facilities, from classrooms and collaboration spaces to studios, labs, and the on-site equipment vault.',
    heroTitle: 'Campus Facilities',
    heroKicker: 'Student Experience',
    intro:
      'Get familiar with the spaces you will use every week. Our Nairobi campus combines teaching rooms, production suites, and collaboration areas so you always have a place to plan, practice, and deliver your projects.',
    sections: [
      {
        title: 'Spaces that keep you creating',
        paragraphs: [
          'Every floor on campus is set up for hands-on practice. Labs, studios, and equipment storage sit close to classrooms so you can move quickly between instruction and production.',
          'You will find editing bays, rehearsal spaces, and collaboration areas near the tools you need so group projects stay on schedule.'
        ]
      },
      {
        title: 'Designed for collaboration',
        paragraphs: [
          'Programs are clustered so filmmakers, animators, designers, marketers, and audio engineers work near each other. It is easy to swap feedback, record together, and learn how different creative disciplines overlap.'
        ]
      },
      {
        title: 'Amenities that support your day',
        paragraphs: [
          'Breakout zones give teams space to plan before lab time, and lounges let you review edits or rehearse without fighting for a room.',
          'The campus support team and technicians are available during teaching hours to help troubleshoot equipment, room setups, and software questions.'
        ]
      }
    ]
  },
  {
    slug: 'campus-the-labs',
    seoTitle: 'Student Experience | Labs',
    seoDescription:
      'Preview ADMI Mac and PC labs, the software installed, and how supervised lab sessions help you finish projects on time.',
    heroTitle: 'The Labs',
    heroKicker: 'Student Experience',
    intro:
      'Explore the computer labs you will use for editing, grading, animation, design, and audio. Each workstation is equipped with industry software and supported by on-site technicians.',
    sections: [
      {
        title: 'Mac and PC labs with industry software',
        paragraphs: [
          'Each lab is set up with the software suites you need for editing, animation, design, sound, and grading. Workstations are maintained by technicians so you can jump straight into your project.',
          'You will practice on both Mac and PC so you are comfortable with the platforms used across creative studios.'
        ]
      },
      {
        title: 'Software you will learn on',
        paragraphs: ['Labs are loaded with the tools that match your coursework and production goals.'],
        bullets: [
          'Final Cut, Pro Tools, DaVinci Resolve, Adobe Premiere Pro, and the wider Adobe Creative Cloud.',
          'Autodesk tools and Avid Composer for animation, modeling, and post-production workflows.'
        ]
      },
      {
        title: 'Structured time for practice',
        paragraphs: [
          'Lab time is timetabled for classes and supervised sessions, with additional booking windows set aside for project work.',
          'Technicians stay close to help with software setup, exporting, media management, and troubleshooting so you do not lose time on technical issues.'
        ]
      }
    ]
  },
  {
    slug: 'studios',
    seoTitle: 'Student Experience | Studios',
    seoDescription:
      'Discover ADMI audio and TV studios, how to book them, and what support is available while you record, shoot, and mix.',
    heroTitle: 'Studios',
    heroKicker: 'Student Experience',
    intro:
      'Step inside the studios you will use for sound design, music production, podcasting, and broadcast shoots. Each space is engineered for professional workflows so you can focus on creative direction.',
    sections: [
      {
        title: 'Audio studios ready to record',
        paragraphs: [
          'Produce music, podcasts, and sound design projects in acoustically treated rooms. The vocal booth is sized for both solo artists and small ensembles, while the control room gives you a clean monitoring environment for mixing.',
          'You practice with the same workflows used in professional studios, from mic placement and routing to editing and mastering inside Pro Tools and Logic.'
        ]
      },
      {
        title: 'TV studio for multi-camera practice',
        paragraphs: [
          'Film interviews, shows, and live demonstrations on a tracking floor with a lighting grid. You will learn blocking, camera movement, lighting balance, and on-set communication while rotating through crew roles.',
          'Switch between studio and post-production quickly with labs and edit bays close by.'
        ]
      },
      {
        title: 'How bookings work',
        paragraphs: [
          'Studios are scheduled around class labs and productions. Technicians help you set up signal flow, lighting, and safety checks before you start recording.',
          'Plan your sessions early, share your shot list or session plan, and use rehearsal time to test ideas before final takes.'
        ],
        bullets: [
          'Staff support is available during booked sessions for troubleshooting and quick adjustments.',
          'Bring your storage and session templates so you can keep files organized when you move to the labs for edits.'
        ]
      }
    ]
  },
  {
    slug: 'equipment',
    seoTitle: 'Student Experience | Equipment',
    seoDescription:
      'Learn how ADMI students access industry cameras, audio kits, and lighting from the on-campus equipment vault with technician support.',
    heroTitle: 'Equipment Access',
    heroKicker: 'Student Experience',
    intro:
      'See how to access the cameras, sound kits, and lighting you will use from first-year exercises through advanced productions. The equipment vault sits on campus so you can book what you need and get hands-on guidance quickly.',
    sections: [
      {
        title: 'Professionally maintained gear',
        paragraphs: [
          'From your first semester you work with the same caliber of tools used on professional sets. Gear is stored and serviced on campus so you can focus on your shoot plan instead of logistics.',
          'Technicians guide you through setup and maintenance, making sure every camera, recorder, and light is ready before you head to location.'
        ]
      },
      {
        title: 'What you can check out',
        paragraphs: [
          'Our inventory covers the core tools you need for class projects, reels, and capstone productions.'
        ],
        bullets: [
          'HD and digital cinema camera kits with lens options, tripods, sliders, and stabilization accessories.',
          'Lighting, grip, and modifiers to control your look indoors or on location.',
          'Location sound kits, studio microphones, mixers, and monitoring for film and music projects.'
        ]
      },
      {
        title: 'How checkout works',
        paragraphs: [
          'Equipment is scheduled around coursework so every team has what they need for labs, assignments, and productions.',
          'Book early for larger shoots, confirm return times, and build your kit with a technician to make sure it matches your storyboard.'
        ],
        bullets: [
          'Training and refreshers are required before you take out new gear categories.',
          'On-campus pickup lets you test setups with staff support before leaving.'
        ]
      }
    ]
  }
]

const contentTypes = [
  {
    id: 'quickLinkCard',
    name: 'Quick Link Card',
    displayField: 'title',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'href', name: 'Href', type: 'Symbol', required: true },
      {
        id: 'icon',
        name: 'Icon',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      }
    ]
  },
  {
    id: 'studentExperienceSection',
    name: 'Student Experience Section',
    displayField: 'title',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      {
        id: 'content',
        name: 'Content',
        type: 'RichText',
        required: true,
        validations: [
          {
            enabledNodeTypes: [
              'heading-2',
              'heading-3',
              'paragraph',
              'unordered-list',
              'ordered-list',
              'blockquote',
              'hyperlink',
              'entry-hyperlink',
              'asset-hyperlink'
            ]
          }
        ]
      },
      {
        id: 'image',
        name: 'Image',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      },
      {
        id: 'imagePosition',
        name: 'Image Position',
        type: 'Symbol',
        validations: [{ in: ['left', 'right', 'top', 'bottom'] }]
      },
      {
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        validations: [{ in: ['white', 'gray', 'blue', 'dark'] }]
      }
    ]
  },
  {
    id: 'studentExperiencePage',
    name: 'Student Experience Page',
    displayField: 'slug',
    fields: [
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol', required: true },
      { id: 'seoDescription', name: 'SEO Description', type: 'Text', required: true },
      { id: 'heroTitle', name: 'Hero Title', type: 'Symbol', required: true },
      { id: 'heroKicker', name: 'Hero Kicker', type: 'Symbol' },
      { id: 'intro', name: 'Intro', type: 'RichText', required: true },
      {
        id: 'heroImage',
        name: 'Hero Image',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      },
      {
        id: 'quickLinks',
        name: 'Quick Links',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{ linkContentType: ['quickLinkCard'] }]
        }
      },
      {
        id: 'sections',
        name: 'Sections',
        type: 'Array',
        required: true,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [{ linkContentType: ['studentExperienceSection'] }]
        }
      }
    ]
  }
]

async function ensureContentType(environment, definition) {
  try {
    const existing = await environment.getContentType(definition.id)
    console.log(`✅ Content type "${definition.id}" already exists`)
    return existing
  } catch (err) {
    if (err.name === 'NotFound') {
      console.log(`➕ Creating content type "${definition.id}"`)
      const created = await environment.createContentTypeWithId(definition.id, {
        name: definition.name,
        displayField: definition.displayField,
        fields: definition.fields
      })
      await created.publish()
      console.log(`✅ Published content type "${definition.id}"`)
      return created
    }
    throw err
  }
}

async function ensureContentTypes(environment) {
  for (const ct of contentTypes) {
    await ensureContentType(environment, ct)
  }
}

async function findEntryBySlug(environment, contentType, slug) {
  const existing = await environment.getEntries({
    content_type: contentType,
    ['fields.slug']: slug,
    limit: 1
  })
  return existing.items[0]
}

async function createAndPublishEntry(environment, contentType, fields) {
  const entry = await environment.createEntry(contentType, { fields })
  const published = await entry.publish()
  return published
}

async function ensureQuickLink(environment, link) {
  const entry = await createAndPublishEntry(environment, 'quickLinkCard', {
    title: { [locale]: link.title },
    description: { [locale]: link.description },
    href: { [locale]: link.href }
  })
  return entry
}

async function ensureSection(environment, section) {
  // Build rich text content from paragraphs and bullets
  const contentNodes = []

  // Add paragraphs
  section.paragraphs.forEach((text) => {
    contentNodes.push({
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: text,
          marks: [],
          data: {}
        }
      ]
    })
  })

  // Add bullets as unordered list
  if (section.bullets && section.bullets.length) {
    contentNodes.push({
      nodeType: 'unordered-list',
      data: {},
      content: section.bullets.map((bullet) => ({
        nodeType: 'list-item',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: bullet,
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }))
    })
  }

  const fields = {
    title: { [locale]: section.title },
    content: {
      [locale]: {
        nodeType: 'document',
        data: {},
        content: contentNodes
      }
    }
  }

  const entry = await createAndPublishEntry(environment, 'studentExperienceSection', fields)
  return entry
}

async function ensurePage(environment, page) {
  const existing = await findEntryBySlug(environment, 'studentExperiencePage', page.slug)
  if (existing) {
    console.log(`✅ Page "${page.slug}" already exists (entryId: ${existing.sys.id})`)
    return existing
  }

  console.log(`➕ Creating page "${page.slug}"`)

  const quickLinkEntries = page.quickLinks
    ? await Promise.all(page.quickLinks.map((link) => ensureQuickLink(environment, link)))
    : []

  const sectionEntries = await Promise.all(page.sections.map((section) => ensureSection(environment, section)))

  const pageFields = {
    slug: { [locale]: page.slug },
    seoTitle: { [locale]: page.seoTitle },
    seoDescription: { [locale]: page.seoDescription },
    heroTitle: { [locale]: page.heroTitle },
    intro: { [locale]: richTextParagraph(page.intro) },
    sections: {
      [locale]: sectionEntries.map((entry) => ({
        sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id }
      }))
    }
  }

  if (page.heroKicker) {
    pageFields.heroKicker = { [locale]: page.heroKicker }
  }

  if (quickLinkEntries.length) {
    pageFields.quickLinks = {
      [locale]: quickLinkEntries.map((entry) => ({
        sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id }
      }))
    }
  }

  const created = await createAndPublishEntry(environment, 'studentExperiencePage', pageFields)
  console.log(`✅ Created page "${page.slug}" (entryId: ${created.sys.id})`)
  return created
}

async function main() {
  console.log(`🚀 Migrating Student Experience pages to Contentful v2 (env: ${environmentId})`)
  console.log('   ✨ This version supports images and rich text!\n')
  const client = createClient({ accessToken: managementToken })
  const space = await client.getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)

  await ensureContentTypes(environment)

  for (const page of pageDefinitions) {
    await ensurePage(environment, page)
  }

  console.log('\n🎉 Migration complete')
  console.log('\n💡 Next steps:')
  console.log('   1. Go to Contentful UI')
  console.log('   2. Add hero images to pages')
  console.log('   3. Add section images where needed')
  console.log('   4. Enhance content with rich text formatting')
}

main().catch((err) => {
  console.error('❌ Migration failed', err)
  process.exit(1)
})
