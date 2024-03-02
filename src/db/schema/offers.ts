import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { companies } from './companies'

export const offers = pgTable('offers', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageURI: text('image_uri'),
  link: text('link'),
  isActive: boolean('is_active').default(true),
  companyId: varchar('company_id', { length: 128 }).references(
    () => companies.id
  ),
  createdAt: timestamp('created_at').defaultNow(),
})

export const offersRelations = relations(offers, ({ one }) => ({
  company: one(companies, {
    fields: [offers.companyId],
    references: [companies.id],
  }),
}))
