import React from 'react'
import Script from 'next/script'

interface CourseIntakeEventSchemaProps {
  courseName?: string
  courseType?: 'diploma' | 'certificate'
  targetIntake?: 'january' | 'may' | 'september' | 'all'
}

export function CourseIntakeEventSchema({
  courseName,
  courseType,
  targetIntake = 'all'
}: CourseIntakeEventSchemaProps) {
  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  // Generate intake dates for current and next year
  const generateIntakeDates = (year: number) => ({
    january: {
      registrationStart: `${year - 1}-10-01`,
      registrationEnd: `${year}-01-10`,
      orientationStart: `${year}-01-15`,
      orientationEnd: `${year}-01-19`,
      classesStart: `${year}-01-22`,
      classesEnd: courseType === 'diploma' ? `${year + 2}-01-15` : `${year + 1}-01-15`
    },
    may: {
      registrationStart: `${year}-02-01`,
      registrationEnd: `${year}-05-05`,
      orientationStart: `${year}-05-13`,
      orientationEnd: `${year}-05-17`,
      classesStart: `${year}-05-20`,
      classesEnd: courseType === 'diploma' ? `${year + 2}-05-15` : `${year + 1}-05-15`
    },
    september: {
      registrationStart: `${year}-06-01`,
      registrationEnd: `${year}-09-05`,
      orientationStart: `${year}-09-09`,
      orientationEnd: `${year}-09-13`,
      classesStart: `${year}-09-16`,
      classesEnd: courseType === 'diploma' ? `${year + 2}-09-15` : `${year + 1}-09-15`
    }
  })

  const currentYearDates = generateIntakeDates(currentYear)
  const nextYearDates = generateIntakeDates(nextYear)

  // Create events for each intake
  const createIntakeEvents = (intake: string, dates: any, year: number) => {
    const intakeTitle = `${intake.charAt(0).toUpperCase() + intake.slice(1)} ${year} Intake`
    const courseTitle = courseName || 'Creative Media and Technology Programs'

    return [
      // Registration Period Event
      {
        '@type': 'EducationEvent',
        '@id': `https://admi.africa/intakes/${intake}-${year}-registration`,
        name: `${intakeTitle} - Registration Open`,
        description: `Registration period for ${courseTitle} at Africa Digital Media Institute. Apply now for our ${intake} ${year} intake.`,
        startDate: dates.registrationStart,
        endDate: dates.registrationEnd,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: [
          {
            '@type': 'Place',
            name: 'Africa Digital Media Institute',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
              postOfficeBoxNumber: 'P.O. Box 35447',
              addressLocality: 'Nairobi',
              addressRegion: 'Nairobi County',
              postalCode: '00100',
              addressCountry: 'KE'
            }
          },
          {
            '@type': 'VirtualLocation',
            name: 'Online Application Portal',
            url: 'https://admi.africa/enquiry'
          }
        ],
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa',
          telephone: '+254 772 913 811',
          email: 'admissions@admi.africa'
        },
        offers: {
          '@type': 'Offer',
          name: 'Course Registration',
          description: `Registration for ${courseTitle}`,
          price: '0',
          priceCurrency: 'KES',
          availability: 'https://schema.org/InStock',
          url: 'https://admi.africa/enquiry',
          validFrom: dates.registrationStart,
          validThrough: dates.registrationEnd
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'Prospective Students'
        },
        educationLevel: courseType === 'diploma' ? 'Diploma' : 'Certificate',
        teaches: courseName || 'Creative Media and Technology',
        inLanguage: 'en-KE'
      },
      // Orientation Week Event
      {
        '@type': 'EducationEvent',
        '@id': `https://admi.africa/intakes/${intake}-${year}-orientation`,
        name: `${intakeTitle} - Orientation Week`,
        description: `Orientation week for new students joining ${courseTitle} at ADMI. Meet your instructors, tour facilities, and prepare for your creative journey.`,
        startDate: dates.orientationStart,
        endDate: dates.orientationEnd,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Africa Digital Media Institute Campus',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
            postOfficeBoxNumber: 'P.O. Box 35447',
            addressLocality: 'Nairobi',
            addressRegion: 'Nairobi County',
            postalCode: '00100',
            addressCountry: 'KE'
          }
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'New Students'
        },
        educationLevel: courseType === 'diploma' ? 'Diploma' : 'Certificate',
        teaches: courseName || 'Creative Media and Technology',
        inLanguage: 'en-KE'
      },
      // Academic Program Event
      {
        '@type': 'EducationEvent',
        '@id': `https://admi.africa/intakes/${intake}-${year}-program`,
        name: `${courseTitle} - ${intakeTitle}`,
        description: `${courseType === 'diploma' ? '2-year diploma' : '6-month certificate'} program in ${courseName || 'creative media and technology'} starting ${intake} ${year}. Hands-on training with industry-standard equipment and expert instructors.`,
        startDate: dates.classesStart,
        endDate: dates.classesEnd,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Africa Digital Media Institute',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
            postOfficeBoxNumber: 'P.O. Box 35447',
            addressLocality: 'Nairobi',
            addressRegion: 'Nairobi County',
            postalCode: '00100',
            addressCountry: 'KE'
          }
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        },
        offers: {
          '@type': 'Offer',
          name: `${courseTitle} Tuition`,
          description: `Full tuition for ${courseType === 'diploma' ? '2-year diploma' : '6-month certificate'} program`,
          price: courseType === 'diploma' ? '150000' : '75000',
          priceCurrency: 'KES',
          availability: 'https://schema.org/InStock',
          url: 'https://admi.africa/enquiry',
          validFrom: dates.registrationStart,
          validThrough: dates.registrationEnd
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student'
        },
        educationLevel: courseType === 'diploma' ? 'Diploma' : 'Certificate',
        teaches: courseName || 'Creative Media and Technology',
        inLanguage: 'en-KE',
        duration: courseType === 'diploma' ? 'P2Y' : 'P6M',
        courseMode: 'blended'
      }
    ]
  }

  // Generate events based on targetIntake
  const generateEvents = () => {
    const events: any[] = []

    if (targetIntake === 'all' || targetIntake === 'january') {
      events.push(...createIntakeEvents('january', currentYearDates.january, currentYear))
      events.push(...createIntakeEvents('january', nextYearDates.january, nextYear))
    }

    if (targetIntake === 'all' || targetIntake === 'may') {
      events.push(...createIntakeEvents('may', currentYearDates.may, currentYear))
      events.push(...createIntakeEvents('may', nextYearDates.may, nextYear))
    }

    if (targetIntake === 'all' || targetIntake === 'september') {
      events.push(...createIntakeEvents('september', currentYearDates.september, currentYear))
      events.push(...createIntakeEvents('september', nextYearDates.september, nextYear))
    }

    return events
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ADMI Course Intake Events',
    description: 'Educational events for course intakes at Africa Digital Media Institute',
    itemListElement: generateEvents().map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: event
    }))
  }

  return (
    <Script
      id={`course-intake-events-${targetIntake}-${courseName?.replace(/\s+/g, '-').toLowerCase() || 'all'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
