import Link from 'next/link'
import { IconX } from '@tabler/icons-react'

interface IntakeBannerProps {
  visible: boolean
  onDismiss: () => void
}

export default function IntakeBanner({ visible, onDismiss }: IntakeBannerProps) {
  if (!visible) return null

  return (
    <div className="relative flex h-[48px] items-center justify-center bg-admi-black px-4">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-brand-orange" />
        <span className="font-proxima text-sm text-white">
          <span className="hidden sm:inline">Limited Spots Available &mdash; </span>
          Enrolling Now for May &amp; September 2026
        </span>
        <Link
          href="/courses"
          className="ml-1 font-proxima text-sm font-bold text-brand-orange underline underline-offset-2 transition-colors hover:text-white"
        >
          Apply Now
        </Link>
      </div>
      <button
        onClick={onDismiss}
        className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss banner"
      >
        <IconX size={16} />
      </button>
    </div>
  )
}
