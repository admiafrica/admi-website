import React from 'react';
import Image from 'next/image';

import { EmptyLayout } from '@/layouts/EmptyLayout';
import { GoogleAnalyticsTag } from '@/components/shared';
import successIcon from '@/assets/images/success-icon.svg';
import logo from '@/assets/logo.svg';
import styles from '@/assets/css/main.module.css';

export function ThankYouPage() {
    return (
        <>
            <GoogleAnalyticsTag analyticsId={process.env.NEXT_PUBLIC_ADMI_GTM_ID as string}/>
            <EmptyLayout client="craydel">
                <section className={`${styles['section-wrapper']} ${styles['thank-you-section']}`}>
                    <div className={`${styles['wrapper']}`}>
                        <div className={`${styles['thank-you-card']}`}>
                            <div className={`${styles['thank-you-card--icon']}`}>
                                <Image fetchPriority="high" src={successIcon.src} alt="Success" width={100} height={100} />
                            </div>
                            <h1 className={`${styles['section-title']} ${styles['section-title--small']}`}>Thank you!</h1>
                            <p>Thank you for your enquiry. Our team will reach out with more information about our courses.</p>
                            <a href="https://admi.africa/" className={`${styles['btn']} ${styles['btn-primary']}`}>Back to our website</a>
                            <a href="https://admi.africa" className={`${styles['site-logo']}`}>
                                <Image src={logo.src} alt={'ADMI'} width={90} height={90}></Image>
                            </a>
                        </div>
                    </div>
                </section>
            </EmptyLayout>
        </>

  );
}
