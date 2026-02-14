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
    <div
      className="z-10 h-fit w-full max-w-screen-xl justify-center rounded-xl border border-gray-200 bg-white shadow-sm md:h-[7.125rem]"
      style={{ backgroundColor: 'var(--admi-shamrok, #08F6CF)', borderRadius: 6 }}
    >
      <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
        <div className="grow pt-3">
          <div className="mb-4 text-center font-nexa md:text-left">
            <p className="text-gray-700" style={{ fontSize: '25px', fontWeight: 900, color: 'inherit' }}>
              Ready to Get Started?
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-gray-700" style={{ fontSize: '1.1em', fontWeight: 600, color: 'inherit' }}>
              Immerse yourself in a curriculum crafted to cultivate your unique artistic style.
            </p>
          </div>
        </div>
        <div className="md:py-auto mx-auto py-4">
          <Button size="xl" backgroundColor="admiRed" label="Enroll Today with ADMI" onClick={handleEnquiry} />
        </div>
      </div>
    </div>
  )
}
