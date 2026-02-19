'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SOCIAL_LINKS } from '@/utils'
import { WhatsAppLinkPlain } from '@/components/shared/WhatsAppLink'

import { IconCopyright } from '@tabler/icons-react'
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

const QUICK_LINKS = [
  { label: 'Enquire Now', href: 'enquiry' },
  { label: 'Apply', href: 'apply' },
  { label: 'About ADMI', href: 'about' },
  { label: 'Accreditation', href: 'accreditation' },
  { label: 'Academic Pathways', href: 'academic-pathways' },
  { label: 'Fellowship', href: 'fellowship' },
  { label: 'Work With Us', href: 'work-with-us' },
  { label: 'FAQs', href: 'faq' }
]

const STUDENT_LINKS = [
  { label: 'Student Portal', href: 'student-portal' },
  { label: 'Student Support', href: 'student-support' },
  { label: 'Fees & Financial Planning', href: 'financial-planning' },
  { label: 'Accommodation', href: 'accommodation' },
  { label: 'Student Showcase', href: 'student-showcase' },
  { label: 'Student Life', href: 'student-life' }
]

const SocialIcons = React.memo(() => {
  return (
    <div className="flex h-12 flex-wrap items-center gap-3 sm:gap-4">
      <a href={SOCIAL_LINKS.TIKTOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconTikTok} alt="TikTok" className="sm:h-8 sm:w-8" />
      </a>
      <a href={SOCIAL_LINKS.YOUTUBE} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={32} height={32} src={IconYouTube} alt="YouTube" className="sm:h-9 sm:w-9" />
      </a>
      <a href={SOCIAL_LINKS.LINKEDIN} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconLinkedIn} alt="LinkedIn" className="sm:h-8 sm:w-8" />
      </a>
      <a href={SOCIAL_LINKS.INSTAGRAM} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={36} height={36} src={IconInstagram} alt="Instagram" className="sm:h-11 sm:w-11" />
      </a>
      <a href={SOCIAL_LINKS.X} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconX} alt="X" className="sm:h-8 sm:w-8" />
      </a>
      <a href={SOCIAL_LINKS.FACEBOOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconFacebook} alt="Facebook" className="sm:h-8 sm:w-8" />
      </a>
    </div>
  )
})

SocialIcons.displayName = 'SocialIcons'

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={`/${href}`}
      className="border-none bg-transparent p-0 text-left font-semibold text-white no-underline hover:underline"
    >
      {label}
    </Link>
  )
}

type Props = {
  bgColor?: string
}

export default function Footer({ bgColor }: Props) {
  return (
    <div
      className="relative w-full bg-[#FFF7F5] font-proxima"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="w-full bg-admi-green pb-8 pt-12">
        {/* Main 3-column grid */}
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-10 px-4 text-white sm:px-8 md:grid-cols-3 md:gap-12 lg:px-4">
          {/* Column 1: Get in Touch */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 font-nexa text-[1.4em] font-black text-white">Get in Touch</h3>

            <div>
              <p>Caxton House, 3rd Floor</p>
              <p>25, Kenyatta Avenue.</p>
            </div>
            <div>
              <p>P. O. Box 35447 - 00100</p>
              <p>Nairobi, Kenya.</p>
            </div>

            <div className="flex items-start gap-2">
              <Image width={24} height={24} src={IconMail} alt="email" className="mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Email: </span>
                <span>info@admi.africa</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Image width={24} height={24} src={IconCall} alt="phone" className="mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Phone: </span>
                <span>(+254) 706 349 696,</span>
                <br className="sm:hidden" />
                <span className="sm:ml-1">(+254) 711 486 581</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Image width={24} height={24} src={IconCall} alt="whatsapp" className="mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">WhatsApp: </span>
                <WhatsAppLinkPlain trackingLocation="footer_v3" className="font-bold text-secondary">
                  (+254) 741 132 751
                </WhatsAppLinkPlain>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Image width={24} height={24} src={IconStopWatch} alt="hours" className="mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Hours: </span>
                <span>Mon-Fri 8:00am - 5:00pm</span>
                <br className="sm:hidden" />
                <span className="sm:ml-1">/ Sat: 8:00am to 2:00pm</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 font-nexa text-[1.4em] font-black text-white">Quick Links</h3>
            {QUICK_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Column 3: Student Corner + Social Icons */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 font-nexa text-[1.4em] font-black text-white">Student Corner</h3>
            {STUDENT_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
            <div className="mt-4">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="mx-auto mt-12 max-w-screen-xl border-t border-white/20 sm:mx-8 lg:mx-auto" />
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-3 px-4 pt-8 text-center sm:px-8 md:flex-row md:justify-between md:text-left lg:px-4">
          <div className="flex items-center gap-1.5 text-white">
            <IconCopyright size={16} />
            <span>
              2026 All Rights Reserved. <b>ADMI Africa</b>
            </span>
          </div>
          <Link href="/privacy-policy" className="cursor-pointer text-admiShamrok no-underline hover:underline">
            Privacy Policy | Terms & Conditions
          </Link>
        </div>
      </div>

      <Ribbon />
    </div>
  )
}
