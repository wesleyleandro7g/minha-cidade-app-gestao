'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { updateCategoryFormSchema } from './schema'

type Inputs = z.infer<typeof updateCategoryFormSchema>

export async function updateCategoryAction(inputs: Inputs) {
  const parsed = updateCategoryFormSchema.safeParse(inputs)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('categories')
    .update({
      name: parsed.data.name,
      icon_name: parsed.data.iconName,
    })
    .eq('id', parsed.data.id)

  if (error) {
    return {
      success: false,
      message: 'Erro ao atualizar categoria',
    }
  }

  return {
    success: true,
    message: 'Categoria atualizada com sucesso',
  }
}
