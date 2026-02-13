import Link from 'next/link'
import { Text, Title, Button } from '@mantine/core'

export default function CourseFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 py-12">
      <div className="mx-auto max-w-screen-xl px-4 text-center md:px-20">
        <Title order={3} className="mb-4 font-nexa font-bold text-gray-900">
          Still have questions?
        </Title>
        <Text className="mx-auto mb-8 max-w-2xl font-proxima text-gray-600">
          Our admissions team is here to help you navigate your career path. Book a free consultation or visit our
          campus.
        </Text>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/contact" passHref>
            <Button
              size="lg"
              variant="outline"
              color="dark"
              radius="xl"
              className="font-proxima uppercase transition-transform hover:scale-105"
            >
              Contact Us
            </Button>
          </Link>
          <Link href="/visit" passHref>
            <Button
              size="lg"
              variant="outline"
              color="dark"
              radius="xl"
              className="font-proxima uppercase transition-transform hover:scale-105"
            >
              Book a Campus Visit
            </Button>
          </Link>
        </div>
        <Text className="mt-12 font-proxima text-sm text-gray-500">
          © {new Date().getFullYear()} Africa Digital Media Institute. All rights reserved.
        </Text>
      </div>
    </footer>
  )
}
