import { Box } from '@/lib/tw-mantine'
import Image from 'next/image'

import { MainLayout } from '@/layouts/v3/MainLayout'
import EnhancedEnquiryForm from '@/components/forms/EnhancedEnquiryForm'

import { PageSEO } from '@/components/shared/v3'
import { useIsMobile } from '@/hooks/useIsMobile'

import ImageEnquiry1 from '@/assets/images/enquiry-1.png'
import ImageEnquiry2 from '@/assets/images/enquiry-2.png'
import ImageEnquiry3 from '@/assets/images/enquiry-3.png'

import IconTrophy from '@/assets/icons/Trophy'
import IconDoorkey from '@/assets/icons/DoorKey'
import IconShootingStar from '@/assets/icons/ShootingStar'
import IconLightbulbOn from '@/assets/icons/LightbulbOn'
import IconHat from '@/assets/icons/Hat'

export default function TestEnhancedEnquiry() {
  const isMobile = useIsMobile()

  return (
    <MainLayout minimizeFooter minimizeHeader footerBgColor="#002A23">
      <PageSEO
        title="Test Enhanced Enquiry Form"
        description="Testing the new pre-qualification enquiry form with lead scoring and enhanced Brevo CRM integration."
        keywords="ADMI test enquiry, enhanced form, pre-qualification, lead scoring, course enquiry"
      />

      <div className="min-h-[100vh] w-full bg-admi-green pt-16">
        {/* BACKGROUND DECORATION */}
        <div className="absolute left-[54%] top-[24vh] h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <div className="w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
          </div>
        </div>

        <div className="relative z-10 flex min-h-[84vh] w-full flex-col items-center justify-center sm:flex-row">
          <div className="flex w-full justify-center sm:w-1/2">
            {isMobile ? (
              <Box className="flex w-full flex-col items-center justify-center px-4">
                <Image width={280} src={ImageEnquiry1} alt="about course" objectFit="cover" className="mb-4" />
                <Box
                  className="mb-4 flex h-[8vh] w-full items-center justify-between rounded-xl px-[8%]"
                  bg={'admiShamrok'}
                >
                  <IconLightbulbOn width={32} height={32} color="white" />
                  <IconHat width={28} height={28} color="white" />
                  <IconShootingStar width={32} height={32} color="white" />
                </Box>
                <Image width={280} src={ImageEnquiry2} alt="about course" objectFit="cover" className="mb-4" />
                <Box className="flex w-full flex-row justify-between">
                  <Box
                    className="flex w-[48%] items-center justify-center rounded-xl"
                    bg={'#F1FE37'}
                    h={'6em'}
                  >
                    <IconTrophy width={32} height={32} />
                  </Box>
                  <Box className="flex w-[48%] items-center justify-center rounded-xl" bg={'admiRed'} h={'6em'}>
                    <IconDoorkey width={36} height={36} color="white" />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className="flex w-full flex-row px-8">
                <Box className="flex w-1/2 flex-col px-2">
                  <Image width={280} src={ImageEnquiry2} alt="about course" objectFit="cover" className="mb-8" />
                  <Box
                    className="mb-8 flex h-[12vh] w-full items-center justify-between rounded-xl px-[8%]"
                    bg={'admiShamrok'}
                  >
                    <IconLightbulbOn width={54} height={54} color="white" />
                    <IconHat width={44} height={44} color="white" />
                    <IconShootingStar width={54} height={54} color="white" />
                  </Box>
                  <Image width={280} src={ImageEnquiry3} alt="about course" objectFit="cover" />
                </Box>
                <Box className="flex w-1/2 flex-col px-2">
                  <Box className="pb-4">
                    <Image
                      src={ImageEnquiry1}
                      alt="about course"
                      objectFit="cover"
                      style={{ width: '90%', height: '100%' }}
                    />
                  </Box>
                  <Box className="flex flex-row justify-between" h={'100%'} w={'90%'}>
                    <Box
                      className="flex w-[32%] items-center justify-center rounded-xl"
                      bg={'#F1FE37'}
                      h={'8em'}
                      mr={16}
                    >
                      <IconTrophy width={40} height={40} />
                    </Box>
                    <Box className="flex w-[64%] items-center justify-center rounded-xl" bg={'admiRed'} h={'8em'}>
                      <IconDoorkey width={48} height={48} color="white" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-4 sm:px-0">
            <div className="mx-auto w-full max-w-none sm:max-w-xl py-6 sm:py-12">
              {/* Test Banner */}
              <div className="mb-4 sm:mb-6 rounded-lg bg-yellow-100 border-2 border-yellow-400 p-3 sm:p-4 text-center">
                <div className="font-bold text-yellow-800 text-base sm:text-lg">🧪 TEST VERSION</div>
                <div className="text-yellow-700 text-xs sm:text-sm mt-1">
                  Enhanced Enquiry Form with Pre-Qualification & Lead Scoring
                </div>
                <div className="text-yellow-600 text-xs mt-1 sm:mt-2">
                  This form includes: Multi-step process, Lead scoring (0-20), Enhanced Brevo integration, UTM tracking
                </div>
              </div>

              <EnhancedEnquiryForm />

              {/* Test Information */}
              <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="font-bold text-blue-800 text-sm mb-2">🔍 Testing Features:</div>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>✅ Multi-step form with validation</li>
                  <li>✅ Lead scoring algorithm (0-20 points)</li>
                  <li>✅ Enhanced Brevo CRM integration</li>
                  <li>✅ UTM parameter tracking</li>
                  <li>✅ Hot lead email notifications</li>
                  <li>✅ Deal creation in appropriate pipeline</li>
                  <li>✅ Lead categorization (Hot/Warm/Cold/Unqualified)</li>
                </ul>
              </div>

              {/* Scoring Guide */}
              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
                <div className="font-bold text-green-800 text-sm mb-2">🏆 Lead Scoring Guide:</div>
                <div className="text-green-700 text-xs space-y-1">
                  <div><strong>Hot Leads (15-20):</strong> January/May timeline + Full-time + 300K+ budget + Career change</div>
                  <div><strong>Warm Leads (10-14):</strong> September timeline + Certificate + 100-300K + Skill upgrade</div>
                  <div><strong>Cold Leads (5-9):</strong> Future timeline + Weekend + Low budget + Personal interest</div>
                  <div><strong>Unqualified (0-4):</strong> Just researching + No clear commitment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
