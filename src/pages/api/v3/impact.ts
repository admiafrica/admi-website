import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  heroStats: [
    { value: '4,500+', label: 'Students & Alumni', color: '#8EBFB0' },
    { value: '88%', label: 'Employment Rate', color: '#ffffff' },
    { value: '3x', label: 'Income Growth by Year 3', color: '#EF7B2E' },
    { value: '15+', label: 'Countries Reached', color: '#C1272D' }
  ],

  incomeYearCards: [
    {
      badge: 'Year 1 \u2014 The Hustle',
      badgeBg: '#FFF0F0',
      badgeColor: '#C1272D',
      value: 'KES 10-20K',
      valueColor: '#171717',
      subtitle: 'monthly',
      subtitleColor: '#999999',
      description:
        'Building portfolios, taking on freelance gigs, and gaining real-world experience. The foundation years.',
      descColor: '#666666',
      bgColor: '#f9f9f9'
    },
    {
      badge: 'Year 2 \u2014 Building Momentum',
      badgeBg: '#FFF8F0',
      badgeColor: '#EF7B2E',
      value: 'KES 25-50K',
      valueColor: '#171717',
      subtitle: 'monthly',
      subtitleColor: '#999999',
      description: 'Reputation growing, clients returning, and specialisation kicking in. Income doubles.',
      descColor: '#666666',
      bgColor: '#f9f9f9'
    },
    {
      badge: 'Year 3 \u2014 Breaking Through',
      badgeBg: 'rgba(255,255,255,0.12)',
      badgeColor: '#8EBFB0',
      value: 'KES 50-100K+',
      valueColor: '#ffffff',
      subtitle: 'monthly',
      subtitleColor: '#8EBFB0',
      description:
        'Industry leaders, business owners, and in-demand professionals. 65-230% above industry benchmarks.',
      descColor: '#cccccc',
      bgColor: '#0A3D3D'
    }
  ],

  programmeOutcomes: [
    {
      name: 'Film & TV Production',
      value: 'KES 80-90K+',
      color: '#8EBFB0',
      barWidth: '75%',
      note: '85% employed within 6 months'
    },
    {
      name: 'Music Production',
      value: 'KES 80-100K+',
      color: '#EF7B2E',
      barWidth: '80%',
      note: 'Highest earning potential among all programmes'
    },
    {
      name: 'Multimedia',
      value: 'KES 80-120K+',
      color: '#C1272D',
      barWidth: '85%',
      note: 'Most versatile career options'
    },
    {
      name: 'Sound Engineering',
      value: 'KES 60-80K+',
      color: '#8EBFB0',
      barWidth: '65%',
      note: 'High demand in live events and studios'
    },
    {
      name: 'Graphic Design',
      value: 'KES 50-70K+',
      color: '#EF7B2E',
      barWidth: '55%',
      note: 'Strong freelance and agency demand'
    },
    {
      name: 'Animation',
      value: 'KES 50-70K+',
      color: '#C1272D',
      barWidth: '55%',
      note: 'Growing international remote opportunities'
    }
  ],

  benchmarkCards: [
    {
      value: 'KES 24-30K',
      valueColor: 'rgba(255,255,255,0.6)',
      label: 'Industry Benchmark',
      labelColor: 'rgba(255,255,255,0.8)',
      description: 'Typical creative industry salary in Kenya',
      descColor: 'rgba(255,255,255,0.6)',
      bgColor: 'rgba(255,255,255,0.15)'
    },
    {
      value: 'KES 50-100K+',
      valueColor: '#C1272D',
      label: 'ADMI Graduate Reality',
      labelColor: '#171717',
      description: 'Year 3 median monthly earnings',
      descColor: '#666666',
      bgColor: '#ffffff'
    }
  ],

  careerPaths: [
    {
      percentage: '70%',
      percentColor: '#8EBFB0',
      label: 'Choose Freelance',
      labelColor: '#ffffff',
      bgColor: '#0A3D3D',
      timeline: [
        { dotColor: '#8EBFB0', text: 'Year 1: KES 15-25K \u2014 Building client base', textColor: '#cccccc' },
        { dotColor: '#8EBFB0', text: 'Year 2: KES 30-50K \u2014 Repeat clients, referrals', textColor: '#cccccc' },
        { dotColor: '#8EBFB0', text: 'Year 3+: KES 60-120K \u2014 Industry leader', textColor: '#ffffff' }
      ]
    },
    {
      percentage: '30%',
      percentColor: '#C1272D',
      label: 'Choose Employment',
      labelColor: '#171717',
      bgColor: '#ffffff',
      borderColor: '#E8E8E8',
      timeline: [
        { dotColor: '#C1272D', text: 'Year 1: KES 20-30K \u2014 Junior creative roles', textColor: '#666666' },
        { dotColor: '#C1272D', text: 'Year 2: KES 35-55K \u2014 Mid-level positions', textColor: '#666666' },
        { dotColor: '#C1272D', text: 'Year 3+: KES 50-90K \u2014 Senior / Lead roles', textColor: '#171717' }
      ]
    }
  ],

  companyPills: [
    { name: 'NTV Kenya' },
    { name: 'Ogilvy Africa' },
    { name: 'MSC Cruises' },
    { name: 'Safaricom' },
    { name: 'Ogopa DJs' },
    { name: 'Nation Media' },
    { name: 'WPP Scangroup' },
    { name: 'Showmax' },
    { name: 'Citizen TV' },
    { name: 'Weza Tele' },
    { name: 'Netflix Africa' },
    { name: 'Tubidy Studios' }
  ],

  alumniStories: [
    {
      image:
        'https://images.unsplash.com/photo-1615453261261-77494754424e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
      name: 'Grace Muthoni',
      role: 'Senior Editor, NTV Kenya',
      roleColor: '#8EBFB0',
      quote:
        '\u201cADMI gave me the technical skills and industry connections that launched my career in broadcast journalism.\u201d',
      meta: 'Film Production Diploma, Class of 2022'
    },
    {
      image:
        'https://images.unsplash.com/photo-1622295023825-6e319464b810?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
      name: 'David Kimani',
      role: 'Creative Director, Ogilvy Africa',
      roleColor: '#EF7B2E',
      quote:
        '\u201cThe hands-on approach at ADMI prepared me for real agency life. Within 3 years, I was leading creative campaigns for major brands.\u201d',
      meta: 'Graphic Design Diploma, Class of 2021'
    },
    {
      image:
        'https://images.unsplash.com/photo-1685634115415-4fd59062a34e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
      name: 'Wanjiku Njeri',
      role: 'Sound Engineer, Ogopa DJs',
      roleColor: '#C1272D',
      quote:
        "\u201cFrom student projects to mixing tracks for top Kenyan artists. ADMI's studio facilities and mentorship made all the difference.\u201d",
      meta: 'Sound Engineering Diploma, Class of 2023'
    }
  ],

  awardRows: [
    {
      bgColor: '#f9f9f9',
      imageUrl:
        'https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=380&q=80',
      imageSide: 'left',
      badge: 'STUDENT FILM AWARD',
      badgeColor: '#C1272D',
      badgeBg: '#FFF0F0',
      title: 'Kalasha International Film Awards',
      titleColor: '#171717',
      description:
        'ADMI film students have won multiple Kalasha Awards for Best Student Film, Best Cinematography, and Best Short Documentary. Competing against entries from across Africa, our students consistently prove they can hold their own on the continental stage.',
      descColor: '#666666',
      tags: [
        { text: 'Best Student Film 2023', textColor: '#171717', bgColor: '#ffffff', borderColor: '#E8E8E8' },
        { text: 'Best Cinematography 2024', textColor: '#171717', bgColor: '#ffffff', borderColor: '#E8E8E8' }
      ]
    },
    {
      bgColor: '#0A0A0A',
      imageUrl:
        'https://images.unsplash.com/photo-1713453450934-ffa72b233597?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=400&q=80',
      imageSide: 'right',
      badge: 'TOP 10 SME IN KENYA',
      badgeColor: '#8EBFB0',
      badgeBg: 'rgba(255,255,255,0.08)',
      title: 'Recognised Among Kenya\u2019s Top Businesses',
      titleColor: '#ffffff',
      description:
        'ADMI was named among Kenya\u2019s Top 10 SMEs \u2014 a testament to our impact on the creative economy. From a single campus in 2011 to shaping 4,500+ careers, we\u2019ve proven that investing in creative education delivers measurable returns.',
      descColor: '#cccccc',
      tags: [],
      stats: [
        { value: 'Top 10', label: 'SME in Kenya' },
        { value: 'EU Accredited', label: 'Via Woolf University' }
      ]
    },
    {
      bgColor: '#0A3D3D',
      imageUrl:
        'https://images.unsplash.com/photo-1599840448769-f4ac7aac8d8b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=380&q=80',
      imageSide: 'left',
      badge: 'ALUMNI ACHIEVEMENT',
      badgeColor: '#8EBFB0',
      badgeBg: 'rgba(255,255,255,0.08)',
      title: 'Alumni Leading the Creative Industry',
      titleColor: '#ffffff',
      description:
        'From Senior Editors at NTV to Creative Directors at Ogilvy Africa, ADMI alumni are winning industry awards and leading creative teams across the continent.',
      descColor: '#cccccc',
      tags: [
        { text: 'Loeries Africa Winners', textColor: '#8EBFB0', bgColor: 'rgba(255,255,255,0.08)' },
        { text: 'International Commissions', textColor: '#8EBFB0', bgColor: 'rgba(255,255,255,0.08)' },
        { text: 'Company Founders', textColor: '#8EBFB0', bgColor: 'rgba(255,255,255,0.08)' }
      ]
    }
  ],

  methodologyStats: [
    { value: '700+', label: 'Emails Sent', description: 'Across all six diploma programmes' },
    { value: '110', label: 'Phone Follow-ups', description: 'Personal calls for deeper insights' },
    { value: '43', label: 'Detailed Responses', description: 'With verified income data' },
    { value: '8', label: 'Employer Insights', description: 'Industry partner hiring feedback' }
  ],

  ctaBottomStats: [
    { value: '4.8/5', label: 'Student Satisfaction' },
    { value: '500+', label: 'Industry Partners' },
    { value: 'Since 2011', label: 'Shaping Creative Careers' }
  ],

  seoTitle: 'Our Impact | ADMI - Transforming Lives Through Creative Education',
  seoDescription:
    'Discover how ADMI graduates achieve 3x income growth by Year 3. 88% employment rate, 4,500+ alumni across 15+ countries. Real income data from our 2025 alumni survey.'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('impactPage', 'page:impact')

    if (!entry?.fields) {
      console.log('[Impact API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      heroStats: fields.heroStats || FALLBACK_DATA.heroStats,
      incomeYearCards: fields.incomeYearCards || FALLBACK_DATA.incomeYearCards,
      programmeOutcomes: fields.programmeOutcomes || FALLBACK_DATA.programmeOutcomes,
      benchmarkCards: fields.benchmarkCards || FALLBACK_DATA.benchmarkCards,
      careerPaths: fields.careerPaths || FALLBACK_DATA.careerPaths,
      companyPills: fields.companyPills || FALLBACK_DATA.companyPills,
      alumniStories: fields.alumniStories || FALLBACK_DATA.alumniStories,
      awardRows: fields.awardRows || FALLBACK_DATA.awardRows,
      methodologyStats: fields.methodologyStats || FALLBACK_DATA.methodologyStats,
      ctaBottomStats: fields.ctaBottomStats || FALLBACK_DATA.ctaBottomStats,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription
    })
  } catch (error: any) {
    console.error('[Impact API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
