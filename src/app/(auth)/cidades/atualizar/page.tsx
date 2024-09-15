'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

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

import { updateCityFormSchema } from './schema'
import { updateCityAction } from './actions'

export default function UpdateCity() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const cachedCities = queryClient.getQueryData(['cities']) as any

  function getDefaultValues() {
    if (cachedCities && cachedCities.data) {
      const cityData = cachedCities?.data.find(
        (item: any) => item.id === Number(searchParams.get('id'))
      )

      return {
        id: cityData.id,
        name: cityData.name,
        state: cityData.state,
        zip_code: cityData.zip_code,
      }
    }

    router.push('/cidades')
  }

  const form = useForm<z.infer<typeof updateCityFormSchema>>({
    resolver: zodResolver(updateCityFormSchema),
    defaultValues: getDefaultValues(),
  })

  async function onSubmit(data: z.infer<typeof updateCityFormSchema>) {
    const result = await updateCityAction(data)

    if (result?.success) {
      toast('Cidade atualizada com sucesso')
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
              Atualizar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
