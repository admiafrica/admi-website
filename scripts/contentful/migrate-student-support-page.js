#!/usr/bin/env node

/**
 * Migrate Student Support Page to Contentful
 *
 * Creates the `studentSupportPage` content type and seeds it with the
 * current hardcoded data from src/pages/student-support.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-student-support
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-student-support-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'studentSupportPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Student Support Page',
  description: 'Singleton page content for the student support page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Support Tabs (JSON array of complex nested objects with icon strings)
    {
      id: 'supportTabs',
      name: 'Support Tabs',
      type: 'Object',
      required: true
    },
    // Fee Cards (JSON array)
    {
      id: 'feeCards',
      name: 'Fee Cards',
      type: 'Object',
      required: true
    },
    // Help Desks (JSON array)
    {
      id: 'helpDesks',
      name: 'Help Desks',
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
    }
  ]
}

// ---------- Seed Data (mirrors current hardcoded data) ----------

const seedData = localize({
  internalName: 'Student Support Page',
  supportTabs: [
    {
      key: 'academic',
      label: 'Academic',
      icon: 'school',
      color: '#0A3D3D',
      title: 'Academic Advising',
      desc: 'Advisors help plan online and on-campus modules, deadlines, and interventions.',
      cards: [
        { title: 'Module Planning', desc: 'Get personalised guidance on selecting modules that align with your goals.' },
        { title: 'Progress Tracking', desc: 'Regular check-ins to monitor your academic progress and address challenges early.' },
        { title: 'Study Skills', desc: 'Workshops on time management, note-taking, research methods, and exam prep.' }
      ]
    },
    {
      key: 'wellness',
      label: 'Wellness',
      icon: 'heart-handshake',
      color: '#BA2E36',
      title: 'Wellness Support',
      desc: 'Counselling and wellbeing support available virtually and on campus.',
      cards: [
        { title: 'Counselling', desc: 'Private sessions with certified counsellors for personal and academic challenges.' },
        { title: 'Peer Support', desc: 'Student-led support groups and mentoring programmes for community wellbeing.' },
        { title: 'Crisis Support', desc: 'Immediate support and referral pathways for urgent wellbeing concerns.' }
      ]
    },
    {
      key: 'career',
      label: 'Career',
      icon: 'briefcase',
      color: '#F76335',
      title: 'Career Services',
      desc: 'Career coaching across virtual sessions, portfolio reviews, and campus showcases.',
      cards: [
        { title: 'Portfolio Reviews', desc: 'One-on-one sessions with industry professionals to strengthen your portfolio.' },
        { title: 'Interview Prep', desc: 'Mock interviews, CV workshops, and employer introduction sessions.' },
        { title: 'Internship Matching', desc: 'Direct connections to internship opportunities with creative industry partners.' }
      ]
    },
    {
      key: 'financial',
      label: 'Financial Aid',
      icon: 'cash',
      color: '#08F6CF',
      title: 'Funding & Financial Aid',
      desc: 'Flexible funding guidance for blended schedules and staged tuition.',
      cards: [
        { title: 'Payment Plans', desc: 'Spread your fees across the duration of your programme with no interest charges.' },
        { title: 'Scholarships', desc: 'Merit-based and need-based scholarship opportunities for qualifying students.' },
        { title: 'Financial Counselling', desc: 'One-on-one sessions to plan your education finances and explore aid options.' }
      ]
    },
    {
      key: 'learning',
      label: 'Learning',
      icon: 'book',
      color: '#0A3D3D',
      title: 'Learning Support',
      desc: 'Tutoring, software support, and study coaching for hybrid coursework.',
      cards: [
        { title: 'Tutoring', desc: 'Peer tutoring and faculty office hours for additional academic support.' },
        { title: 'Software Training', desc: 'Workshops on industry-standard tools: Adobe Suite, DaVinci Resolve, and more.' },
        { title: 'Study Coaching', desc: 'Personalised coaching to develop effective study habits and techniques.' }
      ]
    },
    {
      key: 'accessibility',
      label: 'Accessibility',
      icon: 'accessible',
      color: '#BA2E36',
      title: 'Accessibility Support',
      desc: 'Inclusive accommodations and assistive support for online and campus delivery.',
      cards: [
        { title: 'Accommodations', desc: 'Tailored learning accommodations for students with disabilities or learning differences.' },
        { title: 'Assistive Tech', desc: 'Access to assistive technologies and adaptive equipment in labs and studios.' },
        { title: 'Inclusive Design', desc: 'All learning materials designed with accessibility standards in mind.' }
      ]
    }
  ],
  feeCards: [
    {
      badge: 'DIPLOMA',
      badgeBg: '#FFF0F0',
      badgeColor: '#BA2E36',
      title: 'Diploma Programmes',
      price: 'From KES 15,000/month',
      priceColor: '#BA2E36',
      details: '18 months \u2022 In-person\nEU-accredited via Woolf University\nFlexible payment plans available',
      btnBg: '#BA2E36'
    },
    {
      badge: 'PROFESSIONAL',
      badgeBg: '#EEF9F7',
      badgeColor: '#0A3D3D',
      title: 'Professional Certificates',
      price: 'From KES 8,500/month',
      priceColor: '#0A3D3D',
      details: '6 months \u2022 In-person / Online\nADMI & Woolf accredited\nInstalment options available',
      btnBg: '#0A3D3D'
    },
    {
      badge: 'FOUNDATION',
      badgeBg: '#FFF8F0',
      badgeColor: '#F76335',
      title: 'Foundation Certificates',
      price: 'From KES 5,000/month',
      priceColor: '#F76335',
      details: '3 months \u2022 In-person\nADMI Certified\nPay-as-you-go option',
      btnBg: '#F76335'
    },
    {
      badge: 'RUBIKA',
      badgeBg: '#EEF0FF',
      badgeColor: '#1a1a4e',
      title: 'Rubika Programmes',
      price: 'Contact for pricing',
      priceColor: '#1a1a4e',
      details: '1\u20132 years \u2022 In-person\nRubika International accredited\nScholarship options available',
      btnBg: '#1a1a4e'
    }
  ],
  helpDesks: [
    {
      title: 'Student Desk',
      desc: 'Walk in: Mon-Fri, 8:00-5:00\nEmail: support@admi.ac.ke'
    },
    {
      title: 'Counselling Office',
      desc: 'Private sessions with certified counsellors.\nBook via portal in under 2 minutes.'
    },
    {
      title: 'Career Office',
      desc: 'CV clinic, interview prep, and internship matching with industry partners.'
    }
  ],
  seoTitle: 'Student Support | ADMI',
  seoDescription:
    'Academic, financial, wellness, and career support designed for learner success at ADMI.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Student Support Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Student Support page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
