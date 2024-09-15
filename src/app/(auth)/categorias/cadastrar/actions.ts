'use server'

import { createClient } from '@/utils/supabase/server'

import { registerCategoryFormSchema } from './schema'
import { z } from 'zod'

type Inputs = z.infer<typeof registerCategoryFormSchema>

export async function registerCategoryAction(data: Inputs) {
  const parsed = registerCategoryFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const result = await supabase.from('categories').insert(parsed.data)

  if (result?.error) {
    return {
      success: false,
      message: 'Erro ao cadastrar categoria',
    }
  }

  return {
    success: true,
    message: 'Categoria cadastrada com sucesso',
  }
}
