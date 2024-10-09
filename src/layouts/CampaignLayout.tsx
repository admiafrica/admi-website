import Head from "next/head";

import { AppShell, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import { CampaignHeader } from "@/campaigns/components";
import { CraydelCampaignHeader } from "@/campaigns/craydel/components";
import { Footer } from "@/components/shared";

import styles from "@/assets/css/main.module.css";

type LayoutProps = {
  client: "admi" | "craydel";
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
      {client === "craydel" && <CraydelCampaignHeader />}
      {client === "craydel" ? (
        <main className={styles["campaign-main"]}>{children}</main>
      ) : (
        <AppShell
          header={{ height: 60, collapsed: !pinned, offset: false }}
          padding="md"
        >
          <AppShell.Header style={headerStyle}>
            <CampaignHeader />
          </AppShell.Header>

          <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
            {children}
          </AppShell.Main>
          <AppShell.Footer style={footerStyle} pos="relative">
            <Footer />
          </AppShell.Footer>
        </AppShell>
      )}
    </>
  );
}

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  backgroundColor: "#f8f9fa",
  borderBottom: "1px solid #dee2e6",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
};
