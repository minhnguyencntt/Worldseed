# UNIT-425 — Verify: trackedNodeModulesPaths unit tests

## Summary
Unit tests for the guard helper

## Description
Tests the helper with a fixed in-memory path list.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedPaths.test.ts` · `new: trackedNodeModulesPaths tests` · new
- **Do:** Add two tests: input ['game/frontend/node_modules/phaser/scripts/tsgen/src/Parser.ts','game/frontend/src/App.tsx'] expects the first only; input ['README.md'] expects [].

```
expect(trackedNodeModulesPaths(input)).toEqual([input[0]]);
```

- **Run:** `cd game/frontend && npx vitest run tests/trackedPaths.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Given the phaser tsgen path and App.tsx, then only the tsgen path is returned
- Given no node_modules paths, then an empty array is returned

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-425.md`

## Links
- Evidence: EVD-085
- Requirement: REQ-212
- Unit (Act): UNIT-423
- Unit (Verify): UNIT-425
- Status: completed
- Change: UPDATE
