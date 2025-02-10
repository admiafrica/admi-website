type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function IconHomeAlt({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 48} height={height || 48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.254 14.1469L19.718 11.1069C22.3826 9.63105 25.6194 9.63105 28.284 11.1069L33.748 14.1469C36.3556 15.5724 37.9838 18.3011 38 21.2729V29.6369C37.996 31.9256 37.0386 34.1092 35.358 35.6629C33.7359 37.1726 31.6 38.0085 29.384 38.0009H18.616C16.4 38.0085 14.2641 37.1726 12.642 35.6629C10.9614 34.1092 10.004 31.9256 10 29.6369V21.2729C10.0166 18.3007 11.6456 15.5718 14.254 14.1469Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.3359 38.0012V35.2012C19.3359 32.6237 21.4254 30.5342 24.0029 30.5342C26.5805 30.5342 28.6699 32.6237 28.6699 35.2012V38.0012"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
