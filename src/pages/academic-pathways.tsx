import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function AcademicPathwaysPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Academic Pathways" description="Progression routes and articulation pathways from ADMI programmes." />
      <div className="w-full">
        <section className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/academic-pathways</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Academic Pathways</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">Understand diploma progression, transfer options, and long-term learning routes.</p>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {['Pathway Diagram', 'Articulation Agreements', 'Credit Transfer'].map((item) => (
              <article key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{item}</h2>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
