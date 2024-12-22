import { Card, Group, Image, Rating, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconUser } from '@tabler/icons-react';

// 5
export default function CourseStudents() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4">
      <div className="font-nexa">
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
        >
          <Carousel.Slide>
            <Card>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Group mt={8}>
                <IconUser />
                <div className="flex flex-col">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Text fw={500}>Norway Fjord Adventures</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
          <Carousel.Slide>
            <Card className="w-[30em]">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Group mt={8}>
                <IconUser />
                <div className="flex grow flex-col">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Text fw={500}>Norway Fjord Adventures</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
          <Carousel.Slide>
            <Card className="w-[30em]">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Group mt={8}>
                <IconUser />
                <div className="flex grow flex-col">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Text fw={500}>Norway Fjord Adventures</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
          <Carousel.Slide>
            <Card className="w-[30em]">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Group mt={8}>
                <IconUser />
                <div className="flex grow flex-col">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Text fw={500}>Norway Fjord Adventures</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
          <Carousel.Slide>
            <Card className="w-[30em]">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Group mt={8}>
                <IconUser />
                <div className="flex grow flex-col">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Text fw={500}>Norway Fjord Adventures</Text>
                </div>
              </Group>
            </Card>
          </Carousel.Slide>
        </Carousel>
      </div>

      {/* Testimonials */}
      <div className="flex w-full flex-wrap">
        <Card className="w-[30em]">
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
        <Card className="w-[30em]">
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
        <Card className="w-[30em]">
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
  );
}
