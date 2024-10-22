import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_document_type" AS ENUM('Tarjeta de Identidad', 'Cédula de Ciudadanía', 'Cédula de Extranjería', 'Permiso Especial de Permanencia	');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" RENAME COLUMN "document_type_id" TO "document_type";
  ALTER TABLE "users" DROP CONSTRAINT "users_document_type_id_document_types_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "document_type" SET DATA TYPE enum_users_document_type;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "document_type" TO "document_type_id";
  ALTER TABLE "users" ALTER COLUMN "document_type_id" SET DATA TYPE integer;
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_document_type_id_document_types_id_fk" FOREIGN KEY ("document_type_id") REFERENCES "public"."document_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}
