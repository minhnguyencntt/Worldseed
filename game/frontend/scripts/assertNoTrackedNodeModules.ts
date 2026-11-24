import { execFileSync } from 'node:child_process';
import { checkTrackedFiles, type GitRunner } from '../src/lib/trackedNodeModules';

// Returns 1 and logs each offending path when any node_modules file (or vitest
// cache file) is tracked by git; returns 0 and logs nothing otherwise.
export function runGuard(run: GitRunner, log: (line: string) => void = console.log): number {
  const bad = checkTrackedFiles(run);
  for (const path of bad) log(path);
  return bad.length > 0 ? 1 : 0;
}

// Run as the CLI entry point only; importing this module (e.g. from unit tests)
// must not query the real git index or exit the process.
if (process.env.VITEST === undefined) {
  process.exit(runGuard((args) => execFileSync('git', args, { encoding: 'utf8' })));
}
