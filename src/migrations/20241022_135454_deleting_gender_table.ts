import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_gender" AS ENUM('Mujer', 'Hombre', 'Bisexual ', 'Intersexual', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_ethnicity" AS ENUM('Ninguna', 'Pueblo Rrom – Gitano', 'Pueblo y/o comunidad indígena', 'Comunidades negras', 'Población afrodescendiente	', 'Comunidades palenqueras', 'Pueblo raizal');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" RENAME COLUMN "gender_id" TO "gender";
  ALTER TABLE "users" RENAME COLUMN "ethnicity_id" TO "ethnicity";
  ALTER TABLE "users" DROP CONSTRAINT "users_gender_id_genders_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_ethnicity_id_ethnicities_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "gender" SET DATA TYPE enum_users_gender;
  ALTER TABLE "users" ALTER COLUMN "ethnicity" SET DATA TYPE enum_users_ethnicity;
  ALTER TABLE "users" ALTER COLUMN "ethnicity" SET DEFAULT 'Ninguna';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "gender" TO "gender_id";
  ALTER TABLE "users" RENAME COLUMN "ethnicity" TO "ethnicity_id";
  ALTER TABLE "users" ALTER COLUMN "gender_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" DROP DEFAULT;
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_gender_id_genders_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."genders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_ethnicity_id_ethnicities_id_fk" FOREIGN KEY ("ethnicity_id") REFERENCES "public"."ethnicities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}
