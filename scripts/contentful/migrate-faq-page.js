#!/usr/bin/env node

/**
 * Migrate FAQ Page to Contentful
 *
 * Creates `pageFaq` entries with category grouping.
 * Each FAQ is an individual entry with a category field.
 *
 * Usage:
 *   npm run contentful:migrate-faqs
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-faq-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'pageFaq'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Page FAQ',
  description: 'FAQ entries for the main FAQ page, grouped by category',
  displayField: 'question',
  fields: [
    {
      id: 'question',
      name: 'Question',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 300 } }]
    },
    {
      id: 'answer',
      name: 'Answer',
      type: 'Text',
      required: true,
      validations: [{ size: { max: 2000 } }]
    },
    {
      id: 'category',
      name: 'Category',
      type: 'Symbol',
      required: true,
      validations: [
        {
          in: ['General', 'Admissions', 'Fees & Payment', 'Student Life', 'Programmes']
        }
      ]
    },
    {
      id: 'sortOrder',
      name: 'Sort Order',
      type: 'Integer',
      required: false
    }
  ]
}

// ---------- Seed Data (mirrors current hardcoded data) ----------

const FAQ_DATA = {
  General: [
    {
      q: 'What is ADMI?',
      a: 'ADMI (Africa Digital Media Institute) is East Africa\u2019s leading creative media and technology institute. Founded in 2011, we offer accredited diploma programmes, professional certificates, and foundation certificates in film, animation, design, music production, gaming, and more.'
    },
    {
      q: 'Where is ADMI located?',
      a: 'Our campus is located at Caxton House, 3rd Floor, Kenyatta Avenue in Nairobi CBD, Kenya. We\u2019re right next to the General Post Office \u2014 very accessible by public transport.'
    },
    {
      q: 'Is ADMI accredited?',
      a: 'Yes. ADMI is registered with TVETA Kenya, offers EU-accredited credits through Woolf University (ECTS), and our professional certificates are Pearson BTEC certified.'
    },
    {
      q: 'What intakes are available?',
      a: 'We have three intake windows per year: January, May, and September. The next available intakes are May 2026 and September 2026.'
    }
  ],
  Admissions: [
    {
      q: 'What are the entry requirements?',
      a: 'Requirements vary by programme level. Diploma programmes generally require a KCSE certificate (C- and above) or equivalent. Professional certificates require at least a KCSE certificate. Foundation certificates are open to anyone 16+ with a passion for creative media.'
    },
    {
      q: 'How do I apply?',
      a: 'You can apply online through our website by visiting the Apply page, or by contacting our admissions team via WhatsApp at +254 741 132 751. The application process takes about 10 minutes.'
    },
    {
      q: 'Can international students apply?',
      a: 'Absolutely. We welcome students from across Africa and beyond. International students may need a student visa \u2014 our admissions team can guide you through the process and provide supporting documentation.'
    },
    {
      q: 'What documents do I need?',
      a: 'You\u2019ll need a copy of your national ID or passport, academic certificates (KCSE or equivalent), and a recent passport-size photo. Some programmes may also require a portfolio or creative work samples.'
    }
  ],
  'Fees & Payment': [
    {
      q: 'How much are the tuition fees?',
      a: 'Fees vary by programme. Diploma programmes start from KES 15,000/month (18 months), professional certificates from KES 8,500/month (6 months), and foundation certificates from KES 5,000/month (3 months). Visit our Financial Planning page for detailed breakdowns.'
    },
    {
      q: 'Are payment plans available?',
      a: 'Yes. We offer flexible monthly payment plans for all programmes. You can spread your fees across the duration of your programme with no interest or hidden charges.'
    },
    {
      q: 'Are there scholarships?',
      a: 'Yes, ADMI offers merit-based and need-based scholarships. We also partner with organisations like Google.org and GOYN for sponsored training opportunities. Contact admissions to learn about current scholarship windows.'
    },
    {
      q: 'What is the refund policy?',
      a: 'ADMI has a structured refund policy. Full refunds are available within the first week of classes. After that, refunds are prorated based on the time enrolled. Contact our finance team for specific details.'
    }
  ],
  'Student Life': [
    {
      q: 'What facilities does ADMI have?',
      a: 'Our campus features professional film and music studios, Mac and PC labs with industry-standard software, an equipment vault with cameras and audio gear, collaborative creative spaces, and a resource library.'
    },
    {
      q: 'Is there student support available?',
      a: 'Yes. ADMI provides academic advising, wellness resources, career coaching, accessibility services, and psycho-social support. We also have dedicated student support staff available during office hours.'
    },
    {
      q: 'Are there events and networking opportunities?',
      a: 'Regularly. We host student showcases, film screenings, hackathons, industry guest talks, and networking events that connect students with professionals in creative industries across Africa.'
    },
    {
      q: 'Does ADMI offer accommodation?',
      a: 'While ADMI doesn\u2019t have on-campus housing, we help students find affordable accommodation options near the campus. Our student support team can guide you through finding suitable housing in Nairobi.'
    }
  ],
  Programmes: [
    {
      q: 'What programmes does ADMI offer?',
      a: 'We offer diploma programmes (18 months) in Film Production, Music Production, and Animation; professional certificates (6 months) in Graphic Design, Digital Marketing, Sound Engineering, UI/UX Design, and more; plus foundation certificates (3 months) for beginners.'
    },
    {
      q: 'Is online learning available?',
      a: 'Yes. Many of our programmes include a hybrid delivery model combining on-campus studio sessions with online learning components. This provides flexibility while ensuring hands-on practical experience.'
    },
    {
      q: 'Do programmes include practical projects?',
      a: 'Absolutely. ADMI\u2019s learning model is project-based. Students work on real industry briefs, build portfolios, and complete capstone projects. Many students leave with professional-quality work they can show employers.'
    },
    {
      q: 'Can I transfer credits to other universities?',
      a: 'Our diploma programmes offer EU-accredited ECTS credits through Woolf University, which can be recognised by universities worldwide. Contact admissions for specific credit transfer guidance.'
    }
  ]
}

// ---------- Main ----------

async function main() {
  console.log('=== FAQ Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)

  // Seed all FAQ entries
  let sortOrder = 0
  for (const [category, items] of Object.entries(FAQ_DATA)) {
    for (const item of items) {
      sortOrder += 1
      await ensureEntry(
        CONTENT_TYPE_ID,
        localize({
          question: item.q,
          answer: item.a,
          category,
          sortOrder
        }),
        { uniqueField: 'question' }
      )
    }
  }

  console.log(`\nDone! ${sortOrder} FAQ entries created in Contentful.`)
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
