import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Paragraph, ParagraphContentful } from '@/components/ui';
import { getAssetDetails } from '@/utils';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { IContentfulEntry } from '@/types';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';

type Props = {
  course: IContentfulEntry;
};

export default function NewsItemCard({ course }: Props) {
  const router = useRouter();

  const handleNewsClick = () => {
    router.push(`/v3/news-events/news/${course.fields.slug}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="hover:border-1 h-full cursor-pointer hover:border-solid hover:border-admiRed"
      onClick={handleNewsClick}
    >
      <motion.div
        whileHover="hover" // Shared hover animation key
        className="h-full"
      >
        <Card.Section className="relative h-[50%]">
          <Image
            fill
            src={
              course.assets
                ? `https:${getAssetDetails(course.assets, course.fields.coverImage.sys.id)?.fields.file.url}`
                : `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`
            }
            alt={course.fields.name}
          />
        </Card.Section>
        <Box className="flex h-[60px]">
          <Box className="grow pt-4">
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="20px">
              {course.fields.name}
            </Paragraph>
            <ParagraphContentful className='line-clamp-[2]'>{course.fields.description}</ParagraphContentful>
            {/* Arrow Icon with Animation */}
            <motion.div
              className="my-auto mt-2 flex h-full mr-0 ml-auto w-fit"
              variants={{
                hover: { x: 20 },
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 0.5,
              }}
            >
              <IconArrowTipRight width={36} height={36} color={'#F60834'} />
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}
