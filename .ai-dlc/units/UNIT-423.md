# UNIT-423 — Act: Add trackedNodeModulesPaths helper

## Summary
Create pure helper in game/frontend/tools

## Description
Create a module exporting trackedNodeModulesPaths that filters paths having a node_modules segment.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tools/trackedPaths.ts` · `new: trackedNodeModulesPaths` · new
- **Do:** Create exported function trackedNodeModulesPaths(paths: string[]): string[] returning entries whose split('/') contains the segment node_modules.

```
export function trackedNodeModulesPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').includes('node_modules'));
}
```

- **Expected:** Function importable from tools/trackedPaths

## Acceptance criteria
- Given mixed paths, then only node_modules paths are returned
- Given none, then an empty array is returned

## Definition of done
- Helper exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-423.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-085
- Requirement: REQ-212
- Unit (Act): UNIT-423
- Unit (Verify): UNIT-425
- Status: completed
- Change: UPDATE
