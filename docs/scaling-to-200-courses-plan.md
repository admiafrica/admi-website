# Scaling to 200 Courses: Implementation Plan

> **Goal:** 100 diploma programmes + 100 certificate programmes — zero code deploys per new course.
>
> **Current state:** 13 courses (4 diplomas + 9 certificates), most section data hardcoded in TypeScript.
>
> **Target state:** Add a course entirely from Contentful CMS. Page, pricing, product feed, city SEO pages, and all sections auto-populate.

---

## Phase 1 — Remove Deploy-per-Course Dependency

**Priority:** Critical — blocks every new course addition
**Effort:** 2-3 hours
**Outcome:** New courses launch from Contentful alone, no code changes needed

### 1.1 Use Contentful `tuitionFees` Field for Pricing

**Problem:** `src/utils/course-pricing.ts` is a hardcoded TypeScript map. Every new course requires editing this file and deploying.

**Solution:** The `course` content type already has a `tuitionFees` field. Use it as the primary source, fall back to the static map, then to default tier pricing.

**Files to change:**

- `src/utils/course-pricing.ts` — update `getCoursePricing()` to accept an optional `contentfulPrice` parameter
- `src/pages/courses/[slug].tsx` — pass `course.tuitionFees` through to components
- `src/components/course/CoursePageLayout.tsx` — pass price to `QuickFactsBar`, `PaymentPlan`, structured data

**Priority chain:**

```
Contentful tuitionFees (per course) → course-pricing.ts override → DEFAULT_PRICING by award level
```

**Acceptance criteria:**

- [ ] Adding `tuitionFees: 150000` to a Contentful course entry shows KES 150,000 on the page
- [ ] Courses without `tuitionFees` still use the static map
- [ ] Meta product feed uses the same pricing source

---

### 1.2 Dynamic Meta Product Feed

**Problem:** `/api/meta-product-feed.xml.ts` has 13 hardcoded course objects. Adding a course to Contentful does NOT add it to the Instagram/Facebook product catalog.

**Solution:** Rewrite the endpoint to fetch all published `course` entries from Contentful at request time (cached 24h via `s-maxage`).

**Files to change:**

- `src/pages/api/meta-product-feed.xml.ts` — replace static `COURSES` array with Contentful fetch
- Reuse existing Contentful client from `src/lib/contentful.ts`

**Feed item mapping:**

```
id          → "admi-{awardLevel}-{slug}" (matches pixel content_ids)
title       → course.name
description → course.description (first 500 chars)
url         → https://admi.africa/courses/{slug}
imageUrl    → course.coverImage.url or OG fallback
price       → course.tuitionFees or DEFAULT_PRICING
category    → derived from course.category
programType → course.awardLevel
duration    → course.programType.duration
intakes     → course.intakeMonths
```

**Acceptance criteria:**

- [ ] Publishing a new course in Contentful adds it to the XML feed within 24h (cache TTL)
- [ ] `content_ids` in feed match what the Meta Pixel fires on course pages
- [ ] Unpublished/draft courses are excluded

---

### 1.3 Dynamic Fallback Data (Remove Film Production Generic Fallback)

**Problem:** Any course slug not in `diploma-course-data.ts` or `certificate-course-data.ts` falls back to Film Production data — wrong careers, wrong mentors, wrong everything.

**Solution:** Make `CoursePageLayout.tsx` gracefully handle missing static data by showing only CMS-populated sections. If a section has no CMS data AND no static data, hide it instead of showing Film Production content.

**Files to change:**

- `src/components/course/CoursePageLayout.tsx` — conditional rendering per section
- `src/data/course-page-data.ts` — keep as emergency fallback only, not default

**Logic per section:**

```
if (cmsData exists for section) → show CMS data
else if (staticData[slug] exists) → show static data
else → hide section entirely (don't fall back to generic)
```

**Acceptance criteria:**

- [ ] A brand-new Contentful course with no static data file shows only populated sections
- [ ] No course ever displays another course's careers, mentors, or testimonials
- [ ] Existing 13 courses are unaffected (their static data still loads)

---

## Phase 2 — Migrate Hardcoded Sections to CMS

**Priority:** High — causes manual work for every course, data becomes stale
**Effort:** 4-6 hours
**Outcome:** All course page sections editable from Contentful

### 2.1 Create Missing Content Types

Six sections currently ONLY read from hardcoded TypeScript. Create Contentful content types for each:

| Section Component     | New Content Type         | Key Fields                                                                                         |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `AssessmentBreakdown` | `courseAssessmentMethod` | course (ref), method (text), percentage (number), description (text)                               |
| `StudentPortfolio`    | `coursePortfolioItem`    | course (ref), title (text), studentName (text), image (asset), description (text), category (text) |
| `StudentsInAction`    | `courseActivityPhoto`    | course (ref), image (asset), caption (text), category (text)                                       |
| `IndustryPartners`    | `courseIndustryPartner`  | course (ref), name (text), logo (asset), partnershipType (text)                                    |
| `IndustryTrends`      | `courseIndustryTrend`    | course (ref), stat (text), description (text), source (text), year (number)                        |
| `ApplicationSteps`    | `courseApplicationStep`  | course (ref), stepNumber (number), title (text), description (text), icon (text)                   |

**Migration script:** `scripts/contentful/create-remaining-section-types.js`

**Files to change per section (repeat for all 6):**

1. Create content type via migration script
2. Add API fetch in `src/pages/api/v3/course-sections.ts` for the new section key
3. Update the component to prefer CMS data over static data
4. Seed existing static data into Contentful for the 13 current courses

### 2.2 Migrate Diploma-Exclusive Sections

Four sections only exist for diploma programmes with data hardcoded in `diploma-course-data.ts`:

| Section                   | Content Type(s) Needed                             | Fields                                                                                     |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `HybridModelSection`      | `courseHybridStep`                                 | course (ref), phase (text), title (text), description (text), duration (text), icon (text) |
| `DiplomaExclusiveSection` | `courseDiplomaExclusive`                           | course (ref), title (text), description (text), icon (text)                                |
| `InternshipProgram`       | `courseInternshipPartner`, `courseInternshipStory` | course (ref), company name, logo, story text, student name, role                           |
| `IndustryValidation`      | `courseIndustryEndorsement`                        | course (ref), quote (text), author (text), company (text), logo (asset)                    |

**Logic:** These sections render ONLY when the course `awardLevel` includes "Diploma" AND CMS data exists. No fallback to generic data.

### 2.3 Seed Existing Static Data into Contentful

**Script:** `scripts/contentful/seed-all-static-data.js`

Reads all entries from `diploma-course-data.ts` and `certificate-course-data.ts`, creates corresponding Contentful entries linked to the correct course.

**Acceptance criteria:**

- [ ] All 13 existing courses display identical content before and after migration
- [ ] Static data files can be deleted after verification (keep as backup initially)
- [ ] New courses only need Contentful entries, no TypeScript edits

---

## Phase 3 — Dynamic City SEO Pages

**Priority:** Medium — current 50 files work but don't scale
**Effort:** 2 hours
**Outcome:** 200 courses x 5 cities = 1,000 SEO pages from 1 template file

### 3.1 Replace Individual City Files with Dynamic Route

**Problem:** 50 individual files like `animation-nairobi.tsx`, `film-production-mombasa.tsx`. At 200 courses x 5 cities = 1,000 files.

**Solution:** Single dynamic route `src/pages/courses/[course]-[city].tsx` (or nested `[course]/[city].tsx`).

**Files to change:**

- Create `src/pages/courses/study/[slug].tsx` (e.g. `/courses/study/animation-nairobi`)
- Reuse existing `CourseCityTemplate` component
- Delete 50 individual city files
- Add redirects in `next.config.js` from old URLs to new pattern

**City list:** Nairobi, Mombasa, Kisumu, Nakuru, Eldoret (expandable)

**Course slug mapping:** Fetch all course slugs from Contentful, generate combinations with cities.

**SEO considerations:**

- Canonical URLs pointing to main course page
- Unique title/description per city variant
- `hreflang` not needed (all English, same country)
- 301 redirects from old `/courses/animation-nairobi` to `/courses/study/animation-nairobi`

**Acceptance criteria:**

- [ ] All existing city page URLs redirect to new pattern
- [ ] New courses automatically get city pages
- [ ] Each city page has unique meta title/description
- [ ] Google Search Console shows no 404s after migration

---

## Phase 4 — Bulk Course Scaffolding

**Priority:** Low — quality-of-life improvement
**Effort:** 2-3 hours
**Outcome:** Launch a new course in Contentful in minutes

### 4.1 Course Creation Script

**Script:** `scripts/contentful/create-course.js`

Interactive CLI that:

1. Prompts for: course name, slug, award level, category, description, tuition fee, intake months, duration
2. Creates the `course` entry in Contentful
3. Creates placeholder linked entries: 3 learning outcomes, 3 career paths, 1 payment plan, 5 FAQ entries
4. Outputs checklist of remaining content to populate

**Usage:**

```bash
node scripts/contentful/create-course.js \
  --name "3D Animation Diploma" \
  --slug "3d-animation-diploma" \
  --level "Diploma" \
  --fee 145000
```

### 4.2 Course Completeness Dashboard

**Endpoint:** `/api/v3/course-completeness`

Returns a JSON report of all courses and which CMS sections are populated vs missing. Useful for content team to track what still needs writing.

```json
{
  "courses": [
    {
      "slug": "3d-animation-diploma",
      "name": "3D Animation Diploma",
      "completeness": 45,
      "sections": {
        "testimonials": { "status": "missing", "count": 0, "recommended": 3 },
        "mentors": { "status": "partial", "count": 1, "recommended": 4 },
        "careers": { "status": "complete", "count": 5, "recommended": 3 },
        "faqs": { "status": "missing", "count": 0, "recommended": 5 }
      }
    }
  ]
}
```

---

## Phase 5 — Performance at Scale

**Priority:** Low — only matters at 100+ courses
**Effort:** 2-3 hours
**Outcome:** Fast page loads even with 200 courses

### 5.1 Switch from SSR to ISR

**Problem:** `getServerSideProps` renders every course page on every request. At 200 courses with traffic, this is expensive.

**Solution:** Switch to `getStaticProps` with Incremental Static Regeneration (ISR).

```typescript
export async function getStaticProps({ params }) {
  // ... same data fetching
  return {
    props: { course, slug },
    revalidate: 3600 // Rebuild page every hour
  }
}

export async function getStaticPaths() {
  // Fetch all course slugs from Contentful
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking' // New courses render on first visit, then cache
  }
}
```

### 5.2 Contentful Webhook for On-Demand Revalidation

When a course is updated in Contentful, trigger Next.js on-demand revalidation:

**Endpoint:** `/api/revalidate?secret=xxx&slug=film-production-diploma`

Called by Contentful webhook on entry publish/unpublish. Instantly refreshes the cached page without waiting for the revalidation interval.

---

## Implementation Order

```
Week 1:  Phase 1 (Critical blockers)
          1.1 CMS pricing integration
          1.2 Dynamic product feed
          1.3 Graceful fallback for missing data

Week 2:  Phase 2.1-2.2 (Content type migrations)
          Create 10 new content types
          Update 6 section components

Week 3:  Phase 2.3 (Data seeding)
          Seed all 13 courses' static data into Contentful
          Verify parity, remove static data dependency

Week 4:  Phase 3 (City SEO pages)
          Dynamic route + redirects
          Delete 50 individual files

Week 5+: Phase 4-5 (Tooling & performance)
          Scaffolding script
          Completeness dashboard
          ISR migration
```

---

## Risk Mitigation

| Risk                                            | Mitigation                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| CMS data missing for existing courses           | Keep static data files as readonly fallback during migration; delete only after full verification |
| SEO impact from city page URL changes           | 301 redirects + submit updated sitemap to Google Search Console                                   |
| Meta product feed breaks during migration       | Feature flag: serve static feed until dynamic feed is verified                                    |
| Contentful API rate limits at 200 courses       | Cache aggressively (ISR + CDN), batch API calls in product feed                                   |
| Content team overwhelmed populating 200 courses | Phase 4 scaffolding script + completeness dashboard prioritises effort                            |

---

## Success Metrics

- [ ] **Zero deploys** needed to add a new course (after Phase 1)
- [ ] **< 5 minutes** to scaffold a new course from CLI (after Phase 4)
- [ ] **100% section parity** — every section CMS-editable (after Phase 2)
- [ ] **1,000 city pages** from 1 template file (after Phase 3)
- [ ] **< 200ms TTFB** on course pages at scale (after Phase 5)
