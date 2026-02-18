import Image from 'next/image'
import { useRouter } from 'next/router'

import { Title } from '@/components/ui'

type Props = {
  sector: any
  textColor?: string
  bgColor?: string
  defaultBorder?: boolean
  width?: number
  height?: number
}

export default function SectorItemCard({
  sector,
  textColor = 'black',
  bgColor = 'none',
  defaultBorder = true,
  width = 160,
  height = 160
}: Props) {
  const router = useRouter()

  const handleCourseClick = () => {
    // Navigate to courses page with the sector title as a search parameter
    const searchQuery = encodeURIComponent(sector.title)
    router.push(`/courses?search=${searchQuery}`)
  }

  return (
    <div
      className="h-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{
        width,
        height,
        backgroundColor: bgColor,
        border: defaultBorder ? '1px solid rgba(233, 233, 233, 1)' : '1px solid rgba(255, 255, 255, 0.1)'
      }}
      onClick={handleCourseClick}
    >
      {sector.icon ? (
        <div className="flex w-full items-center justify-center">
          <sector.icon width={48} height={48} color={sector.color} />
        </div>
      ) : (
        <Image
          width={64}
          height={64}
          src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
          alt={sector.title}
          style={{ margin: 'auto' }}
        />
      )}
      <div className="flex h-[60px] w-full">
        <div className="mx-auto w-fit pt-6 text-center">
          <Title label={sector.title} size="14px" color={textColor} />
        </div>
      </div>
    </div>
  )
}
