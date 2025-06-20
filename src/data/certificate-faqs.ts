// Certificate-specific FAQs for ADMI courses

export const GENERAL_CERTIFICATE_FAQS = [
  {
    question: 'What is the duration of certificate programs at ADMI?',
    answer:
      'Certificate programs at ADMI typically range from 3 to 12 months, depending on the specific course. Foundation certificates are usually 3-6 months, while Professional certificates can be 6-12 months.'
  },
  {
    question: 'What are the entry requirements for certificate courses?',
    answer:
      'Foundation certificates require basic computer literacy and secondary education. Professional certificates may require secondary education completion or relevant work experience in the field.'
  },
  {
    question: 'Are certificate programs recognized by employers?',
    answer:
      'Yes, ADMI certificate programs are industry-recognized and Pearson Assured. Our graduates are employed by leading companies across Africa including Safaricom, Nation Media Group, and Standard Group.'
  },
  {
    question: 'Can I upgrade from a certificate to a diploma program?',
    answer:
      'Yes, certificate graduates can apply for advanced standing in our diploma programs. Credits earned in certificate courses may be transferred, reducing the time needed to complete a diploma.'
  },
  {
    question: 'What learning modes are available for certificate programs?',
    answer:
      'Certificate programs are offered in flexible formats including full-time, part-time, weekend classes, and blended learning options to accommodate working professionals.'
  },
  {
    question: 'Do certificate programs include practical training?',
    answer:
      'Yes, all certificate programs include hands-on practical training with industry-standard equipment and software. Students work on real projects and build professional portfolios.'
  },
  {
    question: 'What career support is provided for certificate graduates?',
    answer:
      'Certificate graduates receive career placement assistance, portfolio development support, industry networking opportunities, and access to our job placement network.'
  },
  {
    question: 'Are there payment plans available for certificate programs?',
    answer:
      'Yes, ADMI offers flexible payment plans and installment options for certificate programs. We also provide information about scholarship opportunities and financial aid.'
  }
]

export const GRAPHIC_DESIGN_CERTIFICATE_FAQS = [
  {
    question: 'What software will I learn in the Graphic Design Certificate?',
    answer:
      'You will master industry-standard software including Adobe Creative Suite (Photoshop, Illustrator, InDesign), Figma for UI/UX design, and other professional design tools used in the industry.'
  },
  {
    question: 'Can I work as a freelance graphic designer after completing the certificate?',
    answer:
      'Yes, the certificate program prepares you for freelance work by teaching client management, project pricing, and building a professional portfolio that attracts clients.'
  },
  {
    question: 'What types of design projects will I work on?',
    answer:
      'Students work on diverse projects including logo design, branding, print materials, digital graphics, social media content, and packaging design to build a comprehensive portfolio.'
  }
]

export const DIGITAL_MARKETING_CERTIFICATE_FAQS = [
  {
    question: 'What digital marketing channels will I learn?',
    answer:
      'The program covers social media marketing, Google Ads, SEO, email marketing, content marketing, analytics, and digital strategy development for various platforms.'
  },
  {
    question: 'Will I get certified in Google and Facebook advertising?',
    answer:
      'Yes, the program prepares you for Google Ads and Facebook Blueprint certifications, which are highly valued by employers in the digital marketing industry.'
  },
  {
    question: 'Can I start my own digital marketing agency after the course?',
    answer:
      'The certificate provides the skills and knowledge needed to start your own agency, including client acquisition, campaign management, and business development strategies.'
  }
]

export const VIDEO_PRODUCTION_CERTIFICATE_FAQS = [
  {
    question: 'What equipment will I learn to use?',
    answer:
      'Students learn professional video equipment including cameras, lighting systems, audio recording equipment, and editing software like Adobe Premiere Pro and After Effects.'
  },
  {
    question: 'What types of video content will I create?',
    answer:
      'You will produce corporate videos, documentaries, commercials, social media content, music videos, and event coverage to build a diverse portfolio.'
  },
  {
    question: 'Is the certificate suitable for YouTube content creators?',
    answer:
      'Yes, the program covers content creation for digital platforms, including YouTube optimization, audience engagement, and monetization strategies.'
  }
]

export const PHOTOGRAPHY_CERTIFICATE_FAQS = [
  {
    question: 'Do I need my own camera equipment?',
    answer:
      'ADMI provides professional camera equipment for learning. However, having your own camera is beneficial for practice and building your portfolio outside class hours.'
  },
  {
    question: 'What photography specializations are covered?',
    answer:
      'The program covers portrait photography, commercial photography, event photography, product photography, and digital photo editing techniques.'
  },
  {
    question: 'Will I learn photo editing and retouching?',
    answer:
      'Yes, the certificate includes comprehensive training in Adobe Photoshop and Lightroom for professional photo editing, retouching, and color correction.'
  }
]

export const MUSIC_PRODUCTION_CERTIFICATE_FAQS = [
  {
    question: 'What music production software will I learn?',
    answer:
      'Students learn industry-standard DAWs including Pro Tools, Logic Pro, Ableton Live, and FL Studio, along with mixing and mastering techniques.'
  },
  {
    question: 'Can I record and produce my own music?',
    answer:
      'Yes, the program teaches recording techniques, music arrangement, and production skills that enable you to produce your own music professionally.'
  },
  {
    question: 'Will I learn about the music business?',
    answer:
      'The certificate includes modules on music business, copyright, royalties, and how to monetize your music production skills in the industry.'
  }
]

// Helper function to generate FAQ schema for certificates
export function generateCertificateFAQSchema(faqs: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}
