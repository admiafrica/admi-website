'use client'

import { useState } from 'react'

interface FAQAccordionProps {
  faqs: { question: string; answer: string }[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs.length) return null

  return (
    <section className="section-padding w-full bg-[#faf7f5]" aria-label="Frequently asked questions">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-label-light">Frequently Asked Questions</span>
          <h2 className="section-heading-light">Got Questions? We&apos;ve Got Answers</h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={`faq-${index}`} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <button
                className="flex w-full items-start justify-between gap-4 px-7 py-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-proxima text-base font-bold text-[#171717]">{faq.question}</span>
                <span className="mt-1 flex-shrink-0 text-brand-red" aria-hidden="true">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-7 pb-6">
                  <p className="font-proxima text-[15px] leading-[1.6] text-[#666666]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
