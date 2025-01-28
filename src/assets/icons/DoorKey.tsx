type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function IconDoorKey({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 47} height={height || 47} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.798 35.3287L14.056 38.0787L10.5 34.5127L23.276 21.7127C21.5635 18.1642 22.6896 13.8972 25.9301 11.6559C29.1706 9.41466 33.5605 9.86655 36.2765 12.721C38.9924 15.5754 39.2257 19.9823 36.8262 23.1075C34.4267 26.2327 30.109 27.1454 26.65 25.2587L19.626 32.3027L22.56 35.2467L19.638 38.1767L16.798 35.3287Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.7551 15.937C34.0021 17.1876 34.0001 19.2121 32.7507 20.4603C31.5013 21.7085 29.4768 21.7085 28.2274 20.4603C26.978 19.2121 26.976 17.1876 28.2231 15.937C29.4776 14.6929 31.5006 14.6929 32.7551 15.937Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
