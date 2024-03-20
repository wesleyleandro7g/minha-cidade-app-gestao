import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { companies } from './companies'
import { transactions } from './transactions'

export const offers = pgTable('offers', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
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
  transaction: one(transactions),
}))
