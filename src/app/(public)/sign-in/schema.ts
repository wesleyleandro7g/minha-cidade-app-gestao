import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(2, 'Informe o seu email')
    .max(50, 'Tamanho máximo excedido'),
  password: z
    .string()
    .min(2, 'Informe a sua senha')
    .max(50, 'Tamanho máximo excedido'),
})
