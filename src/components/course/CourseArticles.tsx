import React from 'react'
import { Box, Card, SimpleGrid, Text, Badge, Group } from '@/lib/tw-mantine'
import Link from 'next/link'

interface CourseArticleProps {
  id: string
  title: string
  slug: string
  summary: string
  coverImage?: string
  tags?: string[]
  readingTime?: number
  category?: string
}

interface CourseArticlesProps {
  courseName: string
  courseTags?: string[]
  articles?: CourseArticleProps[]
}

/**
 * CourseArticles component
 * Displays relevant articles on course detail pages
 * Improves engagement and internal linking
 * Articles are matched by course tags or category
 */
export function CourseArticles({ courseName, articles = [] }: CourseArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <Box mt="xl" pt="xl" pb="xl" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
      <Text fw={700} size="xl" mb="md">
        Learn More: Related Articles & Guides
      </Text>

      <Text c="dimmed" mb="lg" size="sm">
        Deepen your understanding of {courseName} with these complementary resources
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {articles.map((article) => (
          <Link key={article.id} href={`/resources/${article.slug}`} style={{ textDecoration: 'none' }}>
            <Card
              component="a"
              p="md"
              radius="md"
              className="h-full transition-shadow hover:shadow-md"
              style={{ cursor: 'pointer' }}
            >
              {article.coverImage && (
                <div
                  style={{
                    height: '160px',
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
                      {article.readingTime} min read
                    </Text>
                  )}
                </Group>
              </Group>

              {article.tags && article.tags.length > 0 && (
                <Group gap={4} mt="md">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} size="xs" variant="light">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 2 && (
                    <Badge size="xs" variant="light">
                      +{article.tags.length - 2}
                    </Badge>
                  )}
                </Group>
              )}
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default CourseArticles
