import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
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
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('accommodationPage', 'page:accommodation')

    if (!entry?.fields) {
      console.log('[Accommodation API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      heroTitle: fields.heroTitle,
      heroDescription: fields.heroDescription,
      heroImage: fields.heroImage,
      residences: fields.residences || FALLBACK_DATA.residences,
      amenities: fields.amenities || FALLBACK_DATA.amenities,
      bookingSteps: fields.bookingSteps || FALLBACK_DATA.bookingSteps,
      neighborhoodHighlights: fields.neighborhoodHighlights || FALLBACK_DATA.neighborhoodHighlights,
      ctaTitle: fields.ctaTitle,
      ctaDescription: fields.ctaDescription,
      ctaButtonText: fields.ctaButtonText,
      ctaButtonUrl: fields.ctaButtonUrl,
      seoTitle: fields.seoTitle,
      seoDescription: fields.seoDescription,
      seoKeywords: fields.seoKeywords
    })
  } catch (error: any) {
    console.error('[Accommodation API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
