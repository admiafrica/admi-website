# WhatsApp Multi-Touch Attribution Implementation

## Overview

This document explains the WhatsApp multi-touch attribution system that tracks leads coming from WhatsApp messaging while preserving first-touch attribution data from previous website visits (e.g., Google Ads, Meta Ads).

**Key Achievement:** Enables attribution journeys like:

- User clicks Google Ad → visits website → leaves
- Same user later contacts via WhatsApp
- Result: Contact records BOTH Google (first-touch) AND WhatsApp (last-touch) attribution

## Problem This Solves

### The Lead Quality Challenge

- 39,647 website contacts with only 0.2% conversion rate (95 applications)
- Google Ads paid traffic collapsed 99.4% (267K → 1.6K sessions in 2025)
- **Root cause:** Lost visibility into conversion paths that span multiple channels

### Why WhatsApp Matters for Africa

- WhatsApp is the primary messaging platform (higher adoption than email/SMS)
- Users browse website on desktop/mobile, then message on WhatsApp from mobile
- Current system treats WhatsApp leads as "new" with no prior context
- **Business impact:** Miss the opportunity to attribute conversions back to paid ads

## Architecture

### Three-Layer Attribution System

```
Paid Ad (Google/Meta)
    ↓
Website Visit (captured by utm-tracking.ts)
    ↓ [user leaves, comes back later]
WhatsApp Message (NEW - WhatsApp lead)
    ↓
Contact Matching (whatsapp-attribution.ts)
    ↓ [if phone exists in Brevo]
Multi-Touch Recording (first-touch + last-touch)
```

### Data Flow

```
1. WhatsApp Lead Received
   {
     phone: "+254711486581",
     firstName: "John",
     email: "john@example.com"
   }
   ↓
2. Phone Normalization
   "+254711486581" → "254711486581"
   ↓
3. Contact Lookup (Brevo API)
   SELECT * FROM contacts WHERE phone LIKE "%254711486581%"
   ↓
4. Decision Point
   ├─ Contact Found → Multi-Touch Update (preserve first-touch)
   └─ No Match → New Contact (WhatsApp is both first & last)
   ↓
5. Attribution Data Stored
   Last-Touch: { utm_source: "whatsapp", utm_medium: "messaging" }
   First-Touch: { utm_source: "google", utm_medium: "cpc" } (from original visit)
```

## Implementation Details

### File: `src/utils/whatsapp-attribution.ts`

**Core Functions:**

#### 1. `normalizePhoneNumber(phone: string): string`

Standardizes phone numbers to 12-digit format (254XXXXXXXXX)

```typescript
// Input examples → Output
"+254711486581"  → "254711486581"  (strips +)
"0711486581"     → "254711486581"  (adds country code)
"254711486581"   → "254711486581"  (already normalized)
```

**Why needed:** Phone numbers come in various formats from different sources

#### 2. `createWhatsAppAttribution(): UTMData`

Creates attribution for NEW contacts with no prior website visits

```typescript
{
  utm_source: 'whatsapp',
  utm_medium: 'messaging',
  utm_campaign: 'whatsapp-organic',
  landing_page: 'WhatsApp Chat',
  referrer: 'WhatsApp Business'
}
```

#### 3. `createMultiTouchWhatsAppAttribution(existingContact): UTMData`

Creates attribution for RETURNING contacts

**Last-Touch:** Set to WhatsApp (how they converted today)
**First-Touch:** Preserved from original visit (e.g., Google Ads)

```typescript
// Example output for contact who originally came from Google Ads
{
  // How they converted TODAY (WhatsApp)
  utm_source: 'whatsapp',
  utm_medium: 'messaging',
  utm_campaign: 'whatsapp-organic',

  // How they ORIGINALLY visited (preserved)
  first_touch_source: 'google',
  first_touch_medium: 'cpc',
  first_touch_campaign: 'diploma-2026',
  first_touch_timestamp: '2025-12-15T10:30:00Z',

  // Tracking
  ga_client_id: '1234567890.9876543210'  // preserved
}
```

#### 4. `findContactByPhone(phone, apiKey): Promise<ContactMatch>`

Searches Brevo for existing contact by phone number

**Returns:**

```typescript
{
  exists: true,
  id: 12345,
  attributes: { ... existing contact data ... }
}
// OR
{
  exists: false
}
```

**Phone Matching Strategy:**

1. Receives phone in any format
2. Normalizes to 12-digit Kenya format (254XXXXXXXXX)
3. Queries Brevo's SMS field for match
4. Returns full contact record if found

#### 5. `processWhatsAppLead(contactData, apiKey): Promise<Result>`

Main orchestration function

**Logic:**

```
Input: { phone, firstName, lastName, email, courseName }
  ↓
1. Find contact by phone
  ↓
2. IF found:
     └─ Return existingContactId + multi-touch attribution
  ↓
3. IF not found:
     └─ Return "isNew: true" + new contact attribution
```

**Response:**

```typescript
{
  success: true,
  isNew: false,
  existingContactId: 12345,
  attributionData: { /* multi-touch data */ }
}
```

### File: `src/pages/api/v3/push-whatsapp-lead.ts`

**Endpoint:** `POST /api/v3/push-whatsapp-lead`

**Request Format:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+254711486581",
  "courseName": "Music Production Diploma",
  "message": "Interested in learning music production"
}
```

**Response Format - Existing Contact (Multi-Touch):**

```json
{
  "success": true,
  "isNew": false,
  "contactId": 12345,
  "message": "Contact #12345 updated with WhatsApp attribution",
  "attributionData": {
    "lastTouch": "whatsapp",
    "preserved": "first-touch data from original website visit"
  }
}
```

**Response Format - New Contact:**

```json
{
  "success": true,
  "isNew": true,
  "contactId": 12346,
  "message": "New WhatsApp contact created successfully",
  "attributionData": {
    "utm_source": "whatsapp",
    "utm_medium": "messaging",
    "utm_campaign": "whatsapp-organic"
  }
}
```

## Multi-Touch Attribution Examples

### Example 1: Returning Visitor from Google Ads

```
Timeline:
- Dec 15, 10:30 AM: User clicks Google Ad for "Music Production Diploma"
  Captured: utm_source=google, utm_medium=cpc, utm_campaign=diploma-2026
  Stored: FIRST_TOUCH_SOURCE=google, FIRST_TOUCH_MEDIUM=cpc, ...

- Dec 20, 2:45 PM: Same user messages WhatsApp
  Phone: +254711486581 (matches SMS field from earlier visit)
  Action: findContactByPhone() returns contact ID 12345
  Update: UTM_SOURCE=whatsapp, UTM_MEDIUM=messaging
          FIRST_TOUCH_SOURCE=google, FIRST_TOUCH_MEDIUM=cpc (PRESERVED)

Report View:
- Last-Touch Attribution: WhatsApp (conversion channel)
- First-Touch Attribution: Google (awareness channel)
- Journey Type: Paid → Messaging (multi-channel)
```

### Example 2: Brand New WhatsApp Contact

```
Timeline:
- Jan 5, 9:15 AM: User messages WhatsApp (no prior website visit)
  Phone: +254712345678 (not in Brevo)
  Action: findContactByPhone() returns exists=false
  Create: FIRST_TOUCH_SOURCE=whatsapp, FIRST_TOUCH_MEDIUM=messaging
          UTM_SOURCE=whatsapp, UTM_MEDIUM=messaging (both same)

Report View:
- Last-Touch Attribution: WhatsApp
- First-Touch Attribution: WhatsApp
- Journey Type: Direct WhatsApp (single-channel)
```

### Example 3: Meta Ads → Website → WhatsApp Conversion

```
Timeline:
- Jan 1: User clicks Meta Ad for "Film Diploma"
  Captured: utm_source=meta, utm_medium=cpc, utm_campaign=film-diploma

- Jan 3: Same user visits website via Instagram story
  Captured as last-touch: utm_source=instagram, utm_medium=organic

- Jan 10: User messages WhatsApp (+254787654321)
  Phone matches → Contact found with prior data
  Updated to: utm_source=whatsapp, utm_medium=messaging
              FIRST_TOUCH_SOURCE=meta (preserves original awareness point)
```

## Phone Number Matching Strategy

### Supported Formats

The system normalizes and matches these phone number formats:

```
Input Format           →  Normalized Format
+254711486581         →  254711486581
254711486581          →  254711486581
0711486581            →  254711486581  (adds 254 country code)
+254 711 486 581      →  254711486581  (strips spaces)
254-711-486-581       →  254711486581  (strips dashes)
```

### Matching Logic

1. User submits WhatsApp form with phone
2. `normalizePhoneNumber()` converts to standard format
3. `findContactByPhone()` searches Brevo's SMS field
4. If match found, all contact's prior attributes are preserved

### Why Phone-Based Matching?

- **Highest accuracy:** Phone is unique identifier in Brevo
- **Email unreliable:** Users often provide different emails in forms
- **Name insufficient:** Common names create duplicates
- **WhatsApp native:** Messaging platform uses phone as primary identifier

## Integration Points

### How Forms Call This System

**Existing form submissions (via push-enhanced-lead.ts):**

```typescript
// DOES NOT use WhatsApp matching
// Treats all submissions as new contacts
```

**New WhatsApp-specific submissions:**

```typescript
// Contact WhatsApp lead API
const response = await fetch('/api/v3/push-whatsapp-lead', {
  method: 'POST',
  body: JSON.stringify({
    firstName,
    lastName,
    email,
    phone,
    courseName
  })
})

// Returns: { success, isNew, contactId, message, attributionData }
```

### When to Use Each Endpoint

| Scenario                 | Endpoint                     | Behavior                              |
| ------------------------ | ---------------------------- | ------------------------------------- |
| User fills web form      | `/api/v3/push-enhanced-lead` | Normal flow, no phone matching        |
| User messages WhatsApp   | `/api/v3/push-whatsapp-lead` | Phone matching, preserves first-touch |
| Bot receives WhatsApp DM | `/api/v3/push-whatsapp-lead` | Multi-touch matching                  |
| Email signup             | `/api/v3/push-enhanced-lead` | Normal flow                           |

## Data Preservation

### What Gets Preserved (First-Touch)

When a contact is found and matched via WhatsApp:

✅ **PRESERVED:**

- `FIRST_TOUCH_SOURCE` (e.g., "google")
- `FIRST_TOUCH_MEDIUM` (e.g., "cpc")
- `FIRST_TOUCH_CAMPAIGN` (e.g., "diploma-2026")
- `FIRST_TOUCH_CONTENT` (e.g., "ad-variant-a")
- `FIRST_TOUCH_TIMESTAMP` (e.g., "2025-12-15T10:30:00Z")
- `GA_CLIENT_ID` (for Google Ads enhanced conversions)
- `LANDING_PAGE` (original website entry point)

❌ **UPDATED (Last-Touch):**

- `UTM_SOURCE` → "whatsapp"
- `UTM_MEDIUM` → "messaging"
- `UTM_CAMPAIGN` → "whatsapp-organic"
- `REFERRER` → "WhatsApp Business"

## Monitoring & Analytics

### Key Metrics to Track

```bash
# Monitor WhatsApp lead volume
- Daily WhatsApp submissions
- Multi-touch (existing contact) rate: should be 30-50%
- New contact rate: should be 50-70%

# Track attribution accuracy
- First-touch preservation rate: should be 100% for found contacts
- Phone match success rate: should be 80%+
- Data contamination: should be 0%

# Conversion metrics
- WhatsApp leads to applications: current conversion rate
- Multi-touch attribution ROI: comparing first-touch vs last-touch conversions
```

### Queries to Monitor

```sql
-- Count WhatsApp leads
SELECT COUNT(*) FROM contacts
WHERE UTM_SOURCE = 'whatsapp'
  AND UTM_MEDIUM = 'messaging';

-- Count multi-touch (has both WhatsApp last and Google first)
SELECT COUNT(*) FROM contacts
WHERE UTM_SOURCE = 'whatsapp'
  AND FIRST_TOUCH_SOURCE = 'google'
  AND FIRST_TOUCH_TIMESTAMP IS NOT NULL;

-- Identify unmatched WhatsApp leads
SELECT id, SMS, FIRST_TOUCH_SOURCE FROM contacts
WHERE UTM_SOURCE = 'whatsapp'
  AND FIRST_TOUCH_SOURCE IS NULL
  AND FIRST_TOUCH_TIMESTAMP IS NULL;
```

## Error Handling

### What Happens If...

**Phone number is invalid?**

```
Response: 400 Bad Request
Message: "Invalid phone number format"
Action: User prompted to resubmit with valid number
```

**Brevo API is down?**

```
Response: 500 Server Error
Message: "CRM configuration error" or "Error creating contact in CRM"
Action: Log error, user sees "Please try again later"
```

**Phone matches multiple contacts?**

```
Response: Returns first match
Action: Consider implementing deduplication process
Risk: Low (rare scenario due to unique phone structure)
```

**Contact exists but SMS field is empty?**

```
Response: Treated as "new contact"
Action: Creates duplicate (acceptable trade-off for data quality)
Fix: Implement background job to merge duplicates
```

## Deployment Checklist

- [ ] `src/utils/whatsapp-attribution.ts` created
- [ ] `src/pages/api/v3/push-whatsapp-lead.ts` created
- [ ] Test endpoint with curl/Postman
- [ ] Verify phone matching works with real Brevo data
- [ ] Monitor first-touch preservation rate
- [ ] Document WhatsApp number: `+254711486581`
- [ ] Alert team on WhatsApp lead volume metrics
- [ ] Update contact quality dashboard

## Testing

### Manual Test: New Contact

```bash
curl -X POST http://localhost:3000/api/v3/push-whatsapp-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+254999888777",
    "courseName": "Music Production Diploma"
  }'
```

Expected: Contact created with WhatsApp attribution

### Manual Test: Existing Contact

```bash
# First, get a real phone number from your Brevo contacts
# Then submit WhatsApp form with that phone

curl -X POST http://localhost:3000/api/v3/push-whatsapp-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+254711486581",
    "courseName": "Film Production Diploma"
  }'
```

Expected: Existing contact updated with WhatsApp as last-touch, prior attribution preserved

## Next Steps

1. **Integration:** Connect WhatsApp chatbot/messaging system to this endpoint
2. **Testing:** Validate multi-touch attribution with real contacts
3. **Monitoring:** Set up alerts for phone matching failure rate
4. **Optimization:** Implement batch contact matching for high-volume scenarios
5. **Deduplication:** Create background job to merge duplicate contacts created before matching implemented
