import Head from "next/head";

import { AppShell, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import { CampaignHeader as CraydelCampaignHeader } from "@/campaigns/craydel/components";
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
          header={{ height: 81, collapsed: !pinned, offset: false }}
          padding="md"
        >
          <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
            {children}
          </AppShell.Main>
          <AppShell.Footer pos="relative">
          <Footer/>
          </AppShell.Footer>
        </AppShell>
      )}
    </>
  );
}
