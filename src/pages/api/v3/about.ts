import { getPageCached, getEntriesCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback (same data currently hardcoded in about.tsx)
const FALLBACK_TEAM = {
  founders: [
    { name: 'Dr Laila Macharia', role: 'Co-Founder and Chair', description: 'Visionary leader driving ADMI\u2019s strategic growth and Pan-African expansion.', image: 'https://images.unsplash.com/photo-1580867398114-a567342074de?auto=format&fit=crop&w=600&q=80' },
    { name: 'Wilfred Kiumi', role: 'Co-Founder', description: 'Pioneering creative education in Africa with deep industry expertise and passion.', image: 'https://images.unsplash.com/photo-1731377209672-c7606ba26c25?auto=format&fit=crop&w=600&q=80' }
  ],
  academic: [
    { name: 'Carolyne Sila', role: 'Head of School', roleColor: '#0A3D3D', description: 'Leading academic excellence and curriculum development across all creative media programmes.', image: 'https://images.unsplash.com/photo-1616409000123-b36064d90ed4?auto=format&fit=crop&w=600&q=80' },
    { name: 'Raji Ilangovan', role: 'Student Programs', roleColor: '#EF7B2E', description: 'Ensuring students have the support, resources, and mentorship to thrive from day one to graduation.', image: 'https://images.unsplash.com/photo-1624354865933-4b9bdb3cb338?auto=format&fit=crop&w=600&q=80' },
    { name: 'Ciku Munuku', role: 'Faculty Affairs', roleColor: '#C1272D', description: 'Managing faculty development, industry partnerships, and ensuring teaching quality across departments.', image: 'https://images.unsplash.com/photo-1688841167159-bed18ddaeb44?auto=format&fit=crop&w=600&q=80' }
  ]
}

const FALLBACK_PAGE = {
  stats: [
    { value: '15+', label: 'Years of Excellence', color: '#8EBFB0' },
    { value: '4,500+', label: 'Graduates', color: '#ffffff' },
    { value: '10+', label: 'Countries Represented', color: '#EF7B2E' },
    { value: '500+', label: 'Industry Partners', color: '#C1272D' }
  ],
  values: [
    { title: 'Global', desc: 'International education benchmarks with curriculum aligned to EU and Kenyan standards.', color: '#C1272D', bg: '#FFF0F0' },
    { title: 'Practical', desc: 'Learn-and-Work model combining production training with real industry projects.', color: '#0A3D3D', bg: '#EEF9F7' },
    { title: 'Digital', desc: 'Paperless campus with e-learning tools and industry-standard digital workflows.', color: '#EF7B2E', bg: '#FFF8F0' },
    { title: 'Value-Driven', desc: 'Ethics, psycho-social support, and academic counselling woven into every programme.', color: '#1a1a4e', bg: '#EEF0FF' },
    { title: 'Transformational', desc: 'A defining experience that builds creative professionals ready to shape industries.', color: '#0A3D3D', bg: '#EEFFF9' }
  ],
  timeline: [],
  facilities: [],
  partners: []
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const [pageEntry, teamEntries] = await Promise.all([
      getPageCached('aboutPage', 'page:about'),
      getEntriesCached('teamMember', 'team-members', 'order=fields.sortOrder')
    ])

    // Group team by category
    let founders = FALLBACK_TEAM.founders
    let academic = FALLBACK_TEAM.academic

    if (teamEntries && teamEntries.length > 0) {
      founders = teamEntries
        .filter((e: any) => e.fields.category === 'founder')
        .map((e: any) => e.fields)
      academic = teamEntries
        .filter((e: any) => e.fields.category === 'academic')
        .map((e: any) => e.fields)
    }

    const page = pageEntry?.fields || FALLBACK_PAGE

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      stats: page.stats || FALLBACK_PAGE.stats,
      values: page.values || FALLBACK_PAGE.values,
      timeline: page.timeline || FALLBACK_PAGE.timeline,
      facilities: page.facilities || FALLBACK_PAGE.facilities,
      partners: page.partners || FALLBACK_PAGE.partners,
      founders,
      academic
    })
  } catch (error: any) {
    console.error('[About API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({
      ...FALLBACK_PAGE,
      ...FALLBACK_TEAM
    })
  }
}
