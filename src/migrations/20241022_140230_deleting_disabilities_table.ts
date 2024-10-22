import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_users_ethnicity" ADD VALUE 'Población afrodescendiente';
  DROP TABLE "users_rels";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_users_gender" ADD VALUE 'Bisexual ';
  ALTER TYPE "enum_users_ethnicity" ADD VALUE 'Población afrodescendiente	';
  CREATE TABLE IF NOT EXISTS "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"disabilities_id" integer
  );
  
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
  CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" USING btree ("path");`)
}
