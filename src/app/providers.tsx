'use client'

import { Notifications } from '@/lib/tw-mantine-notifications'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Notifications />
      {children}
    </>
  )
}
