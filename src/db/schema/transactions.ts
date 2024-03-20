import { pgTable, text, timestamp, varchar, decimal } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

import { companies } from './companies'
import { offers } from './offers'

/* 
  REFERENCES

  Type:
    manual_credit: The manual addition of credit carried out by the administrative panel
    offer_ads: When a company creates a new offering
    balance_adjustment: When the manager adjust manually company balance
*/

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  observation: text('description'),
  value: decimal('value', { precision: 10, scale: 2 }),
  type: text('type', {
    enum: ['manual_credit', 'offer_ads', 'balance_adjustment'],
  }),
  movement: text('movement', { enum: ['addition', 'removal'] }),
  companyId: varchar('company_id', { length: 128 }).references(
    () => companies.id
  ),
  offerId: varchar('offer_id', { length: 128 }).references(() => offers.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  company: one(companies, {
    fields: [transactions.companyId],
    references: [companies.id],
  }),
  offers: one(offers, {
    fields: [transactions.companyId],
    references: [offers.id],
  }),
}))
