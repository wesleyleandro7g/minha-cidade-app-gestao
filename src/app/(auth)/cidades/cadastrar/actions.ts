'use server'

import { createClient } from '@/utils/supabase/server'

import { registerCityFormSchema } from './schema'
import { z } from 'zod'

type Inputs = z.infer<typeof registerCityFormSchema>

export async function registerCityAction(data: Inputs) {
  const parsed = registerCityFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const result = await supabase.from('cities').insert(parsed.data)

  console.log(result)

  if (result?.error) {
    return {
      success: false,
      message: 'Erro ao cadastrar cidade',
    }
  }

  return {
    success: true,
    message: 'Cidade cadastrada com sucesso',
  }
}
