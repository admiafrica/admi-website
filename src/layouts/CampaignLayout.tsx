import Head from "next/head";

import { AppShell, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import { CampaignHeader } from "@/campaigns/components";
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
        {/* Google Tag Manager Script */}
        {process.env.BUILD_ENV === 'production' && (
            <script
                dangerouslySetInnerHTML={{
                  __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=' + '${process.env.NEXT_PUBLIC_GTM_ID}' + dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
                }}
            />
        )}
      </Head>
      {/* Google Tag Manager Noscript */}
      {process.env.BUILD_ENV === 'production' && (
          <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
      )}
      {client === "craydel" && <CraydelCampaignHeader />}
      {client === "craydel" ? (
        <main className={styles["campaign-main"]}>{children}</main>
      ) : (
        <AppShell
          header={{ height: 81, collapsed: !pinned, offset: false }}
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
  backgroundColor: "white",
  borderBottom: "1px solid #dee2e6",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
};
