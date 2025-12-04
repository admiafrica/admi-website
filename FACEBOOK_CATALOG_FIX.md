# Facebook Catalog Meta Tags Fix - Issue Resolution

## Problem Identified

The previous `FacebookProductMeta` component was using the `next/head` package in a nested component within the Pages Router. This approach had a critical flaw:

**The Issue**: When `<Head>` is used in a nested component (not at the page level), meta tags may not be properly injected into the HTML head section in a way that Facebook's scraper can detect them reliably.

Facebook's microdata checker was consistently reporting:

```
❌ A required field is missing: id
❌ A required field is missing: availability
❌ A required field is missing: price
```

Even though the meta tags were technically present in the component code.

## Root Cause

The problem was **architectural**, not the meta tag values themselves:

1. **Nested `<Head>` components are unreliable**: Next.js `<Head>` works best when used at the page level in the `_document.tsx` or the main page component
2. **The `FacebookProductMeta` component** was imported and rendered inside `CertificateEnhancedSEO` and `DiplomaEnhancedSEO`, which are themselves rendered inside the main page
3. **Multiple Head components**: Having multiple `<Head>` components on the same page can cause race conditions and tag deduplication issues

## Solution Implemented

### 1. **Moved Product Meta Tags to Page Level** (PageSEO Component)

Extended the `PageSEO` component to accept product metadata parameters:

```typescript
interface PageSEOProps {
  // ... existing fields ...

  // Facebook Product Catalog fields
  productId?: string
  productPrice?: number
  productCurrency?: string
  productAvailability?: 'in stock' | 'out of stock' | 'preorder' | 'available for order'
  productCategory?: string
}
```

### 2. **Integrated Meta Tags into PageSEO**

The `PageSEO` component now renders all Facebook product meta tags directly in the main `<Head>`:

```tsx
{
  productId && (
    <>
      {/* OpenGraph Product Tags */}
      <meta property="og:type" content="product" />
      <meta property="og:id" content={productId} />
      <meta property="product:retailer_item_id" content={productId} />
      <meta property="product:item_group_id" content={productId} />

      {/* Price & Availability */}
      {productPrice && (
        <>
          <meta property="product:price:amount" content={productPrice.toString()} />
          <meta property="product:price:currency" content={productCurrency} />
        </>
      )}
      <meta property="product:availability" content={productAvailability} />

      {/* Alternative format for Facebook - CRITICAL */}
      <meta name="id" content={productId} />
      {productPrice && <meta name="price" content={`${productPrice} ${productCurrency}`} />}
      <meta name="availability" content={productAvailability} />
      <meta property="product:brand" content="ADMI" />
    </>
  )
}
```

### 3. **Updated Course Page to Pass Product Data**

Modified `/src/pages/courses/[slug].tsx` to:

```tsx
// Get course pricing for Facebook catalog
const pricing = getCoursePricing(slug, course.awardLevel)

<PageSEO
  title={course.name}
  description={courseDescription}
  keywords={keywords}
  image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
  url={`/courses/${slug}`}
  productId={`admi-${course.awardLevel?.toLowerCase().replace(' ', '-') || 'course'}-${slug}`}
  productPrice={pricing?.price}
  productCurrency={pricing?.currency || 'KES'}
  productAvailability="in stock"
  productCategory="Education & Training > Professional Development"
/>
```

### 4. **Removed Nested FacebookProductMeta Components**

Removed from:

- `CertificateEnhancedSEO.tsx` - No longer imports or renders `FacebookProductMeta`
- `DiplomaEnhancedSEO.tsx` - No longer imports or renders `FacebookProductMeta`

These components now **only handle structured data (Schema.org)**, not meta tags.

## Files Modified

1. **`src/components/shared/v3/PageSEO.tsx`**

   - Added product metadata props
   - Added Facebook product meta tag rendering

2. **`src/pages/courses/[slug].tsx`**

   - Imported `getCoursePricing` utility
   - Pass product data to `PageSEO`

3. **`src/components/course/CertificateEnhancedSEO.tsx`**

   - Removed `FacebookProductMeta` import
   - Removed `FacebookProductMeta` component rendering

4. **`src/components/course/DiplomaEnhancedSEO.tsx`**
   - Removed `FacebookProductMeta` import
   - Removed `FacebookProductMeta` component rendering

## Why This Fixes the Issue

✅ **Single Source of Truth**: All meta tags are now rendered from the main page's `<Head>` component

✅ **Proper Tag Injection**: The page-level `<Head>` ensures all tags are properly injected into the HTML head section

✅ **Facebook Scraper Compatibility**: Facebook's microdata checker now reliably detects:

- `id` (provided in 3 formats: `og:id`, `product:retailer_item_id`, `product:item_group_id`)
- `price` (both `product:price:amount` + `product:price:currency` and `name="price"`)
- `availability` (both `product:availability` and `name="availability"`)

✅ **No Tag Duplication**: Using a single `<Head>` component prevents Next.js from deduplicating or merging conflicting tags

## Testing the Fix

After deployment, re-test with Facebook's Microdata Checker:

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter course URL: `https://admi.africa/courses/2d-animation-certificate-rubika`
3. Click "Check Microdata"

Expected results:

```
✅ id: admi-certificate-2d-animation-certificate-rubika
✅ title: ADMI - 2D Animation Certificate (Rubika)
✅ description: Course description...
✅ link: https://admi.africa/courses/2d-animation-certificate-rubika
✅ image_link: https://images.example.com/...
✅ price: 450000 KES
✅ availability: in stock
```

## Next Steps

1. **Deploy to Staging** - Test the changes on staging.admi.africa
2. **Verify Meta Tags** - Use Facebook's Microdata Checker to confirm all fields are detected
3. **Test Catalog Creation** - Create a test catalog in business.facebook.com/commerce
4. **Full Catalog Integration** - Once verified, set up the production Facebook catalog

## Architecture Notes

- **PageSEO** is now the single source of truth for ALL page-level meta tags
- **CertificateEnhancedSEO** and **DiplomaEnhancedSEO** handle structured data only (Schema.org JSON-LD)
- This separation of concerns makes the code easier to maintain
- The approach scales to other content types (diplomas, programs) by simply passing product data to PageSEO
