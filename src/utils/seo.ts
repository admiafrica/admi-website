import { Metadata } from 'next'
import { getBaseUrl, createFullUrl } from './url'

interface SEOProps {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'course'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [],
  section
}: SEOProps): Metadata {
  // Use utility functions to ensure consistent naked domain usage
  const baseUrl = getBaseUrl()
  const fullUrl = url ? createFullUrl(url) : baseUrl
  const defaultDescription =
    'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training.'
  const defaultImage = `${baseUrl}/logo.png`

  const pageTitle = `ADMI${title ? ` - ${title}` : ''}`

  return {
    title: pageTitle,
    description: description || defaultDescription,
    keywords: keywords.join(', '),
    authors: authors.map((author) => ({ name: author })),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl
    },
    openGraph: {
      title: pageTitle,
      description: description || defaultDescription,
      url: fullUrl,
      siteName: 'Africa Digital Media Institute',
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: type === 'course' ? 'article' : type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section })
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description || defaultDescription,
      images: [image || defaultImage],
      creator: '@ADMIafrica',
      site: '@ADMIafrica'
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 200,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  }
}
