import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Title } from '@/components/ui';
import { getAssetDetails } from '@/utils';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { IContentfulEntry } from '@/types';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';

type Props = {
  sector: any;
};

export default function SectorItemCard({ sector }: Props) {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/v3/courses/${sector.fields.slug}`);
  };

  return (
    <Card
      shadow="lg"
      padding="lg"
      radius="md"
      withBorder
      w={240}
      className="hover:border-1 h-full cursor-pointer hover:border-solid hover:border-admiRed"
      onClick={handleCourseClick}
    >
      {sector.icon ? (
        <Box className="flex w-full items-center justify-center">{sector.icon}</Box>
      ) : (
        <Image
          width={64}
          height={64}
          src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`}
          alt={sector.title}
          style={{ margin: 'auto' }}
        />
      )}
      <Box className="flex h-[60px] w-full">
        <Box className="mx-auto w-fit pt-6 text-center">
          <Title label={sector.title} size="16px" color="black" />
        </Box>
      </Box>
    </Card>
  );
}
