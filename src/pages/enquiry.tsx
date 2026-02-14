import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { EnhancedEnquiryForm } from '@/components/forms/EnhancedEnquiryForm'

export default function EnquiryPage() {
  return (
    <MainLayout minimizeHeader minimizeFooter footerBgColor="#0A0A0A">
      <PageSEO title="Enquiry" description="Start your ADMI application by submitting your enquiry." />
      <div className="w-full">
        <section className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/enquiry</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Tell Us About Your Learning Goals</h1>
            <p className="max-w-[780px] pt-4 font-nexa text-[18px] text-white/85">Our admissions team will help match you with the right programme and intake.</p>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
          <EnhancedEnquiryForm />
        </section>
      </div>
    </MainLayout>
  )
}
