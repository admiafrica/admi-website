type Props = {
  color?: string
  width?: number
  height?: number
}

export default function IconBrowser({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.48438 14.5608C12.0014 10.8328 15.5014 13.1668 18.5184 14.5608"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
