import 'dotenv/config'

import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const HOST = process.env.NEXT_PUBLIC_DB_HOST
const USER = process.env.NEXT_PUBLIC_DB_USER
const PASS = process.env.NEXT_PUBLIC_DB_PASS
const PORT = process.env.NEXT_PUBLIC_DB_PORT
const NAME = process.env.NEXT_PUBLIC_DB_NAME

const DATABASE_URL = `postgresql://${USER}:${PASS}@${HOST}:${PORT}/${NAME}?schema=public`

console.log(DATABASE_URL)

const pool = new Pool({
  connectionString: DATABASE_URL,
})

const db = drizzle(pool)

async function main() {
  console.log('Migration started...')

  await migrate(db, { migrationsFolder: 'src/db/migrations' })

  console.log('Migration ended...')

  process.exit(0)
}

main().catch((error) => {
  console.error(error)

  process.exit(0)
})
