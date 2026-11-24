# UNIT-430 — Act: Add trackedNodeModulesPaths helper

## Summary
Create pure filter helper

## Description
Create game/frontend/src/lib/untrackNodeModules.ts with the pure trackedNodeModulesPaths function.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/untrackNodeModules.ts` · `new: trackedNodeModulesPaths` · new
- **Do:** Create the file and export trackedNodeModulesPaths(paths: string[]): string[] returning entries whose split('/') contains the segment node_modules.

```
export function trackedNodeModulesPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').includes('node_modules'));
}
```

- **Expected:** Function importable from src/lib/untrackNodeModules

## Acceptance criteria
- Function filters by node_modules path segment
- Function returns [] when none match

## Definition of done
- trackedNodeModulesPaths exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-430.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-087
- Requirement: REQ-215
- Unit (Act): UNIT-430
- Unit (Verify): UNIT-433
- Status: approved
- Change: NEW
