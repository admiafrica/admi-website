import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from '@/lib/tw-mantine-hooks'
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX
} from '@tabler/icons-react'
import { SOCIAL_LINKS } from '@/utils'
import { WhatsAppLink } from '@/components/shared/WhatsAppLink'
import LogoIcon from '../../assets/logo.svg'

export default function CustomFooter() {
  const isMobile = useMediaQuery('(max-width: 480px)')

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col flex-wrap md:flex-row">
      <div className="flex flex-col gap-1" style={sectionStyle}>
        <h3 className="text-2xl font-semibold text-gray-900">Get in Touch</h3>
        <p className="text-gray-700">Caxton House, 3rd Floor 25, Kenyatta Avenue.</p>
        <p className="text-gray-700">P. O. Box 35447 - 00100 Nairobi, Kenya.</p>

        <p className="text-gray-700" style={{ paddingTop: 20 }}>
          Email: info@admi.ac.ke
        </p>
        <p className="text-gray-700">Phone: (+254) 706 349 696, (+254) 741 132 751</p>
        <WhatsAppLink trackingLocation="footer_legacy" c="green" fw="bold">
          WhatsApp: (+254) 741 132 751
        </WhatsAppLink>
        <p className="text-gray-700">Hours: Mon-Fri 8:00am - 5:00pm / Sat: 8:00am to 2:00pm</p>

        <Image width={isMobile ? 80 : 140} src={LogoIcon} alt="logo" />
      </div>

      {/* Quick Links and Social Media */}
      <div className="flex flex-col gap-1" style={sectionStyle}>
        <h3 className="text-2xl font-semibold text-gray-900">Quick Links</h3>
        <a href="/contact-us" className="text-blue-700 hover:underline" style={{ fontWeight: 'bold' }}>
          Contact Us
        </a>
        <a href="/about/academic-team" className="text-blue-700 hover:underline" style={{ fontWeight: 'bold' }}>
          Academic Team
        </a>
        <Link href="/fellowship" className="text-blue-700 hover:underline" style={{ fontWeight: 'bold' }}>
          Fellowship
        </Link>
        <Link href="/privacy-policy" className="text-blue-700 hover:underline" style={{ fontWeight: 'bold' }}>
          Privacy Policy
        </Link>

        <div className="flex flex-wrap" style={{ marginTop: isMobile ? '1em' : '4em' }}>
          <a
            href={SOCIAL_LINKS.INSTAGRAM}
            target="_blank"
            className="text-blue-700 hover:underline"
            style={{ color: 'dark' }}
          >
            <IconBrandInstagram size={36} />
          </a>
          <a
            href={SOCIAL_LINKS.LINKEDIN}
            target="_blank"
            className="text-blue-700 hover:underline"
            style={{ color: 'dark' }}
          >
            <IconBrandLinkedin size={36} />
          </a>
          <a
            href={SOCIAL_LINKS.FACEBOOK}
            target="_blank"
            className="text-blue-700 hover:underline"
            style={{ color: 'dark' }}
          >
            <IconBrandFacebook size={36} />
          </a>
          <a
            href={SOCIAL_LINKS.TIKTOK}
            target="_blank"
            className="text-blue-700 hover:underline"
            style={{ color: 'dark' }}
          >
            <IconBrandTiktok size={36} />
          </a>
          <a
            href={SOCIAL_LINKS.YOUTUBE}
            target="_blank"
            className="text-blue-700 hover:underline"
            style={{ color: 'dark' }}
          >
            <IconBrandYoutube size={36} />
          </a>
          <a href={SOCIAL_LINKS.X} target="_blank" className="text-blue-700 hover:underline" style={{ color: 'dark' }}>
            <IconBrandX size={36} />
          </a>
        </div>
      </div>

      {/* Student Corner */}
      <div className="flex flex-col gap-1" style={sectionStyle}>
        <h3 className="text-2xl font-semibold text-gray-900">Student Corner</h3>
        <a
          href="https://admi.africa/student-portal"
          className="text-blue-700 hover:underline"
          style={{ fontWeight: 'bold' }}
        >
          Student Portal
        </a>
        <a
          href="https://admi.africa/accommodation"
          className="text-blue-700 hover:underline"
          style={{ fontWeight: 'bold' }}
        >
          Accommodation
        </a>
      </div>
    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  padding: '0 20px'
}
