import { getPageCached, getEntriesCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback (same data currently hardcoded in alumni.tsx)
const FALLBACK_ALUMNI = [
  {
    name: 'Grace Muthoni',
    role: 'Senior Editor at NTV Kenya',
    programme: 'Film Production Diploma, Class of 2022',
    quote:
      'The hands-on training at ADMI gave me the confidence to walk into a professional newsroom and deliver from day one. I was editing broadcast-ready packages within my first month at NTV.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'David Kimani',
    role: 'Creative Director at Ogilvy Africa',
    programme: 'Graphic Design Diploma, Class of 2021',
    quote:
      'My portfolio coming out of ADMI was stronger than what most agencies see from candidates with years of experience. The faculty pushed us to think beyond templates and create original work.',
    image: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wanjiku Njeri',
    role: 'Sound Engineer at Ogopa DJs',
    programme: 'Sound Engineering Diploma, Class of 2023',
    quote:
      'ADMI connected me directly to the industry. By the time I graduated, I already had freelance clients and a clear path into one of Kenya\u2019s biggest music production houses.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'
  }
]

const FALLBACK_PAGE = {
  stats: [
    { value: '4,000+', label: 'Graduates' },
    { value: '87%', label: 'Employment Rate' },
    { value: '15+', label: 'Countries Reached' },
    { value: '200+', label: 'Partner Companies' }
  ],
  companyRows: [
    { names: ['NTV Kenya', 'Ogilvy Africa', 'MSC Cruises', 'Ogopa DJs', 'Sensorflick'] },
    { names: ['Citizen TV', 'Scanad Kenya', 'inABLE', 'BBC Africa'] }
  ],
  networkBenefits: [
    {
      icon: 'briefcase',
      title: 'Career Support',
      desc: 'Access job boards, CV reviews, and career coaching exclusively for ADMI graduates. Our careers team works with 200+ partner companies to match alumni with opportunities.'
    },
    {
      icon: 'users',
      title: 'Networking Events',
      desc: 'Quarterly meetups, industry mixers, and annual homecoming events that keep you connected to fellow graduates and industry leaders across East Africa.'
    },
    {
      icon: 'heart-handshake',
      title: 'Mentorship Programme',
      desc: 'Give back by mentoring current students or connect with senior alumni for guidance. Our structured mentorship programme pairs graduates across disciplines and experience levels.'
    },
    {
      icon: 'speakerphone',
      title: 'Alumni Spotlight',
      desc: 'Get featured on our platforms and amplify your work. From social media takeovers to campus talks, we celebrate alumni achievements and help you build your public profile.'
    }
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const [pageEntry, profileEntries] = await Promise.all([
      getPageCached('alumniPage', 'page:alumni'),
      getEntriesCached('alumniProfile', 'alumni-profiles', 'order=fields.sortOrder')
    ])

    // Map alumni profile entries to plain objects
    let featuredAlumni = FALLBACK_ALUMNI
    if (profileEntries && profileEntries.length > 0) {
      featuredAlumni = profileEntries.map((e: any) => ({
        name: e.fields.name,
        role: e.fields.role,
        programme: e.fields.programme || '',
        quote: e.fields.quote || '',
        image: e.fields.image || ''
      }))
    }

    const page = pageEntry?.fields || FALLBACK_PAGE

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      stats: page.stats || FALLBACK_PAGE.stats,
      featuredAlumni,
      companyRows: page.companyRows || FALLBACK_PAGE.companyRows,
      networkBenefits: page.networkBenefits || FALLBACK_PAGE.networkBenefits
    })
  } catch (error: any) {
    console.error('[Alumni API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({
      ...FALLBACK_PAGE,
      featuredAlumni: FALLBACK_ALUMNI
    })
  }
}
