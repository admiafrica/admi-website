import { NextRequest, NextResponse } from 'next/server'

interface SpamPattern {
  type: 'param' | 'url' | 'referrer' | 'userAgent'
  pattern: string | RegExp
  description: string
}

const SPAM_PATTERNS: SpamPattern[] = [
  // Gambling and betting parameters
  { type: 'param', pattern: /^(one|suka|ch|s)$/, description: 'Gambling parameter' },
  {
    type: 'param',
    pattern: /^(slot|bet|casino|poker|toto|game|win|luck|88|77|4d|123|168|888)/,
    description: 'Gaming parameter'
  },

  // Gambling and betting URLs
  {
    type: 'url',
    pattern: /\b(slot|bet|casino|poker|toto|game|win|luck|88|77|4d|123|168|888)\b/i,
    description: 'Gaming URL'
  },
  {
    type: 'url',
    pattern:
      /\b(hokibet|mito99|77luck|dewa|boss|king|mega|royal|premium|capitaltoto|sonic|premium|mega|royal|king|boss|dewa|saga|master|bendera|iasia|gurita|era|murn|rumah|pelangitoto|yolo|studio|inter|play|iklan|ahli|win|warung|markas|agent|unik|dragon|snica|neko|bulan|warkop|togel|topcer|sambal|diva|barong)\b/i,
    description: 'Gambling brand'
  },
  { type: 'url', pattern: /\b(ak\.bet|bet-nigeria\.com|ajccom\.com|ak9ja\.bet)\b/i, description: 'Betting domain' },

  // Suspicious referrers
  { type: 'referrer', pattern: /\b(slot|bet|casino|poker|gambling|toto)\b/i, description: 'Gambling referrer' },

  // Bot user agents
  { type: 'userAgent', pattern: /\b(bot|crawler|spider|scraper|scanner)\b/i, description: 'Bot user agent' },
  { type: 'userAgent', pattern: /^$/, description: 'Empty user agent' }
]

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_REQUESTS = 10
const RATE_LIMIT_WINDOW = 60000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record) {
    rateLimitStore.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Reset if window expired
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Increment count
  record.count++

  return record.count > RATE_LIMIT_REQUESTS
}

function detectSpam(request: NextRequest): { isSpam: boolean; reason: string } {
  const url = new URL(request.url)
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''

  // Check URL parameters
  for (const [key, value] of url.searchParams.entries()) {
    for (const pattern of SPAM_PATTERNS.filter((p) => p.type === 'param')) {
      if (typeof pattern.pattern === 'string') {
        if (key === pattern.pattern || value === pattern.pattern) {
          return { isSpam: true, reason: `Spam parameter detected: ${key}=${value} (${pattern.description})` }
        }
      } else if (pattern.pattern.test(key) || pattern.pattern.test(value)) {
        return { isSpam: true, reason: `Spam parameter detected: ${key}=${value} (${pattern.description})` }
      }
    }
  }

  // Check URL path
  const fullUrl = url.pathname + url.search
  for (const pattern of SPAM_PATTERNS.filter((p) => p.type === 'url')) {
    if (pattern.pattern instanceof RegExp && pattern.pattern.test(fullUrl)) {
      return { isSpam: true, reason: `Spam URL detected: ${fullUrl} (${pattern.description})` }
    }
  }

  // Check referrer
  if (referer) {
    for (const pattern of SPAM_PATTERNS.filter((p) => p.type === 'referrer')) {
      if (pattern.pattern instanceof RegExp && pattern.pattern.test(referer)) {
        return { isSpam: true, reason: `Spam referrer detected: ${referer} (${pattern.description})` }
      }
    }
  }

  // Check user agent
  for (const pattern of SPAM_PATTERNS.filter((p) => p.type === 'userAgent')) {
    if (typeof pattern.pattern === 'string') {
      if (userAgent === pattern.pattern) {
        return { isSpam: true, reason: `Suspicious user agent: ${userAgent} (${pattern.description})` }
      }
    } else if (pattern.pattern.test(userAgent)) {
      return { isSpam: true, reason: `Suspicious user agent: ${userAgent} (${pattern.description})` }
    }
  }

  return { isSpam: false, reason: '' }
}

function logSpamAttempt(request: NextRequest, reason: string) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || 'none'

  console.log(
    `[SPAM BLOCKED] ${new Date().toISOString()} - IP: ${ip}, URL: ${request.url}, Reason: ${reason}, UserAgent: ${userAgent}, Referer: ${referer}`
  )
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Rate limiting check
  if (isRateLimited(ip)) {
    console.log(`[RATE LIMITED] ${new Date().toISOString()} - IP: ${ip}, URL: ${request.url}`)
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Spam detection
  const spamCheck = detectSpam(request)

  if (spamCheck.isSpam) {
    logSpamAttempt(request, spamCheck.reason)

    // Return 404 instead of blocking to avoid revealing detection
    return new NextResponse('Not Found', { status: 404 })
  }

  // Add security headers
  const response = NextResponse.next()

  // Additional security headers
  response.headers.set('X-Spam-Protection', 'enabled')
  response.headers.set('X-Rate-Limit-Remaining', String(RATE_LIMIT_REQUESTS - (rateLimitStore.get(ip)?.count || 0)))

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
