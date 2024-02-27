import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

loadEnvConfig(cwd())

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

export const db = drizzle(connection)
