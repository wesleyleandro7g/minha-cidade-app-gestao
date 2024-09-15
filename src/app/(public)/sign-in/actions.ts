'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import { signInFormSchema } from './schema'
import { z } from 'zod'

type Inputs = z.infer<typeof signInFormSchema>

export async function signInAction(data: Inputs) {
  const parsed = signInFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Formato dos dados inválido',
    }
  }

  const supabase = createClient()

  const result = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (result.error) {
    return {
      success: false,
      message: 'Email ou senha inválidos',
    }
  }

  redirect('/dashboard')
}
