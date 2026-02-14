import Link from 'next/link'
import { IconChartBar } from '@tabler/icons-react'

/**
 * Researcher CTA - Segment C
 * Targets 18% of visitors in research/comparison phase
 */
export function ResearcherCTA() {
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1" style={{ flex: '1 1 300px' }}>
          <div className="flex flex-wrap gap-1">
            <IconChartBar size={20} color="#1971c2" />
            <p className="text-lg font-semibold text-gray-700" style={{ color: '#1971c2' }}>
              Not sure which program is right for you?
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Dive deep into price-to-value comparisons • Calculate lifetime earnings • Understand career trajectory
            differences
          </p>
        </div>

        <div className="flex flex-wrap gap-2" style={{ flex: '0 0 auto' }}>
          <Link
            href="/programs/diploma-vs-certificate"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 transition"
          >
            <IconChartBar size={18} />
            Compare Programs
          </Link>
        </div>
      </div>
    </div>
  )
}
