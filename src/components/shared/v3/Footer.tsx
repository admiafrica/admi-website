'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CourseEnrollCard } from '@/components/cards'
import { SOCIAL_LINKS } from '@/utils'
import { WhatsAppLinkPlain } from '@/components/shared/WhatsAppLink'

import { IconCopyright } from '@tabler/icons-react'
import IconLogoWhite from '@/assets/logo-light.svg'
import IconYouTube from '@/assets/icons/youtube.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconX from '@/assets/icons/x.svg'
import IconLinkedIn from '@/assets/icons/linkedin.svg'
import IconMail from '@/assets/icons/mail.svg'
import IconCall from '@/assets/icons/call.svg'
import IconStopWatch from '@/assets/icons/stop-watch.svg'
import Ribbon from './Ribbon'
import { Title } from '@/components/ui'

const SocialIcons = React.memo(() => {
  return (
    <div className="mt-8 flex h-12 items-center justify-center gap-4">
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

type Props = {
  bgColor?: string
}

export default function Footer({ bgColor }: Props) {
  const router = useRouter()

  const navigateToPage = (pagePath: string) => {
    router.push(`/${pagePath}`)
  }

  return (
    <div className="relative w-full bg-[#FFF7F5] font-proxima" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      {/* Floating Card */}
      <div className="w-full pt-48 sm:pt-36">
        <div className="absolute left-1/2 top-[6vh] z-10 h-fit w-full max-w-screen-lg -translate-x-1/2 transform justify-center px-4 sm:top-[8vh] md:h-[7.125rem] 2xl:px-0">
          <CourseEnrollCard />
        </div>
      </div>
      <div className="w-full bg-[#002A23] pb-8 pt-36">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start text-white md:flex-row">
          <div className="flex h-full grow flex-col">
            <div className="flex flex-col px-4">
              <Title size={'1.4em'} label="Get in Touch" color="admiShamrok" />
              <div className="flex flex-row md:flex-col">
                <p>Caxton House, 3rd Floor</p>
                <p>25, Kenyatta Avenue.</p>
              </div>
              <div className="flex flex-row md:flex-col">
                <p>P. O. Box 35447 - 00100</p>
                <p>Nairobi, Kenya.</p>
              </div>
            </div>
            <div className="mt-0 flex items-center gap-1 px-4 md:mt-[8em]">
              <Image width={24} height={24} src={IconMail} alt="email" />
              <span className="ml-2.5 font-bold">Email:</span>
              <span>info@admi.africa</span>
            </div>

            <div className="flex items-center gap-1 px-4">
              <Image width={24} height={24} src={IconCall} alt="phone" />
              <span className="ml-2.5 font-bold">Phone:</span>
              <span>(+254) 706 349 696,</span>
              <div className="ml-[5.8em] sm:ml-1">
                <span>(+254) 711 486 581</span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-4">
              <Image width={24} height={24} src={IconCall} alt="whatsapp" />
              <span className="ml-2.5 font-bold">WhatsApp:</span>
              <WhatsAppLinkPlain trackingLocation="footer_v3" className="font-bold text-[#08F6CF]">
                (+254) 741 132 751
              </WhatsAppLinkPlain>
            </div>

            <div className="flex items-center gap-1 px-4">
              <Image width={24} src={IconStopWatch} alt="hours active" />
              <span className="ml-2.5 font-bold">Hours:</span>
              <span>Mon-Fri 8:00am - 5:00pm /</span>
              <div className="ml-[5.6em] sm:ml-1">
                <span>Sat: 8:00am to 2:00pm</span>
              </div>
            </div>
          </div>

          {/* Quick Links and Social Media */}
          <div className="flex grow flex-col pl-4">
            <Title size={'1.4em'} label="Quick Links" color="admiShamrok" />
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('enquiry')}
            >
              Enquire Now
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('apply')}
            >
              Apply
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('about')}
            >
              About ADMI
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('accreditation')}
            >
              Accreditation
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('academic-pathways')}
            >
              Academic Pathways
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('fellowship')}
            >
              Fellowship
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('work-with-us')}
            >
              Work With Us
            </button>
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
              onClick={() => navigateToPage('frequently-asked-questions')}
            >
              FAQs
            </button>
          </div>

          {/* Student Corner */}
          <div className="mr-4 flex flex-col">
            <div className="flex w-full">
              <div className="grow" />
              <div className="flex flex-col">
                <Title size={'1.4em'} label="Student Corner" color="admiShamrok" />
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('student-portal')}
                >
                  Student Portal
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('student-support')}
                >
                  Student Support
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('financial-planning')}
                >
                  Fees & Financial Planning
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('accommodation')}
                >
                  Accommodation
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('student-showcase')}
                >
                  Student Showcase
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-0 text-left font-semibold text-white hover:underline"
                  onClick={() => navigateToPage('student-life')}
                >
                  Student Life
                </button>
              </div>
            </div>
            <div className="grow" />
            {/* Social icons: hidden on small screens, shown on xs+ */}
            <div className="hidden xs:block">
              <SocialIcons />
            </div>
          </div>
        </div>
        {/* Social icons: shown on small screens only */}
        <div className="xs:hidden">
          <SocialIcons />
        </div>
        <hr className="mt-12 border-t border-white/20" />
        <div className="md:pt-auto mx-auto flex w-full max-w-screen-xl flex-col items-center gap-0.5 px-4 pt-8 md:flex-row">
          <IconCopyright className="text-white" />
          <div className="text-white">
            <p>
              2025 All Rights Reserved. <b>ADMI Africa</b>
            </p>
          </div>
          <div className="grow text-admiShamrok md:pl-4">
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 text-admiShamrok"
              onClick={() => navigateToPage('privacy-policy')}
            >
              Privacy Policy | Terms & Conditions
            </button>
          </div>
          <Image width={95} src={IconLogoWhite} alt="logo" />
        </div>
      </div>

      <Ribbon />
    </div>
  )
}
