/**
 * Asset URL Rewriter Utility
 *
 * Rewrites Contentful asset URLs to S3/CloudFront URLs to reduce
 * Contentful bandwidth usage.
 *
 * Usage:
 *   import { rewriteAssetUrl, rewriteAssetUrls } from '@/utils/asset-rewriter'
 *
 *   // Single URL
 *   const s3Url = rewriteAssetUrl('//images.ctfassets.net/...')
 *
 *   // In HTML content
 *   const content = rewriteAssetUrls(htmlString)
 *
 *   // In object (recursive)
 *   const data = rewriteAssetUrlsInObject(contentfulResponse)
 */

// Asset URL mapping - loaded from generated file or environment
let assetMapping: Record<string, string> | null = null

// S3/CloudFront configuration
const S3_ASSETS_BUCKET = process.env.S3_ASSETS_BUCKET || 'admi-contentful-assets'
const S3_REGION = process.env.AWS_REGION || 'us-east-1'
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_ASSETS_DOMAIN

// Contentful asset domains to rewrite
const CONTENTFUL_ASSET_DOMAINS = [
  'images.ctfassets.net',
  'assets.ctfassets.net',
  'videos.ctfassets.net',
  'downloads.ctfassets.net'
]

/**
 * Load asset URL mapping from file
 */
function loadAssetMapping(): Record<string, string> {
  if (assetMapping !== null) {
    return assetMapping
  }

  try {
    // Try to load from data directory
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs')
    const mappingPath = path.join(process.cwd(), 'data', 'asset-url-mapping.json')

    if (fs.existsSync(mappingPath)) {
      assetMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
      console.log(`[Asset Rewriter] Loaded ${Object.keys(assetMapping!).length} URL mappings`)
    } else {
      assetMapping = {}
      console.log('[Asset Rewriter] No mapping file found, using dynamic rewriting')
    }
  } catch (error) {
    console.warn('[Asset Rewriter] Failed to load mapping:', error)
    assetMapping = {}
  }

  return assetMapping || {}
}

/**
 * Check if URL is a Contentful asset URL
 */
export function isContentfulAssetUrl(url: string): boolean {
  if (!url) return false

  // Handle protocol-relative URLs
  const normalizedUrl = url.startsWith('//') ? `https:${url}` : url

  try {
    const urlObj = new URL(normalizedUrl)
    return CONTENTFUL_ASSET_DOMAINS.includes(urlObj.hostname)
  } catch {
    // Check by string matching as fallback
    return CONTENTFUL_ASSET_DOMAINS.some((domain) => url.includes(domain))
  }
}

/**
 * Generate S3 URL from Contentful URL path
 * Uses the asset ID and filename from the Contentful URL
 */
function generateS3Url(contentfulUrl: string): string {
  // Contentful URL format: //images.ctfassets.net/space_id/asset_id/hash/filename.ext
  const normalizedUrl = contentfulUrl.replace(/^https?:/, '').replace(/^\/\//, '')
  const parts = normalizedUrl.split('/')

  // Extract asset ID and filename
  // [domain, space_id, asset_id, hash, filename]
  if (parts.length >= 5) {
    const assetId = parts[2]
    const filename = parts[parts.length - 1]
    const s3Key = `assets/${assetId}/${filename}`

    if (CLOUDFRONT_DOMAIN) {
      return `https://${CLOUDFRONT_DOMAIN}/${s3Key}`
    }
    return `https://${S3_ASSETS_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`
  }

  // If we can't parse it, return original
  return contentfulUrl
}

/**
 * Rewrite a single Contentful asset URL to S3/CloudFront
 */
export function rewriteAssetUrl(url: string): string {
  if (!url || !isContentfulAssetUrl(url)) {
    return url
  }

  // Check if S3 assets are enabled
  if (process.env.ENABLE_S3_ASSETS === 'false') {
    return url
  }

  // Normalize URL for lookup
  const normalizedUrl = url.replace(/^https?:/, '').replace(/^\/\//, '')

  // Try exact mapping first
  const mapping = loadAssetMapping()
  if (mapping[normalizedUrl]) {
    return mapping[normalizedUrl]
  }

  // Fall back to dynamic URL generation
  return generateS3Url(url)
}

/**
 * Rewrite all Contentful asset URLs in a string (HTML/Markdown content)
 */
export function rewriteAssetUrls(content: string): string {
  if (!content || typeof content !== 'string') {
    return content
  }

  // Check if S3 assets are enabled
  if (process.env.ENABLE_S3_ASSETS === 'false') {
    return content
  }

  // Regex to match Contentful asset URLs
  const assetUrlRegex = /(https?:)?\/\/(images|assets|videos|downloads)\.ctfassets\.net\/[^\s"'<>]+/g

  return content.replace(assetUrlRegex, (match) => {
    return rewriteAssetUrl(match)
  })
}

/**
 * Recursively rewrite all Contentful asset URLs in an object
 * Useful for processing entire Contentful API responses
 */
export function rewriteAssetUrlsInObject<T>(obj: T): T {
  if (!obj) return obj

  // Check if S3 assets are enabled
  if (process.env.ENABLE_S3_ASSETS === 'false') {
    return obj
  }

  if (typeof obj === 'string') {
    return rewriteAssetUrl(obj) as T
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => rewriteAssetUrlsInObject(item)) as T
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      // Special handling for Contentful file fields
      if (key === 'url' && typeof value === 'string' && isContentfulAssetUrl(value)) {
        result[key] = rewriteAssetUrl(value)
      } else {
        result[key] = rewriteAssetUrlsInObject(value)
      }
    }
    return result as T
  }

  return obj
}

/**
 * Get the base URL for S3 assets
 */
export function getAssetBaseUrl(): string {
  if (CLOUDFRONT_DOMAIN) {
    return `https://${CLOUDFRONT_DOMAIN}`
  }
  return `https://${S3_ASSETS_BUCKET}.s3.${S3_REGION}.amazonaws.com`
}

/**
 * Check if S3 asset serving is enabled and configured
 */
export function isS3AssetsEnabled(): boolean {
  return process.env.ENABLE_S3_ASSETS !== 'false' && (!!CLOUDFRONT_DOMAIN || !!S3_ASSETS_BUCKET)
}
