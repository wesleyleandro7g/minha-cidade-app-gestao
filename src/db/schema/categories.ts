import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'

import { companiesToCategories } from './companiesToCategories'

export const categories = mysqlTable('categories', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  iconName: text('icon_name'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  companiesToCategories: many(companiesToCategories),
}))
