# UNIT-442 — Act: Add trackedDependencyPaths and parseGitLsFiles helpers

## Summary
Extend trackedNodeModules.ts with cache-aware filter, parser and checker

## Description
Add helpers so the guard can flag node_modules and .vite paths and read git ls-files -z output.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: trackedDependencyPaths` · after L3
- **Do:** Add exported function trackedDependencyPaths(paths: string[]) returning paths whose '/'-split segments include 'node_modules' or '.vite'.

```
export function trackedDependencyPaths(paths: string[]): string[] {
  return paths.filter((p) => p.split('/').some((s) => s === 'node_modules' || s === '.vite'));
}
```

- **Expected:** Function returns only dependency or cache paths

### Step 2 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: parseGitLsFiles` · after L3
- **Do:** Add exported parseGitLsFiles(output: string): string[] that splits on '\0' and drops empty strings.

```
export function parseGitLsFiles(output: string): string[] {
  return output.split('\0').filter((p) => p.length > 0);
}
```

- **Expected:** NUL output becomes a path list

### Step 3 — `game/frontend/src/lib/trackedNodeModules.ts` · `assertNoTrackedNodeModules` · L13-L16
- **Do:** Add exported checkTrackedFiles(run: GitRunner): void that calls run(['ls-files','-z']), parses it, and throws Error with count and first 10 paths when trackedDependencyPaths is non-empty.

```
export function checkTrackedFiles(run: GitRunner): void {
  const bad = trackedDependencyPaths(parseGitLsFiles(run(['ls-files', '-z'])));
  if (bad.length > 0) throw new Error(`${bad.length} tracked dependency or cache paths: ${bad.slice(0, 10).join(', ')}`);
}
```

- **Expected:** Throws only when a dependency/cache path is tracked

## Acceptance criteria
- trackedDependencyPaths flags node_modules and .vite segments only
- checkTrackedFiles(run) throws via assertion when git lists such paths

## Definition of done
- Helpers exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-442.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-089
- Requirement: REQ-221
- Unit (Act): UNIT-442
- Unit (Verify): UNIT-444
- Status: approved
- Change: UPDATE
