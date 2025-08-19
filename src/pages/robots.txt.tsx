import { GetServerSideProps } from 'next'

const RobotsTxt = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const host = req.headers.host || ''
  const isStaging = host.includes('staging') || host.includes('campaigns-staging')

  const robotsTxt = isStaging
    ? `User-agent: *
Disallow: /

# Staging environment - no crawling allowed
`
    : `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /student-portal/login
Allow: /youtube-video-sitemap.xml

Sitemap: https://admi.africa/sitemap-index.xml
Sitemap: https://admi.africa/sitemap.xml
Sitemap: https://admi.africa/youtube-video-sitemap.xml
Sitemap: https://admi.africa/video-sitemap.xml
Sitemap: https://admi.africa/news-sitemap.xml
Sitemap: https://admi.africa/resources-sitemap.xml
Sitemap: https://admi.africa/video-archive-sitemap.xml
`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return { props: {} }
}

export default RobotsTxt
