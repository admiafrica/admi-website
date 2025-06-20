import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/*?s=*', // Block WordPress-style search parameters
          '/*?ch=*', // Block channel parameters used in spam
          '/*?one=*', // Block 'one' parameter used in gambling spam
          '/*?suka=*', // Block 'suka' parameter used in gambling spam
          '/*?fbclid=*', // Block abused Facebook tracking
          '/*?*casino*',
          '/*?*slots*',
          '/*?*betting*',
          '/*?*gambling*',
          '/*?*poker*',
          '/*?*toto*',
          '/*?*88*',
          '/*?*77*',
          '/*?*4d*',
          '/*?*123*',
          '/*?*168*',
          '/*?*888*',
          '/*?*hokibet*',
          '/*?*mito99*',
          '/*?*77luck*',
          '/*?*adult*',
          '/*?*porn*',
          '/*?*viagra*',
          '/*?*cialis*',
          '/*?*loan*',
          '/*?*credit*',
          '/*?*forex*',
          '/*?*crypto*',
          '/*?*bitcoin*',
          '/*?*investment*',
          '/*?*trading*',
          '/*?*.bet*',
          '/*?*.casino*',
          '/*?*.porn*'
        ],
        crawlDelay: 1
      },
      // Block known spam bots
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'DataForSeoBot',
          'PetalBot',
          'YandexBot',
          'SeznamBot',
          'MegaIndex',
          'LinkpadBot',
          'spbot',
          'ZoominfoBot'
        ],
        disallow: '/',
        crawlDelay: 86400 // 24 hours delay for aggressive crawlers
      },
      // Allow legitimate search engines with reasonable crawl delay
      {
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'facebookexternalhit'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 1
      }
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/video-sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
      `${baseUrl}/resources-sitemap.xml`
    ],
    host: baseUrl
  }
}
