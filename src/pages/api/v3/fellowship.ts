import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  benefits: [
    { icon: 'users', iconColor: '#0A3D3D', title: 'Mentorship', description: 'One-on-one guidance from industry leaders and seasoned creative professionals throughout the programme.' },
    { icon: 'cash', iconColor: '#C1272D', title: 'Funding', description: 'Financial support for creative projects, equipment, and professional development opportunities.' },
    { icon: 'network', iconColor: '#EF7B2E', title: 'Industry Access', description: 'Exclusive access to industry events, studio visits, networking opportunities, and potential internships.' },
    { icon: 'layout-grid', iconColor: '#8EBFB0', title: 'Portfolio Development', description: 'Structured support to build an industry-standard portfolio that showcases your unique creative vision.' }
  ],
  eligibilityCriteria: [
    'Graduate of any ADMI diploma or professional certificate programme',
    'Strong creative portfolio demonstrating technical skill and originality',
    'Demonstrated leadership potential and commitment to the creative industries',
    'Clear vision for a creative project or venture to develop during the fellowship',
    'Available to commit to the full 12-month programme'
  ],
  applicationSteps: [
    { number: '1', bgColor: '#EF7B2E', title: 'Submit Application', description: 'Complete the online application form with your personal details, creative statement, and project proposal.' },
    { number: '2', bgColor: '#0A3D3D', title: 'Portfolio Review', description: 'Our panel of industry experts and faculty members review your portfolio and creative body of work.' },
    { number: '3', bgColor: '#C1272D', title: 'Interview', description: 'Shortlisted candidates are invited for a personal interview to discuss their vision, goals, and fellowship plans.' }
  ],
  seoTitle: 'Fellowship',
  seoDescription: 'The ADMI Fellowship is a 12-month programme for outstanding graduates, offering mentorship, funding, industry access, and portfolio development.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('fellowshipPage', 'page:fellowship')

    if (!entry?.fields) {
      console.log('[Fellowship API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      benefits: fields.benefits || FALLBACK_DATA.benefits,
      eligibilityCriteria: fields.eligibilityCriteria || FALLBACK_DATA.eligibilityCriteria,
      applicationSteps: fields.applicationSteps || FALLBACK_DATA.applicationSteps,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Fellowship API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
