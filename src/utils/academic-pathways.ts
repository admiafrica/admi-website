/**
 * Academic Pathways API Utility
 * Fetches and manages academic pathways content from Contentful
 */

import axiosContentfulClient from '@/utils/axiosContentfulClient'
import { AcademicPathwaysResponse, AcademicPathwaysPage } from '@/types/academic-pathways'

/**
 * Fetch Academic Pathways page by slug
 */
export async function getAcademicPathwaysBySlug(
  slug: string = 'academic-pathways'
): Promise<AcademicPathwaysPage | null> {
  try {
    const response = await axiosContentfulClient.get<AcademicPathwaysResponse>('/entries', {
      params: {
        content_type: 'academicPathways',
        'fields.slug': slug,
        include: 3
      }
    })

    if (response.data.items.length === 0) {
      return null
    }

    return response.data.items[0]
  } catch (error) {
    console.error('Error fetching academic pathways:', error)
    return null
  }
}

/**
 * Fetch all partners for a pathways page
 */
export async function getAcademicPathwaysPartners(pageSlug: string = 'academic-pathways') {
  try {
    const page = await getAcademicPathwaysBySlug(pageSlug)
    if (!page) return []

    return page.fields.partners || []
  } catch (error) {
    console.error('Error fetching academic pathways partners:', error)
    return []
  }
}

/**
 * Fetch a specific partner by ID
 */
export async function getPartnerById(partnerId: string) {
  try {
    const response = await axiosContentfulClient.get(`/entries/${partnerId}`, {
      params: {
        include: 1
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching partner:', error)
    return null
  }
}

/**
 * Get all education partners (content type: partner)
 * Returns both partners and assets for logo resolution
 */
export async function getAllPartners() {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

  try {
    const response = await axiosContentfulClient.get(`/spaces/${spaceId}/environments/${environment}/entries`, {
      params: {
        access_token: accessToken,
        content_type: '11GIFlaTgpnZEWEr6AElPr', // Partner content type ID
        limit: 100,
        include: 2
      }
    })

    return {
      items: response.data.items || [],
      assets: response.data.includes?.Asset || []
    }
  } catch (error) {
    console.error('Error fetching all partners:', error)
    return {
      items: [],
      assets: []
    }
  }
}

/**
 * Get partners by type (e.g., 'University', 'Organization')
 */
export async function getPartnersByType(type: string) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'partner',
        'fields.type': type,
        limit: 100,
        include: 1
      }
    })

    return response.data.items || []
  } catch (error) {
    console.error('Error fetching partners by type:', error)
    return []
  }
}
