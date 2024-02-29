import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

loadEnvConfig(cwd())

export default {
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME as string,
  },
} satisfies Config
