import React, { useRef, useState } from 'react'
import { Carousel } from '@mantine/carousel'
import { Card, Box, Divider } from '@mantine/core'
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
    <Box className="w-full">
      {isMobile ? (
        <Box className="w-full">
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
                <Box className="flex w-full flex-col py-6">
                  <Box className="w-full sm:w-[240px]">
                    <Paragraph fontFamily="font-nexa py-2" size="76px">
                      {item.year}
                    </Paragraph>
                  </Box>
                  <Box className="flex w-full flex-col">
                    {item.achievements.map((item: string, index: number) => (
                      <Box className="flex w-full py-2" key={`achievement-${index}`}>
                        <IconPlus className="my-auto mr-2 rounded-full bg-admiShamrok" size={14} />
                        <Paragraph className="my-auto w-full">{item}</Paragraph>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      ) : (
        <Box className="relative flex w-full flex-col">
          <Box className="absolute top-[22px] z-0 mx-auto w-full px-6">
            <Divider color="admiShamrok" />
          </Box>
          <Box className="z-10 flex w-full">
            {data.map((item: any) => (
              <Card
                key={item.year}
                className="mx-auto cursor-pointer"
                bg={activeYear.year == item.year ? 'admiRed' : 'admiShamrok'}
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
              </Card>
            ))}
          </Box>
          <Box className="flex w-full py-6">
            <Box className="w-[20%] w-[240px]">
              <Paragraph fontFamily="font-nexa py-2" size="76px">
                {activeYear.year}
              </Paragraph>
            </Box>
            <Box className="flex w-[80%] flex-col">
              {activeYear.achievements.map((item: string, index: number) => (
                <Box className="flex w-full py-2" key={`achievement-${index}`}>
                  <IconPlus className="my-auto mr-2 rounded-full bg-admiShamrok" size={14} />
                  <Paragraph className="my-auto">{item}</Paragraph>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
