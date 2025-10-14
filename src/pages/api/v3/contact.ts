import type { NextApiRequest, NextApiResponse } from 'next'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content
  }: ContactFormData = req.body

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const API_KEY = process.env.BREVO_API_KEY as string

  if (!API_KEY) {
    console.error('Missing Brevo API key')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    // Send email using Brevo SMTP API
    const emailPayload = {
      sender: {
        name: 'ADMI Website Contact Form',
        email: 'noreply@admi.africa'
      },
      to: [
        {
          email: 'info@admi.africa',
          name: 'ADMI Info'
        }
      ],
      replyTo: {
        email: email,
        name: `${firstName} ${lastName}`
      },
      subject: `Contact Form: ${subject}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #002A23; padding: 20px; text-align: center;">
            <h1 style="color: #F1FE37; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #002A23; border-bottom: 2px solid #01C6A5; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; background-color: #fff; border: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px; background-color: #fff; border: 1px solid #ddd;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd;">${email}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 10px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; background-color: #fff; border: 1px solid #ddd;">${phone}</td>
              </tr>
              `
                  : ''
              }
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
                <td style="padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd;">${subject}</td>
              </tr>
            </table>

            <h3 style="color: #002A23; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap;">${message}</div>

            ${
              utm_source || utm_medium || utm_campaign
                ? `
            <h3 style="color: #002A23; margin-top: 30px; margin-bottom: 10px;">Tracking Information:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${
                utm_source
                  ? `
              <tr>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd; font-weight: bold; width: 30%;">Source:</td>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd;">${utm_source}</td>
              </tr>
              `
                  : ''
              }
              ${
                utm_medium
                  ? `
              <tr>
                <td style="padding: 8px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">Medium:</td>
                <td style="padding: 8px; background-color: #f5f5f5; border: 1px solid #ddd;">${utm_medium}</td>
              </tr>
              `
                  : ''
              }
              ${
                utm_campaign
                  ? `
              <tr>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">Campaign:</td>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd;">${utm_campaign}</td>
              </tr>
              `
                  : ''
              }
              ${
                utm_term
                  ? `
              <tr>
                <td style="padding: 8px; background-color: #f5f5f5; border: 1px solid #ddd; font-weight: bold;">Term:</td>
                <td style="padding: 8px; background-color: #f5f5f5; border: 1px solid #ddd;">${utm_term}</td>
              </tr>
              `
                  : ''
              }
              ${
                utm_content
                  ? `
              <tr>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd; font-weight: bold;">Content:</td>
                <td style="padding: 8px; background-color: #fff; border: 1px solid #ddd;">${utm_content}</td>
              </tr>
              `
                  : ''
              }
            </table>
            `
                : ''
            }
          </div>
          
          <div style="background-color: #002A23; padding: 15px; text-align: center;">
            <p style="color: #01C6A5; margin: 0; font-size: 14px;">
              This message was sent from the ADMI website contact form.
            </p>
          </div>
        </div>
      `,
      textContent: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

${
  utm_source || utm_medium || utm_campaign
    ? `
Tracking Information:
${utm_source ? `Source: ${utm_source}` : ''}
${utm_medium ? `Medium: ${utm_medium}` : ''}
${utm_campaign ? `Campaign: ${utm_campaign}` : ''}
${utm_term ? `Term: ${utm_term}` : ''}
${utm_content ? `Content: ${utm_content}` : ''}
`
    : ''
}

This message was sent from the ADMI website contact form.
      `
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify(emailPayload)
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        console.error('Error parsing Brevo API response:', e)
        errorData = { message: 'Unknown error from Brevo API' }
      }

      console.error('Brevo API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })

      return res.status(500).json({ error: 'Failed to send email' })
    }

    const responseData = await response.json()
    console.log('Email sent successfully:', responseData)

    return res.status(200).json({
      message: 'Contact form submitted successfully',
      messageId: responseData.messageId
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
