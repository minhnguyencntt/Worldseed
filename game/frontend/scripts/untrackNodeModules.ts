import { execFileSync } from 'node:child_process';
import { untrackNodeModules } from '../src/lib/trackedNodeModules';
untrackNodeModules((args) => execFileSync('git', args, { encoding: 'utf8' }));
