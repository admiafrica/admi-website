'use client'

import { MantineProvider } from '@/lib/tw-mantine'
import { Notifications } from '@/lib/tw-mantine-notifications'
import { defaultTheme } from '@/styles/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={defaultTheme} defaultColorScheme="light" forceColorScheme="light">
      <Notifications />
      {children}
    </MantineProvider>
  )
}
