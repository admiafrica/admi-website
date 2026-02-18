'use client'

import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'

interface FAQAccordionProps {
  faqs: { question: string; answer: string }[]
  courseName?: string
}

export default function FAQAccordion({ faqs, courseName }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

  if (!faqs.length) return null

  return (
    <section className="section-padding w-full bg-white" aria-label="Frequently asked questions">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left Column - Header */}
          <div>
            <span className="section-label-light">FAQs</span>
            <h2 className="section-heading-light mb-4">
              Common Questions About{' '}
              <span className="text-brand-red">{courseName || 'This Program'}</span>
            </h2>
            <p className="font-proxima text-[17px] leading-[1.6] text-[#666666]">
              Find answers to the most frequently asked questions about admissions, curriculum, fees, and career outcomes.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div 
                  key={`faq-${index}`} 
                  className={`overflow-hidden rounded-xl transition-all duration-200 ${
                    isOpen ? 'bg-[#faf7f5] shadow-sm' : 'bg-[#faf7f5] hover:bg-[#f5f0ec]'
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-proxima text-base font-bold text-[#171717]">{faq.question}</span>
                    <span 
                      className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-red' : 'text-gray-400'}`} 
                      aria-hidden="true"
                    >
                      <IconChevronDown size={20} />
                    </span>
                  </button>
                  <div 
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5">
                        <p className="font-proxima text-[15px] leading-[1.7] text-[#555555]">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
