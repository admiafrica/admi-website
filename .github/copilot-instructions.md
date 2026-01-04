# ADMI Website - AI Coding Agent Instructions

## Project Overview

Next.js 15 marketing website for Africa Digital Media Institute (ADMI) with **App Router**, **Mantine UI**, **Contentful CMS**, **YouTube integration**, and **AI-powered content optimization**. Deployed on AWS Amplify with serverless Lambda functions for automated tasks.

### Business Context (Critical for AI Agents)

- **Traffic Recovery Success**: Achieved 7x organic traffic increase (9.2% → 67%) in 34 days (Oct-Nov 2025)
- **Lead Quality Crisis**: 39,647 contacts but only 0.2% convert to applications - **quality over quantity is the strategic priority**
- **African Market Reality**: Easy to collect contacts, hard to convert - focus on pre-qualification and lead scoring
- **Google Ads API Integration**: Applied for access to analyze paused campaigns and optimize paid strategy
- **Core Challenge**: Fix lead quality through pre-qualification forms, not just drive more traffic

## Architecture & Key Components

### Frontend Stack

- **Next.js 15** (App Router) with TypeScript
- **Mantine v7** UI library (`@mantine/core`, `@mantine/hooks`, `@mantine/carousel`)
  - Theme: `src/styles/theme` (imported in `src/app/providers.tsx`)
  - Provider setup: Client-side `'use client'` wrapper required
  - **CRITICAL**: `optimizePackageImports` for Mantine is DISABLED in `next.config.mjs` - it breaks Context Provider in Next.js 15.5.3
- **Path aliases**: `@/*` maps to `src/*` (see `tsconfig.json`)
- **Middleware**: Two middleware files - root `middleware.ts` (redirect logic) and `src/middleware.ts` (spam filtering, rate limiting)

### Content Management

- **Contentful CMS** with two space configurations:
  - Main content: `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN`
  - ADMI-specific: `ADMI_CONTENTFUL_SPACE_ID` / `ADMI_CONTENTFUL_ACCESS_TOKEN`
- **Course-FAQ relationship model**: FAQs link to courses via reference fields
- **Rich text**: Use `@contentful/rich-text-html-renderer` for rendering
- Client: `src/utils/axiosContentfulClient.ts` (axios-based, not SDK)

### External Integrations

- **YouTube**: Channel videos auto-categorized by course keywords (`src/utils/youtube-api.ts`, `src/utils/video-categorization.ts`)
  - Cache refreshed via cron: `npm run cache-refresh` or AWS Lambda (`infrastructure/aws-cron/`)
  - Manual categorization overrides: `src/utils/manual-categorization.ts`
- **Google Analytics**: Service account for API access (`@google-analytics/data`)
- **Brevo**: Email marketing integration (`BREVO_API_KEY`, `BREVO_LIST_ID`)
- **OpenAI**: FAQ generation/optimization using Assistants API (`scripts/ai/`)

## Critical Development Workflows

### Build & Development

```bash
# Development (runs on port 3000)
npm run dev

# Production build - MUST run media scripts first
npm run build  # Runs ensure-media-structure.js + generate-media-manifest.js + next build
npm run build:production  # Same with NODE_ENV=production

# Type checking
npm run type-check
```

### Lead Quality & Conversion Optimization (NEW - Top Priority)

```bash
# Test enhanced pre-qualification form
node scripts/test-enhanced-form.js

# Monitor lead quality metrics
npm run analytics:lead-quality

# Google Ads API integration (✅ ACCESS GRANTED)
npm run ads:oauth       # One-time: Generate refresh token
npm run ads:test        # Test API connection
npm run ads:analyze     # Full campaign analysis (2024-2025 data)
npm run ads:status      # Quick status check (enabled/paused/removed)
npm run ads:performance # Historical performance only
```

**Critical Context**:

- Current conversion rate: 0.2% (39,647 contacts → 95 applications)
- Target: 5-7% conversion with pre-qualified leads
- Strategy: Reduce volume (5,000-8,000 leads), increase quality
- Pre-qualification questions: Course interest, timeline, financing ability, enrollment readiness
- Lead scoring system: Categorize as Hot (7-10), Warm (4-6), Cold (0-3)

**Google Ads Recovery**:

- 2024: 267,577 paid sessions → 2025: 1,563 sessions (99.4% drop)
- Target campaigns: "Campaign 1" (129K sessions), "Creative Media and Tech" (10K sessions)
- Analysis outputs: `reports/google-ads/*.json` (status, performance, recommendations)
- Recovery goal: Restore 60-80% of 2024 paid traffic levels

### SEO & Canonical URLs

- **All canonical tags point to naked domain**: `https://admi.africa` (NOT www)
- **WWW redirect**: Permanent 301 from `www.admi.africa/*` to `admi.africa/*` (in `next.config.mjs`)
- **Internal links**: Use relative paths or naked domain only
- See: `docs/seo-canonical-implementation.md`

### FAQ System (AI-Powered)

```bash
# Setup OpenAI Assistant with ADMI knowledge base
npm run faq:setup-assistant

# Generate course-specific FAQs
npm run faq:generate music-production-diploma -- --auto-update

# Optimize based on search data
npm run faq:optimize-main
npm run faq:analyze-queries
npm run faq:optimize-with-real-data
```

- Location: `scripts/ai/` and `scripts/analytics/`
- See: `scripts/ai/README.md`, `docs/contentful-faq-setup.md`

### Blog Generation

```bash
# Daily batch (2 articles)
npm run blog:daily

# Weekly batch (7 articles)
npm run blog:weekly

# Custom batch
npm run blog:generate
```

- Uses Perplexity AI for research-driven content
- Creates drafts in Contentful for manual review
- Topic database: `scripts/blog-generation/blog-topics-database.js`

### Media Management

```bash
# Generate media manifest (before builds)
npm run media:generate

# Refresh YouTube video cache
npm run cache-refresh  # Requires CRON_SECRET and APP_URL env vars
```

## Project-Specific Conventions

### Component Organization

- **App Router pages**: `src/app/[route]/page.tsx`
- **Reusable components**: `src/components/{feature}/{ComponentName}.tsx`
  - Categories: `analytics/`, `cards/`, `course/`, `forms/`, `home/`, `seo/`, `shared/`, `student-support/`, `ui/`
- **Layouts**: `src/layouts/` (MainLayout, EmptyLayout, v3/MainLayout)
- **Legacy pages**: `src/pages/` (Pages Router - being migrated)

### Data Fetching Pattern

```typescript
// Contentful queries via axios client
import axiosContentfulClient from '@/utils/axiosContentfulClient'

const response = await axiosContentfulClient.get('/entries', {
  params: {
    content_type: 'course',
    'fields.slug': courseSlug,
    include: 2 // Include linked entries
  }
})
```

- Helper: `src/utils/course-content-fetcher.ts` for course-specific queries
- Entry resolution: `src/utils/index.ts` (`resolveEntryReferences()`)

### Environment Variables Required

```env
# Contentful (two configurations)
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
ADMI_CONTENTFUL_SPACE_ID=
ADMI_CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_MANAGEMENT_TOKEN=  # For write operations

# External Services
YOUTUBE_API_KEY=
ADMI_YOUTUBE_CHANNEL_ID=UCqLmokG6Req2pHn2p7D8WZQ
BREVO_API_KEY=
BREVO_LIST_ID=
OPENAI_API_KEY=  # For FAQ generation
CRON_SECRET=  # For webhook security

# Analytics (optional, for data-driven optimization)
GOOGLE_ADS_DEVELOPER_TOKEN=
```

### Spam Protection

- **Middleware layers**: `middleware.ts` (redirects) + `src/middleware.ts` (security)
- **Rate limiting**: 100 requests/minute per IP (in-memory, basic protection)
- **Spam patterns**: Extensive gambling/betting detection in `src/middleware.ts` lines 1-100
- **Legitimate paths**: Courses, API routes, sitemaps, `/llm.txt` are always allowed

## Deployment & Infrastructure

### AWS Amplify

- **Config**: `amplify.yml` (builds frontend + deploys serverless functions)
- **Branches**: `staging` → staging environment, `main` → production
- **Build phases**:
  1. Backend: Deploy Lambda functions (`infrastructure/serverless/blog-generation/`)
  2. Frontend: Generate media files → Next.js build

### Git Workflow (CRITICAL - AI Agents MUST Follow)

**🚨 MANDATORY RULES FOR AI AGENTS:**

1. **NEVER push directly to `main` branch** - This is production and requires human approval
2. **ALWAYS push to `staging` branch only** - All changes go to staging first
3. **Production deploys require Pull Requests** - Create PR from staging → main after testing
4. **Wait for human confirmation** - Do not merge PRs without explicit user approval

**REQUIRED DEPLOYMENT PROCESS:**

```bash
# 1. ALWAYS work on staging branch
git checkout staging
git pull origin staging

# 2. Make changes and test locally
npm run type-check
npm run build

# 3. Commit and push to staging ONLY
git add -A
git commit -m "feat: description"
git push origin staging

# 4. Wait for staging deployment and testing
# Visit https://staging.admi.africa
# Verify changes work correctly
# Run any necessary validation scripts

# 5. After testing, create a Pull Request (NOT direct push)
# Go to GitHub and create PR: staging → main
# OR use GitHub CLI:
gh pr create --base main --head staging --title "Deploy: description" --body "Tested on staging"

# 6. Wait for human approval before merging
# The user will review and merge the PR
```

**❌ FORBIDDEN ACTIONS FOR AI AGENTS:**

- `git push origin main` - NEVER do this
- `git checkout main && git merge staging && git push` - NEVER do this
- Merging PRs without explicit user instruction

**✅ ALLOWED ACTIONS FOR AI AGENTS:**

- `git push origin staging` - Always allowed
- Creating Pull Requests - Always allowed
- Suggesting PR creation - Always allowed

### Serverless Functions

```bash
# Deploy cron Lambda (video cache refresh)
npm run deploy-cron

# Deploy blog generation Lambda
cd infrastructure/serverless/blog-generation
./deploy.sh [staging|dev]
```

- **Video cache**: Daily refresh at 1 AM UTC via EventBridge
- **Blog generation**: Weekly schedule (adjust in Lambda config)

### Environment Management

```bash
# Deploy env vars to Amplify
./config/environment/scripts/deploy-env-vars.sh [staging|production]

# Rollback env vars
./config/environment/scripts/rollback-env-vars.sh [staging|production]
```

## Testing & Debugging

### Useful Scripts

```bash
# Check Contentful content types
npm run contentful:check

# Test analytics integration
npm run faq:test-analytics

# Monitor real-time search behavior
npm run faq:monitor-realtime

# Cron health check
npm run cron-health

# Test pre-qualification form
node scripts/test-enhanced-form.js

# Analyze lead quality
node scripts/analytics/lead-quality-analysis.js
```

### Common Patterns

- **Dynamic imports**: Use for heavy components (Modals, etc.) to reduce bundle size
- **Image optimization**: All images via Next.js `<Image>` with `remotePatterns` in `next.config.mjs`
- **Chunk optimization**: Custom webpack config splits Mantine, Framer Motion, and vendor chunks
- **Form validation**: Multi-step forms with progressive disclosure for lead qualification
- **Lead scoring**: Client-side scoring before submission to reduce low-quality leads

## Key Documentation

- **Lead quality crisis**: Analysis documents in workspace root (ADMI-Lead-Quality-\*.html)
- **Pre-qualification strategy**: `ADMI-Pre-Qualification-Form-Strategy.html`
- **Google Ads API**: `ADMI-Google-Ads-API-Design-Documentation.md`
- **Traffic recovery**: `ADMI-SEO-Updated-Recommendations-2025.md`
- SEO strategy: `docs/course-ranking-strategy.md`
- YouTube integration: `docs/YOUTUBE_INTEGRATION.md`
- FAQ setup: `docs/contentful-faq-setup.md`, `scripts/ai/README.md`
- Analytics optimization: `scripts/analytics/README.md`
- Video categorization: `docs/VIDEO_CATEGORIZATION_GUIDE.md`
- Voice search FAQ: `docs/VOICE_SEARCH_FAQ_GUIDE.md`

## Common Pitfalls

1. **Deployment workflow**: ALWAYS push to `staging` first, test, then merge to `main` - never push directly to production
2. **Mantine imports**: Never enable `optimizePackageImports` for Mantine in Next.js config
3. **Middleware files**: Two separate files with different purposes - don't confuse them
4. **Build order**: Media scripts MUST run before `next build` (automated in package.json)
5. **Contentful spaces**: Check which space ID to use - main vs ADMI-specific
6. **Canonical URLs**: All canonical tags use `https://admi.africa` (naked domain only)
7. **Rate limiting**: In-memory store - resets on deployment (upgrade to Redis for production-grade)
