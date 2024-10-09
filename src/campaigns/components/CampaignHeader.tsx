import { Group } from "@mantine/core";
import logo from "@/assets/logo-main.svg";
import Image from "next/image";

export default function CampaignHeader() {
  return (
    <Group style={headerContentStyle}>
      <Image src={logo} width={80} alt="Africa Digital Media Institute" />
    </Group>
  );
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 20px",
  justifyContent: "center",
  display: "flex",
};
