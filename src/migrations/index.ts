import * as migration_20241011_165056_initial from './20241011_165056_initial';

export const migrations = [
  {
    up: migration_20241011_165056_initial.up,
    down: migration_20241011_165056_initial.down,
    name: '20241011_165056_initial'
  },
];
