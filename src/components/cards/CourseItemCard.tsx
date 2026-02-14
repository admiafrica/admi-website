import Image from 'next/image'
import { Title } from '@/components/ui'
import { getAssetDetails, ensureProtocol } from '@/utils'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { IContentfulEntry } from '@/types'

import IconArrowTipRight from '@/assets/icons/ArrowTipRight'

type Props = {
  course: IContentfulEntry
}

export default function CourseItemCard({ course }: Props) {
  const router = useRouter()

  const handleCourseClick = () => {
    router.push(`/courses/${course.fields.slug}`)
  }

  return (
    <div
      className="hover:border-1 h-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:border-solid hover:border-admiRed"
      style={{ width: 300 }}
      onClick={handleCourseClick}
    >
      <motion.div
        whileHover="hover" // Shared hover animation key
      >
        <div>
          <Image
            width={300}
            height={169}
            src={
              course.assets
                ? ensureProtocol(getAssetDetails(course.assets, course.fields.coverImage.sys.id)?.fields.file.url)
                : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
            }
            alt={course.fields.name}
          />
        </div>
        <div className="flex h-[70px]">
          <div className="grow pt-4">
            <Title label={course.fields.name} size="18px" color="black" />
          </div>
          {/* Arrow Icon with Animation */}
          <motion.div
            className="my-auto mt-2 flex h-full"
            variants={{
              hover: { x: 20 }
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.5
            }}
          >
            <IconArrowTipRight width={36} height={36} color={'#F60834'} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
