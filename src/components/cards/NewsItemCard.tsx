import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Paragraph } from '@/components/ui';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { IContentfulEntry } from '@/types';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';

type Props = {
  item: IContentfulEntry;
};

export default function NewsItemCard({ item }: Props) {
  const router = useRouter();

  const handleNewsClick = () => {
    router.push(`/v3/news-events/news/${item.fields.slug}`);
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
              item.assets
                ? `https:${item.fields.coverImage.fields.file.url}`
                : `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png`
            }
            alt={item.fields.title}
          />
        </Card.Section>
        <Box className="flex h-[60px]">
          <Box className="grow pt-4">
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="20px" className='pb-4'>
              {item.fields.title}
            </Paragraph>
            <Paragraph className="line-clamp-[3]" size="16px">
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
      </motion.div>
    </Card>
  );
}
