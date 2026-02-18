import Link from 'next/link'
import { IconMapPin, IconPhone, IconMail, IconClock, IconBrandWhatsapp } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { ContactForm } from '@/components/forms'
import type { ContactInfo } from '@/types/contact'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: IconMapPin,
    label: 'Campus Address',
    value: 'Caxton House, 3rd Floor\nKenyatta Avenue, Nairobi CBD\nKenya',
    bg: '#EEF9F7'
  },
  {
    icon: IconPhone,
    label: 'Phone',
    value: '+254 (0) 20 2626 883\n+254 722 123 456',
    bg: '#FFF0F0'
  },
  {
    icon: IconMail,
    label: 'Email',
    value: 'admissions@admi.ac.ke\ninfo@admi.ac.ke',
    bg: '#FFF8F0'
  },
  {
    icon: IconClock,
    label: 'Office Hours',
    value: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM',
    bg: '#EEF0FF'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <MainLayout minimizeFooter footerBgColor="#1a1a1a">
      <PageSEO
        title="Contact Us | ADMI"
        description="Get in touch with ADMI admissions and support teams. Visit us in Nairobi, call, email, or WhatsApp."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="section-padding bg-[#0A3D3D] text-center text-white">
          <div className="section-container">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-secondary" />
              <span className="font-proxima text-[13px] font-semibold uppercase tracking-[2px] text-secondary">
                CONTACT
              </span>
            </div>
            <h1 className="mt-5 font-proxima text-[48px] font-bold">Get In Touch With ADMI</h1>
            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Have a question about our programmes, admissions, or campus? We are here to help.
            </p>
          </div>
        </section>

        {/* ── Form + Contact Info ── */}
        <section className="bg-white">
          <div className="section-container flex w-full flex-col lg:flex-row">
            {/* Form Side */}
            <div className="flex-1 py-16">
              <h2 className="font-proxima text-[32px] font-bold text-[#171717]">Send Us a Message</h2>
              <p className="mt-2 font-proxima text-[15px] leading-[1.6] text-[#666]">
                Fill out the form below and our admissions team will get back to you within 24 hours.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Info Side */}
            <div className="w-full bg-[#F9F9F9] py-16 lg:w-[420px] lg:px-6 lg:py-16">
              <h2 className="font-proxima text-[24px] font-bold text-[#171717]">Contact Information</h2>
              <div className="mt-6 space-y-6">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: info.bg }}
                    >
                      <info.icon size={18} className="text-[#171717]" />
                    </div>
                    <div>
                      <p className="font-proxima text-[14px] font-bold text-[#171717]">{info.label}</p>
                      <p className="mt-1 whitespace-pre-line font-proxima text-[13px] leading-[1.6] text-[#666]">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WhatsApp Bar ── */}
        <section className="bg-brand-whatsapp">
          <div className="section-container flex w-full items-center justify-center gap-4 py-5">
            <IconBrandWhatsapp size={20} className="text-white" />
            <p className="font-proxima text-[15px] font-semibold text-white">
              Prefer WhatsApp? Chat with our admissions team instantly
            </p>
            <Link
              href="https://wa.me/254741132751"
              target="_blank"
              className="rounded-full bg-white px-6 py-2.5 font-proxima text-[14px] font-bold text-brand-whatsapp transition hover:bg-white/90"
            >
              Start Chat
            </Link>
          </div>
        </section>

        {/* ── Map Section ── */}
        <section className="bg-[#F9F9F9] py-16">
          <div className="section-container">
            <h2 className="text-center font-proxima text-[32px] font-bold text-[#171717]">Find Us</h2>
            <div className="relative mt-8 h-[400px] overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174!2d36.8219!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ADMI Campus Location"
              />
              <div className="absolute bottom-10 left-10 rounded-xl bg-white/95 p-4">
                <p className="font-proxima text-[14px] font-bold text-[#171717]">
                  ADMI - Caxton House, Kenyatta Avenue
                </p>
                <p className="mt-1 font-proxima text-[12px] text-[#666]">Next to General Post Office, Nairobi CBD</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
