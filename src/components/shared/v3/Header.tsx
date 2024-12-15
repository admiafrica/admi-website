import { Group, Button, Text, Menu } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu } from '@tabler/icons-react';

import logo from '@/assets/logo-light.svg';

export default function CampaignHeader() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const getMenuWideScreen = () => {
    return (
      <Group className="mx-auto">
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
            <Text style={menuItemStyle}>Resources</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>News</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>Events</Text>
          </Menu.Target>
        </Menu>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Text style={menuItemStyle}>About</Text>
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
    <Group className="w-full px-4">
      <Group className="flex grow flex-row-reverse md:flex-row">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src={logo} width={80} alt="Africa Digital Media Institute" />
        </Link>
        {isMobile ? getMenuMobile() : getMenuWideScreen()}
      </Group>
      {/* Enquire Button */}
      <Button variant="primary" size="lg" color="admi-orange">
        Enquire
      </Button>
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
  color: '#BA2E36',
};
