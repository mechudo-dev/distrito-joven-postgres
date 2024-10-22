import * as migration_20241011_165056_initial from './20241011_165056_initial';
import * as migration_20241015_152404_first_version_users from './20241015_152404_first_version_users';
import * as migration_20241015_152651_changing_unique_document_number from './20241015_152651_changing_unique_document_number';
import * as migration_20241015_153206_solving_document_number from './20241015_153206_solving_document_number';
import * as migration_20241015_153334_solving_document_number_2 from './20241015_153334_solving_document_number_2';
import * as migration_20241015_155758_adding from './20241015_155758_adding';
import * as migration_20241015_205342_adding_services_collection from './20241015_205342_adding_services_collection';
import * as migration_20241015_230413_adding from './20241015_230413_adding';
import * as migration_20241016_160527_adding_document_types_collection from './20241016_160527_adding_document_types_collection';
import * as migration_20241016_170233_adding_more_user_related_collections from './20241016_170233_adding_more_user_related_collections';
import * as migration_20241016_194049_fixing_details_user_related_collections from './20241016_194049_fixing_details_user_related_collections';
import * as migration_20241016_214226_fixing_details_services_and_operation_units_collections from './20241016_214226_fixing_details_services_and_operation_units_collections';
import * as migration_20241017_144125 from './20241017_144125';
import * as migration_20241017_145409_renaming_description_field_servicesn_operating_units_collections from './20241017_145409_renaming_description_field_servicesn_operating_units_collections';
import * as migration_20241017_160323 from './20241017_160323';
import * as migration_20241022_130039_deleting_document_types_table from './20241022_130039_deleting_document_types_table';
import * as migration_20241022_134920_deleting_secual_orientations_table from './20241022_134920_deleting_secual_orientations_table';
import * as migration_20241022_135454_deleting_gender_table from './20241022_135454_deleting_gender_table';
import * as migration_20241022_140230_deleting_disabilities_table from './20241022_140230_deleting_disabilities_table';
import * as migration_20241022_140942_deleting_social_media_types_table from './20241022_140942_deleting_social_media_types_table';
import * as migration_20241022_141216_deleting_users_related_tables from './20241022_141216_deleting_users_related_tables';
import * as migration_20241022_141701_deleting_authors_of_operation_units_table from './20241022_141701_deleting_authors_of_operation_units_table';
import * as migration_20241022_141850_deleting_authors_of_services_table from './20241022_141850_deleting_authors_of_services_table';

export const migrations = [
  {
    up: migration_20241011_165056_initial.up,
    down: migration_20241011_165056_initial.down,
    name: '20241011_165056_initial',
  },
  {
    up: migration_20241015_152404_first_version_users.up,
    down: migration_20241015_152404_first_version_users.down,
    name: '20241015_152404_first_version_users',
  },
  {
    up: migration_20241015_152651_changing_unique_document_number.up,
    down: migration_20241015_152651_changing_unique_document_number.down,
    name: '20241015_152651_changing_unique_document_number',
  },
  {
    up: migration_20241015_153206_solving_document_number.up,
    down: migration_20241015_153206_solving_document_number.down,
    name: '20241015_153206_solving_document_number',
  },
  {
    up: migration_20241015_153334_solving_document_number_2.up,
    down: migration_20241015_153334_solving_document_number_2.down,
    name: '20241015_153334_solving_document_number_2',
  },
  {
    up: migration_20241015_155758_adding.up,
    down: migration_20241015_155758_adding.down,
    name: '20241015_155758_adding',
  },
  {
    up: migration_20241015_205342_adding_services_collection.up,
    down: migration_20241015_205342_adding_services_collection.down,
    name: '20241015_205342_adding_services_collection',
  },
  {
    up: migration_20241015_230413_adding.up,
    down: migration_20241015_230413_adding.down,
    name: '20241015_230413_adding',
  },
  {
    up: migration_20241016_160527_adding_document_types_collection.up,
    down: migration_20241016_160527_adding_document_types_collection.down,
    name: '20241016_160527_adding_document_types_collection',
  },
  {
    up: migration_20241016_170233_adding_more_user_related_collections.up,
    down: migration_20241016_170233_adding_more_user_related_collections.down,
    name: '20241016_170233_adding_more_user_related_collections',
  },
  {
    up: migration_20241016_194049_fixing_details_user_related_collections.up,
    down: migration_20241016_194049_fixing_details_user_related_collections.down,
    name: '20241016_194049_fixing_details_user_related_collections',
  },
  {
    up: migration_20241016_214226_fixing_details_services_and_operation_units_collections.up,
    down: migration_20241016_214226_fixing_details_services_and_operation_units_collections.down,
    name: '20241016_214226_fixing_details_services_and_operation_units_collections',
  },
  {
    up: migration_20241017_144125.up,
    down: migration_20241017_144125.down,
    name: '20241017_144125',
  },
  {
    up: migration_20241017_145409_renaming_description_field_servicesn_operating_units_collections.up,
    down: migration_20241017_145409_renaming_description_field_servicesn_operating_units_collections.down,
    name: '20241017_145409_renaming_description_field_servicesn_operating_units_collections',
  },
  {
    up: migration_20241017_160323.up,
    down: migration_20241017_160323.down,
    name: '20241017_160323',
  },
  {
    up: migration_20241022_130039_deleting_document_types_table.up,
    down: migration_20241022_130039_deleting_document_types_table.down,
    name: '20241022_130039_deleting_document_types_table',
  },
  {
    up: migration_20241022_134920_deleting_secual_orientations_table.up,
    down: migration_20241022_134920_deleting_secual_orientations_table.down,
    name: '20241022_134920_deleting_secual_orientations_table',
  },
  {
    up: migration_20241022_135454_deleting_gender_table.up,
    down: migration_20241022_135454_deleting_gender_table.down,
    name: '20241022_135454_deleting_gender_table',
  },
  {
    up: migration_20241022_140230_deleting_disabilities_table.up,
    down: migration_20241022_140230_deleting_disabilities_table.down,
    name: '20241022_140230_deleting_disabilities_table',
  },
  {
    up: migration_20241022_140942_deleting_social_media_types_table.up,
    down: migration_20241022_140942_deleting_social_media_types_table.down,
    name: '20241022_140942_deleting_social_media_types_table',
  },
  {
    up: migration_20241022_141216_deleting_users_related_tables.up,
    down: migration_20241022_141216_deleting_users_related_tables.down,
    name: '20241022_141216_deleting_users_related_tables',
  },
  {
    up: migration_20241022_141701_deleting_authors_of_operation_units_table.up,
    down: migration_20241022_141701_deleting_authors_of_operation_units_table.down,
    name: '20241022_141701_deleting_authors_of_operation_units_table',
  },
  {
    up: migration_20241022_141850_deleting_authors_of_services_table.up,
    down: migration_20241022_141850_deleting_authors_of_services_table.down,
    name: '20241022_141850_deleting_authors_of_services_table'
  },
];
