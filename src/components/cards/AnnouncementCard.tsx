import React from 'react'
import { ensureProtocol } from '@/utils'
import { Paragraph, Title } from '../ui'
import { motion } from 'framer-motion'

import IconArrowTipRight from '@/assets/icons/ArrowTipRight'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  announcement: any
  title?: string
  featured?: boolean
  bgColor?: string
  arrowColor?: string
  textColor?: string
  image?: any
  destination: string
  ribbonColor?: string
}

export default function AnnouncementCard(props: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleCardClick = () => {
    // Check if slug exists
    if (!props.announcement?.slug) {
      console.error('Announcement missing slug:', props.announcement?.title || 'Unknown announcement')
      alert('This article link is not available. Please contact support.')
      return
    }

    router.push(`/${props.destination}/${props.announcement.slug}`)
  }

  return (
    <div
      className="mx-auto w-full max-w-screen-xl cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ backgroundColor: props.bgColor || 'white', borderRadius: 8, padding: 0 }}
      onClick={handleCardClick}
    >
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        {props.featured && (
          <motion.div
            className="relative flex"
            initial={{ width: '0%' }}
            variants={{
              hover: { width: '2%' }
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-full" style={{ backgroundColor: props.ribbonColor }}></div>
          </motion.div>
        )}
        <div className="flex h-fit w-full flex-col-reverse px-6 py-4 sm:h-[420px] sm:flex-row">
          <div className="flex grow flex-col pt-4 hover:w-[42%] sm:w-[44%] sm:pr-4 sm:pt-0">
            {props.featured && (
              <span
                className="mb-4 inline-flex w-fit items-center rounded-full border border-gray-300 px-3 py-1 font-nexa text-xs font-black"
                style={{ border: '2px solid rgba(0, 0, 0, 0.14)', backgroundColor: 'white', height: 28 }}
              >
                Featured
              </span>
            )}
            {props.title && <Title label={props.title} color="black" />}

            <Paragraph
              size="26px"
              fontFamily="font-nexa"
              fontWeight={400}
              className={`text-${props.textColor || 'black'}`}
            >
              {props.announcement.title}
            </Paragraph>

            <Paragraph
              size="18px"
              className={`my-6 line-clamp-6 h-fit text-${props.textColor || 'black'}`}
              fontFamily="font-nexa"
            >
              {props.announcement.summary}
            </Paragraph>

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
              <IconArrowTipRight width={48} height={48} color={props.arrowColor} />
            </motion.div>
          </div>
          {/* Image Container with Hover Effect */}
          {isMobile ? (
            <div className="relative mx-auto flex h-[180px] w-full sm:h-full">
              {props.announcement.coverImage ? (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 56vw"
                  src={ensureProtocol(props.announcement.coverImage.fields.file.url)}
                  alt={props.announcement.title}
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              ) : (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 56vw"
                  src={
                    props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
                  }
                  alt="about course"
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            <motion.div
              className="relative flex h-[180px] sm:h-full"
              initial={{ width: '56%' }}
              variants={{
                hover: { width: props.featured ? '55%' : '56%' }
              }}
              transition={{ duration: 0.3 }}
            >
              {props.announcement.coverImage ? (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 56vw"
                  src={ensureProtocol(props.announcement.coverImage.fields.file.url)}
                  alt={props.announcement.title}
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              ) : (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 56vw"
                  src={
                    props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
                  }
                  alt="about course"
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
