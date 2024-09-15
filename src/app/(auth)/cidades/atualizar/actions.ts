'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { updateCityFormSchema } from './schema'

type Inputs = z.infer<typeof updateCityFormSchema>

export async function updateCityAction(inputs: Inputs) {
  const parsed = updateCityFormSchema.safeParse(inputs)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('cities')
    .update({
      name: parsed.data.name,
      state: parsed.data.state,
      zip_code: parsed.data.zip_code,
    })
    .eq('id', parsed.data.id)

  if (error) {
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
