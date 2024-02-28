'use client'

import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export function AppProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
