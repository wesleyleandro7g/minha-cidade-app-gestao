import { z } from 'zod'

export const registerCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe o nome da cidade')
    .max(50, 'Tamanho máximo excedido'),
  icon_name: z
    .string()
    .min(2, 'Informe o nome do icone')
    .max(20, 'Tamanho máximo excedido')
    .regex(/^[A-Z][a-zA-Z]*$/, 'O nome deve estar no formato PascalCase'),
})
