'use client'

import { MantineProvider } from '@/lib/tw-mantine'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>
}
