import { NextRequest, NextResponse } from 'next/server'

interface SpamPattern {
  type: 'param' | 'url' | 'referrer' | 'userAgent'
  pattern: string | RegExp
  description: string
}

const SPAM_PATTERNS: SpamPattern[] = [
  // Gambling and betting parameters
  { type: 'param', pattern: /^(one|suka|ch|s)$/, description: 'Gambling parameter' },
  { type: 'param', pattern: /^(p|cat|page_id|url|fbclid)$/, description: 'Spam parameter' },
  {
    type: 'param',
    pattern: /^(slot|bet|casino|poker|toto|win|luck|88|77|4d|123|168|888)/,
    description: 'Gambling parameter'
  },

  // Specific blocked post IDs
  { type: 'param', pattern: /^p$/, description: 'Post ID parameter' },

  // Gambling and betting URLs
  {
    type: 'url',
    pattern: /\b(slot|bet|casino|poker|toto|win|luck|88|77|4d|123|168|888)\b/i,
    description: 'Gambling URL'
  },
  {
    type: 'url',
    pattern:
      /\b(casper77|totogel|hokibet138|mito99|77luck|dewa|boss|king|mega|royal|premium|capitaltoto|sonic|premium|mega|royal|king|boss|dewa|saga|master|bendera|iasia|gurita|era|murn|rumah|pelangitoto|yolo|studio|inter|play|iklan|ahli|win|warung|markas|agent|unik|dragon|snica|neko|bulan|warkop|togel|topcer|sambal|diva|barong|suksestoto|citra88|kedai|dolar888|lj9696|inaslot88|garuda338|bosbobet|koinslot168|semi4d|slot36|buahtogel|dj4d|judi123|pucuk88|dewa123|pokersgp|slotmania88|shio77|dewa234|megabandar|bigg77|asialive88|tombolslot|maha168|elanggame|spartaplay88|playwin123|fiona77|gangtoto|tiger78|bigslot88|sagawin365|royalwin|susterslot|unggultoto|899sport|buntogel|master188|mandiritogel|bendera88|koinslot888|iasia88|pangkalantoto|djr888|gurita168|eraspin|murniqq|rumahmpo|pelangitoto888|cwdbet|yolo4d|slot5000|studiobet78|interwin88|play303|198slot|iklan4d|sonic77|premium303|capitaltoto|ahli4d|winbet88|warung168|slottoto|qqmaha88|markas123|agentoto|unik777|dragonslot99|snicasino|nekobet99|bulantogel|warkop89|togel388|topcer88|sambaltoto|divatogel|kingtoto4d|barong4d|aman4d|duniaslot77|ligamansion|qqfullbet|erek2d|chongtogel|jalak4d|supra4d|king338|vgslot|dewaslot777|asiabet4d|okeslot777|nona888|rajabola88|ludo88|pantai77|hometogel|totojitu|pandaspin88|jendral888|tag4d|sultanbet89|ketua777|sgpslot|ex88|winning369|cpgtoto|nusabet|royalslot88|qq555|ebet88|luxury333|idrsloto|kipertoto|qq188|berkah777|iblis4d|viva99)\b/i,
    description: 'Gambling brand'
  },
  { type: 'url', pattern: /\b(ak\.bet|bet-nigeria\.com|ajccom\.com|ak9ja\.bet)\b/i, description: 'Betting domain' },

  // Suspicious referrers
  { type: 'referrer', pattern: /\b(slot|bet|casino|poker|gambling|toto)\b/i, description: 'Gambling referrer' },

  // Bot user agents (excluding legitimate search engines)
  {
    type: 'userAgent',
    pattern:
      /\b(scraper|scanner|semrushbot|ahrefsbot|mj12bot|dotbot|blexbot|dataforseobot|petalbot|yandexbot|seznambot|megaindex|linkpadbot|spbot)\b/i,
    description: 'Malicious bot user agent'
  },
  { type: 'userAgent', pattern: /^$/, description: 'Empty user agent' }
]

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()
// More lenient rate limiting for development
const RATE_LIMIT_REQUESTS = process.env.NODE_ENV === 'development' ? 100 : 10
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

  // Skip spam detection for development files and legitimate paths
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isDevFile =
    url.pathname.includes('node_modules') ||
    url.pathname.includes('_next') ||
    url.pathname.includes('.vite') ||
    url.pathname.includes('src/') ||
    url.pathname.includes('@')

  // Skip spam detection for legitimate course and content paths
  const isLegitimateContent =
    url.pathname.startsWith('/courses/') ||
    url.pathname.startsWith('/watch/') ||
    url.pathname.startsWith('/news-events/') ||
    url.pathname.startsWith('/resources/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.endsWith('.xml') || // Allow all XML files (sitemaps)
    url.pathname === '/robots.txt' || // Allow robots.txt
    url.pathname === '/llm.txt' || // Allow LLM context file
    url.pathname.startsWith('/llm') // Allow all LLM-related endpoints

  // Allow legitimate search engine bots
  const legitimateBots = [
    'googlebot',
    'bingbot',
    'slurp', // Yahoo
    'duckduckbot',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'applebot'
  ]

  const isLegitimateBot = legitimateBots.some((bot) => userAgent.toLowerCase().includes(bot))

  if ((isDevelopment && isDevFile) || isLegitimateContent || isLegitimateBot) {
    return { isSpam: false, reason: '' }
  }

  // Check for specific blocked post IDs
  const blockedPostIds = ['1692', '1636', '1695', '1655', '15711', '15724']
  const postId = url.searchParams.get('p')
  if (postId && blockedPostIds.includes(postId)) {
    return { isSpam: true, reason: `Blocked post ID: ${postId}` }
  }

  // Check for specific blocked page IDs
  const pageId = url.searchParams.get('page_id')
  if (pageId && blockedPostIds.includes(pageId)) {
    return { isSpam: true, reason: `Blocked page ID: ${pageId}` }
  }

  // Check for blocked category
  const cat = url.searchParams.get('cat')
  if (cat === '59') {
    return { isSpam: true, reason: `Blocked category: ${cat}` }
  }

  // Check for search parameter with Nigeria betting content
  const searchParam = url.searchParams.get('s')
  if (searchParam) {
    const nigeriaBettingPatterns = [
      /nigeria.*online.*slot/i,
      /nigeria.*betting.*platform/i,
      /nigeria.*slot.*machine/i,
      /professional.*nigerian.*betting/i,
      /nigeria.*official.*betting/i,
      /ak\.bet/i,
      /bet-nigeria\.com/i,
      /ajccom\.com/i,
      /ak9ja\.bet/i,
      /vincent\s+mutiso/i
    ]

    for (const pattern of nigeriaBettingPatterns) {
      if (pattern.test(searchParam)) {
        return { isSpam: true, reason: `Spam search query: ${searchParam.substring(0, 50)}...` }
      }
    }
  }

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

  // Skip rate limiting for localhost in development
  const isLocalhost =
    ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' || ip?.startsWith('192.168.') || ip?.startsWith('10.')
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Rate limiting check (skip for localhost in development)
  if (!isDevelopment || !isLocalhost) {
    if (isRateLimited(ip)) {
      console.log(`[RATE LIMITED] ${new Date().toISOString()} - IP: ${ip}, URL: ${request.url}`)
      return new NextResponse('Too Many Requests', { status: 429 })
    }
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
