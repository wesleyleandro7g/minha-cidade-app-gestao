import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

import { companies } from './companies'
import { categories } from './categories'

export const companiesToCategories = mysqlTable('companies_to_categories', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  companyId: varchar('company_id', { length: 128 }).references(
    () => companies.id
  ),
  categoryId: varchar('category_id', { length: 128 }).references(
    () => categories.id
  ),
})

export const companiesToCategoriesRelation = relations(
  companiesToCategories,
  ({ one }) => ({
    company: one(companies, {
      fields: [companiesToCategories.companyId],
      references: [companies.id],
    }),
    category: one(categories, {
      fields: [companiesToCategories.categoryId],
      references: [categories.id],
    }),
  })
)
