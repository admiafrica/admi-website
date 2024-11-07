import { EmptyLayout } from '@/layouts/EmptyLayout';
import styles from '@/assets/css/main.module.css';
import Image from 'next/image';
import successIcon from '@/assets/images/success-icon.svg';
import logo from '@/assets/logo.svg';
import React from 'react';
import Script from "next/script"; // Import Script from Next.js
export function ThankYouPage() {
    return (
        <>

            {/* Google Tag Manager script */}
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + '${process.env.NEXT_PUBLIC_GTM_ID}' + dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
                }}
            />
            {/* Noscript Google Tag Manager */}
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
            )}

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
