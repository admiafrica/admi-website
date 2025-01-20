import React from 'react';
import Image from 'next/image';
import { Group, Text, Anchor, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { IconCopyright } from '@tabler/icons-react';
import IconLogoWhite from '@/assets/logo-light.svg';
import IconYouTube from '@/assets/icons/youtube.svg';
import IconInstagram from '@/assets/icons/instagram.svg';
import IconFacebook from '@/assets/icons/facebook.svg';
import IconTikTok from '@/assets/icons/tiktok.svg';
import IconX from '@/assets/icons/x.svg';
import IconLinkedIn from '@/assets/icons/linkedin.svg';
import { SOCIAL_LINKS } from '@/utils';

const SocialIcons = React.memo(() => {
  return (
    <Group justify="left" h={48}>
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

export default function FooterMini() {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <div className="relative w-full bg-[#FFF7F5] font-proxima">
      <Divider size={0.5} opacity="20%" color="green" />
      <div className="flex w-full bg-[#002A23] pb-8">
        <div className="md:pt-auto mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 pt-8 md:flex-row">
          <div className="flex-start grow">{!isMobile && <SocialIcons />}</div>
          <div className="grow">{isMobile && <SocialIcons />}</div>
          <div className="flex text-white">
            <IconCopyright className="mr-2 text-white" />
            <Text>
              2025 All Rights Reserved. <b>ADMI Africa</b>
            </Text>
          </div>
          <div className="cursor-pointer text-admiShamrok md:pl-4 md:pr-32">
            <Text>Privacy Policy | Terms & Conditions</Text>
          </div>
          <Image width={95} src={IconLogoWhite} alt="logo" />
        </div>
      </div>

      <div className="flex h-[0.75rem] w-full">
        <div className="w-1/4 bg-[#E6F608]" />
        <div className="w-1/4 bg-[#F60834]" />
        <div className="w-1/4 bg-[#08F6CF]" />
        <div className="w-1/4 bg-[#F76335]" />
      </div>
    </div>
  );
}
