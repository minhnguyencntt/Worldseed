# UNIT-452 — Act: Add untrackAndVerify to the trackedNodeModules helper

## Summary
Add verified cleanup that counts, untracks, re-lists and throws on leftovers

## Description
Add untrackAndVerify(run: GitRunner) to src/lib/trackedNodeModules.ts after untrackNodeModules, reusing checkTrackedFiles and untrackNodeModules.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: untrackAndVerify` · after L17
- **Do:** Add exported function untrackAndVerify(run: GitRunner): { before: number; after: number } that computes before as the unique count of checkTrackedFiles(run), calls untrackNodeModules(run), computes the unique remaining list from checkTrackedFiles(run), throws Error listing the first 10 when it is non-empty, otherwise returns after 0.

```
export function untrackAndVerify(run: GitRunner): { before: number; after: number } {
  const before = new Set(checkTrackedFiles(run)).size;
  untrackNodeModules(run);
  const left = [...new Set(checkTrackedFiles(run))];
  if (left.length > 0) throw new Error(`${left.length} paths still tracked: ${left.slice(0, 10).join(', ')}`);
  return { before, after: 0 };
}
```

- **Expected:** untrackAndVerify is exported and tsc passes

## Acceptance criteria
- untrackAndVerify returns {before, after:0} when nothing remains
- untrackAndVerify throws listing leftover paths when the index still has them

## Definition of done
- Function exported and typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-452.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-091
- Requirement: REQ-226
- Unit (Act): UNIT-452
- Unit (Verify): UNIT-454
- Status: approved
- Change: UPDATE
