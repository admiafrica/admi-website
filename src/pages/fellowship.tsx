import Image from 'next/image'
import { Box, Card, Divider, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { CompanyValuesCard, LearnMoreCard } from '@/components/cards'
import { ADMI_FELLOWSHIP_VALUES, ADMI_FELLOWSHIP_DEPARTMENTS } from '@/utils'
import { useIsMobile } from '@/hooks/useIsMobile'

import ImageFellowshipLanding from '@/assets/images/fellowship-landing.png'
import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageOrange from '@/assets/icons/ellipse-orange-full.svg'

export default function FellowshipPage() {
  const isMobile = useIsMobile()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Fellowship"
        description="Discover fellowship opportunities at ADMI for passionate individuals from diverse backgrounds. Join our vibrant academic community and contribute to creative media and technology education across various departments."
        keywords="ADMI fellowship, fellowship opportunities, academic fellowship, international graduates, teaching fellowship, research opportunities, creative media fellowship"
      />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" onClick={open}>
          <Image
            src={ImageFellowshipLanding}
            placeholder="empty"
            alt="Fellowship Banner"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0"
            style={{ objectFit: 'cover' }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 50%, rgba(9, 113, 96, 1) 100%)'
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Title label="Fellowship" color="admiShamrok" size={isMobile ? '36px' : '64px'} />
              <Title label="Opportunities" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
              <Box className="grow"></Box>
              <Box className="flex w-full flex-col pt-12 sm:h-[180px] sm:flex-row">
                <Paragraph fontFamily="font-nexa" className="my my-auto text-white sm:w-1/2 sm:pr-6">
                  At Africa Digital Media Institute (ADMI), we are excited to offer fellowship opportunities that
                  empower individuals from diverse backgrounds, including international graduates, to contribute to our
                  vibrant academic community.
                </Paragraph>
                <Divider
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  size={2}
                  color="#F5FFFD"
                  my={isMobile ? 16 : 0}
                  opacity={'20%'}
                  h={isMobile ? '' : '100%'}
                />
                <Paragraph fontFamily="font-nexa" className="my-auto text-white sm:w-1/2 sm:pl-6">
                  Our fellowship program is designed to attract passionate individuals who are eager to share their
                  knowledge and skills across various departments.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[640px] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[640px] 2xl:px-0">
            <CompanyValuesCard values={ADMI_FELLOWSHIP_VALUES} showRightIcons={false} />
          </div>
        </div>
        <Box className="h-[400px] w-full sm:h-[200px]" bg={'#097160'}>
          {' '}
        </Box>
        {/* ACADEMIC CONTRIBUTION */}
        <Box className="relative w-full">
          {/* BACKGROUND IMAGES */}
          <div className="absolute left-[54%] top-[24vh] h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full justify-end pr-[10%]">
              <Image src={IconBgImageYellow} alt={'background image'} />
            </div>
          </div>

          <div className="absolute left-[60vw] top-[280px] h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full">
              <Image src={IconBgImageOrange} alt={'background image'} />
            </div>
          </div>
          <Box className="relative mx-auto w-full max-w-screen-xl px-4 pb-8 pt-96 lg:pt-64 xl:pt-32 2xl:px-0">
            <Box className="w-full">
              <div className="my-8 w-fit">
                <Title label="Areas of Contribution" size="24px" color="black" />
              </div>
              <div className="mb-8 w-full max-w-screen-md">
                <Paragraph fontFamily="font-nexa" className="py-4">
                  Fellows at ADMI can serve in various departments, including but not limited to:
                </Paragraph>
              </div>
            </Box>

            <div className="relative z-20 flex flex-wrap justify-between sm:flex-row">
              {ADMI_FELLOWSHIP_DEPARTMENTS.map((dept, index) => (
                <Card shadow="md" className="mb-8 w-[48%] sm:w-[24%]" key={`dept-${index}`}>
                  <div className="flex flex-col pt-4 sm:flex-row sm:px-4">
                    <dept.icon width={48} height={48} color={dept.iconColor} />
                    <Title size={isMobile ? '14px' : '18px'} label={dept.name} color="black" className="sm:pl-2" />
                  </div>
                  <Paragraph className="py-6 sm:px-4" fontFamily="font-nexa" size={isMobile ? '16px' : '18px'}>
                    {dept.description}
                  </Paragraph>
                </Card>
              ))}
            </div>
          </Box>
        </Box>
      </div>
    </MainLayout>
  )
}
