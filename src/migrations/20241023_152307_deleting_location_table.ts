import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_locality" AS ENUM('Usaquén', 'Chapinero', 'Santa Fe', 'San Cristóbal', 'Usme', 'Tunjuelito', 'Bosa', 'Kennedy', 'Fontibón', 'Engativá', 'Suba', 'Barrios Unidos', 'Teusaquillo', 'Los Mártires', 'Antonio Nariño', 'Puente Aranda', 'La Candelaria', 'Rafael Uribe Uribe', 'Ciudad Bolívar', 'Sumapaz');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_operation_units_locality" AS ENUM('Usaquén', 'Chapinero', 'Santa Fe', 'San Cristóbal', 'Usme', 'Tunjuelito', 'Bosa', 'Kennedy', 'Fontibón', 'Engativá', 'Suba', 'Barrios Unidos', 'Teusaquillo', 'Los Mártires', 'Antonio Nariño', 'Puente Aranda', 'La Candelaria', 'Rafael Uribe Uribe', 'Ciudad Bolívar', 'Sumapaz');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__operation_units_v_version_locality" AS ENUM('Usaquén', 'Chapinero', 'Santa Fe', 'San Cristóbal', 'Usme', 'Tunjuelito', 'Bosa', 'Kennedy', 'Fontibón', 'Engativá', 'Suba', 'Barrios Unidos', 'Teusaquillo', 'Los Mártires', 'Antonio Nariño', 'Puente Aranda', 'La Candelaria', 'Rafael Uribe Uribe', 'Ciudad Bolívar', 'Sumapaz');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "users" RENAME COLUMN "locality_id" TO "locality";
  ALTER TABLE "operation_units" RENAME COLUMN "localidad_id" TO "locality";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_localidad_id" TO "version_locality";
  ALTER TABLE "users" DROP CONSTRAINT "users_locality_id_localities_id_fk";
  
  ALTER TABLE "operation_units" DROP CONSTRAINT "operation_units_localidad_id_localities_id_fk";
  
  ALTER TABLE "_operation_units_v" DROP CONSTRAINT "_operation_units_v_version_localidad_id_localities_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "locality" SET DATA TYPE enum_users_locality;
  ALTER TABLE "operation_units" ALTER COLUMN "locality" SET DATA TYPE enum_operation_units_locality;
  ALTER TABLE "_operation_units_v" ALTER COLUMN "version_locality" SET DATA TYPE enum__operation_units_v_version_locality;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "locality" TO "locality_id";
  ALTER TABLE "operation_units" RENAME COLUMN "locality" TO "localidad_id";
  ALTER TABLE "_operation_units_v" RENAME COLUMN "version_locality" TO "version_localidad_id";
  ALTER TABLE "users" ALTER COLUMN "locality_id" SET DATA TYPE integer;
  ALTER TABLE "operation_units" ALTER COLUMN "localidad_id" SET DATA TYPE integer;
  ALTER TABLE "_operation_units_v" ALTER COLUMN "version_localidad_id" SET DATA TYPE integer;
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_locality_id_localities_id_fk" FOREIGN KEY ("locality_id") REFERENCES "public"."localities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "operation_units" ADD CONSTRAINT "operation_units_localidad_id_localities_id_fk" FOREIGN KEY ("localidad_id") REFERENCES "public"."localities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_operation_units_v" ADD CONSTRAINT "_operation_units_v_version_localidad_id_localities_id_fk" FOREIGN KEY ("version_localidad_id") REFERENCES "public"."localities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}
