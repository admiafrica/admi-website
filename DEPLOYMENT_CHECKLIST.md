# Facebook Catalog Integration - Deployment & Verification Checklist

## Pre-Deployment (Current Status)

- [x] Code changes implemented
- [x] TypeScript type checking passed (`npm run type-check`)
- [x] Production build successful (`npm run build`)
- [ ] Ready for deployment to Amplify

## Deployment Steps

### Step 1: Deploy to Staging

```bash
# Push to staging branch
git add .
git commit -m "Fix: Move Facebook product meta tags to page level for catalog integration"
git push origin staging

# Monitor Amplify build at https://console.amplify.aws/
# Wait for: "Deployment successful"
```

### Step 2: Verify Meta Tags on Staging (5-10 mins after deploy)

```bash
# Open a course page on staging
https://campaigns-staging.admi.africa/courses/2d-animation-certificate-rubika

# OR test locally with curl (requires running dev server)
curl "http://localhost:3000/courses/2d-animation-certificate-rubika" | \
  grep -E "og:id|product:item_group_id|name=\"id\"|product:availability|name=\"price\"" | head -20
```

### Step 3: Test with Facebook's Microdata Checker

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter staging URL: `https://campaigns-staging.admi.africa/courses/2d-animation-certificate-rubika`
3. Click "Check Microdata" (or reload if cached)

**Expected Results:**

```
OpenGraph section:
✅ og:type: product
✅ og:id: admi-certificate-2d-animation-certificate-rubika
✅ og:title: ADMI - 2D Animation Certificate (Rubika)
✅ og:description: [Course description...]
✅ og:image: [Image URL]

Meta section (if shown):
✅ id: admi-certificate-2d-animation-certificate-rubika
✅ price: [Price] KES
✅ availability: in stock

Product Schema section:
✅ product:retailer_item_id
✅ product:item_group_id
✅ product:price:amount
✅ product:price:currency
✅ product:availability
✅ product:category
✅ product:brand: ADMI
```

**All 3 formats of `id` should be detected:**

- `property="og:id"` ✅
- `property="product:retailer_item_id"` ✅
- `property="product:item_group_id"` ✅

AND

- `name="id"` ✅

### Step 4: Test Other Course Types

Verify the fix works for:

- [ ] Certificate courses: `/courses/2d-animation-certificate-rubika`
- [ ] Diploma courses: `/courses/graphic-design-diploma`
- [ ] Other award levels

### Step 5: Create Test Catalog (Optional)

If meta tags look good:

1. Go to: https://business.facebook.com/commerce
2. Create new catalog: "ADMI Courses Test - Staging"
3. Data source: "Website with microdata"
4. Domain: `campaigns-staging.admi.africa`
5. Feed type: "Automatic" (Facebook crawls your site)
6. Monitor for errors/warnings

### Step 6: Deploy to Production

Once staging verification is complete:

```bash
# Merge staging → main
git checkout main
git pull origin main
git merge staging
git push origin main

# Monitor Amplify production build
# Wait for: "Deployment successful"
```

### Step 7: Verify Production URLs

Test with Facebook's Microdata Checker:

- https://admi.africa/courses/2d-animation-certificate-rubika
- https://admi.africa/courses/graphic-design-diploma
- https://admi.africa/courses/music-production-nairobi

### Step 8: Create Production Catalog

1. Go to: https://business.facebook.com/commerce
2. Create catalog: "ADMI Courses Catalog"
3. Data source: "Website with microdata"
4. Domain: `admi.africa`
5. Feed type: "Automatic"
6. Initial crawl may take 30-60 minutes for ~50 courses

## Troubleshooting

### Issue: "A required field is missing: id"

**Cause**: Meta tags not rendering at page level
**Solution**:

- Check that PageSEO is being called with `productId` prop
- Verify course page passes pricing data
- Check browser DevTools: Network → Page → Response, search for meta tags

### Issue: Price not detected

**Cause**: `getCoursePricing()` returning null
**Solution**:

- Verify `/src/utils/course-pricing.ts` is correctly mapping course slugs to prices
- Check that `course.awardLevel` is being read correctly from Contentful

### Issue: Tags appear in local dev but not in production

**Cause**: SSG/SSR caching issues
**Solution**:

- Amplify may cache pages for several minutes
- Force reindex: Go to Meta Business Suite → Commerce Manager → Data Sources → Crawl again
- Or wait 10-15 minutes for cache to expire

## Quick Reference: Files Changed

1. `/src/components/shared/v3/PageSEO.tsx`

   - Added `productId`, `productPrice`, `productCurrency`, `productAvailability`, `productCategory` props
   - Added Facebook product meta tag rendering in the `<Head>` section

2. `/src/pages/courses/[slug].tsx`

   - Import `getCoursePricing` from `@/utils/course-pricing`
   - Get pricing for course: `const pricing = getCoursePricing(slug, course.awardLevel)`
   - Pass product data to `PageSEO` component

3. `/src/components/course/CertificateEnhancedSEO.tsx`

   - Removed `FacebookProductMeta` import and usage

4. `/src/components/course/DiplomaEnhancedSEO.tsx`
   - Removed `FacebookProductMeta` import and usage

## Success Metrics

✅ All course pages show meta tags in HTML source
✅ Facebook Microdata Checker detects `id`, `price`, `availability` for all formats
✅ Facebook catalog creation works without errors
✅ Products appear in Facebook Commerce Manager
✅ Dynamic Ads can be created using ADMI course catalog
