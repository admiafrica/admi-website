import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * POST /api/v3/webhooks/meta-lead-ads
 *
 * Receives Instagram / Facebook Lead Ad form submissions from Meta
 * and pushes them into Brevo CRM as new contacts.
 *
 * Setup in Meta Business Manager:
 * 1. Go to Leads Center > CRM Setup > Connect CRM
 * 2. Choose "Connect through Webhooks (Zapier)"
 *    OR use the Meta Marketing API to subscribe to leadgen events
 * 3. Webhook URL: https://admi.africa/api/v3/webhooks/meta-lead-ads
 *
 * For direct Meta webhook integration (recommended over Zapier):
 * 1. In Meta App Dashboard > Webhooks > Subscribe to "leadgen" events
 * 2. Set callback URL to this endpoint
 * 3. Meta sends a verification GET request first (handled below)
 * 4. Then POSTs lead data when forms are submitted
 *
 * @see https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY || ''
const META_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || ''
const META_APP_SECRET = process.env.META_APP_SECRET || ''
const META_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ─── Meta Webhook Verification (GET) ───
  if (req.method === 'GET') {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      console.log('[Meta Webhook] Verification successful')
      return res.status(200).send(challenge)
    }
    return res.status(403).json({ error: 'Verification failed' })
  }

  // ─── Lead Ad Submission (POST) ───
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const body = req.body

    // Meta sends leadgen webhook notifications in this format:
    // { entry: [{ id: pageId, changes: [{ field: 'leadgen', value: { leadgen_id, form_id, ... } }] }] }
    if (body.entry) {
      // This is a real-time webhook from Meta — we need to fetch the actual lead data
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          if (change.field === 'leadgen') {
            const leadgenId = change.value?.leadgen_id
            if (leadgenId) {
              await processMetaLeadById(leadgenId)
            }
          }
        }
      }
      return res.status(200).json({ status: 'ok' })
    }

    // Direct lead data format (from Zapier or manual integration)
    // Expected: { firstName, lastName, email, phone, courseName, intakePeriod, source }
    if (body.email) {
      await pushLeadToBrevo({
        firstName: body.firstName || body.first_name || '',
        lastName: body.lastName || body.last_name || '',
        email: body.email,
        phone: body.phone || body.phone_number || '',
        courseName: body.courseName || body.course_name || '',
        intakePeriod: body.intakePeriod || body.intake_period || '',
        source: body.source || 'instagram_lead_ad',
        formName: body.formName || body.form_name || 'Instagram Lead Ad',
        adId: body.adId || body.ad_id || '',
        adSetName: body.adSetName || body.adset_name || '',
        campaignName: body.campaignName || body.campaign_name || '',
      })
      return res.status(200).json({ status: 'ok', message: 'Lead pushed to Brevo' })
    }

    return res.status(400).json({ error: 'Unrecognised payload format' })
  } catch (error) {
    console.error('[Meta Lead Ads Webhook] Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Fetch lead data from Meta Graph API by leadgen_id and push to Brevo.
 * Used when receiving real-time webhook notifications.
 */
async function processMetaLeadById(leadgenId: string) {
  if (!META_ACCESS_TOKEN) {
    console.error('[Meta Lead Ads] META_PAGE_ACCESS_TOKEN not configured')
    return
  }

  try {
    // Fetch the lead data from Meta Graph API
    const leadRes = await fetch(
      `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${META_ACCESS_TOKEN}`
    )

    if (!leadRes.ok) {
      console.error('[Meta Lead Ads] Failed to fetch lead:', await leadRes.text())
      return
    }

    const leadData = await leadRes.json()

    // Parse field_data array into a key-value map
    const fields: Record<string, string> = {}
    for (const field of leadData.field_data || []) {
      fields[field.name?.toLowerCase()] = Array.isArray(field.values) ? field.values[0] : field.values
    }

    // Also fetch the form to get its name
    let formName = 'Instagram Lead Ad'
    if (leadData.form_id) {
      try {
        const formRes = await fetch(
          `https://graph.facebook.com/v19.0/${leadData.form_id}?fields=name&access_token=${META_ACCESS_TOKEN}`
        )
        if (formRes.ok) {
          const formData = await formRes.json()
          formName = formData.name || formName
        }
      } catch {
        // Non-critical
      }
    }

    await pushLeadToBrevo({
      firstName: fields.first_name || fields.full_name?.split(' ')[0] || '',
      lastName: fields.last_name || fields.full_name?.split(' ').slice(1).join(' ') || '',
      email: fields.email || '',
      phone: fields.phone_number || fields.phone || '',
      courseName: fields.course || fields.programme || fields.course_name || '',
      intakePeriod: fields.intake || fields.intake_period || '',
      source: 'instagram_lead_ad',
      formName,
      adId: leadData.ad_id || '',
      adSetName: leadData.adset_name || '',
      campaignName: leadData.campaign_name || '',
    })
  } catch (error) {
    console.error('[Meta Lead Ads] processMetaLeadById failed:', error)
  }
}

interface LeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  courseName: string
  intakePeriod: string
  source: string
  formName: string
  adId: string
  adSetName: string
  campaignName: string
}

/**
 * Push a lead to Brevo CRM with Instagram Lead Ad attribution.
 */
async function pushLeadToBrevo(lead: LeadData) {
  if (!BREVO_API_KEY) {
    console.error('[Meta Lead Ads] BREVO_API_KEY not configured')
    return
  }

  if (!lead.email) {
    console.warn('[Meta Lead Ads] Skipping lead with no email')
    return
  }

  // Determine lead score based on available data
  let leadScore = 10 // Base score for lead ad submissions (showed intent by clicking ad)
  if (lead.courseName) leadScore += 3
  if (lead.intakePeriod) leadScore += 3
  if (lead.phone) leadScore += 2

  let leadCategory = 'Warm Lead'
  let leadPriority = 'Medium'
  if (leadScore >= 15) {
    leadCategory = 'Hot Lead'
    leadPriority = 'High'
  }

  const contactPayload = {
    email: lead.email.trim(),
    attributes: {
      FIRSTNAME: lead.firstName.trim(),
      LASTNAME: lead.lastName.trim(),
      SMS: lead.phone.trim(),
      PREFERRED_COURSE: lead.courseName || '',
      COURSE_INTERESTED_IN: lead.courseName || '',
      INTAKE_PERIOD: lead.intakePeriod || '',
      QUALIFICATION_SCORE: leadScore,
      SCORE: leadScore,
      QUALIFICATION_STATUS: leadCategory,
      LEAD_STATUS: leadPriority,
      UTM_SOURCE: 'instagram',
      UTM_MEDIUM: 'paid_social',
      UTM_CAMPAIGN: lead.campaignName || 'lead_ad',
      UTM_CONTENT: lead.adSetName || '',
      FIRST_TOUCH_SOURCE: 'instagram',
      FIRST_TOUCH_MEDIUM: 'paid_social',
      FIRST_TOUCH_CAMPAIGN: lead.campaignName || 'lead_ad',
      CONVERSATION_SUMMARY: `Source: ${lead.formName} | Ad: ${lead.adSetName || 'N/A'} | Campaign: ${lead.campaignName || 'N/A'} | Course: ${lead.courseName || 'Not specified'} | Intake: ${lead.intakePeriod || 'Not specified'}`,
    },
    listIds: [2],
    updateEnabled: true,
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[Meta Lead Ads] Brevo contact creation failed:', errorData)
    } else {
      console.log(`[Meta Lead Ads] Lead pushed to Brevo: ${lead.email}`)
    }
  } catch (error) {
    console.error('[Meta Lead Ads] Brevo push failed:', error)
  }
}
