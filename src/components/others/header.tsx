'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  Store,
  UserRound,
  Settings,
  ChevronDown,
} from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  const options = [
    { id: 0, label: 'Painel', path: '/panel', icon: LayoutGrid },
    { id: 1, label: 'Empresas', path: '/stores', icon: Store },
    { id: 2, label: 'Usuários', path: '/users', icon: UserRound },
    { id: 3, label: 'Configurações', path: '/settings', icon: Settings },
  ]

  return (
    <header className='flex w-full justify-center bg-white p-4 border-b-2 border-gray-300'>
      <div className='flex w-full max-w-screen-2xl gap-8 justify-between items-center'>
        <div className='flex justify-center gap-8'>
          <h1 className='text-lg font-bold'>Minha Cidade</h1>

          <div className='flex space-x-2 items-center'>
            {options.map((page) => (
              <Link key={page.id} href={page.path}>
                <div
                  data-active={pathname.startsWith(page.path)}
                  className='flex py-1 px-4 gap-2 items-center text-gray-600 border-white rounded-full data-[active=true]:font-semibold data-[active=true]:bg-primary/20 data-[active=true]:border-b-0 data-[active=true]:border-primary data-[active=true]:text-primary hover:bg-background'
                >
                  <page.icon className='size-4' />
                  <span className='text-md'>{page.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className='flex space-x-2 items-center'>
          <button className='flex justify-center items-center gap-1 h-8 px-4 lowercase text-sm text-primary bg-primary/20 rounded-full'>
            wesley leandro
            <ChevronDown className='size-4' />
          </button>
        </div>
      </div>
    </header>
  )
}
