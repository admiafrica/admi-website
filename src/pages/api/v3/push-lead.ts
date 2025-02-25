import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    isCampaign,
    firstName,
    lastName,
    email,
    phone,
    courseName,
    utm_source = '',
    utm_medium = '',
    utm_campaign = '',
    utm_term = '',
    utm_content = '',
  } = req.body;

  if (!email || !firstName || !lastName || !phone || !courseName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const API_KEY = process.env.BREVO_API_KEY as string;
  const LIST_ID = process.env.BREVO_LIST_ID as string;

  const BREVO_URL = 'https://api.brevo.com/v3/contacts';

  const payload: any = {
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      EMAIL: email,
      SMS: phone,
      PREFERRED_COURSE: courseName,
    },
    listIds: [parseInt(LIST_ID)],
    updateEnabled: true,
  };

  // Conditionally add UTM parameters if isCampaign is true
  if (isCampaign) {
    payload.attributes.UTM_SOURCE = utm_source;
    payload.attributes.UTM_MEDIUM = utm_medium;
    payload.attributes.UTM_CAMPAIGN = utm_campaign;
    payload.attributes.UTM_TERM = utm_term;
    payload.attributes.UTM_CONTENT = utm_content;
  }

  try {
    const response = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    return res.status(201).json({ message: 'Lead added successfully' });
  } catch (error) {
    console.error('Brevo API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
