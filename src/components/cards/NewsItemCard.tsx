import Image from 'next/image'
import { Box, Card } from '@mantine/core'
import { Paragraph } from '@/components/ui'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { IContentfulEntry } from '@/types'

import IconArrowTipRight from '@/assets/icons/ArrowTipRight'
import { formatDate } from '@/utils'

type Props = {
  item: IContentfulEntry
  isEvent?: boolean
}

export default function NewsItemCard({ item, isEvent = false }: Props) {
  const router = useRouter()

  const handleCardClick = () => {
    // Check if slug exists
    if (!item?.fields?.slug) {
      console.error('Article missing slug:', {
        title: item?.fields?.title || 'Unknown article',
        category: item?.fields?.category,
        fields: Object.keys(item?.fields || {})
      })
      alert('This article link is not available. Please contact support.')
      return
    }

    // Log category for debugging
    console.log('Article click:', {
      title: item.fields.title,
      category: item.fields.category,
      slug: item.fields.slug
    })

    const category = item.fields.category?.trim()

    if (category === 'News') {
      router.push(`/news-events/news/${item.fields.slug}`)
    } else if (category === 'Resources') {
      router.push(`/resources/${item.fields.slug}`)
    } else if (category === 'news' || category === 'News & Events') {
      // Handle variations in category naming
      router.push(`/news-events/news/${item.fields.slug}`)
    } else if (category === 'resources' || category === 'Resource') {
      // Handle variations in category naming
      router.push(`/resources/${item.fields.slug}`)
    } else {
      console.error('Unknown article category:', {
        category: item.fields.category,
        title: item.fields.title,
        availableFields: Object.keys(item.fields)
      })

      // Default to news if uncertain
      console.log('Defaulting to news route for:', item.fields.title)
      router.push(`/news-events/news/${item.fields.slug}`)
    }
  }

  return (
    <motion.div
      className="h-full"
      whileHover="hover" // Shared hover animation key
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="hover:border-1 h-full cursor-pointer hover:border-solid hover:border-admiRed"
        onClick={handleCardClick}
      >
        <Card.Section className={isEvent ? 'relative h-[80%] overflow-hidden' : 'relative h-[50%] overflow-hidden'}>
          <motion.div
            className="relative h-full w-full"
            variants={{
              hover: { scale: 1.1 }
            }} // Zoom effect for the image
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Image
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={
                item.fields.coverImage?.fields?.file?.url || item.fields.flyer?.fields?.file?.url
                  ? `https:${item.fields.coverImage?.fields.file.url || item.fields.flyer?.fields.file.url}`
                  : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
              }
              alt={item.fields.title}
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </Card.Section>
        <Box className="flex">
          <Box className="grow pt-4">
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="20px" className="line-clamp-3 h-[60px] pb-4">
              {item.fields.title}
            </Paragraph>
            {isEvent && (
              <Paragraph fontFamily="font-nexa" fontWeight={400} size="16px" className="mt-2">
                {formatDate(item.fields.date)}
              </Paragraph>
            )}
            <Paragraph className="line-clamp-4 pt-2" size="16px">
              {item.fields.summary}
            </Paragraph>
            {/* Arrow Icon with Animation */}
            <motion.div
              className="my-auto ml-auto mr-0 mt-2 flex h-full w-fit"
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
        </Box>
      </Card>
    </motion.div>
  )
}
