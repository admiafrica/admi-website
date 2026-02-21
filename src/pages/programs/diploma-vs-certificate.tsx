import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import {
  IconSchool,
  IconCertificate,
  IconTrendingUp,
  IconClock,
  IconCurrencyDollar,
  IconBriefcase,
  IconChartBar,
  IconCheck,
  IconX,
  IconBrandWhatsapp,
  IconArrowRight
} from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

export default function DiplomaVsCertificatePage() {
  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Diploma vs Certificate: Which Program is Right for You?"
        description="Compare ADMI's diploma and certificate programs. Understand the investment, career outcomes, ROI, and make the right choice for your creative career in Kenya."
        keywords="diploma vs certificate, ADMI programs, Kenya creative education, diploma ROI, certificate programs, career comparison"
        url="/programs/diploma-vs-certificate"
      />

      <div className="bg-admi-green text-center text-white">
        <div className="section-container pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-secondary" />
            <span className="section-label text-secondary">CHOOSE YOUR PATH</span>
          </div>
          <h1 className="section-heading-dark mb-4">Diploma vs Certificate Programmes</h1>
          <p className="section-subheading-dark mx-auto max-w-[700px]">
            Discover which programme aligns with your career goals, budget, and timeline. Compare side-by-side to make
            an informed decision.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Quick Decision Matrix */}
        <div className="mb-16 rounded-xl border-2 border-orange-300 p-8 shadow-md">
          <p className="mb-6 text-center text-xl font-bold text-gray-700">Quick Decision Guide</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FFF8F5' }}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <IconSchool size={28} />
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-500">Choose a Diploma if you want:</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="green" className="mt-0.5 shrink-0" />
                  <span>Career transformation &amp; higher salaries (75K/month avg)</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="green" className="mt-0.5 shrink-0" />
                  <span>In-depth mastery of your craft over 2 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="green" className="mt-0.5 shrink-0" />
                  <span>Industry internship &amp; employer connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="green" className="mt-0.5 shrink-0" />
                  <span>12× return on investment in 5 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="green" className="mt-0.5 shrink-0" />
                  <span>Credentials employers trust &amp; recognize</span>
                </li>
              </ul>
              <Link
                href="/apply"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
              >
                <IconSchool size={20} />
                Apply for Diploma
              </Link>
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: '#F0F9FF' }}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <IconCertificate size={28} />
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">Choose a Certificate if you want:</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="blue" className="mt-0.5 shrink-0" />
                  <span>Quick skill acquisition in 3-6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="blue" className="mt-0.5 shrink-0" />
                  <span>Lower upfront investment (48K one-time)</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="blue" className="mt-0.5 shrink-0" />
                  <span>Supplement existing skills or pivot careers</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="blue" className="mt-0.5 shrink-0" />
                  <span>Test the field before committing long-term</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={20} color="blue" className="mt-0.5 shrink-0" />
                  <span>Immediate job readiness for entry-level roles</span>
                </li>
              </ul>
              <Link
                href="/apply"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
              >
                <IconCertificate size={20} />
                Apply for Certificate
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Side-by-Side Comparison */}
        <p className="mb-8 text-center text-2xl font-bold text-gray-700">Comprehensive Program Comparison</p>

        <div className="mb-16 overflow-x-auto rounded-xl p-0 shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left" style={{ width: '30%' }}>
                  <p className="text-lg font-bold text-gray-700">Factor</p>
                </th>
                <th className="p-3 text-left" style={{ width: '35%' }}>
                  <div className="flex flex-wrap items-center gap-1">
                    <IconSchool size={24} color="#FF6B35" />
                    <p className="text-lg font-bold text-orange-500">Diploma Program</p>
                  </div>
                </th>
                <th className="p-3 text-left" style={{ width: '35%' }}>
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCertificate size={24} color="#1971c2" />
                    <p className="text-lg font-bold text-blue-600">Certificate Program</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Investment */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCurrencyDollar size={20} />
                    <p className="font-semibold text-gray-700">Total Investment</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-lg font-bold text-orange-500">450,000 KES</p>
                  <p className="text-sm text-gray-500">(Standard diploma)</p>
                  <p className="text-xs text-gray-500">320K for GD/Content Creation</p>
                </td>
                <td className="p-3">
                  <p className="text-lg font-bold text-blue-600">48,000 KES</p>
                  <p className="text-sm text-gray-500">(One-time payment)</p>
                </td>
              </tr>

              {/* Monthly Payment */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCurrencyDollar size={20} />
                    <p className="font-semibold text-gray-700">Monthly Payment</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-semibold text-gray-700">15,000 KES/month</p>
                  <p className="text-sm text-gray-500">Over 30 months (or pay per semester)</p>
                </td>
                <td className="p-3">
                  <p className="font-semibold text-gray-700">48,000 KES upfront</p>
                  <p className="text-sm text-gray-500">Or 24K × 2 installments</p>
                </td>
              </tr>

              {/* Duration */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconClock size={20} />
                    <p className="font-semibold text-gray-700">Program Duration</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-semibold text-gray-700">2 years (5 semesters)</p>
                  <p className="text-sm text-gray-500">4 academic + 1 internship</p>
                </td>
                <td className="p-3">
                  <p className="font-semibold text-gray-700">3-6 months (1 term)</p>
                  <p className="text-sm text-gray-500">Condensed intensive format</p>
                </td>
              </tr>

              {/* Starting Salary */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconTrendingUp size={20} />
                    <p className="font-semibold text-gray-700">Avg. Starting Salary</p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                    75,000 KES/month
                  </span>
                  <p className="mt-1 text-sm text-gray-500">100K/month by year 2</p>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                    35,000 KES/month
                  </span>
                  <p className="mt-1 text-sm text-gray-500">45K/month by year 2</p>
                </td>
              </tr>

              {/* Employment Rate */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconBriefcase size={20} />
                    <p className="font-semibold text-gray-700">Employment Rate</p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold text-white">
                    85% in 3 months
                  </span>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
                    68% in 3-6 months
                  </span>
                </td>
              </tr>

              {/* Payback Period */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconChartBar size={20} />
                    <p className="font-semibold text-gray-700">Payback Period</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-bold text-green-600">6 months</p>
                  <p className="text-sm text-gray-500">After graduation at 75K/month</p>
                </td>
                <td className="p-3">
                  <p className="font-bold text-blue-600">1-2 months</p>
                  <p className="text-sm text-gray-500">At 35K/month (but lower ceiling)</p>
                </td>
              </tr>

              {/* 5-Year Earnings */}
              <tr className="bg-green-50">
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconTrendingUp size={20} />
                    <p className="font-bold text-gray-700">5-Year Total Earnings</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-xl font-bold text-green-600">5,400,000 KES</p>
                  <p className="text-sm text-gray-500">12× return on investment</p>
                </td>
                <td className="p-3">
                  <p className="text-lg font-bold text-blue-600">2,460,000 KES</p>
                  <p className="text-sm text-gray-500">51× ROI but lower absolute earnings</p>
                </td>
              </tr>

              {/* Lifetime Earnings Gap */}
              <tr className="bg-orange-50">
                <td className="p-3">
                  <p className="font-bold text-orange-500">Earnings Difference</p>
                </td>
                <td className="p-3" colSpan={2}>
                  <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold text-orange-500">+2,940,000 KES more with a diploma</p>
                    <p className="text-sm text-gray-500">
                      Over 5 years, diploma grads earn 2.94M KES more than certificate holders. The diploma costs 402K
                      more, but you earn back <strong>7.3× that difference</strong>.
                    </p>
                  </div>
                </td>
              </tr>

              {/* Internship */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <p className="font-semibold text-gray-700">Industry Internship</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCheck size={20} color="green" />
                    <p className="font-semibold text-green-600">Required (3 months)</p>
                  </div>
                  <p className="text-sm text-gray-500">Many convert to job offers</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconX size={20} color="gray" />
                    <p className="text-gray-500">Not included</p>
                  </div>
                </td>
              </tr>

              {/* Equipment */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <p className="font-semibold text-gray-700">Equipment Access</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCheck size={20} color="green" />
                    <p className="text-gray-700">Industry-standard hardware</p>
                  </div>
                  <p className="text-sm text-gray-500">Full studio access for practice</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCheck size={20} color="blue" />
                    <p className="text-gray-700">Basic equipment provided</p>
                  </div>
                  <p className="text-sm text-gray-500">Limited to class hours</p>
                </td>
              </tr>

              {/* Career Support */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <p className="font-semibold text-gray-700">Career Support</p>
                </td>
                <td className="p-3">
                  <ul className="space-y-1 text-sm">
                    <li>Job placement assistance</li>
                    <li>Resume &amp; portfolio reviews</li>
                    <li>500+ employer connections</li>
                    <li>LinkedIn profile optimization</li>
                  </ul>
                </td>
                <td className="p-3">
                  <ul className="space-y-1 text-sm">
                    <li>Basic job search tips</li>
                    <li>Portfolio guidance</li>
                  </ul>
                </td>
              </tr>

              {/* Working Professional Friendly */}
              <tr className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">
                  <p className="font-semibold text-gray-700">Working Professional Friendly</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCheck size={20} color="green" />
                    <p className="text-gray-700">Yes - Evening &amp; weekend options</p>
                  </div>
                  <p className="text-sm text-gray-500">60% of students work full-time</p>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconCheck size={20} color="blue" />
                    <p className="text-gray-700">Yes - Flexible schedules</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ROI Visualization */}
        <div className="mb-16 rounded-xl bg-gradient-to-br from-green-50 to-white p-8 shadow-md">
          <p className="mb-4 text-center text-2xl font-bold text-gray-700">Return on Investment (ROI) Analysis</p>
          <p className="mb-8 text-center text-gray-500">See how your investment pays back over time</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Diploma ROI */}
            <div className="rounded-xl border-2 border-orange-300 p-6 shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <IconSchool size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-500">Diploma ROI</p>
                    <p className="text-sm text-gray-500">Standard Program (450K)</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="mb-1 text-xs text-gray-500">INVESTMENT</p>
                  <p className="text-2xl font-bold text-orange-500">450,000 KES</p>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">PAYBACK PERIOD</p>
                  <span className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                    6 months after graduation
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="mb-1 text-sm font-semibold text-gray-700">Earnings Timeline:</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-gray-700">Year 1-2 (75K/month)</p>
                      <p className="text-sm font-semibold text-gray-700">1,800,000 KES</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-gray-700">Year 3-5 (100K/month)</p>
                      <p className="text-sm font-semibold text-gray-700">3,600,000 KES</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-2">
                      <p className="font-bold text-gray-700">5-Year Total</p>
                      <p className="text-xl font-bold text-green-600">5,400,000 KES</p>
                    </div>
                  </div>
                </div>

                <span className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                  12× Return on Investment
                </span>
              </div>
            </div>

            {/* Certificate ROI */}
            <div className="rounded-xl border-2 border-blue-300 p-6 shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <IconCertificate size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-blue-600">Certificate ROI</p>
                    <p className="text-sm text-gray-500">All Programs (48K)</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="mb-1 text-xs text-gray-500">INVESTMENT</p>
                  <p className="text-2xl font-bold text-blue-600">48,000 KES</p>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">PAYBACK PERIOD</p>
                  <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    1-2 months after completion
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="mb-1 text-sm font-semibold text-gray-700">Earnings Timeline:</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-gray-700">Year 1-2 (35K/month)</p>
                      <p className="text-sm font-semibold text-gray-700">840,000 KES</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-gray-700">Year 3-5 (45K/month)</p>
                      <p className="text-sm font-semibold text-gray-700">1,620,000 KES</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-2">
                      <p className="font-bold text-gray-700">5-Year Total</p>
                      <p className="text-xl font-bold text-blue-600">2,460,000 KES</p>
                    </div>
                  </div>
                </div>

                <span className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  51× Return on Investment
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl p-6" style={{ backgroundColor: '#FFF3E0' }}>
            <div className="flex flex-wrap items-center gap-2">
              <IconTrendingUp size={32} color="#FF6B35" />
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-lg font-bold text-gray-700">The Diploma Advantage</p>
                <p className="text-sm text-gray-700">
                  While certificate programs offer a higher ROI percentage (51× vs 12×), diploma graduates earn{' '}
                  <strong>2.94 million KES more</strong> in absolute terms over 5 years. That&apos;s enough to:
                </p>
                <ul className="mt-1 space-y-1 text-sm">
                  <li>Buy a car (1.5M KES)</li>
                  <li>Make a down payment on property (1M KES)</li>
                  <li>Start your own studio/business (400K KES)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Still Unsure? */}
        <div className="rounded-xl bg-gradient-to-r from-orange-50 to-blue-50 p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-2xl font-bold text-gray-700">Still unsure which path is right for you?</p>
            <p className="max-w-[600px] text-center text-lg text-gray-500">
              Our admissions team will help you evaluate your goals, budget, and timeline to make the best decision for
              your future.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I need help choosing between diploma and certificate programs`}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-4 text-lg font-medium text-white hover:bg-green-700"
                onClick={() => trackWhatsAppClick('comparison_page', 'Diploma vs Certificate Page')}
                target="_blank"
              >
                <IconBrandWhatsapp size={24} />
                Chat with Advisor on WhatsApp
              </a>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-500 px-8 py-4 text-lg font-medium text-orange-500 hover:bg-orange-50"
              >
                <IconArrowRight size={24} />
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
