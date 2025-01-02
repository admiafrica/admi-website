import { Avatar, Card, Group, Image, Rating, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconChecks } from '@tabler/icons-react';

type Props = {
  portfolios: any[];
  testimonials: any[];
};

export default function CourseStudents(props: Props) {
  const showPortfolios = props.portfolios.length > 1;
  const showTestimonials = props.testimonials.length > 1;

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
              height={'20em'}
            >
              {props.portfolios &&
                props.portfolios.map((portfolio) => (
                  <Carousel.Slide key={portfolio.author}>
                    <Card>
                      <Card.Section>
                        <Image
                          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                          height={200}
                          alt="Norway"
                        />
                      </Card.Section>
                      <Card.Section>
                        <Group py={8} bg={'#871F00'} c={'white'}>
                          <Avatar src="image.png" variant="transparent" ml={16} />
                          <div className="flex grow flex-col">
                            <div className="font-nexa">
                              <Text fw={900}>{portfolio.author}</Text>
                            </div>
                            <div className="font-proxima">
                              <Text fw={300}>{portfolio.course}</Text>
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
                  over 500+ students have taken this course
                </Text>
              </div>
            </div>
          </div>
        )}

        {showTestimonials && (
          <div className="flex h-fit w-full justify-start">
            {props.testimonials.map((testimonial, index) => (
              <Card className="mb-16 mr-4 w-1/4" key={`testimonial-${index}`}>
                <Rating value={testimonial.review} fractions={2} color="admiRed" readOnly />
                <Card.Section>
                  <div className="flex flex-col">
                    <Text fw={500} px={16} pt={8}>
                      {testimonial.description}
                    </Text>
                  </div>
                </Card.Section>
                <div className="mt-8 flex">
                  <Avatar src="image.png" variant="transparent" />
                  <div className="flex flex-col">
                    <div className="font-nexa">
                      <Text fw={900}>{testimonial.author}</Text>
                    </div>
                    <div className="font-proxima">
                      <Text fw={500}>{testimonial.title}</Text>
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
