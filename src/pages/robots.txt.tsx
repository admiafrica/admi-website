import { GetServerSideProps } from 'next'

const RobotsTxt = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /student-portal/login
Allow: /api/video-sitemap.xml

Sitemap: https://admi.africa/sitemap.xml
Sitemap: https://admi.africa/api/video-sitemap.xml
Sitemap: https://admi.africa/video-sitemap.xml
Sitemap: https://admi.africa/news-sitemap.xml
`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return { props: {} }
}

export default RobotsTxt
