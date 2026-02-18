/**
 * Student Showcase Page Types
 */

export interface FeaturedProject {
  title: string
  student: string
  programme: string
  type: string
  image: string
}

export interface DisciplineProject {
  title: string
  student: string
  type: string
  image: string
}

export interface DisciplineSection {
  title: string
  bg: string
  projects: DisciplineProject[]
}

export interface StudentVoice {
  quote: string
  name: string
  discipline: string
}

/** Full page data shape returned by the /api/v3/student-showcase endpoint */
export interface StudentShowcasePageData {
  featuredProjects: FeaturedProject[]
  disciplineSections: DisciplineSection[]
  studentVoices: StudentVoice[]
  seoTitle: string
  seoDescription: string
}
