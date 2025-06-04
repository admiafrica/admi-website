import React from 'react'
import clsx from 'clsx' // merge classes dynamically
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document as ContentfulDocument } from '@contentful/rich-text-types'

type Props = {
  children: ContentfulDocument
  className?: string // Extra styles
  fontFamily?: string // Font Family
  fontWeight?: number
}

const ParagraphContentful: React.FC<Props> = ({ children, className = '', fontFamily = 'font-proxima' }) => {
  return (
    <div
      className={clsx(fontFamily, className)}
      dangerouslySetInnerHTML={{
        __html: documentToHtmlString(children)
      }}
    ></div>
  )
}

export default ParagraphContentful
