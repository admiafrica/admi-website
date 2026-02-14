import Link from 'next/link'
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconDownload
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import EnhancedEnquiryForm from '@/components/forms/EnhancedEnquiryForm'
import type { SidebarCard } from '@/types/enquiry'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SIDEBAR_CARDS: SidebarCard[] = [
  {
    icon: IconBrandWhatsapp,
    iconBg: '#25D366',
    title: 'Talk to Admissions',
    desc: 'Chat with our team on WhatsApp for quick answers about programmes and admissions.',
    link: 'https://wa.me/254741132751',
    linkText: '+254 741 132 751',
    linkColor: '#25D366',
    external: true
  },
  {
    icon: IconMapPin,
    iconBg: '#0A3D3D',
    title: 'Visit Campus',
    desc: 'Book a campus tour to see our studios, labs, and facilities. Experience ADMI first-hand.',
    link: '/contact',
    linkText: 'Schedule a Visit',
    linkColor: '#0A3D3D',
    external: false
  },
  {
    icon: IconDownload,
    iconBg: '#F76335',
    title: 'Download Prospectus',
    desc: 'Get our detailed programme prospectus with course outlines, fees, and intake dates.',
    link: '/resources',
    linkText: 'Get Prospectus (PDF)',
    linkColor: '#F76335',
    external: false
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function EnquiryPage() {
  return (
    <MainLayout minimizeFooter footerBgColor="#1a1a1a">
      <PageSEO
        title="Enquire Now | ADMI"
        description="Start your creative journey at ADMI. Fill out our enquiry form and our admissions team will get back to you within 24 hours."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#0F2E2A] via-[#0A1F1D] to-[#091110] px-4 py-20 text-center text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-[3px] w-8 bg-[#08F6CF]" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-[#08F6CF]">ENQUIRE NOW</span>
            </div>
            <h1 className="mt-5 font-fraunces text-[48px] font-bold">Start Your Creative Journey</h1>
            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Fill out the form below and our admissions team will get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section className="bg-white px-4 py-16 xl:px-20">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 lg:flex-row">
            {/* Form */}
            <div className="flex-1">
              <EnhancedEnquiryForm />
            </div>

            {/* Sidebar */}
            <div className="w-full space-y-5 lg:w-[420px]">
              {SIDEBAR_CARDS.map((card) => (
                <article key={card.title} className="rounded-xl border border-[#e8e8e8] bg-[#F9F9F9] p-7">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <card.icon size={22} className="text-white" />
                  </div>
                  <h3 className="mt-4 font-proxima text-[18px] font-bold text-[#0A0A0A]">{card.title}</h3>
                  <p className="mt-2 font-proxima text-[14px] leading-[1.6] text-[#666]">{card.desc}</p>
                  <Link
                    href={card.link}
                    target={card.external ? '_blank' : undefined}
                    className="mt-3 inline-block font-proxima text-[14px] font-semibold"
                    style={{ color: card.linkColor }}
                  >
                    {card.linkText}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
