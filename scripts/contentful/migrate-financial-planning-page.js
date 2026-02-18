#!/usr/bin/env node

/**
 * Migrate Financial Planning Page to Contentful
 *
 * Creates the `financialPlanningPage` content type and seeds it with the
 * current hardcoded data from src/pages/financial-planning.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-financial-planning
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-financial-planning-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'financialPlanningPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Financial Planning Page',
  description: 'Singleton page content for the Financial Planning page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Fee cards (JSON array)
    {
      id: 'feeCards',
      name: 'Fee Structure Cards',
      type: 'Object',
      required: true
    },
    // Payment plans (JSON array)
    {
      id: 'paymentPlans',
      name: 'Payment Plans',
      type: 'Object',
      required: true
    },
    // Scholarships (JSON array with icon string IDs)
    {
      id: 'scholarships',
      name: 'Scholarships & Financial Aid',
      type: 'Object',
      required: true
    },
    // FAQ items (JSON array)
    {
      id: 'faqItems',
      name: 'FAQ Items',
      type: 'Object',
      required: true
    },
    // SEO
    {
      id: 'seoTitle',
      name: 'SEO Title',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 70 } }]
    },
    {
      id: 'seoDescription',
      name: 'SEO Description',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 160 } }]
    },
    {
      id: 'seoKeywords',
      name: 'SEO Keywords',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 300 } }]
    }
  ]
}

// ---------- Seed Data (mirrors current hardcoded data) ----------

const seedData = localize({
  internalName: 'Financial Planning Page',
  feeCards: [
    {
      title: 'Diploma Programmes',
      price: 'From KES 15,000/month',
      duration: '18 months',
      badge: 'EU-Accredited via Woolf',
      borderColor: '#BA2E36',
      features: [
        'Woolf University ECTS credits',
        'Full studio access',
        'Industry mentorship',
        'Portfolio development'
      ]
    },
    {
      title: 'Professional Certificates',
      price: 'From KES 8,500/month',
      duration: '6 months',
      badge: 'In-person / Online',
      borderColor: '#0A3D3D',
      features: [
        'Pearson BTEC certified',
        'Flexible scheduling',
        'Industry projects',
        'Career support'
      ]
    },
    {
      title: 'Foundation Certificates',
      price: 'From KES 5,000/month',
      duration: '3 months',
      badge: 'In-person \u00b7 ADMI Certified',
      borderColor: '#F76335',
      features: [
        'Beginner-friendly',
        'Hands-on training',
        'Portfolio starter',
        'Pathway to Professional'
      ]
    },
    {
      title: 'Bachelor\u2019s Programme',
      price: 'Contact for Pricing',
      duration: '1\u20132 years',
      badge: 'Rubika International',
      borderColor: '#1a1a4e',
      features: [
        'International degree',
        'Exchange opportunities',
        'Advanced specialisation',
        'Global network'
      ]
    }
  ],
  paymentPlans: [
    {
      title: 'Monthly Instalments',
      subtitle: 'From KES 5,000/mo',
      description:
        'Spread your fees across manageable monthly payments throughout each semester. Ideal for students who prefer predictable, smaller payments.',
      tag: 'Most Popular',
      tagColor: '#BA2E36'
    },
    {
      title: 'Per Semester',
      subtitle: 'Save 5%',
      description:
        'Pay your full semester fees upfront and enjoy a 5% discount. A great balance between savings and flexibility across the programme duration.',
      tag: null,
      tagColor: null
    },
    {
      title: 'Full Payment',
      subtitle: 'Save 10%',
      description:
        'Settle your entire programme fee at enrolment and receive the maximum 10% discount. Best for families and sponsors planning ahead.',
      tag: 'Best Value',
      tagColor: '#0A3D3D'
    }
  ],
  scholarships: [
    {
      title: 'Merit-Based Scholarships',
      description:
        'Outstanding academic achievers and creative talents can receive up to 50% tuition coverage. Awarded based on portfolio strength, academic results, and demonstrated creative excellence.',
      coverage: 'Up to 50% coverage',
      bgColor: '#FFF0F0',
      iconColor: '#BA2E36',
      icon: 'star'
    },
    {
      title: 'Need-Based Financial Aid',
      description:
        'ADMI is committed to making creative education accessible. Need-based aid is available for students who demonstrate financial need and a strong commitment to their creative career.',
      coverage: 'Assessed individually',
      bgColor: '#EEF9F7',
      iconColor: '#0A3D3D',
      icon: 'heart'
    },
    {
      title: 'Industry Partner Sponsorships',
      description:
        'Leading creative studios, agencies, and media companies sponsor talented students through ADMI partnership programmes. Includes mentorship and potential employment pathways.',
      coverage: 'Varies by partner',
      bgColor: '#FFF8F0',
      iconColor: '#F76335',
      icon: 'briefcase'
    }
  ],
  faqItems: [
    {
      q: 'What is included in the tuition fees?',
      a: 'Tuition fees cover all teaching and instruction, access to studio facilities and equipment, learning materials and software licences, portfolio development support, and career services. Some programmes may have additional costs for specialised materials or external certification fees, which are outlined in the programme-specific fee structure.'
    },
    {
      q: 'Can I switch payment plans during my programme?',
      a: 'Yes, you can request to change your payment plan at the start of a new semester. Simply contact the Finance Office at least two weeks before the semester begins. Note that switching from a discounted plan (semester or full payment) to monthly instalments will adjust your remaining balance accordingly.'
    },
    {
      q: 'Are there any hidden fees or additional costs?',
      a: 'ADMI is committed to full transparency. Your fee structure document outlines every cost associated with your programme. The only potential additional costs are for optional items such as personal equipment purchases, external exam registrations, or elective industry workshops. There are no hidden administrative or registration fees.'
    },
    {
      q: 'How do I apply for a scholarship?',
      a: 'Scholarship applications are submitted alongside your programme application. You will need to provide your academic transcripts, a personal statement, a creative portfolio (for merit-based awards), and financial documentation (for need-based aid). The admissions team reviews applications on a rolling basis, and successful candidates are notified within two weeks of submission.'
    },
    {
      q: 'What happens if I miss a payment?',
      a: 'If you anticipate difficulty making a payment, please contact the Finance Office as early as possible. ADMI offers a grace period and can work with you to arrange a revised payment schedule. Continued non-payment may result in a temporary hold on access to certain facilities until the account is brought up to date.'
    },
    {
      q: 'Is there a refund policy?',
      a: 'Yes. ADMI offers a structured refund policy. If you withdraw within the first two weeks of a semester, you are eligible for a full refund minus an administrative fee. Partial refunds are available for withdrawals within the first month. After the first month, fees are non-refundable. Full details are available in your enrolment agreement and the fee structure document.'
    }
  ],
  seoTitle: 'Financial Planning',
  seoDescription:
    'Transparent fee structures, flexible payment plans, and scholarship opportunities at ADMI. Download programme-specific fee guides and plan your investment in a creative career.',
  seoKeywords:
    'ADMI fees, tuition fees Kenya, creative education cost, ADMI scholarships, payment plans, financial aid, Woolf University fees, BTEC fees'
})

// ---------- Main ----------

async function main() {
  console.log('=== Financial Planning Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Financial Planning page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
