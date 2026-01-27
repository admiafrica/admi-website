'use client'

import { useEffect, useState } from 'react'
import { Badge, Group, Paper, Text } from '@mantine/core'
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
    <Paper
      className="w-full"
      py="md"
      px="lg"
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
          <Group gap="md">
            <IconCalendar size={24} color="#00D9A5" />
            <div>
              <Text size="sm" c="dimmed">
                Next Intake
              </Text>
              <Text size="lg" fw={700} c="white">
                {intakeDate}
              </Text>
            </div>
          </Group>

          {/* Center: Countdown */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <Text size="xl" fw={900} c="#F1FE38">
                {timeLeft.days}
              </Text>
              <Text size="xs" c="dimmed">
                Days
              </Text>
            </div>
            <Text size="xl" c="dimmed">
              :
            </Text>
            <div className="text-center">
              <Text size="xl" fw={900} c="#F1FE38">
                {timeLeft.hours}
              </Text>
              <Text size="xs" c="dimmed">
                Hours
              </Text>
            </div>
            <Text size="xl" c="dimmed">
              :
            </Text>
            <div className="text-center">
              <Text size="xl" fw={900} c="#F1FE38">
                {timeLeft.minutes}
              </Text>
              <Text size="xs" c="dimmed">
                Mins
              </Text>
            </div>
          </div>

          {/* Right: Early Bird or CTA */}
          {isEarlyBird && isDiploma ? (
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: '#F1FE38', to: '#00D9A5', deg: 90 }}
              leftSection={<IconSparkles size={16} />}
              style={{ color: '#000' }}
            >
              Early Bird: {earlyBirdDiscount}% OFF until {earlyBirdDeadline}
            </Badge>
          ) : (
            <Group gap="xs">
              <IconClock size={20} color="#FF6B6B" />
              <Text size="sm" c="white" fw={500}>
                {timeLeft.days < 30 ? 'Limited spots remaining!' : 'Secure your spot today'}
              </Text>
            </Group>
          )}
        </div>
      </div>
    </Paper>
  )
}
