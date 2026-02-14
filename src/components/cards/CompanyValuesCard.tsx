import React, { useState } from 'react'
import { Paragraph, Title } from '../ui'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  values: any
  showRightIcons?: boolean
}
export default function CompanyValuesCard({ values, showRightIcons = true }: Props) {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('global')

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row">
        <div>
          <div className="mb-4 flex gap-2 border-b border-gray-200">
            {values.map((item: any) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-t-md px-4 py-2 ${activeTab === item.id ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-500'}`}
              >
                <div className="flex">
                  <item.icon />
                  <Paragraph className="my-auto sm:pl-2">{item.name}</Paragraph>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          {values.map((item: any) =>
            activeTab === item.id ? (
              <div key={`content-${item.name}`}>
                <div className="flex h-full w-full flex-col px-8 sm:flex-row" style={{ backgroundColor: '#FEFFF5' }}>
                  <div>
                    <Title label={item.name} color="black" size={isMobile ? '24px' : '36px'} className="py-4" />
                    {item.description.map((paragraph: string, index: number) => (
                      <Paragraph className="pb-8" key={`paragraph-${index}`}>
                        {paragraph}
                      </Paragraph>
                    ))}
                  </div>
                  {showRightIcons && (
                    <div className="flex items-center justify-center">
                      <item.icon width={180} height={180} color={item.iconColor} />
                    </div>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
