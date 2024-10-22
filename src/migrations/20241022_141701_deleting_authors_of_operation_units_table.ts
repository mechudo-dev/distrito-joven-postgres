import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "operation_units_populated_authors";
  DROP TABLE "operation_units_rels";
  DROP TABLE "_operation_units_v_version_populated_authors";
  DROP TABLE "_operation_units_v_rels";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "operation_units_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "operation_units_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_operation_units_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "operation_units_populated_authors" ADD CONSTRAINT "operation_units_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."operation_units"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_operation_units_v_version_populated_authors" ADD CONSTRAINT "_operation_units_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_operation_units_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "operation_units_populated_authors_order_idx" ON "operation_units_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "operation_units_populated_authors_parent_id_idx" ON "operation_units_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_order_idx" ON "operation_units_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_parent_idx" ON "operation_units_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "operation_units_rels_path_idx" ON "operation_units_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_populated_authors_order_idx" ON "_operation_units_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_version_populated_authors_parent_id_idx" ON "_operation_units_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_order_idx" ON "_operation_units_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_parent_idx" ON "_operation_units_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_operation_units_v_rels_path_idx" ON "_operation_units_v_rels" USING btree ("path");`)
}
