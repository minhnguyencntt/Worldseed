# UNIT-446 — Act: Add parseGitLsFiles and checkTrackedFiles to the helper file

## Summary
Add the two exported helpers to src/lib/trackedNodeModules.ts.

## Description
Extend the existing helper module with parseGitLsFiles and checkTrackedFiles using the existing GitRunner type.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: parseGitLsFiles` · after L4
- **Do:** Add exported function parseGitLsFiles(output: string): string[] that splits output on the NUL character and filters out empty strings.

```
export function parseGitLsFiles(output: string): string[] {
  return output.split('\0').filter((p) => p.length > 0);
}
```

- **Expected:** parseGitLsFiles('a\0b\0') returns ['a','b'].

### Step 2 — `game/frontend/src/lib/trackedNodeModules.ts` · `new: checkTrackedFiles` · after L8 (below the GitRunner type)
- **Do:** Add exported function checkTrackedFiles(run: GitRunner): string[] that calls run(['ls-files','-z']), parses it with parseGitLsFiles and returns paths where trackedNodeModulesPaths matches or the path includes '.vite/vitest/'.

```
export function checkTrackedFiles(run: GitRunner): string[] {
  const files = parseGitLsFiles(run(['ls-files', '-z']));
  const deps = new Set(trackedNodeModulesPaths(files));
  return files.filter((p) => deps.has(p) || p.includes('.vite/vitest/'));
}
```

- **Expected:** Returns only offending paths, preserving git order.

## Acceptance criteria
- parseGitLsFiles splits on \0 and filters empty strings.
- checkTrackedFiles calls run(['ls-files','-z']) and returns node_modules or .vite/vitest paths.

## Definition of done
- Both functions exported once; tsc clean for the file
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-446.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-090
- Requirement: REQ-223
- Unit (Act): UNIT-446
- Unit (Verify): UNIT-449
- Status: completed
- Change: UPDATE
