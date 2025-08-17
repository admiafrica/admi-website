import Script from 'next/script'
import { Metadata } from 'next'
import { Providers } from './providers'
import '@/styles/globals.css'

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

        {/* Web Vitals Monitoring */}
        <Script id="web-vitals" strategy="afterInteractive" type="module">
          {`
            function sendToAnalytics(metric) {
              const data = {
                ...metric,
                timestamp: Date.now(),
                pathname: window.location.pathname,
                connectionType: navigator.connection?.effectiveType || 'unknown'
              };
              
              // Send to Google Analytics via GTM (primary tracking)
              if (typeof gtag !== 'undefined') {
                gtag('event', 'web_vitals', {
                  metric_name: metric.name,
                  metric_value: Math.round(metric.value),
                  metric_rating: metric.rating,
                  page_location: window.location.href,
                  page_title: document.title,
                  connection_type: data.connectionType,
                  custom_map: {
                    'metric_name': 'metric_name',
                    'metric_value': 'metric_value', 
                    'metric_rating': 'metric_rating'
                  }
                });
                console.log('📈 Web Vital sent to GA4:', metric.name, Math.round(metric.value), metric.rating);
              }
              
              // Backup server-side logging
              const body = JSON.stringify(data);
              if (navigator.sendBeacon) {
                navigator.sendBeacon('/api/vitals', body);
              } else {
                fetch('/api/vitals', {
                  body, 
                  method: 'POST', 
                  keepalive: true,
                  headers: {'Content-Type': 'application/json'}
                }).catch(err => console.warn('Vitals backup logging failed:', err));
              }
            }

            try {
              const { getCLS, getFID, getLCP, getFCP, getTTFB, onINP } = await import('web-vitals');
              
              // Core Web Vitals (Google ranking factors)
              getCLS(sendToAnalytics);    // Cumulative Layout Shift
              getLCP(sendToAnalytics);    // Largest Contentful Paint
              getFID(sendToAnalytics);    // First Input Delay (deprecated but still tracked)
              
              // New Core Web Vital (replacing FID)
              onINP(sendToAnalytics);     // Interaction to Next Paint
              
              // Additional helpful metrics
              getFCP(sendToAnalytics);    // First Contentful Paint
              getTTFB(sendToAnalytics);   // Time to First Byte
              
              console.log('✅ Web Vitals monitoring initialized');
            } catch (error) {
              console.warn('❌ Web Vitals could not be loaded:', error);
            }
          `}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
