// Define TypeScript interfaces for Contentful data
export interface IContentfulSys {
  id: string
  type: string
  linkType?: string
}

export interface IContentfulLink {
  sys: IContentfulSys
}

export interface IContentfulAsset {
  sys: IContentfulSys
  fields: {
    title: string
    file: {
      url: string
      contentType: string
      details: { size: number }
    }
  }
}

export interface IContentfulEntry {
  sys: IContentfulSys
  fields: Record<string, any>
  assets?: IContentfulAsset[]
}

export interface IContentfulResponse {
  items: IContentfulEntry[]
  includes?: {
    Asset?: IContentfulAsset[]
    Entry?: IContentfulEntry[]
  }
}

// FAQ-specific interfaces
export interface ICourseFAQ {
  sys: IContentfulSys
  fields: {
    question: string
    answer: string
    category: string
    course?: IContentfulLink
    displayOrder?: number
  }
}

export interface IFAQResponse {
  items: ICourseFAQ[]
  total: number
}
