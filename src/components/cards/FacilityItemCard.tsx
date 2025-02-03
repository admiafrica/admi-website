import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Paragraph, Title } from '@/components/ui';

type Props = {
  facility: any;
};

export default function FacilityItemCard({ facility }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="hover:border-1 h-[340px] h-full cursor-pointer bg-white hover:border-solid hover:border-admiRed"
    >
      <Box className="flex h-full">
        <Box className="flex w-[60%] flex-col pt-4">
          <Title label={facility.name || 'The Studios'} size="24px" color="black" />
          <Paragraph className="mb-0 mt-auto h-[160px] pr-2">{facility.description}</Paragraph>
        </Box>
        <Box className="relative h-full w-[40%]">
          <Image
            fill
            src={facility.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            alt={facility.name}
            style={{ borderRadius: 8 }}
          />
        </Box>
      </Box>
    </Card>
  );
}
