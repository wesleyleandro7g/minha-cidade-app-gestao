'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SquarePen } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import type { storeType } from '@/types/store'
import type { cityType } from '@/types/city'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe o nome da loja')
    .max(50, 'Tamanho máximo excedido'),
  slogan: z.string().max(50, 'Tamanho máximo excedido'),
  description: z.string().max(50, 'Tamanho máximo excedido'),
  bannerHex: z.string().max(7, 'Tamanho máximo excedido'),
  address: z
    .string()
    .min(2, 'Informe o endereço da loja')
    .max(50, 'Tamanho máximo excedido'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .min(2, 'Informe o telefone')
    .max(50, 'Tamanho máximo excedido'),
  whatsapp: z.string().max(50, 'Tamanho máximo excedido'),
  instagram: z.string().max(50, 'Tamanho máximo excedido'),
  website: z.string().max(50, 'Tamanho máximo excedido'),
  cityId: z.string(),
})

export default function Store() {
  const { storeId } = useParams<{ storeId: string }>()

  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const { data: cities, error } = useQuery<cityType[]>({
    queryKey: ['cities'],
    queryFn: () => fetch('/api/city').then((response) => response.json()),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      setIsLoading(true)

      const dataTemp = await fetch(`/api/store/${storeId}`, { method: 'GET' })

      const data = await dataTemp.json()

      setIsLoading(false)

      return {
        name: data?.companies.name,
        slogan: data?.companies.slogan,
        description: data?.companies.description,
        address: data?.companies.address,
        email: data?.companies.email,
        bannerHex: data?.companies.bannerHex,
        phone: data?.companies.phone,
        whatsapp: data?.companies.whatsapp,
        instagram: data?.companies.instagram,
        website: data?.companies.website,
        cityId: data?.cities.id,
      }
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // fetch('/api/store', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // }).then(() => {
    //   queryClient.refetchQueries({ queryKey: ['stores'] })
    // })
  }

  if (isLoading) {
    return (
      <div className='flex flex-1 flex-col h-[320px] justify-center items-center gap-2'>
        <Spinner />
        <span className='text-gray-400'>Carregando dados...</span>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col'>
      <div
        className={`relative w-full h-24 bg-[${form.getValues(
          'bannerHex'
        )}] rounded`}
      >
        {isDisabled && (
          <button
            onClick={() => setIsDisabled(false)}
            className='p-2 bg-black/50 rounded-full absolute top-5 right-5'
          >
            <SquarePen className='size-5 text-white' />
          </button>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex w-24 h-24 justify-center items-center rounded-full bg-blue-500 -mt-10 ml-4 z-10'>
          <span>{form.getValues('bannerHex')}</span>
        </div>
        <div className='p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o nome da loja'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='slogan'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slogan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o slogan da loja'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe uma breve descrição'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='address'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o endereço da loja'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o email'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phone'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o telefone'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='whatsapp'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o whastapp'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='instagram'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o instagram'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='website'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Informe o site'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bannerHex'
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor do banner em Hexadecimal</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ex.: Para a cor branca use (#ffffff)'
                          className='bg-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='cityId'
                  disabled={isDisabled}
                  render={({ field }) => {
                    if (error) {
                      return <span>Erro ao carregar cidades</span>
                    }

                    return (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isDisabled}
                          >
                            <SelectTrigger className='bg-white'>
                              <SelectValue placeholder='Selecione a cidade' />
                            </SelectTrigger>
                            <SelectContent>
                              {cities?.map((city) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>

              {!isDisabled && (
                <div className='flex justify-end gap-2'>
                  <Button
                    onClick={() => setIsDisabled(true)}
                    type='button'
                    className='text-white bg-gray-400 hover:bg-gray-500'
                  >
                    Cancelar
                  </Button>

                  <Button type='submit' className='text-white'>
                    Atualizar dados
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
