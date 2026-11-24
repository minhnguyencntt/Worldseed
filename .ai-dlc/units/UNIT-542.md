# UNIT-542 — Verify: Effect context tests use two arguments and typed mocks

## Summary
Fix arity and tuple typing in tests

## Description
Pass a resolveKey to createPhaserEffectContext in the effects tests and type the particles mock.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `describe('playTransition: fade-in and ambient layer on the Phaser scene')` · L106-L115
- **Do:** In both createPhaserEffectContext calls add the second argument (id: string) => id.

```
createPhaserEffectContext(fakeScene as never) -> createPhaserEffectContext(fakeScene as never, (id: string) => id)
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** All tests pass and no TS2554 remains

### Step 2 — `game/frontend/tests/bootSceneFallback.test.ts` · `describe('createPhaserEffectContext fallback key usage')` · L71-L75
- **Do:** Declare the particles mock with a rest-args signature so calls[0][2] is typed, and keep the FALLBACK assertion.

```
vi.fn(() => emitter) -> vi.fn((..._args: unknown[]) => emitter)
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFallback.test.ts`
- **Expected:** Test passes and no TS2493 remains

## Acceptance criteria
- Given the effects tests, When called with (scene, resolveKey), Then fadeIn and rectangle assertions pass
- Given the typed particles mock, When calls[0][2] is read, Then it equals the fallback key

## Definition of done
- Both files pass and type-check
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-542.md`

## Links
- Evidence: EVD-109
- Requirement: REQ-270
- Unit (Act): UNIT-539
- Unit (Verify): UNIT-542
- Status: approved
- Change: UPDATE
