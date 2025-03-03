import Head from 'next/head';

import ImageLogo from '@/assets/logo.svg';
interface Props {
  title?: string;
  description?: string;
  image?: string;
}

function PageSEO({ title, description, image }: Props) {
  const pageTitle = `ADMI${title ? ` - ${title}` : ''}`;
  const pageDescription = description || '';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph meta tags */}
      {image ? <meta property="og:image" content={image} /> : <meta property="og:image" content={ImageLogo} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />

      {/* Twitter meta tags */}
      {image ? <meta name="twitter:card" content={image} /> : <meta property="twitter:card" content={ImageLogo} />}
      {image ? <meta name="twitter:image" content={image} /> : <meta property="twitter:image" content={ImageLogo} />}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  );
}

export default PageSEO;
