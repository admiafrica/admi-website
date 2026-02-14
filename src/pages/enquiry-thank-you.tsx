import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Card } from '@mantine/core'
import {
  IconCheck,
  IconMail,
  IconPhone,
  IconCalendar,
  IconBrandWhatsapp,
  IconArrowRight
} from '@tabler/icons-react'

import { GoogleAnalyticsTag } from '@/components/shared'
import { Paragraph, Title } from '@/components/ui'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { trackWhatsAppClick } from '@/utils/utm-tracking'

import successIcon from '@/assets/icons/success-icon.svg'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'

const NEXT_STEPS = [
  {
    icon: IconMail,
    title: 'Check your inbox',
    description: 'You\'ll receive a confirmation email with programme details shortly.'
  },
  {
    icon: IconPhone,
    title: 'Admissions will call you',
    description: 'Our admissions team will reach out within 24 hours to discuss your interests.'
  },
  {
    icon: IconCalendar,
    title: 'Book an Open Day',
    description: 'Visit our campus, meet faculty, and experience ADMI first-hand.'
  }
]

const EXPLORE_LINKS = [
  { href: '/courses', label: 'Browse Programmes' },
  { href: '/student-showcase', label: 'Student Showcase' },
  { href: '/campus', label: 'Campus & Facilities' },
  { href: '/our-alumni', label: 'Alumni Stories' }
]

export default function EnquiryThanksPage() {
  useEffect(() => {
    // Fire conversion tracking on page load
    const conversionDataStr = sessionStorage.getItem('admi_conversion_data')

    if (conversionDataStr) {
      try {
        const conversionData = JSON.parse(conversionDataStr)
        console.log('📊 Retrieved conversion data:', conversionData)

        // Fire conversion event via dataLayer
        if (typeof window !== 'undefined' && window.dataLayer) {
          console.log('✅ Firing conversion event on thank-you page...')

          window.dataLayer.push({
            event: 'conversion',
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionData.value,
            currency: 'USD',
            transaction_id: conversionData.transaction_id,
            event_category: 'Lead Generation',
            event_label:
              conversionData.lead_score >= 15
                ? 'Hot Lead'
                : conversionData.lead_score >= 10
                  ? 'Warm Lead'
                  : conversionData.lead_score >= 5
                    ? 'Cold Lead'
                    : 'Unqualified',
            lead_score: conversionData.lead_score,
            course_name: conversionData.course_name,
            study_timeline: conversionData.study_timeline
          })

          // Also send generate_lead event for GA4
          window.dataLayer.push({
            event: 'generate_lead',
            value: conversionData.value,
            currency: 'USD',
            lead_score: conversionData.lead_score,
            course: conversionData.course_name,
            quality_tier: conversionData.quality_tier
          })

          console.log('✅ Conversion events sent successfully')
        }

        // Clear the data after sending
        sessionStorage.removeItem('admi_conversion_data')
      } catch (error) {
        console.error('❌ Error parsing conversion data:', error)
      }
    } else {
      console.log('ℹ️ No conversion data found (direct page visit)')
    }
  }, [])

  return (
    <MainLayout footerBgColor="#002A23" minimizeFooter>
      <PageSEO title="Enquiry Submitted" />
      <Box className="relative w-full">
        <GoogleAnalyticsTag analyticsId={process.env.NEXT_PUBLIC_ADMI_GTM_ID as string} />
        <div className="min-h-[100vh] w-full bg-[#002A23] pb-16 pt-16">
          {/* BACKGROUND IMAGES */}
          <div className="absolute left-[54%] top-[24vh] h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full justify-end pr-[10%]">
              <Image src={IconBgImageYellow} alt={'background image'} />
            </div>
          </div>
          <div className="absolute left-[50%] top-[20vh] h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full">
              <Image src={IconBgImageRed} alt={'background image'} />
            </div>
          </div>

          <Box className="relative z-10 w-full px-4">
            {/* Success Card */}
            <Card className="m-auto mt-[120px] flex w-full max-w-[640px] flex-col items-center p-6 sm:p-10" withBorder radius={12}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Image fetchPriority="high" src={successIcon.src} alt="Success" width={40} height={40} />
              </div>
              <Title label="Thank You!" size="32px" />
              <Paragraph className="mt-2 max-w-md text-center text-gray-600">
                Your enquiry has been received. Our admissions team is reviewing your details and will be in touch soon.
              </Paragraph>

              {/* What Happens Next */}
              <div className="mt-8 w-full">
                <h3 className="mb-4 text-center font-nexa text-lg font-semibold text-gray-900">
                  What Happens Next
                </h3>
                <div className="space-y-4">
                  {NEXT_STEPS.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#002A23]">
                        <step.icon size={20} color="white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{step.title}</p>
                        <p className="mt-0.5 text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi%20ADMI%2C%20I%20just%20submitted%20an%20enquiry%20and%20would%20like%20to%20chat%20about%20programmes.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'thank_you_page')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1da851]"
              >
                <IconBrandWhatsapp size={22} />
                Chat with Admissions on WhatsApp
              </a>

              {/* Explore Links */}
              <div className="mt-8 w-full border-t border-gray-200 pt-6">
                <p className="mb-3 text-center text-sm font-medium text-gray-500">
                  Explore while you wait
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {EXPLORE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#BA2E36] hover:text-[#BA2E36]"
                    >
                      {link.label}
                      <IconArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </Box>
        </div>
      </Box>
    </MainLayout>
  )
}
