# UNIT-437 — Act: Add untrackNodeModules cleanup and CLI script

## Summary
Cleanup with injectable git runner plus npm script.

## Description
Add untrackNodeModules and a CLI entry running against real git.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: untrackNodeModules` · after trackedNodeModulesPaths
- **Do:** Export type GitRunner = (args: string[]) => string and untrackNodeModules(run: GitRunner): void that calls run(['rm','-r','--cached','--ignore-unmatch','-q','--','node_modules']) then run(['rm','--cached','--ignore-unmatch','-q','--','node_modules/.vite/vitest/results.json']).

```
export type GitRunner = (args: string[]) => string;
export function untrackNodeModules(run: GitRunner): void {
  run(['rm','-r','--cached','--ignore-unmatch','-q','--','node_modules']);
  run(['rm','--cached','--ignore-unmatch','-q','--','node_modules/.vite/vitest/results.json']);
}
```

- **Expected:** Function issues only --cached removals.

### Step 2 — `game/frontend/scripts/untrackNodeModules.ts` · `new: CLI` · new
- **Do:** Create script that imports untrackNodeModules and calls it with a runner using execFileSync('git', args, {encoding:'utf8'}) from node:child_process.

```
import { execFileSync } from 'node:child_process';
import { untrackNodeModules } from '../src/lib/trackedNodeModules';
untrackNodeModules((args) => execFileSync('git', args, { encoding: 'utf8' }));
```

- **Expected:** Script runs the cleanup against real git.

### Step 3 — `game/frontend/package.json` · `scripts` · L5-L11
- **Do:** Add script "untrack:node-modules": "vite-node scripts/untrackNodeModules.ts" after "typecheck".

```
"untrack:node-modules": "vite-node scripts/untrackNodeModules.ts"
```

- **Expected:** npm run untrack:node-modules is defined.

## Acceptance criteria
- Uses git rm -r --cached
- Unstages vitest results.json
- Script entry exists

## Definition of done
- Function, CLI and script exist
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-437.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-088
- Requirement: REQ-219
- Unit (Act): UNIT-437
- Unit (Verify): UNIT-440
- Status: completed
- Change: UPDATE
