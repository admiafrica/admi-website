"use client"

import React from 'react'

type AnyProps = Record<string, any>

const cx = (...values: Array<string | undefined | false | null>) => values.filter(Boolean).join(' ')

export const Carousel = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('overflow-x-auto', className)} {...rest}>
    <div className="flex snap-x snap-mandatory gap-4">{children}</div>
  </div>
)

Carousel.Slide = ({ className, children, ...rest }: AnyProps) => (
  <div className={cx('min-w-[280px] flex-shrink-0 snap-start', className)} {...rest}>
    {children}
  </div>
)

export default Carousel
