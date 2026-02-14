import { Card, Text } from '@/lib/tw-mantine'
import { Button } from '../ui'

export default function CourseEnrollCard() {
  const handleEnquiry = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) utmParams.append(key, value)
    })

    const queryString = utmParams.toString()
    const enquiryUrl = queryString ? `/enquiry?${queryString}` : '/enquiry'

    window.location.href = enquiryUrl
  }

  return (
    <Card className="z-10 h-fit w-full max-w-screen-xl justify-center md:h-[7.125rem]" bg={'admiShamrok'} radius={6}>
      <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
        <div className="grow pt-3">
          <div className="mb-4 text-center font-nexa md:text-left">
            <Text size="25px" fw={900}>
              Ready to Get Started?
            </Text>
          </div>
          <div className="text-center md:text-left">
            <Text size="1.1em" fw={600}>
              Immerse yourself in a curriculum crafted to cultivate your unique artistic style.
            </Text>
          </div>
        </div>
        <div className="md:py-auto mx-auto py-4">
          <Button size="xl" backgroundColor="admiRed" label="Enroll Today with ADMI" onClick={handleEnquiry} />
        </div>
      </div>
    </Card>
  )
}
