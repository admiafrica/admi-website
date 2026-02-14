import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Button, Paragraph, ParagraphContentful, Title } from '../ui'
import { useIsMobile } from '@/hooks/useIsMobile'
import { formatDate, ensureProtocol } from '@/utils'

import IconLocation from '@/assets/icons/map-marker-3-black.svg'
import IconCall from '@/assets/icons/call-black.svg'
import IconStopwatch from '@/assets/icons/stopwatch-black.svg'

type Props = {
  announcement: any
  title?: string
  featured?: boolean
  bgColor?: string
  arrowColor?: string
  textColor?: string
  image?: any
}

export default function EventAnnouncementCard(props: Props) {
  const isMobile = useIsMobile()
  const googleMapsUrl = `https://www.google.com/maps?q=${props.announcement.locationAddress?.lat},${props.announcement.locationAddress?.lon}`

  return (
    <div
      className="mx-auto mb-4 w-full max-w-screen-xl cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ backgroundColor: props.bgColor || 'white', borderRadius: 8 }}
    >
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        <div className="flex h-fit w-full grow flex-col-reverse px-0 sm:h-[480px] sm:flex-row sm:px-4">
          <div className="flex flex-col pt-4 sm:w-[70%] sm:pr-4 sm:pt-0">
            {props.featured && (
              <span
                className="mb-4 inline-flex w-fit items-center rounded-full border border-gray-300 px-3 py-1 font-nexa text-xs font-black"
                style={{ border: '2px solid rgba(0, 0, 0, 0.14)', backgroundColor: 'white', height: 28 }}
              >
                Featured
              </span>
            )}
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row">
                <div className="relative my-auto" style={{ height: 120, width: 200 }}>
                  <Image
                    fill
                    sizes="200px"
                    src={ensureProtocol(props.announcement.logo?.fields.file.url)}
                    alt={props.announcement.title}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <hr
                  className="border-gray-200"
                  style={{
                    borderColor: 'var(--admi-red, #C1272D)',
                    borderLeftWidth: 2,
                    borderTopWidth: 0,
                    marginLeft: isMobile ? 12 : 24,
                    marginRight: isMobile ? 12 : 24,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    height: 80
                  }}
                />
                <Title
                  label={props.announcement.title}
                  color="black"
                  size={isMobile ? '18px' : '24px'}
                  className="my-auto w-fit"
                />
              </div>
              <div className="flex w-full">
                <ParagraphContentful
                  fontFamily="font-nexa"
                  fontWeight={400}
                  className={`text-${props.textColor || 'black'} py-2`}
                >
                  {props.announcement.description}
                </ParagraphContentful>
              </div>
              {props.announcement.locationAddress?.lat ? (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  <div className="flex w-full">
                    <Image src={IconLocation} height={24} width={24} alt="location" className="mr-2 mt-1" />
                    <Paragraph
                      size="18px"
                      fontFamily="font-nexa"
                      fontWeight={400}
                      className={`text-${props.textColor || 'black'} py-2`}
                    >
                      <strong>Location:</strong> {props.announcement.locationName}
                    </Paragraph>
                  </div>
                </a>
              ) : (
                <div className="flex w-full">
                  <Image src={IconLocation} height={24} width={24} alt="location" className="mr-2 mt-1" />
                  <Paragraph
                    size="18px"
                    fontFamily="font-nexa"
                    fontWeight={400}
                    className={`text-${props.textColor || 'black'} py-2`}
                  >
                    <strong>Location:</strong> {props.announcement.locationName}
                  </Paragraph>
                </div>
              )}
              <div className="flex w-full">
                <Image src={IconCall} height={24} width={24} alt="location" className="mr-2 mt-1" />
                <Paragraph
                  size="18px"
                  fontFamily="font-nexa"
                  fontWeight={400}
                  className={`text-${props.textColor || 'black'} py-2`}
                >
                  <strong>Date:</strong> {formatDate(props.announcement.date)}
                </Paragraph>
              </div>
              <div className="flex w-full">
                <Image src={IconStopwatch} height={24} width={24} alt="location" className="mr-2 mt-1" />
                <Paragraph
                  size="18px"
                  fontFamily="font-nexa"
                  fontWeight={400}
                  className={`text-${props.textColor || 'black'} py-2`}
                >
                  <strong>Time:</strong> {props.announcement.time}
                </Paragraph>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[30%]">
            <div className="relative mb-4 flex h-[300px] w-full flex-col sm:h-[80%]">
              {props.announcement.flyer ? (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={ensureProtocol(props.announcement.flyer?.fields.file.url)}
                  alt={props.announcement.title}
                  style={{ objectFit: 'contain', borderRadius: 8 }}
                />
              ) : (
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={
                    props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
                  }
                  alt="about course"
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
              )}
            </div>
            {props.announcement.link && (
              <a href={props.announcement.link} target="_blank" className="text-blue-700 hover:underline">
                <Button size="lg" backgroundColor="admiRed" label={props.announcement.cta} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
