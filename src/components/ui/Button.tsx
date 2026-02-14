type Props = {
  label: string
  size: string
  backgroundColor?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  color?: string
  disabled?: boolean
}

export default function Button(props: Props) {
  const { label, size, backgroundColor, onClick, type = 'button', color = 'white', disabled, ...rest } = props

  return (
    <div className="w-full">
      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition"
        style={{
          backgroundColor: backgroundColor || 'admiRed',
          borderRadius: 6
        }}
        onClick={onClick}
        type={type}
        disabled={disabled}
        {...rest}
      >
        <div className="font-nexa">
          <p className="text-gray-700" style={{ fontSize: size, fontWeight: 900, color }}>
            {label}
          </p>
        </div>
      </button>
    </div>
  )
}
