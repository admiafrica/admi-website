'use client'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { Button, Paragraph } from '@/components/ui'
import { useIsMobile } from '@/hooks/useIsMobile'

import IconSearch from '@/assets/icons/Search'

type Props = {
  items: any[]
  buttonLabel: string
  placeholder: string
  destination: string
  bg?: string
}

export default function SearchDropdown({ items, buttonLabel, placeholder, destination, bg = '#173D37' }: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [selectedItem, setSelectedItem] = useState<string>()
  const [showDropdown, setShowDropdown] = useState(false)

  const allOptions = items.map((item) => item.fields.name || item.fields.title)
  const filteredOptions = selectedItem
    ? allOptions.filter((opt: string) => opt.toLowerCase().includes(selectedItem.toLowerCase()))
    : allOptions

  const handleItemSelect = (value: string) => {
    setSelectedItem(value)
    setShowDropdown(true)
  }

  const handleOptionClick = (value: string) => {
    setSelectedItem(value)
    setShowDropdown(false)
  }

  const handleItemSearch = () => {
    const item = items.find((item) => item.fields.name == selectedItem || item.fields.title == selectedItem)
    if (item) {
      router.push(`/${destination}/${item.fields.slug}`)
    }
    return
  }

  return (
    <div style={{ backgroundColor: bg }} className="rounded-lg">
      <div className="rounded-1xl py-4">
        <div className="flex w-full text-white">
          <div className="my-auto pl-2">
            <IconSearch color="white" width={36} height={36} />
          </div>
          <div className="relative w-full px-2 pt-1">
            <div className="flex items-center">
              <input
                className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
                placeholder={placeholder}
                style={{
                  color: 'white',
                  fontSize: isMobile ? '12px' : '16px',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent'
                }}
                value={selectedItem || ''}
                onChange={(e) => handleItemSelect(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              <div>
                <Button
                  size={isMobile ? 'sm' : 'lg'}
                  backgroundColor="admiRed"
                  label={buttonLabel}
                  onClick={() => handleItemSearch()}
                />
              </div>
            </div>
            {showDropdown && filteredOptions.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-4 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-md">
                {filteredOptions.map((option: string, index: number) => (
                  <button
                    key={index}
                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                    onMouseDown={() => handleOptionClick(option)}
                  >
                    <Paragraph size="16px" className="py-1">
                      {option}
                    </Paragraph>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
