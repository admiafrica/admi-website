type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function IconSettingGear({ color = 'black', width, height }: Props) {
  return (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5039 12C14.5039 13.1046 13.6085 14 12.5039 14C11.3993 14 10.5039 13.1046 10.5039 12C10.5039 10.8954 11.3993 10 12.5039 10C13.6085 10 14.5039 10.8954 14.5039 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.76801 18.1003L5.25301 12.8133C4.91566 12.2907 4.91566 11.6189 5.25301 11.0963L7.75201 5.89229C8.13454 5.32445 8.77844 4.98876 9.46301 5.00029H12.502H15.541C16.2256 4.98876 16.8695 5.32445 17.252 5.89229L19.746 11.0923C20.0834 11.6149 20.0834 12.2867 19.746 12.8093L17.236 18.1003C16.8537 18.674 16.2053 19.0133 15.516 19.0003H9.48701C8.79805 19.013 8.15011 18.6737 7.76801 18.1003Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
