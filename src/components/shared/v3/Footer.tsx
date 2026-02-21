'use client'

import React, { useState } from 'react'
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
    <div className="flex items-center gap-3.5">
      <a href={SOCIAL_LINKS.TIKTOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconTikTok} alt="TikTok" />
      </a>
      <a href={SOCIAL_LINKS.YOUTUBE} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={30} height={30} src={IconYouTube} alt="YouTube" />
      </a>
      <a href={SOCIAL_LINKS.LINKEDIN} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconLinkedIn} alt="LinkedIn" />
      </a>
      <a href={SOCIAL_LINKS.INSTAGRAM} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={30} height={30} src={IconInstagram} alt="Instagram" />
      </a>
      <a href={SOCIAL_LINKS.X} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconX} alt="X" />
      </a>
      <a href={SOCIAL_LINKS.FACEBOOK} className="text-white" target="_blank" rel="noopener noreferrer">
        <Image width={28} height={28} src={IconFacebook} alt="Facebook" />
      </a>
    </div>
  )
})

SocialIcons.displayName = 'SocialIcons'

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const response = await fetch('/api/v3/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage("You're subscribed! Check your inbox for updates.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-1 font-nexa text-[1.4em] font-black text-white">Stay Updated</h3>
      <p className="text-sm text-white/80">
        Get the latest ADMI news, events, and stories in your inbox.
      </p>

      {status === 'success' ? (
        <p className="text-sm font-semibold text-[#8EBFB0]">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="form-input-dark disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary h-11 text-sm disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-xs text-red-400">{message}</p>}

      <div className="mt-3">
        <SocialIcons />
      </div>
    </div>
  )
}

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
        {/* Main 4-column grid */}
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-10 px-4 text-white sm:px-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:px-4">
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
                ,
                <br className="sm:hidden" />
                <WhatsAppLinkPlain phoneNumber="254711486581" trackingLocation="footer_v3" className="font-bold text-secondary sm:ml-1">
                  (+254) 711 486 581
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

          {/* Column 3: Student Corner */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 font-nexa text-[1.4em] font-black text-white">Student Corner</h3>
            {STUDENT_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Column 4: Stay Updated + Social Icons */}
          <FooterNewsletter />
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
