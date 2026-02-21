import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Notifications } from '@/lib/tw-mantine-notifications'
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'
import { WebVitals } from '@/components/shared/WebVitals'

// font family
import '@fontsource-variable/fraunces'

export default function App({ Component, pageProps }: AppProps) {
  const gtmId = process.env.NEXT_PUBLIC_ADMI_GTM_ID

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Web Vitals Monitoring */}
      <WebVitals />

      <Notifications />
      <Component {...pageProps} />
    </>
  )
}
