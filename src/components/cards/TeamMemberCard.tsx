type TeamMemberCardProps = {
  name: string
  role: string
  image: string
  description?: string
  roleColor?: string
  variant?: 'light' | 'white'
}

function getInitials(name: string) {
  if (!name) return ''
  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}

export default function TeamMemberCard({
  name,
  role,
  image,
  description,
  roleColor = '#C1272D',
  variant = 'light'
}: TeamMemberCardProps) {
  const bg = variant === 'light' ? 'bg-[#F9F9F9]' : 'bg-white'

  return (
    <article className={`overflow-hidden rounded-lg border border-[#e8e8e8] ${bg}`}>
      <div className="h-[300px] w-full overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 font-proxima text-3xl font-bold text-gray-500">
            {getInitials(name)}
          </div>
        )}
      </div>
      <div className="px-4 py-4">
        <h3 className="font-proxima text-[18px] font-bold text-[#171717]">{name}</h3>
        <p className="mt-1 font-proxima text-[13px] font-semibold" style={{ color: roleColor }}>
          {role}
        </p>
        {description && <p className="mt-1.5 font-proxima text-[13px] leading-[1.6] text-[#666]">{description}</p>}
      </div>
    </article>
  )
}
