import Link from 'next/link'
import { trackCTAClick } from '@/utils/track-event'

interface Career {
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface CareerOutcomesProps {
  careers: Career[]
  stats: Stat[]
  courseName?: string
}

export default function CareerOutcomes({ careers, stats, courseName }: CareerOutcomesProps) {
  // Filter out careers without both title and description
  const validCareers = careers.filter(c => c.title && c.description)

  // Hide section if fewer than 3 valid careers
  if (validCareers.length < 3) return null

  // Use only the first 3 stats for the stats row
  const displayStats = stats.slice(0, 3)

  // Find employment rate from stats for the description
  const employmentStat = stats.find(s => s.label.toLowerCase().includes('employment'))
  const salaryStat = stats.find(s => s.label.toLowerCase().includes('salary'))

  return (
    <section className="section-padding w-full bg-[#1a1a1a]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-dark">Career Outcomes</span>
          <h2 className="section-heading-dark mb-4">Where Our Graduates Work</h2>
          <p className="max-w-full font-proxima text-[17px] leading-[1.6] text-[#cccccc]">
            {employmentStat ? `${employmentStat.value} of our` : 'Our'}{courseName ? ` ${courseName}` : ''} graduates secure employment within 6 months.{salaryStat ? ` Average starting salary: KES ${salaryStat.value}/month.` : ''}
          </p>
        </div>

        {/* Career Cards */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {validCareers.map((career, index) => (
            <article key={index} className="rounded-xl bg-[#2a2a2a] p-6 shadow-md transition-shadow hover:shadow-lg">
              <h3 className="mb-2 font-proxima text-base font-bold text-white">{career.title}</h3>
              <p className="font-proxima text-sm leading-[1.5] text-[#999999]">{career.description}</p>
            </article>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex flex-col items-center justify-around gap-8 border-t border-gray-700 pt-12 md:flex-row">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-proxima text-5xl font-bold text-secondary">{stat.value}</p>
              <p className="mt-1 font-proxima text-sm text-[#999999]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Inline CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="font-proxima text-lg text-[#cccccc]">Start Your Creative Career</p>
          <Link
            href="/enquiry"
            onClick={() => trackCTAClick('apply', 'career_outcomes', courseName)}
            className="inline-block rounded-lg bg-brand-red px-8 py-3 font-proxima text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  )
}
