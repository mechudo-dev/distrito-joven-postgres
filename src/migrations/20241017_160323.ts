import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "localities" ALTER COLUMN "code" SET NOT NULL;
  ALTER TABLE "localities" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "localities" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "document_types" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "genders" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "sexual_orientations" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "disabilities" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "ethnicities" ALTER COLUMN "is_visible" SET NOT NULL;
  ALTER TABLE "social_media_types" ALTER COLUMN "is_visible" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "localities" ALTER COLUMN "code" DROP NOT NULL;
  ALTER TABLE "localities" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "localities" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "document_types" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "genders" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "sexual_orientations" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "disabilities" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "ethnicities" ALTER COLUMN "is_visible" DROP NOT NULL;
  ALTER TABLE "social_media_types" ALTER COLUMN "is_visible" DROP NOT NULL;`)
}
