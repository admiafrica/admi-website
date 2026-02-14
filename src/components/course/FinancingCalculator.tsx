import { useState } from 'react'
import Link from 'next/link'
import { IconCurrencyDollar, IconBrandWhatsapp } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

const DIPLOMA_TOTAL_COST = 450000

/**
 * Interactive Financing Calculator
 * Allows prospective students to visualize payment options
 */
export function FinancingCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(15000)
  const [paymentMonths, setPaymentMonths] = useState(30)

  const totalPaid = monthlyPayment * paymentMonths

  return (
    <div className="mb-6 rounded-xl border border-green-300 bg-white bg-gradient-to-br from-green-50 to-white p-8 shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <IconCurrencyDollar size={24} />
          </span>
          <div>
            <p className="text-xl font-bold text-gray-700" style={{ color: '#2f9e44' }}>
              Flexible Payment Plans
            </p>
            <p className="text-sm text-gray-500">
              Standard Diploma: {DIPLOMA_TOTAL_COST.toLocaleString()} KES total (4 semesters + internship)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Monthly Payment Amount</p>
              <div className="flex flex-wrap gap-1">
                <p className="text-2xl font-bold text-gray-700" style={{ color: 'green' }}>
                  {monthlyPayment.toLocaleString()} KES
                </p>
                <p className="text-sm text-gray-500">per month</p>
              </div>
              <input
                type="range"
                className="mt-4 w-full"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                min={10000}
                max={50000}
                step={1000}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>10K</span>
                <span>25K</span>
                <span>50K</span>
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Payment Period</p>
              <div className="flex flex-wrap gap-1">
                <p className="text-2xl font-bold text-gray-700" style={{ color: 'green' }}>
                  {paymentMonths}
                </p>
                <p className="text-sm text-gray-500">months</p>
              </div>
              <input
                type="range"
                className="mt-4 w-full"
                value={paymentMonths}
                onChange={(e) => setPaymentMonths(Number(e.target.value))}
                min={3}
                max={36}
                step={3}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>3mo</span>
                <span>12mo</span>
                <span>24mo</span>
                <span>36mo</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl bg-[#f1f3f5] p-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-500">YOUR INVESTMENT BREAKDOWN</p>

              <div>
                <p className="text-xs text-gray-500">Total Program Cost</p>
                <p className="text-lg font-bold text-gray-700">{DIPLOMA_TOTAL_COST.toLocaleString()} KES</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">You Pay Per Month</p>
                <p className="text-xl font-bold text-gray-700" style={{ color: 'green' }}>
                  {monthlyPayment.toLocaleString()} KES
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Total Paid Over Time</p>
                <p className="text-lg font-bold text-gray-700">{totalPaid.toLocaleString()} KES</p>
              </div>

              <span className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-800">
                Payback Period: 6 months after graduation
              </span>

              <p className="mt-1 text-center text-xs text-gray-500">Based on 75K KES avg. starting salary</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition"
          >
            <IconCurrencyDollar size={18} />
            Apply with Payment Plan
          </Link>

          <a
            href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I need help understanding payment options for diploma programs`}
            className="inline-flex items-center gap-2 rounded-lg border border-green-600 bg-white px-4 py-2 font-medium text-green-700 transition"
            onClick={() => trackWhatsAppClick('courses_financing', 'Financing Calculator')}
            target="_blank"
          >
            <IconBrandWhatsapp size={18} />
            Discuss Financing Options
          </a>
        </div>
      </div>
    </div>
  )
}
