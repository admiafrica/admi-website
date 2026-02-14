'use client'

import React, { useRef, useState } from 'react'
import { Carousel } from '@/lib/tw-mantine-carousel'
import Autoplay from 'embla-carousel-autoplay'

import { IconPlus } from '@tabler/icons-react'
import { Paragraph } from '@/components/ui'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  data: Array<{ year: number; achievements: Array<string> }>
}

export default function Timeline({ data }: Props) {
  const isMobile = useIsMobile()
  const [activeYear, setActiveYear] = useState(data[0])
  const autoplay = useRef(Autoplay({ delay: 4000 }))

  const handleYearSelected = (value: { year: number; achievements: Array<string> }) => {
    setActiveYear(value)
  }
  return (
    <div className="w-full">
      {isMobile ? (
        <div className="w-full">
          <Carousel
            slideSize={600}
            height={360}
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {data.map((item: any) => (
              <Carousel.Slide key={item.year}>
                <div className="flex w-full flex-col py-6">
                  <div className="w-full sm:w-[240px]">
                    <Paragraph fontFamily="font-nexa py-2" size="76px">
                      {item.year}
                    </Paragraph>
                  </div>
                  <div className="flex w-full flex-col">
                    {item.achievements.map((item: string, index: number) => (
                      <div className="flex w-full py-2" key={`achievement-${index}`}>
                        <IconPlus className="my-auto mr-2 rounded-full bg-admiShamrok" size={14} />
                        <Paragraph className="my-auto w-full">{item}</Paragraph>
                      </div>
                    ))}
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="relative flex w-full flex-col">
          <div className="absolute top-[22px] z-0 mx-auto w-full px-6">
            <hr className="border-gray-200" style={{ borderColor: 'admiShamrok' }} />
          </div>
          <div className="z-10 flex w-full">
            {data.map((item: any) => (
              <div
                key={item.year}
                className="mx-auto cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm"
                style={{ backgroundColor: activeYear.year == item.year ? 'admiRed' : 'admiShamrok' }}
                onClick={() => handleYearSelected(item)}
              >
                <Paragraph
                  fontFamily="font-nexa"
                  size="12px"
                  fontWeight={900}
                  className={activeYear.year == item.year ? 'text-white' : 'text-black'}
                >
                  {item.year}
                </Paragraph>
              </div>
            ))}
          </div>
          <div className="flex w-full py-6">
            <div className="w-[20%] w-[240px]">
              <Paragraph fontFamily="font-nexa py-2" size="76px">
                {activeYear.year}
              </Paragraph>
            </div>
            <div className="flex w-[80%] flex-col">
              {activeYear.achievements.map((item: string, index: number) => (
                <div className="flex w-full py-2" key={`achievement-${index}`}>
                  <IconPlus className="my-auto mr-2 rounded-full bg-admiShamrok" size={14} />
                  <Paragraph className="my-auto">{item}</Paragraph>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
