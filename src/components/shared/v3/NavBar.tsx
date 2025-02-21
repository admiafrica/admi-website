import { Group, Text, Menu } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu } from '@tabler/icons-react';

import IconLogoLight from '@/assets/logo-light.svg';
import { Button } from '@/components/ui';

type Props = {
  mode: string;
  isMinimal?: boolean;
};

export default function NavBar({ mode, isMinimal = false }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const navigateToPage = (pagePath: string) => {
    router.push(`/v3/${pagePath}`);
  };

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

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle} className="cursor-pointer" onClick={() => navigateToPage('student-support')}>
              Student Support
            </Text>
          </Menu.Target>
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
    );
  };

  const getMenuMobile = (mode: string) => {
    return (
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
    );
  };

  if (isMinimal) {
    return (
      <Group className={`mx-auto w-full max-w-screen-xl px-4`}>
        <div className="flex grow font-nexa sm:flex-row-reverse md:flex-row">
          <Link href="/" style={{ textDecoration: 'none' }} className="my-auto h-fit pt-4">
            {mode == 'dark' && <Image src={IconLogoLight} width={80} alt="Africa Digital Media Institute" />}
          </Link>
          <div className="grow"></div>
          <div className="my-auto">
            <Button size="lg" backgroundColor="admiRed" label="Get In Touch" />
          </div>
        </div>
      </Group>
    );
  }

  return (
    <Group className={`mx-auto w-full max-w-screen-xl px-4`}>
      <Group className="flex grow flex-row-reverse font-nexa md:flex-row">
        <Link href="/" style={{ textDecoration: 'none', margin: 'auto' }} className="pt-4">
          {mode == 'dark' && <Image src={IconLogoLight} width={80} height={60} alt="Africa Digital Media Institute" />}
        </Link>
        <div className="grow"></div>
        {isMobile ? getMenuMobile(mode) : getMenuWideScreen(mode)}
      </Group>
    </Group>
  );
}

const menuDrawer: React.CSSProperties = {
  marginTop: 20,
  width: '90%',
};

const menuItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: 18,
};
