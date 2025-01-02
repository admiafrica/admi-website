import { Avatar, Card, Group, Image, Rating, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

type Props = {
  testimonials: any[];
};
export default function CourseStudents(props: Props) {
  return (
    <Group bg={'#BD2D00'} py={32}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="mb-8 font-nexa text-white">
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
                    <Avatar src="image.png" variant="transparent" />
                    <div className="flex flex-col">
                      <Text fw={500}>Emmanuel Chege</Text>
                      <Text fw={500}>Course Name</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
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
                    <Avatar src="image.png" variant="transparent" />
                    <div className="flex flex-col">
                      <Text fw={500}>Emmanuel Chege</Text>
                      <Text fw={500}>Course Name</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
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
                    <Avatar src="image.png" variant="transparent" />
                    <div className="flex flex-col">
                      <Text fw={500}>Emmanuel Chege</Text>
                      <Text fw={500}>Course Name</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
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
                    <Avatar src="image.png" variant="transparent" />
                    <div className="flex flex-col">
                      <Text fw={500}>Emmanuel Chege</Text>
                      <Text fw={500}>Course Name</Text>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
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
                    <Avatar src="image.png" variant="transparent" />
                    <div className="flex flex-col">
                      <div className="font-nexa">
                        <Text fw={900}>Emmanuel Chege</Text>
                      </div>
                      <div className="font-proxima">
                        <Text fw={500}>Course Name</Text>
                      </div>
                    </div>
                  </Group>
                </Card.Section>
              </Card>
            </Carousel.Slide>
          </Carousel>
        </div>

        {/* Testimonials */}
        <div className="mb-8 font-nexa text-white">
          <Text size="2em" fw={900}>
            Student Reviews & Testimonials
          </Text>
        </div>

        <div className="flex h-fit w-full justify-start">
          {props.testimonials.map((testimonial, index) => (
            <Card className="mr-4 w-1/4" key={`testimonial-${index}`}>
              <Rating value={5} fractions={2} color="admiRed" readOnly />
              <Card.Section>
                <div className="flex flex-col">
                  <Text fw={500} px={16} pt={8}>
                    {testimonial.fields.description}
                  </Text>
                </div>
              </Card.Section>
              <div className="mt-8 flex">
                <Avatar src="image.png" variant="transparent" />
                <div className="flex flex-col">
                  <div className="font-nexa">
                    <Text fw={900}>{testimonial.fields.author}</Text>
                  </div>
                  {/* <div className="font-proxima">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                  </div> */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Group>
  );
}
