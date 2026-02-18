import type { NextApiRequest, NextApiResponse } from 'next'
import { IContentfulResponse } from '@/types'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import { getCoursePricing, DEFAULT_PRICING } from '@/utils/course-pricing'
import { getPlainTextFromRichText, ensureProtocol } from '@/utils'

/**
 * Meta Product Catalog Feed — /api/meta-product-feed.xml
 *
 * Dynamically fetches ALL published courses from Contentful and returns
 * an XML feed in Meta's required format so Business Manager can ingest
 * course "products" for Dynamic Product Ads on Instagram & Facebook.
 *
 * Schedule this as a "Scheduled Feed" in Commerce Manager:
 *   URL: https://admi.africa/api/meta-product-feed.xml
 *   Frequency: Daily
 *
 * content_ids in the feed MUST match what the Meta Pixel fires
 * via CourseViewEvent (e.g. "admi-diploma-film-and-television-production-diploma").
 * See [slug].tsx line ~127 for the pixel format:
 *   `admi-${awardLevel.toLowerCase().replace(' ', '-')}-${slug}`
 */

const BASE_URL = 'https://admi.africa'
const DEFAULT_INTAKES = 'January, May, September'
const OG_FALLBACK_IMAGE = `${BASE_URL}/api/og?title=ADMI+Course&type=course`

interface CatalogItem {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  price: number
  currency: string
  category: string
  programType: string
  duration: string
  intakes: string
  availability: string
}

// ─── Helpers ────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Parse tuitionFees from CMS. Accepts number or string like "145,000 KES" or "KES 145,000".
 */
function parseTuitionFees(tuitionFees: unknown): number | undefined {
  if (typeof tuitionFees === 'number' && tuitionFees > 0) return tuitionFees
  if (typeof tuitionFees === 'string') {
    const parsed = parseInt(tuitionFees.replace(/[^0-9]/g, ''), 10)
    return parsed > 0 ? parsed : undefined
  }
  return undefined
}

/**
 * Resolve a Contentful asset link to its HTTPS URL using the includes.Asset array.
 */
function resolveAssetUrl(
  assetLink: any,
  assets: Array<{ sys: { id: string }; fields: { file: { url: string } } }>
): string | undefined {
  if (!assetLink?.sys?.id) return undefined
  const asset = assets.find((a) => a.sys.id === assetLink.sys.id)
  const url = asset?.fields?.file?.url
  return url ? ensureProtocol(url) : undefined
}

/**
 * Resolve a linked entry reference (e.g. programType) from includes.Entry.
 */
function resolveEntryRef(
  entryLink: any,
  entries: Array<{ sys: { id: string }; fields: Record<string, any> }>
): Record<string, any> | undefined {
  if (!entryLink?.sys?.id) return undefined
  const entry = entries.find((e) => e.sys.id === entryLink.sys.id)
  return entry?.fields
}

/**
 * Derive a Google product category from the award level and course name.
 */
function deriveCategory(awardLevel: string, name: string): string {
  const base = awardLevel?.toLowerCase().includes('diploma')
    ? 'Education > Higher Education'
    : 'Education > Professional Development'

  const nameLower = name.toLowerCase()
  if (nameLower.includes('film') || nameLower.includes('television') || nameLower.includes('video'))
    return `${base} > Film & TV`
  if (nameLower.includes('sound') || nameLower.includes('music') || nameLower.includes('audio'))
    return `${base} > Music & Audio`
  if (nameLower.includes('graphic design') || nameLower.includes('ui') || nameLower.includes('ux'))
    return `${base} > Design`
  if (nameLower.includes('animation')) return `${base} > Animation`
  if (nameLower.includes('photo')) return `${base} > Photography`
  if (nameLower.includes('marketing')) return `${base} > Marketing`
  if (nameLower.includes('data') || nameLower.includes('analytics')) return `${base} > Data Science`
  if (nameLower.includes('ai') || nameLower.includes('digital transformation')) return `${base} > Technology`
  if (nameLower.includes('multimedia') || nameLower.includes('content')) return `${base} > Digital Media`

  return base
}

/**
 * Map a single Contentful course entry to a CatalogItem for the feed.
 */
function mapCourseToCatalogItem(entry: any, assets: any[], entries: any[]): CatalogItem | null {
  const fields = entry.fields
  if (!fields?.slug || !fields?.name) return null

  const slug: string = fields.slug
  const name: string = fields.name
  const awardLevel: string = fields.awardLevel || ''

  // content_id must match the Meta Pixel format: admi-{level}-{slug}
  // See [slug].tsx: `admi-${course.awardLevel?.toLowerCase().replace(' ', '-') || 'course'}-${slug}`
  const levelSlug = awardLevel ? awardLevel.toLowerCase().replace(' ', '-') : 'course'
  const id = `admi-${levelSlug}-${slug}`

  // Description: prefer aboutTheCourse (plain text), fall back to description (rich text)
  let description = ''
  if (fields.aboutTheCourse) {
    description =
      typeof fields.aboutTheCourse === 'string'
        ? fields.aboutTheCourse
        : getPlainTextFromRichText(fields.aboutTheCourse, 500)
  } else if (fields.description) {
    description = getPlainTextFromRichText(fields.description, 500)
  }
  if (!description) {
    description = `${name} at Africa Digital Media Institute (ADMI). ${awardLevel} programme in Nairobi, Kenya.`
  }

  // Image: resolve coverImage asset, fall back to OG image
  const imageUrl = resolveAssetUrl(fields.coverImage, assets) || OG_FALLBACK_IMAGE

  // Pricing: CMS tuitionFees > static map > default by level
  const cmsTuitionFee = parseTuitionFees(fields.tuitionFees)
  const pricing = getCoursePricing(slug, awardLevel, cmsTuitionFee)
  const price = pricing?.price || DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price

  // Resolve linked programType entry for duration and delivery mode
  const programTypeFields = resolveEntryRef(fields.programType, entries)
  const duration = programTypeFields?.duration || ''

  // Program type label from award level
  const programType = awardLevel || 'Course'

  // Intakes from CMS or default
  const intakes = fields.intakeMonths || DEFAULT_INTAKES

  // Category derived from level + name
  const category = deriveCategory(awardLevel, name)

  return {
    id,
    title: name,
    description,
    url: `${BASE_URL}/courses/${slug}`,
    imageUrl,
    price,
    currency: 'KES',
    category,
    programType,
    duration,
    intakes,
    availability: 'available for order'
  }
}

// ─── XML builder ────────────────────────────────────────────────────

function buildXml(courses: CatalogItem[]): string {
  const items = courses
    .map(
      (c) => `    <item>
      <g:id>${escapeXml(c.id)}</g:id>
      <g:title>${escapeXml(c.title)}</g:title>
      <g:description>${escapeXml(c.description)}</g:description>
      <g:link>${escapeXml(c.url)}</g:link>
      <g:image_link>${escapeXml(c.imageUrl)}</g:image_link>
      <g:price>${c.price} ${c.currency}</g:price>
      <g:availability>${c.availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>ADMI</g:brand>
      <g:google_product_category>${escapeXml(c.category)}</g:google_product_category>
      <g:product_type>${escapeXml(c.programType)}</g:product_type>
      <g:custom_label_0>${escapeXml(c.programType)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(c.duration)}</g:custom_label_1>
      <g:custom_label_2>${escapeXml(c.intakes)}</g:custom_label_2>
    </item>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>ADMI Course Catalog</title>
    <link>${BASE_URL}</link>
    <description>Africa Digital Media Institute - Creative Arts Programmes</description>
${items}
  </channel>
</rss>`
}

// ─── API handler ────────────────────────────────────────────────────

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (!spaceId || !accessToken || !environment) {
    console.error('Meta product feed: Missing Contentful environment variables')
    res.status(500).setHeader('Content-Type', 'text/plain').send('Server configuration error')
    return
  }

  try {
    const response = await axiosContentfulClient.get<IContentfulResponse>(
      `/spaces/${spaceId}/environments/${environment}/entries`,
      {
        params: {
          access_token: accessToken,
          content_type: 'course',
          include: 2,
          limit: 100
        },
        timeout: 10000
      }
    )

    const data = response.data
    const assets = data.includes?.Asset || []
    const entries = data.includes?.Entry || []

    const catalogItems = data.items
      .map((entry) => mapCourseToCatalogItem(entry, assets, entries))
      .filter((item): item is CatalogItem => item !== null)

    if (catalogItems.length === 0) {
      console.warn('Meta product feed: No courses returned from Contentful')
    }

    const xml = buildXml(catalogItems)

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
    res.status(200).send(xml)
  } catch (error) {
    console.error('Meta product feed: Failed to fetch courses from Contentful', error)
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send('Failed to generate product feed. Please try again later.')
  }
}
