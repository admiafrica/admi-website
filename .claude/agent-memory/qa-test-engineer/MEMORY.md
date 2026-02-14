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

## Code Quality Audit (2026-02-14)

- **TypeScript (`tsc --noEmit`):** PASSES cleanly -- zero type errors
- **ESLint (`next lint`):** FAILS -- 20 errors + 6 warnings across 5 files
  - Dominant issue: `comma-dangle` (17 of 20 errors) in ArticleLayout, news/[slug], resources/[slug]
  - 1 unused variable (`slug`) in ArticleLayout line 417
  - 6 warnings for `<img>` instead of `next/image` in alumni, impact-alumni-success, ArticleLayout
- **Build (`next build`):** PASSES after clearing `.next` cache
  - Stale `.next` cache can cause `MODULE_NOT_FOUND` for webpack chunks
  - Two pages exceed 128 kB data threshold: `/courses` (160 kB), `/` (207 kB)
- **Build uses hybrid routing:** Pages Router (main site) + App Router (media-archive, admin, sitemaps)
