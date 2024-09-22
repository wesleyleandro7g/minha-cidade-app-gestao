'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createClient } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'
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
import { MultiSelect } from '@/components/others/multi-select'

import { registerCompanyFormSchema } from './schema'
import { registerCompanyAction } from './actions'

const defaultList = [
  {
    value: 0,
    label: 'Erro',
  },
]

export default function RegisterCompany() {
  const router = useRouter()
  const client = createClient()

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, count, error } = await client.from('cities').select('*')
      return { data, count, error }
    },
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, count, error } = await client.from('categories').select('*')

      const formattedData = data?.map((item) => ({
        value: item.id,
        label: item.name,
      }))
      return { data: formattedData, count, error }
    },
  })

  const form = useForm<z.infer<typeof registerCompanyFormSchema>>({
    resolver: zodResolver(registerCompanyFormSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      description: '',
      instagram: '',
      phone: '',
      slogan: '',
      website: '',
      whatsapp: '',
    },
  })

  async function onSubmit(data: z.infer<typeof registerCompanyFormSchema>) {
    const result = await registerCompanyAction(data)

    if (result?.success) {
      toast('Empresa cadastrada com sucesso')
      router.push('/empresas')
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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Informe o nome da empresa' {...field} />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o e-mail da empresa'
                      type='email'
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o telefone da empresa'
                      type='tel'
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o WhatsApp da empresa'
                      type='tel'
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o Instagram da empresa'
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o website da empresa'
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slogan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Informe o slogan da empresa'
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
                      placeholder='Informe a descrição da empresa'
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
                      placeholder='Informe o endereço da empresa'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
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
                        {cities?.data?.map(({ id, name, state }) => (
                          <SelectItem key={id} value={`${id}`}>
                            {name} - {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {categories && (
              <FormField
                control={form.control}
                name='categories'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorias</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={categories.data || defaultList}
                        onValueChange={field.onChange}
                        defaultValue={field?.value?.map((item) => `${item}`)}
                        placeholder='Selecione até 3 categorias'
                        variant='inverted'
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
