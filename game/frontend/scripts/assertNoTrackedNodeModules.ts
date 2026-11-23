import { execFileSync } from 'node:child_process';
import { assertNoTrackedNodeModules, checkTrackedFiles } from '../src/lib/trackedNodeModules';
assertNoTrackedNodeModules(checkTrackedFiles((args) => execFileSync('git', args, { encoding: 'utf8' })));
