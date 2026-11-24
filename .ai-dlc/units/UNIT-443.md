# UNIT-443 — Act: Add guard CLI script and chain it into the test script

## Summary
Create assertNoTrackedNodeModules.ts script and update package.json scripts

## Description
Run checkTrackedFiles against real git and run it before vitest in npm test.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/scripts/assertNoTrackedNodeModules.ts` · `new: guard script` · new
- **Do:** Create script that imports checkTrackedFiles and runs it with a runner calling execFileSync('git', args, {encoding:'utf8', maxBuffer: 64*1024*1024, cwd: process.cwd()}); uncaught throw makes vite-node exit non-zero.

```
import { execFileSync } from 'node:child_process';
import { checkTrackedFiles } from '../src/lib/trackedNodeModules';
checkTrackedFiles((args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
```

- **Expected:** Script exits 0 on a clean index

### Step 2 — `game/frontend/package.json` · `scripts` · L5-L12
- **Do:** Add "guard:tracked-deps" script and change test to run it first.

```
"test": "vitest run" -> "guard:tracked-deps": "vite-node scripts/assertNoTrackedNodeModules.ts", "test": "npm run guard:tracked-deps && vitest run"
```

- **Expected:** npm test runs guard then vitest

## Acceptance criteria
- Script exits non-zero when a dependency path is tracked
- scripts.test runs the guard before vitest run

## Definition of done
- npm test invokes guard first
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-443.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-089
- Requirement: REQ-222
- Unit (Act): UNIT-443
- Unit (Verify): UNIT-445
- Status: approved
- Change: UPDATE
