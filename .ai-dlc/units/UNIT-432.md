# UNIT-432 — Act: Add assertNoTrackedNodeModules guard

## Summary
Guard throws when dependency paths are tracked

## Description
Add assertNoTrackedNodeModules(git) to the same module.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/untrackNodeModules.ts` · `new: assertNoTrackedNodeModules` · after untrackNodeModules
- **Do:** Export async assertNoTrackedNodeModules(git: GitRunner): call git(['ls-files']), filter with trackedNodeModulesPaths, and if any remain throw new Error with the count and the first 10 paths joined by newline.

```
export async function assertNoTrackedNodeModules(git: GitRunner): Promise<void> {
  const bad = trackedNodeModulesPaths((await git(['ls-files'])).split('\n').filter(Boolean));
  if (bad.length) throw new Error(`${bad.length} tracked node_modules paths:\n${bad.slice(0, 10).join('\n')}`);
}
```

- **Expected:** Throws on tracked paths, resolves otherwise

## Acceptance criteria
- Throws naming offending paths
- Resolves when clean

## Definition of done
- Guard exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-432.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-087
- Requirement: REQ-217
- Unit (Act): UNIT-432
- Unit (Verify): UNIT-435
- Status: approved
- Change: UPDATE
