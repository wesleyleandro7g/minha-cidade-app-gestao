import { Aside } from '@/components/aside'
import Header from '@/components/others/header'
import { User } from 'lucide-react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex w-full min-h-screen overflow-hidden bg-white'>
      <Aside />
      <div className='w-full'>
        <Header />
        <main className='flex w-full max-w-screen-2xl h-full p-4 overflow-auto'>
          {children}
        </main>
      </div>
    </div>
  )
}
