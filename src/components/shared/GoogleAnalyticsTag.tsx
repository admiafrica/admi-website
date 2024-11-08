import Script from "next/script";

type Props = {
  analyticsId: string;
};

export default function GoogleAnalyticsTag(props: Props) {
  const scriptId = `google-tag-manager-${props.analyticsId}`;

  return (
    <>
      <Script
        id={scriptId}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + '${props.analyticsId}' + dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${props.analyticsId}');
          `,
        }}
      />
      {/* Noscript Google Tag Manager */}
      {props.analyticsId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${props.analyticsId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}
    </>
  );
}
