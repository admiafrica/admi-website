import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  accreditations: [
    {
      title: 'Woolf University',
      subtitle: 'EU-Accredited Degree Partner',
      description:
        'Woolf is an EU-accredited, degree-granting institution. Through our partnership, ADMI diploma graduates can earn ECTS credits recognised across the European Higher Education Area.',
      icon: 'school',
      borderColor: '#8EBFB0',
      accentColor: '#0A3D3D',
      iconBg: '#8EBFB022',
      tagBg: '#8EBFB022',
      tags: ['ECTS Credits', 'EU Accredited', 'International']
    },
    {
      title: 'TVETA Kenya',
      subtitle: 'National Technical Education Authority',
      description:
        "Registered with Kenya's Technical and Vocational Education and Training Authority. All programmes meet national quality standards and comply with KNQF requirements.",
      icon: 'shield-check',
      borderColor: '#C1272D',
      accentColor: '#C1272D',
      iconBg: '#C1272D22',
      tagBg: '#C1272D22',
      tags: ['KNQF Compliant', 'National Recognition']
    },
    {
      title: 'Pearson BTEC',
      subtitle: 'Globally Recognised Professional Certification',
      description:
        'Professional certificates carry Pearson BTEC certification, globally recognised by employers and universities as a mark of vocational excellence.',
      icon: 'award',
      borderColor: '#EF7B2E',
      accentColor: '#EF7B2E',
      iconBg: '#EF7B2E22',
      tagBg: '#EF7B2E22',
      tags: ['Employer Recognised', 'Global Standard']
    }
  ],
  qualityStandards: [
    { title: 'ECTS Credits', description: 'European Credit Transfer System ensures your qualifications are portable and recognised across the continent.', icon: 'certificate', iconColor: '#8EBFB0' },
    { title: 'KNQF Level Mapping', description: 'Each programme maps to specific KNQF levels, ensuring alignment with national education standards and employer expectations.', icon: 'layers-subtract', iconColor: '#0A3D3D' },
    { title: 'Quality Assurance', description: 'Rigorous internal and external quality processes ensure curriculum relevance, teaching excellence, and student success.', icon: 'clipboard-check', iconColor: '#C1272D' },
    { title: 'Industry Advisory Board', description: 'Leading creative industry professionals review and guide programme content to ensure graduates are career-ready.', icon: 'users', iconColor: '#EF7B2E' }
  ],
  benefits: [
    { title: 'International Recognition', description: 'Your qualifications are recognised across Europe and beyond through ECTS credit alignment.', icon: 'globe', iconColor: '#8EBFB0' },
    { title: 'Credit Transfer', description: 'Seamlessly transfer credits between ADMI programmes and towards international degree pathways.', icon: 'arrows-exchange', iconColor: '#0A3D3D' },
    { title: 'Employer Confidence', description: 'Accredited qualifications give employers confidence in the standards and rigour of your education.', icon: 'briefcase', iconColor: '#C1272D' },
    { title: 'Pathway to Degrees', description: 'Progress from certificate to diploma to degree through a structured, credit-bearing academic pathway.', icon: 'trending-up', iconColor: '#EF7B2E' },
    { title: 'Government-Registered Programmes', description: 'All programmes are registered with TVETA Kenya, meeting the national standards for technical and vocational education.', icon: 'checklist', iconColor: '#0A3D3D' },
    { title: 'Student Protection Standards', description: 'Robust quality frameworks safeguard your learning experience with regular audits and transparent reporting.', icon: 'shield-check', iconColor: '#C1272D' }
  ],
  seoTitle: 'Accreditation',
  seoDescription:
    'ADMI holds accreditation from Woolf University (EU-accredited ECTS credits), TVETA Kenya, and Pearson BTEC.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('accreditationPage', 'page:accreditation')

    if (!entry?.fields) {
      console.log('[Accreditation API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      accreditations: fields.accreditations || FALLBACK_DATA.accreditations,
      qualityStandards: fields.qualityStandards || FALLBACK_DATA.qualityStandards,
      benefits: fields.benefits || FALLBACK_DATA.benefits,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Accreditation API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
