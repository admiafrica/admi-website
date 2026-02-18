import React, { useState } from 'react'
import { IconChevronDown, IconSchool, IconBriefcase, IconCertificate } from '@tabler/icons-react'
import {
  GENERAL_DIPLOMA_FAQS,
  FILM_TELEVISION_FAQS,
  ANIMATION_VFX_FAQS,
  GRAPHIC_DESIGN_FAQS,
  AUDIO_PRODUCTION_FAQS,
  PHOTOGRAPHY_FAQS
} from '@/data/_archived/diploma-faqs'

interface DiplomaFAQSectionProps {
  programType?: 'film-television' | 'animation-vfx' | 'graphic-design' | 'audio-production' | 'photography'
  showGeneralFAQs?: boolean
  maxFAQs?: number
}

export function DiplomaFAQSection({ programType, showGeneralFAQs = true, maxFAQs = 10 }: DiplomaFAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  // Get program-specific FAQs
  const getProgramFAQs = () => {
    switch (programType) {
      case 'film-television':
        return FILM_TELEVISION_FAQS
      case 'animation-vfx':
        return ANIMATION_VFX_FAQS
      case 'graphic-design':
        return GRAPHIC_DESIGN_FAQS
      case 'audio-production':
        return AUDIO_PRODUCTION_FAQS
      case 'photography':
        return PHOTOGRAPHY_FAQS
      default:
        return []
    }
  }

  // Combine general and program-specific FAQs
  const allFAQs = [...(showGeneralFAQs ? GENERAL_DIPLOMA_FAQS : []), ...getProgramFAQs()]

  // Filter FAQs by category
  const filteredFAQs =
    activeCategory === 'all'
      ? allFAQs.slice(0, maxFAQs)
      : allFAQs.filter((faq) => faq.category === activeCategory).slice(0, maxFAQs)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allFAQs.map((faq) => faq.category)))]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Career Prospects':
        return <IconBriefcase size={16} />
      case 'Accreditation & Recognition':
        return <IconCertificate size={16} />
      case 'Course Content & Structure':
        return <IconSchool size={16} />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Career Prospects':
        return 'green'
      case 'Accreditation & Recognition':
        return 'blue'
      case 'Course Content & Structure':
        return 'orange'
      case 'Fees & Payment':
        return 'red'
      case 'Admission Requirements':
        return 'purple'
      default:
        return 'gray'
    }
  }

  const getCategoryButtonClass = (category: string, isActive: boolean) => {
    if (isActive) {
      return 'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition bg-gray-900 text-white'
    }
    return 'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition border border-gray-400 bg-white text-gray-900'
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <p className="mx-auto max-w-[600px] text-lg text-gray-500">
          Get answers to common questions about our diploma programs, admission requirements, career prospects, and
          student support services.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap justify-center gap-1">
        {categories.map((category) => (
          <button
            key={category}
            className={getCategoryButtonClass(category, activeCategory === category)}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryIcon(category)}
            {category === 'all' ? 'All Questions' : category}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        {filteredFAQs.map((faq, index) => {
          const value = `faq-${index}`
          const isOpen = openFaq === value
          return (
            <div key={index} className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : value)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium hover:bg-gray-50"
              >
                <div className="flex w-full flex-wrap flex-nowrap justify-between">
                  <div>
                    <p className="font-medium text-gray-700">{faq.question}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-${getCategoryColor(faq.category)}-100 text-${getCategoryColor(faq.category)}-800 mt-1`}
                    >
                      {faq.category}
                    </span>
                  </div>
                </div>
                <IconChevronDown
                  size={16}
                  className={`ml-2 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <p className="text-sm text-gray-700" style={{ lineHeight: 1.6 }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-12 rounded-lg bg-gray-50 p-8 text-center">
        <h3 className="mb-4 text-2xl font-semibold text-gray-900">Still Have Questions?</h3>
        <p className="mb-6 text-gray-500">
          Our admissions team is here to help you make the right choice for your career.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 font-medium text-white transition">
            Contact Admissions
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-6 py-3 font-medium text-gray-900 transition">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  )
}

// Simplified FAQ component for course pages
export function CourseFAQs({ faqs, programType }: { faqs: any[]; programType?: string }) {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  if (!faqs || faqs.length === 0) {
    // Show default diploma FAQs if no course-specific FAQs
    return <DiplomaFAQSection programType={programType as any} showGeneralFAQs={true} maxFAQs={8} />
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">Course FAQs</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const value = `course-faq-${index}`
          const isOpen = openFaq === value
          return (
            <div key={index} className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : value)}
                className="w-full px-4 py-3 text-left font-medium"
              >
                <p className="font-medium text-gray-700">{faq.fields?.question || faq.question}</p>
              </button>
              {isOpen && (
                <div className="border-t border-gray-200 px-4 py-3">
                  <p className="text-sm text-gray-700" style={{ lineHeight: 1.6 }}>
                    {faq.fields?.answer || faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
