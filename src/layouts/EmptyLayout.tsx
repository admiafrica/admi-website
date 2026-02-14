import Head from 'next/head'
import styles from '@/assets/css/main.module.css'

type LayoutProps = {
  client: 'admi' | 'craydel'
  children: React.ReactNode
}

export function EmptyLayout({ children, client }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Africa Digital Media Institute (ADMI)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {client === 'craydel' ? <main className={styles['campaign-main']}>{children}</main> : <main>{children}</main>}
    </>
  )
}
