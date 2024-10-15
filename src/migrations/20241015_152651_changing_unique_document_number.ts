import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "users_document_number_idx";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "users_document_number_idx" ON "users" USING btree ("document_number");`)
}
