'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconPlus, IconMinus, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'

const WHATSAPP_URL =
  'https://wa.me/254711082222?text=Hi%20ADMI%2C%20I%20have%20a%20question%20about%20your%20programmes.'

const faqs = [
  {
    question: 'Is ADMI\u2019s qualification recognised by employers?',
    answer:
      'Yes. Our diploma programmes carry EU-accredited credits through Woolf University via the ECTS framework, and we are registered with TVETA Kenya. Our graduates work at leading companies across East Africa including Safaricom, NMG, and Standard Group.'
  },
  {
    question: 'Can I study while working?',
    answer:
      'Absolutely. Our hybrid model combines live online sessions (which are recorded for replay) with scheduled on-campus practicals. Most students successfully balance study with part-time or full-time work.'
  },
  {
    question: 'What are the payment options?',
    answer:
      'We offer flexible payment plans including monthly instalments for diploma programmes and lump-sum or split payments for certificates. No hidden fees \u2014 what you see is what you pay.'
  },
  {
    question: 'Do I need prior experience?',
    answer:
      'Foundation certificates require no prior experience at all \u2014 they are designed for complete beginners. Professional certificates also welcome newcomers. Diploma programmes require a KCSE certificate or equivalent.'
  },
  {
    question: 'What happens after I graduate?',
    answer:
      'Diploma students complete a mandatory industry internship before graduating. Our career services team supports all graduates with job placement, portfolio reviews, and employer introductions. 88% of diploma graduates are employed within 6 months.'
  },
  {
    question: 'How does the degree pathway work?',
    answer:
      'Your ADMI diploma credits transfer automatically to Woolf University through the ECTS framework. You can then complete a full bachelor\u2019s degree in just one additional year \u2014 studying online while working.'
  },
  {
    question: 'What equipment do I need?',
    answer:
      'For online sessions, you need a laptop or desktop with a stable internet connection. All specialist equipment \u2014 cameras, studio gear, editing suites \u2014 is available at our Nairobi campus during practical sessions.'
  }
]

export default function QuickQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-[600px] text-center md:mb-12">
          <span className="section-label-light">QUICK QUESTIONS</span>
          <h2 className="section-heading-light">Everything You Need to Know</h2>
          <p className="section-subheading-light mt-4">
            Answers to the most common questions from prospective students.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl space-y-2.5 md:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="bg-white shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
                <button
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[#fafafa] md:gap-6 md:px-7 md:py-5"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-proxima text-[14px] font-semibold text-[#171717] md:text-[15px]">
                    {faq.question}
                  </span>
                  <span className="bg-brand-red/8 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-red md:h-8 md:w-8">
                    {isOpen ? <IconMinus size={16} stroke={2.5} /> : <IconPlus size={16} stroke={2.5} />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-200 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-3.5 md:px-7 md:pb-5">
                      <p className="font-proxima text-[13px] leading-[1.65] text-[#333] md:text-[14px] md:leading-[1.7]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] sm:mt-10 sm:flex-row sm:justify-center sm:gap-4 sm:p-7">
          <span className="font-proxima text-[14px] font-semibold text-[#171717]">Still have questions?</span>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !h-9 !px-4 !text-[12px]"
            >
              <IconBrandWhatsapp size={18} />
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline !h-9 !px-4 !text-[12px]">
              <IconPhone size={18} />
              Schedule a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
