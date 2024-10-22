import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_disability" AS ENUM('Ninguna', 'Visual', 'Auditiva', 'Cognitiva', 'Física', 'Psicosocial', 'Sordoceguera', 'Múltiple', 'Otra');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_social_media_social_media_type" AS ENUM('Página Web', 'TikTok', 'Facebook', 'Instagram', 'X', 'LinkedIn', 'Pinterest');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users_social_media" RENAME COLUMN "social_media_type_id" TO "social_media_type";
  ALTER TABLE "users_social_media" DROP CONSTRAINT "users_social_media_social_media_type_id_social_media_types_id_fk";
  
  ALTER TABLE "users_social_media" ALTER COLUMN "social_media_type" SET DATA TYPE enum_users_social_media_social_media_type;
  ALTER TABLE "users_social_media" ALTER COLUMN "social_media_type" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "disability" "enum_users_disability" DEFAULT 'Ninguna' NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users_social_media" RENAME COLUMN "social_media_type" TO "social_media_type_id";
  ALTER TABLE "users_social_media" ALTER COLUMN "social_media_type_id" SET DATA TYPE integer;
  ALTER TABLE "users_social_media" ALTER COLUMN "social_media_type_id" DROP NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "users_social_media" ADD CONSTRAINT "users_social_media_social_media_type_id_social_media_types_id_fk" FOREIGN KEY ("social_media_type_id") REFERENCES "public"."social_media_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" DROP COLUMN IF EXISTS "disability";`)
}
