# UNIT-448 — Act: Chain the guard into the test script

## Summary
Edit package.json test script.

## Description
Replace scripts.test value.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `scripts.test` · L8
- **Do:** Change the test script value from `vitest run` to the guard-first chain.

```
"test": "vitest run" -> "test": "vite-node scripts/assertNoTrackedNodeModules.ts && vitest run"
```

- **Expected:** npm test runs the guard before vitest.

## Acceptance criteria
- scripts.test equals the chained command 'vite-node scripts/assertNoTrackedNodeModules.ts && vitest run'.
- All other entries under scripts in package.json are unchanged.

## Definition of done
- package.json updated
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-448.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-090
- Requirement: REQ-225
- Unit (Act): UNIT-448
- Unit (Verify): UNIT-451
- Status: completed
- Change: UPDATE
