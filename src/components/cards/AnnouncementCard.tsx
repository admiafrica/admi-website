import React from 'react';
import { Box, Card, Pill } from '@mantine/core';
import { Paragraph, Title } from '../ui';
import { motion } from 'framer-motion';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  announcement: any;
  title?: string;
  featured?: boolean;
  bgColor?: string;
  arrowColor?: string;
  image?: any;
};

export default function AnnouncementCard(props: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    if (props.announcement.category == 'News') {
      router.push(`/v3/news-events/news/${props.announcement.slug}`);
    }
    if (props.announcement.category == 'Resources') {
      router.push(`/v3/resources/${props.announcement.slug}`);
    }
  };
  return (
    <Card
      className="mx-auto w-full max-w-screen-xl cursor-pointer"
      bg={props.bgColor || 'white'}
      style={{ borderRadius: 8 }}
      onClick={handleCardClick}
    >
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        <Box className="flex h-fit w-full flex-col-reverse px-4 sm:h-[400px] sm:flex-row">
          <Box className="flex flex-col pt-6 sm:w-[40%] sm:pr-4">
            {props.featured && (
              <Pill
                size="md"
                className="mb-4 w-fit font-nexa font-black"
                bg={'white'}
                style={{ border: '2px solid rgba(0, 0, 0, 0.14)' }}
                h={28}
              >
                Featured
              </Pill>
            )}
            {props.title && <Title label={props.title} color="black" />}

            <Paragraph size="26px" fontFamily="font-nexa" fontWeight={400}>
              {props.announcement.title}
            </Paragraph>

            <Paragraph size="18px" className="grow py-6" fontFamily="font-nexa">
              {props.announcement.summary}
            </Paragraph>

            {/* Arrow Icon with Animation */}
            <motion.div
              className="my-auto flex h-fit sm:items-center"
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
              <IconArrowTipRight width={48} height={48} color={props.arrowColor} />
            </motion.div>
          </Box>
          <Box className="relative flex h-[180px] sm:h-full sm:w-[60%]">
            {props.announcement.coverImage ? (
              <Image
                fill
                src={`https:${props.announcement.coverImage.fields.file.url}`}
                alt={props.announcement.title}
                style={{ borderRadius: 8 }}
              />
            ) : (
              <Image
                fill
                src={props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                alt="about course"
                style={{ borderRadius: 8 }}
              />
            )}
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}
