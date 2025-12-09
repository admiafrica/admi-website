import React, { useEffect } from 'react'
import Image from 'next/image'
import { Box, Card } from '@mantine/core'

import { GoogleAnalyticsTag } from '@/components/shared'
import { Paragraph, Title } from '@/components/ui'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

import successIcon from '@/assets/icons/success-icon.svg'
import logo from '@/assets/logo.svg'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'

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
        <div className="min-h-[100vh] w-full bg-[#002A23] pt-16">
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
          <Box className="w-full px-4">
            <Card className="m-auto mt-[200px] flex w-full max-w-[600px] flex-col items-center" withBorder radius={8}>
              <div>
                <Image fetchPriority="high" src={successIcon.src} alt="Success" width={100} height={100} />
              </div>
              <Title label={'Thank you!'} size="36px" />
              <Paragraph fontFamily="font-nexa" className="py-6 text-center">
                Thank you for your enquiry. Our team will reach out with more information about our courses.
              </Paragraph>
              {/* <Button size="lg" backgroundColor="admiRed" label="Back to our website" type="submit" /> */}
              <a href="https://admi.africa">
                <Image src={logo.src} alt={'ADMI'} width={90} height={90} />
              </a>
            </Card>
          </Box>
        </div>
      </Box>
    </MainLayout>
  )
}
