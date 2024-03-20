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

type GetType = {
  params: {
    storeId: string
  }
}

export async function GET(request: Request, { params }: GetType) {
  const data = await db
    .select()
    .from(companies)
    .where(eq(companies.id, params.storeId))
    .leftJoin(cities, eq(cities.id, companies.cityId))

  return NextResponse.json(data[0])
}
