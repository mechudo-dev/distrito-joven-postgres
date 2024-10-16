import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"disabilities_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "genders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gender" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sexual_orientations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sexual_orientations" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "disabilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"disability" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ethnicities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ethnicity" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" RENAME COLUMN "sexual_orientation" TO "sexual_orientation_id";
  ALTER TABLE "users" RENAME COLUMN "gender" TO "gender_id";
  ALTER TABLE "users" RENAME COLUMN "ethnicity" TO "ethnicity_id";
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "gender_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "ethnicity_id" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "genders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sexual_orientations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "disabilities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ethnicities_id" integer;
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_disabilities_fk" FOREIGN KEY ("disabilities_id") REFERENCES "public"."disabilities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "genders_created_at_idx" ON "genders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "sexual_orientations_created_at_idx" ON "sexual_orientations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "disabilities_created_at_idx" ON "disabilities" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "ethnicities_created_at_idx" ON "ethnicities" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_sexual_orientation_id_sexual_orientations_id_fk" FOREIGN KEY ("sexual_orientation_id") REFERENCES "public"."sexual_orientations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_genders_fk" FOREIGN KEY ("genders_id") REFERENCES "public"."genders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sexual_orientations_fk" FOREIGN KEY ("sexual_orientations_id") REFERENCES "public"."sexual_orientations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_disabilities_fk" FOREIGN KEY ("disabilities_id") REFERENCES "public"."disabilities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ethnicities_fk" FOREIGN KEY ("ethnicities_id") REFERENCES "public"."ethnicities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" DROP COLUMN IF EXISTS "disability";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_sexual_orientation" AS ENUM('Heterosexual', 'Homosexual', 'Bisexual', 'Otra', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_gender" AS ENUM('Mujer', 'Hombre', 'Intersexual', 'Prefiero no responder');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_ethnicity" AS ENUM('Ninguna', 'Pueblo Rrom – Gitano', 'Pueblo y/o comunidad indígena', 'Comunidades negras', 'Población afrodescendiente', 'Comunidades palenqueras', 'Pueblo raizal');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_disability" AS ENUM('Ninguna', 'Visual', 'Auditiva', 'Cognitiva', 'Física', 'Psicosocial', 'Sordoceguera', 'Múltiple', 'Otra');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DROP TABLE "users_rels";
  DROP TABLE "genders";
  DROP TABLE "sexual_orientations";
  DROP TABLE "disabilities";
  DROP TABLE "ethnicities";
  ALTER TABLE "users" RENAME COLUMN "sexual_orientation_id" TO "sexual_orientation";
  ALTER TABLE "users" RENAME COLUMN "gender_id" TO "gender";
  ALTER TABLE "users" RENAME COLUMN "ethnicity_id" TO "ethnicity";
  ALTER TABLE "users" DROP CONSTRAINT "users_sexual_orientation_id_sexual_orientations_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_gender_id_genders_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_ethnicity_id_ethnicities_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_genders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sexual_orientations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_disabilities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ethnicities_fk";
  
  ALTER TABLE "users" ALTER COLUMN "sexual_orientation" SET DATA TYPE enum_users_sexual_orientation;
  ALTER TABLE "users" ALTER COLUMN "gender" SET DATA TYPE enum_users_gender;
  ALTER TABLE "users" ALTER COLUMN "ethnicity" SET DATA TYPE enum_users_ethnicity;
  ALTER TABLE "users" ALTER COLUMN "ethnicity" SET DEFAULT 'Ninguna';
  ALTER TABLE "users" ADD COLUMN "disability" "enum_users_disability" DEFAULT 'Ninguna';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "genders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "sexual_orientations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "disabilities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "ethnicities_id";`)
}
