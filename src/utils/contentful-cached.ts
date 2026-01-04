/**
 * Cached Contentful API Client
 *
 * Wraps the standard Contentful client with multi-tier caching:
 * 1. In-memory cache (fastest, resets on deploy)
 * 2. S3 cache (persistent, survives deploys)
 * 3. Contentful API (source of truth)
 *
 * Reduces Contentful API calls by 95%+ while maintaining data freshness
 * Also rewrites asset URLs to S3/CloudFront to reduce bandwidth costs
 */

import { getCached, CACHE_DURATIONS, getCacheStats, checkS3Connection } from './s3-cache'
import axiosContentfulClient from './axiosContentfulClient'
import { IContentfulResponse } from '@/types'
import { resolveReferences } from '@/utils'
import { rewriteAssetUrlsInObject } from './asset-rewriter'

// Environment configuration
const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

// Check if S3 caching is enabled
const USE_S3_CACHE = process.env.ENABLE_S3_CACHE !== 'false'

/**
 * Fetch homepage data with caching
 */
export async function getHomepageCached(): Promise<any> {
  const result = await getCached(
    'homepage',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=homepage&include=10`
      )
      const data = response.data
      const courseItems = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references in the main item
      const resolvedCourses = courseItems.map((course: any) => ({
        ...course,
        fields: resolveReferences(course.fields, entries, assets),
        assets
      }))

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject(resolvedCourses)
    },
    { duration: CACHE_DURATIONS.homepage, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch all courses with caching
 */
export async function getCoursesCached(): Promise<any[]> {
  const result = await getCached(
    'courses',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&select=sys.id,fields.slug,fields.name,fields.description,fields.coverImage,fields.programType&order=sys.createdAt&include=2`
      )
      const data = response.data
      const courseItems = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references in the main item
      const resolvedCourses = courseItems.map((course: any) => ({
        ...course,
        fields: resolveReferences(course.fields, entries, assets),
        assets
      }))

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject(resolvedCourses)
    },
    { duration: CACHE_DURATIONS.courses, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch news articles with caching
 */
export async function getNewsCached(): Promise<any[]> {
  const result = await getCached(
    'news',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category[match]=News&order=-sys.createdAt&include=2`
      )
      const data = response.data
      const items = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references
      const resolvedItems = items.map((item: any) => ({
        ...item,
        fields: resolveReferences(item.fields, entries, assets),
        assets
      }))

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject(resolvedItems)
    },
    { duration: CACHE_DURATIONS.news, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch resources with caching
 */
export async function getResourcesCached(): Promise<any[]> {
  const result = await getCached(
    'resources',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt&include=2`
      )
      const data = response.data
      const items = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references
      const resolvedItems = items.map((item: any) => ({
        ...item,
        fields: resolveReferences(item.fields, entries, assets),
        assets
      }))

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject(resolvedItems)
    },
    { duration: CACHE_DURATIONS.resources, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch events with caching
 */
export async function getEventsCached(): Promise<any[]> {
  const result = await getCached(
    'events',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=event&order=-sys.createdAt&include=2`
      )
      const data = response.data
      const items = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references
      const resolvedItems = items.map((item: any) => ({
        ...item,
        fields: resolveReferences(item.fields, entries, assets),
        assets
      }))

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject(resolvedItems)
    },
    { duration: CACHE_DURATIONS.events, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch a specific course by slug with caching
 */
export async function getCourseBySulgCached(slug: string): Promise<any | null> {
  const result = await getCached(
    `course:${slug}`,
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&fields.slug=${slug}&include=10`
      )
      const data = response.data

      if (!data.items.length) {
        return null
      }

      const mainItem = data.items[0]
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Rewrite Contentful asset URLs to S3/CloudFront
      return rewriteAssetUrlsInObject({
        ...mainItem,
        fields: resolveReferences(mainItem.fields, entries, assets),
        assets
      })
    },
    { duration: CACHE_DURATIONS.courses, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Fetch FAQs with caching (longer cache since they change less frequently)
 */
export async function getFAQsCached(): Promise<any[]> {
  const result = await getCached(
    'faqs',
    async () => {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=faq&order=sys.createdAt&include=2`
      )
      const data = response.data
      return data.items
    },
    { duration: CACHE_DURATIONS.faqs, useS3: USE_S3_CACHE }
  )

  return result.data
}

/**
 * Generic cached Contentful query
 */
export async function queryCached<T>(
  cacheKey: string,
  query: string,
  options: {
    duration?: number
    useS3?: boolean
  } = {}
): Promise<T> {
  const result = await getCached(
    cacheKey,
    async () => {
      const response = await axiosContentfulClient.get<T>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&${query}`
      )
      return response.data
    },
    {
      duration: options.duration || 5 * 60 * 1000,
      useS3: options.useS3 ?? USE_S3_CACHE
    }
  )

  return result.data
}

/**
 * Health check for the caching system
 */
export async function getCacheHealth(): Promise<{
  s3Connected: boolean
  s3Enabled: boolean
  stats: ReturnType<typeof getCacheStats>
}> {
  const s3Connected = await checkS3Connection()

  return {
    s3Connected,
    s3Enabled: USE_S3_CACHE,
    stats: getCacheStats()
  }
}

// Export cache utilities for direct use
export { getCached, getCacheStats, checkS3Connection, CACHE_DURATIONS }
