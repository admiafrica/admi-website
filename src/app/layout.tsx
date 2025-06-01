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
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendToAnalytics(metric) {
              const body = JSON.stringify(metric);
              (navigator.sendBeacon && navigator.sendBeacon('/api/vitals', body)) || 
                fetch('/api/vitals', {body, method: 'POST', keepalive: true});
            }
            
            import('web-vitals').then(({getCLS, getFID, getLCP, getFCP, getTTFB}) => {
              getCLS(sendToAnalytics);
              getFID(sendToAnalytics);
              getLCP(sendToAnalytics);
              getFCP(sendToAnalytics);
              getTTFB(sendToAnalytics);
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}