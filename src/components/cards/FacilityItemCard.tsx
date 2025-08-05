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
      className="hover:border-1 h-[480px] h-full cursor-pointer bg-white hover:border-solid hover:border-admiRed"
    >
      <Box className="flex h-full flex-col">
        <Box className="relative h-[180px] w-full overflow-hidden rounded-lg">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={false}
            quality={90}
          />
        </Box>
        <Box className="flex w-full flex-1 flex-col p-4 pb-6">
          <Title label={facility.name || 'The Studios'} size="18px" color="black" className="mb-2" />
          <Paragraph className="overflow-hidden text-sm leading-relaxed">{facility.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  )
}
