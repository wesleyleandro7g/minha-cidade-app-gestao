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
  name: z
    .string()
    .min(2, 'Informe o nome da categoria')
    .max(50, 'Tamanho máximo excedido'),
  iconName: z
    .string()
    .min(2, 'Informe o nome do icone')
    .max(20, 'Tamanho máximo excedido'),
})

export function CategoryRegisterForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      iconName: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      queryClient.refetchQueries({ queryKey: ['categories'] })
    })
  }

  return (
    <DialogContent className='bg-white'>
      <DialogHeader>
        <DialogTitle>Cadastrar nova categoria</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              name='iconName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icone</FormLabel>
                  <FormControl>
                    <Input placeholder='Informe o nome do ícone' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <DialogClose asChild>
                <Button type='submit' className='text-white'>
                  Cadastrar
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  )
}
