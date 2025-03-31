import Head from 'next/head';
import { useEffect, useState } from 'react';

import ImageLogo from '@/assets/logo.svg';

interface Props {
  title?: string;
  description?: string;
  image?: any;
  url?: string;
  keywords?: string;
}

function PageSEO({ title, description, image, url, keywords }: Props) {
  const [fullUrl, setFullUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setFullUrl(url ? `${baseUrl}${url}` : baseUrl);
    }
  }, [url]);

  const pageTitle = `ADMI${title ? ` - ${title}` : ''}`;
  const pageDescription = description || 'Default description for SEO optimization.';
  const pageImage = image || ImageLogo;

  return (
    <Head>
      {/* Title & Description */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* Viewport settings */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Canonical URL */}
      {fullUrl && <link rel="canonical" href={fullUrl} />}

      {/* Keywords for SEO */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Head>
  );
}

export default PageSEO;
