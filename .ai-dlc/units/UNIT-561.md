# UNIT-561 — Verify: Effect context tests use two arguments and typed mocks

## Summary
Update bootSceneEffects tests

## Description
Pass a typed resolveKey mock at both call sites.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `playTransition(400) test and ambientLight test` · L114, L123
- **Do:** Import type ResolveKey from '../src/phaser/effectContext', declare const resolveKey: ResolveKey = vi.fn((id: string) => id), and pass it as second argument at both createPhaserEffectContext calls.

```
createPhaserEffectContext(fakeScene as never, resolveKey)
```

- **Run:** `npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** All tests pass, input id returned unchanged

## Acceptance criteria
- Both calls pass resolveKey
- 3 tests pass and tsc has no TS2554

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-561.md`

## Links
- Evidence: EVD-112
- Requirement: REQ-279
- Unit (Act): UNIT-558
- Unit (Verify): UNIT-561
- Status: completed
- Change: NEW
