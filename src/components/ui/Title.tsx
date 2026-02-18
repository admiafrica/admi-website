import clsx from 'clsx'

type Props = {
  label: string
  size?: string
  onClick?: () => void
  color?: string
  className?: string
}

export default function Title({ label, size, color = 'admiRed', className = '' }: Props) {
  return (
    <div className={clsx('w-fit font-nexa', className)}>
      <p className="text-gray-700" style={{ fontSize: size ? size : '2em', fontWeight: 900, color }}>
        {label}
      </p>
    </div>
  )
}
