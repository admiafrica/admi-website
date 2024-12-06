import styles from "@/assets/css/main.module.css";
import { Affix, Group } from "@mantine/core";
import logo from "@/assets/logo-main.svg";
import { getCourseFormUrl } from "@/utils";
import Image from "next/image";
import React from "react";
import { CampaignHeaderLayout } from "@/campaigns/components";

type Props = {
  courseName: string;
};

export default function CampaignHeader({ courseName }: Props) {
  return (
    <CampaignHeaderLayout>
      <Group style={headerContentStyle}>
        <Image src={logo} width={80} alt="Africa Digital Media Institute" />

        <Affix position={{ right: 10 }}>
          <a
            href={getCourseFormUrl()}
            className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btn-floating"]} ${styles["pulse"]}`}
            style={ctaBtnStyle}
          >
            Get a call back
          </a>
        </Affix>
      </Group>
    </CampaignHeaderLayout>
  );
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: "0 15px",
  display: "flex",
  maxWidth: 1280,
  margin: "auto",
};

const ctaBtnStyle: React.CSSProperties = {
  top: 14,
  width: 200,
  height: 54,
  padding: 8,
  fontSize: "1.2em",
};
