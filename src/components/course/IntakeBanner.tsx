'use client'

import { useEffect, useState } from 'react'
import { IconCalendar, IconClock, IconSparkles } from '@tabler/icons-react'

type Props = {
  intakeDate: string // e.g., "May 19, 2026"
  earlyBirdDeadline?: string // e.g., "April 15, 2026"
  earlyBirdDiscount?: number // e.g., 10
  isDiploma?: boolean
}

export default function IntakeBanner({
  intakeDate,
  earlyBirdDeadline,
  earlyBirdDiscount = 10,
  isDiploma = true
}: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const [isEarlyBird, setIsEarlyBird] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const earlyBird = earlyBirdDeadline ? new Date(earlyBirdDeadline) : null
      const intake = new Date(intakeDate)

      // Check if early bird is still active
      const targetDate = earlyBird && now < earlyBird ? earlyBird : intake
      setIsEarlyBird(earlyBird ? now < earlyBird : false)

      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [intakeDate, earlyBirdDeadline])

  return (
    <div
      className="w-full px-6 py-4"
      style={{
        background: isEarlyBird
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
        borderBottom: isEarlyBird ? '3px solid #F1FE38' : '3px solid #00D9A5'
      }}
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left: Intake Info */}
          <div className="flex items-center gap-3">
            <IconCalendar size={24} color="#00D9A5" />
            <div>
              <p className="text-sm text-gray-400">Next Intake</p>
              <p className="text-lg font-bold text-white">{intakeDate}</p>
            </div>
          </div>

          {/* Center: Countdown */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-black text-[#F1FE38]">{timeLeft.days}</p>
              <p className="text-xs text-gray-400">Days</p>
            </div>
            <span className="text-xl text-gray-400">:</span>
            <div className="text-center">
              <p className="text-xl font-black text-[#F1FE38]">{timeLeft.hours}</p>
              <p className="text-xs text-gray-400">Hours</p>
            </div>
            <span className="text-xl text-gray-400">:</span>
            <div className="text-center">
              <p className="text-xl font-black text-[#F1FE38]">{timeLeft.minutes}</p>
              <p className="text-xs text-gray-400">Mins</p>
            </div>
          </div>

          {/* Right: Early Bird or CTA */}
          {isEarlyBird && isDiploma ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-black"
              style={{ background: 'linear-gradient(90deg, #F1FE38, #00D9A5)' }}
            >
              <IconSparkles size={16} />
              Early Bird: {earlyBirdDiscount}% OFF until {earlyBirdDeadline}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <IconClock size={20} color="#FF6B6B" />
              <span className="text-sm font-medium text-white">
                {timeLeft.days < 30 ? 'Limited spots remaining!' : 'Secure your spot today'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
