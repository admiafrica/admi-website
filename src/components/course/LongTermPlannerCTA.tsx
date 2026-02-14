import { IconClock } from '@tabler/icons-react'

/**
 * Long-Term Planner CTA - Segment D
 * Targets 31% of visitors planning for future intakes
 */
export function LongTermPlannerCTA() {
  return (
    <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1" style={{ flex: '1 1 300px' }}>
          <div className="flex flex-wrap gap-1">
            <IconClock size={20} color="#087f5b" />
            <span className="inline-flex items-center rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Next Intake: March 2026
            </span>
          </div>

          <p className="text-lg font-semibold text-gray-700" style={{ color: '#087f5b' }}>
            Planning ahead? Drive your future with our Career Assessment
          </p>

          <p className="text-sm text-gray-500">
            Capture personalized recommendations • Discover financing options • Secure early bird discounts
          </p>
        </div>

        <div className="flex flex-wrap gap-2" style={{ flex: '0 0 auto' }}>
          <a
            href="/career-assessment"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-100 px-4 py-2 font-medium text-teal-900 transition"
          >
            <IconClock size={18} />
            Take Quiz (2 min)
          </a>
        </div>
      </div>
    </div>
  )
}
