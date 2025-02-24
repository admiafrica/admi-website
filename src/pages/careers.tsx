import Image from 'next/image';
import { Box, Divider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { InfoCard, LearnMoreCard, PlainCard } from '@/components/cards';
import { ADMI_CAREER_VALUES } from '@/utils';

import IconAudioPhoneAlt from '@/assets/icons/audio-phone-alt.svg';
import ImageCareersLanding from '@/assets/images/careers-landing.png';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function CareersPage() {
  const isMobile = useIsMobile();
  const [opened, { open, close }] = useDisclosure(false);

  const howToApply = {
    title: 'How to Apply',
    description:
      'If you are interested in joining our faculty or would like to express your interest in teaching a specific course, we encourage you to reach out to us. Please send your CV and a brief cover letter outlining your teaching philosophy and the courses you wish to teach to apply@admi.ac.ke.',
  };

  const openVacancies = {
    title: 'Open Vacancies',
    description:
      'We regularly post open faculty positions on our website. Be sure to check back frequently for the latest opportunities to join our team. If you are passionate about education and have the skills to inspire students, we want to hear from you!',
    subtext:
      'Join us at ADMI and be part of a transformative educational experience that empowers students to excel in the ever-evolving world of digital media. Your expertise could be the key to unlocking their potential!',
  };

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Work With Us" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" onClick={open}>
          <Image
            src={ImageCareersLanding}
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
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0, 42, 35, 1) 100%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-row px-4 sm:h-[50vh] sm:flex-row 2xl:px-0">
            <Box className="mt-[20vh] flex w-full flex-col">
              <Box className="flex grow">
                <Title label="Work With" color="#F1FE37" size={isMobile ? '32px' : '64px'} />
                <Box className="px-1"></Box>
                <Title label="Us" color="admiShamrok" size={isMobile ? '32px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:flex-row">
                <Paragraph fontFamily="font-nexa" className="pr-6 text-white sm:w-1/2">
                  At Africa Digital Media Institute (ADMI), we believe that exceptional faculty are the cornerstone of
                  an outstanding educational experience. We are always on the lookout for passionate and skilled
                  educators who are eager to inspire and empower the next generation of digital media professionals.
                </Paragraph>
                <Divider
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  size={2}
                  color="#E43B07"
                  my={isMobile ? 16 : 0}
                />
                <Paragraph fontFamily="font-nexa" className="text-white sm:w-1/2 sm:pl-6">
                  Whether you are an experienced instructor or a talented industry practitioner, we invite you to
                  explore the opportunity to join our dynamic team.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* WORK */}
        <Box className="relative z-10 w-full bg-[#002A23] pb-48 pt-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 py-6 text-white xl:px-0 xl:pr-4">
              <Title label="Why Work at ADMI?" color="white" />
            </Box>
            <Box className="flex w-full flex-col justify-between px-4 sm:flex-row sm:px-0">
              {ADMI_CAREER_VALUES.map((support, index) => (
                <Box key={`support-${index}`} p={8}>
                  <InfoCard item={support} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="relative w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[-16vh] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[-8vh] 2xl:px-0">
            <PlainCard>
              <Title label={howToApply.title} size="20px" color="black" />
              <Paragraph className="py-6" fontFamily="font-nexa">
                {howToApply.description}
              </Paragraph>
            </PlainCard>
          </div>
        </div>
        {/* VACANCIES */}
        <Box className="mx-auto w-full max-w-screen-xl px-4 pb-8 pt-72 sm:pt-56 xl:px-0">
          <PlainCard bg="#F5FAFF">
            <Box className="flex h-full w-full flex-col-reverse sm:flex-row">
              <Box className="grow">
                <Title label={openVacancies.title} size="20px" color="black" />
                <Paragraph className="py-6" fontFamily="font-nexa">
                  {openVacancies.description}
                </Paragraph>
                <Paragraph className="py-6" fontFamily="font-nexa">
                  {openVacancies.subtext}
                </Paragraph>
              </Box>
              <Box className="relative flex items-center justify-center sm:w-[30%]">
                <Image src={IconAudioPhoneAlt} alt="vacancies-image" width={120} height={120} />
              </Box>
            </Box>
          </PlainCard>
        </Box>
      </div>
    </MainLayout>
  );
}
