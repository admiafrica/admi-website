import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  supportTabs: [
    {
      key: 'academic', label: 'Academic', icon: 'school', color: '#0A3D3D',
      title: 'Academic Advising', desc: 'Advisors help plan online and on-campus modules, deadlines, and interventions.',
      cards: [
        { title: 'Module Planning', desc: 'Get personalised guidance on selecting modules that align with your goals.' },
        { title: 'Progress Tracking', desc: 'Regular check-ins to monitor your academic progress and address challenges early.' },
        { title: 'Study Skills', desc: 'Workshops on time management, note-taking, research methods, and exam prep.' }
      ]
    },
    {
      key: 'wellness', label: 'Wellness', icon: 'heart-handshake', color: '#C1272D',
      title: 'Wellness Support', desc: 'Counselling and wellbeing support available virtually and on campus.',
      cards: [
        { title: 'Counselling', desc: 'Private sessions with certified counsellors for personal and academic challenges.' },
        { title: 'Peer Support', desc: 'Student-led support groups and mentoring programmes for community wellbeing.' },
        { title: 'Crisis Support', desc: 'Immediate support and referral pathways for urgent wellbeing concerns.' }
      ]
    },
    {
      key: 'career', label: 'Career', icon: 'briefcase', color: '#EF7B2E',
      title: 'Career Services', desc: 'Career coaching across virtual sessions, portfolio reviews, and campus showcases.',
      cards: [
        { title: 'Portfolio Reviews', desc: 'One-on-one sessions with industry professionals to strengthen your portfolio.' },
        { title: 'Interview Prep', desc: 'Mock interviews, CV workshops, and employer introduction sessions.' },
        { title: 'Internship Matching', desc: 'Direct connections to internship opportunities with creative industry partners.' }
      ]
    },
    {
      key: 'financial', label: 'Financial Aid', icon: 'cash', color: '#8EBFB0',
      title: 'Funding & Financial Aid', desc: 'Flexible funding guidance for blended schedules and staged tuition.',
      cards: [
        { title: 'Payment Plans', desc: 'Spread your fees across the duration of your programme with no interest charges.' },
        { title: 'Scholarships', desc: 'Merit-based and need-based scholarship opportunities for qualifying students.' },
        { title: 'Financial Counselling', desc: 'One-on-one sessions to plan your education finances and explore aid options.' }
      ]
    },
    {
      key: 'learning', label: 'Learning', icon: 'book', color: '#0A3D3D',
      title: 'Learning Support', desc: 'Tutoring, software support, and study coaching for hybrid coursework.',
      cards: [
        { title: 'Tutoring', desc: 'Peer tutoring and faculty office hours for additional academic support.' },
        { title: 'Software Training', desc: 'Workshops on industry-standard tools: Adobe Suite, DaVinci Resolve, and more.' },
        { title: 'Study Coaching', desc: 'Personalised coaching to develop effective study habits and techniques.' }
      ]
    },
    {
      key: 'accessibility', label: 'Accessibility', icon: 'accessible', color: '#C1272D',
      title: 'Accessibility Support', desc: 'Inclusive accommodations and assistive support for online and campus delivery.',
      cards: [
        { title: 'Accommodations', desc: 'Tailored learning accommodations for students with disabilities or learning differences.' },
        { title: 'Assistive Tech', desc: 'Access to assistive technologies and adaptive equipment in labs and studios.' },
        { title: 'Inclusive Design', desc: 'All learning materials designed with accessibility standards in mind.' }
      ]
    }
  ],
  feeCards: [
    { badge: 'DIPLOMA', badgeBg: '#FFF0F0', badgeColor: '#C1272D', title: 'Diploma Programmes', price: 'From KES 15,000/month', priceColor: '#C1272D', details: '18 months \u2022 In-person\nEU-accredited via Woolf University\nFlexible payment plans available', btnBg: '#C1272D' },
    { badge: 'PROFESSIONAL', badgeBg: '#EEF9F7', badgeColor: '#0A3D3D', title: 'Professional Certificates', price: 'From KES 8,500/month', priceColor: '#0A3D3D', details: '6 months \u2022 In-person / Online\nADMI & Woolf accredited\nInstalment options available', btnBg: '#0A3D3D' },
    { badge: 'FOUNDATION', badgeBg: '#FFF8F0', badgeColor: '#EF7B2E', title: 'Foundation Certificates', price: 'From KES 5,000/month', priceColor: '#EF7B2E', details: '3 months \u2022 In-person\nADMI Certified\nPay-as-you-go option', btnBg: '#EF7B2E' },
    { badge: 'RUBIKA', badgeBg: '#EEF0FF', badgeColor: '#1a1a4e', title: 'Rubika Programmes', price: 'Contact for pricing', priceColor: '#1a1a4e', details: '1\u20132 years \u2022 In-person\nRubika International accredited\nScholarship options available', btnBg: '#1a1a4e' }
  ],
  helpDesks: [
    { title: 'Student Desk', desc: 'Walk in: Mon-Fri, 8:00-5:00\nEmail: support@admi.ac.ke' },
    { title: 'Counselling Office', desc: 'Private sessions with certified counsellors.\nBook via portal in under 2 minutes.' },
    { title: 'Career Office', desc: 'CV clinic, interview prep, and internship matching with industry partners.' }
  ],
  seoTitle: 'Student Support | ADMI',
  seoDescription: 'Academic, financial, wellness, and career support designed for learner success at ADMI.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('studentSupportPage', 'page:student-support')

    if (!entry?.fields) {
      console.log('[Student Support API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      supportTabs: fields.supportTabs || FALLBACK_DATA.supportTabs,
      feeCards: fields.feeCards || FALLBACK_DATA.feeCards,
      helpDesks: fields.helpDesks || FALLBACK_DATA.helpDesks,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Student Support API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
