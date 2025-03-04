import React from 'react';
import { Anchor, Box, Card, Divider, Pill } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Button, Paragraph, Title } from '../ui';
import { useIsMobile } from '@/hooks/useIsMobile';
import { formatDate } from '@/utils';

import IconLocation from '@/assets/icons/map-marker-3-black.svg';
import IconCall from '@/assets/icons/call-black.svg';
import IconStopwatch from '@/assets/icons/stopwatch-black.svg';

type Props = {
  announcement: any;
  title?: string;
  featured?: boolean;
  bgColor?: string;
  arrowColor?: string;
  textColor?: string;
  image?: any;
};

export default function EventAnnouncementCard(props: Props) {
  const isMobile = useIsMobile();
  const googleMapsUrl = `https://www.google.com/maps?q=${props.announcement.location.lat},${props.announcement.location.lon}`;

  return (
    <Card
      className="mx-auto w-full max-w-screen-lg cursor-pointer"
      bg={props.bgColor || 'white'}
      style={{ borderRadius: 8 }}
      withBorder
    >
      <motion.div
        className="flex h-full w-full flex-col sm:flex-row"
        whileHover="hover" // Shared hover animation key
      >
        <Box className="flex h-fit w-full grow flex-col-reverse px-0 sm:h-[400px] sm:flex-row sm:px-4">
          <Box className="flex flex-col pt-4 sm:pr-4 sm:pt-0">
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
            <Box className="flex w-full flex-col">
              <Box className="flex w-full flex-row">
                <Box className={'relative my-auto h-[120px] w-[200px]'}>
                  <Image
                    fill
                    src={`https:${props.announcement.logo?.fields.file.url}`}
                    alt={props.announcement.title}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Divider color="admiRed" size={2} orientation="vertical" mx={isMobile ? 12 : 24} my={'auto'} h={80} />
                <Title
                  label={props.announcement.title}
                  color="black"
                  size={isMobile ? '18px' : '24px'}
                  className="my-auto w-fit"
                />
              </Box>
              <Anchor href={googleMapsUrl} target="_blank" rel="noopener noreferrer" mt={32}>
                <Box className="flex w-full">
                  <Image src={IconLocation} height={24} width={24} alt="location" className="mr-2 mt-1" />
                  <Paragraph
                    size="18px"
                    fontFamily="font-nexa"
                    fontWeight={400}
                    className={`text-${props.textColor || 'black'} py-2`}
                  >
                    <strong>Location:</strong> Caxton House, 3rd Floor, Kenyatta AveDate
                  </Paragraph>
                </Box>
              </Anchor>
              <Box className="flex w-full">
                <Image src={IconCall} height={24} width={24} alt="location" className="mr-2 mt-1" />
                <Paragraph
                  size="18px"
                  fontFamily="font-nexa"
                  fontWeight={400}
                  className={`text-${props.textColor || 'black'} py-2`}
                >
                  <strong>Date:</strong> {formatDate(props.announcement.date)}
                </Paragraph>
              </Box>
              <Box className="flex w-full">
                <Image src={IconStopwatch} height={24} width={24} alt="location" className="mr-2 mt-1" />
                <Paragraph
                  size="18px"
                  fontFamily="font-nexa"
                  fontWeight={400}
                  className={`text-${props.textColor || 'black'} py-2`}
                >
                  <strong>Time:</strong> {props.announcement.time}
                </Paragraph>
              </Box>
            </Box>
          </Box>
          <Box className="ml-auto mr-0 w-full sm:w-[300px]">
            <Box className="relative mb-4 flex h-[300px] w-full flex-col">
              {props.announcement.flyer ? (
                <Image
                  fill
                  src={`https:${props.announcement.flyer?.fields.file.url}`}
                  alt={props.announcement.title}
                  style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                />
              ) : (
                <Image
                  fill
                  src={
                    props.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
                  }
                  alt="about course"
                  style={{ borderRadius: 8 }}
                />
              )}
            </Box>
            {props.announcement.link && (
              <Anchor href={props.announcement.link} target="_blank">
                <Button size="lg" backgroundColor="admiRed" label="Register" />
              </Anchor>
            )}
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}
