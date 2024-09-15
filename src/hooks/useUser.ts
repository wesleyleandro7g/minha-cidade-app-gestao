'use client'

import { createClient } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  const client = createClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await client.auth.getUser()
      return { data, error }
    },
  })

  return { user: data?.data.user, isLoading, error }
}
