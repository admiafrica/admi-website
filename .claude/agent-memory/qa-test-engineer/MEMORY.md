# QA Agent Memory - ADMI Website

## Project Architecture

- Next.js Pages Router (not App Router)
- `'use client'` directive is NOT valid in Pages Router -- only relevant for App Router
- Dynamic course pages use `getServerSideProps` in `src/pages/courses/[slug].tsx`
- Routes: `/apply` redirects to `/enquiry` via next.config.mjs
- NO `/enquire` page or redirect exists -- broken links across the site
- Enquiry page lives at `/enquiry` (src/pages/enquiry.tsx)

## Routing Patterns

- Course slugs resolved via CMS API at runtime (getServerSideProps)
- Static city-specific pages: `{course}-{city}.tsx` (e.g., animation-nairobi.tsx)
- Landing pages use `getStaticProps` with revalidate

## Key File Paths

- next.config.mjs: redirects defined around lines 330-350
- WhatsApp util: src/utils/whatsapp-attribution.ts (exports ADMI_WHATSAPP_NUMBER = '254741132751')
- Layouts: src/layouts/v3/MainLayout

## Common Issues Found

- `'use client'` used in Pages Router files (no-op but misleading)
- `/enquire` links are broken (should be `/enquiry`)
- FAQ accordions lack proper ARIA (no aria-controls, no id on panels, no role attributes)
- Image placeholders shipped without alt text
- `#08F6CF` (teal) on white background fails WCAG AA contrast
