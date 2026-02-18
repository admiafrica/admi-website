import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  pathwaySteps: [
    { step: 1, duration: '3 MONTHS', title: 'Foundation Certificate', description: 'Build core creative skills and discover your specialisation. Earn foundational credits that articulate directly into professional programmes.', credits: '15 ECTS Credits', price: 'KES 5,000/mo', certification: 'ADMI Certified', borderColor: '#EF7B2E', bgColor: '#FFFFFF' },
    { step: 2, duration: '6 MONTHS', title: 'Professional Certificate', description: 'Deepen your expertise in your chosen field. Industry-aligned curriculum with hands-on projects and professional portfolio development.', credits: '30 ECTS Credits', price: 'KES 8,500/mo', certification: 'Pearson BTEC', borderColor: '#0A3D3D', bgColor: '#FFFFFF' },
    { step: 3, duration: '18 MONTHS', title: 'Diploma Programme', description: 'Comprehensive programme combining theory and practice. Graduate industry-ready with a nationally recognised qualification and substantial credit accumulation.', credits: '90 ECTS Credits', price: 'KES 15,000/mo', certification: 'Woolf ECTS', borderColor: '#C1272D', bgColor: '#FFFFFF' },
    { step: 4, duration: 'DEGREE PATHWAY', title: 'Bachelor\u2019s Degree via Woolf University', description: 'Articulate your ADMI credits into a full EU-accredited bachelor\u2019s degree through Woolf University. Study online with international recognition and ECTS credit transfer.', credits: '180 ECTS Credits  \u00b7  EU Accredited', price: null, certification: 'EU Accredited', borderColor: '#8EBFB0', bgColor: '#F0FDFA' }
  ],
  articulationCards: [
    { icon: 'school', iconColor: '#0A3D3D', iconBg: 'bg-secondary/15', title: 'Woolf University', description: 'EU-accredited degree-granting institution. ADMI diploma graduates can articulate credits towards a full bachelor\u2019s degree with international recognition.' },
    { icon: 'shield-check', iconColor: '#C1272D', iconBg: 'bg-brand-red/15', title: 'KNQF Alignment', description: 'All ADMI programmes are aligned with the Kenya National Qualifications Framework, ensuring national recognition and seamless credit transfer.' },
    { icon: 'award', iconColor: '#EF7B2E', iconBg: 'bg-brand-orange/15', title: 'ECTS Credits', description: 'European Credit Transfer System credits ensure your qualifications are recognised across Europe and beyond, enabling global mobility.' }
  ],
  creditCards: [
    { value: '100%', valueColor: '#EF7B2E', description: 'Credit articulation between ADMI programmes' },
    { value: 'ECTS', valueColor: '#0A3D3D', description: 'European credits recognised in 48+ countries worldwide' },
    { value: 'KNQF', valueColor: '#C1272D', description: 'Kenya National Qualifications Framework aligned for local recognition' }
  ],
  seoTitle: 'Academic Pathways',
  seoDescription: "ADMI offers an accredited academic pathway from foundation courses through to an internationally recognised bachelor's degree."
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('academicPathwaysPage', 'page:academic-pathways')

    if (!entry?.fields) {
      console.log('[Academic Pathways API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      pathwaySteps: fields.pathwaySteps || FALLBACK_DATA.pathwaySteps,
      articulationCards: fields.articulationCards || FALLBACK_DATA.articulationCards,
      creditCards: fields.creditCards || FALLBACK_DATA.creditCards,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Academic Pathways API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
