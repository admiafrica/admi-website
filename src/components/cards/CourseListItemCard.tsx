import Image from 'next/image'
import { Box, Card } from '@/lib/tw-mantine'
import { ParagraphContentful, Title } from '@/components/ui'
import { getAssetDetails, ensureProtocol } from '@/utils'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import IconArrowTipRight from '@/assets/icons/ArrowTipRight'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  course: any
}

export default function CourseListItemCard({ course }: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleCourseClick = () => {
    router.push(`/courses/${course.fields.slug}`)
  }

  return (
    <Card
      className="hover:border-1 my-4 h-[100px] w-full cursor-pointer shadow-lg hover:border-solid hover:border-admiRed sm:h-[16vh]"
      withBorder
      key={course.sys.id}
      p={0}
      onClick={handleCourseClick}
    >
      {/* Card container */}
      <motion.div
        className="flex h-full w-full flex-row"
        whileHover="hover" // Shared hover animation key
      >
        {/* Image Container with Scaling */}
        <motion.div
          className="relative h-[16vh] w-1/3 flex-shrink-0 overflow-hidden sm:h-full sm:w-[300px]"
          variants={{
            hover: { scale: 1.05 }
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="relative h-full w-full sm:w-full"
            style={{ transformOrigin: 'center' }} // Ensure scaling centers the image
          >
            <Image
              fill
              sizes="(max-width: 640px) 33vw, 300px"
              src={ensureProtocol(getAssetDetails(course.assets, course.fields.coverImage.sys.id)?.fields.file.url)}
              alt={course.fields.name}
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <Box className="flex w-1/2 grow sm:w-full">
          <Box className="flex w-[92%] flex-col px-4 pt-6">
            <Title label={course.fields.name} size={isMobile ? '16px' : '20px'} color="black" />
            {!isMobile && (
              <ParagraphContentful className="line-clamp-[2] text-gray-500">
                {course.fields.description}
              </ParagraphContentful>
            )}
          </Box>

          {/* Arrow Icon with Animation */}
          <motion.div
            className="my-auto flex h-fit sm:items-center"
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
        </Box>
      </motion.div>
    </Card>
  )
}
