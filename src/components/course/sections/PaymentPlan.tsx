interface PaymentPlanProps {
  plan: {
    installments: {
      label: string
      percentage: string
      amount: string
      description: string
    }[]
    totalPerSemester: string
    discountMessage: string
  }
}

export default function PaymentPlan({ plan }: PaymentPlanProps) {
  if (!plan.installments.length) return null

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-light">Semester Fees &amp; Payment</span>
          <h2 className="section-heading-light mb-4">Flexible Payment, Per Semester</h2>
          <p className="max-w-[800px] font-proxima text-[17px] leading-[1.6] text-[#555555]">
            Pay per semester with our convenient 3-installment plan. No shocking lump sums — just manageable payments
            aligned to your academic calendar.
          </p>
        </div>

        {/* Installment Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plan.installments.map((installment, index) => {
            const isFirst = index === 0
            return (
              <article
                key={index}
                className={`flex flex-col items-center gap-4 rounded-2xl p-8 shadow-md transition-shadow hover:shadow-xl ${
                  isFirst ? 'border-2 border-brand-red bg-[#FFF5F5]' : 'border border-[#e0e0e0] bg-[#f9f9f9]'
                }`}
              >
                {/* Badge */}
                <span
                  className={`rounded-[20px] px-5 py-2 font-proxima text-[13px] font-bold text-white ${
                    isFirst ? 'bg-brand-red' : 'bg-[#444444]'
                  }`}
                >
                  {installment.label}
                </span>

                {/* Amount */}
                <span className={`font-proxima text-4xl font-bold ${isFirst ? 'text-brand-red' : 'text-[#171717]'}`}>
                  {installment.amount}
                </span>

                {/* When */}
                <span className="font-proxima text-[15px] font-semibold text-[#666666]">{installment.percentage}</span>

                {/* Note */}
                <p className="text-center font-proxima text-sm leading-[1.5] text-[#888888]">
                  {installment.description}
                </p>
              </article>
            )
          })}
        </div>

        {/* Fee Note */}
        <p className="mb-6 text-center font-proxima text-sm leading-[1.5] text-[#999999]">{plan.totalPerSemester}</p>

        {/* Upfront Discount Banner */}
        <div className="flex items-center justify-center gap-3 rounded-xl border-2 border-secondary bg-[#8EBFB015] px-8 py-5">
          <span className="text-2xl">💰</span>
          <span className="font-proxima text-base font-semibold text-[#171717]">{plan.discountMessage}</span>
        </div>
      </div>
    </section>
  )
}
