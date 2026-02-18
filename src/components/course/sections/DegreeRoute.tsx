interface Step {
  step: number
  title: string
  subtitle: string
  color: string
}

interface DegreeRouteProps {
  steps: Step[]
}

export default function DegreeRoute({ steps }: DegreeRouteProps) {
  const colors = ['#C1272D', '#171717', '#8EBFB0']

  return (
    <section className="section-padding w-full bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="section-label-light">Your Pathway to a Degree</span>
          <h2 className="section-heading-light mb-4">From Diploma to Degree &mdash; Without Starting Over</h2>
          <p className="mx-auto max-w-[800px] font-proxima text-[17px] leading-[1.7] text-[#555555]">
            Your ADMI diploma earns EU-accredited credits through our Woolf University partnership. These credits
            transfer directly toward a full bachelor&apos;s degree — meaning you can continue studying while working,
            without repeating what you&apos;ve already learned.
          </p>
        </div>

        {/* Steps Row */}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
          {steps.map((step, index) => {
            const bg = colors[index] || step.color
            const textColor = bg === '#8EBFB0' ? 'text-[#171717]' : 'text-white'
            const subtitleColor =
              bg === '#C1272D' ? 'text-white/80' : bg === '#8EBFB0' ? 'text-[#333333]' : 'text-[#999999]'

            return (
              <div key={step.step} className="flex w-full max-w-[320px] flex-col items-center md:max-w-none md:w-auto md:flex-row">
                {/* Step Card */}
                <div
                  className={`flex w-full flex-col items-center justify-center rounded-xl p-6 text-center md:w-[240px] ${textColor}`}
                  style={{ backgroundColor: bg }}
                >
                  <h3 className="mb-2 font-proxima text-base font-bold">{step.title}</h3>
                  <p className={`font-proxima text-[13px] ${subtitleColor}`}>{step.subtitle}</p>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <>
                    <span
                      className="hidden px-3 font-proxima text-[28px] font-bold text-brand-red md:block"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span
                      className="block w-full py-2 text-center font-proxima text-2xl text-brand-red md:hidden"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
