import React from 'react'
import Image from 'next/image'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { getAssetDetails, ensureProtocol } from '@/utils'
import { IContentfulAsset, IContentfulEntry } from '@/types'

import ImageKenyanFlag from '@/assets/images/kenyan-flag.svg'
import { Paragraph, Title } from '../ui'

type Props = {
  user: IContentfulEntry
  testimonial: IContentfulEntry
  assets: Array<IContentfulAsset>
}

export default function UserTestimonialCard(props: Props) {
  return (
    <div className="mb-16 mr-4 h-fit w-full max-w-[360px] rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="inline-flex gap-1 pb-2 pl-2 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < 5 ? '\u2605' : '\u2606'}</span>
        ))}
      </div>
      <div>
        <div className="overflow-auto" style={{ height: '12em' }}>
          <div
            className="mt-1 h-full px-6 font-proxima text-[18px] text-gray-600"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                props.testimonial.fields.description
                  ? props.testimonial.fields.description
                  : props.testimonial.fields.testimonial
              )
            }}
          ></div>
        </div>
      </div>
      <div className="mt-8 flex px-2">
        {props.testimonial.fields.authorImage ? (
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={ensureProtocol(
              getAssetDetails(props.assets, props.testimonial.fields.authorImage.sys.id)?.fields.file.url
            )}
            alt=""
          />
        ) : (
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={ensureProtocol(getAssetDetails(props.assets, props.testimonial.fields.image.sys.id)?.fields.file.url)}
            alt=""
          />
        )}

        <div className="flex w-full px-4">
          <div className="flex grow flex-col">
            {props.testimonial.fields.authorName ? (
              <div className="my-auto w-full">
                <Title label={props.testimonial.fields.authorName} size="18px" color="black" />
                <Paragraph size="16px">{props.testimonial.fields.authorRole}</Paragraph>
              </div>
            ) : (
              <div className="my-auto w-full">
                <Title label={props.testimonial.fields.fullName} size="18px" color="black" />
                <Paragraph size="16px" className="pt-2 text-gray-500">
                  {props.testimonial.fields.role}
                </Paragraph>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Image src={ImageKenyanFlag} alt="Flag of Kenya" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  )
}
