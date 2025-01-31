import React from 'react';
import Image from 'next/image';
import { Box, Card, Image as MantineImage, Text } from '@mantine/core';
import { Title } from '../ui';
import { motion } from 'framer-motion';

import IconArrowTipRight from '@/assets/icons/arrow-tip-right.svg';

type Props = {
  announcement: any;
  title?: string;
};

export default function AnnouncementCard(props: Props) {
  return (
    <Card className="mx-auto w-full max-w-screen-2xl">
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        <Box className="flex w-full">
          <Box className="flex w-[40%] flex-col">
            <Title label={props.title || 'Announcements'} color="black" />
            <div className="font-nexa">
              <Text size="26px">{props.announcement.title}</Text>
            </div>
            <div className="py-6 font-proxima">
              <Text size="22px">{props.announcement.description}</Text>
            </div>
            {/* Arrow Icon with Animation */}
            <motion.div
              className="my-auto flex h-full sm:items-center"
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
              <Image width={36} height={36} src={IconArrowTipRight} alt="arrow" />
            </motion.div>
          </Box>
          <Box className="flex w-[60%]">
            <MantineImage
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              alt="about course"
              height={'100%'}
              width={'100%'}
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}
