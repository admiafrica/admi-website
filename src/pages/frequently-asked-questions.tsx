'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconPlus, IconMinus, IconMessageCircle, IconMail } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getEntriesCached } from '@/utils/contentful-cached'
import type { FaqCategory, FaqItem } from '@/types/frequently-asked-questions'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const CATEGORIES: FaqCategory[] = ['General', 'Admissions', 'Fees & Payment', 'Student Life', 'Programmes']

const FALLBACK_FAQ: Record<string, FaqItem[]> = {
  General: [
    {
      q: 'What is ADMI?',
      a: 'ADMI (Africa Digital Media Institute) is East Africa\u2019s leading creative media and technology institute. Founded in 2011, we offer accredited diploma programmes, professional certificates, and foundation certificates in film, animation, design, music production, gaming, and more.'
    },
    {
      q: 'Where is ADMI located?',
      a: 'Our campus is located at Caxton House, 3rd Floor, Kenyatta Avenue in Nairobi CBD, Kenya. We\u2019re right next to the General Post Office \u2014 very accessible by public transport.'
    },
    {
      q: 'Is ADMI accredited?',
      a: 'Yes. ADMI is registered with TVETA Kenya, offers EU-accredited credits through Woolf University (ECTS), and our professional certificates are Pearson BTEC certified.'
    },
    {
      q: 'What intakes are available?',
      a: 'We have three intake windows per year: January, May, and September. The next available intakes are May 2026 and September 2026.'
    }
  ],
  Admissions: [
    {
      q: 'What are the entry requirements?',
      a: 'Requirements vary by programme level. Diploma programmes generally require a KCSE certificate (C- and above) or equivalent. Professional certificates require at least a KCSE certificate. Foundation certificates are open to anyone 16+ with a passion for creative media.'
    },
    {
      q: 'How do I apply?',
      a: 'You can apply online through our website by visiting the Apply page, or by contacting our admissions team via WhatsApp at +254 741 132 751. The application process takes about 10 minutes.'
    },
    {
      q: 'Can international students apply?',
      a: 'Absolutely. We welcome students from across Africa and beyond. International students may need a student visa \u2014 our admissions team can guide you through the process and provide supporting documentation.'
    },
    {
      q: 'What documents do I need?',
      a: 'You\u2019ll need a copy of your national ID or passport, academic certificates (KCSE or equivalent), and a recent passport-size photo. Some programmes may also require a portfolio or creative work samples.'
    }
  ],
  'Fees & Payment': [
    {
      q: 'How much are the tuition fees?',
      a: 'Fees vary by programme. Diploma programmes start from KES 15,000/month (18 months), professional certificates from KES 8,500/month (6 months), and foundation certificates from KES 5,000/month (3 months). Visit our Financial Planning page for detailed breakdowns.'
    },
    {
      q: 'Are payment plans available?',
      a: 'Yes. We offer flexible monthly payment plans for all programmes. You can spread your fees across the duration of your programme with no interest or hidden charges.'
    },
    {
      q: 'Are there scholarships?',
      a: 'Yes, ADMI offers merit-based and need-based scholarships. We also partner with organisations like Google.org and GOYN for sponsored training opportunities. Contact admissions to learn about current scholarship windows.'
    },
    {
      q: 'What is the refund policy?',
      a: 'ADMI has a structured refund policy. Full refunds are available within the first week of classes. After that, refunds are prorated based on the time enrolled. Contact our finance team for specific details.'
    }
  ],
  'Student Life': [
    {
      q: 'What facilities does ADMI have?',
      a: 'Our campus features professional film and music studios, Mac and PC labs with industry-standard software, an equipment vault with cameras and audio gear, collaborative creative spaces, and a resource library.'
    },
    {
      q: 'Is there student support available?',
      a: 'Yes. ADMI provides academic advising, wellness resources, career coaching, accessibility services, and psycho-social support. We also have dedicated student support staff available during office hours.'
    },
    {
      q: 'Are there events and networking opportunities?',
      a: 'Regularly. We host student showcases, film screenings, hackathons, industry guest talks, and networking events that connect students with professionals in creative industries across Africa.'
    },
    {
      q: 'Does ADMI offer accommodation?',
      a: 'While ADMI doesn\u2019t have on-campus housing, we help students find affordable accommodation options near the campus. Our student support team can guide you through finding suitable housing in Nairobi.'
    }
  ],
  Programmes: [
    {
      q: 'What programmes does ADMI offer?',
      a: 'We offer diploma programmes (18 months) in Film Production, Music Production, and Animation; professional certificates (6 months) in Graphic Design, Digital Marketing, Sound Engineering, UI/UX Design, and more; plus foundation certificates (3 months) for beginners.'
    },
    {
      q: 'Is online learning available?',
      a: 'Yes. Many of our programmes include a hybrid delivery model combining on-campus studio sessions with online learning components. This provides flexibility while ensuring hands-on practical experience.'
    },
    {
      q: 'Do programmes include practical projects?',
      a: 'Absolutely. ADMI\u2019s learning model is project-based. Students work on real industry briefs, build portfolios, and complete capstone projects. Many students leave with professional-quality work they can show employers.'
    },
    {
      q: 'Can I transfer credits to other universities?',
      a: 'Our diploma programmes offer EU-accredited ECTS credits through Woolf University, which can be recognised by universities worldwide. Contact admissions for specific credit transfer guidance.'
    }
  ]
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ faqData: Record<string, FaqItem[]> }> = async () => {
  let faqData = FALLBACK_FAQ

  try {
    const entries = await getEntriesCached('pageFaq', 'page:faqs', 'order=fields.sortOrder')

    if (entries && entries.length > 0) {
      const grouped: Record<string, FaqItem[]> = {}
      for (const entry of entries) {
        const f = entry.fields
        const category = f.category || 'General'
        if (!grouped[category]) grouped[category] = []
        grouped[category].push({
          q: f.question,
          a: f.answer
        })
      }
      faqData = grouped
    }
  } catch (error) {
    console.error('[FAQ] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { faqData },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#e8e8e8]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="font-proxima text-[16px] font-medium text-admi-black">{question}</span>
        {open ? (
          <IconMinus size={20} className="flex-shrink-0 text-[#999]" />
        ) : (
          <IconPlus size={20} className="flex-shrink-0 text-[#999]" />
        )}
      </button>
      {open && (
        <div className="pb-5">
          <p className="font-proxima text-[15px] leading-[1.7] text-[#555]">{answer}</p>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FAQPage({ faqData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('General')

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Frequently Asked Questions | ADMI"
        description="Find answers to common questions about ADMI programmes, admissions, fees, student life, and more."
      />

      <div className="w-full">
        {/* -- Hero -- */}
        <section className="bg-[#0A3D3D] px-4 py-20 text-center text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-[3px] w-8 bg-secondary" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-secondary">
                FAQ
              </span>
            </div>
            <h1 className="font-proxima mt-5 text-[48px] font-bold">Frequently Asked Questions</h1>
            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Find answers to common questions about ADMI programmes, admissions, fees and student life.
            </p>
          </div>
        </section>

        {/* -- Category Tabs -- */}
        <div className="border-b border-[#e8e8e8] bg-white px-4 xl:px-20">
          <div className="mx-auto flex w-full max-w-screen-xl gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-4 font-proxima text-[15px] transition ${
                  activeCategory === cat
                    ? 'border-b-[3px] border-brand-red font-semibold text-brand-red'
                    : 'font-medium text-[#666] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* -- FAQ Content -- */}
        <section className="bg-white px-4 py-12 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            {activeCategory === 'General' ? (
              /* Show all categories when on General */
              Object.entries(faqData)
                .filter(([key]) => key === 'General' || key === 'Admissions' || key === 'Fees & Payment')
                .map(([category, items]) => (
                  <div key={category} className="mb-12">
                    <div className="mb-4 flex items-center gap-2.5">
                      <span
                        className="h-[3px] w-6"
                        style={{
                          backgroundColor:
                            category === 'General' ? '#8EBFB0' : category === 'Admissions' ? '#C1272D' : '#EF7B2E'
                        }}
                      />
                      <span className="font-proxima text-[13px] font-bold uppercase tracking-[2px] text-[#0A3D3D]">
                        {category.toUpperCase()}
                      </span>
                    </div>
                    {items.map((item: FaqItem) => (
                      <FAQItem key={item.q} question={item.q} answer={item.a} />
                    ))}
                  </div>
                ))
            ) : (
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="h-[3px] w-6 bg-brand-red" />
                  <span className="font-proxima text-[13px] font-bold uppercase tracking-[2px] text-[#0A3D3D]">
                    {activeCategory.toUpperCase()}
                  </span>
                </div>
                {(faqData[activeCategory] || []).map((item: FaqItem) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="bg-[#F9F9F9] px-4 py-16 text-center xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-proxima text-[32px] font-bold text-admi-black">Still have questions?</h2>
            <p className="mt-2 font-proxima text-[16px] text-[#666]">
              Talk to our admissions team &mdash; we are happy to help.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://wa.me/254741132751"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-[10px] bg-brand-whatsapp px-7 py-3.5 font-proxima text-[15px] font-semibold text-white transition hover:bg-[#1da851]"
              >
                <IconMessageCircle size={18} /> WhatsApp Us
              </Link>
              <Link
                href="mailto:admissions@admi.ac.ke"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#0A3D3D] px-7 py-3.5 font-proxima text-[15px] font-semibold text-white transition hover:bg-[#072e2e]"
              >
                <IconMail size={18} /> Email Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
