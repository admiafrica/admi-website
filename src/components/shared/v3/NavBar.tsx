'use client'

import { useState, useEffect } from 'react'
import { Group, Text, Menu } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useMediaQuery } from '@mantine/hooks'
import { Button } from '@/components/ui'

import { IconMenu } from '@tabler/icons-react'
import IconLogoLight from '@/assets/logo-light.svg'

type Props = {
  mode: string
  isMinimal?: boolean
}

export default function NavBar({ mode, isMinimal = false }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const isSmallScreen = useMediaQuery('(max-width: 992px)')
  const [hiddenCTA, setHiddenCTA] = useState<boolean>(false)

  const navigateToPage = (pagePath: string) => {
    router.push(`/${pagePath}`)
  }

  useEffect(() => {
    if (pathname) {
      const isHidden = pathname === '/enquiry' || pathname.startsWith('/campaigns')
      setHiddenCTA(isHidden)
    }
  }, [pathname])

  const getMenuWideScreen = (mode: string) => {
    return (
      <Group c={mode == 'dark' ? 'white' : 'black'} gap={'xl'}>
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('')}>
              Home
            </Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('courses')}>
              Courses
            </Text>
          </Menu.Target>
        </Menu>

        {/* <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('ai-academy')}>
              Ai Academy
            </Text>
          </Menu.Target>
        </Menu>*/}
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('student-life')}>
              Student Life
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} href="/student-experience/campus">
              Campus Tour
            </Menu.Item>
            <Menu.Item component={Link} href="/student-experience/campus/facilities">
              Facilities
            </Menu.Item>
            <Menu.Item component={Link} href="/student-experience/studios">
              Studios
            </Menu.Item>
            <Menu.Item component={Link} href="/student-experience/equipment">
              Equipment
            </Menu.Item>
            <Menu.Item onClick={() => navigateToPage('student-showcase')}>Student Showcase</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('accommodation')}>Accommodation</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('student-support')}>
              Student Support
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigateToPage('financial-planning')}>Fees & Financial Planning</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('student-support')}>Academic Support</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('student-portal')}>Student Portal</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('about')}>
              About
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigateToPage('about')}>About ADMI</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('accreditation')}>Accreditation</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('academic-pathways')}>Academic Pathways</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('fellowship')}>Fellowship</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('our-alumni')}>Our Alumni</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('our-impact')}>Our Impact</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('work-with-us')}>Work With Us</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('resources')}>
              Resources
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigateToPage('resources')}>Guides</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('news')}>News</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('events')}>Events</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('media-archive')}>Media Archive</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('frequently-asked-questions')}>FAQs</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    )
  }

  const getMenuMobile = (mode: string) => {
    return (
      <div className="flex w-fit items-center gap-3">
        <Group c={mode == 'dark' ? 'white' : 'black'}>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <IconMenu className="cursor-pointer" />
            </Menu.Target>
            <Menu.Dropdown style={menuDrawer}>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('')}>
                Home
              </Menu.Item>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('courses')}>
                Courses
              </Menu.Item>
              <Menu.Item
                style={menuItemStyle}
                className="cursor-pointer"
                onClick={() => navigateToPage('student-life')}
              >
                Student Life
              </Menu.Item>
              <Menu.Item style={{ ...menuItemStyle, paddingLeft: '2rem' }} className="cursor-pointer">
                <Link href="/student-experience/campus">Campus Tour</Link>
              </Menu.Item>
              <Menu.Item style={{ ...menuItemStyle, paddingLeft: '2rem' }} className="cursor-pointer">
                <Link href="/student-experience/campus/facilities">Facilities</Link>
              </Menu.Item>
              <Menu.Item style={{ ...menuItemStyle, paddingLeft: '2rem' }} className="cursor-pointer">
                <Link href="/student-experience/studios">Studios</Link>
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('student-showcase')}
              >
                Student Showcase
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('accommodation')}
              >
                Accommodation
              </Menu.Item>
              <Menu.Item
                style={menuItemStyle}
                className="cursor-pointer"
                onClick={() => navigateToPage('student-support')}
              >
                Student Support
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('financial-planning')}
              >
                Fees & Financial Planning
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('student-portal')}
              >
                Student Portal
              </Menu.Item>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('about')}>
                About
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('accreditation')}
              >
                Accreditation
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('academic-pathways')}
              >
                Academic Pathways
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('fellowship')}
              >
                Fellowship
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('our-alumni')}
              >
                Our Alumni
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('our-impact')}
              >
                Our Impact
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('work-with-us')}
              >
                Work With Us
              </Menu.Item>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('resources')}>
                Guides
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('news')}
              >
                News
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('events')}
              >
                Events
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('media-archive')}
              >
                Media Archive
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('frequently-asked-questions')}
              >
                FAQs
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        {!hiddenCTA && (
          <button
            type="button"
            onClick={() => navigateToPage('enquiry')}
            className="rounded-md bg-[#BA2E36] px-4 py-2 font-nexa text-[13px] font-bold text-white transition hover:bg-[#a02630]"
          >
            Apply
          </button>
        )}
      </div>
    )
  }

  if (isMinimal) {
    return (
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <Group>
          <div className="flex grow items-center py-2 font-nexa">
            <Link href="/" style={{ textDecoration: 'none' }}>
              {mode == 'dark' && <Image src={IconLogoLight} width={80} alt="Africa Digital Media Institute" priority />}
            </Link>
            <div className="grow"></div>
            {!hiddenCTA && (
              <div>
                <Button size="lg" backgroundColor="admiRed" label="Get In Touch" />
              </div>
            )}
          </div>
        </Group>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <Group>
        <div className="flex w-full items-center py-2 font-nexa">
          <Link href="/" style={{ textDecoration: 'none' }}>
            {mode == 'dark' && (
              <Image src={IconLogoLight} width={80} height={60} alt="Africa Digital Media Institute" priority />
            )}
          </Link>
          <div className="grow"></div>
          {isSmallScreen ? (
            getMenuMobile(mode)
          ) : (
            <div className="flex items-center gap-4">
              {getMenuWideScreen(mode)}
              {!hiddenCTA && (
                <button
                  type="button"
                  onClick={() => navigateToPage('enquiry')}
                  className="rounded-md bg-[#BA2E36] px-5 py-2.5 font-nexa text-[14px] font-bold text-white transition hover:bg-[#a02630]"
                >
                  Apply
                </button>
              )}
            </div>
          )}
        </div>
      </Group>
    </div>
  )
}

const menuDrawer: React.CSSProperties = {
  marginTop: 20,
  width: '200px'
}

const menuItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: 18
}
