'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconDownload, IconCamera, IconPhoto, IconFileText } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { GalleryItemLarge, GalleryItemSmall, PressKitItem } from '@/types/media-archive'

const TABS = ['All Media', 'Campus Photos', 'Student Work', 'Events', 'Videos', 'Press Kit'] as const
type TabValue = (typeof TABS)[number]

const GALLERY_ITEMS_ROW_1: GalleryItemLarge[] = [
  {
    category: 'CAMPUS LIFE',
    title: 'Behind the Scenes at ADMI Studios',
    gradient: 'from-[#0A3D3D] to-[#134E4A]'
  },
  {
    category: 'STUDENT WORK',
    title: '2025 Graduation Exhibition',
    gradient: 'from-[#1a1a2e] to-[#16213e]'
  }
]

const GALLERY_ITEMS_ROW_2: GalleryItemSmall[] = [
  {
    label: 'Student Film Screening',
    gradient: 'from-[#2d1b69] to-[#1a1a2e]'
  },
  {
    label: 'Open Day 2025',
    gradient: 'from-[#0A3D3D] to-[#0d2d2d]'
  },
  {
    label: 'Studio Sessions',
    gradient: 'from-[#3b1a1a] to-[#1a1a2e]'
  }
]

const PRESS_KIT_ITEMS: PressKitItem[] = [
  {
    icon: IconPhoto,
    iconBg: 'bg-[#BA2E3615]',
    iconColor: '#BA2E36',
    title: 'Brand & Logos',
    description:
      'Download the official ADMI logo in PNG and SVG formats, along with brand colour palettes and usage guidelines.',
    buttonColor: 'border-[#BA2E36] text-[#BA2E36] hover:bg-[#BA2E36] hover:text-white'
  },
  {
    icon: IconFileText,
    iconBg: 'bg-[#0A3D3D15]',
    iconColor: '#0A3D3D',
    title: 'Fact Sheets',
    description:
      'Key statistics, programme information, accreditation details, and institutional milestones at a glance.',
    buttonColor: 'border-[#0A3D3D] text-[#0A3D3D] hover:bg-[#0A3D3D] hover:text-white'
  },
  {
    icon: IconCamera,
    iconBg: 'bg-[#F7633515]',
    iconColor: '#F76335',
    title: 'Hi-Res Photos',
    description: 'High-resolution campus photography, student work, and event imagery cleared for editorial use.',
    buttonColor: 'border-[#F76335] text-[#F76335] hover:bg-[#F76335] hover:text-white'
  }
]

export default function MediaArchivePage() {
  const [activeTab, setActiveTab] = useState<TabValue>('All Media')

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Media Archive"
        description="Browse ADMI's collection of campus photos, student work, event coverage, and downloadable press materials."
        keywords="ADMI media, campus photos, student work, press kit, media archive, press resources, ADMI gallery"
      />

      {/* ===== HERO SECTION ===== */}
      <div className="w-full bg-[#0A0A0A] px-4 py-20 xl:px-0">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#08F6CF]" />
            <p className="font-nexa text-[13px] uppercase tracking-[0.2em] text-[#08F6CF]">Media Archive</p>
          </div>
          <h1 className="font-fraunces pt-5 text-[36px] font-bold leading-[1.15] text-white sm:text-[48px]">
            Photos, Videos and Press Resources
          </h1>
          <p className="max-w-2xl pt-4 font-nexa text-[17px] leading-relaxed text-white/80">
            Browse our collection of campus photos, student work, event coverage, and downloadable press materials.
          </p>
        </div>
      </div>

      {/* ===== MEDIA TABS ===== */}
      <div className="border-b border-[#E8E8E8] bg-white">
        <div className="mx-auto w-full max-w-screen-xl overflow-x-auto px-4 xl:px-0">
          <div className="flex items-center gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-4 font-nexa text-[14px] font-bold transition-colors ${
                  activeTab === tab
                    ? 'border-b-[3px] border-[#BA2E36] text-[#BA2E36]'
                    : 'border-b-[3px] border-transparent text-[#666] hover:text-[#333]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== GALLERY GRID SECTION ===== */}
      <div className="bg-white px-4 py-12 sm:px-10 lg:px-20 lg:py-12">
        <div className="mx-auto w-full max-w-screen-xl">
          {/* Row 1: Two large images */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {GALLERY_ITEMS_ROW_1.map((item) => (
              <div
                key={item.title}
                className={`group relative flex h-[280px] cursor-pointer items-end overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} sm:h-[380px]`}
              >
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute right-[-20%] top-[-20%] h-[140%] w-[70%] rotate-12 rounded-full bg-white/5" />
                </div>
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Content */}
                <div className="relative z-10 w-full p-6 sm:p-8">
                  <span className="inline-block rounded bg-white/15 px-3 py-1 font-nexa text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="font-fraunces mt-3 text-[22px] font-bold leading-tight text-white sm:text-[26px]">
                    {item.title}
                  </h3>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
            ))}
          </div>

          {/* Row 2: Three smaller images */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_ITEMS_ROW_2.map((item) => (
              <div
                key={item.label}
                className={`group relative flex h-[220px] cursor-pointer items-end overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} sm:h-[280px]`}
              >
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute left-[-15%] top-[-25%] h-[120%] w-[60%] rotate-[-8deg] rounded-full bg-white/5" />
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Content */}
                <div className="relative z-10 w-full p-5 sm:p-6">
                  <h3 className="font-fraunces text-[18px] font-bold leading-tight text-white sm:text-[20px]">
                    {item.label}
                  </h3>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PRESS KIT SECTION ===== */}
      <div className="bg-[#F9F9F9] px-4 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#BA2E36]" />
            <p className="font-nexa text-[13px] uppercase tracking-[0.2em] text-[#BA2E36]">Press Kit</p>
          </div>
          <h2 className="font-fraunces pt-4 text-[32px] font-bold leading-[1.15] text-[#171717] sm:text-[40px]">
            Download Press Resources
          </h2>
          <p className="max-w-2xl pt-3 font-nexa text-[16px] leading-relaxed text-[#555]">
            Access our brand assets, institutional fact sheets, and high-resolution photography for editorial and press
            use.
          </p>

          {/* Press Kit Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRESS_KIT_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex flex-col rounded-xl border border-[#E8E8E8] bg-white p-6 transition-shadow duration-200 hover:shadow-md sm:p-8"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.iconBg}`}>
                    <Icon size={24} color={item.iconColor} stroke={1.5} />
                  </div>
                  <h3 className="font-fraunces mt-5 text-[20px] font-bold text-[#171717]">{item.title}</h3>
                  <p className="mt-2 flex-1 font-nexa text-[14px] leading-relaxed text-[#555]">{item.description}</p>
                  <button
                    className={`mt-6 flex items-center justify-center gap-2 rounded-lg border-2 px-5 py-2.5 font-nexa text-[14px] font-bold transition-colors duration-200 ${item.buttonColor}`}
                  >
                    <IconDownload size={16} stroke={2} />
                    Download
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div
        className="px-4 py-16 sm:px-10 lg:px-20 lg:py-20"
        style={{
          background: 'linear-gradient(to bottom, #0A3D3D, #071A1A)'
        }}
      >
        <div className="mx-auto w-full max-w-screen-xl text-center">
          <h2 className="font-fraunces text-[32px] font-bold text-white sm:text-[40px]">Have a Media Enquiry?</h2>
          <p className="mx-auto max-w-xl pt-4 font-nexa text-[16px] leading-relaxed text-white/70">
            For press enquiries, interview requests, or high-resolution assets, our communications team is ready to
            help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#BA2E36] px-8 py-3 font-nexa text-[15px] font-bold text-white transition-colors duration-200 hover:bg-[#a02830]"
            >
              Contact Press Team
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/80 px-8 py-3 font-nexa text-[15px] font-bold text-white transition-colors duration-200 hover:bg-white/10">
              <IconDownload size={18} stroke={2} />
              Download Full Press Kit
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
