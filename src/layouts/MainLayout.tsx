import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { Footer, Header } from '../components/shared';

type LayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header style={headerStyle}>
        <Header />
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        {children}
      </AppShell.Main>
      <AppShell.Footer style={footerStyle} pos="relative">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6',
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
};
