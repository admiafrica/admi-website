# ADMI Meta Ads — Complete Setup Guide

Full documentation for Meta advertising across Instagram, Facebook, and WhatsApp.
Covers product catalog, remarketing audiences, Lead Ads, WhatsApp Ads, server-side tracking (sGTM + CAPI), and the AI chatbot integration.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Server-Side Tracking (sGTM + Meta CAPI)](#2-server-side-tracking)
3. [Product Catalog Feed for DPA](#3-product-catalog-feed)
4. [Remarketing Audiences](#4-remarketing-audiences)
5. [Ad Types & Campaign Structure](#5-ad-types--campaign-structure)
6. [Instagram Lead Ads + Brevo Webhook](#6-instagram-lead-ads)
7. [WhatsApp Ads + AI Chatbot](#7-whatsapp-ads--ai-chatbot)
8. [Environment Variables](#8-environment-variables)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Architecture Overview

```
                    ADMI Website (admi.africa)
                    ┌──────────────────────────┐
                    │  Course Pages             │
                    │  - ViewContent (Pixel)    │──── Browser Pixel ────┐
                    │  - Lead (form submit)     │                      │
                    │  - CTA clicks (GA4)       │                      ▼
                    │                           │              ┌──────────────┐
                    │  dataLayer.push()  ───────┼──── sGTM ──>│  Meta CAPI   │
                    │  (event_id for dedup)     │  (server)   │  (Server)    │
                    └──────────────────────────┘              └──────────────┘
                                                                     │
                    Application Portal (apply.admi.africa)           │
                    ┌──────────────────────────┐                     │
                    │  Sign Up → CompleteReg    │──── GTM ──────────>│
                    │  App Started → InitCheck  │                    │
                    │  App Submit → Lead/Purch  │                    ▼
                    └──────────────────────────┘           ┌──────────────────┐
                                                           │  Meta Ads Manager │
                    Instagram Lead Ads                     │  - DPA Catalog    │
                    ┌──────────────────────────┐           │  - Audiences      │
                    │  Form submitted in-app   │           │  - Optimisation   │
                    │  Webhook ──> /api/v3/    │           └──────────────────┘
                    │  webhooks/meta-lead-ads   │
                    └──────────┬───────────────┘
                               │
                    WhatsApp Ads
                    ┌──────────────────────────┐
                    │  Click-to-WhatsApp ad     │
                    │  User messages ADMI       │
                    │  AI Bot (OpenAI) responds │
                    └──────────┬───────────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │  Brevo CRM               │
                    │  - All leads unified      │
                    │  - Deal pipelines         │
                    │  - Email automation       │
                    └──────────────────────────┘
```

---

## 2. Server-Side Tracking

### What's Configured

- **GTM Container:** `GTM-KPDDVWR` (loaded in `_app.tsx` via `GoogleTagManager` component)
- **Meta Pixel:** `2180607305521624` (loaded via GTM, with fbq stub in `GoogleTagManager.tsx`)
- **sGTM:** Server container on Google Tag Manager forwarding events to Meta CAPI

### Event Deduplication

Every Meta Pixel event now fires with a shared `event_id` in both:
- **Browser:** `fbq('track', 'Lead', data, { eventID: '...' })`
- **dataLayer:** `window.dataLayer.push({ event: 'meta_lead', meta_event_id: '...' })`

The sGTM Meta CAPI tag reads `meta_event_id` from the dataLayer and sends it as `event_id` in the server-side API call. Meta deduplicates using this ID.

### sGTM Configuration Checklist

In your server-side GTM container, ensure the Meta CAPI tag has:

- [x] **Event name mapping:**

  | dataLayer event | Meta CAPI event |
  |---|---|
  | `meta_viewcontent` | `ViewContent` |
  | `meta_lead` | `Lead` |
  | `meta_initiatecheckout` | `InitiateCheckout` |
  | `meta_completeregistration` | `CompleteRegistration` |
  | `meta_purchase` | `Purchase` |

- [x] **Event ID:** Map from `meta_event_id` variable in dataLayer
- [x] **User data:** Map `user_data.email_address` and `user_data.phone_number` from `generate_lead` events
- [x] **Cookie forwarding:** `_fbp` and `_fbc` cookies forwarded for anonymous user matching
- [x] **Action source:** Set to `website`
- [x] **Test events code:** Use Meta Events Manager test tool to verify events arrive

### Events Fired Across Both Sites

| Event | Trigger | Site | user_data | content_ids |
|---|---|---|---|---|
| `ViewContent` | Course page load | admi.africa | No (anonymous) | Yes |
| `Lead` | MidPageCTA / Enquiry form submit | admi.africa | Yes (email+phone+name) | Yes |
| `CompleteRegistration` | Account created | apply.admi.africa | No | No |
| `InitiateCheckout` | Application form opened | apply.admi.africa | No | No |
| `Lead` | Application submitted | apply.admi.africa | No | No |
| `Purchase` | Application success page | apply.admi.africa | No | No |

---

## 3. Product Catalog Feed

### Feed URL
```
https://admi.africa/api/meta-product-feed.xml
```

### Format
XML (RSS 2.0 with Google Merchant `g:` namespace). Contains all 13 courses (4 diplomas + 9 certificates).

### Setting Up in Commerce Manager

1. Go to [Meta Commerce Manager](https://business.facebook.com/commerce)
2. **Add Catalog** > Type: "Other" > Name: `ADMI Course Catalog`
3. **Data Sources** > **Data Feed** > **Scheduled Feed**
4. URL: `https://admi.africa/api/meta-product-feed.xml`
5. Schedule: **Daily**
6. Verify: Should show **13 items** after first fetch
7. **Settings** > **Event Sources** > Connect Pixel `2180607305521624`

### Custom Labels

| Label | Field | Values | Use Case |
|---|---|---|---|
| `custom_label_0` | Programme type | `Diploma`, `Professional Certificate`, `Foundational Certificate` | Split ad sets |
| `custom_label_1` | Duration | `2 Years`, `6 Months`, `1 Term` | Ad copy |
| `custom_label_2` | Intake dates | `May 2026, September 2026, January 2027` | Urgency |

### content_ids Matching

Feed IDs must match pixel `content_ids` exactly:
- Diplomas: `admi-diploma-{slug}` (e.g. `admi-diploma-film-and-television-production-diploma`)
- Certificates: `admi-certificate-{slug}` (e.g. `admi-certificate-video-production-certificate`)

### Adding a New Course

Edit `src/pages/api/meta-product-feed.xml.ts`, add entry to `COURSES` array:
```typescript
{
  id: 'admi-certificate-new-slug',
  title: 'New Course Name',
  description: 'Description for ad copy...',
  url: `${BASE_URL}/courses/new-slug`,
  imageUrl: `${BASE_URL}/api/og?title=New+Course&type=certificate`,
  price: 93100,
  currency: 'KES',
  category: 'Education > Professional Development > Category',
  programType: 'Professional Certificate',
  duration: '1 Term',
  intakes: 'May 2026, September 2026, January 2027',
  availability: 'available for order',
}
```

Also ensure the course page renders `<CourseViewEvent courseId="admi-certificate-new-slug" ... />`.

---

## 4. Remarketing Audiences

Create in **Ads Manager** > **Audiences** > **Custom Audience** > **Website**:

### Audience 1: Course Viewers (No Enquiry) — 14 days
- Include: `ViewContent` last 14 days
- Exclude: `Lead` last 14 days
- **Use:** Awareness, course highlight ads, testimonials

### Audience 2: Enquired but Didn't Apply — 30 days
- Include: `Lead` last 30 days
- Exclude: `InitiateCheckout` last 30 days
- **Use:** Urgency ("deadline approaching"), student success stories

### Audience 3: Started App but Didn't Submit — 30 days
- Include: `InitiateCheckout` last 30 days
- Exclude: `Purchase` last 30 days
- **Use:** "Complete your application" nudges

### Audience 4: All Converters (Exclusion list) — 180 days
- Include: `Purchase` last 180 days
- **Use:** Exclude from all prospecting to save budget

### Audience 5: Engagement — Instagram Profile
- Custom Audience > Instagram Account
- Anyone who interacted (liked, commented, saved, DM'd, profile visited) in last 90 days
- **Use:** Warm prospecting — they already know ADMI

### Audience 6: Video Viewers — 50%+ watch
- Custom Audience > Video
- People who watched 50%+ of any video ad or Reel in last 30 days
- **Use:** High-intent retargeting with course-specific offers

### Audience 7: Lookalike — Leads 1%
- Source: Audience 2 (enquired) or all `Lead` events last 90 days
- Location: Kenya, East Africa, Nigeria, Ghana, South Africa
- Size: 1% (most similar)
- **Use:** Prospecting similar to your actual enquirers

---

## 5. Ad Types & Campaign Structure

### Campaign 1: Advantage+ Catalog (DPA) — Instagram Retargeting
**Objective:** Sales (Catalog Sales)
```
Campaign: ADMI Course Retargeting - DPA
├── Ad Set: Course Viewers (Audience 1)
│   Budget: KES 500/day
│   Placements: Instagram Feed, Stories, Reels, Explore
│   Product Set: All courses
│
├── Ad Set: Enquired No App (Audience 2)
│   Budget: KES 800/day
│   Product Set: All courses
│
└── Ad Set: App Abandoners (Audience 3)
    Budget: KES 500/day
    Product Set: All courses
```

**Dynamic Ad Copy:**
- Viewers: "Still thinking about {{product.name}}? May 2026 intake is now open."
- Enquired: "You asked about {{product.name}}. Apply now — no application fee."
- Abandoners: "Your application is almost complete. Finish today for May 2026."

### Campaign 2: Advantage+ Shopping — AI Optimised
**Objective:** Sales
- Lets Meta's AI combine prospecting + retargeting automatically
- Provide 5-10 creatives (mix of video + static)
- Set country targeting (Kenya + region)
- Budget: KES 2,000-5,000/day
- Meta optimises audience, placement, and creative automatically
- **Best for:** maximum reach with minimum manual management

### Campaign 3: Instagram Lead Ads — In-App Forms
**Objective:** Leads
```
Campaign: ADMI Instagram Lead Gen
├── Ad Set: Lookalike 1% (Audience 7) — Prospecting
│   Budget: KES 1,500/day
│   Form: "Request Prospectus" (pre-fills name/email/phone)
│
├── Ad Set: Video Viewers 50%+ (Audience 6) — Retargeting
│   Budget: KES 800/day
│   Form: "Apply Now" (pre-fills + course dropdown)
│
└── Ad Set: IG Engagers (Audience 5) — Warm
    Budget: KES 600/day
    Form: "Book an Open Day"
```

**Why Lead Ads:** Forms open inside Instagram — no redirect to website. Critical for Kenya where mobile data costs and page load times cause drop-offs. Meta pre-fills name, email, phone from the user's profile.

**Lead Ad Form Fields:**
1. Full Name (pre-filled)
2. Email (pre-filled)
3. Phone Number (pre-filled)
4. Course Interest (dropdown: Film, Sound, Design, etc.)
5. Preferred Intake (dropdown: May 2026, Sep 2026, Jan 2027)

**Webhook:** All submissions auto-pushed to Brevo via `/api/v3/webhooks/meta-lead-ads`

### Campaign 4: WhatsApp Conversation Ads
See [Section 7: WhatsApp Ads](#7-whatsapp-ads--ai-chatbot) below.

### Campaign 5: Video Views — Build Retargeting Pool
**Objective:** Video Views (ThruPlay)
- Run campus tours, student testimonials, showreel content
- Optimise for 15-second views
- Budget: KES 500-1,000/day
- **Purpose:** Builds Audience 6 (video viewers) cheaply for retargeting later

---

## 6. Instagram Lead Ads

### Webhook Endpoint

```
POST https://admi.africa/api/v3/webhooks/meta-lead-ads
```

**File:** `src/pages/api/v3/webhooks/meta-lead-ads.ts`

### How It Works

1. User submits Lead Ad form on Instagram
2. Meta sends webhook notification to the endpoint
3. Endpoint fetches full lead data from Meta Graph API
4. Parses form fields (name, email, phone, course, intake)
5. Pushes contact to Brevo with:
   - Attribution: `UTM_SOURCE=instagram`, `UTM_MEDIUM=paid_social`
   - Lead scoring: Base 10 + bonuses for course/intake/phone
   - Campaign tracking from ad metadata
   - Added to contact list ID 2

### Setup Option A: Direct Meta Webhook (Recommended)

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps/)
2. Select your app > **Webhooks** > **Add Subscription**
3. Object: **Page** > Field: **leadgen**
4. Callback URL: `https://admi.africa/api/v3/webhooks/meta-lead-ads`
5. Verify token: Set `META_WEBHOOK_VERIFY_TOKEN` env var on your server to match
6. Subscribe
7. Set `META_PAGE_ACCESS_TOKEN` to a Page Access Token with `leads_retrieval` and `pages_manage_ads` permissions

### Setup Option B: Zapier (Simpler, Costs $20/mo)

1. Zapier trigger: "New Lead in Facebook Lead Ads"
2. Zapier action: "Webhooks by Zapier" > POST
3. URL: `https://admi.africa/api/v3/webhooks/meta-lead-ads`
4. Body format:
```json
{
  "firstName": "{{first_name}}",
  "lastName": "{{last_name}}",
  "email": "{{email}}",
  "phone": "{{phone_number}}",
  "courseName": "{{course_interest}}",
  "intakePeriod": "{{preferred_intake}}",
  "source": "instagram_lead_ad",
  "formName": "{{form_name}}",
  "campaignName": "{{campaign_name}}",
  "adSetName": "{{adset_name}}"
}
```

### Lead Ad Form Configuration in Ads Manager

1. **Create Lead Form** in Ads Manager
2. Form type: **More Volume** (simpler) or **Higher Intent** (adds review step)
3. Questions:
   - Full Name (pre-fill)
   - Email (pre-fill)
   - Phone Number (pre-fill)
   - Course Interest (custom dropdown): Film & TV Production, Sound Engineering, Graphic Design, Digital Content Creation, Video Production, Digital Marketing, Photography, Multimedia, 2D Animation, Music Production, AI & Digital Transformation, Data Analytics
   - Preferred Intake (custom dropdown): May 2026, September 2026, January 2027
4. Privacy Policy: `https://admi.africa/privacy-policy`
5. Thank You screen:
   - Headline: "Thank you for your interest in ADMI!"
   - Description: "Our admissions team will contact you within 24 hours."
   - CTA: "Visit Website" > `https://admi.africa/courses`

---

## 7. WhatsApp Ads + AI Chatbot

### Overview

Run Click-to-WhatsApp ads on Instagram/Facebook that open a WhatsApp conversation with ADMI's number. An AI chatbot (powered by OpenAI with ADMI's knowledge base) handles the initial conversation, qualifies the lead, and hands off to admissions when ready.

### WhatsApp Number
- **ADMI WhatsApp:** Configured in `src/utils/whatsapp-attribution.ts` as `ADMI_WHATSAPP_NUMBER`

### Campaign Setup

**Objective:** Engagement > Messaging > WhatsApp
```
Campaign: ADMI WhatsApp Conversations
├── Ad Set: Lookalike Leads 1% (Prospecting)
│   Budget: KES 1,000-2,000/day
│   Placements: Instagram Feed, Stories, Reels
│   Message template: "Course Explorer"
│
├── Ad Set: Course Viewers No Enquiry (Retargeting)
│   Budget: KES 800/day
│   Message template: "Continue Exploring"
│
└── Ad Set: IG Engagers (Warm)
    Budget: KES 500/day
    Message template: "Ask Us Anything"
```

### Ad Creative for WhatsApp Ads

**Primary text examples:**
- "Thinking about a career in film? Chat with us on WhatsApp to learn about ADMI's Film & TV Production Diploma."
- "Have questions about ADMI? Our team is online now. Tap to chat."
- "May 2026 intake is open! Ask us about courses, fees, and scholarships on WhatsApp."

**CTA Button:** "Send WhatsApp Message"

### Message Templates (WhatsApp Business API)

Create these templates in Meta Business Manager > WhatsApp Manager:

**Template 1: Course Explorer**
```
Hi {{1}}! Thanks for your interest in ADMI.

I'm ADMI's AI assistant. I can help you with:
- Course details and curriculum
- Fees and payment plans
- Intake dates and application process
- Campus and facilities info
- Student success stories

What would you like to know about?
```

**Template 2: Continue Exploring**
```
Hi {{1}}! I noticed you were exploring our programmes.

Would you like help choosing the right course? I can:
- Recommend a programme based on your interests
- Share details about fees and scholarships
- Walk you through the application process

Just type your question!
```

**Template 3: Post-Lead Nurture**
```
Hi {{1}}! Thanks for your enquiry about {{2}} at ADMI.

Our admissions team will call you within 24 hours. In the meantime, I can answer any questions about:
- The curriculum and what you'll learn
- Career outcomes and salary expectations
- Campus life and facilities
- Payment plans and financial aid

What would you like to know?
```

### AI Chatbot Integration (OpenAI)

Your AI chatbot uses an OpenAI knowledge base to answer questions. Here's how to connect it to WhatsApp ads:

**Architecture:**
```
Instagram Ad (Click-to-WhatsApp)
        │
        ▼
WhatsApp Business API (Cloud API or BSP)
        │
        ▼
Webhook → Your Server / Cloud Function
        │
        ▼
OpenAI API (with ADMI knowledge base)
        │
        ▼
Response → WhatsApp Business API → User
        │
        ▼
When qualified → Push to Brevo CRM
```

**Knowledge Base Content (uploaded to OpenAI):**
- Course details (curriculum, duration, fees, outcomes)
- Intake dates (January, May, September)
- Accreditation info (Woolf University, Pearson BTEC, TVETA)
- Payment plans and financial aid
- Campus facilities and location
- Student testimonials and alumni outcomes
- Application process and requirements
- FAQ answers
- Fee structure per programme

**Qualification Triggers (when to push to Brevo):**
The AI bot should push to Brevo when the user provides:
1. Their name AND email or phone
2. A course preference
3. An intake they're considering

Push to Brevo using the same endpoint: `POST /api/v3/webhooks/meta-lead-ads` with:
```json
{
  "firstName": "User's Name",
  "email": "user@email.com",
  "phone": "+254712345678",
  "courseName": "Film & TV Production",
  "intakePeriod": "may-2026",
  "source": "whatsapp_ai_bot",
  "formName": "WhatsApp AI Conversation",
  "campaignName": "WhatsApp Ads Q2 2026"
}
```

**Handoff to Human:**
When the user asks to speak to someone, or the AI detects high purchase intent, send a notification to the admissions team:
- Forward the WhatsApp thread to a human agent
- The Brevo contact should already exist with conversation context in `CONVERSATION_SUMMARY`

### WhatsApp Attribution Tracking

The main site already tracks WhatsApp clicks via `trackWhatsAppClick()` in `src/utils/whatsapp-attribution.ts`. For WhatsApp ad conversations:

1. **Ad click** — Meta tracks this automatically (impression → click → conversation started)
2. **Conversation started** — WhatsApp Business API webhook notifies your server
3. **Lead qualified** — AI bot pushes to Brevo with `source: whatsapp_ai_bot`
4. **Application started** — Tracked on portal via `trackApplicationStarted()`

### Recommended WhatsApp Ad Budget

| Audience | Daily Budget | Expected CPM | Est. Conversations/Day |
|---|---|---|---|
| Lookalike 1% | KES 1,500 | KES 150-300 | 5-10 |
| Course Viewers | KES 800 | KES 100-200 | 4-8 |
| IG Engagers | KES 500 | KES 80-150 | 3-6 |
| **Total** | **KES 2,800** | | **12-24 conversations/day** |

WhatsApp ads typically have 2-5x higher engagement than link ads because the barrier is just tapping "Send Message" — no form to fill, no page to load.

---

## 8. Environment Variables

### Main Site (admi.africa)

```env
# Already configured
NEXT_PUBLIC_ADMI_GTM_ID=GTM-KPDDVWR
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxx

# Add for Meta Lead Ads webhook
META_WEBHOOK_VERIFY_TOKEN=your-random-verify-string
META_PAGE_ACCESS_TOKEN=EAAxxxxxxxx  # Page token with leads_retrieval permission
META_APP_SECRET=xxxxxxxxxxxxxxxx     # For webhook signature verification
```

### Application Portal (apply.admi.africa)

```env
NEXT_PUBLIC_GTM_ID=GTM-KPDDVWR
NEXT_PUBLIC_META_PIXEL_ID=2180607305521624
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxx
```

---

## 9. Troubleshooting

| Issue | Fix |
|---|---|
| Duplicate events in Meta | Check `event_id` deduplication — browser and server events must share same ID. Verify in Events Manager > Test Events |
| Low match rate on CAPI | Ensure sGTM forwards `_fbp`, `_fbc` cookies + `user_data` (email, phone). Check Events Manager > Data Sources > Match Quality |
| Lead Ads not arriving in Brevo | Check webhook URL is accessible. Test with `curl -X POST https://admi.africa/api/v3/webhooks/meta-lead-ads -H 'Content-Type: application/json' -d '{"email":"test@test.com","firstName":"Test"}'` |
| Catalog shows 0 items | Verify feed URL returns XML: `curl https://admi.africa/api/meta-product-feed.xml` |
| DPA not showing right courses | Verify `content_ids` in pixel match `g:id` in feed exactly |
| WhatsApp ads not tracking | WhatsApp conversation attribution is automatic in Meta — no pixel needed |
| ViewContent not in Events Manager | Check fbq stub loads before GTM. Verify with Meta Pixel Helper Chrome extension |
| sGTM not sending events | Check server container logs. Verify the Meta CAPI tag is triggered by correct dataLayer events |

---

## Quick Reference: All API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/meta-product-feed.xml` | GET | Product catalog XML feed for Meta Commerce Manager |
| `/api/v3/webhooks/meta-lead-ads` | GET/POST | Instagram Lead Ads webhook (verification + lead processing) |
| `/api/v3/push-enhanced-lead` | POST | Main enquiry form → Brevo CRM |
| `/api/v3/push-whatsapp-lead` | POST | WhatsApp lead attribution → Brevo |

## Quick Reference: All Tracking Files

| File | Purpose |
|---|---|
| `src/utils/track-event.ts` | `trackEvent()`, `trackCTAClick()`, `trackMetaEvent()` with dedup |
| `src/components/analytics/MetaPixelEvents.tsx` | `CourseViewEvent`, `EnquiryEvent`, `ApplicationStartedEvent` with CAPI dedup |
| `src/components/analytics/GoogleTagManager.tsx` | GTM container loader + fbq stub |
| `src/utils/utm-tracking.ts` | UTM capture, first/last touch attribution |
| `src/utils/whatsapp-attribution.ts` | WhatsApp click tracking + phone matching |
| `src/utils/course-pricing.ts` | Course pricing for pixel event values |
| `src/components/seo/FacebookProductMeta.tsx` | OG product meta tags per course page |
