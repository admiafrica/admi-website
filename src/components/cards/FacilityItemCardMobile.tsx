import Image from 'next/image'
import { Paragraph, Title } from '@/components/ui'

type Props = {
  facility: any
}

export default function FacilityItemCardMobile({ facility }: Props) {
  return (
    <div className="hover:border-1 h-auto w-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:border-solid hover:border-admiRed">
      <div className="flex h-full flex-col gap-4">
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            fill
            sizes="100vw"
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={false}
            quality={90}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-center py-4">
          <Title label={facility.name || 'The Studios'} size="20px" color="black" className="mb-3" />
          <Paragraph className="text-sm leading-relaxed text-gray-700">{facility.description}</Paragraph>
        </div>
      </div>
    </div>
  )
}
