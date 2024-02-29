import 'dotenv/config'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { db, connection } from './index'

async function execute() {
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' })

    await connection.end()

    console.log('Database migrated successfully!')
  } catch (error) {
    console.log('Failed to migrate')
    console.error(error)
    process.exit(1)
  }
}

execute()
