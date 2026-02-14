import Head from 'next/head'

import { Footer } from '@/components/shared'

type LayoutProps = {
  client: 'admi' | 'craydel'
  children: React.ReactNode
}

export function CampaignLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Africa Digital Media Institute (ADMI)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>{children}</main>
        <footer className="relative flex justify-between bg-white p-5">
          <Footer />
        </footer>
      </div>
    </>
  )
}
