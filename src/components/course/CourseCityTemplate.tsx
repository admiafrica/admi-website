import { useState } from 'react'
import Link from 'next/link'
import PageSEO from '@/components/shared/v3/PageSEO'

interface FAQ {
  question: string
  answer: string
}

interface CourseDetail {
  label: string
  value: string
  href?: string
}

export interface CourseCityTemplateProps {
  seo: {
    title: string
    description: string
    canonical: string
    keywords: string
  }
  courseName: string
  city: string
  pageTitle: string
  subtitle: string
  whyTitle: string
  highlights: string[]
  courseLink: string
  courseLinkText: string
  faqs?: FAQ[]
  details: CourseDetail[]
  jobMarketTitle: string
  jobMarketText: string
  ctaTitle: string
  ctaText: string
  ctaButtonText: string
  ctaButtonHref: string
}

export default function CourseCityTemplate({
  seo,
  courseName,
  city,
  pageTitle,
  subtitle,
  whyTitle,
  highlights,
  courseLink,
  courseLinkText,
  faqs,
  details,
  jobMarketTitle,
  jobMarketText,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonHref
}: CourseCityTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${courseName} Course in ${city}`,
    description: `Professional ${courseName} training in ${city}, Kenya. Learn industry-relevant skills with 90% job placement rate.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute',
      sameAs: 'https://admi.ac.ke'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'on-site',
      location: {
        '@type': 'Place',
        name: 'ADMI Nairobi Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 Kenyatta Avenue, 3rd Floor, Caxton House',
          addressLocality: 'Nairobi',
          addressCountry: 'Kenya'
        }
      }
    },
    offers: {
      '@type': 'Offer',
      description: 'Visit https://admi.africa/student-support#fees for current fee structure',
      priceCurrency: 'KES'
    }
  }

  return (
    <>
      <PageSEO title={seo.title} description={seo.description} canonical={seo.canonical} keywords={seo.keywords} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <div className="mx-auto max-w-5xl px-6 py-8 md:px-8">
        <h1 className="mb-4 text-center text-4xl font-semibold text-gray-900">{pageTitle}</h1>

        <p className="mb-8 text-center text-lg text-gray-500">{subtitle}</p>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Main content - left column */}
          <div className="w-full md:w-8/12">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">{whyTitle}</h2>

              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                {highlights.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>

              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="mb-2 font-medium text-gray-700">📚 Complete Course Information</p>
                <p className="mb-4 text-sm text-gray-700">
                  Get detailed curriculum, admission requirements, and enrollment information for our {courseName}{' '}
                  programme.
                </p>
                <Link
                  href={courseLink}
                  className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-center font-medium text-gray-900 transition hover:bg-gray-200"
                >
                  {courseLinkText}
                </Link>
              </div>
            </div>

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                  Frequently Asked Questions – {city} Students
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full cursor-pointer border-0 bg-transparent px-4 py-3 text-left font-medium text-gray-900"
                        aria-expanded={openFaq === i}
                      >
                        {faq.question}
                      </button>
                      {openFaq === i && (
                        <div className="border-t border-gray-200 px-4 py-3">
                          <p className="text-sm text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - right column */}
          <div className="w-full md:w-4/12">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Course Details</h3>

              {details.map((detail, i) => (
                <p key={i} className="mb-2 text-gray-700">
                  <strong>{detail.label}:</strong>{' '}
                  {detail.href ? (
                    <a href={detail.href} className="text-blue-700 hover:underline">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </p>
              ))}

              <Link
                href="/enquiry"
                className="mt-4 block w-full rounded-lg bg-brand-red px-4 py-2 text-center font-medium text-white transition hover:bg-[#a02630]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        <h2 className="mb-4 mt-8 text-3xl font-semibold text-gray-900">{jobMarketTitle}</h2>

        <p className="text-gray-700">{jobMarketText}</p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">{ctaTitle}</h3>
          <p className="mb-4 text-gray-700">{ctaText}</p>
          <Link
            href={ctaButtonHref}
            className="block w-full rounded-lg bg-brand-red px-4 py-3 text-center text-lg font-medium text-white transition hover:bg-[#a02630]"
          >
            {ctaButtonText}
          </Link>
        </div>
      </div>
    </>
  )
}
