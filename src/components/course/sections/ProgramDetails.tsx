interface ProgramDetailsProps {
  details: { label: string; value: string }[]
  learningOutcomes: string[]
}

export default function ProgramDetails({ details, learningOutcomes }: ProgramDetailsProps) {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-20" aria-label="Program details">
      <div className="mx-auto max-w-screen-xl">
        <span className="section-label-light">Course Information</span>
        <h2 className="section-heading-light mb-10">Program Details</h2>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {details.map((detail, index) => (
            <div
              key={`detail-${index}`}
              className="rounded-xl border border-gray-200 bg-[#f9f9f9] p-6 shadow-md transition-shadow hover:shadow-xl"
            >
              <span className="mb-1 block font-nexa text-xs font-black uppercase tracking-wider text-admiDarkOrange">
                {detail.label}
              </span>
              <p className="font-proxima text-lg font-bold text-gray-900">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* Learning Outcomes - Full Width Card */}
        {learningOutcomes.length > 0 && (
          <div className="mt-4 rounded-xl bg-brand-red p-8">
            <h3 className="mb-6 font-nexa text-sm font-black uppercase tracking-wider text-white">Learning Outcomes</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {learningOutcomes.map((outcome, index) => (
                <li
                  key={`outcome-${index}`}
                  className="flex items-start gap-3 font-proxima text-base leading-relaxed text-white"
                >
                  <svg
                    className="mt-1 h-4 w-4 flex-shrink-0 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
