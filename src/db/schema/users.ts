import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { cities } from './cities'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  password: text('password'),
  isActive: boolean('is_active').default(true),
  cityId: varchar('city_id', { length: 128 }).references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export const usersReletions = relations(users, ({ one }) => ({
  city: one(cities, {
    fields: [users.cityId],
    references: [cities.id],
  }),
}))
