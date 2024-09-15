'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { updateCategoryFormSchema } from './schema'
import { updateCategoryAction } from './actions'

export default function UpdateCategory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const cachedCategories = queryClient.getQueryData(['categories']) as any

  function getDefaultValues() {
    if (cachedCategories && cachedCategories.data) {
      const categoryData = cachedCategories?.data.find(
        (item: any) => item.id === Number(searchParams.get('id'))
      )

      return {
        id: categoryData.id,
        name: categoryData.name,
        iconName: categoryData.icon_name,
      }
    }

    router.push('/categorias')
  }

  const form = useForm<z.infer<typeof updateCategoryFormSchema>>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: getDefaultValues(),
  })

  async function onSubmit(data: z.infer<typeof updateCategoryFormSchema>) {
    const result = await updateCategoryAction(data)

    if (result?.success) {
      toast('Categoria atualizada com sucesso')
      router.push('/categorias')
    }
  }

  return (
    <TooltipProvider>
      <div className='flex flex-col flex-1'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Informe o nome da cidade'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='iconName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Icone
                      <Tooltip>
                        <TooltipTrigger type='button'>
                          <Info className='size-3.5 ml-1.5' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <p>
                              Use somete os ícones da biblioteca lucide! Você
                              pode consultar os ícones disponíveis{' '}
                              <a
                                href='https://lucide.dev/icons/'
                                target='_blank'
                                className='underline'
                              >
                                aqui!
                              </a>
                            </p>
                            <p>
                              Lembre-se de formatar corretamente o nome do
                              ícone, seguindo o padrão PascalCase.
                            </p>
                            <p>
                              Ex.: shopping-cart deverá ser informado como
                              ShoppingCart
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Digite o nome do ícone. Ex: ShoppingCart'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-end'>
              <Button type='submit' className='text-white'>
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </TooltipProvider>
  )
}
