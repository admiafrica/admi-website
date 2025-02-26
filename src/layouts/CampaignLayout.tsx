import Head from 'next/head';

import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Footer } from '@/components/shared';

type LayoutProps = {
  client: 'admi' | 'craydel';
  children: React.ReactNode;
};

export function CampaignLayout({ children, client }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 });
  return (
    <>
      <Head>
        <title>Africa Digital Media Institute (ADMI)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell header={{ height: 81, collapsed: !pinned, offset: false }} padding="md">
        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>{children}</AppShell.Main>
        <AppShell.Footer style={footerStyle} pos="relative">
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </>
  );
}

const footerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
};
