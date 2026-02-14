import Link from 'next/link'
import { IconWifi, IconToolsKitchen2, IconBook, IconShield, IconWash, IconUsers, IconMapPin } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { Residence, Amenity, BookingStep } from '@/types/accommodation'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const RESIDENCES: Residence[] = [
  {
    name: 'Qwetu',
    price: 'From KES 25,000/month',
    description:
      'Purpose-built student living with modern furnished rooms, high-speed WiFi, study lounges, a gym, and 24/7 security. Multiple locations across Nairobi with shuttle services.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    link: 'https://www.qwetu.com'
  },
  {
    name: 'Qejani',
    price: 'From KES 18,000/month',
    description:
      'Contemporary co-living spaces designed for students and young professionals. Fully furnished studios and shared apartments with communal kitchens and social areas.',
    image: 'https://images.unsplash.com/photo-1649800292011-6a92542f08ce?auto=format&fit=crop&w=800&q=80',
    link: 'https://www.qejani.com'
  },
  {
    name: 'YWCA Parklands',
    price: 'From KES 10,000/month',
    description:
      'Safe, well-managed accommodation for female students in Parklands. Walking distance to public transport with meals included.',
    image: 'https://images.unsplash.com/photo-1759889392274-246af1a984ba?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Private Hostels Network',
    price: 'From KES 8,000/month',
    description:
      'ADMI partners with vetted private hostels across Nairobi to offer affordable, quality housing options near campus.',
    image: 'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=800&q=80'
  }
]

const AMENITIES: Amenity[] = [
  { label: 'High-Speed WiFi', Icon: IconWifi },
  { label: 'Daily Meals Available', Icon: IconToolsKitchen2 },
  { label: 'Quiet Study Spaces', Icon: IconBook },
  { label: '24/7 Security', Icon: IconShield },
  { label: 'Laundry Facilities', Icon: IconWash },
  { label: 'Common Social Areas', Icon: IconUsers }
]

const STEPS: BookingStep[] = [
  {
    number: '1',
    title: 'Apply to ADMI',
    description:
      'Submit your application to your chosen programme at ADMI. Accommodation support is available to all admitted students.'
  },
  {
    number: '2',
    title: 'Choose Your Residence',
    description: 'Browse available options and select the residence that fits your needs, budget, and lifestyle.'
  },
  {
    number: '3',
    title: 'Secure Your Room',
    description: 'Pay your deposit and move in before classes begin. Our team will help you settle in.'
  }
]

const NEIGHBORHOOD_HIGHLIGHTS = [
  'Walking distance to public transport',
  'Restaurants and cafes nearby',
  'Shopping malls within reach'
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccommodationPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Student Accommodation"
        description="Comfortable living options near ADMI campus in Nairobi. Explore partner residences, included amenities, and how to book your student accommodation."
        keywords="ADMI accommodation, student housing Nairobi, student residences Kenya, ADMI campus housing, affordable student accommodation"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="relative h-[480px] w-full overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=1920&q=80')"
            }}
          />
          {/* Dark overlay */}
          <div className="bg-[#0A0A0A]/73 absolute inset-0" />

          {/* Content */}
          <div className="section-container relative z-10 flex h-full flex-col justify-center">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3">
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#08F6CF]">
                  Accommodation
                </span>
                <span className="h-[3px] w-10 bg-[#08F6CF]" />
              </div>

              <h1 className="mt-5 font-fraunces text-[40px] font-bold leading-[1.1] text-white md:text-[52px]">
                Student Accommodation
              </h1>

              <p className="mt-5 max-w-[560px] font-proxima text-[18px] leading-[1.6] text-white/80">
                Comfortable living options near campus to help you focus on what matters most &mdash; your creative
                education.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. PARTNER RESIDENCES                                        */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[3px] w-10 bg-[#BA2E36]" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#BA2E36]">
                  Partner Residences
                </span>
                <span className="h-[3px] w-10 bg-[#BA2E36]" />
              </div>

              <h2 className="mt-4 font-fraunces text-[36px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[42px]">
                Your Home Away From Home
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {RESIDENCES.map((residence) => (
                <div
                  key={residence.name}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-shadow hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="h-[260px] overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${residence.image}')` }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <h3 className="font-fraunces text-[24px] font-bold text-[#0A0A0A]">{residence.name}</h3>
                    <p className="font-proxima text-[16px] font-semibold text-[#BA2E36]">{residence.price}</p>
                    <p className="font-proxima text-[14px] leading-[1.7] text-[#555]">{residence.description}</p>
                    {residence.link && (
                      <a
                        href={residence.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center font-proxima text-[14px] font-semibold text-[#BA2E36] no-underline hover:underline"
                      >
                        Visit Website &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. WHAT'S INCLUDED                                           */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F9F9F9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[3px] w-10 bg-[#0A3D3D]" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                  What&apos;s Included
                </span>
                <span className="h-[3px] w-10 bg-[#0A3D3D]" />
              </div>

              <h2 className="mt-4 font-fraunces text-[36px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[42px]">
                Everything You Need
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-2 gap-6 sm:grid-cols-3">
              {AMENITIES.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-xl bg-white p-7 text-center transition-shadow hover:shadow-md"
                >
                  <Icon size={32} className="text-[#0A3D3D]" strokeWidth={1.5} />
                  <span className="font-proxima text-[15px] font-semibold text-[#0A0A0A]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. NEIGHBORHOOD                                              */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
              {/* Image */}
              <div className="w-full flex-shrink-0 md:w-[560px]">
                <div
                  className="h-[340px] w-full rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1669333490889-194e8f46a766?auto=format&fit=crop&w=1200&q=80')"
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-[3px] w-10 bg-[#F76335]" />
                  <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#F76335]">
                    The Neighbourhood
                  </span>
                </div>

                <h2 className="font-fraunces text-[32px] font-bold leading-[1.2] text-[#0A0A0A]">
                  Heart of Nairobi CBD
                </h2>

                <p className="max-w-[440px] font-proxima text-[15px] leading-[1.7] text-[#555]">
                  ADMI&apos;s Caxton House campus is centrally located in Nairobi, with easy access to public transport,
                  restaurants, shopping, and entertainment. Partner residences are just a short commute away.
                </p>

                <ul className="flex flex-col gap-3">
                  {NEIGHBORHOOD_HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <IconMapPin size={16} className="flex-shrink-0 text-[#F76335]" />
                      <span className="font-proxima text-[14px] text-[#333]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. HOW TO BOOK                                               */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F9F9F9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[3px] w-10 bg-[#08F6CF]" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                  How to Book
                </span>
                <span className="h-[3px] w-10 bg-[#08F6CF]" />
              </div>

              <h2 className="mt-4 font-fraunces text-[36px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[42px]">
                Three Simple Steps
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 text-center transition-shadow hover:shadow-md"
                >
                  {/* Number badge */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A3D3D]">
                    <span className="font-fraunces text-[24px] font-bold text-[#08F6CF]">{step.number}</span>
                  </div>

                  <h3 className="font-fraunces text-[20px] font-bold text-[#0A0A0A]">{step.title}</h3>

                  <p className="max-w-[260px] font-proxima text-[14px] leading-[1.6] text-[#666]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. FINAL CTA                                                 */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A3D3D]">
          <div className="section-container section-padding text-center">
            <h2 className="mx-auto max-w-[700px] font-fraunces text-[36px] font-bold leading-[1.2] text-white md:text-[40px]">
              Ready to Find Your Home Away From Home?
            </h2>

            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Secure your spot in one of our partner residences and start your ADMI journey with comfort and
              convenience.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-[#08F6CF] px-10 py-4 font-proxima text-[16px] font-semibold text-[#0A3D3D] transition-opacity hover:opacity-90"
              >
                Enquire About Accommodation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
