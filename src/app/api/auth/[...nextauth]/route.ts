import NextAuth, { DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { createClient } from '@/utils/supabase/client'

type UserType = DefaultUser & {
  id: string
  email?: string | null
  session: {
    access_token: string
    refresh_token: string
    expires_at?: number
    expires_in: number
  }
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const supabase = createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.username,
          password: credentials.password,
        })

        console.log({ data, error })

        if (error) {
          console.error(error)
          return null
        }

        const user = {
          id: data.user.id,
          email: data.user?.email,
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at,
            expires_in: data.session.expires_in,
          },
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = { ...user }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as UserType
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
  },
})

export { handler as GET, handler as POST }
