import Link from 'next/link'
import logo from '@/assets/logo-main.svg'
import Image from 'next/image'
import { useMediaQuery } from '@/lib/tw-mantine-hooks'
import { IconMenu } from '@tabler/icons-react'

export default function CampaignHeader() {
  const isMobile = useMediaQuery('(max-width: 767px)')

  const getMenuWideScreen = () => {
    return (
      <div className="mx-auto flex flex-wrap">
        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            Home
          </p>
        </div>

        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            Courses
          </p>
        </div>

        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            Resources
          </p>
        </div>

        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            News
          </p>
        </div>

        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            Events
          </p>
        </div>

        <div>
          <p className="text-gray-700" style={menuItemStyle}>
            About
          </p>
        </div>
      </div>
    )
  }

  const getMenuMobile = () => {
    return (
      <div className="ml-auto flex w-fit flex-wrap pr-6">
        <div>
          <IconMenu />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-md" style={menuDrawer}>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            Home
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            Courses
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            Student Support
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            Resources
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            News
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            Events
          </button>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
            style={menuItemStyle}
          >
            About
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-wrap px-4">
      <div className="flex grow flex-row-reverse flex-wrap md:flex-row">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src={logo} width={80} alt="Africa Digital Media Institute" />
        </Link>
        {isMobile ? getMenuMobile() : getMenuWideScreen()}
      </div>
      {/* Enquire Button */}
      <button className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-medium text-white transition">
        Enquire
      </button>
    </div>
  )
}

const menuDrawer: React.CSSProperties = {
  marginTop: 20,
  width: '90%'
}

const menuItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: 18,
  color: '#C1272D'
}
