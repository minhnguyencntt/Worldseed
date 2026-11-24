# UNIT-436 — Act: Add trackedNodeModulesPaths helper

## Summary
Create the helper module.

## Description
Create src/lib/trackedNodeModules.ts exporting trackedNodeModulesPaths.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: trackedNodeModulesPaths` · new
- **Do:** Create the file and export trackedNodeModulesPaths(paths: string[]): string[] returning paths where path.split('/') includes 'node_modules'.

```
export function trackedNodeModulesPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').includes('node_modules'));
}
```

- **Expected:** Importing the function from the module typechecks and filters correctly.

## Acceptance criteria
- Module exports trackedNodeModulesPaths
- Filters by node_modules segment

## Definition of done
- Function exported and typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-436.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-088
- Requirement: REQ-218
- Unit (Act): UNIT-436
- Unit (Verify): UNIT-439
- Status: completed
- Change: NEW
