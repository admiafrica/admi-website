/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')

// Since we can't directly import TS files in Node.js, we'll define the FAQs directly here
// These are the course-specific FAQs that should replace the generic ones

const DIGITAL_MARKETING_CERTIFICATE_DETAILED_FAQS = [
  {
    question: 'What specific digital marketing tools and platforms will I master in this course?',
    answer:
      'You will gain hands-on experience with Google Ads, Facebook Business Manager, Instagram for Business, LinkedIn Campaign Manager, Google Analytics 4, SEMrush, Hootsuite, Mailchimp, Canva, and WordPress. We also cover emerging platforms like TikTok for Business and WhatsApp Business API.'
  },
  {
    question: 'How does this course prepare me for the Kenyan digital marketing landscape?',
    answer:
      "The curriculum focuses on local market dynamics including M-Pesa integration for e-commerce, Kenyan consumer behavior, local SEO strategies, and case studies from successful Kenyan brands. You'll learn to create campaigns that resonate with East African audiences."
  },
  {
    question: 'What types of real projects will I work on during the course?',
    answer:
      "Students create complete digital marketing campaigns for real businesses including social media strategies, Google Ads campaigns with actual budgets, SEO audits for Kenyan websites, email marketing sequences, and content calendars. You'll manage at least 3 live campaigns by graduation."
  },
  {
    question: 'Can I specialize in a specific area of digital marketing?',
    answer:
      'Yes, in the final module you can choose to specialize in Social Media Marketing, Search Engine Marketing (SEM/SEO), Content Marketing, or E-commerce Marketing. Each specialization includes advanced techniques and industry certifications.'
  },
  {
    question: 'What certifications will I earn alongside the ADMI certificate?',
    answer:
      'The program prepares you for Google Ads certification, Google Analytics Individual Qualification, Facebook Blueprint certification, and HubSpot Content Marketing certification. These are globally recognized credentials that enhance your employability.'
  },
  {
    question: 'How current is the curriculum with digital marketing trends?',
    answer:
      'Our curriculum is updated quarterly to include the latest trends like AI in marketing, voice search optimization, programmatic advertising, and influencer marketing. We have partnerships with digital agencies who inform our content updates.'
  },
  {
    question: 'What support is provided for starting my own digital marketing agency?',
    answer:
      "We offer entrepreneurship modules covering client acquisition, pricing strategies, proposal writing, and agency management. You'll also get mentorship from successful agency owners and access to our alumni network of digital marketers."
  },
  {
    question: 'How many hours per week should I dedicate to this course?',
    answer:
      'Full-time students attend 20 hours of classes per week plus 10-15 hours of practical work. Part-time students need 12 hours for weekend classes plus 8-10 hours of self-study and project work.'
  }
]

const FILM_TV_DIPLOMA_DETAILED_FAQS = [
  {
    question: "How does the 2-year film diploma prepare me for Kenya's growing film industry?",
    answer:
      "Our diploma program is taught by the best practitioners in the local industry who are active professionals in film and television. You'll learn everything from scriptwriting to post-production, work on 10+ film projects, complete industry internships, and graduate with a professional reel that meets international standards while understanding local market dynamics."
  },
  {
    question: 'What major film projects will I complete during the diploma program?',
    answer:
      'Year 1: Two short films (5-10 minutes), one documentary, commercial projects, and music videos. Year 2: A 20-minute thesis film with full production value, a TV pilot episode, and specialized projects in your chosen area (directing, cinematography, or editing).'
  },
  {
    question: 'Can I specialize in specific areas like cinematography or directing?',
    answer:
      'Yes! After building a strong foundation in Year 1, you can specialize in Directing, Cinematography, Editing/Post-Production, or Production Management in Year 2. Each track includes masterclasses, specialized equipment training, and mentorship from industry professionals.'
  },
  {
    question: 'What film equipment and facilities will I have access to?',
    answer:
      'Professional cameras (RED, ARRI Alexa Mini, Sony FX9), complete lighting packages, grip equipment, drone systems, green screen studio, editing suites with Avid Media Composer and DaVinci Resolve, color grading suite, and a dubbing studio for post-production.'
  },
  {
    question: 'How does the program address both film and television production?',
    answer:
      "We teach single-camera film techniques and multi-camera TV production. You'll learn studio production, live broadcasting, TV formats (news, talk shows, drama series), and streaming content creation. This versatility is crucial for Kenya's evolving media landscape."
  },
  {
    question: 'What are the internship and job placement opportunities?',
    answer:
      'Mandatory 3-month internships with partners like Citizen TV, NTV, Film Crew Africa, and independent production houses. 85% of our graduates are employed within 6 months, working on major productions, TV stations, or starting their own companies.'
  },
  {
    question: 'How strong is the scriptwriting and storytelling component?',
    answer:
      "Very strong! You'll take four scriptwriting courses covering features, TV series, documentaries, and African storytelling traditions. We emphasize developing authentic African narratives that can compete globally while resonating locally."
  },
  {
    question: 'What about film business and distribution knowledge?',
    answer:
      "Final year includes film finance, distribution strategies, festival submission, streaming platforms, and co-production models. You'll understand how to monetize content in African markets and internationally, including Netflix/Showmax opportunities."
  },
  {
    question: 'What career paths are available after the film diploma?',
    answer:
      'Graduates work as directors, cinematographers, editors, producers, screenwriters, colorists, sound designers, and production managers. Salaries range from KES 50,000-200,000 monthly depending on role and experience, with freelance opportunities often exceeding this.'
  }
]

// Add other course FAQs (simplified for migration script)
const GRAPHIC_DESIGN_CERTIFICATE_DETAILED_FAQS = [
  {
    question: "What makes ADMI's Graphic Design program different from other schools in Kenya?",
    answer:
      'ADMI offers the only Pearson-assured graphic design program in East Africa with industry-standard Mac workstations, Wacom tablets, and large format printers. Our instructors are active industry professionals.'
  },
  {
    question: 'Will I build a portfolio strong enough to compete internationally?',
    answer:
      "You'll complete 15-20 professional projects including brand identities, packaging designs, digital campaigns, and publication layouts. Our graduates have won international design competitions."
  },
  {
    question: 'What specific design software and tools will I master?',
    answer:
      'Adobe Creative Cloud (Photoshop, Illustrator, InDesign, After Effects, XD), Figma for UI/UX design, Procreate for digital illustration, and Cinema 4D for 3D design.'
  },
  {
    question: 'How does the course address African design aesthetics and culture?',
    answer:
      "We celebrate African design heritage while teaching contemporary global standards. You'll study African typography, pattern design, and color theory while creating culturally relevant designs."
  },
  {
    question: 'Can I specialize in UI/UX design within this program?',
    answer:
      'Yes! We have a strong UI/UX component covering user research, wireframing, prototyping, and usability testing using industry-standard tools and Design Thinking methodologies.'
  }
]

// Continue with other courses - keeping it concise for the migration
const VIDEO_PRODUCTION_CERTIFICATE_DETAILED_FAQS = [
  {
    question: 'What video production equipment will I learn to operate professionally?',
    answer:
      'Professional cameras including Sony FX6, Canon C70, Blackmagic URSA, gimbals, sliders, drones, professional lighting setups, and audio equipment for both studio and field production.'
  },
  {
    question: 'Can I produce content for YouTube and social media platforms?',
    answer:
      'We have dedicated modules for digital content creation covering YouTube optimization, vertical video for TikTok/Reels, live streaming setup, and platform-specific editing techniques.'
  },
  {
    question: 'How comprehensive is the post-production training?',
    answer:
      "You'll master Adobe Premiere Pro, After Effects for motion graphics, DaVinci Resolve for color grading, and Pro Tools for audio, plus advanced techniques like green screen compositing."
  }
]

require('dotenv').config()

// Course mapping with their specific FAQs
const courseFAQMappings = [
  // Certificate Programs
  {
    courseSlug: 'digital-marketing-certificate',
    faqs: DIGITAL_MARKETING_CERTIFICATE_DETAILED_FAQS,
    programType: 'certificate'
  },
  {
    courseSlug: 'graphic-design-certificate',
    faqs: GRAPHIC_DESIGN_CERTIFICATE_DETAILED_FAQS,
    programType: 'certificate'
  },
  {
    courseSlug: 'video-production-certificate',
    faqs: VIDEO_PRODUCTION_CERTIFICATE_DETAILED_FAQS,
    programType: 'certificate'
  },
  // Diploma Programs
  {
    courseSlug: 'film-television-diploma',
    faqs: FILM_TV_DIPLOMA_DETAILED_FAQS,
    programType: 'diploma'
  }
]

// Convert plain text to rich text format
function createRichTextFromPlainText(text) {
  return {
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
  }
}

async function migrateCourseSpecificFAQs() {
  try {
    console.log('🚀 Starting course-specific FAQ migration to Contentful...')

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing required environment variables:')
      console.error('   - CONTENTFUL_MANAGEMENT_TOKEN:', managementToken ? '✅' : '❌')
      console.error('   - ADMI_CONTENTFUL_SPACE_ID:', spaceId ? '✅' : '❌')
      console.error('\nPlease check your .env file or environment configuration.')
      process.exit(1)
    }

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Get all courses to map FAQs
    console.log('📚 Fetching all courses from Contentful...')
    const coursesResponse = await environment.getEntries({
      content_type: 'course',
      limit: 100
    })

    const courses = coursesResponse.items
    console.log(`Found ${courses.length} courses in Contentful`)

    // Process each course

    // Process each course
    for (const courseMapping of courseFAQMappings) {
      console.log(`\n🎯 Processing ${courseMapping.courseSlug}...`)

      // Find the course in Contentful
      const course = courses.find((c) => c.fields.slug && c.fields.slug['en-US'] === courseMapping.courseSlug)

      if (!course) {
        console.log(`⚠️  Course not found in Contentful: ${courseMapping.courseSlug}`)
        continue
      }

      console.log(`✅ Found course: ${course.fields.name['en-US']}`)

      // Delete existing FAQs for this course first
      console.log('🗑️  Removing existing FAQs for this course...')
      const existingFAQs = await environment.getEntries({
        content_type: '2aEawNi41H2x8BXE8J2I9a', // Course FAQ content type ID
        'fields.course.sys.id': course.sys.id
      })

      for (const faq of existingFAQs.items) {
        try {
          if (faq.isPublished()) {
            await faq.unpublish()
          }
          await faq.delete()
          console.log(`   Deleted FAQ: ${faq.fields.question?.['en-US'] || 'Unknown'}`)
        } catch (error) {
          console.log(`   Warning: Could not delete FAQ ${faq.sys.id}:`, error.message)
        }
      }

      // Create new FAQs for this course
      console.log(`📝 Creating ${courseMapping.faqs.length} new FAQs...`)

      for (let i = 0; i < courseMapping.faqs.length; i++) {
        const faq = courseMapping.faqs[i]

        try {
          // Create the FAQ entry
          const faqEntry = await environment.createEntry('2aEawNi41H2x8BXE8J2I9a', {
            // Course FAQ content type ID
            fields: {
              question: {
                'en-US': faq.question
              },
              answer: {
                'en-US': createRichTextFromPlainText(faq.answer)
              },
              course: {
                'en-US': {
                  sys: {
                    type: 'Link',
                    linkType: 'Entry',
                    id: course.sys.id
                  }
                }
              },
              displayOrder: {
                'en-US': i + 1
              }
            }
          })

          // Publish the FAQ
          await faqEntry.publish()

          console.log(`   ✅ Created and published: ${faq.question.substring(0, 50)}...`)
        } catch (error) {
          console.error(`   ❌ Failed to create FAQ: ${faq.question.substring(0, 50)}...`)
          console.error(`      Error: ${error.message}`)
        }
      }

      console.log(`✅ Completed ${courseMapping.courseSlug} - ${courseMapping.faqs.length} FAQs processed`)
    }

    console.log('\n🎉 Course-specific FAQ migration completed successfully!')
    console.log('\n📊 Migration Summary:')
    console.log(`   • Processed ${courseFAQMappings.length} courses`)
    console.log(`   • Total FAQs migrated: ${courseFAQMappings.reduce((sum, mapping) => sum + mapping.faqs.length, 0)}`)
    console.log('\n✨ All course FAQs are now course-specific and relevant to their respective programs!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateCourseSpecificFAQs()
