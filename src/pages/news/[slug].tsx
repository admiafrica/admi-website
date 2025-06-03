import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { ArticleSchema, BreadcrumbSchema } from '@/components/shared/StructuredData'

export default function NewsDetailPage({ article, slug }: { article: any; slug: string }) {
  // Handle case where article is undefined
  if (!article) {
    return (
      <MainLayout>
        <PageSEO title="Article Not Found" />
        <div>Article not found</div>
      </MainLayout>
    )
  }

  // Extract plain text from the rich text content for description
  const getPlainTextFromRichText = (richText: any) => {
    if (!richText || !richText.content) return ''

    return (
      richText.content
        .map((block: any) => block.content?.map((content: any) => content.value).join(' '))
        .join(' ')
        .substring(0, 200) + '...'
    )
  }

  const description = getPlainTextFromRichText(article.content) || 'Read the latest news from ADMI'
  const articleBody = getPlainTextFromRichText(article.content) || ''

  // Format the date
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString()
  }

  return (
    <MainLayout>
      <PageSEO
        title={article.title || 'News Article'}
        image={article.featuredImage?.fields?.file?.url ? `https:${article.featuredImage.fields.file.url}` : undefined}
        url={`/news/${slug}`}
        description={description}
      />

      {/* Structured Data */}
      <ArticleSchema
        headline={article.title || 'News Article'}
        description={description}
        image={article.featuredImage?.fields?.file?.url ? `https:${article.featuredImage.fields.file.url}` : undefined}
        url={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/news/${slug}`}
        datePublished={formatDate(article.publishDate || article.sys?.createdAt)}
        dateModified={formatDate(article.sys?.updatedAt)}
        author={
          article.author
            ? {
                name: article.author.fields?.name || 'ADMI Staff',
                url: article.author.fields?.profileUrl
              }
            : undefined
        }
        keywords={article.tags?.map((tag: any) => tag.fields?.name) || []}
        articleSection="News"
        articleBody={articleBody}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa' },
          { name: 'News', url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/news` },
          {
            name: article.title || 'News Article',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/news/${slug}`
          }
        ]}
      />

      {/* Rest of your component */}
      {/* ... */}
    </MainLayout>
  )
}
