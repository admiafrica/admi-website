import styles from '@/assets/css/main.module.css';
import { CampaignHeader } from '../components/campaign';
import Head from 'next/head';

type LayoutProps = {
  children: React.ReactNode;
};

export function CampaignLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Africa Digital Media Institute (ADMI)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CampaignHeader />
      <main className={styles['campaign-main']}>
        {children}
      </main>
    </>
  );
}