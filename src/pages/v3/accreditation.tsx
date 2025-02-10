import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Divider, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { CollapsibleContent, PageSEO } from '@/components/shared/v3';
import { AdviceCard, ClipCard, InfoCard, PlainCard, UserProfileCard, UserTestimonialCard } from '@/components/cards';
import {
  ADMI_ACADEMIC_TEAM_MINIMAL,
  ADMI_ACCREDITATION_VALUES,
  ADMI_CAREER_ADVICE,
  ADMI_CAREER_VALUES,
  ADMI_FELLOWSHIPS,
  ADMI_FINANCIAL_PLANNING,
  ADMI_INTERNATIONAL_STUDENTS,
  ADMI_STUDENT_COUNCIL,
  ADMI_STUDENT_SUPPORT,
} from '@/utils';

import IconSpinner from '@/assets/icons/Spinner';
import IconUsersGroup from '@/assets/icons/UsersGroup';
import IconDashboardTabs from '@/assets/icons/DashboardTabs';
import { IconDownload } from '@tabler/icons-react';
import IconAudioPhoneAlt from '@/assets/icons/audio-phone-alt.svg';
import ImageCalendar from '@/assets/images/calendar.svg';
import ImageCareersLanding from '@/assets/images/careers-landing.png';

export default function AccreditationPage() {
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
      <PageSEO title="Accreditation" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'blue'}>
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
              background: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 80%)`,
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-2xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex">
                <Title label="Accreditation" color="#B9C601" size="64px" />
              </Box>
              <Box className="flex w-full pt-12">
                <Paragraph fontFamily="font-nexa" className="w-1/2 pr-6 text-white">
                  At Africa Digital Media Institute (ADMI), we pride ourselves on maintaining the highest standards of
                  educational excellence through our accreditation partnerships. Currently, we are recognized as a
                  Pearson Assured institution, which signifies our commitment to quality education and training.
                </Paragraph>
                <Divider orientation="vertical" />
                <Paragraph fontFamily="font-nexa" className="w-1/2 pl-6 text-white">
                  This independent benchmark from Pearson ensures that we meet rigorous quality criteria, providing you
                  with a reliable and respected qualification that is recognized globally.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* WORK */}
        <Box className="relative z-10 w-full bg-[#002A23] pb-8 pt-8 sm:pb-56">
          <Box className="mx-auto flex w-full max-w-screen-2xl flex-col">
            <Box className="w-full px-4 py-6 text-white 2xl:px-0 2xl:pr-4">
              <Title label="Why Work at ADMI?" color="white" />
            </Box>
            <Box className="flex w-full flex-col justify-between sm:flex-row sm:px-0">
              {ADMI_ACCREDITATION_VALUES.map((support, index) => (
                <Box key={`support-${index}`} p={8}>
                  <InfoCard support={support} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="relative w-full px-4 2xl:px-0">
          <div className="z-10 w-full max-w-screen-2xl px-4 sm:absolute sm:left-1/2 sm:top-[-12vh] sm:top-[10vh] sm:-translate-x-1/2 sm:transform 2xl:px-0">
            <Box className="flex w-full flex-col sm:flex-row">
              <Box className="pr-4 sm:w-1/2">
                <PlainCard>
                  <Title label={ADMI_FELLOWSHIPS[0].name} size="20px" color="black" />
                  {ADMI_FELLOWSHIPS[0].description.map((content) => (
                    <Paragraph className="py-4" fontFamily="font-nexa">
                      {content}
                    </Paragraph>
                  ))}
                </PlainCard>
              </Box>
              <Box className="pl-4 sm:w-1/2">
                <PlainCard>
                  <Title label={ADMI_FELLOWSHIPS[1].name} size="20px" color="black" />
                  {ADMI_FELLOWSHIPS[1].description.map((content) => (
                    <Paragraph className="py-4" fontFamily="font-nexa">
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
  );
}
