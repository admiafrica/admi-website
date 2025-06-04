type Props = {
  color?: string
  width?: number
  height?: number
}

export default function IconSpinner({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 19V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.04887 16.9502L9.17019 14.8289" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.04887 7.04977L9.17019 9.17109" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.9511 7.04977L14.8298 9.17109" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.9511 16.9502L14.8298 14.8289" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
