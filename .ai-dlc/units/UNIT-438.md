# UNIT-438 — Act: Add assertNoTrackedNodeModules guard

## Summary
Guard throwing on tracked node_modules paths.

## Description
Add assertNoTrackedNodeModules(paths) to the module.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: assertNoTrackedNodeModules` · after untrackNodeModules
- **Do:** Export assertNoTrackedNodeModules(paths: string[]): void that computes trackedNodeModulesPaths(paths) and throws Error with count and the first 10 paths when non-empty.

```
export function assertNoTrackedNodeModules(paths: string[]): void {
  const bad = trackedNodeModulesPaths(paths);
  if (bad.length > 0) throw new Error(`${bad.length} tracked node_modules paths: ${bad.slice(0, 10).join(', ')}`);
}
```

- **Expected:** Throws only when offenders exist.

## Acceptance criteria
- Throws naming offenders
- No throw when clean

## Definition of done
- Guard exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-438.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-088
- Requirement: REQ-220
- Unit (Act): UNIT-438
- Unit (Verify): UNIT-441
- Status: completed
- Change: NEW
