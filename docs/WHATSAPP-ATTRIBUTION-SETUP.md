# WhatsApp Lead Attribution Setup Guide

## Problem
WhatsApp leads (~250 contacts per month) arrive in Brevo with email pattern `254XXXXXXXXX@mailin-wa.com` but have NO source attribution (UTM parameters).

## Solution: Configure Brevo WhatsApp Integration

### Option 1: Configure in Brevo Dashboard (Recommended)

1. **Access Brevo Conversations/WhatsApp Settings:**
   - Go to Brevo Dashboard → Conversations → Settings
   - Find WhatsApp Business integration settings

2. **Add Default Attributes for WhatsApp Contacts:**
   - Look for "Contact Attributes" or "Default Values"
   - Set the following default values for contacts created via WhatsApp:
     ```
     UTM_SOURCE: whatsapp
     UTM_MEDIUM: messaging
     UTM_CAMPAIGN: whatsapp-organic
     REFERRER: WhatsApp Business
     PAGE: WhatsApp Chat
     ```

3. **Save and Test:**
   - Send a test message via WhatsApp
   - Check the created contact in Brevo
   - Verify all UTM attributes are set

### Option 2: API Webhook Handler (If Brevo doesn't support default attributes)

If Brevo doesn't allow setting default attributes for WhatsApp contacts, create a webhook to enrich them:

1. **Create Webhook Endpoint:** `src/pages/api/v3/brevo-webhook.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Verify webhook signature (Brevo provides this)
  const signature = req.headers['x-brevo-signature']
  // TODO: Verify signature

  const { email, event } = req.body

  // Check if this is a WhatsApp contact
  if (email && email.includes('@mailin-wa.com') && event === 'contact_created') {
    const API_KEY = process.env.BREVO_API_KEY as string
    
    // Update contact with WhatsApp attribution
    try {
      await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'api-key': API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          attributes: {
            UTM_SOURCE: 'whatsapp',
            UTM_MEDIUM: 'messaging',
            UTM_CAMPAIGN: 'whatsapp-organic',
            REFERRER: 'WhatsApp Business',
            PAGE: 'WhatsApp Chat'
          }
        })
      })

      console.log(`✅ Enriched WhatsApp contact: ${email}`)
    } catch (error) {
      console.error('Error enriching WhatsApp contact:', error)
    }
  }

  return res.status(200).json({ message: 'Webhook processed' })
}
```

2. **Register Webhook in Brevo:**
   - Go to Brevo Dashboard → Webhooks
   - Add new webhook: `https://admi.africa/api/v3/brevo-webhook`
   - Select event: `contact_created`
   - Save

### Option 3: Batch Update Existing Contacts

Run this script to retroactively fix existing WhatsApp contacts:

```bash
node scripts/analytics/fix-whatsapp-attribution.js
```

Create `scripts/analytics/fix-whatsapp-attribution.js`:

```javascript
const https = require('https')

const BREVO_API_KEY = process.env.BREVO_API_KEY

async function updateWhatsAppContacts() {
  console.log('🔍 Fetching WhatsApp contacts...')
  
  // Fetch all contacts with @mailin-wa.com email
  const contacts = [] // TODO: Fetch from Brevo API
  
  let updated = 0
  for (const contact of contacts) {
    if (contact.email.includes('@mailin-wa.com')) {
      try {
        const response = await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(contact.email)}`,
          {
            method: 'PUT',
            headers: {
              'api-key': BREVO_API_KEY,
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              attributes: {
                UTM_SOURCE: 'whatsapp',
                UTM_MEDIUM: 'messaging',
                UTM_CAMPAIGN: 'whatsapp-organic',
                REFERRER: 'WhatsApp Business',
                PAGE: 'WhatsApp Chat'
              }
            })
          }
        )
        
        if (response.ok) {
          updated++
          console.log(`✅ Updated: ${contact.email}`)
        }
      } catch (error) {
        console.error(`❌ Failed to update ${contact.email}:`, error)
      }
    }
  }
  
  console.log(`\n✅ Updated ${updated} WhatsApp contacts`)
}

updateWhatsAppContacts()
```

## Verification

After implementing any option:

1. **Test with new WhatsApp contact:**
   - Send message via WhatsApp
   - Check contact in Brevo dashboard
   - Verify `UTM_SOURCE=whatsapp, UTM_MEDIUM=messaging`

2. **Run tracking audit:**
   ```bash
   npm run ads:utm-audit
   ```
   - Check "WhatsApp leads" should now appear in sources
   - "Without UTM Tracking" count should drop significantly

3. **Run comprehensive analysis:**
   ```bash
   npm run ads:comprehensive
   ```
   - Check that ~250 WhatsApp leads are now properly attributed
   - Overall UTM coverage should increase from 45.3% to 85%+

## Expected Results

**Before:**
```
Total Contacts: 512
├─ With UTM: 232 (45.3%)
└─ Without UTM: 280 (54.7%) ← WhatsApp leads lost here
```

**After:**
```
Total Contacts: 512
├─ Google Ads: 50 (9.8%)
├─ Meta Ads: 50 (9.8%)
├─ WhatsApp: 250 (48.8%) ← NOW VISIBLE!
├─ Direct/Organic: 132 (25.8%)
└─ Untracked: 30 (5.9%)
```

## Priority

**High Priority** - WhatsApp represents ~49% of all contacts. Without attribution:
- Can't measure true channel performance
- Can't calculate CAC properly
- Missing lead quality analysis for half your leads
- Budget decisions based on incomplete data

Implement Option 1 (Brevo dashboard) first as it's easiest and handles all future contacts automatically.
