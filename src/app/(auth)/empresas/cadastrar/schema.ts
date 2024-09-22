import { z } from 'zod'

export const registerCompanyFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe o nome da empresa')
    .max(50, 'Tamanho máximo excedido'),
  email: z.string(),
  slogan: z.string().max(80, 'Tamanho máximo excedido'),
  description: z.string().max(80, 'Tamanho máximo excedido'),
  address: z.string().max(80, 'Tamanho máximo excedido'),
  phone: z.string().max(20, 'Tamanho máximo excedido'),
  whatsapp: z.string().max(20, 'Tamanho máximo excedido'),
  instagram: z.string().max(20, 'Tamanho máximo excedido'),
  website: z.string().max(60, 'Tamanho máximo excedido'),
  city: z.string(),
  categories: z
    .array(z.number().min(1))
    .min(1, 'Selecione ao menos uma categoria')
    .max(3, 'Máximo de 3 categorias'),
})
