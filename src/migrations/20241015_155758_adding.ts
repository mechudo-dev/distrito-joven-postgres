import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "first_last_name" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "second_last_name" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "document_type" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "doc_number" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "first_last_name" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "second_last_name" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "document_type" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "doc_number" DROP NOT NULL;`)
}
