interface Semester {
  number: number
  title: string
  modules: string[]
}

interface CurriculumOverviewProps {
  semesters: Semester[]
}

export default function CurriculumOverview({ semesters }: CurriculumOverviewProps) {
  if (!semesters.length) return null

  return (
    <section className="section-padding w-full bg-[#1a1a1a]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-dark">Curriculum</span>
          <h2 className="section-heading-dark">What You&apos;ll Learn</h2>
        </div>

        {/* Semester Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {semesters.map((semester) => (
            <article
              key={semester.number}
              className="rounded-xl bg-[#2a2a2a] p-6 shadow-md transition-shadow hover:shadow-lg md:p-7"
            >
              <span className="mb-2 inline-block font-proxima text-[13px] font-bold text-secondary">
                Semester {semester.number}
              </span>
              <h3 className="mb-2 font-proxima text-[17px] font-bold text-white">{semester.title}</h3>
              <p className="font-proxima text-sm leading-[1.6] text-[#999999]">{semester.modules.join(' \u2022 ')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
