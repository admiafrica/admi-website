import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { useRouter } from 'next/router';

import { Title } from '@/components/ui';

type Props = {
  sector: any;
  textColor?: string;
  withBorder?: boolean;
  bgColor?: string;
  defaultBorder?: boolean;
  width?: number;
  height?: number;
};

export default function SectorItemCard({
  sector,
  textColor = 'black',
  withBorder = false,
  bgColor = 'none',
  defaultBorder = true,
  width = 160,
  height = 160,
}: Props) {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/courses/${sector.fields.slug}`);
  };

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder={withBorder}
      w={width}
      h={height}
      className="h-full cursor-pointer"
      onClick={handleCourseClick}
      bg={bgColor}
      bd={defaultBorder ? '1px solid rgba(233, 233, 233, 1)' : '1px solid rgba(255, 255, 255, 0.1)'}
    >
      {sector.icon ? (
        <Box className="flex w-full items-center justify-center">
          <sector.icon width={48} height={48} color={sector.color} />
        </Box>
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
          <Title label={sector.title} size="14px" color={textColor} />
        </Box>
      </Box>
    </Card>
  );
}
