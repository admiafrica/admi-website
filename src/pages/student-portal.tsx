import Link from 'next/link'
import { IconExternalLink } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudentPortalPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Student Portal | ADMI"
        description="Access your ADMI student portal for courses, grades, and resources."
      />

      <div className="w-full">
        {/* ── Portal Body ── */}
        <section className="flex min-h-[700px] items-center justify-center bg-[#F3F4F6] px-4 py-16 xl:px-20">
          <div className="w-full max-w-[440px] rounded-2xl bg-white p-10 shadow-lg">
            {/* Logo */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red">
                <span className="font-proxima text-[32px] font-bold text-white">A</span>
              </div>
              <div className="text-center">
                <h1 className="font-proxima text-[32px] font-bold text-admi-black">Student Portal</h1>
                <p className="mt-1 font-proxima text-[16px] text-[#666]">Access your courses, grades and resources</p>
              </div>
            </div>

            {/* Fields */}
            <div className="mt-8 space-y-4">
              <div>
                <label className="font-proxima text-[14px] font-semibold text-[#333]">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="mt-2 w-full rounded-lg border border-[#d0d0d0] px-4 py-3.5 font-proxima text-[14px] text-[#333] outline-none transition focus:border-brand-red"
                />
              </div>
              <div>
                <label className="font-proxima text-[14px] font-semibold text-[#333]">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-lg border border-[#d0d0d0] px-4 py-3.5 font-proxima text-[14px] text-[#333] outline-none transition focus:border-brand-red"
                />
              </div>
            </div>

            {/* Login Button */}
            <Link
              href="https://portal.admi.ac.ke"
              target="_blank"
              className="mt-6 flex w-full items-center justify-center rounded-[10px] bg-brand-red py-4 font-proxima text-[16px] font-semibold text-white transition hover:bg-[#a02730]"
            >
              Login
            </Link>

            {/* Forgot Password */}
            <p className="mt-4 text-center">
              <Link href="#" className="font-proxima text-[14px] font-medium text-brand-red">
                Forgot password?
              </Link>
            </p>

            {/* External Note */}
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-4 py-3">
              <IconExternalLink size={16} className="flex-shrink-0 text-[#666]" />
              <span className="font-proxima text-[13px] text-[#666]">Portal is hosted externally at portal.admi.ac.ke</span>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
