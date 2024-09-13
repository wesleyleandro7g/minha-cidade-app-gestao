'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signOutAction() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}
