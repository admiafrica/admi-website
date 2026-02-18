# UI/UX Specialist Memory -- ADMI Website

## Font Setup
- **Proxima Nova**: loaded via `next/font/local` in `src/styles/theme.ts`, registered as `--font-proxima` CSS variable, tailwind class `font-proxima`
- **Nexa**: loaded via `next/font/local` in `src/styles/theme.ts`, registered as `--font-nexa` CSS variable, tailwind class `font-nexa`
- **Fraunces**: installed as `@fontsource-variable/fraunces`, imported in `_app.tsx`, tailwind class `font-fraunces` (added to tailwind.config.ts)
- Font variables are applied to the DOM via `MainLayout` wrapper: `${proximaNovaFont.variable} ${nexaFont.variable}`

## Key Component Paths
- `src/components/articles/ArticleLayout.tsx` -- shared article page layout (hero, meta bar, two-column body, newsletter CTA)
- `src/components/articles/ArticleMetadata.tsx` -- legacy Mantine-based metadata component (still exists but not used by new layout)
- `src/components/ui/ParagraphContentful.tsx` -- renders Contentful rich text via `documentToHtmlString`
- `src/components/shared/v3/SocialShare.tsx` -- legacy social share sidebar (Mantine-based)
- `src/layouts/v3/MainLayout.tsx` -- main page wrapper with AppShell, NavBar, Footer

## Article Prose Styles
- Global CSS class `.article-prose` defined in `src/styles/globals.css` for rich text body styling
- Handles h2-h4 (Fraunces), paragraphs, lists, links (brand red), blockquotes (red left border), images, etc.

## Tailwind Config
- `tailwind.config.ts` -- preflight disabled (`corePlugins: { preflight: false }`)
- Custom colors: `admiDarkOrange` (#BA2E36), `admiShamrok` (#08F6CF), `admiRed` (#F60834)
- Custom font families: `nexa`, `proxima`, `fraunces`

## Contentful Data Patterns
- Article fields: `title`, `slug`, `summary`, `body` (rich text), `coverImage`, `category`, `tags`, `publishDate`
- Cover image URL: `article.coverImage?.fields?.file?.url` -- always use `ensureProtocol()` wrapper
- Related articles: fetched via `/api/v3/related-articles` endpoint, entries have `fields.title`, `fields.slug`, `fields.category`
- Use native `<img>` tags for Contentful/Unsplash images (domains may not be in next.config remotePatterns)
