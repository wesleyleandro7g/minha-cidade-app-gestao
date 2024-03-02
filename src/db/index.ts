import 'dotenv/config'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

import * as schema from './schema'

loadEnvConfig(cwd())

const client = new Client({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: +process.env.NEXT_PUBLIC_DB_PORT! || 5432,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: process.env.NEXT_PUBLIC_DB_NAME,
})

export const connection = await client.connect()
export const db = drizzle(client, { schema, logger: true })
