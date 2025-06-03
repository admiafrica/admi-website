type Props = {
  color?: string
  width?: number
  height?: number
}

export default function IconDesktop({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00108 7.7288V12.8708C4.95464 14.7167 6.41225 16.2513 8.25808 16.2998H15.7431C17.5893 16.2518 19.0475 14.7171 19.0011 12.8708V7.7288C19.0475 5.88292 17.5899 4.34833 15.7441 4.2998H8.25808C6.41225 4.34833 4.95464 5.88292 5.00108 7.7288Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 19.2998H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
