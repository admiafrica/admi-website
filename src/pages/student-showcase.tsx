import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import StudentShowcaseSection from '@/components/homepage/StudentShowcase'

export default function StudentShowcasePage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Showcase" description="Explore standout ADMI student projects across film, animation, design, and music." />
      <section className="w-full bg-[#0A1A18] px-4 py-16 text-white xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-showcase</p>
          <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">Student Projects Across Film, Design, Animation, and Audio</h1>
        </div>
      </section>
      <StudentShowcaseSection />
    </MainLayout>
  )
}
