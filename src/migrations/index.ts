import * as migration_20241011_165056_initial from './20241011_165056_initial';
import * as migration_20241015_152404_first_version_users from './20241015_152404_first_version_users';
import * as migration_20241015_152651_changing_unique_document_number from './20241015_152651_changing_unique_document_number';
import * as migration_20241015_153206_solving_document_number from './20241015_153206_solving_document_number';
import * as migration_20241015_153334_solving_document_number_2 from './20241015_153334_solving_document_number_2';
import * as migration_20241015_155758_adding from './20241015_155758_adding';

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
    name: '20241015_155758_adding'
  },
];