import Image from 'next/image';
import { Anchor, Box, Divider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { InfoCard, LearnMoreCard, PlainCard } from '@/components/cards';
import { PortalForm } from '@/components/forms';
import { ADMI_STUDENT_PORTAL_FEATURES } from '@/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconWhiteboard from '@/assets/icons/whiteboard.svg';
import IconMessageBoxes from '@/assets/icons/message-boxes.svg';
import ImageStudentLanding from '@/assets/images/student-portal-landing.png';

export default function StudentPortalPage() {
  const isMobile = useIsMobile();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="Student Portal" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full cursor-pointer" bg={'#F5FFFD'} onClick={open}>
          <Image
            src={ImageStudentLanding}
            placeholder="empty"
            alt="Fellowship Banner"
            fill
            priority
            className="absolute inset-0 z-0"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 0%',
            }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(181.92deg, rgba(135, 32, 0, 0) 15.5%, #872000 80.69%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-row px-4 sm:h-[50vh] sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex grow flex-col">
                <Title label="Student" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
                <Box className="px-1"></Box>
                <Title label="Portal" color="admiShamrok" size={isMobile ? '36px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:flex-row sm:pb-12 sm:pt-0">
                <Paragraph fontFamily="font-nexa" className="pr-6 text-white sm:w-1/2">
                  Welcome to the ADMI Student Portal, your one-stop destination for all things related to your academic
                  journey at Africa Digital Media Institute (ADMI).
                </Paragraph>
                <Divider
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  size={2}
                  color="admiShamrok"
                  opacity="30%"
                  my={isMobile ? 16 : 0}
                />
                <Paragraph fontFamily="font-nexa" className="text-white sm:w-1/2 sm:pl-6">
                  Our Student Portal is designed to provide you with easy access to essential resources, tools, and
                  information that will support your studies and enhance your overall experience at ADMI.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box h={200} bg="#872000" className="w-full">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Key Features of the Student Portal" color="white" size={isMobile ? '25px' : '36px'} />
          </Box>
        </Box>
        {/* Floating Cards */}
        <div className="relative w-full px-4 sm:h-[30vh] xl:px-0">
          <div className="z-10 w-full max-w-screen-xl sm:absolute sm:left-1/2 sm:top-[-120px] sm:-translate-x-1/2 sm:transform">
            <Box className="flex w-full flex-col flex-wrap justify-between sm:flex-row sm:px-0">
              {ADMI_STUDENT_PORTAL_FEATURES.map((value, index) => (
                <Box key={`value-${index}`} p={8} className="sm:w-[33%]">
                  <InfoCard item={value} bgColor="#F5FFFD" textColor="black" textWeight={500} />
                </Box>
              ))}
            </Box>
          </div>
        </div>
        {/* NETWORK */}
        <Box className="relative z-10 w-full bg-[#F5FFFD] py-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col sm:flex-row">
            <Box className="flex flex-col px-4 sm:w-[70%] xl:px-0">
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Get Involved" color="black" size="24px" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4 sm:pr-12" size="20px">
                      The Student Portal is not just a resource for academic information; it’s also a platform for you
                      to engage with your peers and get involved in campus life.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4 sm:pr-12">
                      Join student clubs, participate in discussions, and connect with fellow students who share your
                      interests.
                    </Paragraph>
                  </Box>
                  {!isMobile && (
                    <Anchor href="https://qwetu.co.ke/" target="_blank">
                      <Box className="flex w-[300px] items-center justify-center">
                        <Image src={IconMessageBoxes} width={160} height={160} alt="connected-img" />
                      </Box>
                    </Anchor>
                  )}
                </Box>
              </PlainCard>
              <Box className="my-4" />
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Conclusion" color="black" size="24px" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4 sm:pr-12" size="20px">
                      At ADMI, we are committed to providing you with the tools and resources you need to thrive in your
                      studies.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4 sm:pr-12">
                      The Student Portal is designed to enhance your educational experience and support your journey
                      toward success. We encourage you to explore all the features available and take full advantage of
                      this valuable resource. Welcome to the ADMI community, and let’s make your academic journey a
                      rewarding one!
                    </Paragraph>
                  </Box>
                  {!isMobile && (
                    <Anchor href="https://qejani.co.ke/" target="_blank">
                      <Box className="flex w-[300px] items-center justify-center">
                        <Image src={IconWhiteboard} width={160} height={160} alt="connected-img" />
                      </Box>
                    </Anchor>
                  )}
                </Box>
              </PlainCard>
            </Box>
            <Box className="sm:py-auto px-4 py-8 sm:w-[30%]">
              <PortalForm />
            </Box>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
