'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getPageCached } from '@/utils/contentful-cached'
import type {
  StudentShowcasePageData,
  FeaturedProject,
  DisciplineSection,
  StudentVoice
} from '@/types/student-showcase'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FILTERS = ['All Modes', 'Hybrid', 'On-Campus', 'Online', 'Weekend & Evening']

const FALLBACK: StudentShowcasePageData = {
  featuredProjects: [
    {
      title: 'Shifting Horizons',
      student: 'Achieng O.',
      programme: 'Film Production Diploma',
      type: 'Short Documentary',
      image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Urban Pulse',
      student: 'Brian K.',
      programme: 'Graphic Design',
      type: 'Brand Campaign',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Echoes of Tomorrow',
      student: 'Maureen T.',
      programme: 'Animation',
      type: '3D Short Film',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    }
  ],
  disciplineSections: [
    {
      title: 'Film & Video Production',
      bg: '#ffffff',
      projects: [
        {
          title: 'Shifting Horizons',
          student: 'Achieng O.',
          type: 'Short Documentary',
          image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'City Lights',
          student: 'Kevin M.',
          type: 'Music Video',
          image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'The Last Mile',
          student: 'Faith W.',
          type: 'Short Film',
          image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      title: 'Animation & VFX',
      bg: '#F9F9F9',
      projects: [
        {
          title: 'Dreamscape',
          student: 'Maureen T.',
          type: '3D Animation',
          image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Wireframe World',
          student: 'James K.',
          type: 'Motion Graphics',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Neon Genesis',
          student: 'Lucy A.',
          type: 'VFX Reel',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      title: 'Graphic Design & Branding',
      bg: '#ffffff',
      projects: [
        {
          title: 'Urban Pulse',
          student: 'Brian K.',
          type: 'Brand Identity',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Savannah Studio',
          student: 'Grace N.',
          type: 'Logo & Packaging',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Craft & Co',
          student: 'Dennis O.',
          type: 'Brand Campaign',
          image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      title: 'Music & Audio Production',
      bg: '#F9F9F9',
      projects: [
        {
          title: 'Bassline Theory',
          student: 'Samuel M.',
          type: 'EP Production',
          image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Sound of Nairobi',
          student: 'Diana K.',
          type: 'Podcast Series',
          image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Studio Sessions',
          student: 'Peter W.',
          type: 'Sound Design',
          image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  ],
  studentVoices: [
    {
      quote: 'My final-year project became my first paid client campaign two months before graduation.',
      name: 'Achieng O.',
      discipline: 'Graphic Design'
    },
    {
      quote: 'We pitched to a real brand, got feedback from agency creatives, and shipped the campaign live.',
      name: 'Brian K.',
      discipline: 'Film Production'
    },
    {
      quote: 'Mentors treated us like studio teams, so we left with confidence and a body of work we are proud of.',
      name: 'Maureen T.',
      discipline: 'Animation'
    }
  ],
  seoTitle: 'Student Showcase | ADMI',
  seoDescription: 'Explore film, animation, design and audio work produced by ADMI students through hybrid learning.'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: StudentShowcasePageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('studentShowcasePage', 'page:student-showcase')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        featuredProjects: f.featuredProjects || FALLBACK.featuredProjects,
        disciplineSections: f.disciplineSections || FALLBACK.disciplineSections,
        studentVoices: f.studentVoices || FALLBACK.studentVoices,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription
      }
    }
  } catch (error) {
    console.error('[Student Showcase] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudentShowcasePage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeFilter, setActiveFilter] = useState('All Modes')

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO title={page.seoTitle} description={page.seoDescription} />

      <div className="w-full">
        {/* -- Hero -- */}
        <section className="section-padding bg-gradient-to-br from-[#0A1A18] via-[#050D0C] to-admi-black">
          <div className="section-container flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-between">
            {/* Left */}
            <div className="max-w-[640px]">
              <p className="font-proxima text-[14px] font-bold tracking-[1.2px] text-[#B7D8CF]">/student-showcase</p>
              <h1 className="mt-7 font-proxima text-[44px] font-bold leading-[1.15] text-white">
                Hybrid Learning, Real Projects, Career-Ready Portfolios
              </h1>
              <p className="mt-7 max-w-[540px] font-proxima text-[16px] leading-[1.7] text-white/80">
                Explore film, animation, design and audio work produced through ADMI&rsquo;s blended model: online
                theory, live virtual critiques, and on-campus studio production.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-[#a02730]"
                >
                  Apply Now <IconArrowRight size={18} />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white/10"
                >
                  Explore Programmes
                </Link>
              </div>
            </div>

            {/* Right -- Featured Project Image */}
            <div className="relative h-[420px] w-full max-w-[520px] overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=1080&q=80')"
                }}
              />
              <div className="absolute left-5 top-5 rounded-md bg-brand-red px-3.5 py-1.5 font-proxima text-[11px] font-bold tracking-[1px] text-white">
                FEATURED PROJECT
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-7 pb-7 pt-16">
                <h3 className="font-proxima text-[24px] font-bold text-white">Shifting Horizons</h3>
                <p className="mt-2 font-proxima text-[13px] text-white/75">
                  Achieng O. &bull; Film Production Diploma &bull; Short Documentary
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -- Discipline Filters -- */}
        <section className="bg-[#F9F9F9] py-9">
          <div className="section-container">
            <h2 className="font-proxima text-[30px] font-bold text-[#171717]">Browse by Learning Mode</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-5 py-2.5 font-proxima text-[14px] font-bold transition ${
                    activeFilter === f
                      ? 'bg-[#171717] text-white'
                      : 'border border-[#E0E0E0] bg-white text-[#333] hover:border-[#999]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* -- Featured Projects -- */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="text-center">
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-brand-red">
                HYBRID STUDENT WORK
              </p>
              <h2 className="mt-2.5 font-proxima text-[42px] font-bold text-[#171717]">
                Featured Projects Across Online + Campus Learning
              </h2>
              <p className="mx-auto mt-2.5 max-w-[760px] font-proxima text-[17px] leading-[1.6] text-[#5C5C5C]">
                A cross-discipline showcase built through blended delivery, mentor feedback, and industry briefs.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {page.featuredProjects.map((proj: FeaturedProject) => (
                <article key={proj.title} className="group overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">
                  <div
                    className="h-[240px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${proj.image}')` }}
                  />
                  <div className="p-6">
                    <h3 className="font-proxima text-[20px] font-bold text-[#171717]">{proj.title}</h3>
                    <p className="mt-2 font-proxima text-[14px] text-[#888]">
                      {proj.student} &bull; {proj.programme}
                    </p>
                    <p className="mt-1 font-proxima text-[13px] font-semibold text-brand-red">{proj.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -- Discipline Sections -- */}
        {page.disciplineSections.map((section: DisciplineSection) => (
          <section key={section.title} style={{ backgroundColor: section.bg }} className="py-16">
            <div className="section-container">
              <div className="flex items-center justify-between">
                <h2 className="font-proxima text-[30px] font-bold text-[#171717]">{section.title}</h2>
                <Link href="#" className="font-proxima text-[14px] font-bold text-brand-red">
                  View All &rarr;
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                {section.projects.map((proj) => (
                  <article
                    key={proj.title}
                    className="group overflow-hidden rounded-xl border border-[#E8E8E8] bg-white"
                  >
                    <div
                      className="h-[200px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${proj.image}')` }}
                    />
                    <div className="p-5">
                      <h3 className="font-proxima text-[18px] font-bold text-[#171717]">{proj.title}</h3>
                      <p className="mt-1.5 font-proxima text-[13px] text-[#888]">
                        {proj.student} &bull; {proj.type}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* -- Student Voices -- */}
        <section className="section-padding bg-[#0F0F0F]">
          <div className="section-container">
            <div className="text-center">
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-brand-red">
                STUDENT VOICES
              </p>
              <h2 className="mx-auto mt-2.5 max-w-[900px] font-proxima text-[38px] font-bold text-white">
                What Students Say About Building Their Portfolio
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {page.studentVoices.map((voice: StudentVoice) => (
                <article key={voice.name} className="rounded-xl bg-[#1B1B1B] p-7">
                  <p className="font-proxima text-[18px] leading-[1.6] text-[#F3F3F3]">&ldquo;{voice.quote}&rdquo;</p>
                  <p className="mt-4 font-proxima text-[14px] font-bold text-[#BDBDBD]">
                    {voice.name} &bull; {voice.discipline}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="bg-gradient-to-br from-brand-red via-[#8E2028] to-[#1A1A1A] py-24 text-center text-white">
          <div className="section-container">
            <h2 className="font-proxima text-[44px] font-bold">Build Your Portfolio Through Hybrid Learning</h2>
            <p className="mx-auto mt-4 max-w-[820px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Study flexibly with online learning and campus studio sessions, then graduate with industry-ready work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-admi-black transition hover:bg-white/90"
              >
                Apply Now <IconArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/254741132751"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-admi-black"
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
