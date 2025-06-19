import Script from 'next/script'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Africa Digital Media Institute (ADMI)',
    template: '%s | ADMI'
  },
  description:
    'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training. Serving students from Kenya, Tanzania, Uganda, Rwanda, Nigeria, Ghana, South Africa and beyond.',
  keywords: [
    'creative media',
    'technology training',
    'digital media',
    'creative education',
    'Africa',
    'ADMI',
    'Africa Digital Media Institute',
    'film',
    'animation',
    'graphic design',
    'creative technology',
    'media technology',
    'Kenya',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Nigeria',
    'Ghana',
    'South Africa',
    'East Africa',
    'West Africa',
    'Southern Africa',
    'online learning',
    'creative training',
    'media education',
    'technology education',
    'creative institution',
    'Nairobi'
  ],
  authors: [{ name: 'Africa Digital Media Institute' }],
  creator: 'Africa Digital Media Institute',
  publisher: 'Africa Digital Media Institute',
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      sw: '/sw',
      fr: '/fr',
      ar: '/ar',
      pt: '/pt'
    }
  },
  openGraph: {
    title: 'Africa Digital Media Institute (ADMI)',
    description:
      'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training.',
    url: '/',
    siteName: 'Africa Digital Media Institute',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Africa Digital Media Institute'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa Digital Media Institute (ADMI)',
    description:
      'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training.',
    images: ['/logo.png'],
    creator: '@ADMIafrica'
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': 200,
    'max-image-preview': 'large',
    'max-video-preview': -1
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://cdn.contentful.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* LLM-friendly content discovery */}
        <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM Information" />
        {/* Early Brevo Blocker - Runs before GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Block Brevo before GTM loads
            (function() {
              // Override document.createElement to block Brevo iframes
              const originalCreateElement = document.createElement;
              document.createElement = function(tagName) {
                const element = originalCreateElement.call(document, tagName);
                
                if (tagName.toLowerCase() === 'iframe') {
                  const originalSetAttribute = element.setAttribute;
                  element.setAttribute = function(name, value) {
                    if (name === 'src' && value && (value.includes('brevo') || value.includes('sendinblue'))) {
                      console.log('Blocked Brevo iframe:', value);
                      return;
                    }
                    return originalSetAttribute.call(this, name, value);
                  };
                }
                
                return element;
              };
              
              // Block network requests to Brevo
              if (window.fetch) {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  if (args[0] && (args[0].includes('brevo') || args[0].includes('sendinblue'))) {
                    console.log('Blocked Brevo fetch:', args[0]);
                    return Promise.reject(new Error('Blocked Brevo request'));
                  }
                  return originalFetch.apply(this, args);
                };
              }
            })();
            `
          }}
        />
        {/* Block Brevo chat widget with CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Hide all Brevo chat widgets */
            [id*="brevo"],
            [class*="brevo"],
            [class*="sib-conversations"],
            [id^="sib-container"],
            [id^="sib-chatbox"],
            iframe[src*="conversations-widget.brevo.com"],
            iframe[src*="sendinblue.com"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
            }
            
            /* Ensure our ADMI widget is always visible */
            .admi-ai-widget,
            #ai-chat-widget,
            #admi-chat-button,
            #admi-chat-container {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
              pointer-events: auto !important;
            }
          `
          }}
        />

        {/* Web Vitals Monitoring */}
        <Script id="web-vitals" strategy="afterInteractive" type="module">
          {`
            function sendToAnalytics(metric) {
              const body = JSON.stringify(metric);
              (navigator.sendBeacon && navigator.sendBeacon('/api/vitals', body)) ||
                fetch('/api/vitals', {body, method: 'POST', keepalive: true});
            }

            try {
              const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');
              getCLS(sendToAnalytics);
              getFID(sendToAnalytics);
              getLCP(sendToAnalytics);
              getFCP(sendToAnalytics);
              getTTFB(sendToAnalytics);
            } catch (error) {
              console.warn('Web Vitals could not be loaded:', error);
            }
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
