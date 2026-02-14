import React from 'react'
import Image from 'next/image'

import { IconCopyright } from '@tabler/icons-react'
import IconLogoWhite from '@/assets/logo-light.svg'
import IconYouTube from '@/assets/icons/youtube.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconX from '@/assets/icons/x.svg'
import IconLinkedIn from '@/assets/icons/linkedin.svg'
import { SOCIAL_LINKS } from '@/utils'
import Ribbon from './Ribbon'

const SocialIcons = React.memo(() => {
  return (
    <div className="flex h-12 items-center gap-4">
      <a href={SOCIAL_LINKS.TIKTOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={32} src={IconTikTok} alt={SOCIAL_LINKS.TIKTOK} />
      </a>
      <a href={SOCIAL_LINKS.YOUTUBE} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={36} src={IconYouTube} alt={SOCIAL_LINKS.YOUTUBE} />
      </a>
      <a href={SOCIAL_LINKS.LINKEDIN} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={32} src={IconLinkedIn} alt={SOCIAL_LINKS.LINKEDIN} />
      </a>
      <a href={SOCIAL_LINKS.INSTAGRAM} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={44} src={IconInstagram} alt={SOCIAL_LINKS.INSTAGRAM} />
      </a>
      <a href={SOCIAL_LINKS.X} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={32} height={32} src={IconX} alt={SOCIAL_LINKS.X} />
      </a>
      <a href={SOCIAL_LINKS.FACEBOOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={32} src={IconFacebook} alt={SOCIAL_LINKS.FACEBOOK} />
      </a>
    </div>
  )
})

SocialIcons.displayName = 'SocialIcons'

export default function FooterMini() {
  return (
    <div className="relative w-full bg-[#FFF7F5] font-proxima">
      <hr className="border-t border-green-500/20" />
      <div className="flex w-full bg-[#002A23] pb-8">
        <div className="md:pt-auto mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 pt-8 md:flex-row">
          <div className="flex-start grow">
            {/* Social icons: hidden on small screens, shown on xs+ */}
            <div className="hidden xs:block">
              <SocialIcons />
            </div>
          </div>
          <div className="grow">
            {/* Social icons: shown on small screens only */}
            <div className="xs:hidden">
              <SocialIcons />
            </div>
          </div>
          <div className="flex text-white">
            <IconCopyright className="mr-2 text-white" />
            <p>
              2025 All Rights Reserved. <b>ADMI Africa</b>
            </p>
          </div>
          <div className="cursor-pointer text-admiShamrok md:pl-4 md:pr-32">
            <p>Privacy Policy | Terms & Conditions</p>
          </div>
          <Image width={95} src={IconLogoWhite} alt="logo" />
        </div>
      </div>

      <Ribbon />
    </div>
  )
}
