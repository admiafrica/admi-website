/**
 * URL utilities for ensuring consistent naked domain usage
 */

/**
 * Ensures URLs use the naked domain (admi.africa) instead of www subdomain
 * @param url - The URL to normalize
 * @returns Normalized URL with naked domain
 */
export function ensureNakedDomain(url: string): string {
  return url.replace(/^https?:\/\/www\.admi\.africa/, 'https://admi.africa')
}

/**
 * Gets the base URL for the site, ensuring naked domain
 * @returns Base URL with naked domain
 */
export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
  return ensureNakedDomain(baseUrl)
}

/**
 * Creates a full URL from a path, ensuring naked domain
 * @param path - The path to append to base URL
 * @returns Full URL with naked domain
 */
export function createFullUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Creates a canonical URL, ensuring naked domain
 * @param path - The path for the canonical URL
 * @returns Canonical URL with naked domain
 */
export function createCanonicalUrl(path: string = ''): string {
  return createFullUrl(path)
}

/**
 * Checks if a URL is an internal link (same domain)
 * @param url - The URL to check
 * @returns True if internal link
 */
export function isInternalLink(url: string): boolean {
  if (url.startsWith('/')) return true
  if (url.startsWith('#')) return true
  if (url.startsWith('mailto:')) return false
  if (url.startsWith('tel:')) return false

  try {
    const urlObj = new URL(url)
    const baseUrl = getBaseUrl()
    const baseUrlObj = new URL(baseUrl)
    return urlObj.hostname === baseUrlObj.hostname
  } catch {
    return false
  }
}

/**
 * Converts absolute internal URLs to relative paths
 * @param url - The URL to convert
 * @returns Relative path if internal, original URL if external
 */
export function toRelativeUrl(url: string): string {
  if (!isInternalLink(url)) return url
  if (url.startsWith('/')) return url

  try {
    const urlObj = new URL(url)
    return urlObj.pathname + urlObj.search + urlObj.hash
  } catch {
    return url
  }
}
