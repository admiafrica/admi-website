import Script from 'next/script'

interface GoogleTagManagerProps {
  gtmId: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Stub fbq to prevent ReferenceError before Meta Pixel SDK loads via GTM
          if (typeof window.fbq === 'undefined') {
            window.fbq = function() {
              (window.fbq.q = window.fbq.q || []).push(arguments);
            };
            window.fbq.loaded = false;
            window.fbq.version = '2.0';
            window.fbq.q = [];
            window._fbq = window.fbq;
          }
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `
      }}
    />
  )
}
