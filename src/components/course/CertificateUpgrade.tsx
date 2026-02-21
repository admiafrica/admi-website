'use client'

import { useRouter } from 'next/router'
import { IconArrowRight, IconCheck, IconRocket, IconSparkles } from '@tabler/icons-react'

type Props = {
  certificateName: string
  certificateFee?: number // e.g., 48000
  diplomaName?: string
  diplomaFee?: number // e.g., 100000 per semester
}

function formatKES(value: number): string {
  return 'KES ' + value.toLocaleString('en-KE')
}

export default function CertificateUpgrade({
  certificateName,
  certificateFee = 48000,
  diplomaName,
  diplomaFee = 100000
}: Props) {
  const router = useRouter()

  // Infer diploma name from certificate name
  const inferredDiplomaName = diplomaName || certificateName.replace('Certificate', 'Diploma')

  // Infer diploma slug from certificate
  const diplomaSlug = inferredDiplomaName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const handleLearnMore = () => {
    router.push(`/courses/${diplomaSlug}`)
  }

  const upgradeAdvantages = [
    'Full certificate fee (KES 48,000) credited to diploma',
    'Advanced industry-level skills & portfolio',
    'Higher earning potential (KES 45K-120K/month)',
    'Woolf University accreditation pathway',
    'Guaranteed internship placement',
    'Access to alumni network & job board'
  ]

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        border: '2px solid #F1FE38'
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-gray-900">
                <IconRocket size={20} />
              </div>
              <span className="rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-gray-900">
                Upgrade Path Available
              </span>
            </div>

            <div>
              <h3 className="font-nexa text-xl font-black text-white">Ready for More? Upgrade to Diploma</h3>
              <p className="mt-1 text-sm text-gray-400">
                Take your {certificateName} skills to the next level with our 2-year diploma program
              </p>
            </div>

            {/* Benefits List */}
            <ul className="flex flex-col gap-2.5">
              {upgradeAdvantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                    <IconCheck size={12} />
                  </span>
                  <span className="text-sm text-white">{advantage}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={handleLearnMore}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-yellow-300"
            >
              Explore Diploma Program
              <IconArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right: Comparison Card */}
        <div className="bg-white/5 p-6 md:w-80 md:p-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-gray-400">Investment Comparison</p>

            {/* Certificate */}
            <div className="rounded-md bg-gray-800 p-4">
              <p className="text-xs text-gray-400">Certificate (4 months)</p>
              <p className="text-lg font-bold text-white">{formatKES(certificateFee)}</p>
              <p className="text-xs text-gray-400">One-time investment</p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <IconSparkles size={24} color="#F1FE38" />
            </div>

            {/* Diploma */}
            <div className="rounded-md border-2 border-[#00D9A5] bg-teal-900 p-4">
              <p className="text-xs text-teal-300">Diploma (2 years)</p>
              <p className="text-lg font-bold text-white">{formatKES(diplomaFee * 4)}</p>
              <p className="text-xs text-teal-400">{formatKES(diplomaFee)} x 4 semesters</p>
              <span className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
                Your KES 48K credited!
              </span>
            </div>

            {/* Upgrade Deadline */}
            <p className="text-center text-xs text-gray-400">Upgrade within 6 months of certificate completion</p>
          </div>
        </div>
      </div>
    </div>
  )
}
