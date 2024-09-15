import { z } from 'zod'

export const updateCityFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, 'Informe o nome da cidade')
    .max(50, 'Tamanho máximo excedido'),
  state: z
    .string()
    .min(2, 'Informe o estado')
    .max(2, 'Tamanho máximo excedido'),
  zip_code: z
    .string()
    .min(2, 'Informe o CEP')
    .max(50, 'Tamanho máximo excedido'),
})
