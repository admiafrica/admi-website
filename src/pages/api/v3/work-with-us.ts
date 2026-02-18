import { getPageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (mirrors current hardcoded content)
const FALLBACK_DATA = {
  faculty: [
    {
      name: 'Prof. Michael Otieno',
      title: 'Head of Film & TV',
      description:
        'Award-winning filmmaker with over 15 years of experience in East African cinema and broadcast television.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sarah Kamau',
      title: 'Lead, Digital Design',
      description:
        'Former creative director at a leading Nairobi agency, specialising in brand identity and UX for African markets.',
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'James Mwangi',
      title: 'Director, Music Production',
      description:
        'Grammy-nominated producer and sound engineer who has shaped the Kenyan music scene for over a decade.',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    }
  ],
  openings: [
    {
      title: 'Film Production Lecturer',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description:
        'Deliver practical modules across screenwriting, cinematography, and post-production workflows for diploma learners.'
    },
    {
      title: 'Motion Graphics Instructor',
      type: 'Full-time / Contract',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description:
        'Teach motion design principles using After Effects, Cinema 4D, and emerging real-time tools.'
    },
    {
      title: 'Graphic Design Instructor',
      type: 'Full-time',
      location: 'Hybrid',
      posted: 'Posted Feb 2026',
      description:
        'Guide learners through brand identity, editorial layout, and digital illustration projects.'
    },
    {
      title: 'Sound Engineering Lab Technician',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Feb 2026',
      description:
        'Maintain studio equipment, support practical sessions, and ensure lab readiness for audio production classes.'
    }
  ],
  benefits: [
    {
      icon: 'bulb',
      title: 'Creative Environment',
      description:
        'Work alongside industry professionals in state-of-the-art studios and labs.'
    },
    {
      icon: 'rocket',
      title: 'Impact-Driven',
      description: 'Shape the future of creative education across East Africa.'
    },
    {
      icon: 'briefcase',
      title: 'Professional Growth',
      description:
        'Access to industry events, workshops, and continuous learning opportunities.'
    },
    {
      icon: 'heart',
      title: 'Strong Community',
      description:
        'Join a diverse team of passionate educators and creatives.'
    }
  ],
  teamMembers: [
    {
      name: 'Angela Ndegwa',
      role: 'Director of Admissions',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'David Ochieng',
      role: 'Head of Student Affairs',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Fatima Hassan',
      role: 'HR & People Lead',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Brian Kiplagat',
      role: 'Operations Manager',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    }
  ],
  seoTitle: 'Work With Us',
  seoDescription:
    "Join ADMI's award-winning faculty and team. Explore open positions in film, design, music production, and creative education in Nairobi, Kenya.",
  seoKeywords:
    'ADMI careers, work at ADMI, creative education jobs, teaching jobs Nairobi, film lecturer, design instructor'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const entry = await getPageCached('workWithUsPage', 'page:work-with-us')

    if (!entry?.fields) {
      console.log('[Work With Us API] No CMS entry found, returning fallback')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      return res.status(200).json(FALLBACK_DATA)
    }

    const fields = entry.fields
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({
      faculty: fields.faculty || FALLBACK_DATA.faculty,
      openings: fields.openings || FALLBACK_DATA.openings,
      benefits: fields.benefits || FALLBACK_DATA.benefits,
      teamMembers: fields.teamMembers || FALLBACK_DATA.teamMembers,
      seoTitle: fields.seoTitle || FALLBACK_DATA.seoTitle,
      seoDescription: fields.seoDescription || FALLBACK_DATA.seoDescription,
      seoKeywords: fields.seoKeywords || FALLBACK_DATA.seoKeywords
    })
  } catch (error: any) {
    console.error('[Work With Us API] Error:', error.message || error)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(FALLBACK_DATA)
  }
}
