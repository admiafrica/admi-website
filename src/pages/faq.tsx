import { useState } from 'react'
import Link from 'next/link'
import { IconBrandWhatsapp, IconMail, IconPlus, IconMinus } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import FAQSchema from '@/components/seo/FAQSchema'
import { getEntriesCached } from '@/utils/contentful-cached'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FaqEntry {
  question: string
  answer: string
  category: string
  sortOrder?: number
}

type FaqData = Record<string, FaqEntry[]>

const CATEGORIES = ['All', 'General', 'Admissions', 'Fees & Payment', 'Student Life', 'Programmes']

/* ------------------------------------------------------------------ */
/*  Fallback data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_DATA: FaqData = {
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

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

interface FaqPageProps {
  faqData: FaqData
}

export const getStaticProps: GetStaticProps<FaqPageProps> = async () => {
  let faqData = FALLBACK_DATA

  try {
    const entries = await getEntriesCached('pageFaq', 'page:faqs', 'order=fields.sortOrder')

    if (entries && entries.length > 0) {
      const grouped: FaqData = {}
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
      faqData = grouped
    }
  } catch (error) {
    console.error('[FAQ Page] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { faqData },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FAQPage({ faqData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  // Flatten all FAQs for schema and "All" view
  const allFaqs = Object.values(faqData).flat()

  // Filter categories to show
  const visibleCategories =
    activeCategory === 'All'
      ? CATEGORIES.filter((c) => c !== 'All' && faqData[c]?.length)
      : [activeCategory].filter((c) => faqData[c]?.length)

  return (
    <MainLayout footerBgColor="#002A23">
      <PageSEO
        title="FAQ | Frequently Asked Questions | ADMI"
        description="Find answers to common questions about ADMI programmes, admissions, fees, student life, and more. Get the information you need to start your creative career."
      />
      <FAQSchema questions={allFaqs} />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="bg-[#0A0A0A] px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#8EBFB0]" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[3px] text-[#8EBFB0]">
                Support
              </span>
            </div>
            <h1 className="font-nexa text-4xl font-bold leading-tight text-white md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-5 max-w-[700px] font-proxima text-lg leading-relaxed text-[#9CA3AF]">
              Find answers to common questions about our programmes, admissions, fees and student life at ADMI.
            </p>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="bg-[#0A0A0A] px-4 pb-12 md:px-8">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={`rounded-full px-5 py-2.5 font-proxima text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#C1272D] text-white'
                    : 'border border-[#2A2A2A] text-[#9CA3AF] hover:border-[#444] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section className="bg-[#0A0A0A] px-4 pb-20 pt-4 md:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {visibleCategories.map((category) => (
              <div key={category}>
                <p className="mb-4 font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-[#8EBFB0]">
                  {category}
                </p>
                <div className="border-t border-[#2A2A2A]">
                  {faqData[category]?.map((faq, idx) => {
                    const key = `${category}-${idx}`
                    const isOpen = openIndex === key
                    return (
                      <div key={key} className="border-b border-[#2A2A2A]">
                        <button
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                          onClick={() => setOpenIndex(isOpen ? null : key)}
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`font-proxima text-[17px] font-semibold ${isOpen ? 'text-white' : 'text-[#E0E0E0]'}`}
                          >
                            {faq.question}
                          </span>
                          <span className="flex-shrink-0">
                            {isOpen ? (
                              <IconMinus size={20} className="text-[#8EBFB0]" />
                            ) : (
                              <IconPlus size={20} className="text-[#9CA3AF]" />
                            )}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="pb-5">
                            <p className="font-proxima text-[15px] leading-[1.7] text-[#9CA3AF]">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-[#002A23] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-nexa text-3xl font-bold text-white md:text-4xl">Still have questions?</h2>
            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[17px] leading-relaxed text-[#9CA3AF]">
              Our admissions team is here to help you with any questions about programmes, fees, or student life.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/254741132751?text=Hi%20ADMI%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3 font-proxima text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <IconBrandWhatsapp size={20} />
                Chat with Admissions
              </a>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2.5 rounded-lg border border-white/30 px-6 py-3 font-proxima text-[15px] font-semibold text-white transition-colors hover:border-white/60"
              >
                <IconMail size={18} />
                Email Admissions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
