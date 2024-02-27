import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { createId } from '@paralleldrive/cuid2'

export const rootUsers = mysqlTable('root_users', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  password: text('password'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})
