import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'

interface useSingleCompanyDataProps {
  id: string
}

export function useSingleCompanyData({ id }: useSingleCompanyDataProps) {
  const client = createClient()

  const { data: company, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, count, error } = await client
        .from('companies')
        .select(
          `*, cities ( id, name, state ), company_category ( id, category ( id, name ) )`
        )
        .eq('id', id)
        .single()

      return { data, count, error }
    },
  })
  return { company, isLoading }
}
