import React, { useEffect, useState } from 'react'
import { CMSFAQSchema } from '@/components/shared/StructuredData'
import { ICourseFAQ, IFAQResponse } from '@/types'

interface CMSCourseFAQSchemaWrapperProps {
  courseSlug: string
  courseName: string
}

export function CMSCourseFAQSchemaWrapper({ courseSlug, courseName }: CMSCourseFAQSchemaWrapperProps) {
  const [cmsFaqs, setCmsFaqs] = useState<ICourseFAQ[]>([])

  useEffect(() => {
    const fetchCMSFAQs = async () => {
      try {
        const response = await fetch(`/api/v3/course-faqs?slug=${courseSlug}`)
        if (response.ok) {
          const data: IFAQResponse = await response.json()
          setCmsFaqs(data.items || [])
        }
      } catch (error) {
        console.error('Error fetching CMS FAQs for basic course schema:', error)
      }
    }

    if (courseSlug) {
      fetchCMSFAQs()
    }
  }, [courseSlug])

  // Only render FAQ schema if FAQs exist
  if (cmsFaqs.length === 0) {
    return null
  }

  return (
    <CMSFAQSchema faqs={cmsFaqs} courseName={`${courseName} - Course Information`} schemaId="basic-course-faq-schema" />
  )
}
