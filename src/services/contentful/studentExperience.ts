import { ensureProtocol } from '@/utils'

/**
 * Contentful service for Student Experience pages
 */

const CONTENTFUL_SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const CONTENTFUL_ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const CONTENTFUL_ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

export interface QuickLinkCard {
  title: string
  description: string
  href: string
  icon?: {
    url: string
    title: string
  } | null
}

export interface StudentExperienceSection {
  title: string
  paragraphs?: string[] | null
  bullets?: string[] | null
  content?: any | null // Rich text content
  image?: {
    url: string
    title: string
  } | null
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | null
  backgroundColor?: 'white' | 'gray' | 'blue' | 'dark' | null
}

export interface StudentExperiencePage {
  slug: string
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroKicker: string | null
  intro: string
  heroImage: {
    url: string
    title: string
  } | null
  quickLinks: QuickLinkCard[] | null
  sections: StudentExperienceSection[]
}

/**
 * Fetch a student experience page by slug
 */
export async function getStudentExperiencePage(slug: string): Promise<StudentExperiencePage | null> {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=studentExperiencePage&fields.slug=${slug}&include=2`
    )

    if (!response.ok) {
      console.error(`Failed to fetch page ${slug}:`, response.statusText)
      return null
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      console.warn(`No page found for slug: ${slug}`)
      return null
    }

    const pageEntry = data.items[0]
    const includes = data.includes || {}

    // Helper to resolve linked entries
    const resolveEntry = (ref: any) => {
      if (!ref?.sys?.id) return null
      return includes.Entry?.find((entry: any) => entry.sys.id === ref.sys.id)
    }

    // Helper to resolve assets
    const resolveAsset = (ref: any) => {
      if (!ref?.sys?.id) return null
      const asset = includes.Asset?.find((asset: any) => asset.sys.id === ref.sys.id)
      if (!asset?.fields?.file?.url) return null
      return {
        url: asset.fields.file.url.startsWith('//') ? ensureProtocol(asset.fields.file.url) : asset.fields.file.url,
        title: asset.fields.title || ''
      }
    }

    // Parse quick links
    const quickLinks: QuickLinkCard[] = []
    if (pageEntry.fields.quickLinks) {
      for (const linkRef of pageEntry.fields.quickLinks) {
        const linkEntry = resolveEntry(linkRef)
        if (linkEntry?.fields) {
          quickLinks.push({
            title: linkEntry.fields.title,
            description: linkEntry.fields.description,
            href: linkEntry.fields.href,
            icon: linkEntry.fields.icon ? resolveAsset(linkEntry.fields.icon) : null
          })
        }
      }
    }

    // Parse sections
    const sections: StudentExperienceSection[] = []
    if (pageEntry.fields.sections) {
      for (const sectionRef of pageEntry.fields.sections) {
        const sectionEntry = resolveEntry(sectionRef)
        if (sectionEntry?.fields) {
          sections.push({
            title: sectionEntry.fields.title,
            paragraphs: sectionEntry.fields.paragraphs || null,
            bullets: sectionEntry.fields.bullets || null,
            content: sectionEntry.fields.content || null,
            image: sectionEntry.fields.image ? resolveAsset(sectionEntry.fields.image) : null,
            imagePosition: sectionEntry.fields.imagePosition || null,
            backgroundColor: sectionEntry.fields.backgroundColor || null
          })
        }
      }
    }

    // Extract intro text from rich text
    const introText =
      pageEntry.fields.intro?.content?.[0]?.content?.[0]?.value ||
      (typeof pageEntry.fields.intro === 'string' ? pageEntry.fields.intro : '')

    return {
      slug: pageEntry.fields.slug,
      seoTitle: pageEntry.fields.seoTitle,
      seoDescription: pageEntry.fields.seoDescription,
      heroTitle: pageEntry.fields.heroTitle,
      heroKicker: pageEntry.fields.heroKicker || null,
      intro: introText,
      heroImage: pageEntry.fields.heroImage ? resolveAsset(pageEntry.fields.heroImage) : null,
      quickLinks: quickLinks.length > 0 ? quickLinks : null,
      sections
    }
  } catch (error) {
    console.error(`Error fetching student experience page ${slug}:`, error)
    return null
  }
}

/**
 * Get all student experience page slugs (for static generation)
 */
export async function getAllStudentExperiencePageSlugs(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=studentExperiencePage&select=fields.slug`
    )

    if (!response.ok) {
      console.error('Failed to fetch page slugs:', response.statusText)
      return []
    }

    const data = await response.json()

    return data.items?.map((item: any) => item.fields.slug).filter(Boolean) || []
  } catch (error) {
    console.error('Error fetching student experience page slugs:', error)
    return []
  }
}
