import { Metadata } from 'next'

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
  section,
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const defaultDescription = 'Africa Digital Media Institute - Empowering creative professionals through industry-relevant education and training.'
  const defaultImage = `${baseUrl}/logo.png`
  
  const pageTitle = `ADMI${title ? ` - ${title}` : ''}`
  
  return {
    title: pageTitle,
    description: description || defaultDescription,
    keywords: keywords.join(', '),
    authors: authors.map(author => ({ name: author })),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
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
          alt: title,
        },
      ],
      locale: 'en_KE',
      type: type === 'course' ? 'article' : type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description || defaultDescription,
      images: [image || defaultImage],
      creator: '@admi_ke',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 200,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}