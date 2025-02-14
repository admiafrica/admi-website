type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function IconCamera({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 49} height={height || 49} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 12.5H24.5C28.9183 12.5 32.5 16.0817 32.5 20.5V20.75L36.38 18.324C37.6131 17.5533 39.1673 17.5125 40.4391 18.2174C41.7109 18.9223 42.5 20.2619 42.5 21.716V27.284C42.5029 28.7395 41.7149 30.0818 40.4426 30.7886C39.1702 31.4955 37.6143 31.4554 36.38 30.684L32.5 28.25V28.5C32.5 32.9183 28.9183 36.5 24.5 36.5H14.5C10.0817 36.5 6.5 32.9183 6.5 28.5V20.5C6.5 16.0817 10.0817 12.5 14.5 12.5Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 28.5C17.2909 28.5 15.5 26.7091 15.5 24.5C15.5 22.2909 17.2909 20.5 19.5 20.5C21.7091 20.5 23.5 22.2909 23.5 24.5C23.5 25.5609 23.0786 26.5783 22.3284 27.3284C21.5783 28.0786 20.5609 28.5 19.5 28.5Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32.5 20.75V28.25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
