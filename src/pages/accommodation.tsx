import Link from 'next/link'
import { IconMapPin } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type { AccommodationPageData, Residence, BookingStep, AmenityCMS } from '@/types/accommodation'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: AccommodationPageData = {
  heroTitle: 'Student Accommodation',
  heroDescription:
    'Comfortable living options near campus to help you focus on what matters most \u2014 your creative education.',
  heroImage:
    'https://images.unsplash.com/photo-1758874573194-a98be0ed3ff5?auto=format&fit=crop&w=1920&q=80',
  residences: [
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
  ],
  amenities: [
    { label: 'High-Speed WiFi', icon: 'wifi' },
    { label: 'Daily Meals Available', icon: 'tools-kitchen-2' },
    { label: 'Quiet Study Spaces', icon: 'book' },
    { label: '24/7 Security', icon: 'shield' },
    { label: 'Laundry Facilities', icon: 'wash' },
    { label: 'Common Social Areas', icon: 'users' }
  ],
  bookingSteps: [
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
  ],
  neighborhoodHighlights: [
    'Walking distance to public transport',
    'Restaurants and cafes nearby',
    'Shopping malls within reach'
  ],
  ctaTitle: 'Ready to Find Your Home Away From Home?',
  ctaDescription:
    'Secure your spot in one of our partner residences and start your ADMI journey with comfort and convenience.',
  ctaButtonText: 'Enquire About Accommodation',
  ctaButtonUrl: '/contact',
  seoTitle: 'Student Accommodation',
  seoDescription:
    'Comfortable living options near ADMI campus in Nairobi. Explore partner residences, included amenities, and how to book your student accommodation.',
  seoKeywords:
    'ADMI accommodation, student housing Nairobi, student residences Kenya, ADMI campus housing, affordable student accommodation'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: AccommodationPageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('accommodationPage', 'page:accommodation')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        heroTitle: f.heroTitle || FALLBACK.heroTitle,
        heroDescription: f.heroDescription || FALLBACK.heroDescription,
        heroImage: f.heroImage || FALLBACK.heroImage,
        residences: f.residences || FALLBACK.residences,
        amenities: f.amenities || FALLBACK.amenities,
        bookingSteps: f.bookingSteps || FALLBACK.bookingSteps,
        neighborhoodHighlights: f.neighborhoodHighlights || FALLBACK.neighborhoodHighlights,
        ctaTitle: f.ctaTitle || FALLBACK.ctaTitle,
        ctaDescription: f.ctaDescription || FALLBACK.ctaDescription,
        ctaButtonText: f.ctaButtonText || FALLBACK.ctaButtonText,
        ctaButtonUrl: f.ctaButtonUrl || FALLBACK.ctaButtonUrl,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription,
        seoKeywords: f.seoKeywords || FALLBACK.seoKeywords
      }
    }
  } catch (error) {
    console.error('[Accommodation] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300 // ISR: revalidate every 5 minutes
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccommodationPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO title={page.seoTitle} description={page.seoDescription} keywords={page.seoKeywords} />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="relative h-[480px] w-full overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${page.heroImage}')` }}
          />
          {/* Dark overlay */}
          <div className="bg-admi-black/73 absolute inset-0" />

          {/* Content */}
          <div className="section-container relative z-10 flex h-full flex-col justify-center">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3">
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-secondary">
                  Accommodation
                </span>
                <span className="h-[3px] w-10 bg-secondary" />
              </div>

              <h1 className="mt-5 font-proxima text-[40px] font-bold leading-[1.1] text-white md:text-[52px]">
                {page.heroTitle}
              </h1>

              <p className="mt-5 max-w-[560px] font-proxima text-[18px] leading-[1.6] text-white/80">
                {page.heroDescription}
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
                <span className="h-[3px] w-10 bg-brand-red" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                  Partner Residences
                </span>
                <span className="h-[3px] w-10 bg-brand-red" />
              </div>

              <h2 className="mt-4 font-proxima text-[36px] font-bold leading-[1.15] text-admi-black md:text-[42px]">
                Your Home Away From Home
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.residences.map((residence: Residence) => (
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
                    <h3 className="font-proxima text-[24px] font-bold text-admi-black">{residence.name}</h3>
                    <p className="font-proxima text-[16px] font-semibold text-brand-red">{residence.price}</p>
                    <p className="font-proxima text-[14px] leading-[1.7] text-[#555]">{residence.description}</p>
                    {residence.link && (
                      <a
                        href={residence.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center font-proxima text-[14px] font-semibold text-brand-red no-underline hover:underline"
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

              <h2 className="mt-4 font-proxima text-[36px] font-bold leading-[1.15] text-admi-black md:text-[42px]">
                Everything You Need
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-2 gap-6 sm:grid-cols-3">
              {page.amenities.map((amenity: AmenityCMS) => {
                const Icon = getIcon(amenity.icon)
                return (
                  <div
                    key={amenity.label}
                    className="flex flex-col items-center gap-3 rounded-xl bg-white p-7 text-center transition-shadow hover:shadow-md"
                  >
                    {Icon && <Icon size={32} className="text-[#0A3D3D]" strokeWidth={1.5} />}
                    <span className="font-proxima text-[15px] font-semibold text-admi-black">{amenity.label}</span>
                  </div>
                )
              })}
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
                  <span className="h-[3px] w-10 bg-brand-orange" />
                  <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
                    The Neighbourhood
                  </span>
                </div>

                <h2 className="font-proxima text-[32px] font-bold leading-[1.2] text-admi-black">
                  Heart of Nairobi CBD
                </h2>

                <p className="max-w-[440px] font-proxima text-[15px] leading-[1.7] text-[#555]">
                  ADMI&apos;s Caxton House campus is centrally located in Nairobi, with easy access to public transport,
                  restaurants, shopping, and entertainment. Partner residences are just a short commute away.
                </p>

                <ul className="flex flex-col gap-3">
                  {page.neighborhoodHighlights.map((item: string) => (
                    <li key={item} className="flex items-center gap-3">
                      <IconMapPin size={16} className="flex-shrink-0 text-brand-orange" />
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
                <span className="h-[3px] w-10 bg-secondary" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                  How to Book
                </span>
                <span className="h-[3px] w-10 bg-secondary" />
              </div>

              <h2 className="mt-4 font-proxima text-[36px] font-bold leading-[1.15] text-admi-black md:text-[42px]">
                Three Simple Steps
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {page.bookingSteps.map((step: BookingStep) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 text-center transition-shadow hover:shadow-md"
                >
                  {/* Number badge */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A3D3D]">
                    <span className="font-proxima text-[24px] font-bold text-secondary">{step.number}</span>
                  </div>

                  <h3 className="font-proxima text-[20px] font-bold text-admi-black">{step.title}</h3>

                  <p className="max-w-[260px] font-proxima text-[14px] leading-[1.6] text-[#666]">
                    {step.description}
                  </p>
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
            <h2 className="mx-auto max-w-[700px] font-proxima text-[36px] font-bold leading-[1.2] text-white md:text-[40px]">
              {page.ctaTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[18px] leading-[1.6] text-white/80">
              {page.ctaDescription}
            </p>

            <div className="mt-8">
              <Link
                href={page.ctaButtonUrl}
                className="inline-flex items-center rounded-lg bg-secondary px-10 py-4 font-proxima text-[16px] font-semibold text-[#0A3D3D] transition-opacity hover:opacity-90"
              >
                {page.ctaButtonText}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
