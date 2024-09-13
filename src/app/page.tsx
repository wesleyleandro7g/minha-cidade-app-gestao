'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='flex flex-col gap-4 md:w-[420px]'>
        <div>
          <h1 className='text-4xl font-bold text-black'>Minha Cidade APP</h1>
          <p>Home page building in progress...</p>
        </div>

        <Link href='/sign-in'>
          <Button type='submit' className='w-full text-white bg-primary'>
            Acessar tela de login
          </Button>
        </Link>
      </div>
    </main>
  )
}
