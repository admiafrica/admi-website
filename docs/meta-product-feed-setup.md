# Meta Product Catalog Feed — Setup Guide

## Overview

ADMI's course pages fire Meta Pixel `ViewContent` events with product IDs. To power **Instagram Dynamic Product Ads (DPA)**, Meta needs a product catalog that maps those IDs to course details (title, image, price, URL). This feed provides that mapping.

**Feed URL:** `https://admi.africa/api/meta-product-feed.xml`
**Format:** XML (RSS 2.0 with Google Merchant namespace)
**Courses:** 13 total (4 Diplomas + 9 Certificates)
**Cache:** Refreshes every 24 hours (CDN-cached)

---

## How It Works

```
User visits course page
        |
        v
Meta Pixel fires ViewContent
  content_ids: ["admi-diploma-film-and-television-production-diploma"]
  content_type: "product"
  value: 145000
  currency: "KES"
        |
        v
Meta matches content_ids to product catalog
        |
        v
Instagram shows that exact course in remarketing ads
```

The `id` field in the feed matches the `content_ids` fired by the pixel:

| Pixel Event | Feed ID |
|---|---|
| `admi-diploma-film-and-television-production-diploma` | Same |
| `admi-certificate-video-production-certificate` | Same |
| `admi-certificate-digital-marketing-certificate` | Same |

---

## Step 1: Create the Catalog in Commerce Manager

1. Go to [Meta Commerce Manager](https://business.facebook.com/commerce)
2. Click **Add Catalog**
3. Select catalog type: **Other** (or Education if available)
4. Name it: `ADMI Course Catalog`
5. Select your Business Manager account
6. Click **Create**

## Step 2: Add the Data Feed

1. Inside the catalog, go to **Data Sources** > **Data Feed**
2. Select **Scheduled Feed**
3. Enter the feed URL:
   ```
   https://admi.africa/api/meta-product-feed.xml
   ```
4. Set schedule: **Daily** (the feed auto-updates when courses change)
5. Set currency: **KES** (Kenyan Shillings)
6. Click **Upload** / **Start Upload**
7. Wait for Meta to fetch and validate — should show **13 items**

## Step 3: Verify the Feed

After upload, check:

- [ ] All 13 courses appear in the catalog
- [ ] Each item has an image, title, price, and link
- [ ] No errors or warnings in the diagnostics tab
- [ ] Click a few items and verify the URLs go to the correct course pages

If images show as broken, the OG image API (`/api/og`) needs to be deployed. You can replace `imageUrl` values in `src/pages/api/meta-product-feed.xml.ts` with Contentful image URLs once available.

## Step 4: Connect Pixel to Catalog

1. Go to **Settings** in Commerce Manager
2. Under **Event Sources**, click **Connect Tracking**
3. Select your Meta Pixel: `2180607305521624`
4. Meta will now match Pixel events (`ViewContent`, `Lead`, `InitiateCheckout`, `Purchase`) to catalog items using `content_ids`

---

## Remarketing Audiences for Instagram

Create these audiences in **Meta Ads Manager** > **Audiences** > **Create Audience** > **Custom Audience** > **Website**:

### Audience 1: Viewed Course But Didn't Enquire
- **Include:** `ViewContent` in the last **14 days**
- **Exclude:** `Lead` in the last **14 days**
- **Name:** `ADMI - Course Viewers (No Enquiry) - 14d`
- **Use for:** Awareness / consideration ads, course highlights, testimonials

### Audience 2: Enquired But Didn't Apply
- **Include:** `Lead` in the last **30 days**
- **Exclude:** People who visited `apply.admi.africa` (via `InitiateCheckout`)
- **Name:** `ADMI - Enquired (No Application) - 30d`
- **Use for:** Urgency ads ("Application deadline approaching"), student success stories

### Audience 3: Started Application But Didn't Submit
- **Include:** `InitiateCheckout` in the last **30 days**
- **Exclude:** `Purchase` in the last **30 days**
- **Name:** `ADMI - App Started (Not Submitted) - 30d`
- **Use for:** "Complete your application" reminders, early bird deadline nudges

### Audience 4: All Converters (Exclude from prospecting)
- **Include:** `Purchase` in the last **180 days**
- **Name:** `ADMI - Submitted Applications - 180d`
- **Use for:** Exclude from all prospecting/remarketing to avoid wasting spend

### Audience 5: Lookalike — High-Intent Leads
- **Source:** Custom audience of `Lead` events (last 90 days)
- **Location:** Kenya, Nigeria, Tanzania, Uganda, Rwanda, Ethiopia, Ghana, South Africa
- **Size:** 1% (most similar)
- **Name:** `ADMI - Lookalike 1% - Leads (East Africa)`
- **Use for:** Prospecting new students similar to enquirers

---

## Instagram Ad Setup (Dynamic Product Ads)

### Campaign Structure

```
Campaign: ADMI Remarketing - Instagram DPA
  |
  +-- Ad Set: Course Viewers (Audience 1)
  |     Budget: KES 500/day
  |     Placements: Instagram Feed, Stories, Reels, Explore
  |     Catalog: ADMI Course Catalog
  |     Product Set: All courses (or filter by custom_label_0)
  |
  +-- Ad Set: Enquired No Application (Audience 2)
  |     Budget: KES 800/day (higher intent = higher spend)
  |     Placements: Instagram Feed, Stories, Reels
  |     Catalog: ADMI Course Catalog
  |
  +-- Ad Set: App Abandoners (Audience 3)
        Budget: KES 500/day
        Placements: Instagram Feed, Stories
        Catalog: ADMI Course Catalog
```

### Ad Creative Settings

1. **Objective:** Sales (Catalog Sales)
2. **Catalog:** ADMI Course Catalog
3. **Ad Format:** Carousel (auto-populated from catalog) or Collection
4. **Primary Text:**
   - Audience 1: "Still thinking about {{product.name}}? May 2026 intake is now open. Limited spots."
   - Audience 2: "You enquired about {{product.name}}. Take the next step — apply now with no application fee."
   - Audience 3: "Your application is almost complete! Finish it today and secure your spot for May 2026."
5. **CTA Button:** "Apply Now" (links to course page URL from feed)

### Custom Labels for Filtering

The feed includes custom labels you can use to create Product Sets:

| Label | Field | Values | Use |
|---|---|---|---|
| `custom_label_0` | Programme Type | `Diploma`, `Professional Certificate`, `Foundational Certificate` | Separate ad sets by programme |
| `custom_label_1` | Duration | `2 Years`, `6 Months`, `1 Term` | Ad copy: "In just 6 months..." |
| `custom_label_2` | Intakes | `May 2026, September 2026, January 2027` | Urgency messaging |

**Example Product Set filters:**
- "Diploma Only": `custom_label_0` contains `Diploma`
- "Short Certificates": `custom_label_1` contains `1 Term`

---

## Tracking Funnel (Both Sites)

| Stage | Event | Pixel Event | Site | Value |
|---|---|---|---|---|
| 1. View Course | User lands on course page | `ViewContent` | admi.africa | Price (KES) |
| 2. Enquiry | User submits MidPageCTA form | `Lead` | admi.africa | $50-100 USD |
| 3. Sign Up | User creates portal account | `CompleteRegistration` | apply.admi.africa | — |
| 4. Start Application | User opens application form | `InitiateCheckout` | apply.admi.africa | — |
| 5. Submit Application | User completes all steps | `Lead` + `Purchase` | apply.admi.africa | $150 USD |

Both sites use the same Pixel ID (`2180607305521624`), so Meta sees the entire journey as one user.

---

## Feed Maintenance

### Adding a New Course

Edit `src/pages/api/meta-product-feed.xml.ts` and add a new entry to the `COURSES` array:

```typescript
{
  id: 'admi-certificate-new-course-slug',       // Must match pixel content_ids
  title: 'New Course Name',
  description: 'Course description for ad copy...',
  url: `${BASE_URL}/courses/new-course-slug`,
  imageUrl: `${BASE_URL}/api/og?title=New+Course&type=certificate`,
  price: 93100,
  currency: 'KES',
  category: 'Education > Professional Development > Category',
  programType: 'Professional Certificate',
  duration: '1 Term',
  intakes: 'May 2026, September 2026, January 2027',
  availability: 'available for order',
},
```

Also ensure the course page renders `<CourseViewEvent>` with matching `courseId`:
```tsx
<CourseViewEvent
  courseId="admi-certificate-new-course-slug"
  courseName="New Course Name"
  price={93100}
  currency="KES"
/>
```

### Updating Prices or Intakes

Edit the `COURSES` array in the feed file. Meta will pick up changes on the next scheduled fetch (daily).

### Replacing Placeholder Images

Replace the `imageUrl` field with real Contentful image URLs:
```typescript
imageUrl: 'https://images.ctfassets.net/xxxxx/course-hero-image.jpg',
```

For best results on Instagram:
- **Minimum:** 600x600px (square crops well for feed + stories)
- **Recommended:** 1080x1080px or 1200x628px
- Show students, campus, or equipment — not text-heavy graphics

---

## Troubleshooting

| Issue | Fix |
|---|---|
| "No items in catalog" | Check feed URL is accessible: `curl https://admi.africa/api/meta-product-feed.xml` |
| "Product not matched" | Verify `content_ids` in pixel event matches `id` in feed exactly |
| "Image not loading" | Replace OG API URLs with direct Contentful image URLs |
| "Pixel not connected" | Go to Commerce Manager > Settings > Event Sources > connect pixel |
| "Low match rate" | Ensure pixel fires on every course page (check via Meta Pixel Helper extension) |
