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
      className="hover:border-1 h-[420px] h-full cursor-pointer bg-white hover:border-solid hover:border-admiRed"
    >
      <Box className="flex h-full flex-col">
        <Box className="relative h-[60%] w-full overflow-hidden rounded-lg">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority={false}
            quality={90}
          />
        </Box>
        <Box className="flex h-[40%] w-full flex-col p-4">
          <Title label={facility.name || 'The Studios'} size="20px" color="black" />
          <Paragraph className="mt-2 text-sm">{facility.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  )
}
