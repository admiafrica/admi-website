import Link from 'next/link'

export default function CourseFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 py-12">
      <div className="section-container text-center">
        <h3 className="mb-4 font-nexa text-2xl font-bold text-gray-900">Still have questions?</h3>
        <p className="mx-auto mb-8 max-w-2xl font-proxima text-gray-600">
          Our admissions team is here to help you navigate your career path. Book a free consultation or visit our
          campus.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[8px] border border-gray-400 bg-white px-6 py-3 font-proxima font-medium uppercase text-gray-900 transition-transform hover:scale-105"
          >
            Contact Us
          </Link>
          <Link
            href="/visit"
            className="inline-flex items-center gap-2 rounded-[8px] border border-gray-400 bg-white px-6 py-3 font-proxima font-medium uppercase text-gray-900 transition-transform hover:scale-105"
          >
            Book a Campus Visit
          </Link>
        </div>
        <p className="mt-12 font-proxima text-sm text-gray-500">
          © {new Date().getFullYear()} Africa Digital Media Institute. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
