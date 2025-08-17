import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (for basic protection)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // 100 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const current = rateLimitMap.get(ip) || { count: 0, lastReset: now }

  // Reset count if window has passed
  if (now - current.lastReset > RATE_LIMIT_WINDOW) {
    current.count = 0
    current.lastReset = now
  }

  current.count++
  rateLimitMap.set(ip, current)

  return current.count > RATE_LIMIT_MAX_REQUESTS
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const url = request.nextUrl.clone()

  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Apply rate limiting (skip for legitimate traffic patterns)
  if (ip !== 'unknown' && !pathname.startsWith('/_next/') && !pathname.includes('.')) {
    if (isRateLimited(ip)) {
      console.log(`Rate limited IP: ${ip}`)
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  // List of spam/malicious query parameters to block
  const spamParams = [
    // Only block 's=' when it contains spam patterns, not all search queries
    'ch=', // Channel parameter used in gambling spam
    'ak.bet', // Gambling domain
    'bet-nigeria.com', // Nigerian betting spam
    'ajccom.com', // Gambling domain
    'ak9ja.bet', // Nigerian betting spam
    'casper77',
    'totogel',
    'hokibet138',
    'mito99',
    '77luck',
    'suksestoto',
    'citra88',
    'kedai',
    'dolar888',
    'lj9696',
    'inaslot88',
    'garuda338',
    'bosbobet',
    'koinslot168',
    'semi4d',
    'slot36',
    'buahtogel',
    'judi123',
    'pucuk88',
    'dewa123',
    'pokersgp',
    'slotmania88',
    'shio77',
    'dewa234',
    'megabandar',
    'bigg77',
    'asialive88',
    'tombolslot',
    'maha168',
    'elanggame',
    'spartaplay88',
    'playwin123',
    'fiona77',
    'gangtoto',
    'tiger78',
    'bigslot88',
    'casino',
    'slots',
    'poker',
    'betting',
    'gambling',
    'viagra',
    'cialis',
    'pharmacy',
    'loan',
    'credit',
    'bitcoin',
    'crypto',
    'investment',
    'forex',
    'trading',
    'adult',
    'porn',
    'sex',
    'escort',
    'dating'
  ]

  // Check if URL contains spam parameters or content
  const hasSpamContent = spamParams.some(
    (param) =>
      search.toLowerCase().includes(param.toLowerCase()) || pathname.toLowerCase().includes(param.toLowerCase())
  )

  // Block requests with spam content
  if (hasSpamContent) {
    console.log(`Blocked spam URL: ${request.url}`)

    // Return 404 for spam URLs to discourage crawlers
    return new NextResponse(null, { status: 404 })
  }

  // Block suspicious query parameters that don't match our site structure
  const suspiciousPatterns = [
    /[?&]s=.*(?:https?:\/\/|www\.)/i, // Search param with URLs
    /[?&].*=.*(?:\.bet|\.casino|\.porn)/i, // Gambling/adult domains
    /[?&].*=.*(?:%20|%3A|%2F){3,}/i, // Excessive URL encoding
    /[?&].*=.*(?:nigeria|ghana|kenya).*(?:online|platform)/i // Geo-targeted spam
  ]

  const hasSuspiciousPattern = suspiciousPatterns.some((pattern) => search.match(pattern))

  if (hasSuspiciousPattern) {
    console.log(`Blocked suspicious pattern: ${request.url}`)
    return new NextResponse(null, { status: 404 })
  }

  // Clean up legitimate URLs by removing unknown parameters
  const allowedParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'gclid', // Google Ads
    'fbclid', // Facebook
    'ref', // Referral
    'source', // Source tracking
    'page', // Pagination
    'limit', // Pagination
    'category', // Filtering
    'search', // Search queries
    'q', // Query
    'slug', // Dynamic routes
    's' // WordPress-style search (keep but sanitize)
  ]

  const searchParams = new URLSearchParams(search)
  let hasUnknownParams = false

  // Remove unknown parameters
  for (const [key] of searchParams) {
    if (!allowedParams.includes(key)) {
      searchParams.delete(key)
      hasUnknownParams = true
    }
  }

  // Redirect to clean URL if we removed parameters
  if (hasUnknownParams) {
    url.search = searchParams.toString()
    return NextResponse.redirect(url, 301)
  }

  // Add security headers
  const response = NextResponse.next()

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Content Security Policy for additional protection
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.googletagmanager.com *.facebook.net *.hotjar.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https: *.ctfassets.net *.contentful.com; connect-src 'self' *.contentful.com *.google-analytics.com *.googletagmanager.com *.hotjar.com *.facebook.com; frame-src 'self' *.youtube.com *.vimeo.com *.facebook.com;"
  )

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
     * - robots.txt
     * - sitemap.xml
     * - llm.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llm.txt).*)'
  ]
}
