import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const stories = ['Film Producer at Regional Studio', 'Brand Designer at Creative Agency', 'Sound Engineer in Live Production']

export default function AlumniPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Our Alumni" description="Graduate outcomes and alumni stories from ADMI." />
      <section className="bg-[#0A0A0A] px-4 py-16 text-white xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/our-alumni</p>
          <h1 className="pt-4 font-fraunces text-[48px] font-bold">Our Alumni</h1>
          <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">A growing network of creatives building careers across Africa and beyond.</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-xl px-4 py-14 xl:px-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <article key={s} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{s}</h2>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}
