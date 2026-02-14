import Link from 'next/link'
import {
  IconArrowRight,
  IconBrandWhatsapp
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { AboutStat, AboutValue, AboutTimelineEvent, AboutFounder, AboutBoardMember, AboutTeamMember, AboutFacility, AboutPartner } from '@/types/about'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS: AboutStat[] = [
  { value: '15+', label: 'Years of Excellence', color: '#08F6CF' },
  { value: '4,500+', label: 'Graduates', color: '#ffffff' },
  { value: '10+', label: 'Countries Represented', color: '#F76335' },
  { value: '500+', label: 'Industry Partners', color: '#BA2E36' }
]

const VALUES: AboutValue[] = [
  { title: 'Global', desc: 'International education benchmarks with curriculum aligned to EU and Kenyan standards.', color: '#BA2E36', bg: '#FFF0F0' },
  { title: 'Practical', desc: 'Learn-and-Work model combining production training with real industry projects.', color: '#0A3D3D', bg: '#EEF9F7' },
  { title: 'Digital', desc: 'Paperless campus with e-learning tools and industry-standard digital workflows.', color: '#F76335', bg: '#FFF8F0' },
  { title: 'Value-Driven', desc: 'Ethics, psycho-social support, and academic counselling woven into every programme.', color: '#1a1a4e', bg: '#EEF0FF' },
  { title: 'Transformational', desc: 'A defining experience that builds creative professionals ready to shape industries.', color: '#0A3D3D', bg: '#EEFFF9' }
]

const TIMELINE: AboutTimelineEvent[] = [
  { year: '2011', title: 'The Beginning', desc: 'Wilfred Kiumi establishes JFTA with a vision to build Africa\u2019s creative media talent pipeline.', color: '#BA2E36', border: '#BA2E3644' },
  { year: '2014', title: 'First Campus', desc: 'ADMI\u2019s first dedicated campus opens in Nairobi CBD with purpose-built studios and labs.', color: '#08F6CF', border: '#0A3D3D44' },
  { year: '2015', title: 'Rebranded to ADMI', desc: 'JFTA rebrands to Africa Digital Media Institute with 6 core programmes launched.', color: '#F76335', border: '#F7633544' },
  { year: '2018', title: '1,000th Student', desc: 'Major milestone as ADMI enrols its 1,000th student from across Africa and beyond.', color: '#ffffff', border: '#ffffff22' },
  { year: '2019', title: '$1M+ Revenue, Rubika Partnership', desc: 'Crossed $1M annual revenue, secured AFD $1M investment, and partnered with Rubika International.', color: '#BA2E36', border: '#BA2E3644' },
  { year: '2022', title: '10th Anniversary', desc: 'A decade of impact celebrated with 3,000+ alumni and expanded programme offerings.', color: '#08F6CF', border: '#08F6CF44' },
  { year: '2023', title: 'GOYN and Google.org', desc: 'Partnered with Global Opportunity Youth Network and Google.org to scale youth employment.', color: '#F76335', border: '#F7633544' },
  { year: '2026', title: 'Pan-African Vision', desc: 'EU-accredited degree pathways, Top 10 SME recognition, and 4,500+ graduates shaping industries.', color: '#ffffff', border: 'transparent', highlight: true }
]

const FOUNDERS: AboutFounder[] = [
  {
    name: 'Laila Macharia',
    role: 'Co-Founder and Chair',
    desc: 'Visionary leader driving ADMI\u2019s strategic growth and Pan-African expansion.',
    image: 'https://images.unsplash.com/photo-1580867398114-a567342074de?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Wilfred Kiumi',
    role: 'Co-Founder',
    desc: 'Pioneering creative education in Africa with deep industry expertise and passion.',
    image: 'https://images.unsplash.com/photo-1731377209672-c7606ba26c25?auto=format&fit=crop&w=600&q=80'
  }
]

const BOARD: AboutBoardMember[] = [
  { name: 'Mugo Kibati', role: 'Board Director', desc: 'Strategic oversight and governance leadership.', color: '#0A3D3D' },
  { name: 'Ross Franks', role: 'Board Director', desc: 'Industry expertise and international partnerships.', color: '#BA2E36' },
  { name: 'Chris Foot', role: 'Board Director', desc: 'Business development and financial strategy.', color: '#F76335' }
]

const ACADEMIC_TEAM: AboutTeamMember[] = [
  { name: 'Carolyne Sila', role: 'Head of School', roleColor: '#0A3D3D', desc: 'Leading academic excellence and curriculum development across all creative media programmes.', image: 'https://images.unsplash.com/photo-1616409000123-b36064d90ed4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Raji Ilangovan', role: 'Student Programs', roleColor: '#F76335', desc: 'Ensuring students have the support, resources, and mentorship to thrive from day one to graduation.', image: 'https://images.unsplash.com/photo-1624354865933-4b9bdb3cb338?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ciku Munuku', role: 'Faculty Affairs', roleColor: '#BA2E36', desc: 'Managing faculty development, industry partnerships, and ensuring teaching quality across departments.', image: 'https://images.unsplash.com/photo-1688841167159-bed18ddaeb44?auto=format&fit=crop&w=600&q=80' }
]

const FACILITIES: AboutFacility[] = [
  { name: 'Film & Music Studios', desc: 'Soundproofed recording and filming stages', image: 'https://images.unsplash.com/photo-1659083475067-8ab6af362082?auto=format&fit=crop&w=800&q=80', wide: true },
  { name: 'Mac & PC Labs', desc: 'Industry-standard software and hardware', image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?auto=format&fit=crop&w=800&q=80', wide: true },
  { name: 'Equipment Vault', desc: 'Cameras, lenses, audio gear', image: 'https://images.unsplash.com/photo-1769699167687-540cce99f744?auto=format&fit=crop&w=600&q=80' },
  { name: 'Creative Spaces', desc: 'Collaborative work areas', image: 'https://images.unsplash.com/photo-1765812515298-f299f9e29b68?auto=format&fit=crop&w=600&q=80' },
  { name: 'Resource Library', desc: 'Books, journals, and digital archives', image: 'https://images.unsplash.com/photo-1760035989402-f4b2661a05fd?auto=format&fit=crop&w=600&q=80' }
]

const PARTNERS: AboutPartner[] = [
  { name: 'Woolf University', desc: 'EU-accredited degree pathways with ECTS credits', bg: '#EEF9F7' },
  { name: 'TVETA Kenya', desc: 'Registered with Kenya\u2019s TVET Authority', bg: '#FFF0F0' },
  { name: 'Rubika International', desc: 'Global creative arts network for animation and gaming', bg: '#EEF0FF' },
  { name: 'Google.org and GOYN', desc: 'Youth employment and digital skills partnerships', bg: '#FFF8F0' }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="About ADMI | Africa Digital Media Institute"
        description="Since 2011, ADMI has pioneered creative media education in East Africa. Learn about our story, mission, leadership, campus, and accreditation."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="relative h-[620px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1643651577068-57d08a386760?auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/73 to-[#0A0A0A]/53" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-center px-4 pt-16 text-white xl:px-20">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-[#08F6CF]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#08F6CF]">ABOUT ADMI</span>
            </div>
            <h1 className="mt-6 max-w-[700px] font-fraunces text-[56px] font-bold leading-[1.1] tracking-tight">
              We Exist to Unlock Africa&apos;s Creative Potential
            </h1>
            <p className="mt-6 max-w-[620px] font-proxima text-[18px] leading-[1.7] text-white/80">
              Since 2011, ADMI has pioneered creative media and technology education in East Africa. We have graduated 4,500+ professionals, partnered with 500+ industry leaders, and built a proven model that delivers real-world outcomes.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#BA2E36]" />
              <span className="font-proxima text-[14px] font-semibold text-white/60">Est. 2011 &middot; Nairobi, Kenya &middot; EU-Accredited via Woolf</span>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="bg-[#0A3D3D]">
          <div className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-8 xl:px-20">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="text-center">
                  <p className="font-fraunces text-[36px] font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="font-proxima text-[13px] font-semibold text-white/70">{s.label}</p>
                </div>
                {i < STATS.length - 1 && <div className="ml-10 h-12 w-px bg-white/20" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="bg-white">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col lg:flex-row">
            <div className="h-[400px] w-full bg-cover bg-center lg:h-auto lg:w-[640px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617814423581-2c60df4c7b67?auto=format&fit=crop&w=800&q=80')" }} />
            <div className="flex flex-col gap-6 px-4 py-16 lg:px-16 lg:py-20">
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-10 bg-[#BA2E36]" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#BA2E36]">OUR STORY</span>
              </div>
              <h2 className="max-w-[600px] font-fraunces text-[36px] font-bold leading-[1.15] text-[#171717]">
                From a Small Film School to East Africa&apos;s Leading Creative Institute
              </h2>
              <p className="max-w-[600px] font-proxima text-[16px] leading-[1.7] text-[#555]">
                In 2011, co-founders Laila Macharia and Wilfred Kiumi saw a gap: Africa&apos;s booming creative economy had no institution training the next generation. They started with a handful of students and a bold vision to build a world-class creative media institute in Nairobi.
              </p>
              <p className="max-w-[600px] font-proxima text-[16px] leading-[1.7] text-[#555]">
                What began as JFTA (Jomo&apos;s Film and Television Academy) evolved into ADMI &mdash; Africa Digital Media Institute. Today we offer 15+ accredited programmes across film, animation, design, music production, and gaming, with graduates working at top studios across Africa and beyond.
              </p>
              <blockquote className="rounded-xl border-l-[3px] border-[#BA2E36]/20 bg-[#FFF8F0] p-5">
                <p className="font-fraunces text-[18px] font-semibold italic leading-[1.5] text-[#BA2E36]">
                  &ldquo;We wanted to prove that world-class creative education doesn&apos;t have to mean leaving Africa.&rdquo;
                </p>
                <p className="mt-3 font-proxima text-[13px] font-semibold text-[#999]">&mdash; Laila Macharia, Co-Founder and Chair</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── Mission & Values ── */}
        <section className="bg-[#F9F9F9] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#0A3D3D]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">MISSION AND VALUES</span>
            </div>
            <h2 className="mt-6 font-fraunces text-[42px] font-bold text-[#171717]">What Drives Us</h2>
            <p className="mx-auto mt-4 max-w-[700px] font-proxima text-[17px] leading-[1.7] text-[#666]">
              Our mission is to equip Africa&apos;s creative talent with practical skills, industry confidence, and global perspective through blended learning pathways.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              {VALUES.map((v) => (
                <article key={v.title} className="w-full overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white text-left sm:w-[244px]">
                  <div className="h-1 w-full" style={{ backgroundColor: v.color }} />
                  <div className="px-6 pb-7 pt-5">
                    <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: v.bg }}>
                      <span className="h-0 w-0" />
                    </div>
                    <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">{v.title}</h3>
                    <p className="mt-2.5 font-proxima text-[13px] leading-[1.6] text-[#666]">{v.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Journey ── */}
        <section className="bg-[#0A0A0A] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#08F6CF]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#08F6CF]">OUR JOURNEY</span>
            </div>
            <h2 className="mt-6 font-fraunces text-[42px] font-bold text-white">15 Years of Building Creative Futures</h2>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TIMELINE.map((t) => (
                <article
                  key={t.year}
                  className="rounded-2xl p-7 text-left"
                  style={{
                    backgroundColor: t.highlight ? '#BA2E36' : '#1a1a1a',
                    border: t.highlight ? 'none' : `1px solid ${t.border}`
                  }}
                >
                  <p className="font-fraunces text-[32px] font-bold" style={{ color: t.color }}>{t.year}</p>
                  <p className="mt-3 font-proxima text-[16px] font-bold text-white">{t.title}</p>
                  <p className={`mt-3 font-proxima text-[13px] leading-[1.6] ${t.highlight ? 'text-white/80' : 'text-[#999]'}`}>{t.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-[#BA2E36]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#BA2E36]">FOUNDERS AND BOARD</span>
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-fraunces text-[42px] font-bold text-[#171717]">The Visionaries Behind ADMI</h2>
              <p className="max-w-[320px] font-proxima text-[16px] text-[#666]">The founders and board who shaped our mission.</p>
            </div>

            {/* Founders */}
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {FOUNDERS.map((f) => (
                <article key={f.name} className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-[#F9F9F9]">
                  <div className="h-[240px] w-full bg-cover bg-center" style={{ backgroundImage: `url('${f.image}')` }} />
                  <div className="px-6 py-5">
                    <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">{f.name}</h3>
                    <p className="mt-1.5 font-proxima text-[13px] font-semibold text-[#BA2E36]">{f.role}</p>
                    <p className="mt-1.5 font-proxima text-[13px] leading-[1.6] text-[#666]">{f.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Board */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
              {BOARD.map((b) => (
                <article key={b.name} className="flex items-center gap-5 rounded-2xl border border-[#e8e8e8] bg-[#F9F9F9] p-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: b.color }}>
                    <span className="font-fraunces text-[20px] font-bold text-white">{b.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-fraunces text-[18px] font-bold text-[#171717]">{b.name}</h3>
                    <p className="mt-1 font-proxima text-[13px] font-semibold" style={{ color: b.color }}>{b.role}</p>
                    <p className="mt-1 font-proxima text-[12px] text-[#666]">{b.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Academic Team ── */}
        <section className="bg-[#F9F9F9] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-[#0A3D3D]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">ACADEMIC TEAM</span>
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-fraunces text-[38px] font-bold text-[#171717]">Faculty Who Practice What They Teach</h2>
              <p className="max-w-[340px] font-proxima text-[15px] leading-[1.6] text-[#666]">Our lecturers are active industry professionals &mdash; not just textbook academics.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {ACADEMIC_TEAM.map((a) => (
                <article key={a.name} className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white">
                  <div className="h-[260px] w-full bg-cover bg-center" style={{ backgroundImage: `url('${a.image}')` }} />
                  <div className="px-7 py-5">
                    <h3 className="font-fraunces text-[22px] font-bold text-[#171717]">{a.name}</h3>
                    <p className="mt-1.5 font-proxima text-[13px] font-semibold" style={{ color: a.roleColor }}>{a.role}</p>
                    <p className="mt-1.5 max-w-[340px] font-proxima text-[14px] leading-[1.6] text-[#666]">{a.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Campus Facilities ── */}
        <section className="bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#0A3D3D]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">OUR CAMPUS</span>
            </div>
            <h2 className="mt-6 font-fraunces text-[42px] font-bold text-[#171717]">World-Class Facilities in the Heart of Nairobi</h2>
            <p className="mx-auto mt-4 max-w-[700px] font-proxima text-[17px] leading-[1.7] text-[#666]">
              Located in Caxton House, Nairobi CBD. Industry-standard studios, Mac and PC labs, film equipment vault, and purpose-built creative spaces.
            </p>

            {/* Row 1 — two wide cards */}
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {FACILITIES.filter((f) => f.wide).map((f) => (
                <div key={f.name} className="group relative h-[340px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${f.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-left">
                    <p className="font-fraunces text-[20px] font-bold text-white">{f.name}</p>
                    <p className="mt-2 font-proxima text-[13px] text-white/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 — three cards */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {FACILITIES.filter((f) => !f.wide).map((f) => (
                <div key={f.name} className="group relative h-[260px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${f.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <p className="font-fraunces text-[18px] font-bold text-white">{f.name}</p>
                    <p className="mt-2 font-proxima text-[13px] text-white/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partners & Accreditation ── */}
        <section className="bg-white px-4 py-16 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#F76335]" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#F76335]">PARTNERSHIPS AND ACCREDITATION</span>
            </div>
            <h2 className="mt-6 font-fraunces text-[38px] font-bold text-[#171717]">Globally Recognized, Locally Rooted</h2>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {PARTNERS.map((p) => (
                <article key={p.name} className="w-full rounded-2xl border border-[#e8e8e8] bg-[#F9F9F9] p-8 text-center sm:w-[220px]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: p.bg }}>
                    <span className="font-fraunces text-[16px] font-bold text-[#171717]">{p.name.charAt(0)}</span>
                  </div>
                  <h3 className="mt-3 font-fraunces text-[18px] font-bold text-[#171717]">{p.name}</h3>
                  <p className="mt-2 font-proxima text-[12px] leading-[1.6] text-[#666]">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-br from-[#BA2E36] via-[#8B1A24] to-[#0A0A0A] px-4 py-24 text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="mx-auto max-w-[700px] font-fraunces text-[44px] font-bold leading-[1.15]">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Join 4,500+ graduates building careers in film, design, animation, music production, and gaming. Applications are open for January, May and September intakes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-[#0A0A0A] transition hover:bg-white/90"
              >
                Apply Now <IconArrowRight size={18} />
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-[#0A0A0A]"
              >
                <IconBrandWhatsapp size={18} /> Chat with Admissions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
