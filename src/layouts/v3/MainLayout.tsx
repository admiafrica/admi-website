import '@mantine/carousel/styles.css';

import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Footer, FooterMini, NavBar } from '@/components/shared/v3';
import { nexaFont, proximaNovaFont } from '@/styles/theme';

type LayoutProps = {
  children: React.ReactNode;
  minimizeFooter?: boolean;
};

export function MainLayout({ children, minimizeFooter = false }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 });
  const mode = 'dark';

  return (
    <div className={`${proximaNovaFont.variable} ${nexaFont.variable}`}>
      <AppShell header={{ height: 81, collapsed: !pinned, offset: false }} padding="md">
        <AppShell.Header style={headerStyle} bg={mode == 'dark' ? 'black' : 'white'}>
          <NavBar mode={mode} />
        </AppShell.Header>

        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`} p={0}>
          {children}
        </AppShell.Main>
        <AppShell.Footer pos="relative" withBorder={false}>
          {minimizeFooter ? <FooterMini /> : <Footer />}
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  margin: 0,
  borderBottom: 'none',
};
