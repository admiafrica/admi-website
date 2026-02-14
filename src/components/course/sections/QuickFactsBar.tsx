interface QuickFactsBarProps {
  facts: { label: string; value: string }[]
}

export default function QuickFactsBar({ facts }: QuickFactsBarProps) {
  return (
    <section className="w-full bg-[#f5f5f5] px-4 py-7 md:px-20" aria-label="Quick facts">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-wrap items-center justify-around gap-4">
          {facts.map((fact, index) => (
            <div key={`fact-${index}`} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="font-proxima text-xl font-bold text-brand-red md:text-2xl">{fact.value}</span>
                <span className="font-proxima text-[13px] font-medium text-[#555555]">{fact.label}</span>
              </div>
              {/* Divider - hidden on last item */}
              {index < facts.length - 1 && (
                <div className="hidden h-10 w-px bg-[#e0e0e0] md:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
