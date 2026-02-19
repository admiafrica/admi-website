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

      <div className="w-full overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="section-padding bg-[#0A3D3D] text-center text-white">
          <div className="section-container">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-secondary" />
              <span className="section-label text-secondary">CONTACT</span>
            </div>
            <h1 className="section-heading-light mt-5">Get In Touch With ADMI</h1>
            <p className="mx-auto mt-4 max-w-[600px] text-lg leading-relaxed text-white/80">
              Have a question about our programmes, admissions, or campus? We are here to help.
            </p>
          </div>
        </section>

        {/* ── Form + Contact Info ── */}
        <section className="overflow-x-hidden bg-white">
          <div className="section-container flex flex-col lg:flex-row lg:gap-0">
            {/* Form Side */}
            <div className="min-w-0 flex-1 py-12 lg:py-16 lg:pr-12">
              <h2 className="section-subheading text-foreground">Send Us a Message</h2>
              <p className="mt-2 text-muted">
                Fill out the form below and our admissions team will get back to you within 24 hours.
              </p>
              <div className="mt-8 max-w-full overflow-hidden">
                <ContactForm />
              </div>
            </div>

            {/* Info Side */}
            <div className="w-full bg-[#f9fafb] p-6 lg:w-[400px] lg:flex-shrink-0 lg:p-10">
              <h2 className="section-subheading text-foreground">Contact Information</h2>
              <div className="mt-6 space-y-6">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: info.bg }}
                    >
                      <info.icon size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{info.label}</p>
                      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="relative mt-8 h-[200px] overflow-hidden rounded-xl">
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
              </div>
              <p className="mt-2 text-xs text-muted">Caxton House, Kenyatta Avenue — Next to General Post Office</p>
            </div>
          </div>
        </section>

        {/* ── WhatsApp Bar ── */}
        <section className="bg-brand-whatsapp">
          <div className="section-container flex flex-col items-center justify-center gap-3 py-5 text-center md:flex-row md:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <IconBrandWhatsapp size={20} className="flex-shrink-0 text-white" />
              <p className="text-sm font-semibold text-white md:text-base">
                Prefer WhatsApp? Chat with our admissions team instantly
              </p>
            </div>
            <Link
              href="https://wa.me/254741132751"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-proxima text-sm font-bold text-brand-whatsapp transition hover:opacity-90"
            >
              Start Chat
            </Link>
          </div>
        </section>

      </div>
    </MainLayout>
  )
}
