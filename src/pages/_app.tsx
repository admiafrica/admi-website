import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'
import { WebVitals } from '@/components/shared/WebVitals'

// mantine components
import { defaultTheme } from '@/styles/theme'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
// font family
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

export default function App({ Component, pageProps }: AppProps) {
  const gtmId = process.env.NEXT_PUBLIC_ADMI_GTM_ID

  return (
    <MantineProvider theme={defaultTheme}>
      {/* Google Tag Manager */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Web Vitals Monitoring */}
      <WebVitals />

      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
