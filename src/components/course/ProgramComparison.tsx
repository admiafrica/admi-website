'use client'

import { useRouter } from 'next/router'
import { IconArrowRight, IconCheck, IconX } from '@tabler/icons-react'

type Props = {
  certificateSlug?: string
  diplomaSlug?: string
}

export default function ProgramComparison({ certificateSlug, diplomaSlug }: Props) {
  const router = useRouter()

  const comparisonData = [
    {
      feature: 'Duration',
      certificate: '4 months (1 term)',
      diploma: '2 years (4-5 semesters)',
      highlight: 'diploma'
    },
    {
      feature: 'Investment',
      certificate: 'KES 48,000 total',
      diploma: 'KES 400,000 - 500,000 total',
      highlight: 'certificate'
    },
    {
      feature: 'Monthly Equivalent',
      certificate: '~KES 12,000/month',
      diploma: '~KES 25,000/month',
      highlight: null
    },
    {
      feature: 'Certification Level',
      certificate: 'Certificate',
      diploma: 'Diploma + Woolf Pathway',
      highlight: 'diploma'
    },
    {
      feature: 'Expected Salary (Entry)',
      certificate: 'KES 25,000 - 80,000',
      diploma: 'KES 45,000 - 120,000',
      highlight: 'diploma'
    },
    {
      feature: 'Industry Internship',
      certificate: false,
      diploma: true,
      highlight: 'diploma'
    },
    {
      feature: 'Portfolio Projects',
      certificate: '2-3 projects',
      diploma: '10+ major projects',
      highlight: 'diploma'
    },
    {
      feature: 'Job Placement Support',
      certificate: 'Basic',
      diploma: 'Full career services',
      highlight: 'diploma'
    },
    {
      feature: 'Upgrade Path',
      certificate: 'Can upgrade to Diploma',
      diploma: 'Full program',
      highlight: null
    },
    {
      feature: 'Payment Plans',
      certificate: true,
      diploma: '50/30/20 split + 10% upfront discount',
      highlight: 'diploma'
    }
  ]

  const handleEnquiry = (type: 'certificate' | 'diploma') => {
    const query = router.query
    const slug = type === 'certificate' ? certificateSlug : diplomaSlug
    if (slug) {
      router.push({ pathname: `/courses/${slug}`, query })
    } else {
      router.push({ pathname: '/enquiry', query: { ...query, program: type } })
    }
  }

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
          <IconCheck size={12} />
        </span>
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-400">
          <IconX size={12} />
        </span>
      )
    }
    return <span className="text-sm">{value}</span>
  }

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Not Sure Which to Choose?
            </span>
            <h2 className="font-nexa text-xl font-black">Certificate vs Diploma Comparison</h2>
            <p className="mt-2 text-gray-500">Find the right program for your goals and budget</p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-[200px] border-r border-gray-200 px-4 py-3 text-left text-sm font-semibold">
                      Feature
                    </th>
                    <th className="w-[250px] border-r border-gray-200 px-4 py-3 text-left">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Certificate
                        </span>
                        <span className="text-sm text-gray-500">4 months</span>
                      </div>
                    </th>
                    <th className="w-[250px] px-4 py-3 text-left">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                          Diploma
                        </span>
                        <span className="text-sm text-gray-500">2 years</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="border-r border-gray-200 px-4 py-3 text-sm font-medium">{row.feature}</td>
                      <td
                        className={`border-r border-gray-200 px-4 py-3 ${row.highlight === 'certificate' ? 'bg-blue-50' : ''}`}
                      >
                        {renderValue(row.certificate)}
                      </td>
                      <td className={`px-4 py-3 ${row.highlight === 'diploma' ? 'bg-teal-50' : ''}`}>
                        {renderValue(row.diploma)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col items-center justify-around gap-6 bg-gray-50 p-6 sm:flex-row">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-500">Quick skills upgrade</span>
                <button
                  onClick={() => handleEnquiry('certificate')}
                  className="inline-flex items-center gap-2 rounded-md border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Choose Certificate
                  <IconArrowRight size={16} />
                </button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                  Recommended for Career Change
                </span>
                <button
                  onClick={() => handleEnquiry('diploma')}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Choose Diploma
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <p className="text-center text-sm text-gray-500">
            <strong>Pro tip:</strong> Start with a Certificate and upgrade to Diploma within 6 months - your full
            certificate fee (KES 48,000) will be credited!
          </p>
        </div>
      </div>
    </div>
  )
}
