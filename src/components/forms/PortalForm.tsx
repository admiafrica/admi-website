import Image from 'next/image'
import { Anchor, Box, Card, Group } from '@/lib/tw-mantine'
import { Button, Paragraph, Title } from '../ui'
import { STUDENT_PORTAL_LOGIN } from '@/utils'

import ImageFormBackground from '@/assets/images/student-portal-bg.jpeg'

export default function PortalForm() {
  return (
    <Card className="relative h-full w-full bg-white p-4 sm:p-8" bd={'4px solid #FFFFFF38'} radius="md">
      {/* Background Image */}
      <Image
        src={ImageFormBackground}
        placeholder="empty"
        alt="Join Network"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        className="absolute inset-0 z-0"
        style={{ objectFit: 'cover', transform: 'scaleX(-1)', objectPosition: '75% 5%' }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="z-5 absolute inset-0"
        style={{
          background:
            'linear-gradient(170.72deg, rgba(1, 198, 165, 0) 22.23%, rgba(4, 3, 0, 0.8) 89.36%),linear-gradient(218.97deg, rgba(246, 8, 52, 0.8) 7.01%, rgba(246, 8, 52, 0) 49.52%)'
        }}
      ></div>
      <div className="relative mb-0 mt-auto">
        <Title label="How to Access" color="white" size="24px" />
        <Box className="flex pb-4">
          <Title label="the" color="white" size="24px" className="pr-1" />
          <Title label="Student Portal" color="#F1FE37" size="24px" />
        </Box>
        <Paragraph className="pb-6 text-white">
          To access the Student Portal, simply log in using your student credentials.
        </Paragraph>
        <Paragraph className="pb-6 text-white">
          If you are a new student, you will receive your login details during orientation. If you encounter any issues
          accessing the portal, please contact our IT support team for assistance.
        </Paragraph>
        <Group justify="flex-end" mt="2em" className="w-full" p={0}>
          <Anchor href={STUDENT_PORTAL_LOGIN} target="_blank" className="w-full">
            <Button size="lg" backgroundColor="admiRed" label="Student Portal Login" />
          </Anchor>
        </Group>
      </div>
    </Card>
  )
}
