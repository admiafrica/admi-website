import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Divider, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { CollapsibleContent, PageSEO, VideoPlayer } from '@/components/shared/v3';
import { AdviceCard, ClipCard, InfoCard, PlainCard, UserProfileCard, UserTestimonialCard } from '@/components/cards';
import {
  ADMI_ACADEMIC_PATHWAYS,
  ADMI_ACADEMIC_TEAM_MINIMAL,
  ADMI_ALUMNI,
  ADMI_CAREER_ADVICE,
  ADMI_CAREER_VALUES,
  ADMI_FINANCIAL_PLANNING,
  ADMI_INTERNATIONAL_STUDENTS,
  ADMI_STUDENT_COUNCIL,
  ADMI_STUDENT_SUPPORT,
} from '@/utils';

import IconSpinner from '@/assets/icons/Spinner';
import IconUsersGroup from '@/assets/icons/UsersGroup';
import IconDashboardTabs from '@/assets/icons/DashboardTabs';
import { IconDownload } from '@tabler/icons-react';
import IconUsersGroupAlt from '@/assets/icons/users-group-alt.svg';
import IconCelebrate from '@/assets/icons/celebrate.svg';
import ImageAlumniLanding from '@/assets/images/alumni-landing.png';
import { JoinForm } from '@/components/forms';

export default function AlumniPage() {
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
      <PageSEO title="Academic Pathways" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'#002A23'}>
          <Image
            src={ImageAlumniLanding}
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
                <Title label="Alumni" color="#B9C601" size="64px" />
                <Box className="px-1"></Box>
                <Title label="Network" color="admiShamrok" size="64px" />
              </Box>
              <Box className="flex w-full pt-12">
                <Paragraph fontFamily="font-nexa" className="w-1/2 pr-6 text-white">
                  Welcome to the Alumni page of Africa Digital Media Institute (ADMI)! We are proud of our graduates and
                  the incredible contributions they make to the digital media industry and beyond.
                </Paragraph>
                <Divider orientation="vertical" />
                <Paragraph fontFamily="font-nexa" className="w-1/2 pl-6 text-white">
                  Our alumni network is a vibrant community of talented individuals who have gone on to achieve
                  remarkable success in various fields, and we are excited to celebrate their accomplishments and keep
                  the connections alive.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* NETWORK */}
        <Box className="relative z-10 w-full bg-[#002A23] py-8">
          <Box className="mx-auto flex w-full max-w-screen-2xl sm:flex-row">
            <Box className="flex w-[70%] flex-col px-4 2xl:px-0">
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Stay Connected" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4" size="20px">
                      As an ADMI alumnus, you are an essential part of our community, and we encourage you to register
                      and keep in touch with us.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4">
                      By joining our alumni network, you will receive updates on events, job opportunities, and industry
                      news that can help you stay connected to your peers and the institute. We want to hear about your
                      journey, your achievements, and how you are making an impact in your respective industries.
                    </Paragraph>
                  </Box>
                  <Box className="flex w-[300px] items-center justify-center">
                    <Image src={IconUsersGroupAlt} width={90} height={90} alt="connected-img" />
                  </Box>
                </Box>
              </PlainCard>
              <Box className="my-4" />
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Celebrate Your Success" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4" size="20px">
                      We believe in celebrating the successes of our alumni.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4">
                      Whether you’ve launched your own business, landed a dream job, or made significant contributions
                      to your field, we want to share your story! By keeping us updated on your professional milestones,
                      you can inspire current students and fellow alumni while reinforcing the strength of the ADMI
                      community.
                    </Paragraph>
                  </Box>
                  <Box className="flex w-[300px] items-center justify-center">
                    <Image src={IconCelebrate} width={90} height={90} alt="connected-img" />
                  </Box>
                </Box>
              </PlainCard>
            </Box>
            <Box className="w-[30%] px-4">
              <JoinForm />
            </Box>
          </Box>
        </Box>
        {/* ALUMNI */}
        <Box className="1xl:px-0 w-full px-4 py-8" bg={'#002A23'}>
          <Box className="mx-auto w-full max-w-screen-2xl">
            <Divider pb={32} />
            <Box className="flex w-full flex-col">
              <Title label="Alumni Profiles" color="white" />
              <Paragraph className="text-white" fontFamily="font-nexa">
                Our alumni profiles showcase the diverse paths our graduates have taken and the incredible work they are
                doing. Here are just a few examples of our outstanding alumni:
              </Paragraph>
            </Box>
            <Box className="flex w-full flex-row flex-wrap py-8">
              {ADMI_ALUMNI.map((member, index) => (
                <div className="mb-8 mr-8 w-fit" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
        {/* CONCLUSION */}
        <Box className="mx-auto w-full max-w-screen-2xl">
          <Divider />
          <Box className="flex w-full flex-col py-6">
            <Title label="Conclusion" color="black" />
            <Paragraph className="" fontFamily="font-nexa">
              At ADMI, we are committed to fostering a strong and supportive alumni network that empowers you to thrive
              in your career. We look forward to celebrating your achievements and keeping you connected with fellow
              alumni and the institute. Together, we can continue to inspire and uplift each other as we navigate the
              ever-evolving landscape of the digital media industry. Thank you for being a part of the ADMI family!
            </Paragraph>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
