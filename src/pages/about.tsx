import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { ADMI_ACADEMIC_TEAM_SUMMARY } from '@/utils'

export default function AboutPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="About ADMI" description="Our story, mission, leadership, and partnerships at ADMI." />

      <div className="w-full">
        <section className="relative h-[560px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1643651577068-57d08a386760?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-end px-4 pb-16 text-white xl:px-0">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/about</p>
            <h1 className="pt-4 font-fraunces text-[52px] font-bold leading-[1.1]">About ADMI</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
              We prepare Africa&apos;s next generation of creative professionals through practical learning and industry-connected teaching.
            </p>
          </div>
        </section>

        <section className="bg-[#0A3D3D]">
          <div className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-7 xl:px-0">
            {[
              { v: '2007', l: 'Founded' },
              { v: '15K+', l: 'Learners Impacted' },
              { v: 'Pan-African', l: 'Creative Network' }
            ].map((s, i) => (
              <div key={s.l} className="flex items-center">
                <div className="text-center">
                  <p className="font-fraunces text-[32px] font-bold text-white">{s.v}</p>
                  <p className="font-nexa text-[14px] text-white/80">{s.l}</p>
                </div>
                {i < 2 && <div className="ml-8 h-[40px] w-px bg-white/30" />}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <h2 className="font-fraunces text-[42px] font-bold text-[#171717]">Our Story</h2>
            <p className="max-w-[920px] pt-4 font-nexa text-[18px] text-[#555]">ADMI blends creative craft, technical depth, and employability outcomes through project-based learning.</p>
          </div>
        </section>

        <section className="bg-[#F9F9F9] py-16">
          <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <h2 className="font-fraunces text-[40px] font-bold text-[#171717]">Mission & Values</h2>
            <div className="grid grid-cols-1 gap-5 pt-8 md:grid-cols-3">
              {['Industry-Relevant Learning', 'Creative Confidence', 'Career Readiness'].map((item) => (
                <article key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                  <h3 className="font-fraunces text-[28px] font-bold text-[#171717]">{item}</h3>
                  <p className="pt-2 font-nexa text-[16px] text-[#555]">We focus on practical projects and outcomes that translate into real opportunities.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <h2 className="font-fraunces text-[40px] font-bold text-[#171717]">Academic Team</h2>
            <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-3">
              {ADMI_ACADEMIC_TEAM_SUMMARY.slice(0, 9).map((m, idx) => (
                <article key={`${m.name}-${idx}`} className="rounded-xl border border-[#E8E8E8] bg-white p-5">
                  <p className="font-fraunces text-[26px] font-bold text-[#171717]">{m.name}</p>
                  <p className="pt-1 font-nexa text-[14px] text-[#BA2E36]">{m.title}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#BA2E36] via-[#8B1A24] to-[#0A0A0A] px-4 py-20 text-white xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-fraunces text-[44px] font-bold leading-[1.15]">Build Your Creative Career With ADMI</h2>
            <p className="mx-auto max-w-[760px] pt-4 font-nexa text-[18px] text-white/85">Explore programmes and choose a pathway aligned to your goals.</p>
            <Link href="/enquiry" className="mt-7 inline-block rounded-lg border border-white/40 px-6 py-3 font-nexa text-[15px] font-bold text-white hover:bg-white hover:text-[#171717]">Start Your Application</Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
