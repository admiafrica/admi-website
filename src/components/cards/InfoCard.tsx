import React from 'react'

import { Paragraph } from '../ui'
import IconAttach from '@/assets/icons/Attach'

type Props = {
  item: any
  bgColor?: string
  textColor?: string
  textWeight?: number
}

export default function InfoCard({ item, bgColor = '#081E1A', textColor = 'white', textWeight = 100 }: Props) {
  return (
    <div
      className="z-10 h-full w-full rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex">
        {item.icon ? (
          <item.icon width={36} height={36} color={item.iconColor || 'white'} />
        ) : (
          <IconAttach width={24} height={24} color="white" />
        )}
        <Paragraph fontFamily="font-nexa" fontWeight={900} className={`my-auto w-[90%] px-4 text-${textColor}`}>
          {item.name}
        </Paragraph>
      </div>
      <Paragraph fontFamily="font-nexa" fontWeight={textWeight} className={`px-2 py-4 text-${textColor}`} size="16px">
        {item.description}
      </Paragraph>
      <div className="flex h-full flex-row"></div>
    </div>
  )
}
