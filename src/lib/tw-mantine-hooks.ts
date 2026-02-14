"use client"

import { useEffect, useState } from 'react'
import { useHeadroom as useLocalHeadroom } from '@/hooks/useHeadroom'
import { useMediaQuery as useLocalMediaQuery } from '@/hooks/useMediaQuery'

export const useMediaQuery = useLocalMediaQuery
export const useHeadroom = useLocalHeadroom

export function useDisclosure(initial = false): [boolean, { open: () => void; close: () => void; toggle: () => void }] {
  const [opened, setOpened] = useState(initial)
  return [opened, { open: () => setOpened(true), close: () => setOpened(false), toggle: () => setOpened((v) => !v) }]
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}
