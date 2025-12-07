import { FC } from 'react'

interface VideoObjectSchemaProps {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
}

/**
 * VideoObjectSchema component
 * Renders JSON-LD Video schema for rich video snippets
 * Eligible for Google Video rich results
 */
export const VideoObjectSchema: FC<VideoObjectSchemaProps> = ({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration = 'PT2M30S',
  contentUrl,
  embedUrl
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: uploadDate,
    duration: duration,
    ...(contentUrl && { contentUrl: contentUrl }),
    ...(embedUrl && { embedUrl: embedUrl })
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default VideoObjectSchema
