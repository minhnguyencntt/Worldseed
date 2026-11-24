# UNIT-457 — Act: Force cached removal of results.json in untrackNodeModules

## Summary
Add -f to the results.json removal so conflicted entries are cleared.

## Description
Change the second git call in untrackNodeModules to include -f.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/trackedNodeModules.ts` · `untrackNodeModules` · L17-L20
- **Do:** Change the second run call args from ['rm','--cached','--ignore-unmatch','-q','--', path] to include '-f' right after '--cached'.

```
run(['rm', '--cached', '-f', '--ignore-unmatch', '-q', '--', 'node_modules/.vite/vitest/results.json']);
```

- **Expected:** The runner receives the forced cached removal for results.json.

## Acceptance criteria
- The results.json removal call includes --cached and -f.
- The node_modules removal call is unchanged.

## Definition of done
- Implementation merged; npx tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-457.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-092
- Requirement: REQ-229
- Unit (Act): UNIT-457
- Unit (Verify): UNIT-459
- Status: completed
- Change: UPDATE
