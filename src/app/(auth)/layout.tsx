import Header from '@/components/others/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col w-full min-h-screen items-center overflow-hidden'>
      <Header />
      <main className='flex w-full max-w-screen-2xl h-full p-4 bg-background overflow-auto'>
        {children}
      </main>
    </div>
  )
}
