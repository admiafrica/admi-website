import { Group, Button, Text, Menu } from '@mantine/core';
import { Link } from 'react-router-dom';



export default function CampaignHeader() {
  return (
    <Group style={headerContentStyle}>
      {/* TODO: replace with logo asset */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text size="xl" fw={700} c="black">
          ADMI
        </Text>
      </Link>

      {/* Centered Menu */}
      <Group style={menuStyle}>
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

      {/* Enquire Button */}
      <Button variant="outline" size="md">
        Enquire
      </Button>
    </Group>
  );
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 20px',
  justifyContent: 'center',
  display: 'flex',
};

const menuStyle: React.CSSProperties = {
  flex: 1,
  justifyContent: 'center',
  display: 'flex',
};

const menuItemStyle: React.CSSProperties = {
  cursor: 'pointer',
};
