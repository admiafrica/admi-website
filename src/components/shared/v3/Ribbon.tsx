import React from 'react'

export default function Ribbon() {
  return (
    <div className="flex h-[0.75rem] w-full">
      <div className="w-1/4 bg-[#E6F608]" />
      <div className="w-1/4 bg-[#F60834]" />
      <div className="w-1/4 bg-secondary" />
      <div className="w-1/4 bg-brand-orange" />
    </div>
  )
}
