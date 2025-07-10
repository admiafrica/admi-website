import { GetServerSideProps } from 'next'

const RobotsTxt = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /frequently-asked-questions
Allow: /careers/*
Allow: /courses/*

Sitemap: https://admi.africa/sitemap.xml
Sitemap: https://admi.africa/video-sitemap.xml
Sitemap: https://admi.africa/news-sitemap.xml

User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

Disallow: /admin/
Disallow: /api/
Disallow: /student-portal/login
`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return { props: {} }
}

export default RobotsTxt
