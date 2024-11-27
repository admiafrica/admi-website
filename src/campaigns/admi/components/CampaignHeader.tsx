import styles from "@/assets/css/main.module.css";
import logo from "@/assets/logo.svg";
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
    <>
      <header className={styles["header"]}>
        <div className={styles["wrapper"]}>
          <a href="https://admi.africa" className={styles["site-logo"]}>
            <Image
              width={90}
              height={90}
              src={logo.src}
              alt="logo"
              priority={true}
            />
          </a>

          <a
            href={getCourseFormUrl(activeCourse)}
            className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btn-floating"]} ${styles["pulse"]}`}
          >
            Get a call back
          </a>
        </div>
      </header>
    </>
  );
}
