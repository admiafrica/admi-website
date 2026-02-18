import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  featuredProjects: [
    { title: 'Shifting Horizons', student: 'Achieng O.', programme: 'Film Production Diploma', type: 'Short Documentary', image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=800&q=80' },
    { title: 'Urban Pulse', student: 'Brian K.', programme: 'Graphic Design', type: 'Brand Campaign', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80' },
    { title: 'Echoes of Tomorrow', student: 'Maureen T.', programme: 'Animation', type: '3D Short Film', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' }
  ],
  disciplineSections: [
    {
      title: 'Film & Video Production', bg: '#ffffff',
      projects: [
        { title: 'Shifting Horizons', student: 'Achieng O.', type: 'Short Documentary', image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=600&q=80' },
        { title: 'City Lights', student: 'Kevin M.', type: 'Music Video', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80' },
        { title: 'The Last Mile', student: 'Faith W.', type: 'Short Film', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Animation & VFX', bg: '#F9F9F9',
      projects: [
        { title: 'Dreamscape', student: 'Maureen T.', type: '3D Animation', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
        { title: 'Wireframe World', student: 'James K.', type: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80' },
        { title: 'Neon Genesis', student: 'Lucy A.', type: 'VFX Reel', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Graphic Design & Branding', bg: '#ffffff',
      projects: [
        { title: 'Urban Pulse', student: 'Brian K.', type: 'Brand Identity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80' },
        { title: 'Savannah Studio', student: 'Grace N.', type: 'Logo & Packaging', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80' },
        { title: 'Craft & Co', student: 'Dennis O.', type: 'Brand Campaign', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Music & Audio Production', bg: '#F9F9F9',
      projects: [
        { title: 'Bassline Theory', student: 'Samuel M.', type: 'EP Production', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
        { title: 'Sound of Nairobi', student: 'Diana K.', type: 'Podcast Series', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80' },
        { title: 'Studio Sessions', student: 'Peter W.', type: 'Sound Design', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' }
      ]
    }
  ],
  studentVoices: [
    { quote: 'My final-year project became my first paid client campaign two months before graduation.', name: 'Achieng O.', discipline: 'Graphic Design' },
    { quote: 'We pitched to a real brand, got feedback from agency creatives, and shipped the campaign live.', name: 'Brian K.', discipline: 'Film Production' },
    { quote: 'Mentors treated us like studio teams, so we left with confidence and a body of work we are proud of.', name: 'Maureen T.', discipline: 'Animation' }
  ],
  seoTitle: 'Student Showcase | ADMI',
  seoDescription: 'Explore film, animation, design and audio work produced by ADMI students through hybrid learning.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('studentShowcasePage', 'page:student-showcase')

    if (!entry?.fields) {
      console.log('[Student Showcase API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      featuredProjects: fields.featuredProjects || FALLBACK_DATA.featuredProjects,
      disciplineSections: fields.disciplineSections || FALLBACK_DATA.disciplineSections,
      studentVoices: fields.studentVoices || FALLBACK_DATA.studentVoices,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Student Showcase API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
