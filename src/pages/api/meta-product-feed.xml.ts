import type { NextApiRequest, NextApiResponse } from 'next'
import { COURSE_PRICING, DEFAULT_PRICING } from '@/utils/course-pricing'

/**
 * Meta Product Catalog Feed — /api/meta-product-feed.xml
 *
 * Returns an XML feed in Meta's required format so Business Manager
 * can ingest course "products" for Dynamic Product Ads on Instagram & Facebook.
 *
 * Schedule this as a "Scheduled Feed" in Commerce Manager:
 *   URL: https://admi.africa/api/meta-product-feed.xml
 *   Frequency: Daily
 *
 * content_ids in the feed MUST match what the Meta Pixel fires
 * via CourseViewEvent (e.g. "admi-diploma-film-and-television-production-diploma").
 */

const BASE_URL = 'https://admi.africa'

interface CatalogItem {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  price: number
  currency: string
  category: string
  programType: string
  duration: string
  intakes: string
  availability: string
}

// All courses with their catalog metadata
const COURSES: CatalogItem[] = [
  // ─── Diploma Programmes ───
  {
    id: 'admi-diploma-film-and-television-production-diploma',
    title: 'Film & Television Production Diploma',
    description: 'Master filmmaking, cinematography, directing, editing and post-production at Kenya\'s leading creative arts institute. 2-year diploma with industry internship. Accredited by Woolf University (EU) and TVETA Kenya.',
    url: `${BASE_URL}/courses/film-and-television-production-diploma`,
    imageUrl: `${BASE_URL}/api/og?title=Film+%26+Television+Production&type=diploma`,
    price: COURSE_PRICING['film-and-television-production']?.price || DEFAULT_PRICING.DIPLOMA.price,
    currency: 'KES',
    category: 'Education > Higher Education > Film & TV',
    programType: 'Diploma',
    duration: '2 Years (5 Terms + Internship)',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-diploma-sound-engineering-diploma',
    title: 'Sound Engineering Diploma',
    description: 'Learn audio engineering, music production, live sound and studio recording at ADMI Nairobi. 2-year diploma with hands-on studio access and industry placement. Woolf University accredited.',
    url: `${BASE_URL}/courses/sound-engineering-diploma`,
    imageUrl: `${BASE_URL}/api/og?title=Sound+Engineering&type=diploma`,
    price: COURSE_PRICING['sound-engineering']?.price || DEFAULT_PRICING.DIPLOMA.price,
    currency: 'KES',
    category: 'Education > Higher Education > Music & Audio',
    programType: 'Diploma',
    duration: '2 Years (5 Terms + Internship)',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-diploma-graphic-design-diploma',
    title: 'Graphic Design Diploma',
    description: 'Build a career in branding, visual communication and digital design at ADMI. 2-year diploma covering Adobe Creative Suite, typography, UI/UX and portfolio development. EU-accredited via Woolf University.',
    url: `${BASE_URL}/courses/graphic-design-diploma`,
    imageUrl: `${BASE_URL}/api/og?title=Graphic+Design&type=diploma`,
    price: COURSE_PRICING['graphic-design']?.price || DEFAULT_PRICING.DIPLOMA.price,
    currency: 'KES',
    category: 'Education > Higher Education > Design',
    programType: 'Diploma',
    duration: '2 Years (5 Terms + Internship)',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-diploma-digital-content-creation-diploma',
    title: 'Digital Content Creation Diploma',
    description: 'Learn content strategy, social media production, video creation and digital storytelling at ADMI. 2-year diploma with real-world briefs and industry internship. Woolf University accredited.',
    url: `${BASE_URL}/courses/digital-content-creation-diploma`,
    imageUrl: `${BASE_URL}/api/og?title=Digital+Content+Creation&type=diploma`,
    price: COURSE_PRICING['digital-content-creation']?.price || DEFAULT_PRICING.DIPLOMA.price,
    currency: 'KES',
    category: 'Education > Higher Education > Digital Media',
    programType: 'Diploma',
    duration: '2 Years (5 Terms + Internship)',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  // ─── Certificate Programmes ───
  {
    id: 'admi-certificate-video-production-certificate',
    title: 'Video Production Certificate',
    description: 'Fast-track your video production skills in 6 months. Learn camera operation, lighting, editing and post-production at ADMI\'s professional studios. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/video-production-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Video+Production&type=certificate`,
    price: COURSE_PRICING['video-production-certificate']?.price || DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Video',
    programType: 'Professional Certificate',
    duration: '6 Months',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-digital-marketing-certificate',
    title: 'Digital Marketing Certificate',
    description: 'Master digital marketing, social media strategy, SEO, content marketing and analytics. Practical certificate programme at ADMI Nairobi. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/digital-marketing-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Digital+Marketing&type=certificate`,
    price: COURSE_PRICING['digital-marketing-certificate']?.price || DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Marketing',
    programType: 'Professional Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-graphic-design-certificate',
    title: 'Graphic Design Certificate',
    description: 'Learn graphic design fundamentals, Adobe Creative Suite, branding and visual communication in this intensive certificate at ADMI. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/graphic-design-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Graphic+Design&type=certificate`,
    price: COURSE_PRICING['graphic-design-certificate']?.price || DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Design',
    programType: 'Professional Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-data-analytics-and-visualisation',
    title: 'Data Analytics & Visualisation Certificate',
    description: 'Learn data analysis, visualisation with Tableau & Power BI, and data-driven storytelling. Practical certificate at ADMI Nairobi. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/data-analytics-and-visualisation`,
    imageUrl: `${BASE_URL}/api/og?title=Data+Analytics&type=certificate`,
    price: DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Data Science',
    programType: 'Professional Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-multimedia-certificate',
    title: 'Multimedia Certificate',
    description: 'Explore photography, video, audio and graphic design in one comprehensive programme. Build a versatile creative portfolio at ADMI Nairobi. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/multimedia-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Multimedia&type=certificate`,
    price: COURSE_PRICING['multimedia-certificate']?.price || DEFAULT_PRICING.CERTIFICATE_FOUNDATIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Multimedia',
    programType: 'Foundational Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-ai-adoption-digital-transformation',
    title: 'AI Adoption & Digital Transformation Certificate',
    description: 'Learn to implement AI tools, automate workflows and lead digital transformation in creative industries. Practical certificate at ADMI Nairobi.',
    url: `${BASE_URL}/courses/ai-adoption-digital-transformation`,
    imageUrl: `${BASE_URL}/api/og?title=AI+%26+Digital+Transformation&type=certificate`,
    price: DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Technology',
    programType: 'Professional Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-music-production-and-sound-engineering-certificate',
    title: 'Music Production & Sound Engineering Certificate',
    description: 'Learn music production, mixing, mastering and sound design in ADMI\'s professional studios. 6-month intensive certificate. Pearson BTEC certified.',
    url: `${BASE_URL}/courses/music-production-and-sound-engineering-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Music+Production&type=certificate`,
    price: DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Music',
    programType: 'Professional Certificate',
    duration: '6 Months',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-photography-certificate',
    title: 'Photography Certificate',
    description: 'Master photography techniques, lighting, composition and post-processing at ADMI. Build a professional portfolio across commercial, editorial and documentary genres.',
    url: `${BASE_URL}/courses/photography-certificate`,
    imageUrl: `${BASE_URL}/api/og?title=Photography&type=certificate`,
    price: COURSE_PRICING['photography-certificate']?.price || DEFAULT_PRICING.CERTIFICATE_FOUNDATIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Photography',
    programType: 'Foundational Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
  {
    id: 'admi-certificate-2d-animation-certificate-rubika',
    title: '2D Animation Certificate (Rubika)',
    description: 'Learn 2D animation, character design and storytelling in partnership with Rubika (France). Create your animation showreel at ADMI\'s creative labs.',
    url: `${BASE_URL}/courses/2d-animation-certificate-rubika`,
    imageUrl: `${BASE_URL}/api/og?title=2D+Animation+(Rubika)&type=certificate`,
    price: COURSE_PRICING['2d-animation-certificate-rubika']?.price || DEFAULT_PRICING.CERTIFICATE_FOUNDATIONAL.price,
    currency: 'KES',
    category: 'Education > Professional Development > Animation',
    programType: 'Foundational Certificate',
    duration: '1 Term',
    intakes: 'May 2026, September 2026, January 2027',
    availability: 'available for order',
  },
]

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildXml(): string {
  const items = COURSES.map(
    (c) => `    <item>
      <g:id>${escapeXml(c.id)}</g:id>
      <g:title>${escapeXml(c.title)}</g:title>
      <g:description>${escapeXml(c.description)}</g:description>
      <g:link>${escapeXml(c.url)}</g:link>
      <g:image_link>${escapeXml(c.imageUrl)}</g:image_link>
      <g:price>${c.price} ${c.currency}</g:price>
      <g:availability>${c.availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>ADMI</g:brand>
      <g:google_product_category>${escapeXml(c.category)}</g:google_product_category>
      <g:product_type>${escapeXml(c.programType)}</g:product_type>
      <g:custom_label_0>${escapeXml(c.programType)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(c.duration)}</g:custom_label_1>
      <g:custom_label_2>${escapeXml(c.intakes)}</g:custom_label_2>
    </item>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>ADMI Course Catalog</title>
    <link>${BASE_URL}</link>
    <description>Africa Digital Media Institute - Creative Arts Programmes</description>
${items}
  </channel>
</rss>`
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
  res.status(200).send(buildXml())
}
