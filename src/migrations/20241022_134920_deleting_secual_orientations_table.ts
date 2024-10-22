import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_sexual_orientation" AS ENUM('Heterosexual', 'Homosexual', 'Bisexual', 'Otra', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" RENAME COLUMN "sexual_orientation_id" TO "sexual_orientation";
  ALTER TABLE "users" DROP CONSTRAINT "users_sexual_orientation_id_sexual_orientations_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation" SET DATA TYPE enum_users_sexual_orientation;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "sexual_orientation" TO "sexual_orientation_id";
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation_id" SET DATA TYPE integer;
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_sexual_orientation_id_sexual_orientations_id_fk" FOREIGN KEY ("sexual_orientation_id") REFERENCES "public"."sexual_orientations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}
