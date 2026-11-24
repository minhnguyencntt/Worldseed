# UNIT-431 — Act: Add untrackNodeModules cleanup with an injected git runner

## Summary
Cleanup runs git rm --cached on node_modules roots

## Description
Add GitRunner type and untrackNodeModules to the same module; it lists files via git ls-files and untracks node_modules roots from the index only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/untrackNodeModules.ts` · `new: GitRunner, untrackNodeModules` · after L3
- **Do:** Export type GitRunner = (args: string[]) => Promise<string>. Export async untrackNodeModules(git): call git(['ls-files']), split on newline, filter with trackedNodeModulesPaths, derive unique roots as the path prefix up to and including the first node_modules segment, and if any roots exist call git(['rm','-r','--cached','--ignore-unmatch','--',...roots]); return the roots array.

```
export async function untrackNodeModules(git: GitRunner): Promise<string[]> {
  const tracked = trackedNodeModulesPaths((await git(['ls-files'])).split('\n').filter(Boolean));
  const roots = [...new Set(tracked.map((p) => { const s = p.split('/'); return s.slice(0, s.indexOf('node_modules') + 1).join('/'); }))];
  if (roots.length) await git(['rm', '-r', '--cached', '--ignore-unmatch', '--', ...roots]);
  return roots;
}
```

- **Expected:** Roots returned; git rm invoked once with --cached

## Acceptance criteria
- Calls git rm -r --cached --ignore-unmatch -- <roots>
- Skips git rm when nothing is tracked

## Definition of done
- untrackNodeModules exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-431.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-087
- Requirement: REQ-216
- Unit (Act): UNIT-431
- Unit (Verify): UNIT-434
- Status: approved
- Change: UPDATE
