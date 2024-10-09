import { Group, Button, Text, Menu } from "@mantine/core";
import Link from "next/link";
import logo from "@/assets/images/logo_admi.svg";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { IconMenu } from "@tabler/icons-react";

export default function CampaignHeader() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const getMenuWideScreen = () => {
    return (
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
    );
  };

  return (
    <Group style={isMobile ? headerContentMobileStyle : headerContentStyle}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Image src={logo} width={80} alt="Africa Digital Media Institute" />
      </Link>

      {/* Centered Menu */}
      {isMobile ? (
        <div className="flex grow content-end">
          <IconMenu />
        </div>
      ) : (
        getMenuWideScreen()
      )}

      {/* Enquire Button */}
      <Button variant="primary" size="lg" color="admi-orange">
        Enquire
      </Button>
    </Group>
  );
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 20px",
  justifyContent: "center",
  display: "flex",
};

const headerContentMobileStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 20px",
  justifyContent: "initial",
  display: "flex",
};

const menuStyle: React.CSSProperties = {
  flex: 1,
  justifyContent: "center",
  display: "flex",
};

const menuItemStyle: React.CSSProperties = {
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 18,
};
