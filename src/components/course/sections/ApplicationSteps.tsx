import Link from 'next/link'
import { trackCTAClick } from '@/utils/track-event'

interface ApplicationStepsProps {
  steps: { step: number; title: string; description: string }[]
  courseName?: string
}

export default function ApplicationSteps({ steps, courseName }: ApplicationStepsProps) {
  return (
    <section className="section-padding w-full bg-[#f9f9f9]" aria-label="Application steps">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-label-light">How To Apply</span>
          <h2 className="section-heading-light">3 Simple Steps to Get Started</h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
          {steps.map((item) => (
            <article
              key={`step-${item.step}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#eeeeee] bg-white p-7 text-center shadow-md transition-shadow hover:shadow-xl md:w-[380px]"
            >
              {/* Red circle with step number */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red" aria-hidden="true">
                <span className="font-proxima text-xl font-bold text-white">{item.step}</span>
              </div>

              <h3 className="font-proxima text-lg font-bold text-[#171717]">{item.title}</h3>

              <p className="font-proxima text-[15px] leading-[1.6] text-[#666666]">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Inline CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/enquiry"
            onClick={() => trackCTAClick('apply', 'application_steps', courseName)}
            className="inline-block rounded-lg bg-brand-red px-8 py-3 font-proxima text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  )
}
