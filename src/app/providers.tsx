'use client'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { defaultTheme } from '@/styles/theme'
import '@mantine/core/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={defaultTheme} defaultColorScheme="light" forceColorScheme="light">
      <Notifications />
      {children}
    </MantineProvider>
  )
}
