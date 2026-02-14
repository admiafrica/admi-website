import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

export default function StudentSupportPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Support" description="Support services, fee guidance, wellbeing resources, and student success pathways." />
      <div className="w-full">
        <section className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/student-support</p>
            <h1 className="pt-4 font-fraunces text-[48px] font-bold">Student Support</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">Academic, financial, wellness, and accessibility support designed for learner success.</p>
          </div>
        </section>
        <section className="border-b border-[#E8E8E8] bg-white">
          <div className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-4 xl:px-0">
            {['#fees', '#wellness', '#career', '#learning', '#accessibility'].map((t, idx) => (
              <a key={t} href={t} className={`px-4 py-4 font-nexa text-[14px] font-bold ${idx === 0 ? 'border-b-[3px] border-[#BA2E36] text-[#171717]' : 'text-[#666]'}`}>{t}</a>
            ))}
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 px-4 py-14 md:grid-cols-2 xl:px-0">
          {['Fee Structures & Downloads', 'Wellness Support', 'Career Services', 'Learning Support', 'Accessibility Services'].map((s, i) => (
            <article key={s} id={i === 0 ? 'fees' : i === 1 ? 'wellness' : i === 2 ? 'career' : i === 3 ? 'learning' : 'accessibility'} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
              <h2 className="font-fraunces text-[30px] font-bold text-[#171717]">{s}</h2>
              <p className="pt-2 font-nexa text-[15px] text-[#555]">Detailed guidance, timelines, contacts, and action steps for this support area.</p>
            </article>
          ))}
        </section>
      </div>
    </MainLayout>
  )
}
