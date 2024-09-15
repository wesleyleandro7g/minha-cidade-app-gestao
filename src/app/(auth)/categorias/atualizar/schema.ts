import { z } from 'zod'

export const updateCategoryFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, 'Informe o nome da categoria')
    .max(50, 'Tamanho máximo excedido'),
  iconName: z
    .string()
    .min(2, 'Informe o nome do icone')
    .max(50, 'Tamanho máximo excedido')
    .regex(/^[A-Z][a-zA-Z]*$/, 'O nome deve estar no formato PascalCase'),
})
