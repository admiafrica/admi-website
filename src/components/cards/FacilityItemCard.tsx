import Image from 'next/image'
import { Box, Card } from '@mantine/core'
import { Paragraph, Title } from '@/components/ui'

type Props = {
  facility: any
}

export default function FacilityItemCard({ facility }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="hover:border-1 h-auto w-full cursor-pointer bg-white hover:border-solid hover:border-admiRed sm:h-[280px]"
    >
      <Box className="flex h-full flex-col gap-4 sm:flex-row">
        <Box className="relative h-[200px] w-full overflow-hidden rounded-lg sm:h-full sm:w-[40%]">
          <Image
            fill
            sizes="(max-width: 768px) 40vw, 300px"
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={false}
            quality={90}
          />
        </Box>
        <Box className="flex h-full w-full flex-col justify-center py-4 sm:w-[60%] sm:py-2">
          <Title label={facility.name || 'The Studios'} size="20px" color="black" className="mb-3" />
          <Paragraph className="text-sm leading-relaxed text-gray-700">{facility.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  )
}
