# UNIT-492 — Verify: buildEffects unit tests with a fake effect context

## Summary
Test buildEffects ordering, depth and transition

## Description
Fake EffectRenderContext with vi.fn.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/buildEffects.test.ts` · `new: buildEffects tests` · new
- **Do:** Make ctx with createEffect: vi.fn(() => ({destroy: vi.fn()})) and playTransition: vi.fn(); call buildEffects with validScene plus dust, ambientLight and fade(400); assert createEffect called twice with depth 400, playTransition called once with 400, returned length 2; with no effects assert length 0 and no calls; destroy all handles and assert each destroy called
- **Run:** `cd game && npx vitest run tests/buildEffects.test.ts`
- **Expected:** 3 tests pass

## Acceptance criteria
- Create calls and effects layer depth are asserted
- Transition call and handle destruction are asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-492.md`

## Links
- Evidence: EVD-098
- Requirement: REQ-245
- Unit (Act): UNIT-489
- Unit (Verify): UNIT-492
- Status: completed
- Change: UPDATE
