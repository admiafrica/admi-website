import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentExperienceEquipmentPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Experience: Equipment" description="Equipment access and production resources at ADMI." />

      <div className="bg-[#0A3D3D] px-4 py-16 text-white xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">
            /student-experience/equipment
          </p>
          <h1 className="pt-4 font-proxima text-[46px] font-bold">Equipment Access</h1>
          <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
            Learners work with professional equipment and production tools as they progress through programme
            milestones.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
        <div className="rounded-xl border border-[#E8E8E8] bg-white p-6">
          <h2 className="font-proxima text-[34px] font-bold text-[#171717]">Equipment Model</h2>
          <ul className="pt-4 font-nexa text-[15px] leading-[1.7] text-[#555]">
            <li>Progressive access model from foundational tools to advanced kits.</li>
            <li>Availability aligned with course projects and assessment cycles.</li>
            <li>Support from technical staff and production supervisors.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}
