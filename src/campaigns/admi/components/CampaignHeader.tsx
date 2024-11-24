import styles from '@/assets/css/main.module.css';
import logo from '@/assets/logo.svg';
import Image from 'next/image';
import React from "react";
export default function CampaignHeader() {
  return (
      <>
                    <header className={styles['header']}>
              <div className={styles['wrapper']}>
                  <a href="https://admi.africa" className={styles['site-logo']}>
                      <Image
                          width={90}
                          height={90}
                          src={logo.src}
                          alt="logo"
                          priority={true}
                      />
                  </a>

                  <a href="#lead_form" className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-floating']} ${styles['pulse']}`}>
                      Get a call back
                  </a>
              </div>
          </header>
      </>
  );
}
