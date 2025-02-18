import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, courseName } = req.body;

  if (!email || !firstName || !lastName || !phone || !courseName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const API_KEY = process.env.BREVO_API_KEY as string;
  const LIST_ID = process.env.BREVO_LIST_ID as string;

  const BREVO_URL = 'https://api.brevo.com/v3/contacts';

  // NOTE: Phone must be prefixed with country code e.g. +254792111222
  const payload = {
    email: email,
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      EMAIL: email,
      SMS: phone,
      COURSE_INTERESTED_IN: courseName,
    },
    listIds: [parseInt(LIST_ID)], // Convert to integer
    updateEnabled: true,
  };

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
