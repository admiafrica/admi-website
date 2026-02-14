import { getEntriesCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

interface FaqEntry {
  question: string
  answer: string
  category: string
  sortOrder?: number
}

// Static fallback data
const FALLBACK_DATA: Record<string, FaqEntry[]> = {
  General: [
    {
      question: 'What is ADMI?',
      answer:
        'ADMI (Africa Digital Media Institute) is East Africa\u2019s leading creative media and technology institute. Founded in 2011, we offer accredited diploma programmes, professional certificates, and foundation certificates in film, animation, design, music production, gaming, and more.',
      category: 'General',
      sortOrder: 1
    },
    {
      question: 'Where is ADMI located?',
      answer:
        'Our campus is located at Caxton House, 3rd Floor, Kenyatta Avenue in Nairobi CBD, Kenya. We\u2019re right next to the General Post Office \u2014 very accessible by public transport.',
      category: 'General',
      sortOrder: 2
    },
    {
      question: 'Is ADMI accredited?',
      answer:
        'Yes. ADMI is registered with TVETA Kenya, offers EU-accredited credits through Woolf University (ECTS), and our professional certificates are Pearson BTEC certified.',
      category: 'General',
      sortOrder: 3
    },
    {
      question: 'What intakes are available?',
      answer:
        'We have three intake windows per year: January, May, and September. The next available intakes are May 2026 and September 2026.',
      category: 'General',
      sortOrder: 4
    }
  ],
  Admissions: [
    {
      question: 'What are the entry requirements?',
      answer:
        'Requirements vary by programme level. Diploma programmes generally require a KCSE certificate (C- and above) or equivalent. Professional certificates require at least a KCSE certificate. Foundation certificates are open to anyone 16+ with a passion for creative media.',
      category: 'Admissions',
      sortOrder: 5
    },
    {
      question: 'How do I apply?',
      answer:
        'You can apply online through our website by visiting the Apply page, or by contacting our admissions team via WhatsApp at +254 741 132 751. The application process takes about 10 minutes.',
      category: 'Admissions',
      sortOrder: 6
    },
    {
      question: 'Can international students apply?',
      answer:
        'Absolutely. We welcome students from across Africa and beyond. International students may need a student visa \u2014 our admissions team can guide you through the process and provide supporting documentation.',
      category: 'Admissions',
      sortOrder: 7
    },
    {
      question: 'What documents do I need?',
      answer:
        'You\u2019ll need a copy of your national ID or passport, academic certificates (KCSE or equivalent), and a recent passport-size photo. Some programmes may also require a portfolio or creative work samples.',
      category: 'Admissions',
      sortOrder: 8
    }
  ],
  'Fees & Payment': [
    {
      question: 'How much are the tuition fees?',
      answer:
        'Fees vary by programme. Diploma programmes start from KES 15,000/month (18 months), professional certificates from KES 8,500/month (6 months), and foundation certificates from KES 5,000/month (3 months). Visit our Financial Planning page for detailed breakdowns.',
      category: 'Fees & Payment',
      sortOrder: 9
    },
    {
      question: 'Are payment plans available?',
      answer:
        'Yes. We offer flexible monthly payment plans for all programmes. You can spread your fees across the duration of your programme with no interest or hidden charges.',
      category: 'Fees & Payment',
      sortOrder: 10
    },
    {
      question: 'Are there scholarships?',
      answer:
        'Yes, ADMI offers merit-based and need-based scholarships. We also partner with organisations like Google.org and GOYN for sponsored training opportunities. Contact admissions to learn about current scholarship windows.',
      category: 'Fees & Payment',
      sortOrder: 11
    },
    {
      question: 'What is the refund policy?',
      answer:
        'ADMI has a structured refund policy. Full refunds are available within the first week of classes. After that, refunds are prorated based on the time enrolled. Contact our finance team for specific details.',
      category: 'Fees & Payment',
      sortOrder: 12
    }
  ],
  'Student Life': [
    {
      question: 'What facilities does ADMI have?',
      answer:
        'Our campus features professional film and music studios, Mac and PC labs with industry-standard software, an equipment vault with cameras and audio gear, collaborative creative spaces, and a resource library.',
      category: 'Student Life',
      sortOrder: 13
    },
    {
      question: 'Is there student support available?',
      answer:
        'Yes. ADMI provides academic advising, wellness resources, career coaching, accessibility services, and psycho-social support. We also have dedicated student support staff available during office hours.',
      category: 'Student Life',
      sortOrder: 14
    },
    {
      question: 'Are there events and networking opportunities?',
      answer:
        'Regularly. We host student showcases, film screenings, hackathons, industry guest talks, and networking events that connect students with professionals in creative industries across Africa.',
      category: 'Student Life',
      sortOrder: 15
    },
    {
      question: 'Does ADMI offer accommodation?',
      answer:
        'While ADMI doesn\u2019t have on-campus housing, we help students find affordable accommodation options near the campus. Our student support team can guide you through finding suitable housing in Nairobi.',
      category: 'Student Life',
      sortOrder: 16
    }
  ],
  Programmes: [
    {
      question: 'What programmes does ADMI offer?',
      answer:
        'We offer diploma programmes (18 months) in Film Production, Music Production, and Animation; professional certificates (6 months) in Graphic Design, Digital Marketing, Sound Engineering, UI/UX Design, and more; plus foundation certificates (3 months) for beginners.',
      category: 'Programmes',
      sortOrder: 17
    },
    {
      question: 'Is online learning available?',
      answer:
        'Yes. Many of our programmes include a hybrid delivery model combining on-campus studio sessions with online learning components. This provides flexibility while ensuring hands-on practical experience.',
      category: 'Programmes',
      sortOrder: 18
    },
    {
      question: 'Do programmes include practical projects?',
      answer:
        'Absolutely. ADMI\u2019s learning model is project-based. Students work on real industry briefs, build portfolios, and complete capstone projects. Many students leave with professional-quality work they can show employers.',
      category: 'Programmes',
      sortOrder: 19
    },
    {
      question: 'Can I transfer credits to other universities?',
      answer:
        'Our diploma programmes offer EU-accredited ECTS credits through Woolf University, which can be recognised by universities worldwide. Contact admissions for specific credit transfer guidance.',
      category: 'Programmes',
      sortOrder: 20
    }
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entries = await getEntriesCached('pageFaq', 'page:faqs', 'order=fields.sortOrder')

    if (!entries || entries.length === 0) {
      console.log('[FAQ API] No CMS entries found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    // Group by category
    const grouped: Record<string, FaqEntry[]> = {}
    for (const entry of entries) {
      const f = entry.fields
      const category = f.category || 'General'
      if (!grouped[category]) grouped[category] = []
      grouped[category].push({
        question: f.question,
        answer: f.answer,
        category,
        sortOrder: f.sortOrder
      })
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(grouped)
  } catch (error: any) {
    console.error('[FAQ API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
