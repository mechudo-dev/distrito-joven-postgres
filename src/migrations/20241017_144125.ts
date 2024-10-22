import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "operation_units" RENAME COLUMN "servicio_id" TO "service_id";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_servicio_id" TO "version_service_id";
  ALTER TABLE "operation_units" DROP CONSTRAINT "operation_units_servicio_id_services_id_fk";
  
  ALTER TABLE "_operation_units_v" DROP CONSTRAINT "_operation_units_v_version_servicio_id_services_id_fk";
  
  ALTER TABLE "operation_units_workshops" ADD COLUMN "is_hightlight" boolean DEFAULT false;
  ALTER TABLE "operation_units_workshops" ADD COLUMN "description" varchar;
  ALTER TABLE "_operation_units_v_version_workshops" ADD COLUMN "is_hightlight" boolean DEFAULT false;
  ALTER TABLE "_operation_units_v_version_workshops" ADD COLUMN "description" varchar;
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_service_id_services_id_fk" FOREIGN KEY ("version_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "operation_units" RENAME COLUMN "service_id" TO "servicio_id";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_service_id" TO "version_servicio_id";
  ALTER TABLE "operation_units" DROP CONSTRAINT "operation_units_service_id_services_id_fk";
  
  ALTER TABLE "_operation_units_v" DROP CONSTRAINT "_operation_units_v_version_service_id_services_id_fk";
  
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_servicio_id_services_id_fk" FOREIGN KEY ("servicio_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_servicio_id_services_id_fk" FOREIGN KEY ("version_servicio_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "operation_units_workshops" DROP COLUMN IF EXISTS "is_hightlight";
  ALTER TABLE "operation_units_workshops" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_operation_units_v_version_workshops" DROP COLUMN IF EXISTS "is_hightlight";
  ALTER TABLE "_operation_units_v_version_workshops" DROP COLUMN IF EXISTS "description";`)
}
