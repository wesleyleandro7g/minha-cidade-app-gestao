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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { registerCityFormSchema } from './schema'
import { registerCityAction } from './actions'

export default function RegisterCity() {
  const router = useRouter()

  const form = useForm<z.infer<typeof registerCityFormSchema>>({
    resolver: zodResolver(registerCityFormSchema),
    defaultValues: {
      name: '',
      state: '',
      zip_code: '',
    },
  })

  async function onSubmit(data: z.infer<typeof registerCityFormSchema>) {
    const result = await registerCityAction(data)

    if (result?.success) {
      toast('Cidade cadastrada com sucesso')
      router.push('/cidades')
    }
  }

  return (
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
                    <Input placeholder='Informe o nome da cidade' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o estado (ex.: MG)'
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='zip_code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder='Informe o CEP' {...field} />
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
  )
}
