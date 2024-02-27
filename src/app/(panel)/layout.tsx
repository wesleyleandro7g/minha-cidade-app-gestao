export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex w-full h-screen'>
      <aside className='w-[240px] bg-primary p-5'>
        <h1>Painel</h1>
        <h1>Empresas</h1>
      </aside>
      <main>{children}</main>
    </div>
  )
}
