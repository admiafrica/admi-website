import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  hubCards: [
    {
      icon: 'palette',
      title: 'Student Showcase',
      desc: 'Browse portfolios, films, animations, and design projects from current students and recent graduates.',
      link: '/student-showcase',
      linkText: 'Explore Showcase',
      image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'heart-handshake',
      title: 'Student Support',
      desc: 'Academic advising, wellness resources, career coaching, and accessibility services \u2014 all in one place.',
      link: '/student-support',
      linkText: 'Get Support',
      image: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'calculator',
      title: 'Financial Planning & Fees',
      desc: 'Fee structures, payment plans, scholarship opportunities, and financial aid options for every programme.',
      link: '/financial-planning',
      linkText: 'View Fees & Aid',
      image: 'https://images.unsplash.com/photo-1656049471454-ff3c59812741?auto=format&fit=crop&w=800&q=80'
    }
  ],
  campusFeatures: [
    { icon: 'movie', title: 'Studio Access', desc: 'Professional film, animation, audio, and design studios available for student projects and practice sessions.' },
    { icon: 'users', title: 'Community Events', desc: 'Regular showcases, hackathons, film screenings, and networking events connecting students with industry professionals.' },
    { icon: 'briefcase', title: 'Career Services', desc: 'CV workshops, interview prep, portfolio reviews, and direct introductions to employers across creative industries.' },
    { icon: 'wifi', title: 'Hybrid Learning', desc: 'Flexible online and on-campus learning model with digital tools, virtual studios, and remote collaboration support.' }
  ],
  seoTitle: 'Student Life | ADMI',
  seoDescription: 'From creative studios to career support \u2014 everything you need to thrive as an ADMI student.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('studentLifePage', 'page:student-life')

    if (!entry?.fields) {
      console.log('[Student Life API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      hubCards: fields.hubCards || FALLBACK_DATA.hubCards,
      campusFeatures: fields.campusFeatures || FALLBACK_DATA.campusFeatures,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Student Life API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
