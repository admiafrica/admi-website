import Image from 'next/image'
import { Box, Card } from '@mantine/core'
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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={300}
      className="hover:border-1 h-full cursor-pointer hover:border-solid hover:border-admiRed"
      onClick={handleCourseClick}
    >
      <motion.div
        whileHover="hover" // Shared hover animation key
      >
        <Card.Section>
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
        </Card.Section>
        <Box className="flex h-[70px]">
          <Box className="grow pt-4">
            <Title label={course.fields.name} size="18px" color="black" />
          </Box>
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
        </Box>
      </motion.div>
    </Card>
  )
}
