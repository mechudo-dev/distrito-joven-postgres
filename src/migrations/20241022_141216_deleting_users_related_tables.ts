import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "document_types";
  DROP TABLE "genders";
  DROP TABLE "sexual_orientations";
  DROP TABLE "disabilities";
  DROP TABLE "ethnicities";
  DROP TABLE "social_media_types";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_document_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_genders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sexual_orientations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_disabilities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ethnicities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_social_media_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "document_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "genders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "sexual_orientations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "disabilities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "ethnicities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "social_media_types_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "document_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_type" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "genders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gender" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sexual_orientations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sexual_orientation" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "disabilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"disability" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ethnicities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ethnicity" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "social_media_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"social_media_type" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "document_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "genders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sexual_orientations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "disabilities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ethnicities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "social_media_types_id" integer;
  CREATE UNIQUE INDEX IF NOT EXISTS "document_types_document_type_idx" ON "document_types" USING btree ("document_type");
  CREATE INDEX IF NOT EXISTS "document_types_created_at_idx" ON "document_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "genders_gender_idx" ON "genders" USING btree ("gender");
  CREATE INDEX IF NOT EXISTS "genders_created_at_idx" ON "genders" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "sexual_orientations_sexual_orientation_idx" ON "sexual_orientations" USING btree ("sexual_orientation");
  CREATE INDEX IF NOT EXISTS "sexual_orientations_created_at_idx" ON "sexual_orientations" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "disabilities_disability_idx" ON "disabilities" USING btree ("disability");
  CREATE INDEX IF NOT EXISTS "disabilities_created_at_idx" ON "disabilities" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "ethnicities_ethnicity_idx" ON "ethnicities" USING btree ("ethnicity");
  CREATE INDEX IF NOT EXISTS "ethnicities_created_at_idx" ON "ethnicities" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "social_media_types_social_media_type_idx" ON "social_media_types" USING btree ("social_media_type");
  CREATE INDEX IF NOT EXISTS "social_media_types_created_at_idx" ON "social_media_types" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_types_fk" FOREIGN KEY ("document_types_id") REFERENCES "public"."document_types"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_media_types_fk" FOREIGN KEY ("social_media_types_id") REFERENCES "public"."social_media_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}
