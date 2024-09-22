'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { updateCompanyFormSchema } from './schema'

type Inputs = z.infer<typeof updateCompanyFormSchema>

export async function updateCompanyAction(inputs: Inputs) {
  const parsed = updateCompanyFormSchema.safeParse(inputs)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  // const supabase = createClient()

  // const result = await supabase
  //   .from('companies')
  //   .update({
  //     name: parsed.data.name,
  //     email: parsed.data.email,
  //     slogan: parsed.data.slogan,
  //     description: parsed.data.description,
  //     address: parsed.data.address,
  //     phone: parsed.data.phone,
  //     whatsapp: parsed.data.whatsapp,
  //     instagram: parsed.data.instagram,
  //     website: parsed.data.website,
  //     city: Number(parsed.data.city),
  //   })
  //   .eq('id', parsed.data.id)
  //   .select('id')

  // if (result?.error) {
  //   return {
  //     success: false,
  //     message: 'Erro ao cadastrar empresa',
  //   }
  // }

  const companiesCategories = parsed.data.categories.map((category) => ({
    company: 'result.data[0].id',
    category: category,
  }))

  // const companiesCategoriesResult = await supabase
  //   .from('company_category')
  //   .insert(companiesCategories)

  // console.log(companiesCategoriesResult, result)

  // if (companiesCategoriesResult?.error) {
  //   return {
  //     success: false,
  //     message: 'Erro ao cadastrar categorias da empresa',
  //   }
  // }

  return {
    success: true,
    message: 'Empresa cadastrada com sucesso',
  }
}

export async function updateCompanyCategoryAction(
  inputs: Inputs,
  currentCategories: any
) {
  const parsed = updateCompanyFormSchema.safeParse(inputs)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const newCategories = parsed.data.categories
  const currentCategoriesFormatted = currentCategories.map((category: any) => {
    return {
      companyCategoryId: category.id,
      categoryId: category.category.id,
    }
  })

  const categoriesToRemove: number[] = []

  newCategories.map((newCategory: any) => {
    currentCategoriesFormatted.map((currentCategory: any) => {
      if (Number(newCategory) !== currentCategory.categoryId) {
        categoriesToRemove.push(currentCategory.companyCategoryId)
      }
    })
  })

  console.log({ newCategories, currentCategoriesFormatted, categoriesToRemove })

  return {
    success: true,
    message: 'Categoria cadastrada com sucesso',
  }
}
