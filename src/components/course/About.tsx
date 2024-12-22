// 2
import { Card, Image, Text, Group } from '@mantine/core';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';

export default function CourseAbout() {
  return (
    <div className="w-full pt-32 max-w-screen-2xl mx-auto px-4">
      <div className="flex w-full">
        <div className="flex w-1/2 flex-col">
          <div className="font-nexa text-admiRed">
            <Text size="2em" fw={600}>
              About this course
            </Text>
          </div>
          <div className="font-proxima">
            <Text size="lg" fw={600}>
              This comprehensive program is designed to equip you with the
              skills, knowledge, and industry connections needed to thrive in
              the dynamic world of digital animation. From 2D and 3D animation
              to motion graphics and visual effects, you'll master every aspect
              of the animation process.
            </Text>
          </div>
          <div className="mt-8 font-proxima">
            <Text size="lg">
              Throughout this diploma, you'll work with industry-standard
              software and equipment, learning from experienced professionals
              who are active in the field. You'll develop your unique artistic
              style while gaining proficiency in cutting-edge animation
              techniques. Whether your goal is to create captivating animated
              films, design eye-catching motion graphics for advertising, or
              craft immersive visual experiences for games and interactive
              media, this course will provide you with the tools and expertise
              to bring your creative vision to life. 
            </Text>
          </div>
        </div>
        <div className="flex w-1/2 flex-col">
          <Card shadow="sm" padding="lg" radius="md" withBorder className='w-[64%] mx-auto'>
            <Card.Section>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group mt="md" mb="xs">
              <IconCheck size={20} className="text-admiRed" />
              <Text fw={400}>High School:KCSE C-</Text>
            </Group>

            <Group mt="md" mb="xs">
              <IconCheck size={20} className="text-admiRed" />
              <Text fw={400}>Basic computer proficiancy is required</Text>
            </Group>

            <Group mt="md" mb="xs">
              <IconCheck size={20} className="text-admiRed" />
              <Text fw={400}>Full time - 4 semesters + 1 semster internship intakes</Text>
            </Group>
            <Card.Section>
              <Group px={20} py={16} bg={'admiOrangeLight'}>
                <IconExclamationCircle size={20} className="text-white" />
                <Text fw={400} c={'white'}>Norway Fjord Adventures</Text>
              </Group>
            </Card.Section>
          </Card>
        </div>
      </div>
    </div>
  );
}
