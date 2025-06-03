import { useMediaQuery } from '@mantine/hooks'

export function useIsMobile(): boolean {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return isMobile || false
}
