import React from 'react'
import Head from 'next/head'
import { StaticImageData } from 'next/image'
import ImageLogo from '@/assets/logo.svg'
import { getBaseUrl, createFullUrl, ensureNakedDomain } from '@/utils/url'

interface PageSEOProps {
  title?: string
  description?: string
  image?: string | StaticImageData
  url?: string
  keywords?: string
  canonical?: string
}

const PageSEO: React.FC<PageSEOProps> = ({ title, description, image, url, keywords, canonical }) => {
  // Use utility functions to ensure consistent naked domain usage
  const baseUrl = getBaseUrl()
  const fullUrl = url ? createFullUrl(url) : baseUrl
  const canonicalUrl = canonical ? ensureNakedDomain(canonical) : fullUrl

  const pageTitle = `ADMI${title ? ` - ${title}` : ''}`
  const pageDescription =
    description ||
    'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training.'
  const pageImage = typeof image === 'string' ? image : image?.src || ImageLogo

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Africa Digital Media Institute" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ADMI" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:creator" content="@ADMIafrica" />
      <meta name="twitter:site" content="@ADMIafrica" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Africa Digital Media Institute" />
      <meta name="publisher" content="Africa Digital Media Institute" />
      <meta name="language" content="en" />

      {/* Primary location (headquarters) */}
      <meta name="geo.region" content="KE-30" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />

      {/* Service area coverage */}
      <meta name="coverage" content="Africa" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />

      {/* Theme Color */}
      <meta name="theme-color" content="#002A23" />
      <meta name="msapplication-TileColor" content="#002A23" />
    </Head>
  )
}

export default PageSEO
