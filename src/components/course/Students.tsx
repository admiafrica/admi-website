import { Card, Group, Image, Rating, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { IconUser } from '@tabler/icons-react';

// 5
export default function CourseStudents() {
  return (
    <Group bg={'#BD2D00'} py={32}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="font-nexa text-white">
          <Text size="2em" fw={900}>
            Student Portfolio & Alumni Stories
          </Text>
        </div>

        {/* Portfolios */}
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
            <Carousel.Slide>
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
                    <IconUser />
                    <div className="flex flex-col">
                      <Text fw={500}>Norway Fjord Adventures</Text>
                      <Text fw={500}>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card className="w-[30em]">
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={200}
                    alt="Norway"
                  />
                </Card.Section>
                <Card.Section>
                  <Group py={8} bg={'#871F00'} c={'white'}>
                    <IconUser />
                    <div className="flex grow flex-col">
                      <Text fw={500}>Norway Fjord Adventures</Text>
                      <Text fw={500}>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card className="w-[30em]">
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={200}
                    alt="Norway"
                  />
                </Card.Section>
                <Card.Section>
                  <Group py={8} bg={'#871F00'} c={'white'}>
                    <IconUser />
                    <div className="flex grow flex-col">
                      <Text fw={500}>Norway Fjord Adventures</Text>
                      <Text fw={500}>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card className="w-[30em]">
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={200}
                    alt="Norway"
                  />
                </Card.Section>
                <Card.Section>
                  <Group py={8} bg={'#871F00'} c={'white'}>
                    <IconUser />
                    <div className="flex grow flex-col">
                      <Text fw={500}>Norway Fjord Adventures</Text>
                      <Text fw={500}>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card className="w-[30em]">
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={200}
                    alt="Norway"
                  />
                </Card.Section>
                <Card.Section>
                  <Group py={8} bg={'#871F00'} c={'white'}>
                    <IconUser />
                    <div className="flex grow flex-col">
                      <Text fw={500}>Norway Fjord Adventures</Text>
                      <Text fw={500}>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
          </Carousel>
        </div>

        {/* Testimonials */}
        <div className="font-nexa text-white">
          <Text size="2em" fw={900}>
            Student Reviews & Testimonials
          </Text>
        </div>

        <div className="flex h-fit w-full">
          <Card className="mx-auto w-1/4">
            <Rating value={5} fractions={2} readOnly />
            <Card.Section>
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Card.Section>
            <Group mt={8}>
              <IconUser />
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Group>
          </Card>
          <Card className="mx-auto w-1/4">
            <Rating value={5} fractions={2} readOnly />
            <Card.Section>
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Card.Section>
            <Group mt={8}>
              <IconUser />
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Group>
          </Card>
          <Card className="mx-auto w-1/4">
            <Rating value={5} fractions={2} readOnly />
            <Card.Section>
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Card.Section>
            <Group mt={8}>
              <IconUser />
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Group>
          </Card>
          <Card className="mx-auto w-1/4">
            <Rating value={5} fractions={2} readOnly />
            <Card.Section>
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Card.Section>
            <Group mt={8}>
              <IconUser />
              <div className="flex grow flex-col">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Text fw={500}>Norway Fjord Adventures</Text>
              </div>
            </Group>
          </Card>
        </div>
      </div>
    </Group>
  );
}
