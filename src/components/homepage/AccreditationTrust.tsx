const BADGES = [
  {
    letter: 'W',
    bgColor: 'bg-[#1a1a4e]',
    borderColor: 'border-[#1a1a4e]/25',
    name: 'Woolf University',
    details: ['EU-Accredited Credits', 'ECTS Transfer System', 'Degree Pathway Partner']
  },
  {
    letter: 'K',
    bgColor: 'bg-[#006B3F]',
    borderColor: 'border-[#006B3F]/25',
    name: 'TVETA Kenya',
    details: ['Government Registered', 'National Accreditation', 'Recognized Qualification']
  }
] as const

export default function AccreditationTrust() {
  return (
    <section className="w-full border-y border-[#e8e0d8] bg-warm">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-[60px]">
        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
          <span className="section-label-light">Accreditation &amp; Recognition</span>
          <h2 className="mb-4 font-nexa text-3xl font-black text-[#171717] md:text-4xl">
            Internationally Recognised Qualifications
          </h2>
          <p className="max-w-[700px] font-proxima text-base leading-relaxed text-[#666]">
            ADMI is accredited through Woolf University (EU) and registered with TVETA Kenya. Your
            qualification is recognised by employers and universities worldwide.
          </p>
        </div>

        {/* Badges - Desktop */}
        <div className="hidden items-start justify-center gap-0 md:flex">
          {BADGES.map((badge, index) => (
            <div key={badge.name} className="flex items-start">
              {/* Badge Card */}
              <div className="flex w-[280px] flex-col items-center gap-3">
                {/* Circle */}
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full border-[3px] ${badge.bgColor} ${badge.borderColor}`}
                >
                  <span className="font-nexa text-4xl font-black text-white">{badge.letter}</span>
                </div>

                {/* Name */}
                <span className="font-proxima text-lg font-bold text-[#171717]">{badge.name}</span>

                {/* Details */}
                <div className="flex flex-col items-center gap-0.5">
                  {badge.details.map((detail) => (
                    <span key={detail} className="font-proxima text-sm leading-relaxed text-[#999]">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider (not after last item) */}
              {index < BADGES.length - 1 && <div className="mx-6 mt-8 h-[100px] w-px shrink-0 bg-[#e0e0e0]" />}
            </div>
          ))}
        </div>

        {/* Badges - Mobile */}
        <div className="flex flex-col items-center gap-0 md:hidden">
          {BADGES.map((badge, index) => (
            <div key={badge.name} className="flex flex-col items-center">
              {/* Badge Card */}
              <div className="flex flex-col items-center gap-3 py-6">
                {/* Circle */}
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full border-[3px] ${badge.bgColor} ${badge.borderColor}`}
                >
                  <span className="font-nexa text-4xl font-black text-white">{badge.letter}</span>
                </div>

                {/* Name */}
                <span className="font-proxima text-lg font-bold text-[#171717]">{badge.name}</span>

                {/* Details */}
                <div className="flex flex-col items-center gap-0.5 text-center">
                  {badge.details.map((detail) => (
                    <span key={detail} className="font-proxima text-sm leading-relaxed text-[#999]">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              {/* Horizontal Divider (not after last item) */}
              {index < BADGES.length - 1 && <div className="h-px w-[200px] bg-[#e0e0e0]" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
