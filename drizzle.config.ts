import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

loadEnvConfig(cwd())

export default {
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    host: process.env.NEXT_PUBLIC_DB_HOST as string,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASS,
    database: process.env.NEXT_PUBLIC_DB_NAME as string,
    port: +process.env.NEXT_PUBLIC_DB_PORT! || 5432,
  },
} satisfies Config
