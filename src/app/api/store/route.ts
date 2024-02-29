import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { companies } from '@/db/schema/companies'
import { cities } from '@/db/schema/cities'

type PostType = {
  name: string
  slogan: string
  description: string
  address: string
  email: string
  phone: string
  whatsapp: string
  instagram: string
  website: string
  bannerURI: string
  logoURI: string
  cityId: string
  categoriesId: string[]
}

export async function GET() {
  const data = await db
    .select({
      id: companies.id,
      name: companies.name,
      slogan: companies.slogan,
      description: companies.description,
      address: companies.address,
      email: companies.email,
      phone: companies.phone,
      whatsapp: companies.whatsapp,
      instagram: companies.instagram,
      website: companies.website,
      bannerURI: companies.bannerURI,
      logoURI: companies.logoURI,
      cityId: companies.cityId,
      cityName: cities.name,
    })
    .from(companies)
    .leftJoin(cities, eq(cities.id, companies.cityId))

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const data: Partial<PostType> = await request.json()

  if (
    !data.name ||
    !data.description ||
    !data.address ||
    !data.email ||
    !data.phone
  ) {
    return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
  }

  const result = await db.insert(companies).values({
    name: data.name,
    slogan: data.slogan,
    description: data.description,
    address: data.address,
    email: data.email,
    phone: data.phone,
    whatsapp: data.whatsapp,
    instagram: data.instagram,
    website: data.website,
    bannerURI: data.bannerURI,
    logoURI: data.logoURI,
    cityId: data.cityId,
  })

  return NextResponse.json(result[0].insertId)
}

// export async function PUT(request: Request) {
//   const data: Partial<PostType & { id: string }> = await request.json()

//   if (!data.id || !data.name || !data.state || !data.zipCode) {
//     return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
//   }

//   await db
//     .update(cities)
//     .set({
//       name: data.name,
//       state: data.state,
//       zipCode: data.zipCode,
//     })
//     .where(eq(cities.id, data.id))

//   return NextResponse.json('Atualizado')
// }
