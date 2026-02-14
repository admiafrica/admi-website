import React from 'react'
import { Box, Card } from '@/lib/tw-mantine'

import { Paragraph, Title } from '../ui'
import Image from 'next/image'

type Props = {
  advice: any
  hasList?: boolean
}

export default function AdviceCard(props: Props) {
  return (
    <Card className="z-10 mx-4 h-full w-[680px]" withBorder>
      <Box className="flex h-full flex-row">
        <Box className="flex w-[60%] flex-col pr-2">
          <Title label={props.advice.title} color="black" size="24px" />
          {props.hasList ? (
            <Box className="pt-8">
              {props.advice.description.map((item: any, index: number) => {
                if (item.type == 'paragraph') {
                  return <Paragraph key={`advice-${index}`}>{item.content}</Paragraph>
                }

                if (item.type == 'list') {
                  return (
                    <ul key={index}>
                      {item.content.map((value: string, index: number) => (
                        <li key={`pointer-${index}`}>
                          <Paragraph key={`advice-item-${index}`}>{value}</Paragraph>
                        </li>
                      ))}
                    </ul>
                  )
                }
              })}
            </Box>
          ) : (
            <Paragraph size="16px">{props.advice.description}</Paragraph>
          )}
        </Box>
        <Box className="relative flex h-[100%] w-[40%]">
          <Image
            src={
              props.advice.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
            }
            alt={props.advice.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{ borderRadius: 8, objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Card>
  )
}
