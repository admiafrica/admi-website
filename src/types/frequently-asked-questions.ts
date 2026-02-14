/**
 * FAQ Page Types
 */

export interface FaqItem {
  q: string
  a: string
}

export type FaqCategory = 'General' | 'Admissions' | 'Fees & Payment' | 'Student Life' | 'Programmes'

export type FaqData = Record<FaqCategory, FaqItem[]>
