import React from 'react'
import Link from 'next/link'
import { CMSFAQSchema } from '@/components/shared/StructuredData'

// Music Production SEO boost component
// Add this to music production course page or homepage for better rankings

const MUSIC_PRODUCTION_FAQS = [
  {
    question: 'What are the best music production courses in Kenya?',
    answer:
      'ADMI offers the premier Music Production Diploma in Kenya - a comprehensive 2-year program covering music production, sound engineering, audio engineering, mixing, mastering, and music technology. Located in Nairobi with state-of-the-art recording studios and industry partnerships.'
  },
  {
    question: 'Where can I study music production in Kenya?',
    answer:
      'ADMI (Africa Digital Media Institute) in Nairobi offers the leading music production courses in Kenya. Our Music Production Diploma includes hands-on training in professional recording studios, sound engineering, and audio production with industry-standard equipment.'
  },
  {
    question: 'What is the best music production school in Kenya Nairobi?',
    answer:
      'ADMI is recognized as the best music production school in Kenya, Nairobi. We offer comprehensive music production courses, sound engineering training, and audio engineering programs with 85% employment rate and partnerships with top Kenyan studios and radio stations.'
  },
  {
    question: 'How much do music production courses cost in Kenya?',
    answer:
      "ADMI's Music Production Diploma costs KES 60,000 per semester (KES 120,000 per year). This includes access to professional recording studios, industry-standard equipment, software training, and mentorship from experienced music producers."
  },
  {
    question: 'What sound engineering courses are available in Kenya?',
    answer:
      'ADMI offers comprehensive sound engineering courses as part of our Music Production Diploma. Students learn live sound engineering, studio recording, mixing, mastering, and audio post-production with hands-on experience in professional recording facilities.'
  },
  {
    question: 'Can I get a music production certificate in Kenya?',
    answer:
      'Yes, ADMI offers both diploma and certificate options for music production in Kenya. Our programs cover music production, sound engineering, audio engineering, music technology, and music business skills needed for the Kenyan music industry.'
  },
  {
    question: 'What music schools are there in Kenya?',
    answer:
      "ADMI (Africa Digital Media Institute) is the leading music school in Kenya, offering specialized music production courses, sound engineering training, and audio production programs. We're located in Nairobi with modern recording studios and industry connections."
  },
  {
    question: 'Where can I learn music production near me in Nairobi?',
    answer:
      'ADMI in Nairobi Central Business District offers the best music production courses near you. Our campus features professional recording studios, mixing suites, and all the equipment needed for comprehensive music production training.'
  }
]

const MUSIC_PRODUCTION_CONTENT = {
  title: 'Music Production Courses in Kenya | Sound Engineering | Audio Engineering',
  description:
    'Premier music production courses in Kenya at ADMI Nairobi. Learn music production, sound engineering, audio engineering, mixing & mastering. State-of-the-art recording studios.',
  keywords: [
    'music production courses in kenya',
    'music production kenya',
    'sound engineering courses in kenya',
    'music production schools in kenya',
    'best music production school in kenya nairobi',
    'audio engineering course kenya',
    'music school in kenya'
  ]
}

interface MusicProductionSEOBoostProps {
  showContent?: boolean
}

export const MusicProductionSEOBoost: React.FC<MusicProductionSEOBoostProps> = ({ showContent = false }) => {
  return (
    <>
      {/* FAQ Schema for music production queries */}
      <CMSFAQSchema faqs={MUSIC_PRODUCTION_FAQS} />

      {/* Hidden SEO content for better keyword targeting */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>{MUSIC_PRODUCTION_CONTENT.title}</h1>
        <p>{MUSIC_PRODUCTION_CONTENT.description}</p>
        {MUSIC_PRODUCTION_CONTENT.keywords.map((keyword, index) => (
          <span key={index}>{keyword} </span>
        ))}
      </div>

      {showContent && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Music Production Courses in Kenya - FAQ</h2>
            <div className="space-y-6">
              {MUSIC_PRODUCTION_FAQS.map((faq, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-lg font-bold text-blue-600">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="mt-12 text-center">
              <h3 className="mb-4 text-2xl font-bold">Ready to Start Your Music Production Journey?</h3>
              <p className="mb-6 text-lg">
                Join ADMI&apos;s premier Music Production Diploma program in Nairobi, Kenya
              </p>
              <div className="space-x-4">
                <Link
                  href="/courses/music-production-diploma"
                  className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  View Music Production Course
                </Link>
                <Link
                  href="/student-support#fees"
                  className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
                >
                  View Fees & Apply
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default MusicProductionSEOBoost
