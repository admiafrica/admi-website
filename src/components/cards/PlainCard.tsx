import React from 'react'

type Props = {
  children: any
  bg?: string
}

export default function PlainCard({ children, bg = '#FEFFF5' }: Props) {
  return (
    <div className="z-10 h-full w-full rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
      <div className="flex h-full w-full flex-col p-4 sm:p-8" style={{ backgroundColor: bg }}>
        {children}
      </div>
    </div>
  )
}
