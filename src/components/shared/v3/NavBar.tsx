import { Group, Text, Menu } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu } from '@tabler/icons-react';

import logo from '@/assets/logo-dark.svg';

export default function NavBar() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const getMenuWideScreen = () => {
    return (
      <Group>
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>Home</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>Courses</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>Student Support</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>Resources</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>News & Events</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>About ADMI</Text>
          </Menu.Target>
        </Menu>
      </Group>
    );
  };

  const getMenuMobile = () => {
    return (
      <Group>
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <IconMenu />
          </Menu.Target>

          <Menu.Dropdown style={menuDrawer}>
            <Menu.Item style={menuItemStyle}>Home</Menu.Item>
            <Menu.Item style={menuItemStyle}>Courses</Menu.Item>
            <Menu.Item style={menuItemStyle}>Student Support</Menu.Item>
            <Menu.Item style={menuItemStyle}>Resources</Menu.Item>
            <Menu.Item style={menuItemStyle}>News</Menu.Item>
            <Menu.Item style={menuItemStyle}>Events</Menu.Item>
            <Menu.Item style={menuItemStyle}>About</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  };

  return (
    <Group className="w-full px-4 max-w-screen-2xl mx-auto">
      <Group className="flex grow flex-row-reverse font-nexa md:flex-row">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src={logo} width={80} alt="Africa Digital Media Institute" />
        </Link>
        <div className="grow"></div>
        {isMobile ? getMenuMobile() : getMenuWideScreen()}
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
  // color: '#BA2E36',
};
