import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation_id" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "gender_id" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "locality_id" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "neighborhood" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "receive_emails" SET DEFAULT false;
  ALTER TABLE "users" ALTER COLUMN "receive_emails" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "is_visible" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "date_of_birth" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation_id" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "gender_id" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "locality_id" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "neighborhood" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "receive_emails" SET DEFAULT true;
  ALTER TABLE "users" ALTER COLUMN "receive_emails" DROP NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "is_visible" DROP NOT NULL;`)
}
