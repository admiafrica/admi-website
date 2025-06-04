import { useRouter } from 'next/router'
import { useState } from 'react'
import { Autocomplete, Box } from '@mantine/core'

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

  const handleItemSelect = (value: string) => {
    setSelectedItem(value)
  }

  const handleItemSearch = () => {
    const item = items.find((item) => item.fields.name == selectedItem || item.fields.title == selectedItem)
    if (item) {
      router.push(`/${destination}/${item.fields.slug}`)
    }
    return
  }

  return (
    <Box bg={bg} className="rounded-lg">
      <Box className="rounded-1xl py-4">
        <div className="flex w-full text-white">
          <div className="my-auto pl-2">
            <IconSearch color="white" width={36} height={36} />
          </div>
          <Autocomplete
            className="w-full px-2 pt-1 text-white"
            placeholder={placeholder}
            styles={{
              input: {
                color: 'white',
                fontSize: isMobile ? '12px' : '16px',
                fontWeight: 600
              },
              dropdown: {
                marginTop: 16
              }
            }}
            renderOption={(value) => (
              <Paragraph size="16px" className="py-1">
                {value.option.value}
              </Paragraph>
            )}
            data={items.map((item) => item.fields.name || item.fields.title)}
            value={selectedItem}
            onChange={handleItemSelect}
            rightSection={
              <div>
                <Button
                  size={isMobile ? 'sm' : 'lg'}
                  backgroundColor="admiRed"
                  label={buttonLabel}
                  onClick={() => handleItemSearch()}
                />
              </div>
            }
            rightSectionWidth="fit-content"
          />
        </div>
      </Box>
    </Box>
  )
}
