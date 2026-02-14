import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  feeCards: [
    {
      title: 'Diploma Programmes',
      price: 'From KES 15,000/month',
      duration: '18 months',
      badge: 'EU-Accredited via Woolf',
      borderColor: '#C1272D',
      features: [
        'Woolf University ECTS credits',
        'Full studio access',
        'Industry mentorship',
        'Portfolio development'
      ]
    },
    {
      title: 'Professional Certificates',
      price: 'From KES 8,500/month',
      duration: '6 months',
      badge: 'In-person / Online',
      borderColor: '#0A3D3D',
      features: [
        'Pearson BTEC certified',
        'Flexible scheduling',
        'Industry projects',
        'Career support'
      ]
    },
    {
      title: 'Foundation Certificates',
      price: 'From KES 5,000/month',
      duration: '3 months',
      badge: 'In-person \u00b7 ADMI Certified',
      borderColor: '#EF7B2E',
      features: [
        'Beginner-friendly',
        'Hands-on training',
        'Portfolio starter',
        'Pathway to Professional'
      ]
    },
    {
      title: 'Bachelor\u2019s Programme',
      price: 'Contact for Pricing',
      duration: '1\u20132 years',
      badge: 'Rubika International',
      borderColor: '#1a1a4e',
      features: [
        'International degree',
        'Exchange opportunities',
        'Advanced specialisation',
        'Global network'
      ]
    }
  ],
  paymentPlans: [
    {
      title: 'Monthly Instalments',
      subtitle: 'From KES 5,000/mo',
      description:
        'Spread your fees across manageable monthly payments throughout each semester. Ideal for students who prefer predictable, smaller payments.',
      tag: 'Most Popular',
      tagColor: '#C1272D'
    },
    {
      title: 'Per Semester',
      subtitle: 'Save 5%',
      description:
        'Pay your full semester fees upfront and enjoy a 5% discount. A great balance between savings and flexibility across the programme duration.',
      tag: null,
      tagColor: null
    },
    {
      title: 'Full Payment',
      subtitle: 'Save 10%',
      description:
        'Settle your entire programme fee at enrolment and receive the maximum 10% discount. Best for families and sponsors planning ahead.',
      tag: 'Best Value',
      tagColor: '#0A3D3D'
    }
  ],
  scholarships: [
    {
      title: 'Merit-Based Scholarships',
      description:
        'Outstanding academic achievers and creative talents can receive up to 50% tuition coverage. Awarded based on portfolio strength, academic results, and demonstrated creative excellence.',
      coverage: 'Up to 50% coverage',
      bgColor: '#FFF0F0',
      iconColor: '#C1272D',
      icon: 'star'
    },
    {
      title: 'Need-Based Financial Aid',
      description:
        'ADMI is committed to making creative education accessible. Need-based aid is available for students who demonstrate financial need and a strong commitment to their creative career.',
      coverage: 'Assessed individually',
      bgColor: '#EEF9F7',
      iconColor: '#0A3D3D',
      icon: 'heart'
    },
    {
      title: 'Industry Partner Sponsorships',
      description:
        'Leading creative studios, agencies, and media companies sponsor talented students through ADMI partnership programmes. Includes mentorship and potential employment pathways.',
      coverage: 'Varies by partner',
      bgColor: '#FFF8F0',
      iconColor: '#EF7B2E',
      icon: 'briefcase'
    }
  ],
  faqItems: [
    {
      q: 'What is included in the tuition fees?',
      a: 'Tuition fees cover all teaching and instruction, access to studio facilities and equipment, learning materials and software licences, portfolio development support, and career services. Some programmes may have additional costs for specialised materials or external certification fees, which are outlined in the programme-specific fee structure.'
    },
    {
      q: 'Can I switch payment plans during my programme?',
      a: 'Yes, you can request to change your payment plan at the start of a new semester. Simply contact the Finance Office at least two weeks before the semester begins. Note that switching from a discounted plan (semester or full payment) to monthly instalments will adjust your remaining balance accordingly.'
    },
    {
      q: 'Are there any hidden fees or additional costs?',
      a: 'ADMI is committed to full transparency. Your fee structure document outlines every cost associated with your programme. The only potential additional costs are for optional items such as personal equipment purchases, external exam registrations, or elective industry workshops. There are no hidden administrative or registration fees.'
    },
    {
      q: 'How do I apply for a scholarship?',
      a: 'Scholarship applications are submitted alongside your programme application. You will need to provide your academic transcripts, a personal statement, a creative portfolio (for merit-based awards), and financial documentation (for need-based aid). The admissions team reviews applications on a rolling basis, and successful candidates are notified within two weeks of submission.'
    },
    {
      q: 'What happens if I miss a payment?',
      a: 'If you anticipate difficulty making a payment, please contact the Finance Office as early as possible. ADMI offers a grace period and can work with you to arrange a revised payment schedule. Continued non-payment may result in a temporary hold on access to certain facilities until the account is brought up to date.'
    },
    {
      q: 'Is there a refund policy?',
      a: 'Yes. ADMI offers a structured refund policy. If you withdraw within the first two weeks of a semester, you are eligible for a full refund minus an administrative fee. Partial refunds are available for withdrawals within the first month. After the first month, fees are non-refundable. Full details are available in your enrolment agreement and the fee structure document.'
    }
  ],
  seoTitle: 'Financial Planning',
  seoDescription:
    'Transparent fee structures, flexible payment plans, and scholarship opportunities at ADMI. Download programme-specific fee guides and plan your investment in a creative career.',
  seoKeywords:
    'ADMI fees, tuition fees Kenya, creative education cost, ADMI scholarships, payment plans, financial aid, Woolf University fees, BTEC fees'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('financialPlanningPage', 'page:financial-planning')

    if (!entry?.fields) {
      console.log('[Financial Planning API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      feeCards: fields.feeCards || FALLBACK_DATA.feeCards,
      paymentPlans: fields.paymentPlans || FALLBACK_DATA.paymentPlans,
      scholarships: fields.scholarships || FALLBACK_DATA.scholarships,
      faqItems: fields.faqItems || FALLBACK_DATA.faqItems,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription,
      seoKeywords: fields.seoKeywords || FALLBACK_DATA.seoKeywords
    })
  } catch (error: any) {
    console.error('[Financial Planning API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
