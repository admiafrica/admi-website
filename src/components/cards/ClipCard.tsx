import React from 'react'

import { Paragraph } from '../ui'
import IconAttach from '@/assets/icons/Attach'

type Props = {
  support: any
}

export default function ClipCard({ support }: Props) {
  return (
    <div
      className="z-10 mx-4 h-full w-[300px] rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ backgroundColor: '#081E1A' }}
    >
      <div>
        <IconAttach width={24} height={24} color="white" />
      </div>
      <Paragraph fontFamily="font-nexa" fontWeight={900} className="py-4 text-white">
        {support.header}
      </Paragraph>
      <Paragraph fontFamily="font-nexa" fontWeight={100} className="py-4 text-white">
        {support.footer}
      </Paragraph>
      <div className="flex h-full flex-row"></div>
    </div>
  )
}
