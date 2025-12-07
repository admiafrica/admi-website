import { FC } from 'react'

interface BreadcrumbSchemaProps {
  title: string
  slug: string
  category?: string
}

/**
 * BreadcrumbSchema component
 * Renders JSON-LD breadcrumb schema for improved SERP appearance
 * Structure: Home > Resources > Category > Article Title
 */
export const BreadcrumbSchema: FC<BreadcrumbSchemaProps> = ({ title, slug, category }) => {
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://admi.africa'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Resources',
      item: 'https://admi.africa/resources'
    },
    ...(category
      ? [
          {
            '@type': 'ListItem',
            position: 3,
            name: category,
            item: `https://admi.africa/resources?category=${encodeURIComponent(category)}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: title,
            item: `https://admi.africa/resources/${slug}`
          }
        ]
      : [
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: `https://admi.africa/resources/${slug}`
          }
        ])
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default BreadcrumbSchema
