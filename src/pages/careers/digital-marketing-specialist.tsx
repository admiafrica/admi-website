import React from 'react'
import PageSEO from '../../components/shared/v3/PageSEO'

const DigitalMarketingSpecialistCareerGuide = () => {
  const careerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Digital Marketing Specialist Career Guide Kenya 2025',
    description:
      'Complete career guide for Digital Marketing Specialist in Kenya. Learn about salary, skills, job market, and education requirements.',
    author: {
      '@type': 'Organization',
      name: 'Africa Digital Media Institute'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ADMI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://admi.ac.ke/logo.png'
      }
    },
    datePublished: '2025-07-09T23:11:45.877Z',
    dateModified: '2025-07-09T23:11:45.878Z'
  }

  return (
    <>
      <PageSEO
        title="Digital Marketing Specialist Career Guide Kenya 2025 - ADMI"
        description="Complete Digital Marketing Specialist career guide for Kenya. Learn about salary ranges, required skills, job market trends, and how to start your career."
        canonical="https://admi.ac.ke/careers/digital-marketing-specialist"
        keywords="digital-marketing-specialist, career, kenya, salary, jobs, skills"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(careerSchema)
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-center text-4xl font-semibold text-gray-900">
          Digital Marketing Specialist Career Guide Kenya 2025
        </h1>

        <p className="mb-8 text-center text-lg text-gray-500">
          Everything you need to know about building a successful Digital Marketing Specialist career in Kenya
        </p>

        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">Job Market Overview</h2>
              <p className="text-gray-700">
                High demand with 300+ new positions monthly in Kenya&apos;s growing digital economy.
              </p>
            </div>

            <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">Required Skills</h2>
              <div className="mb-4 flex flex-wrap gap-1">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  SEO
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  Social Media
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  Google Ads
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  Analytics
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  Content Marketing
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">How to Start Your Career</h2>
              <ul className="list-disc pl-5">
                <li>Enroll in ADMI&apos;s Digital Marketing Diploma program</li>
                <li>Build a strong portfolio during your studies</li>
                <li>Complete internships with industry partners</li>
                <li>Network with professionals in the field</li>
                <li>Stay updated with industry trends and tools</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-4/12 md:pl-4">
            <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Salary Range</h3>
              <p className="text-xl font-bold text-gray-700">Competitive salary based on experience</p>
              <p className="text-sm text-gray-500">per month in Kenya</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Recommended Course</h3>
              <p className="mb-2 text-gray-700">Digital Marketing (Certificate, Diploma & Advanced Diploma)</p>
              <p className="text-sm text-gray-500">
                Get industry-relevant training and guaranteed job placement support
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DigitalMarketingSpecialistCareerGuide
