'use client'

import { signOutAction } from '@/actions/sign-out'
import { createClient } from '@/utils/supabase/client'

export default function Panel() {
  const supabase = createClient()

  function handleSignOut() {
    signOutAction()
  }

  return (
    <main>
      <div>
        <h1>Painel</h1>
        <button onClick={handleSignOut}>Sair</button>
      </div>
    </main>
  )
}
