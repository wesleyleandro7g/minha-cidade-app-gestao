import { icons } from 'lucide-react'

type IconName<T extends string> = T extends infer U ? U : never

export type ExtractedIconNames = IconName<keyof typeof icons>

interface IconProps {
  name: ExtractedIconNames
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const LucideIcon = icons[name]

  if (!LucideIcon)
    return (
      <span className='bg-red-300 px-2 py-1 rounded-full text-red-800'>
        icone não reconhecido
      </span>
    )

  return <LucideIcon className={className} />
}
