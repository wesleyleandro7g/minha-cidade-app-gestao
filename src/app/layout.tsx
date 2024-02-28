import './globals.css'

import type { Metadata } from 'next'
import { AppProvider } from '@/providers/app-provider'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minha Cidade App | Gestão',
  description: 'Encontre tudo o que você precisa na sua cidade!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <AppProvider>
        <body className={nunito.className}>{children}</body>
      </AppProvider>
    </html>
  )
}
