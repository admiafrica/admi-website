import styles from "@/assets/css/main.module.css";
import React, { useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";
import { getCourseFormUrl } from "@/utils";

type CampaignLeadFormProps = {
  onVisibilityChange: (visible: boolean) => void;
  status: number;
  footerText: string;
  course: string;
  intake: string;
};

export default function CampaignLeadForm({
  onVisibilityChange,
  status,
}: CampaignLeadFormProps) {
  const [courseName, setCourseName] = useState<string>();
  const [, setCountryCode] = useState<string>();
  const leadFormRef = useRef<HTMLFormElement | null>(null);
  const leadFormBtnRef = useRef(null);
  const router = useRouter();

  // Auto-detect the country based on IP when the component mounts
  useEffect(() => {
    const leadFormBtn = leadFormBtnRef.current;

    const handler: IntersectionObserverCallback = (entries) => {
      // Notify the parent component of visibility status
      if (!entries[0].isIntersecting) {
        onVisibilityChange(false);
      } else {
        onVisibilityChange(true);
      }
    };

    const observer = new window.IntersectionObserver(handler);
    if (leadFormBtn) {
      observer.observe(leadFormBtn);
    }

    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setCountryCode(data.country.toLowerCase()); // Set the detected country code
      } catch (error) {
        console.error("Error detecting country:", error);
      }
    };

    detectCountry();

    return () => {
      if (leadFormBtn) {
        observer.unobserve(leadFormBtn);
      }
    };
  }, [onVisibilityChange]);

  useEffect(() => {
    const params = router.query;
    const name = params.campaign ? (params.campaign as string) : "";
    setCourseName(name);
  }, [router.query]);

  return (
    <div>
      <form
        ref={leadFormRef}
        id="lead_form"
        className={`${styles["lead-form"]} ${
          status === 1 ? "" : styles["no-course"]
        }`}
      >
        <div className={`${styles["lead-form__content"]}`}>
          <iframe
            className="airtable-embed"
            src={courseName?getCourseFormUrl(): '#'}
            frameBorder={0}
            width="100%"
            height="533"
            style={{ background: "transparent", border: "1px solid #ccc" }}
          ></iframe>
        </div>
      </form>
    </div>
  );
}
