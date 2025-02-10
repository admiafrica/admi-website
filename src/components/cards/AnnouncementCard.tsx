import React from 'react';
import { Box, Card, Pill, Text } from '@mantine/core';
import { Title } from '../ui';
import { motion } from 'framer-motion';

import IconArrowTipRight from '@/assets/icons/ArrowTipRight';
import Image from 'next/image';

type Props = {
  announcement: any;
  title?: string;
  featured?: boolean;
  bgColor?: string;
  arrowColor?: string;
  image?: any;
};

export default function AnnouncementCard(props: Props) {
  return (
    <Card
      className="mx-auto w-full max-w-screen-xl cursor-pointer"
      bg={props.bgColor || 'white'}
      style={{ borderRadius: 8 }}
    >
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        <Box className="flex h-[400px] w-full">
          <Box className="flex w-[40%] flex-col sm:pr-4">
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
            <div className="font-nexa">
              <Text size="26px">{props.announcement.title}</Text>
            </div>
            <div className="grow py-6 font-proxima">
              <Text size="22px">{props.announcement.description}</Text>
            </div>
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
          <Box className="relative flex h-full w-[60%]">
            <Image
              fill
              src={props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
              alt="about course"
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}
