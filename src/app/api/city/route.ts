import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { cities } from '@/db/schema/cities'

type PostType = {
  name: string
  state: string
  zipCode: string
}

export async function GET() {
  const data = await db
    .select({
      id: cities.id,
      name: cities.name,
      state: cities.state,
      zipCode: cities.zipCode,
    })
    .from(cities)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const data: Partial<PostType> = await request.json()

  if (!data.name || !data.state || !data.zipCode) {
    return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
  }

  const result = await db.insert(cities).values({
    name: data.name,
    state: data.state,
    zipCode: data.zipCode,
  })

  return NextResponse.json(result)
}

export async function PUT(request: Request) {
  const data: Partial<PostType & { id: string }> = await request.json()

  if (!data.id || !data.name || !data.state || !data.zipCode) {
    return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
  }

  await db
    .update(cities)
    .set({
      name: data.name,
      state: data.state,
      zipCode: data.zipCode,
    })
    .where(eq(cities.id, data.id))

  return NextResponse.json('Atualizado')
}
