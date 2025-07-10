import { GetServerSideProps } from 'next'

const RobotsTxt = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `User-agent: *
Allow: /

# SEO-optimized pages
Allow: /frequently-asked-questions
Allow: /careers/*
Allow: /courses/*

# Sitemaps
Sitemap: https://admi.africa/sitemap.xml
Sitemap: https://admi.africa/video-sitemap.xml
Sitemap: https://admi.africa/news-sitemap.xml

# Crawl delays for different bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

# Block spam bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /student-portal/login

# Cache directives
Cache-Control: public, max-age=86400`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return { props: {} }
}

export default RobotsTxt
