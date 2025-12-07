/**
 * Utility to extract FAQ questions and answers from How-To articles
 * Used for Phase 4 FAQ schema implementation
 */

interface FAQItem {
  question: string
  answer: string
}

/**
 * Extract FAQ items from article body (rich text)
 * Looks for patterns like headings followed by paragraphs
 * Or extracts key points as Q&A pairs
 */
export function extractFAQFromArticle(articleBody: any, articleTitle: string): FAQItem[] {
  if (!articleBody || !articleBody.content) return []

  const faqs: FAQItem[] = []
  const content = articleBody.content

  // Parse rich text blocks looking for question-answer patterns
  for (let i = 0; i < content.length; i++) {
    const node = content[i]

    // Look for headings (potential questions)
    if (node.nodeType === 'heading-3' || node.nodeType === 'heading-4') {
      const question = extractTextFromNode(node)

      // Next paragraph is likely the answer
      let answer = ''
      if (i + 1 < content.length && content[i + 1].nodeType === 'paragraph') {
        answer = extractTextFromNode(content[i + 1])
      }

      if (question && answer) {
        faqs.push({
          question: question.trim(),
          answer: answer.trim().substring(0, 500) // Limit answer length
        })
      }
    }
  }

  // If no FAQs found from headings, create from article intro
  if (faqs.length === 0) {
    const intro = extractTextFromNode(content[0])
    if (intro) {
      faqs.push({
        question: `What is ${articleTitle}?`,
        answer: intro.substring(0, 500)
      })
    }
  }

  return faqs.slice(0, 5) // Return max 5 FAQs
}

/**
 * Extract plain text from a rich text node
 */
export function extractTextFromNode(node: any): string {
  if (!node) return ''

  if (node.nodeType === 'text' && node.value) {
    return node.value
  }

  if (node.content && Array.isArray(node.content)) {
    return node.content.map((child: any) => extractTextFromNode(child)).join(' ')
  }

  return ''
}

/**
 * Check if article is a "How-To" article based on tags or title
 */
export function isHowToArticle(article: any): boolean {
  const title = (article.title || '').toLowerCase()
  const tags = (article.tags || []).map((t: string) => t.toLowerCase())
  const category = (article.category || '').toLowerCase()

  const howToKeywords = ['how to', 'guide', 'tutorial', 'step', 'tips', 'best practices']

  const titleMatch = howToKeywords.some((kw) => title.includes(kw))
  const tagsMatch = tags.some((tag: string) => howToKeywords.some((kw) => tag.includes(kw)))
  const categoryMatch = category.includes('guide') || category.includes('tutorial')

  return titleMatch || tagsMatch || categoryMatch
}

/**
 * Check if article has video embeds
 */
export function hasVideoEmbed(articleBody: any): boolean {
  if (!articleBody || !articleBody.content) return false

  return articleBody.content.some(
    (node: any) =>
      node.nodeType === 'embedded-asset-block' ||
      (node.nodeType === 'paragraph' &&
        node.content &&
        node.content.some((child: any) => child.nodeType === 'embedded-asset-block'))
  )
}

/**
 * Extract video duration from article metadata
 * Returns ISO 8601 duration format (e.g., PT2M30S)
 */
export function getVideoDuration(
  duration?: number // in seconds
): string {
  if (!duration) return 'PT2M30S'

  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  let iso = 'PT'
  if (minutes > 0) iso += `${minutes}M`
  if (seconds > 0) iso += `${seconds}S`

  return iso || 'PT2M30S'
}
