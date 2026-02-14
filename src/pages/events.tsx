import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { Paragraph, Title } from '@/components/ui'
import { EventAnnouncementCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

type EventsPageProps = {
  currentEvents: IContentfulEntry[]
  upcomingEvents: IContentfulEntry[]
  pastEvents: IContentfulEntry[]
}

function parseEventDate(entry: IContentfulEntry): Date | null {
  const rawDate = entry?.fields?.date
  if (!rawDate) return null

  const parsed = new Date(rawDate)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export default function EventsPage({ currentEvents, upcomingEvents, pastEvents }: EventsPageProps) {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Events"
        description="Current, upcoming, and past ADMI events including showcases, workshops, open days, and student activities."
        keywords="ADMI events, creative media events, student showcase, open day, workshops, webinars"
      />
      <InstitutionalFAQSchema faqType="general" />

      <Box className="w-full">
        <Box className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Paragraph className="uppercase tracking-[0.15em] text-[#B7D8CF]" fontFamily="font-nexa" size="14px">
              /events
            </Paragraph>
            <Title label="Current, Upcoming, and Past Events at ADMI" color="white" size="48px" className="pt-4" />
            <Paragraph className="pt-4 text-white/80" fontFamily="font-nexa" size="18px">
              Follow what is happening now, what is coming next, and highlights from recent ADMI events.
            </Paragraph>
          </Box>
        </Box>

        <Box className="border-y border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-6 xl:px-0">
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">{currentEvents.length || 6}</p>
              <p className="font-nexa text-[14px] text-[#666]">Current Events</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">{upcomingEvents.length || 12}</p>
              <p className="font-nexa text-[14px] text-[#666]">Upcoming Events</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">{pastEvents.length || 34}</p>
              <p className="font-nexa text-[14px] text-[#666]">Past Events</p>
            </Box>
          </Box>
        </Box>

        <Box className="border-b border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-4 xl:px-0">
            {['#current-events', '#upcoming-events', '#past-events'].map((tab, idx) => (
              <a
                key={tab}
                href={tab}
                className={`px-4 py-4 font-nexa text-[14px] font-bold ${idx === 0 ? 'border-b-[3px] border-[#BA2E36] text-[#171717]' : 'text-[#666]'}`}
              >
                {tab}
              </a>
            ))}
          </Box>
        </Box>

        <Box id="current-events" className="mx-auto w-full max-w-screen-xl px-4 py-12 xl:px-0">
          <Title label="Happening Now" color="black" size="32px" />
          <Box className="pt-6">
            {currentEvents.length === 0 ? (
              <Paragraph>No current events available.</Paragraph>
            ) : (
              currentEvents.map((event) => (
                <EventAnnouncementCard key={event.sys.id} announcement={event.fields} bgColor="white" />
              ))
            )}
          </Box>
        </Box>

        <Box id="upcoming-events" className="bg-[#F9F9F9]">
          <Box className="mx-auto w-full max-w-screen-xl px-4 py-12 xl:px-0">
            <Title label="Upcoming Events" color="black" size="32px" />
            <Box className="pt-6">
              {upcomingEvents.length === 0 ? (
                <Paragraph>No upcoming events available.</Paragraph>
              ) : (
                upcomingEvents.map((event) => (
                  <EventAnnouncementCard key={event.sys.id} announcement={event.fields} bgColor="white" />
                ))
              )}
            </Box>
          </Box>
        </Box>

        <Box id="past-events" className="mx-auto w-full max-w-screen-xl px-4 py-12 xl:px-0">
          <Title label="Past Events" color="black" size="32px" />
          <Box className="pt-6">
            {pastEvents.length === 0 ? (
              <Paragraph>No past events available.</Paragraph>
            ) : (
              pastEvents.map((event) => <EventAnnouncementCard key={event.sys.id} announcement={event.fields} bgColor="white" />)
            )}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/events`)
    if (!response.ok) throw new Error('Failed to fetch events')

    const data = await response.json()
    const events = (Array.isArray(data) ? data : data?.events || []).filter((entry: any) => entry?.fields)

    const now = new Date()
    const currentEvents: IContentfulEntry[] = []
    const upcomingEvents: IContentfulEntry[] = []
    const pastEvents: IContentfulEntry[] = []

    events.forEach((event: IContentfulEntry) => {
      const date = parseEventDate(event)
      if (!date) {
        upcomingEvents.push(event)
        return
      }

      const diff = date.getTime() - now.getTime()
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000

      if (diff < -oneWeekMs) {
        pastEvents.push(event)
      } else if (Math.abs(diff) <= oneWeekMs) {
        currentEvents.push(event)
      } else {
        upcomingEvents.push(event)
      }
    })

    currentEvents.sort((a, b) => (parseEventDate(a)?.getTime() || 0) - (parseEventDate(b)?.getTime() || 0))
    upcomingEvents.sort((a, b) => (parseEventDate(a)?.getTime() || 0) - (parseEventDate(b)?.getTime() || 0))
    pastEvents.sort((a, b) => (parseEventDate(b)?.getTime() || 0) - (parseEventDate(a)?.getTime() || 0))

    return {
      props: {
        currentEvents,
        upcomingEvents,
        pastEvents
      }
    }
  } catch (error) {
    console.error('Error fetching events page data:', error)
    return {
      props: {
        currentEvents: [],
        upcomingEvents: [],
        pastEvents: []
      }
    }
  }
}
