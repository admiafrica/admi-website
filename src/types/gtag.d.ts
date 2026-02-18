// Global gtag type declaration for Google Analytics & Google Ads
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set' | 'js',
      targetOrAction: string | Date,
      params?: Record<string, any>
    ) => void
    dataLayer: any[]
    va?: (event: string, name: string, data?: any) => void
    fbq?: (...args: any[]) => void
  }
}

export {}
