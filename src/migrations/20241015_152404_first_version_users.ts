import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_role" AS ENUM('user', 'admin', 'superadmin');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_document_type" AS ENUM('Tarjeta de Identidad', 'Cédula de ciudadanía', 'Cédula de extranjería', 'Permiso especial de permanencia');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_gender" AS ENUM('Mujer', 'Hombre', 'Intersexual', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_sexual_orientation" AS ENUM('Heterosexual', 'Homosexual', 'Bisexual', 'Otra', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_disability" AS ENUM('Ninguna', 'Visual', 'Auditiva', 'Cognitiva', 'Física', 'Psicosocial', 'Sordoceguera', 'Múltiple', 'Otra');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_ethnicity" AS ENUM('Ninguna', 'Pueblo Rrom – Gitano', 'Pueblo y/o comunidad indígena', 'Comunidades negras', 'Población afrodescendiente', 'Comunidades palenqueras', 'Pueblo raizal');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_social_media_type" AS ENUM('Tiktok', 'Facebook', 'Instagram', 'X', 'LinkedIn', 'Pinterest', 'Página Web');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "users_social_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_users_social_media_type",
  	"social_media_u_r_l" varchar
  );
  
  ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'user' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "other_names" varchar;
  ALTER TABLE "users" ADD COLUMN "first_last_name" varchar;
  ALTER TABLE "users" ADD COLUMN "second_last_name" varchar;
  ALTER TABLE "users" ADD COLUMN "document_type" "enum_users_document_type" DEFAULT 'Tarjeta de Identidad';
  ALTER TABLE "users" ADD COLUMN "document_number" numeric;
  ALTER TABLE "users" ADD COLUMN "date_of_birth" timestamp(3) with time zone;
  ALTER TABLE "users" ADD COLUMN "gender" "enum_users_gender";
  ALTER TABLE "users" ADD COLUMN "sexual_orientation" "enum_users_sexual_orientation";
  ALTER TABLE "users" ADD COLUMN "disability" "enum_users_disability" DEFAULT 'Ninguna';
  ALTER TABLE "users" ADD COLUMN "ethnicity" "enum_users_ethnicity" DEFAULT 'Ninguna';
  ALTER TABLE "users" ADD COLUMN "phone_number" numeric;
  ALTER TABLE "users" ADD COLUMN "description" varchar;
  ALTER TABLE "users" ADD COLUMN "receive_emails" boolean DEFAULT true;
  ALTER TABLE "users" ADD COLUMN "is_visible" boolean DEFAULT true;
  DO $$ BEGIN
   ALTER TABLE "users_social_media" ADD CONSTRAINT "users_social_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_social_media_order_idx" ON "users_social_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_social_media_parent_id_idx" ON "users_social_media" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_document_number_idx" ON "users" USING btree ("document_number");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users_social_media";
  ALTER TABLE "users" RENAME COLUMN "first_name" TO "name";
  DROP INDEX IF EXISTS "users_document_number_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "other_names";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "first_last_name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "second_last_name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "document_type";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "document_number";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "date_of_birth";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "gender";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "sexual_orientation";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "disability";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "ethnicity";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "phone_number";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "receive_emails";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "is_visible";`)
}
