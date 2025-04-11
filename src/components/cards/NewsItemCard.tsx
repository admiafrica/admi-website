import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Paragraph } from '@/components/ui';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { IContentfulEntry } from '@/types';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';
import { formatDate } from '@/utils';

type Props = {
  item: IContentfulEntry;
  isEvent?: boolean;
};

export default function NewsItemCard({ item, isEvent = false }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    if (item.fields.category == 'News') {
      router.push(`/news-events/news/${item.fields.slug}`);
    }
    if (item.fields.category == 'Resources') {
      router.push(`/resources/${item.fields.slug}`);
    }
  };

  return (
    <motion.div
      className="h-full"
      whileHover="hover" // Shared hover animation key
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="hover:border-1 h-full cursor-pointer hover:border-solid hover:border-admiRed"
        onClick={handleCardClick}
      >
        <Card.Section className={isEvent ? 'relative h-[80%] overflow-hidden' : 'relative h-[50%] overflow-hidden'}>
          <motion.div
            className="relative h-full w-full"
            variants={{
              hover: { scale: 1.1 },
            }} // Zoom effect for the image
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Image
              fill
              priority
              src={
                item.assets
                  ? `https:${item.fields.coverImage?.fields.file.url || item.fields.flyer?.fields.file.url}`
                  : `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`
              }
              alt={item.fields.title}
            />
          </motion.div>
        </Card.Section>
        <Box className="flex">
          <Box className="grow pt-4">
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="20px" className="line-clamp-3 h-[60px] pb-4">
              {item.fields.title}
            </Paragraph>
            {isEvent && (
              <Paragraph fontFamily="font-nexa" fontWeight={400} size="16px" className="mt-2">
                {formatDate(item.fields.date)}
              </Paragraph>
            )}
            <Paragraph className="line-clamp-4 pt-2" size="16px">
              {item.fields.summary}
            </Paragraph>
            {/* Arrow Icon with Animation */}
            <motion.div
              className="my-auto ml-auto mr-0 mt-2 flex h-full w-fit"
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
      </Card>
    </motion.div>
  );
}
