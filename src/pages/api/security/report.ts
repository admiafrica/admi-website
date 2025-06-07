import type { NextApiRequest, NextApiResponse } from 'next'
import { generateSecurityReport } from '@/utils/security'

interface SecurityReportRequest {
  url: string
  type: 'spam_url' | 'suspicious_pattern' | 'bot_detection' | 'rate_limit'
  details?: string
}

interface SecurityReportResponse {
  success: boolean
  message: string
  reportId?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SecurityReportResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { url, type, details } = req.body as SecurityReportRequest

    if (!url || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: url and type'
      })
    }

    // Get request metadata
    const userAgent = req.headers['user-agent'] || ''
    const referer = req.headers.referer || ''
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''

    // Generate security report
    const report = generateSecurityReport({
      url,
      userAgent,
      referer,
      ip: Array.isArray(ip) ? ip[0] : ip
    })

    // Log security incident
    console.log('Security Report:', {
      ...report,
      type,
      details,
      userAgent,
      referer,
      ip
    })

    // In production, you might want to:
    // 1. Store in database for analysis
    // 2. Send to security monitoring service
    // 3. Alert security team for high severity incidents

    if (process.env.NODE_ENV === 'production') {
      // Example: Send to external monitoring service
      try {
        await fetch(process.env.SECURITY_WEBHOOK_URL || '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...report,
            type,
            details,
            userAgent,
            referer,
            ip,
            environment: 'production',
            site: 'admi.africa'
          })
        })
      } catch (error) {
        console.error('Failed to send security report to external service:', error)
      }
    }

    // Generate report ID for tracking
    const reportId = `SEC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return res.status(200).json({
      success: true,
      message: 'Security report logged successfully',
      reportId
    })
  } catch (error) {
    console.error('Error processing security report:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Rate limiting configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
}
