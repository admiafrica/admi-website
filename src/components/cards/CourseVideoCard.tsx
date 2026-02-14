import React from 'react'
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
    <div className="max-w-[600px] rounded-xl border border-gray-200 bg-white shadow-sm sm:w-full">
      <div>
        {props.courseVideo ? (
          <VideoPlayer videoUrl={props.courseVideo.fields.file.url} />
        ) : (
          <img
            className="h-auto w-full"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            alt="about course"
          />
        )}
      </div>
      <div className="px-6">
        <div className="flex py-4">
          <IconCheck size={24} className="text-admiRed" />
          <div className="font-proxima">
            <p className="text-gray-700" style={{ paddingLeft: 16 }}>
              Intakes: {props.intakes}
            </p>
          </div>
        </div>

        {/* Watch Full Video Button */}
        {props.courseVideo && props.courseSlug && (
          <div className="flex flex-wrap justify-center" style={{ paddingBottom: '1rem' }}>
            <Link
              href={`/watch/${props.courseSlug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
            >
              <IconPlayerPlay size={16} />
              Watch Full Video
            </Link>
          </div>
        )}
      </div>
      <div className="bg-brand-orange px-6 py-4 text-white">
        <div className="flex">
          <IconExclamationCircle size={24} />
          <div className="font-proxima">
            <p className="text-gray-700" style={{ paddingLeft: 16, color: 'inherit' }}>
              Venue: {props.venue || 'Caxton House, Nairobi'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
