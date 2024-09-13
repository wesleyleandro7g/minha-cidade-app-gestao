'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { signInAction } from './actions'
import { signInFormSchema } from './schema'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: z.output<typeof signInFormSchema>) {
    try {
      setIsLoading(true)
      const result = await signInAction(data)

      if (!result.success) {
        setMessage(result.message)
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='flex flex-col gap-4 md:w-[480px] p-8 rounded-md md:bg-white lg:bg-white'>
        <div>
          <h1 className='text-4xl font-bold text-black'>Entrar</h1>
          <p>Informe o seu email e senha para acessar o sistema.</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Seu email'
                      {...field}
                      className='bg-white'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='Sua senha'
                        {...field}
                        className='bg-white'
                        type={showPassword ? 'text' : 'password'}
                      />
                      <button
                        className='absolute right-2 bottom-0 top-0 text-gray-400'
                        onClick={() => setShowPassword((state) => !state)}
                        type='button'
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <Link href='/forgot-password'>
                    <span className='text-primary text-sm hover:underline text-end'>
                      Esqueceu a senha?
                    </span>
                  </Link>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full text-white bg-primary'
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </form>
        </Form>

        {message && (
          <div className='bg-red-100 p-4 rounded-md'>
            <p className='text-red-600'>{message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
