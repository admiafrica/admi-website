interface AssessmentBreakdownProps {
  methods: { percentage: string; title: string; description: string }[]
}

export default function AssessmentBreakdown({ methods }: AssessmentBreakdownProps) {
  if (!methods.length) return null

  return (
    <section className="w-full bg-white px-4 py-20 md:px-20" aria-label="Assessment breakdown">
      <div className="mx-auto max-w-screen-xl">
        <span className="section-label-light">Assessment</span>
        <h2 className="section-heading-light mb-4">How You&apos;ll Be Assessed</h2>
        <p className="mb-12 max-w-2xl font-proxima text-lg leading-relaxed text-gray-600">
          Our assessment framework is designed to evaluate your practical skills, creative thinking, and ability to
          deliver professional-quality work.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {methods.map((method, index) => (
            <div
              key={`method-${index}`}
              className="rounded-xl border border-gray-200 bg-[#f9f9f9] p-6 shadow-md transition-shadow hover:shadow-xl"
            >
              <span
                className="mb-2 block font-nexa font-black text-admiDarkOrange"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
                aria-label={`${method.percentage} of final grade`}
              >
                {method.percentage}
              </span>
              <h3 className="mb-2 font-nexa text-lg font-black text-gray-900">{method.title}</h3>
              <p className="font-proxima text-sm leading-relaxed text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
