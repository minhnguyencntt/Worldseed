# UNIT-453 — Act: Add runUntrack and use it in the cleanup script

## Summary
Add runUntrack exit-code helper and call it from scripts/untrackNodeModules.ts

## Description
Add runUntrack(run, log, err) to the helper file and make the script set process.exitCode from it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: runUntrack` · after untrackAndVerify
- **Do:** Add exported runUntrack(run: GitRunner, log: (m: string) => void, err: (m: string) => void): number that calls untrackAndVerify in try, logs `untracked ${before} paths` and returns 0, and in catch calls err with the Error message and returns 1.

```
export function runUntrack(run: GitRunner, log: (m: string) => void, err: (m: string) => void): number {
  try {
    const { before } = untrackAndVerify(run);
    log(`untracked ${before} paths`);
    return 0;
  } catch (e) {
    err(e instanceof Error ? e.message : String(e));
    return 1;
  }
}
```

- **Expected:** runUntrack exported

### Step 2 — `game/frontend/scripts/untrackNodeModules.ts` · `top-level script` · L1-L3
- **Do:** Import runUntrack instead of untrackNodeModules and set process.exitCode to runUntrack(runner, console.log, console.error) where runner is (args) => execFileSync('git', args, { encoding: 'utf8' }).

```
process.exitCode = runUntrack((args) => execFileSync('git', args, { encoding: 'utf8' }), console.log, console.error);
```

- **Expected:** Script sets exit code from runUntrack

## Acceptance criteria
- runUntrack returns 0 and logs the count on success
- runUntrack returns 1 and logs the error on failure

## Definition of done
- Script calls runUntrack
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-453.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-091
- Requirement: REQ-227
- Unit (Act): UNIT-453
- Unit (Verify): UNIT-455
- Status: approved
- Change: UPDATE
