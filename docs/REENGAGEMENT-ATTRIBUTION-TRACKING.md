# Re-engagement Attribution Tracking

## Overview

This system tracks when existing contacts return to the website and captures their GA_CLIENT_ID to backfill attribution data. This solves the problem of contacts created before the GA_CLIENT_ID tracking was implemented.

## Why This Matters

- **GA_CLIENT_ID** is extracted from the visitor's browser cookie (`_ga`) at the moment they interact
- Once that moment passes, we don't have access to their browser anymore
- For historical contacts, the data wasn't captured at the time of their original conversation
- **Solution**: When these contacts return, capture their GA_CLIENT_ID and update their record

## Components

### 1. Brevo Fields Setup

**Script**: `scripts/setup-brevo-reengagement-fields.js`

Creates these contact attributes in Brevo:
- `NEEDS_ATTRIBUTION_UPDATE` (boolean) - Flag for contacts missing GA_CLIENT_ID
- `REENGAGEMENT_DATE` (date) - When contact re-engaged with website
- `REENGAGEMENT_SOURCE` (text) - How they re-engaged (chat, form, etc.)
- `ATTRIBUTION_UPDATED` (boolean) - Whether attribution has been backfilled
- `ORIGINAL_CONTACT_DATE` (date) - When contact was originally created

```bash
npm run setup:reengagement-fields
# or
node scripts/setup-brevo-reengagement-fields.js
```

### 2. Flag Historical Contacts

**Script**: `scripts/flag-contacts-needing-attribution.js`

Identifies contacts without valid GA_CLIENT_ID and flags them.

```bash
# Preview what will be flagged
node scripts/flag-contacts-needing-attribution.js --dry-run

# Flag all contacts without GA_CLIENT_ID
node scripts/flag-contacts-needing-attribution.js

# Only flag contacts from a specific campaign period
node scripts/flag-contacts-needing-attribution.js --since=2025-11-29

# Limit processing for testing
node scripts/flag-contacts-needing-attribution.js --limit=100
```

### 3. API Endpoint

**File**: `src/pages/api/v3/track-reengagement.ts`

Receives re-engagement data when contacts interact:

```typescript
POST /api/v3/track-reengagement
{
  "email": "user@example.com",
  "ga_client_id": "1234567890.9876543210",
  "reengagement_source": "chat",
  "utm_source": "google",
  "utm_medium": "cpc"
}
```

### 4. Client-Side Utility

**File**: `src/utils/reengagement-tracking.ts`

Client-side functions to integrate with chat widget/forms:

```typescript
import { 
  trackReengagement, 
  checkAndTrackReengagement,
  onChatWidgetInteraction,
  storeEmail 
} from '@/utils/reengagement-tracking'

// When chat widget opens and you know the email
onChatWidgetInteraction('user@example.com')

// When chat opens but email unknown (checks stored email)
checkAndTrackReengagement('chat')

// Manual tracking
trackReengagement({
  email: 'user@example.com',
  source: 'form'
})

// Store email for future re-engagement tracking
storeEmail('user@example.com')
```

## Integration Guide

### Chat Widget Integration

If you're using Brevo Conversations or another chat widget:

```typescript
// In your chat widget initialization
import { onChatWidgetInteraction } from '@/utils/reengagement-tracking'

// When chat opens
chatWidget.on('open', () => {
  onChatWidgetInteraction()  // Tracks if email is stored
})

// When user provides email in chat
chatWidget.on('userIdentified', (email) => {
  onChatWidgetInteraction(email)
})
```

### Form Integration

For existing form submissions:

```typescript
import { onFormSubmission, storeEmail } from '@/utils/reengagement-tracking'

// In your form submission handler
const handleSubmit = async (formData) => {
  // Store email for future tracking
  storeEmail(formData.email)
  
  // Track re-engagement (in case they're a returning contact)
  onFormSubmission(formData.email)
  
  // Continue with normal form submission...
}
```

### WhatsApp Integration

For WhatsApp leads returning to the website:

```typescript
import { trackReengagement } from '@/utils/reengagement-tracking'

// When WhatsApp lead visits website with known phone
trackReengagement({
  phone: '+254712345678',
  source: 'whatsapp'
})
```

## Workflow

```
┌──────────────────────────────────────────────────────────────┐
│  1. INITIAL SETUP                                            │
├──────────────────────────────────────────────────────────────┤
│  Run: node scripts/setup-brevo-reengagement-fields.js        │
│  Creates: NEEDS_ATTRIBUTION_UPDATE, REENGAGEMENT_DATE, etc.  │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  2. FLAG HISTORICAL CONTACTS                                 │
├──────────────────────────────────────────────────────────────┤
│  Run: node scripts/flag-contacts-needing-attribution.js      │
│  Sets: NEEDS_ATTRIBUTION_UPDATE = true for contacts          │
│        without valid GA_CLIENT_ID                            │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  3. DEPLOY RE-ENGAGEMENT TRACKING                            │
├──────────────────────────────────────────────────────────────┤
│  Deploy to staging → main                                    │
│  Files:                                                      │
│  - src/pages/api/v3/track-reengagement.ts                    │
│  - src/utils/reengagement-tracking.ts                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  4. CONTACT RETURNS TO WEBSITE                               │
├──────────────────────────────────────────────────────────────┤
│  → Opens chat widget / submits form / views page             │
│  → Client captures GA_CLIENT_ID from _ga cookie              │
│  → Sends to /api/v3/track-reengagement                       │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  5. ATTRIBUTION UPDATED                                      │
├──────────────────────────────────────────────────────────────┤
│  Brevo contact updated with:                                 │
│  - GA_CLIENT_ID: 1234567890.9876543210                       │
│  - ATTRIBUTION_UPDATED: true                                 │
│  - REENGAGEMENT_DATE: 2026-01-22T10:30:00Z                   │
│  - REENGAGEMENT_SOURCE: chat                                 │
└──────────────────────────────────────────────────────────────┘
```

## Monitoring

### Check Re-engagement Stats

```bash
# Get contacts that have been successfully re-engaged
curl -X GET 'https://api.brevo.com/v3/contacts?limit=100' \
  -H "api-key: $BREVO_API_KEY" | \
  jq '[.contacts[] | select(.attributes.ATTRIBUTION_UPDATED == true)] | length'

# Get contacts still needing re-engagement
curl -X GET 'https://api.brevo.com/v3/contacts?limit=100' \
  -H "api-key: $BREVO_API_KEY" | \
  jq '[.contacts[] | select(.attributes.NEEDS_ATTRIBUTION_UPDATE == true)] | length'
```

### Debug in Browser

In development mode, open browser console:

```javascript
// Check current re-engagement state
window.debugReengagement()
```

## Limitations

1. **Requires Return Visit**: Contact must return to website for tracking to work
2. **Browser Dependency**: GA_CLIENT_ID only available in browser with Google Analytics loaded
3. **Cookie Lifespan**: If user clears cookies, GA_CLIENT_ID will be different
4. **Cross-Device**: Won't work if user returns on different device

## Best Practices

1. **Run flag script periodically**: New contacts without GA_CLIENT_ID will be created
2. **Integrate early**: Add re-engagement tracking to all interaction points
3. **Store emails proactively**: When a user provides email, store it for future tracking
4. **Monitor success rate**: Track how many contacts get their attribution updated

## Related Documentation

- [Attribution Flow Diagram](./ATTRIBUTION-FLOW-DIAGRAM.md)
- [Enhanced Conversion Tracking Setup](./ENHANCED-CONVERSION-TRACKING-SETUP.md)
- [WhatsApp Multi-Touch Attribution](./WHATSAPP-MULTITOCH-ATTRIBUTION.md)
