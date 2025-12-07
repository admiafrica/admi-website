import React, { useMemo } from 'react'
import { Box, Badge, Group, Stack, Text, Card, SimpleGrid } from '@mantine/core'

interface ArticleMetadataProps {
  tags?: string[]
  readingTime?: number
  publishedDate?: string
  modifiedDate?: string
  category?: string
  author?: string
}

/**
 * Enhanced article metadata component
 * Displays tags, reading time, and dates with SEO optimization
 */
export function ArticleMetadata({
  tags = [],
  readingTime = 0,
  publishedDate,
  category,
  author = 'ADMI Editorial Team'
}: ArticleMetadataProps) {
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <Stack gap="md" mb="xl">
      {/* Publishing info */}
      <Group gap="md">
        {author && (
          <Text size="sm" c="dimmed">
            By {author}
          </Text>
        )}
        {formattedDate && (
          <Text size="sm" c="dimmed">
            {formattedDate}
          </Text>
        )}
        {readingTime > 0 && (
          <Text size="sm" c="dimmed">
            {readingTime} min read
          </Text>
        )}
      </Group>

      {/* Category badge */}
      {category && (
        <Group gap="xs">
          <Badge variant="light" size="lg">
            {category}
          </Badge>
        </Group>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <Group gap="xs">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              component="a"
              href={`/resources?tag=${encodeURIComponent(tag)}`}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </Badge>
          ))}
        </Group>
      )}
    </Stack>
  )
}

interface RelatedArticleProps {
  id: string
  title: string
  slug: string
  summary: string
  coverImage?: string
  tags?: string[]
  readingTime?: number
}

interface RelatedArticlesProps {
  currentArticleTags?: string[]
  currentArticleId?: string
  articles?: RelatedArticleProps[]
}

/**
 * Related articles widget
 * Shows 3-4 related articles based on tag similarity
 * Improves internal linking and reduces bounce rate
 */
export function RelatedArticles({ currentArticleTags = [], currentArticleId, articles = [] }: RelatedArticlesProps) {
  // Calculate relevance score based on tag overlap
  const scoredArticles = useMemo(() => {
    return articles
      .filter((a) => a.id !== currentArticleId)
      .map((article) => {
        const matchedTags = (article.tags || []).filter((tag) => currentArticleTags.includes(tag))
        return {
          ...article,
          relevanceScore: matchedTags.length,
          matchedTags
        }
      })
      .filter((a) => a.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3)
  }, [articles, currentArticleTags, currentArticleId])

  if (scoredArticles.length === 0) return null

  return (
    <Box mt="xl" pt="xl" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
      <Text fw={600} size="lg" mb="md">
        Related Articles
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {scoredArticles.map((article) => (
          <Card
            key={article.id}
            component="a"
            href={`/resources/${article.slug}`}
            p="md"
            radius="md"
            className="h-full transition-shadow hover:shadow-md"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            {article.coverImage && (
              <div
                style={{
                  height: '150px',
                  backgroundImage: `url(${article.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}
              />
            )}

            <Text fw={600} size="sm" lineClamp={2} className="mb-2">
              {article.title}
            </Text>

            <Text size="xs" c="dimmed" lineClamp={2} mb="md">
              {article.summary}
            </Text>

            <Group gap="xs" justify="space-between">
              <Group gap="xs">
                {article.readingTime && (
                  <Text size="xs" c="dimmed">
                    {article.readingTime} min
                  </Text>
                )}
              </Group>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ArticleMetadata
