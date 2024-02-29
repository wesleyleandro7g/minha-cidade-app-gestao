'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe o nome da loja')
    .max(50, 'Tamanho máximo excedido'),
  slogan: z.string().max(50, 'Tamanho máximo excedido'),
  description: z.string().max(50, 'Tamanho máximo excedido'),
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

type cityType = {
  id: string
  name: string
  state: string
  zipCode: string
  createdAt?: string
}

export function StoreRegisterForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slogan: '',
      description: '',
      whatsapp: '',
      instagram: '',
      website: '',
    },
  })

  const { data: cities, error } = useQuery<cityType[]>({
    queryKey: ['cities'],
    queryFn: () => fetch('/api/city').then((response) => response.json()),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch('/api/store', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      queryClient.refetchQueries({ queryKey: ['stores'] })
    })
  }

  return (
    <DialogContent className='bg-white max-w-3xl'>
      <DialogHeader>
        <DialogTitle>Cadastrar nova loja</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o nome da loja' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='slogan'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slogan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Informe o slogan da loja'
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Informe uma breve descrição'
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Informe o endereço da loja'
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o telefone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='whatsapp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o whastapp' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o instagram' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder='Informe o site' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cityId'
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
                        >
                          <SelectTrigger>
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
