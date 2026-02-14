import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const faqItems = [
  ['What are the admission requirements?', 'Requirements depend on programme level, but generally include KCSE or equivalent and a completed application.'],
  ['Do you offer hybrid learning options?', 'Yes, many programmes include hybrid delivery with practical studio sessions and online learning components.'],
  ['How are fees structured?', 'Fees are provided by programme and intake, with payment plans available for eligible learners.'],
  ['Are students supported with career readiness?', 'Yes. Students receive portfolio guidance, mentorship, and internship support.']
]

export default function FAQPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Frequently Asked Questions" description="Answers to common questions about admissions, programmes, and fees at ADMI." />
      <div className="w-full">
        <section className="bg-[#0A3D3D] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/frequently-asked-questions</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold leading-[1.12]">Frequently Asked Questions</h1>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-4 py-12 xl:px-0">
          <div className="space-y-4">
            {faqItems.map(([q, a]) => (
              <details key={q} className="rounded-lg border border-[#E8E8E8] bg-white p-4">
                <summary className="cursor-pointer font-nexa text-[16px] font-bold text-[#171717]">{q}</summary>
                <p className="pt-3 font-nexa text-[15px] leading-[1.6] text-[#555]">{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="bg-[#F9F9F9] px-4 py-16 xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-fraunces text-[40px] font-bold text-[#171717]">Still Have a Question?</h2>
            <Link href="/contact" className="mt-7 inline-block rounded-lg border border-[#BA2E36] px-6 py-3 font-nexa text-[15px] font-bold text-[#BA2E36] hover:bg-[#BA2E36] hover:text-white">Contact ADMI</Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
