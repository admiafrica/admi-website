import Script from "next/script";

type Props = {
  anayticsId: string;
};

export default function GoogleAnalyticsTag(props: Props) {
  const scriptId = `google-tag-manager-${props.anayticsId}`;

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
            'https://www.googletagmanager.com/gtm.js?id=' + '${props.anayticsId}' + dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${props.anayticsId}');
          `,
        }}
      />
      {/* Noscript Google Tag Manager */}
      {props.anayticsId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${props.anayticsId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}
    </>
  );
}
