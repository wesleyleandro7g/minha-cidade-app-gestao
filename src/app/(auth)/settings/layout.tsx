'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, MapPin } from 'lucide-react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex w-full pb-4'>
        <h1 className='text-2xl font-semibold text-gray-950'>Configurações</h1>
      </div>

      <div className='flex flex-1 gap-4'>
        <aside className='flex flex-col space-y-2 w-[220px]'>
          <Link href='/settings/category'>
            <div
              data-active={pathname.startsWith('/settings/category')}
              className='flex py-1 px-4 gap-2 items-center text-gray-900 rounded-full data-[active=true]:font-semibold data-[active=true]:bg-primary/20 data-[active=true]:border-b-0 data-[active=true]:border-primary data-[active=true]:text-primary hover:bg-gray-300'
            >
              <LayoutGrid className='size-4' />
              <span className='text-md'>Categorias</span>
            </div>
          </Link>
          <Link href='/settings/city'>
            <div
              data-active={pathname.startsWith('/settings/city')}
              className='flex py-1 px-4 gap-2 items-center text-gray-900 rounded-full data-[active=true]:font-semibold data-[active=true]:bg-primary/20 data-[active=true]:border-b-0 data-[active=true]:border-primary data-[active=true]:text-primary hover:bg-gray-300'
            >
              <MapPin className='size-4' />
              <span className='text-md'>Cidades</span>
            </div>
          </Link>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  )
}
