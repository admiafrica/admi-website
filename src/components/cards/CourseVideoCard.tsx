import React from 'react'
import { Card, Image, Text, Button, Group } from '@/lib/tw-mantine'
import { IconCheck, IconExclamationCircle, IconPlayerPlay } from '@tabler/icons-react'
import Link from 'next/link'

import { VideoPlayer } from '../shared/v3'

type Props = {
  intakes: string
  courseVideo: any
  educationalLevel: string
  venue?: string
  courseSlug?: string
}

export default function CourseVideoCard(props: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="max-w-[600px] sm:w-full">
      <Card.Section>
        {props.courseVideo ? (
          <VideoPlayer videoUrl={props.courseVideo.fields.file.url} />
        ) : (
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            alt="about course"
          />
        )}
      </Card.Section>
      <Card.Section className="px-6">
        <div className="flex py-4">
          <IconCheck size={24} className="text-admiRed" />
          <div className="font-proxima">
            <Text pl={16}>Intakes: {props.intakes}</Text>
          </div>
        </div>

        {/* Watch Full Video Button */}
        {props.courseVideo && props.courseSlug && (
          <Group justify="center" pb="md">
            <Button
              component={Link}
              href={`/watch/${props.courseSlug}`}
              leftSection={<IconPlayerPlay size={16} />}
              variant="outline"
              color="red"
              size="sm"
            >
              Watch Full Video
            </Button>
          </Group>
        )}
      </Card.Section>
      <Card.Section className="bg-brand-orange px-6 py-4 text-white">
        <div className="flex">
          <IconExclamationCircle size={24} />
          <div className="font-proxima">
            <Text pl={16}>Venue: {props.venue || 'Caxton House, Nairobi'}</Text>
          </div>
        </div>
      </Card.Section>
    </Card>
  )
}
