import { useState } from 'react'
import {
  CourseHeroV2,
  QuickFactsBar,
  CourseTabNav,
  AboutCourse,
  CourseLeader,
  IndustryQuote,
  WhyThisCourse,
  DegreeRoute,
  CurriculumOverview,
  PaymentPlan,
  ImpactStats,
  StudentTestimonials,
  ApplicationSteps,
  FAQAccordion,
  CareerOutcomes,
  ProgramDetails,
  MentorsGrid,
  AssessmentBreakdown,
  EquipmentFacilities,
  StudentPortfolio,
  StudentsInAction,
  AlumniStories,
  IndustryPartners,
  IndustryTrends,
  RelatedResources,
  WhatsAppCTA,
  FinalCTA,
  CourseFooter
} from '@/components/course/sections'
import { CoursePageData, filmProductionData } from '@/data/course-page-data'

type Props = {
  course: any
  courseAssets: any[]
  slug: string
  courseArticles?: any[]
}

export default function CoursePageLayout({ course, slug }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deep-dive'>('overview')
  // In a real app, we might merge CMS data with the hardcoded structure or pick the right data based on slug.
  const [data] = useState<CoursePageData>(filmProductionData)

  // Simple rich text renderer helper - combines all paragraphs into one
  const renderRichText = (richText: any) => {
    if (!richText) return null

    // Handle string case
    if (typeof richText === 'string') return <p>{richText}</p>

    // Handle Contentful rich text - combine all paragraphs into one
    if (richText.content) {
      const allText = richText.content
        .filter((block: any) => block.nodeType === 'paragraph')
        .map((block: any) => block.content.map((span: any) => span.value).join(''))
        .join(' ')

      return allText ? <p>{allText}</p> : null
    }

    return null
  }

  const safeString = (val: any) => (typeof val === 'string' ? val : '')

  const safeProgramType = (pt: any) => {
    if (pt && pt.fields) return pt
    return undefined
  }

  return (
    <>
      <CourseHeroV2
        name={safeString(course.name)}
        coverImage={course.coverImage}
        programType={safeProgramType(course.programType)}
        awardLevel={safeString(course.awardLevel)}
        duration={course.programType?.fields?.duration}
        slug={slug}
      />

      <QuickFactsBar facts={data.quickFacts} />

      <CourseTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-white">
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            <AboutCourse description={renderRichText(course.aboutTheCourse)} accreditation="Pearson BTEC Accredited" />
            <CourseLeader
              leader={{
                ...data.courseLeader,
                title: data.courseLeader.role,
                image: data.courseLeader.imageUrl as string
              }}
            />
            <IndustryQuote
              quote={data.industryQuote.quote}
              author={data.industryQuote.author}
              role={data.industryQuote.role}
            />
            <WhyThisCourse benefits={data.benefits} />
            <DegreeRoute
              steps={data.degreeSteps.map((step) => ({
                step: step.step,
                title: step.title,
                subtitle: step.description,
                color: step.step % 2 !== 0 ? '#1A1A1A' : '#BA2E36' // Alternating colors
              }))}
            />
            <CurriculumOverview
              semesters={data.semesters.map((sem, i) => ({
                ...sem,
                number: i + 1
              }))}
            />
            {/* Adapting data for PaymentPlan component */}
            <PaymentPlan
              plan={{
                installments: data.paymentPlans.map((p) => ({
                  label: p.title,
                  percentage: p.title.includes('Term') ? '33%' : '100%',
                  amount: p.price,
                  description: p.details[0] || ''
                })),
                totalPerSemester: data.paymentPlans.find((p) => p.title === 'Per Term')?.price || 'KES 145,000',
                discountMessage: 'Get 5% off when you pay the full year in advance.'
              }}
            />
            <ImpactStats stats={data.impactStats} />
            <StudentTestimonials
              testimonials={data.testimonials.map((t) => ({
                ...t,
                program: safeString(course.name), // Fallback
                type: t.role.toLowerCase().includes('alumni') ? 'alumni' : 'current'
              }))}
            />
            <ApplicationSteps steps={data.applicationSteps} />
            <FAQAccordion faqs={data.faqs} />
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <div className="animate-fade-in-up">
            <CareerOutcomes careers={data.careers} stats={data.impactStats} />
            <ProgramDetails details={data.programDetails} learningOutcomes={data.learningOutcomes} />
            <MentorsGrid
              mentors={data.mentors.map((m) => ({
                name: m.name,
                role: m.role,
                specialization: m.company, // Mapping company to specialization
                image: m.imageUrl as string
              }))}
            />
            <AssessmentBreakdown
              methods={data.assessmentMethods.map((a) => ({
                title: a.method,
                percentage: `${a.percentage}%`,
                description: a.description
              }))}
            />
            <EquipmentFacilities
              facilities={data.facilities.map((f) => ({
                title: f.name,
                description: f.description,
                image: f.imageUrl as string
              }))}
            />
            <StudentPortfolio items={data.portfolioItems} />
            <StudentsInAction
              photos={data.activityPhotos.map((p) => ({
                caption: p.caption,
                image: p.imageUrl as string
              }))}
            />
            <AlumniStories stories={data.alumniStories} />
            <IndustryPartners
              partners={data.industryPartners.map((p) => ({
                name: p.name,
                type: 'Industry Partner' // Default type
              }))}
            />
            <IndustryTrends trends={data.industryTrends} />
            <RelatedResources
              resources={data.resources.map((r) => ({
                category: r.category,
                title: r.title,
                description: '', // Missing in data
                link: r.link,
                image: r.imageUrl as string
              }))}
            />
          </div>
        )}
      </div>

      <WhatsAppCTA />
      <FinalCTA />

      <CourseFooter />
    </>
  )
}
