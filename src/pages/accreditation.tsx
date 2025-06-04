import Image from 'next/image'
import { Box, Divider, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { InfoCard, LearnMoreCard, PlainCard } from '@/components/cards'
import { ADMI_ACCREDITATION_VALUES, ADMI_FELLOWSHIPS } from '@/utils'
import { useIsMobile } from '@/hooks/useIsMobile'

import ImageAccreditationLanding from '@/assets/images/accreditation-landing.png'

export default function AccreditationPage() {
  const isMobile = useIsMobile()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Accreditation" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full cursor-pointer" bg={'blue'} onClick={open}>
          <Image
            src={ImageAccreditationLanding}
            placeholder="empty"
            alt="Fellowship Banner"
            fill
            priority
            className="absolute inset-0 z-0"
            style={{ objectFit: 'cover' }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 50%, rgba(228, 59, 7, 1) 100%)'
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-row px-4 sm:h-[50vh] sm:flex-row 2xl:px-0">
            <Box className="mt-[20vh] flex w-full flex-col">
              <Box className="flex grow">
                <Title label="Accreditation" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:h-[180px] sm:flex-row">
                <Paragraph fontFamily="font-nexa" className="my-auto pr-6 text-white sm:w-1/2">
                  At Africa Digital Media Institute (ADMI), we pride ourselves on maintaining the highest standards of
                  educational excellence through our accreditation partnerships. Currently, we are recognized as a
                  Pearson Assured institution, which signifies our commitment to quality education and training.
                </Paragraph>
                <Divider
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  size={2}
                  my={isMobile ? 16 : 0}
                  opacity={'20%'}
                />
                <Paragraph fontFamily="font-nexa" className="my-auto text-white sm:w-1/2 sm:pl-6">
                  This independent benchmark from Pearson ensures that we meet rigorous quality criteria, providing you
                  with a reliable and respected qualification that is recognized globally.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* WORK */}
        <Box className="relative z-10 w-full pb-8 pt-8 sm:pb-56" bg={'#E43B07'}>
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 py-6 text-white xl:px-0">
              <Title label="Why Work at ADMI?" color="white" />
            </Box>
            <Box className="flex w-full flex-col justify-between sm:flex-row sm:px-0">
              {ADMI_ACCREDITATION_VALUES.map((value, index) => (
                <Box key={`value-${index}`} p={8} className="sm:w-[33%]">
                  <InfoCard item={value} bgColor="#A02600" />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* Floating Cards */}
        <div className="relative w-full px-4 xl:px-0">
          <div className="z-10 w-full max-w-screen-xl sm:absolute sm:left-1/2 sm:top-[-120px] sm:-translate-x-1/2 sm:transform">
            <Box className="flex w-full flex-col sm:flex-row">
              <Box className="my-8 sm:my-0 sm:w-1/2 sm:pr-4">
                <PlainCard>
                  <Title label={ADMI_FELLOWSHIPS[0].name} size="20px" color="black" />
                  {ADMI_FELLOWSHIPS[0].description.map((content, index) => (
                    <Paragraph key={`content-${index}`} className="py-4" fontFamily="font-nexa">
                      {content}
                    </Paragraph>
                  ))}
                </PlainCard>
              </Box>
              <Box className="sm:w-1/2 sm:pl-4">
                <PlainCard>
                  <Title label={ADMI_FELLOWSHIPS[1].name} size="20px" color="black" />
                  {ADMI_FELLOWSHIPS[1].description.map((content, index) => (
                    <Paragraph key={`fellowship-desc-${index}`} className="py-4" fontFamily="font-nexa">
                      {content}
                    </Paragraph>
                  ))}
                </PlainCard>
              </Box>
            </Box>
          </div>
        </div>
        <Box className="w-full pt-64"></Box>
      </div>
    </MainLayout>
  )
}
