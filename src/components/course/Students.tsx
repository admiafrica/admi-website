import { useRef } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Avatar, Box, Card, Group, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';
import { UserTestimonialCard } from '../cards';

import { IconArrowLeft, IconArrowRight, IconChecks } from '@tabler/icons-react';

import classes from '@/styles/Indicator.module.css';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Paragraph, Title } from '../ui';

type Props = {
  portfolios: any[];
  assets: any[];
  testimonials: any[];
  totalHistoricalEnrollment: number;
};

export default function CourseStudents(props: Props) {
  const isMobile = useIsMobile();
  const autoplay = useRef(Autoplay({ delay: 6000 }));
  const portfolioAutoplay = useRef(Autoplay({ delay: 8000 }));

  const showPortfolios = props.portfolios.length >= 1;
  const showTestimonials = props.testimonials.length >= 1;

  const enableCarousel = props.portfolios.length >= 3;

  return (
    <Group bg={'#BD2D00'}>
      <div className="max-w-screen-3xl mx-auto w-full">
        {showPortfolios && (
          <div className="mx-auto py-12 max-w-screen-xl px-4">
            <Title size={isMobile ? '24px' : '32px'} label="Student Portfolio & Alumni Stories" color="white" />
          </div>
        )}

        {/* Portfolios */}
        {showPortfolios && (
          <div className="mx-auto h-fit w-full max-w-screen-xl px-4">
            <Carousel
              withControls={false}
              withIndicators={false}
              loop={enableCarousel}
              plugins={enableCarousel ? [autoplay.current] : []}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
              slideGap={{ base: 0, sm: 'md' }}
              align="start"
              slidesToScroll={1}
              height={480}
              classNames={classes}
              previousControlIcon={<IconArrowLeft />}
              nextControlIcon={<IconArrowRight />}
            >
              {props.portfolios.map((portfolio) => {
                return (
                  <Carousel.Slide key={portfolio.fields.studentName}>
                    <Card>
                      <Card.Section>
                        {portfolio.fields.assets ? (
                          <Carousel
                            plugins={[portfolioAutoplay.current]}
                            onMouseEnter={portfolioAutoplay.current.stop}
                            onMouseLeave={portfolioAutoplay.current.reset}
                            slideSize={{ base: '100%' }}
                            slideGap={{ base: 0, sm: 'md' }}
                            loop
                            height={360}
                            align="start"
                            slidesToScroll={1}
                            previousControlIcon={<IconArrowLeft />}
                            nextControlIcon={<IconArrowRight />}
                          >
                            {portfolio.fields.assets.map((portfolioAsset: any) => (
                              <Carousel.Slide key={portfolioAsset.sys.id}>
                                <Image
                                  src={`https:${getAssetDetails(props.assets, portfolioAsset.sys.id)?.fields.file.url}`}
                                  fill
                                  alt="#"
                                />
                              </Carousel.Slide>
                            ))}
                          </Carousel>
                        ) : (
                          <div
                            className="mt-1 h-full min-h-[14em] px-6 font-proxima text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(portfolio.fields.bio),
                            }}
                          ></div>
                        )}
                      </Card.Section>
                      <Card.Section>
                        <Group py={16} bg={'#871F00'} c={'white'}>
                          <Avatar
                            src={`https:${getAssetDetails(props.assets, portfolio.fields.profilePicture.sys.id)?.fields.file.url}`}
                            variant="transparent"
                            size={48}
                            ml={16}
                          />
                          <div className="flex grow flex-col">
                            <div className="font-nexa">
                              <Text fw={900}>{portfolio.fields.studentName}</Text>
                            </div>
                            <div className="font-proxima">
                              <Text>{portfolio.fields.professionalTitle}</Text>
                            </div>
                          </div>
                        </Group>
                      </Card.Section>
                    </Card>
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          </div>
        )}

        {/* Testimonials */}
        {showTestimonials && (
          <div className="mx-auto mb-8 max-w-screen-xl px-4 font-nexa text-white">
            <div className="flex flex-col items-center sm:flex-row py-8">
              <Title
                size={isMobile ? '24px' : '32px'}
                label="Student Reviews & Testimonials"
                color="white"
                className="mt-4"
              />
              <div className="mb-4 grow sm:mb-0"></div>
              <div className="flex">
                <IconChecks />
                <Paragraph>Over {props.totalHistoricalEnrollment}+ Students have taken this course</Paragraph>
              </div>
            </div>
          </div>
        )}

        {showTestimonials && (
          <div className="mx-auto flex h-fit w-full max-w-screen-xl flex-col justify-start px-4 sm:flex-row">
            {props.testimonials.map((testimonial, index) => (
              <Box key={`testimonial-${index}`}>
                <UserTestimonialCard user={testimonial.user} testimonial={testimonial} assets={props.assets} />
              </Box>
            ))}
          </div>
        )}
      </div>
    </Group>
  );
}
