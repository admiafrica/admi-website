import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentExperienceLabsPage() {
  return (
    <MainLayout footerBgColor="white" heroOverlap>
      <PageSEO title="Student Experience: The Labs" description="Specialized labs and production technology at ADMI." />

      <div className="bg-admi-black px-4 pb-16 pt-28 text-white md:pt-32 xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">
            /student-experience/campus/the-labs
          </p>
          <h1 className="pt-4 font-proxima text-[46px] font-bold">The Labs</h1>
          <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
            Hands-on environments for editing, VFX, sound design, animation, and cross-disciplinary production
            workflows.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
        <div className="rounded-xl border border-[#E8E8E8] bg-white p-6">
          <h2 className="font-proxima text-[34px] font-bold text-[#171717]">Lab Capabilities</h2>
          <ul className="pt-4 font-nexa text-[15px] leading-[1.7] text-[#555]">
            <li>Creative software pipelines across audio, video, motion, and design.</li>
            <li>Project collaboration with tutor support and peer review cycles.</li>
            <li>Applied practice aligned with industry briefs and production standards.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}
