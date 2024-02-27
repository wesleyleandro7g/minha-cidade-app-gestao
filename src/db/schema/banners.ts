import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { createId } from '@paralleldrive/cuid2'

export const banners = mysqlTable('banners', {
  id: varchar('id', { length: 128 })
    .$default(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageURI: text('image_uri'),
  link: text('link'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})
