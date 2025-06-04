import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

// mantine components
import { defaultTheme } from '@/styles/theme'
import '@mantine/core/styles.css'
// font family
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={defaultTheme}>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
