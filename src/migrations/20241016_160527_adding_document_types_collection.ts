import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "document_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" RENAME COLUMN "document_type" TO "document_type_id";
  ALTER TABLE "users" ALTER COLUMN "document_type_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "document_type_id" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "document_types_id" integer;
  CREATE INDEX IF NOT EXISTS "document_types_created_at_idx" ON "document_types" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_document_type_id_document_types_id_fk" FOREIGN KEY ("document_type_id") REFERENCES "public"."document_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_types_fk" FOREIGN KEY ("document_types_id") REFERENCES "public"."document_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_document_type" AS ENUM('Tarjeta de Identidad', 'Cédula de ciudadanía', 'Cédula de extranjería', 'Permiso especial de permanencia');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DROP TABLE "document_types";
  ALTER TABLE "users" RENAME COLUMN "document_type_id" TO "document_type";
  ALTER TABLE "users" DROP CONSTRAINT "users_document_type_id_document_types_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_document_types_fk";
  
  ALTER TABLE "users" ALTER COLUMN "document_type" SET DATA TYPE enum_users_document_type;
  ALTER TABLE "users" ALTER COLUMN "document_type" SET DEFAULT 'Tarjeta de Identidad';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "document_types_id";`)
}
