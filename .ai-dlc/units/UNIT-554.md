# UNIT-554 — Verify: Effect context tests use two arguments and typed mocks

## Summary
bootSceneEffects passes with ResolveKey mock

## Description
Update bootSceneEffects.test.ts so both calls pass a typed resolveKey and the content mock includes sceneSpec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `playTransition and ambientLight tests` · L114, L123
- **Do:** Import type ResolveKey, define const resolveKey: ResolveKey = (id) => id and pass it as the second argument; ensure the vi.mock of '../src/runtime/content' includes sceneSpec

```
createPhaserEffectContext(fakeScene as never, resolveKey)
```

- **Run:** `npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Given the two calls, When tsc runs, Then no TS2554
- Given the suite, When run, Then 3 tests pass

## Definition of done
- Suite passes and type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-554.md`

## Links
- Evidence: EVD-111
- Requirement: REQ-275
- Unit (Act): UNIT-550
- Unit (Verify): UNIT-554
- Status: approved
- Change: NEW
