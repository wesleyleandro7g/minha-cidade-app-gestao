'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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

import { registerCategoryFormSchema } from './schema'
import { registerCategoryAction } from './actions'
import { Info } from 'lucide-react'

export default function RegisterCity() {
  const router = useRouter()

  const form = useForm<z.infer<typeof registerCategoryFormSchema>>({
    resolver: zodResolver(registerCategoryFormSchema),
    defaultValues: {
      name: '',
      icon_name: '',
    },
  })

  async function onSubmit(data: z.infer<typeof registerCategoryFormSchema>) {
    const result = await registerCategoryAction(data)

    if (result?.success) {
      toast('Categoria cadastrada com sucesso')
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
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Informe o nome da categoria'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='icon_name'
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
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </TooltipProvider>
  )
}
