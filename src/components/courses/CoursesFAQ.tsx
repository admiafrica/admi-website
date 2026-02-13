import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface CoursesFAQProps {
  faqs?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What are the entry requirements for diploma programmes?',
    answer:
      'Entry requirements vary by programme. Generally, diploma applicants need a KCSE certificate (C- or above) or equivalent. Some programmes may require a portfolio or creative aptitude assessment. Mature entry is also available for applicants with relevant work experience. Contact our admissions team for specific programme requirements.',
  },
  {
    question: 'How much does tuition cost and what payment plans are available?',
    answer:
      'Tuition fees depend on the programme and duration. ADMI offers flexible payment plans including monthly instalments starting from KES 15,000/month for diploma programmes. We also partner with financial institutions to provide education loans and accept HELB funding. Scholarships and bursaries are available for qualifying students.',
  },
  {
    question: 'Do I need prior experience in creative media to enroll?',
    answer:
      'No prior experience is required for most of our foundation and diploma programmes. Our curriculum is designed to take you from beginner to industry-ready. Certificate programmes may have prerequisites depending on the level. We assess your passion and commitment during the admissions process, not just your current skill level.',
  },
  {
    question: 'What career support does ADMI provide after graduation?',
    answer:
      'ADMI provides comprehensive career support including CV and portfolio workshops, interview preparation, industry networking events, and direct connections to hiring partners. Our Career Services team works with graduates for up to one year after completion. Over 80% of our graduates secure employment or launch freelance careers within six months of graduating.',
  },
  {
    question: 'When are the next intake dates?',
    answer:
      'ADMI runs three main intakes per year: January, May, and September. Some short certificate courses have rolling admissions with more frequent start dates. We recommend applying at least four weeks before your preferred intake date to allow time for the admissions process. Early application is encouraged as popular programmes fill up quickly.',
  },
]

export default function CoursesFAQ({ faqs = defaultFAQs }: CoursesFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!faqs.length) return null

  return (
    <section
      aria-labelledby="courses-faq-heading"
      className="w-full bg-[#f9f9f9] px-4 py-12 md:px-20 md:py-20"
    >
      {/* Header */}
      <div className="mx-auto max-w-[800px] text-center">
        <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-[#BA2E36]">
          ADMISSIONS
        </span>
        <h2
          id="courses-faq-heading"
          className="font-nexa mt-3 text-4xl font-black text-[#171717]"
        >
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ List */}
      <div className="mx-auto mt-12 max-w-[800px]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const isLast = index === faqs.length - 1

          return (
            <div
              key={`courses-faq-${index}`}
              className={!isLast ? 'border-b border-[#e0e0e0]' : ''}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`courses-faq-answer-${index}`}
              >
                <span className="font-proxima text-base font-semibold text-[#171717]">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 text-2xl leading-none text-[#999]"
                  aria-hidden="true"
                >
                  {isOpen ? '\u2212' : '+'}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`courses-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`courses-faq-question-${index}`}
                  className="py-2"
                >
                  <p className="font-proxima text-sm leading-relaxed text-[#666]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
