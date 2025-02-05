type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function IconMouse({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 24} height={height || 25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 10.5C7 7.73858 9.23858 5.5 12 5.5C14.7614 5.5 17 7.73858 17 10.5V14.5C17 17.2614 14.7614 19.5 12 19.5C9.23858 19.5 7 17.2614 7 14.5V10.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9.5V11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
