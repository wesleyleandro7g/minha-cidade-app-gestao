import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { companies } from './companies'
import { users } from './users'

export const cities = pgTable('cities', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  state: text('state'),
  zipCode: text('zip_code'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const citiesRelations = relations(cities, ({ many }) => ({
  companies: many(companies),
  users: many(users),
}))
