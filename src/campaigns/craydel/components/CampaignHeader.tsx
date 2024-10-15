import styles from '@/assets/css/main.module.css';
import logo from '@/assets/logo.svg';
import Image from 'next/image';
import Head from 'next/head';
export default function CampaignHeader() {
  return (
      <>
          <Head>
              {process.env.BUILD_ENV === 'production' && (
                  <script
                      dangerouslySetInnerHTML={{
                          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NQLRWC7Q');
              `
                      }}
                  />
              )}
          </Head>

          {process.env.BUILD_ENV === 'production' && (
              <noscript>
                  <iframe
                      src="https://www.googletagmanager.com/ns.html?id=GTM-NQLRWC7Q"
                      height="0"
                      width="0"
                      style={{ display: 'none', visibility: 'hidden' }}>
                  </iframe>
              </noscript>
          )}

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
