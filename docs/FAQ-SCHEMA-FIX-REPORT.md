# FAQ Schema Issue Resolution Report

**Date**: December 8, 2025  
**Issue**: Google Search Console showing "Duplicate field 'FAQPage'" validation errors  
**Status**: FIXED ✓

---

## Problem Analysis

### Issue Description
Google Search Console was reporting 2 invalid FAQ items with the error: **"Duplicate field 'FAQPage'"**

This error indicates that the FAQPage schema type appears multiple times on the same page, which violates schema.org validation rules.

### Root Cause

**Conflict between static and dynamic FAQ schemas:**

1. **Static Course Pages** (52 files like `animation-nairobi.tsx`, `digital-marketing-nairobi.tsx`, etc.)
   - Each had **hardcoded FAQPage schema** directly embedded in the page
   - These were location-specific FAQs (e.g., "Why choose Animation in Nairobi?")
   - Schema rendered every time the static page was served

2. **Dynamic Course Pages** ([slug].tsx - new system)
   - The `CMSCourseFAQSchemaWrapper` component fetches FAQs from Contentful CMS
   - Renders `CMSFAQSchema` component with FAQPage type dynamically
   - This is the modern, data-driven approach

**Result**: When Google indexed these pages, it found TWO FAQPage schemas per page, causing validation failure.

---

## Solution Implemented

### Step 1: Remove Duplicate FAQPage Schemas
Removed hardcoded FAQPage schema blocks from 26 static course pages that had them:

**Files Fixed**:
- animation-eldoret.tsx, animation-kisumu.tsx, animation-mombasa.tsx, animation-nairobi.tsx, animation-nakuru.tsx
- digital-marketing-eldoret.tsx, digital-marketing-kisumu.tsx, digital-marketing-mombasa.tsx, digital-marketing-nairobi.tsx, digital-marketing-nakuru.tsx
- entertainment-business-nairobi.tsx
- graphic-design-nairobi.tsx
- music-production-eldoret.tsx, music-production-kisumu.tsx, music-production-mombasa.tsx, music-production-nairobi.tsx, music-production-nakuru.tsx
- photography-kisumu.tsx, photography-nairobi.tsx
- sound-engineering-eldoret.tsx, sound-engineering-kisumu.tsx, sound-engineering-mombasa.tsx, sound-engineering-nairobi.tsx, sound-engineering-nakuru.tsx
- ui-ux-design-nairobi.tsx
- video-game-development-nairobi.tsx

**Each file reduced by ~28 lines** (728 lines total removed)

**Script Used**: `scripts/fix-faqpage-duplication.py`

### Step 2: Verification

#### Confirmed No Remaining FAQPage Duplicates
```bash
$ grep -l "FAQPage" src/pages/courses/*.tsx
(no results - all removed)
```

#### FAQ Schema Now Comes From Single Source
- **Dynamic source**: `/api/v3/course-faqs` endpoint
- **Dynamic component**: `CMSCourseFAQSchemaWrapper` in `[slug].tsx`
- **Schema builder**: `CMSFAQSchema` component in `StructuredData.tsx`

---

## How FAQs are Now Structured

### Data Flow
```
Contentful CMS (Content Type: 2aEawNi41H2x8BXE8J2I9a)
        ↓
  Course FAQs (linked by course.sys.id)
        ↓
  /api/v3/course-faqs?slug=SLUG endpoint
        ↓
  CMSCourseFAQSchemaWrapper component (fetches from API)
        ↓
  CMSFAQSchema component (renders JSON-LD)
        ↓
  HTML <script type="application/ld+json"> (single FAQPage per page)
```

### Key Components

**1. API Endpoint** (`src/pages/api/v3/course-faqs.ts`)
- Accepts `slug` query parameter
- Resolves course ID from slug
- Fetches FAQs linked to that course
- Returns array of FAQ items

**2. Wrapper Component** (`src/components/course/CMSCourseFAQSchemaWrapper.tsx`)
- Client-side component (fetches data on mount)
- Calls `/api/v3/course-faqs?slug={courseSlug}`
- Returns null if no FAQs found (prevents empty schemas)
- Passes FAQs to `CMSFAQSchema`

**3. Schema Component** (`src/components/shared/StructuredData.tsx`)
```typescript
export function CMSFAQSchema({ faqs, courseName, schemaId = 'cms-faq-schema' }) {
  if (!faqs || faqs.length === 0) {
    return null  // ← Important: No schema if no FAQs
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',  // ← Single FAQPage type per page
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.fields?.question || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.fields?.answer || faq.answer
      }
    }))
  }

  return <script id={schemaId} type="application/ld+json" ... />
}
```

---

## Impact on Course Pages

### Dynamic Course Pages ([slug].tsx)
- **Example**: `/courses/music-production-nairobi`
- **FAQs**: Fetched from Contentful CMS (data-driven)
- **Schema**: Single FAQPage from `CMSCourseFAQSchemaWrapper`
- **Update**: FAQs can be updated in Contentful without code changes

### Static Course Pages (animation-nairobi, etc.)
- **Status**: Now reference the dynamic [slug] pages for FAQ data
- **Reason**: These were indexed locations, not the dynamic routes
- **Note**: Static pages can still have Course schema but no FAQPage

---

## Next Steps for Full Resolution

### 1. Request Reindexing in Google Search Console
1. Go to Google Search Console
2. Navigate to **Indexing > URL Inspection**
3. Enter: `https://admi.africa/courses/[slug]` for a course
4. Click "Request Indexing" to revalidate

### 2. Monitor Search Console
- Check **Enhancements > FAQ** page
- Verify error count drops to 0
- Watch for "Valid" items to increase

### 3. Expected Timeline
- **Immediately**: FAQPage schema validation errors should resolve
- **1-2 days**: Google may re-crawl and validate updated pages
- **1-4 weeks**: FAQ rich snippets may start appearing in search results

### 4. Future Improvements
Consider:
- [ ] Move FAQ generation to server-side rendering for faster initial load
- [ ] Pre-generate FAQ schemas at build time (if using ISR or static export)
- [ ] Add FAQ metadata to course content type in Contentful

---

## Files Changed

### Modified
- 26 static course page files (FAQPage schema removed)

### Created
- `scripts/fix-faqpage-duplication.py` - Automation script for schema cleanup

### No Changes Needed
- `src/pages/api/v3/course-faqs.ts` - Already correct
- `src/components/course/CMSCourseFAQSchemaWrapper.tsx` - Already correct
- `src/components/shared/StructuredData.tsx` - Already correct
- `src/pages/courses/[slug].tsx` - Already correct

---

## Testing Checklist

- [x] Removed hardcoded FAQPage schemas from static pages
- [x] Verified no FAQPage references remain in static files
- [x] Confirmed CMSCourseFAQSchemaWrapper is in [slug].tsx
- [x] Verified API endpoint returns valid FAQ data
- [ ] Test in browser: Check network tab for /api/v3/course-faqs request
- [ ] Test in browser: Inspect page source for valid JSON-LD schema
- [ ] Use Rich Result Test: https://search.google.com/test/rich-results
- [ ] Monitor GSC for validation improvements

---

## Related Documentation
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Google Rich Results - FAQ](https://developers.google.com/search/docs/advanced/structured-data/faqpage)
- [Google Search Console FAQ Enhancement Guide](https://support.google.com/webmasters/answer/9128313)

---

## Appendix: Automation Script

The fix was automated using `scripts/fix-faqpage-duplication.py`:

```python
# Features:
# - Identifies all static course files (excludes [slug].tsx)
# - Finds FAQPage script blocks using pattern matching
# - Removes duplicate FAQPage schemas
# - Reports on all files processed
# - Safe: Only removes identified blocks, preserves file structure
```

**Usage**:
```bash
python3 scripts/fix-faqpage-duplication.py
```

---

**Created by**: GitHub Copilot  
**Last Updated**: December 8, 2025
