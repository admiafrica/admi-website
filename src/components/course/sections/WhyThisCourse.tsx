interface Benefit {
  title: string
  description: string
  icon: string
}

interface WhyThisCourseProps {
  benefits: Benefit[]
}

export default function WhyThisCourse({ benefits }: WhyThisCourseProps) {
  if (!benefits.length) return null

  return (
    <section className="w-full bg-[#f9f9f9] px-4 py-20 md:px-20">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-light">Why Choose This Program</span>
          <h2 className="section-heading-light">What You&apos;ll Gain</h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="rounded-2xl border border-[#eeeeee] bg-white p-7 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <span className="mb-3 block text-[32px]" aria-hidden="true">
                {benefit.icon}
              </span>
              <h3 className="mb-3 font-proxima text-lg font-bold text-[#171717]">{benefit.title}</h3>
              <p className="font-proxima text-[15px] leading-[1.6] text-[#666666]">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
