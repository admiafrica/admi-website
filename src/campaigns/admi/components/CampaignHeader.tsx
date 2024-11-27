import styles from "@/assets/css/main.module.css";
import { Group } from "@mantine/core";
import logo from "@/assets/logo-main.svg";
import { getCourseFormUrl } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const getSelectedCourse = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedCourse") || "";
  }
  return "";
};

export default function CampaignHeader() {
  const [activeCourse, setActiveCourse] = useState<string>(getSelectedCourse);

  useEffect(() => {
    // Keep syncing the value in case localStorage changes
    const storedCourseName = localStorage.getItem("selectedCourse");
    if (storedCourseName && storedCourseName !== activeCourse) {
      setActiveCourse(storedCourseName);
    }
  }, [activeCourse]);

  return (
    <Group style={headerContentStyle}>
      <Image src={logo} width={80} alt="Africa Digital Media Institute" />
      <a
        href={getCourseFormUrl(activeCourse)}
        className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btn-floating"]} ${styles["pulse"]}`}
        style={ctaBtnStyle}
      >
        Get a call back
      </a>
    </Group>
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
  top: 16,
  width: 200,
  padding: 8,
  fontSize: "1.2em",
};
