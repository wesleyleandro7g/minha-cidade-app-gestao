'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  PieChart,
  Factory,
  UsersRound,
  Percent,
  Images,
  LayoutList,
  MapPin,
  MapPinned,
} from 'lucide-react'

type AsideItemProps = {
  isActive?: boolean
  label: string
  href: string
  Icon: any
}

function AsideItem({ href, label, isActive, Icon }: AsideItemProps) {
  return (
    <Link href={href}>
      <div
        className='flex py-2 px-4 gap-2 items-center text-gray-600 border-white rounded-full data-[active=true]:font-semibold data-[active=true]:bg-primary/20 data-[active=true]:border-b-0 data-[active=true]:border-primary data-[active=true]:text-primary hover:bg-background duration-200'
        data-active={isActive}
      >
        <Icon className='size-5' />
        <span className='text-sm'>{label}</span>
      </div>
    </Link>
  )
}

export function Aside() {
  const pathName = usePathname()

  const asideItems = [
    { id: 0, label: 'Dashboard', href: '/dashboard', icon: PieChart },
    { id: 1, label: 'Empresas', href: '/empresas', icon: Factory },
    { id: 2, label: 'Usuários', href: '/usuarios', icon: UsersRound },
    { id: 3, label: 'Ofertas', href: '/ofertas', icon: Percent },
    { id: 4, label: 'Banners', href: '/banners', icon: Images },
    { id: 5, label: 'Categorias', href: '/categorias', icon: LayoutList },
    { id: 6, label: 'Cidades', href: '/cidades', icon: MapPin },
  ]

  return (
    <aside className='w-64 border-r-2 border-gray-200 p-4 space-y-7 relative'>
      <div className='flex items-center gap-2'>
        <div className='w-4 h-4 rounded-full bg-primary' />
        <h2>Gerência</h2>
      </div>
      <div className='flex flex-col space-y-2.5'>
        {asideItems.map((item) => {
          return (
            <AsideItem
              key={item.id}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              isActive={pathName.startsWith(item.href)}
            />
          )
        })}
      </div>
      <div className='absolute bottom-6 flex items-center gap-2 text-primary'>
        <MapPinned className='size-5' />
        <span>Minha Cidade</span>
      </div>
    </aside>
  )
}
