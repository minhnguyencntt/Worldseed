# UNIT-447 — Act: Add runGuard and the assertNoTrackedNodeModules CLI script

## Summary
Add runGuard to the helper module and the script that calls it.

## Description
runGuard(run, log) uses checkTrackedFiles, logs each offender and returns exit code.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: runGuard` · after checkTrackedFiles
- **Do:** Add exported runGuard(run: GitRunner, log: (msg: string) => void): number that gets checkTrackedFiles(run); if empty returns 0; otherwise logs a header and each path with log and returns 1.

```
export function runGuard(run: GitRunner, log: (m: string) => void): number {
  const bad = checkTrackedFiles(run);
  if (bad.length === 0) return 0;
  log(`${bad.length} tracked dependency/test-cache paths:`);
  for (const p of bad) log(p);
  return 1;
}
```

- **Expected:** Returns 1 and logs paths when offenders exist.

### Step 2 — `game/frontend/scripts/assertNoTrackedNodeModules.ts` · `new: script entry` · new
- **Do:** Create script importing execFileSync and runGuard; call process.exit(runGuard(args => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }), console.error)).

```
import { execFileSync } from 'node:child_process';
import { runGuard } from '../src/lib/trackedNodeModules';
process.exit(runGuard((args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }), console.error));
```

- **Expected:** File exists under scripts/.

## Acceptance criteria
- runGuard returns 1 with offenders, 0 otherwise.
- Script calls process.exit(runGuard(...)).

## Definition of done
- Script file created
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-447.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-090
- Requirement: REQ-224
- Unit (Act): UNIT-447
- Unit (Verify): UNIT-450
- Status: completed
- Change: UPDATE
