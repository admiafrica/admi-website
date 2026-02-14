import { useMediaQuery } from './useMediaQuery'

export function useIsMobile(): boolean {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return isMobile || false
}
