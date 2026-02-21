'use client'

import { useState } from 'react'
import { IconCalculator, IconCheck, IconInfoCircle, IconPercentage } from '@tabler/icons-react'

type Props = {
  tuitionFees: string // e.g., "KES 100,000" or just the number
  isDiploma?: boolean
  totalSemesters?: number
}

function formatKES(value: number): string {
  return 'KES ' + value.toLocaleString('en-KE')
}

export default function PaymentCalculator({ tuitionFees, isDiploma = true, totalSemesters = 4 }: Props) {
  const [paymentOption, setPaymentOption] = useState<'upfront' | 'installment'>('installment')

  // Extract numeric value from tuition string
  const extractAmount = (str: string): number => {
    const match = str.replace(/,/g, '').match(/\d+/)
    return match ? parseInt(match[0]) : isDiploma ? 100000 : 48000
  }

  const semesterFee = extractAmount(tuitionFees)
  const upfrontDiscount = 0.1 // 10% discount for full payment

  // Payment plans
  const plans = {
    upfront: {
      total: semesterFee * (1 - upfrontDiscount),
      savings: semesterFee * upfrontDiscount,
      payments: [{ label: 'Full Payment', amount: semesterFee * (1 - upfrontDiscount), due: 'Before classes start' }]
    },
    installment: {
      total: semesterFee,
      savings: 0,
      payments: [
        { label: 'First Installment (50%)', amount: semesterFee * 0.5, due: 'Before classes start' },
        { label: 'Second Installment (30%)', amount: semesterFee * 0.3, due: 'Week 6' },
        { label: 'Final Installment (20%)', amount: semesterFee * 0.2, due: 'Week 12' }
      ]
    }
  }

  const currentPlan = plans[paymentOption]

  // Calculate monthly equivalent for marketing
  const monthlyEquivalent = Math.ceil(semesterFee / 4)

  return (
    <div className="rounded-lg border-2 border-[#00D9A5] bg-white p-6 shadow-md">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
              <IconCalculator size={20} />
            </div>
            <div>
              <p className="text-lg font-bold">Payment Options</p>
              <p className="text-sm text-gray-500">Flexible plans to suit your budget</p>
            </div>
          </div>
          <div className="group relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <IconInfoCircle size={16} />
            </div>
            <div className="absolute right-0 top-full z-10 mt-1 hidden w-48 rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
              50/30/20 split across the semester
            </div>
          </div>
        </div>

        {/* Payment Toggle */}
        <div className="flex w-full rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setPaymentOption('upfront')}
            className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              paymentOption === 'upfront' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <IconPercentage size={16} />
            <span>Pay Upfront (Save 10%)</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentOption('installment')}
            className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              paymentOption === 'installment' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <IconCalculator size={16} />
            <span>Installment Plan</span>
          </button>
        </div>

        {/* Semester Fee Display */}
        <div className="rounded-md bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Semester Tuition Fee</span>
            <span className="text-xl font-black">{formatKES(semesterFee)}</span>
          </div>
          {isDiploma && <p className="mt-1 text-xs text-gray-500">~ {formatKES(monthlyEquivalent)} per month</p>}
        </div>

        {/* Payment Breakdown */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Payment Schedule:</p>
          {currentPlan.payments.map((payment, index) => (
            <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <IconCheck size={12} />
                </div>
                <div>
                  <p className="text-sm font-medium">{payment.label}</p>
                  <p className="text-xs text-gray-500">{payment.due}</p>
                </div>
              </div>
              <span className="font-bold">{formatKES(payment.amount)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className={`rounded-md p-4 ${paymentOption === 'upfront' ? 'bg-teal-50' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Semester Total</p>
              {currentPlan.savings > 0 && (
                <p className="text-xs font-semibold text-teal-600">You save {formatKES(currentPlan.savings)}!</p>
              )}
            </div>
            <span className={`text-xl font-black ${paymentOption === 'upfront' ? 'text-teal-600' : ''}`}>
              {formatKES(currentPlan.total)}
            </span>
          </div>
        </div>

        {/* Diploma Total Investment */}
        {isDiploma && (
          <div className="rounded-md bg-gray-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Total Diploma Investment</p>
                <p className="text-xs text-gray-400">{totalSemesters} semesters (2 years)</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-[#F1FE38]">{formatKES(currentPlan.total * totalSemesters)}</p>
                {paymentOption === 'upfront' && (
                  <p className="text-xs text-teal-400">Save {formatKES(currentPlan.savings * totalSemesters)} total</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
