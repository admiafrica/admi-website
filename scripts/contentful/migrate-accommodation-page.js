#!/usr/bin/env node

/**
 * Migrate Accommodation Page to Contentful
 *
 * Creates the `accommodationPage` content type and seeds it with the
 * current hardcoded data from src/pages/accommodation.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-accommodation
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-accommodation-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'accommodationPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Accommodation Page',
  description: 'Singleton page content for the student accommodation page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Hero section
    {
      id: 'heroTitle',
      name: 'Hero Title',
      type: 'Symbol',
      required: true,
      validations: [{ size: { max: 120 } }]
    },
    {
      id: 'heroDescription',
      name: 'Hero Description',
      type: 'Text',
      required: false,
      validations: [{ size: { max: 500 } }]
    },
    {
      id: 'heroImage',
      name: 'Hero Background Image URL',
      type: 'Symbol',
      required: false,
      validations: [{ regexp: { pattern: '^https?://' } }]
    },
    // Residences (JSON array)
    {
      id: 'residences',
      name: 'Partner Residences',
      type: 'Object',
      required: true
    },
    // Amenities (JSON array of { label, icon })
    {
      id: 'amenities',
      name: 'Amenities',
      type: 'Object',
      required: true
    },
    // Booking steps (JSON array)
    {
      id: 'bookingSteps',
      name: 'Booking Steps',
      type: 'Object',
      required: true
    },
    // Neighbourhood highlights (JSON array of strings)
    {
      id: 'neighborhoodHighlights',
      name: 'Neighbourhood Highlights',
      type: 'Object',
      required: false
    },
    // CTA section
    {
      id: 'ctaTitle',
      name: 'CTA Title',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 200 } }]
    },
    {
      id: 'ctaDescription',
      name: 'CTA Description',
      type: 'Text',
      required: false,
      validations: [{ size: { max: 500 } }]
    },
    {
      id: 'ctaButtonText',
      name: 'CTA Button Text',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 60 } }]
    },
    {
      id: 'ctaButtonUrl',
      name: 'CTA Button URL',
      type: 'Symbol',
      required: false
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
  internalName: 'Accommodation Page',
  heroTitle: 'Student Accommodation',
  heroDescription:
    'Comfortable living options near campus to help you focus on what matters most — your creative education.',
  heroImage:
    'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=1920&q=80',
  residences: [
    {
      name: 'Qwetu',
      price: 'From KES 25,000/month',
      description:
        'Purpose-built student living with modern furnished rooms, high-speed WiFi, study lounges, a gym, and 24/7 security. Multiple locations across Nairobi with shuttle services.',
      image:
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      link: 'https://www.qwetu.com'
    },
    {
      name: 'Qejani',
      price: 'From KES 18,000/month',
      description:
        'Contemporary co-living spaces designed for students and young professionals. Fully furnished studios and shared apartments with communal kitchens and social areas.',
      image:
        'https://images.unsplash.com/photo-1649800292011-6a92542f08ce?auto=format&fit=crop&w=800&q=80',
      link: 'https://www.qejani.com'
    },
    {
      name: 'YWCA Parklands',
      price: 'From KES 10,000/month',
      description:
        'Safe, well-managed accommodation for female students in Parklands. Walking distance to public transport with meals included.',
      image:
        'https://images.unsplash.com/photo-1759889392274-246af1a984ba?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Private Hostels Network',
      price: 'From KES 8,000/month',
      description:
        'ADMI partners with vetted private hostels across Nairobi to offer affordable, quality housing options near campus.',
      image:
        'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=800&q=80'
    }
  ],
  amenities: [
    { label: 'High-Speed WiFi', icon: 'wifi' },
    { label: 'Daily Meals Available', icon: 'tools-kitchen-2' },
    { label: 'Quiet Study Spaces', icon: 'book' },
    { label: '24/7 Security', icon: 'shield' },
    { label: 'Laundry Facilities', icon: 'wash' },
    { label: 'Common Social Areas', icon: 'users' }
  ],
  bookingSteps: [
    {
      number: '1',
      title: 'Apply to ADMI',
      description:
        'Submit your application to your chosen programme at ADMI. Accommodation support is available to all admitted students.'
    },
    {
      number: '2',
      title: 'Choose Your Residence',
      description:
        'Browse available options and select the residence that fits your needs, budget, and lifestyle.'
    },
    {
      number: '3',
      title: 'Secure Your Room',
      description:
        'Pay your deposit and move in before classes begin. Our team will help you settle in.'
    }
  ],
  neighborhoodHighlights: [
    'Walking distance to public transport',
    'Restaurants and cafes nearby',
    'Shopping malls within reach'
  ],
  ctaTitle: 'Ready to Find Your Home Away From Home?',
  ctaDescription:
    'Secure your spot in one of our partner residences and start your ADMI journey with comfort and convenience.',
  ctaButtonText: 'Enquire About Accommodation',
  ctaButtonUrl: '/contact',
  seoTitle: 'Student Accommodation',
  seoDescription:
    'Comfortable living options near ADMI campus in Nairobi. Explore partner residences, included amenities, and how to book your student accommodation.',
  seoKeywords:
    'ADMI accommodation, student housing Nairobi, student residences Kenya, ADMI campus housing, affordable student accommodation'
})

// ---------- Main ----------

async function main() {
  console.log('=== Accommodation Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Accommodation page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
