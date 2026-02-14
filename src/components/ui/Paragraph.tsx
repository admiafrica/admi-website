import React from 'react'
import clsx from 'clsx' // merge classes dynamically

type Props = {
  children: React.ReactNode
  size?: string // Default size for Text component
  className?: string // Extra styles
  fontFamily?: string // Font Family
  fontWeight?: number
}

const Paragraph: React.FC<Props> = ({
  children,
  size = '18px',
  className = '',
  fontFamily = 'font-proxima',
  fontWeight = 500
}) => {
  return (
    <div className={clsx(fontFamily, className)}>
      <p className="text-gray-700" style={{ fontSize: size, fontWeight }}>
        {children}
      </p>
    </div>
  )
}

export default Paragraph
