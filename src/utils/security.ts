/**
 * Security utilities for URL validation and spam detection
 */

// List of spam keywords and patterns
export const SPAM_KEYWORDS = [
  'casino',
  'slots',
  'poker',
  'betting',
  'gambling',
  'lottery',
  'viagra',
  'cialis',
  'pharmacy',
  'pills',
  'medication',
  'loan',
  'credit',
  'mortgage',
  'debt',
  'finance',
  'bitcoin',
  'crypto',
  'investment',
  'forex',
  'trading',
  'adult',
  'porn',
  'sex',
  'escort',
  'dating',
  'hack',
  'crack',
  'cheat',
  'exploit',
  'free',
  'win',
  'prize',
  'money',
  'cash',
  'click',
  'here',
  'now',
  'urgent',
  'limited'
]

// Suspicious domains and TLDs
export const SUSPICIOUS_DOMAINS = [
  '.bet',
  '.casino',
  '.porn',
  '.xxx',
  '.adult',
  '.loan',
  '.credit',
  '.forex',
  '.crypto',
  'ak.bet',
  'casino',
  'slots',
  'poker'
]

// WordPress and common CMS search parameters that shouldn't exist on our site
export const BLOCKED_PARAMS = [
  's=', // WordPress search
  'p=', // WordPress post ID
  'page_id=', // WordPress page ID
  'cat=', // WordPress category
  'tag=', // WordPress tag
  'author=', // WordPress author
  'm=', // WordPress date archive
  'y=', // WordPress year
  'monthnum=', // WordPress month
  'day=', // WordPress day
  'w=', // WordPress week
  'ch=', // Channel parameter (often spam)
  'ref=http', // Suspicious referral
  'redirect=http' // Suspicious redirect
]

/**
 * Check if a URL contains spam content
 */
export function isSpamURL(url: string): boolean {
  const lowerUrl = url.toLowerCase()

  // Check for spam keywords
  const hasSpamKeywords = SPAM_KEYWORDS.some((keyword) => lowerUrl.includes(keyword))

  // Check for suspicious domains
  const hasSuspiciousDomains = SUSPICIOUS_DOMAINS.some((domain) => lowerUrl.includes(domain))

  // Check for blocked parameters
  const hasBlockedParams = BLOCKED_PARAMS.some((param) => lowerUrl.includes(param))

  return hasSpamKeywords || hasSuspiciousDomains || hasBlockedParams
}

/**
 * Check if URL has suspicious patterns
 */
export function hasSuspiciousPatterns(url: string): boolean {
  const suspiciousPatterns = [
    // Search param with URLs
    /[?&]s=.*(?:https?:\/\/|www\.)/i,
    // Gambling/adult domains in parameters
    /[?&].*=.*(?:\.bet|\.casino|\.porn)/i,
    // Excessive URL encoding
    /[?&].*=.*(?:%20|%3A|%2F){3,}/i,
    // Geo-targeted spam
    /[?&].*=.*(?:nigeria|ghana|kenya).*(?:online|platform)/i,
    // Multiple suspicious keywords
    /(?:casino|slots|betting).*(?:online|platform|nigeria)/i,
    // Suspicious referral patterns
    /[?&]ref=https?:\/\/(?!admi\.africa)/i,
    // WordPress-style parameters that shouldn't exist
    /[?&](?:p|page_id|cat|tag|author|m|y|monthnum|day|w)=\d+/i
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(url))
}

/**
 * Validate and clean URL parameters
 */
export function cleanURLParams(searchParams: URLSearchParams): URLSearchParams {
  const allowedParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'gclid',
    'fbclid',
    'ref',
    'source',
    'page',
    'limit',
    'category',
    'search',
    'q',
    'slug'
  ]

  const cleanParams = new URLSearchParams()

  for (const [key, value] of searchParams) {
    if (allowedParams.includes(key) && isValidParamValue(value)) {
      cleanParams.set(key, value)
    }
  }

  return cleanParams
}

/**
 * Validate parameter values
 */
export function isValidParamValue(value: string): boolean {
  // Check for suspicious content in parameter values
  if (isSpamURL(value)) {
    return false
  }

  // Check for excessive length (potential attack)
  if (value.length > 500) {
    return false
  }

  // Check for suspicious characters
  const suspiciousChars = /<script|javascript:|data:|vbscript:|onload=|onerror=/i
  if (suspiciousChars.test(value)) {
    return false
  }

  return true
}

/**
 * Generate security report for monitoring
 */
export function generateSecurityReport(request: { url: string; userAgent?: string; referer?: string; ip?: string }): {
  isBlocked: boolean
  reason: string
  severity: 'low' | 'medium' | 'high'
  timestamp: string
} {
  const { url, userAgent = '' } = request

  let isBlocked = false
  let reason = ''
  let severity: 'low' | 'medium' | 'high' = 'low'

  if (isSpamURL(url)) {
    isBlocked = true
    reason = 'Spam content detected in URL'
    severity = 'medium'
  } else if (hasSuspiciousPatterns(url)) {
    isBlocked = true
    reason = 'Suspicious URL pattern detected'
    severity = 'medium'
  }

  // Check for bot patterns in user agent
  const botPatterns = [
    /SemrushBot|AhrefsBot|MJ12bot|DotBot|BLEXBot|DataForSeoBot/i,
    /PetalBot|YandexBot|SeznamBot|MegaIndex|LinkpadBot|spbot/i
  ]

  if (botPatterns.some((pattern) => pattern.test(userAgent))) {
    severity = 'high'
    reason += ' | Aggressive bot detected'
  }

  return {
    isBlocked,
    reason,
    severity,
    timestamp: new Date().toISOString()
  }
}

/**
 * Check if request should be rate limited
 */
export function shouldRateLimit(ip: string, userAgent: string): boolean {
  // Simple bot detection
  const botIndicators = [
    /bot|crawler|spider|scraper/i,
    /SemrushBot|AhrefsBot|MJ12bot|DotBot|BLEXBot/i,
    /curl|wget|python|php|java|go-http/i
  ]

  return botIndicators.some((pattern) => pattern.test(userAgent))
}
