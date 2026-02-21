import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentExperienceStudiosPage() {
  return (
    <MainLayout footerBgColor="white" heroOverlap>
      <PageSEO title="Student Experience: Studios" description="Professional creative studios at ADMI." />

      <div className="bg-[#0A1A18] px-4 pb-16 pt-28 text-white md:pt-32 xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">
            /student-experience/studios
          </p>
          <h1 className="pt-4 font-proxima text-[46px] font-bold">Studios</h1>
          <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
            Professional studio spaces that support course projects, portfolio outcomes, and collaborative production.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
        <div className="rounded-xl border border-[#E8E8E8] bg-white p-6">
          <h2 className="font-proxima text-[34px] font-bold text-[#171717]">Studio Features</h2>
          <ul className="pt-4 font-nexa text-[15px] leading-[1.7] text-[#555]">
            <li>Audio and video production setups for practical assignments.</li>
            <li>Live project execution with mentor feedback cycles.</li>
            <li>Workflow practices that mirror industry environments.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}
