import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Group, Text, Anchor, Stack, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { CourseEnrollCard } from '@/components/cards';
import { SOCIAL_LINKS } from '@/utils';

import { IconCopyright } from '@tabler/icons-react';
import IconLogoWhite from '@/assets/logo-light.svg';
import IconYouTube from '@/assets/icons/youtube.svg';
import IconInstagram from '@/assets/icons/instagram.svg';
import IconFacebook from '@/assets/icons/facebook.svg';
import IconTikTok from '@/assets/icons/tiktok.svg';
import IconX from '@/assets/icons/x.svg';
import IconLinkedIn from '@/assets/icons/linkedin.svg';
import IconMail from '@/assets/icons/mail.svg';
import IconCall from '@/assets/icons/call.svg';
import IconStopWatch from '@/assets/icons/stop-watch.svg';
import Ribbon from './Ribbon';

const SocialIcons = React.memo(() => {
  return (
    <Group justify="center" mt={32} h={48}>
      <Anchor href={SOCIAL_LINKS.TIKTOK} c="white" target="_blank">
        <Image width={32} src={IconTikTok} alt={SOCIAL_LINKS.TIKTOK} />
      </Anchor>
      <Anchor href={SOCIAL_LINKS.YOUTUBE} c="white" target="_blank">
        <Image width={36} src={IconYouTube} alt={SOCIAL_LINKS.YOUTUBE} />
      </Anchor>
      <Anchor href={SOCIAL_LINKS.LINKEDIN} c="white" target="_blank">
        <Image width={32} src={IconLinkedIn} alt={SOCIAL_LINKS.LINKEDIN} />
      </Anchor>
      <Anchor href={SOCIAL_LINKS.INSTAGRAM} c="white" target="_blank">
        <Image width={44} src={IconInstagram} alt={SOCIAL_LINKS.INSTAGRAM} />
      </Anchor>
      <Anchor href={SOCIAL_LINKS.X} c="white" target="_blank">
        <Image width={32} height={32} src={IconX} alt={SOCIAL_LINKS.X} />
      </Anchor>
      <Anchor href={SOCIAL_LINKS.FACEBOOK} c="white" target="_blank">
        <Image width={32} src={IconFacebook} alt={SOCIAL_LINKS.FACEBOOK} />
      </Anchor>
    </Group>
  );
});

// Assign a display name
SocialIcons.displayName = 'SocialIcons';

type Props = {
  bgColor?: string;
};

export default function Footer({ bgColor }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const navigateToPage = (pagePath: string) => {
    router.push(`/v3/${pagePath}`);
  };

  return (
    <div className={`relative w-full ${bgColor ? `bg-[${bgColor}]` : 'bg-[#FFF7F5]'} font-proxima`}>
      {/* Floating Card */}
      <div className="w-full pt-48 sm:pt-36">
        <div className="absolute left-1/2 top-[6vh] z-10 h-fit w-full max-w-screen-xl -translate-x-1/2 transform justify-center px-4 sm:top-[8vh] md:h-[7.125rem] 2xl:px-0">
          <CourseEnrollCard />
        </div>
      </div>
      <div className="w-full bg-[#002A23] pb-8 pt-36">
        <Group className="mx-auto w-full max-w-screen-xl flex-col text-white md:flex-row" align="top">
          <Stack className="grow" h="100%">
            <Stack className="px-4">
              <div className="font-nexa text-admiShamrok">
                <Text size={'1.4em'} fw={600}>
                  Get in Touch
                </Text>
              </div>
              <div className="flex flex-row md:flex-col">
                <Text p={0}>Caxton House, 3rd Floor</Text>
                <Text>25, Kenyatta Avenue.</Text>
              </div>
              <div className="flex flex-row md:flex-col">
                <Text>P. O. Box 35447 - 00100</Text>
                <Text>Nairobi, Kenya.</Text>
              </div>
            </Stack>
            <Group gap={4} className="px-4 md:mt-[8em]">
              <Image width={24} height={24} src={IconMail} alt="email" />
              <Text fw="bold" ml={10}>
                Email:
              </Text>
              <Text>info@admi.ac.ke</Text>
            </Group>

            <Group gap={4} className="px-4">
              <Image width={24} height={24} src={IconCall} alt="phone" />
              <Text fw="bold" ml={10}>
                Phone:
              </Text>
              <Text>(+254) 706 349 696,</Text>
              <div className="ml-[5.8em] sm:ml-1">
                <Text>(+254) 711 486 581</Text>
              </div>
            </Group>

            <Group gap={4} className="px-4">
              <Image width={24} src={IconStopWatch} alt="hours active" />
              <Text fw="bold" ml={10}>
                Hours:
              </Text>
              <Text>Mon-Fri 8:00am - 5:00pm /</Text>
              <div className="ml-[5.6em] sm:ml-1">
                <Text>Sat: 8:00am to 2:00pm</Text>
              </div>
            </Group>
          </Stack>

          {/* Quick Links and Social Media */}
          <Stack className="grow pl-4">
            <div className="font-nexa text-admiShamrok">
              <Text size={'1.4em'} fw={600}>
                Quick Links
              </Text>
            </div>
            <Anchor href="#" c="white" fw={600}>
              Contact Us
            </Anchor>
            <Anchor href="#" c="white" fw={600}>
              Academic Team
            </Anchor>
            <Anchor href="#" c="white" fw={600} onClick={() => navigateToPage('fellowship')}>
              Fellowship
            </Anchor>
            <Anchor href="#" c="white" fw={600} onClick={() => navigateToPage('careers')}>
              Work with Us
            </Anchor>
            <Anchor href="#" c="white" fw={600} onClick={() => navigateToPage('acreditaton')}>
              Accreditation
            </Anchor>
          </Stack>

          {/* Student Corner */}
          <div className="mr-4 flex flex-col">
            <div className="flex w-full">
              <div className="grow"></div>
              <Stack>
                <div className="font-nexa text-admiShamrok">
                  <Text size={'1.4em'} fw={600}>
                    Student Portal
                  </Text>
                </div>
                <Anchor c="white" fw={600} onClick={() => navigateToPage('accomodation')}>
                  Accomodation
                </Anchor>
                <Anchor c="white" fw={600} onClick={() => navigateToPage('academic-pathways')}>
                  Academic Pathways
                </Anchor>
                <Anchor c="white" fw={600} onClick={() => navigateToPage('alumni')}>
                  Alumni Network
                </Anchor>
              </Stack>
            </div>
            <div className="grow"> </div>
            {!isMobile && <SocialIcons />}
          </div>
        </Group>
        {isMobile && <SocialIcons />}
        <Divider mt={48} size={0.5} opacity="20%" />
        <Group className="md:pt-auto mx-auto w-full max-w-screen-xl flex-col px-4 pt-8 md:flex-row" gap={2}>
          <IconCopyright className="text-white" />
          <div className="text-white">
            <Text>
              2025 All Rights Reserved. <b>ADMI Africa</b>
            </Text>
          </div>
          <div className="grow cursor-pointer text-admiShamrok md:pl-4">
            <Text>Privacy Policy | Terms & Conditions</Text>
          </div>
          <Image width={95} src={IconLogoWhite} alt="logo" />
        </Group>
      </div>

      <Ribbon />
    </div>
  );
}
