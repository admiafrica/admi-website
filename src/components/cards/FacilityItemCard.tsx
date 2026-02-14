import Image from 'next/image'
import { Box, Card } from '@/lib/tw-mantine'
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
      className="hover:border-1 h-[280px] w-full cursor-pointer bg-white hover:border-solid hover:border-admiRed"
    >
      <Box className="flex h-full flex-row gap-4">
        <Box className="relative h-full w-[40%] overflow-hidden rounded-lg">
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
        <Box className="flex h-full w-[60%] flex-col justify-center py-2">
          <Title label={facility.name || 'The Studios'} size="20px" color="black" className="mb-3" />
          <Paragraph className="text-sm leading-relaxed text-gray-700">{facility.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  )
}
