import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { cities } from './cities'
import { offers } from './offers'
import { companiesToCategories } from './companiesToCategories'

export const companies = pgTable('companies', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  slogan: text('slogan'),
  description: text('description'),
  address: text('address'),
  email: text('email'),
  phone: text('phone'),
  whatsapp: text('whatsapp'),
  instagram: text('instagram'),
  website: text('website'),
  bannerHex: text('banner_hex'),
  bannerUri: text('banner_uri'),
  logoUri: text('logo_uri'),
  isActive: boolean('is_active').default(true),
  cityId: varchar('city_id', { length: 128 }).references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export const companiesRelations = relations(companies, ({ many, one }) => ({
  offers: many(offers),
  companiesToCategories: many(companiesToCategories),
  city: one(cities, {
    fields: [companies.cityId],
    references: [cities.id],
  }),
}))
