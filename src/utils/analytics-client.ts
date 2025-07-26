/**
 * Analytics Client for FAQ Optimization
 *
 * This client integrates with your existing API structure to fetch analytics data
 * for FAQ optimization. It follows the same patterns as your YouTube API client.
 */

export interface FAQMetrics {
  pageViews: number
  users: number
  averageSessionDuration: number
  bounceRate: number
  conversionFunnel: {
    faqPageViews: number
    faqUsers: number
    coursePageViews: number
    courseUsers: number
    faqToCourseConversionRate: string
  }
  lastUpdated: string
}

export interface SearchQuery {
  query: string
  pagePath: string
  sessions: number
  users: number
}

export interface SearchQueriesData {
  searchQueries: SearchQuery[]
  totalQueries: number
  topKeywords: string[]
  lastUpdated: string
}

export interface OptimizationRecommendation {
  type: 'content' | 'engagement' | 'conversion'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  data?: any
}

export interface OptimizationReport {
  overallScore: number
  recommendations: OptimizationRecommendation[]
  analytics: {
    searchQueries: SearchQuery[]
    faqMetrics: any
    conversionData: any
    popularCourses: any[]
  }
  lastUpdated: string
}

class AnalyticsClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001')
  }

  /**
   * Fetch FAQ performance metrics
   */
  async getFAQMetrics(refresh = false): Promise<FAQMetrics | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analytics/faq-metrics?refresh=${refresh}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch FAQ metrics')
      }

      return data.data
    } catch (error) {
      console.error('Error fetching FAQ metrics:', error)
      return null
    }
  }

  /**
   * Fetch search queries that lead to FAQ pages
   */
  async getSearchQueries(limit = 20, refresh = false): Promise<SearchQueriesData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analytics/search-queries?limit=${limit}&refresh=${refresh}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch search queries')
      }

      return data.data
    } catch (error) {
      console.error('Error fetching search queries:', error)
      return null
    }
  }

  /**
   * Fetch comprehensive optimization report
   */
  async getOptimizationReport(): Promise<OptimizationReport | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analytics/optimization-report`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch optimization report')
      }

      return data.data
    } catch (error) {
      console.error('Error fetching optimization report:', error)
      return null
    }
  }

  /**
   * Get search query insights for FAQ content creation
   */
  async getSearchInsights(): Promise<{
    missingTopics: string[]
    trendingQuestions: string[]
    contentGaps: string[]
  } | null> {
    try {
      const searchData = await this.getSearchQueries(50)

      if (!searchData) {
        return null
      }

      // Analyze search queries for content insights
      const queries = searchData.searchQueries.map((q) => q.query.toLowerCase())

      // Extract common question patterns
      const questionPatterns = [
        'how much',
        'how long',
        'what is',
        'where is',
        'when does',
        'can i',
        'do i need',
        'is there',
        'are there',
        'requirements',
        'fees',
        'cost',
        'price',
        'salary',
        'jobs',
        'career'
      ]

      const missingTopics = questionPatterns.filter((pattern) => queries.some((query) => query.includes(pattern)))

      const trendingQuestions = queries
        .filter((query) => query.includes('?') || questionPatterns.some((p) => query.includes(p)))
        .slice(0, 10)

      // Identify content gaps based on high-volume queries
      const contentGaps = searchData.searchQueries
        .filter((q) => q.sessions > 10) // High-volume queries
        .map((q) => q.query)
        .slice(0, 8)

      return {
        missingTopics,
        trendingQuestions,
        contentGaps
      }
    } catch (error) {
      console.error('Error getting search insights:', error)
      return null
    }
  }

  /**
   * Test analytics connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const metrics = await this.getFAQMetrics()
      return metrics !== null
    } catch (error) {
      console.error('Analytics connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const analyticsClient = new AnalyticsClient()

// Export class for custom instances
export default AnalyticsClient
