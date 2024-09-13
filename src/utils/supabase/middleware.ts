import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            )
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const user = await supabase.auth.getUser()

    const protectedRoutes = ['/panel', '/settings', '/stores', '/users']

    if (
      protectedRoutes.includes(request.nextUrl.pathname) &&
      (!user.data.user || user.error)
    ) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (request.nextUrl.pathname === '/sign-in' && user.data.user) {
      return NextResponse.redirect(new URL('/panel', request.url))
    }

    return response
  } catch (error) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
