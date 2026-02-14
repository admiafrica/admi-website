import Image from 'next/image'
import { Paragraph, Title } from '@/components/ui'

type Props = {
  facility: any
}

export default function FacilityItemCard({ facility }: Props) {
  return (
    <div className="hover:border-1 h-[280px] w-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:border-solid hover:border-admiRed">
      <div className="flex h-full flex-row gap-4">
        <div className="relative h-full w-[40%] overflow-hidden rounded-lg">
          <Image
            fill
            sizes="(max-width: 768px) 40vw, 300px"
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={false}
            quality={90}
          />
        </div>
        <div className="flex h-full w-[60%] flex-col justify-center py-2">
          <Title label={facility.name || 'The Studios'} size="20px" color="black" className="mb-3" />
          <Paragraph className="text-sm leading-relaxed text-gray-700">{facility.description}</Paragraph>
        </div>
      </div>
    </div>
  )
}
