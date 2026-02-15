import { IndustryTrend } from '@/data/course-page-data'

type Props = {
  trends: IndustryTrend[]
}

export default function IndustryTrends({ trends }: Props) {
  if (!trends.length) return null

  return (
    <section className="section-padding bg-[#1A1A1A] text-white">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-label-dark">Industry Insights</span>
          <h2 className="section-heading-dark mt-2">Why This Career Matters</h2>
        </div>

        <div className="grid gap-8 border-t border-gray-800 pt-12 md:grid-cols-3">
          {trends.map((trend, index) => (
            <div key={index} className="group">
              <p className="mb-2 origin-left font-proxima text-5xl font-bold text-secondary transition-transform duration-300 group-hover:scale-110 md:text-6xl">
                {trend.stat}
              </p>
              <h4 className="mb-3 text-xl font-bold text-white">{trend.label}</h4>
              <p className="font-proxima text-lg leading-relaxed text-gray-400">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
