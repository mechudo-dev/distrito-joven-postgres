import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "social_media_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"social_media_type" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_social_media" RENAME COLUMN "type" TO "social_media_type_id";
  ALTER TABLE "users" RENAME COLUMN "doc_number" TO "document_number";
  ALTER TABLE "document_types" RENAME COLUMN "type" TO "document_type";
  ALTER TABLE "sexual_orientations" RENAME COLUMN "sexual_orientations" TO "sexual_orientation";
  ALTER TABLE "users_social_media" ALTER COLUMN "social_media_type_id" SET DATA TYPE integer;
  ALTER TABLE "document_types" ADD COLUMN "is_visible" boolean DEFAULT true;
  ALTER TABLE "genders" ADD COLUMN "is_visible" boolean DEFAULT true;
  ALTER TABLE "sexual_orientations" ADD COLUMN "is_visible" boolean DEFAULT true;
  ALTER TABLE "disabilities" ADD COLUMN "is_visible" boolean DEFAULT true;
  ALTER TABLE "ethnicities" ADD COLUMN "is_visible" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "social_media_types_id" integer;
  CREATE UNIQUE INDEX IF NOT EXISTS "social_media_types_social_media_type_idx" ON "social_media_types" USING btree ("social_media_type");
  CREATE INDEX IF NOT EXISTS "social_media_types_created_at_idx" ON "social_media_types" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "users_social_media" ADD CONSTRAINT "users_social_media_social_media_type_id_social_media_types_id_fk" FOREIGN KEY ("social_media_type_id") REFERENCES "public"."social_media_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_media_types_fk" FOREIGN KEY ("social_media_types_id") REFERENCES "public"."social_media_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "document_types_document_type_idx" ON "document_types" USING btree ("document_type");
  CREATE UNIQUE INDEX IF NOT EXISTS "genders_gender_idx" ON "genders" USING btree ("gender");
  CREATE UNIQUE INDEX IF NOT EXISTS "sexual_orientations_sexual_orientation_idx" ON "sexual_orientations" USING btree ("sexual_orientation");
  CREATE UNIQUE INDEX IF NOT EXISTS "disabilities_disability_idx" ON "disabilities" USING btree ("disability");
  CREATE UNIQUE INDEX IF NOT EXISTS "ethnicities_ethnicity_idx" ON "ethnicities" USING btree ("ethnicity");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_social_media_type" AS ENUM('Tiktok', 'Facebook', 'Instagram', 'X', 'LinkedIn', 'Pinterest', 'Página Web');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DROP TABLE "social_media_types";
  ALTER TABLE "users_social_media" RENAME COLUMN "social_media_type_id" TO "type";
  ALTER TABLE "users" RENAME COLUMN "document_number" TO "doc_number";
  ALTER TABLE "document_types" RENAME COLUMN "document_type" TO "type";
  ALTER TABLE "sexual_orientations" RENAME COLUMN "sexual_orientation" TO "sexual_orientations";
  ALTER TABLE "users_social_media" DROP CONSTRAINT "users_social_media_social_media_type_id_social_media_types_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_social_media_types_fk";
  
  DROP INDEX IF EXISTS "document_types_document_type_idx";
  DROP INDEX IF EXISTS "genders_gender_idx";
  DROP INDEX IF EXISTS "sexual_orientations_sexual_orientation_idx";
  DROP INDEX IF EXISTS "disabilities_disability_idx";
  DROP INDEX IF EXISTS "ethnicities_ethnicity_idx";
  ALTER TABLE "users_social_media" ALTER COLUMN "type" SET DATA TYPE enum_users_social_media_type;
  ALTER TABLE "document_types" DROP COLUMN IF EXISTS "is_visible";
  ALTER TABLE "genders" DROP COLUMN IF EXISTS "is_visible";
  ALTER TABLE "sexual_orientations" DROP COLUMN IF EXISTS "is_visible";
  ALTER TABLE "disabilities" DROP COLUMN IF EXISTS "is_visible";
  ALTER TABLE "ethnicities" DROP COLUMN IF EXISTS "is_visible";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "social_media_types_id";`)
}
