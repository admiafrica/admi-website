import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { Button, Paragraph, Title } from '@/components/ui'
export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    // Log 404 errors for monitoring (optional)
    if (typeof window !== 'undefined') {
      console.log('404 Error:', window.location.href)

      // Optional: Send to analytics
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'page_not_found', {
          page_location: window.location.href,
          page_title: '404 - Page Not Found'
        })
      }
    }
  }, [])

  const handleGoHome = () => {
    router.push('/')
  }

  const handleGoToCourses = () => {
    router.push('/courses')
  }

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Page Not Found - ADMI"
        description="The page you're looking for doesn't exist. Explore ADMI's courses and programs instead."
      />

      <div className="flex min-h-[60vh] items-center justify-center bg-[#F5FFFD]">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mb-8">
            <Title label="404" size="72px" color="#002A23" className="mb-4 font-bold" />
            <Title label="Page Not Found" size="32px" color="#002A23" className="mb-6" />
            <Paragraph className="mb-8 text-lg text-gray-600" fontFamily="font-nexa">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back
              on track to explore ADMI&apos;s amazing courses and programs.
            </Paragraph>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="w-full sm:w-auto">
              <Button size="lg" backgroundColor="admiRed" label="Go to Homepage" onClick={handleGoHome} />
            </div>
            <div className="w-full sm:w-auto">
              <Button size="lg" backgroundColor="admiShamrok" label="Browse Courses" onClick={handleGoToCourses} />
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Paragraph className="text-sm text-gray-500" fontFamily="font-nexa">
              Looking for something specific? Try our{' '}
              <span className="cursor-pointer text-admiRed hover:underline" onClick={() => router.push('/courses')}>
                course search
              </span>{' '}
              or{' '}
              <span className="cursor-pointer text-admiRed hover:underline" onClick={() => router.push('/contact')}>
                contact us
              </span>{' '}
              for assistance.
            </Paragraph>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
