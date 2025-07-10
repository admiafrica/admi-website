import { GetServerSideProps } from 'next'

// Dynamic sitemap generation including all new SEO pages
const Sitemap = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://admi.africa'

  const staticPages = [
    '',
    '/about',
    '/courses',
    '/careers',
    '/contact',
    '/student-support',
    '/frequently-asked-questions',
    '/news-events',
    '/resources',
    '/sanara',
    '/privacy-policy'
  ]

  // Location-based course pages
  const locations = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret']
  const courses = [
    'digital-marketing',
    'film-production',
    'graphic-design',
    'music-production',
    'animation',
    'photography',
    'web-development',
    'ui-ux-design',
    'sound-engineering',
    'entertainment-business',
    'video-game-development'
  ]
  const locationPages = locations.flatMap((location) => courses.map((course) => `/courses/${course}-${location}`))

  // Career guide pages
  const careerPages = ['/careers/digital-marketing-specialist', '/careers/film-director', '/careers/graphic-designer']

  const allPages = [...staticPages, ...locationPages, ...careerPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : page.includes('/careers/') || page.includes('/courses/') ? '0.8' : '0.6'}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default Sitemap
