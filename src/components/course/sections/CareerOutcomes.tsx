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
}

export default function CareerOutcomes({ careers, stats }: CareerOutcomesProps) {
  if (!careers.length) return null

  // Use only the first 3 stats for the stats row
  const displayStats = stats.slice(0, 3)

  return (
    <section className="section-padding w-full bg-[#1a1a1a]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-dark">Career Outcomes</span>
          <h2 className="section-heading-dark mb-4">Where Our Graduates Work</h2>
          <p className="max-w-[800px] font-proxima text-[17px] leading-[1.6] text-[#cccccc]">
            85% of our film production graduates secure employment within 6 months. Average starting salary: KES
            75,000/month.
          </p>
        </div>

        {/* Career Cards */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {careers.map((career, index) => (
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
      </div>
    </section>
  )
}
