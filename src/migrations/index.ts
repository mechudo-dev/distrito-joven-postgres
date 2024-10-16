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
    name: '20241016_214226_fixing_details_services_and_operation_units_collections'
  },
];
