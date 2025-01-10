import { Avatar, Card, Group, Rating, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';

import { IconArrowLeft, IconArrowRight, IconChecks } from '@tabler/icons-react';

import classes from '@/styles/Indicator.module.css';
import Image from 'next/image';

type Props = {
  portfolios: any[];
  assets: any[];
  testimonials: any[];
  totalHistoricalEnrollment: number;
};

export default function CourseStudents(props: Props) {
  const showPortfolios = props.portfolios.length >= 1;
  const showTestimonials = props.testimonials.length >= 1;

  return (
    <Group bg={'#BD2D00'}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        {showPortfolios && (
          <div className="mb-8 mt-16 font-nexa text-white">
            <Text size="2em" fw={900}>
              Student Portfolio & Alumni Stories
            </Text>
          </div>
        )}

        {/* Portfolios */}
        {showPortfolios && (
          <div className="h-fit w-full">
            <Carousel
              withIndicators
              slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
              slideGap={{ base: 0, sm: 'md' }}
              loop
              align="start"
              slidesToScroll={1}
              height={'24em'}
              classNames={classes}
              previousControlIcon={<IconArrowLeft />}
              nextControlIcon={<IconArrowRight />}
            >
              {props.portfolios.map((portfolio) => (
                <Carousel.Slide key={portfolio.fields.studentName}>
                  <Card>
                    <Card.Section>
                      <Carousel
                        slideSize={{ base: '100%' }}
                        slideGap={{ base: 0, sm: 'md' }}
                        loop
                        height={270}
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
                            <Text fw={300}>{portfolio.fields.professionalTitle}</Text>
                          </div>
                        </div>
                      </Group>
                    </Card.Section>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        )}

        {/* Testimonials */}
        {showTestimonials && (
          <div className="mb-8 font-nexa text-white">
            <div className="mt-16 flex items-center">
              <Text size="2em" fw={900}>
                Student Reviews & Testimonials
              </Text>
              <div className="grow"></div>
              <div className="flex font-proxima">
                <IconChecks />
                <Text size="1.1em" fw={500} ml={8}>
                  over {props.totalHistoricalEnrollment}+ students have taken this course
                </Text>
              </div>
            </div>
          </div>
        )}

        {showTestimonials && (
          <div className="flex h-fit w-full justify-start">
            {props.testimonials.map((testimonial, index) => (
              <Card className="mb-16 mr-4 h-fit w-1/4" key={`testimonial-${index}`}>
                <Rating value={5} fractions={2} color="admiRed" readOnly className="pl-2" />
                <Card.Section>
                  <div
                    className="mt-1 px-6 font-proxima text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(testimonial.fields.description),
                    }}
                  ></div>
                </Card.Section>
                <div className="mt-8 flex px-2">
                  <Avatar
                    src={`https:${getAssetDetails(props.assets, testimonial.fields.authorImage.sys.id)?.fields.file.url}`}
                    variant="transparent"
                  />
                  <div className="flex flex-col px-4">
                    <div className="font-nexa">
                      <Text fw={900}>{testimonial.fields.authorName}</Text>
                    </div>
                    <div className="font-proxima">
                      <Text fw={500}>{testimonial.fields.authorRole}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Group>
  );
}
