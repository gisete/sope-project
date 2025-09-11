import * as migration_20250911_210636 from './20250911_210636';
import * as migration_20250911_212117 from './20250911_212117';

export const migrations = [
  {
    up: migration_20250911_210636.up,
    down: migration_20250911_210636.down,
    name: '20250911_210636',
  },
  {
    up: migration_20250911_212117.up,
    down: migration_20250911_212117.down,
    name: '20250911_212117'
  },
];
