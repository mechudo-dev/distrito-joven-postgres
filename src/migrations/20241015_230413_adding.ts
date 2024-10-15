import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_operation_units_workshops_schedules_day" AS ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_operation_units_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__operation_units_v_version_workshops_schedules_day" AS ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__operation_units_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "operation_units_workshops_schedules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_operation_units_workshops_schedules_day",
  	"start_time" timestamp(3) with time zone,
  	"end_time" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "operation_units_workshops" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "operation_units_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "operation_units" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"servicio_id" integer,
  	"localidad_id" integer,
  	"neighborhood" varchar,
  	"address" varchar,
  	"longitude" numeric,
  	"latitude" numeric,
  	"description" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"is_visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_operation_units_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "operation_units_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_version_workshops_schedules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" "enum__operation_units_v_version_workshops_schedules_day",
  	"start_time" timestamp(3) with time zone,
  	"end_time" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_version_workshops" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_servicio_id" integer,
  	"version_localidad_id" integer,
  	"version_neighborhood" varchar,
  	"version_address" varchar,
  	"version_longitude" numeric,
  	"version_latitude" numeric,
  	"version_description" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_is_visible" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__operation_units_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "operation_units_id" integer;
  DO $$ BEGIN
   ALTER TABLE "operation_units_workshops_schedules" ADD CONSTRAINT "operation_units_workshops_schedules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."operation_units_workshops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units_workshops" ADD CONSTRAINT "operation_units_workshops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."operation_units"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units_populated_authors" ADD CONSTRAINT "operation_units_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."operation_units"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_servicio_id_services_id_fk" FOREIGN KEY ("servicio_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_localidad_id_localities_id_fk" FOREIGN KEY ("localidad_id") REFERENCES "public"."localities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units_rels" ADD CONSTRAINT "operation_units_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."operation_units"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units_rels" ADD CONSTRAINT "operation_units_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v_version_workshops_schedules" ADD CONSTRAINT "_operation_units_v_version_workshops_schedules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_operation_units_v_version_workshops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v_version_workshops" ADD CONSTRAINT "_operation_units_v_version_workshops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_operation_units_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v_version_populated_authors" ADD CONSTRAINT "_operation_units_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_operation_units_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_parent_id_operation_units_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."operation_units"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_servicio_id_services_id_fk" FOREIGN KEY ("version_servicio_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_localidad_id_localities_id_fk" FOREIGN KEY ("version_localidad_id") REFERENCES "public"."localities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v_rels" ADD CONSTRAINT "_operation_units_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_operation_units_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v_rels" ADD CONSTRAINT "_operation_units_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "operation_units_workshops_schedules_order_idx" ON "operation_units_workshops_schedules" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "operation_units_workshops_schedules_parent_id_idx" ON "operation_units_workshops_schedules" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "operation_units_workshops_order_idx" ON "operation_units_workshops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "operation_units_workshops_parent_id_idx" ON "operation_units_workshops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "operation_units_populated_authors_order_idx" ON "operation_units_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "operation_units_populated_authors_parent_id_idx" ON "operation_units_populated_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "operation_units_title_idx" ON "operation_units" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "operation_units_slug_idx" ON "operation_units" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "operation_units_created_at_idx" ON "operation_units" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "operation_units__status_idx" ON "operation_units" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_order_idx" ON "operation_units_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_parent_idx" ON "operation_units_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_path_idx" ON "operation_units_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_workshops_schedules_order_idx" ON "_operation_units_v_version_workshops_schedules" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_workshops_schedules_parent_id_idx" ON "_operation_units_v_version_workshops_schedules" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_workshops_order_idx" ON "_operation_units_v_version_workshops" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_workshops_parent_id_idx" ON "_operation_units_v_version_workshops" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_populated_authors_order_idx" ON "_operation_units_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_populated_authors_parent_id_idx" ON "_operation_units_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_version_title_idx" ON "_operation_units_v" USING btree ("version_title");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_version_slug_idx" ON "_operation_units_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_version_created_at_idx" ON "_operation_units_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_version__status_idx" ON "_operation_units_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_created_at_idx" ON "_operation_units_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_updated_at_idx" ON "_operation_units_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_latest_idx" ON "_operation_units_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_autosave_idx" ON "_operation_units_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_order_idx" ON "_operation_units_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_parent_idx" ON "_operation_units_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_path_idx" ON "_operation_units_v_rels" USING btree ("path");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_operation_units_fk" FOREIGN KEY ("operation_units_id") REFERENCES "public"."operation_units"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "operation_units_workshops_schedules";
  DROP TABLE "operation_units_workshops";
  DROP TABLE "operation_units_populated_authors";
  DROP TABLE "operation_units";
  DROP TABLE "operation_units_rels";
  DROP TABLE "_operation_units_v_version_workshops_schedules";
  DROP TABLE "_operation_units_v_version_workshops";
  DROP TABLE "_operation_units_v_version_populated_authors";
  DROP TABLE "_operation_units_v";
  DROP TABLE "_operation_units_v_rels";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_operation_units_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "operation_units_id";`)
}
