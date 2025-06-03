import React from 'react'
import { Box, Card } from '@mantine/core'

type Props = {
  children: any
  bg?: string
}

export default function PlainCard({ children, bg = '#FEFFF5' }: Props) {
  return (
    <Card className="z-10 h-full w-full px-4" withBorder>
      <Box className="flex h-full w-full flex-col p-4 sm:p-8" bg={bg}>
        {children}
      </Box>
    </Card>
  )
}
