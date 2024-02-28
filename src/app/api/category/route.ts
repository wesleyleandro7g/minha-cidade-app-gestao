import { NextResponse } from 'next/server'

import { db } from '@/db'
import { categories } from '@/db/schema/categories'
import { eq } from 'drizzle-orm'

type PostType = {
  name: string
  iconName: string
}

export async function GET() {
  const data = await db
    .select({
      id: categories.id,
      name: categories.name,
      iconName: categories.iconName,
    })
    .from(categories)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const data: Partial<PostType> = await request.json()

  if (!data.name || !data.iconName) {
    return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
  }

  const result = await db.insert(categories).values({
    name: data.name,
    iconName: data.iconName,
  })

  return NextResponse.json(result)
}

export async function PUT(request: Request) {
  const data: Partial<PostType & { id: string }> = await request.json()

  if (!data.id || !data.name || !data.iconName) {
    return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
  }

  await db
    .update(categories)
    .set({
      name: data.name,
      iconName: data.iconName,
    })
    .where(eq(categories.id, data.id))

  return NextResponse.json('Atualizado')
}
