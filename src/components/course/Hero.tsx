import { Badge, Card, Text } from '@mantine/core';
import { Button } from '../ui';

// 1.
export default function CourseHero() {
  return (
    <div className="relative h-[60vh] w-full bg-gray-300 px-4">
      {/* Floating Card */}
      <Card
        className="absolute left-1/2 top-[35rem] z-10 h-fit w-[92vw] -translate-x-1/2 transform justify-center shadow-lg md:h-[7.125rem] md:w-[60rem]"
        bg={'admiShamrok'}
        radius={6}
      >
        <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
          <div className="pt-3 md:w-[70%]">
            <div className="flex grow">
              <div>
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100}>
                    Duration
                  </Text>
                  <Text size="16px" fw={600}>
                    Duration
                  </Text>
                </div>
              </div>
              <div className="px-4 text-center md:text-left">
                <Text size="16px" fw={100}>
                  Credit Hours
                </Text>
                <Text size="16px" fw={600}>
                  Credit Hours
                </Text>
              </div>
              <div className="px-4 text-center md:text-left">
                <Text size="16px" fw={100}>
                  Award Level
                </Text>
                <Text size="16px" fw={600}>
                  Award Level
                </Text>
              </div>
            </div>
          </div>
          <div className="md:py-auto mx-auto py-4 md:w-[30%]">
            <Button size="xl" backgroundColor="admiRed" label="Get in Touch" />
          </div>
        </div>
      </Card>
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="w-1/2 pt-32">
          <Badge>Diploma Courses</Badge>
          <div className="font-nexa">
            <Text size="60px" fw={900}>
              Animation & Motion Graphics
            </Text>
          </div>
          <div className="mt-8 font-proxima">
            <Text size="1em">Unleash your creativity</Text>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
