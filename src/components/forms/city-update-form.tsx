'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
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

const formSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, 'Informe o nome da cidade')
    .max(50, 'Tamanho máximo excedido'),
  state: z
    .string()
    .min(2, 'Informe o estado')
    .max(2, 'Tamanho máximo excedido'),
  zipCode: z
    .string()
    .min(2, 'Informe o CEP')
    .max(50, 'Tamanho máximo excedido'),
})

interface CityUpdateFormProps {
  id?: string
  name?: string
  state?: string
  zipCode?: string
}

export function CityUpdateForm(props: CityUpdateFormProps) {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
      state: props.state,
      zipCode: props.zipCode,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch('/api/city', {
      method: 'PUT',
      body: JSON.stringify(values),
    }).then(() => {
      queryClient.refetchQueries({ queryKey: ['cities'] })
    })
  }

  return (
    <DialogContent className='bg-white'>
      <DialogHeader>
        <DialogTitle>Editar categoria</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              name='zipCode'
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

            <div className='flex justify-end'>
              <DialogClose asChild>
                <Button type='submit' className='text-white'>
                  Atualizar
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  )
}
