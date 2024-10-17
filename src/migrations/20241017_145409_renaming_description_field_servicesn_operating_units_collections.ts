import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "services" RENAME COLUMN "description" TO "page_content";
  ALTER TABLE "_services_v" RENAME COLUMN "version_description" TO "version_page_content";
  ALTER TABLE "operation_units" RENAME COLUMN "description" TO "page_content";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_description" TO "version_page_content";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "services" RENAME COLUMN "page_content" TO "description";
  ALTER TABLE "_services_v" RENAME COLUMN "version_page_content" TO "version_description";
  ALTER TABLE "operation_units" RENAME COLUMN "page_content" TO "description";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_page_content" TO "version_description";`)
}
