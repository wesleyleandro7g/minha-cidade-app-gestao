'use server'

import { createClient } from '@/utils/supabase/server'

import { registerCompanyFormSchema } from './schema'
import { z } from 'zod'

type Inputs = z.infer<typeof registerCompanyFormSchema>

export async function registerCompanyAction(data: Inputs) {
  const parsed = registerCompanyFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const result = await supabase
    .from('companies')
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      slogan: parsed.data.slogan,
      description: parsed.data.description,
      address: parsed.data.address,
      phone: parsed.data.phone,
      whatsapp: parsed.data.whatsapp,
      instagram: parsed.data.instagram,
      website: parsed.data.website,
      city: Number(parsed.data.city),
    })
    .select('id')

  if (result?.error) {
    return {
      success: false,
      message: 'Erro ao cadastrar empresa',
    }
  }

  const companiesCategories = parsed.data.categories.map((category) => ({
    company: result.data[0].id,
    category: category,
  }))

  const companiesCategoriesResult = await supabase
    .from('company_category')
    .insert(companiesCategories)

  if (companiesCategoriesResult?.error) {
    return {
      success: false,
      message: 'Erro ao cadastrar categorias da empresa',
    }
  }

  return {
    success: true,
    message: 'Empresa cadastrada com sucesso',
  }
}
