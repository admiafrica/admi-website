import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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