import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentPortalPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Portal" description="Student portal access and support information." />
      <section className="w-full">
        <div className="bg-[#F3F4F6] px-4 py-16 xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#666]">/student-portal</p>
            <h1 className="pt-4 font-fraunces text-[46px] font-bold text-[#171717]">Student Portal</h1>
            <p className="max-w-[760px] pt-4 font-nexa text-[17px] text-[#555]">Access learning systems, student records, support requests, and academic updates.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
