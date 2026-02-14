import { IconArrowRight, IconArrowDown } from '@tabler/icons-react'

const STEPS = [
  {
    number: '1',
    circleBg: 'bg-brand-red',
    numberColor: 'text-white',
    title: 'ADMI Diploma',
    detail: '18 months of intensive hands-on training with industry mentors',
    pill: '18 Months',
    pillText: 'text-brand-red',
    pillBg: 'bg-brand-red/[0.12]'
  },
  {
    number: '2',
    circleBg: 'bg-secondary',
    numberColor: 'text-admi-black',
    title: 'Woolf EU Credits',
    detail: 'Your diploma credits transfer via ECTS to European-standard degree programs',
    pill: 'Automatic Transfer',
    pillText: 'text-secondary',
    pillBg: 'bg-secondary/[0.12]'
  },
  {
    number: '3',
    circleBg: 'bg-brand-orange',
    numberColor: 'text-white',
    title: "Bachelor's Degree",
    detail: 'Complete your degree in just 1 more year \u2014 study while working full-time',
    pill: '1 Year While Working',
    pillText: 'text-brand-orange',
    pillBg: 'bg-brand-orange/[0.12]'
  }
] as const

export default function DegreePathway() {
  return (
    <section className="w-full bg-admi-black">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8 md:py-20">
        {/* Header */}
        <div className="mx-auto mb-14 flex max-w-[750px] flex-col items-center text-center">
          <span className="section-label-dark">Degree Pathway</span>
          <h2 className="section-heading-dark mb-4">From Diploma to Degree &mdash; Without Starting Over</h2>
          <p className="section-subheading-dark max-w-[650px]">
            Your ADMI diploma earns EU-accredited credits through Woolf University. Transfer directly toward a
            bachelor&apos;s degree &mdash; continue your studies while working.
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden items-center justify-center md:flex">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex items-center">
              {/* Step Card */}
              <div className="flex w-[320px] flex-col items-center gap-4 p-8">
                {/* Number Circle */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.circleBg}`}>
                  <span className={`font-nexa text-[28px] font-black ${step.numberColor}`}>{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="font-proxima text-xl font-bold text-white">{step.title}</h3>

                {/* Detail */}
                <p className="max-w-[250px] text-center font-proxima text-sm leading-relaxed text-[#999]">
                  {step.detail}
                </p>

                {/* Duration Pill */}
                <span
                  className={`rounded-full px-5 py-2 font-proxima text-[13px] font-bold ${step.pillText} ${step.pillBg}`}
                >
                  {step.pill}
                </span>
              </div>

              {/* Arrow (not after last item) */}
              {index < STEPS.length - 1 && (
                <div className="flex shrink-0 items-center px-2">
                  <IconArrowRight size={32} className="text-secondary" stroke={2} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Steps - Mobile */}
        <div className="flex flex-col items-center md:hidden">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              {/* Step Card */}
              <div className="flex flex-col items-center gap-4 px-4 py-6">
                {/* Number Circle */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.circleBg}`}>
                  <span className={`font-nexa text-[28px] font-black ${step.numberColor}`}>{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="font-proxima text-xl font-bold text-white">{step.title}</h3>

                {/* Detail */}
                <p className="max-w-[280px] text-center font-proxima text-sm leading-relaxed text-[#999]">
                  {step.detail}
                </p>

                {/* Duration Pill */}
                <span
                  className={`rounded-full px-5 py-2 font-proxima text-[13px] font-bold ${step.pillText} ${step.pillBg}`}
                >
                  {step.pill}
                </span>
              </div>

              {/* Down Arrow (not after last item) */}
              {index < STEPS.length - 1 && (
                <div className="flex items-center py-2">
                  <IconArrowDown size={32} className="text-secondary" stroke={2} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
