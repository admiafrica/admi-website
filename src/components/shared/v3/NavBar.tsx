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
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('student-support')}>
              Student Support
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigateToPage('student-support#fees')}>Fee Structure & Payment Plans</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('student-support')}>Academic Support</Menu.Item>
            <Menu.Item onClick={() => navigateToPage('student-portal')}>Student Portal</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('resources')}>
              Resources
            </Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('news-events')}>
              News & Events
            </Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('about')}>
              About ADMI
            </Text>
          </Menu.Target>
        </Menu>
      </Group>
    )
  }

  const getMenuMobile = (mode: string) => {
    return (
      <div className="ml-auto w-fit pr-6">
        <Group c={mode == 'dark' ? 'white' : 'black'}>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <IconMenu />
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
                onClick={() => navigateToPage('student-support')}
              >
                Student Support
              </Menu.Item>
              <Menu.Item
                style={{ ...menuItemStyle, paddingLeft: '2rem' }}
                className="cursor-pointer"
                onClick={() => navigateToPage('student-support#fees')}
              >
                📋 Fee Structure & Payments
              </Menu.Item>
              <Menu.Item style={menuItemStyle} onClick={() => navigateToPage('resources')}>
                Resources
              </Menu.Item>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('news-events')}>
                News & Events
              </Menu.Item>
              <Menu.Item style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('about')}>
                About
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    )
  }

  if (isMinimal) {
    return (
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <Group>
          <div className="flex grow font-nexa sm:flex-row-reverse md:flex-row">
            <Link href="/" style={{ textDecoration: 'none' }} className="my-auto h-fit pt-4">
              {mode == 'dark' && <Image src={IconLogoLight} width={80} alt="Africa Digital Media Institute" />}
            </Link>
            <div className="grow"></div>
            {!hiddenCTA && (
              <div className="my-auto">
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
        <div className="flex w-full flex-row-reverse font-nexa md:flex-row">
          <Link href="/" style={{ textDecoration: 'none' }} className="pt-4 md:mr-auto">
            {mode == 'dark' && (
              <Image src={IconLogoLight} width={80} height={60} alt="Africa Digital Media Institute" />
            )}
          </Link>
          <div className="hidden grow md:block"></div>
          {isSmallScreen ? getMenuMobile(mode) : getMenuWideScreen(mode)}
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
