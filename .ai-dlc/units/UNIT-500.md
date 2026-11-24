# UNIT-500 — Verify: playSceneTransition unit tests with a mocked context

## Summary
Prove the fade is called with the content duration and skipped when absent.

## Description
Unit tests in game/tests/playSceneTransition.test.ts using a fake EffectRenderContext, mirroring game/tests/buildEffects.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/playSceneTransition.test.ts` · `new: plays the authored fade with the content duration` · new
- **Do:** Build ctx = { createEffect: vi.fn(), playTransition: vi.fn() } and a scene object with effects [{ type: 'transition', kind: 'fade', durationMs: 400 }] (shape copied from the fade constant in game/tests/buildEffects.test.ts L18); call playSceneTransition(ctx, scene) and assert playTransition toHaveBeenCalledTimes(1) and toHaveBeenCalledWith(400).
- **Run:** `cd game && npx vitest run tests/playSceneTransition.test.ts`
- **Expected:** Test passes.

### Step 2 — `game/tests/playSceneTransition.test.ts` · `new: does not play when no transition entry` · after the first test
- **Do:** Call playSceneTransition with a scene whose effects are [{ type: 'ambientLight', color: '#1a2b3c', alpha: 0.4 }] and again with effects undefined; assert playTransition not.toHaveBeenCalled().
- **Run:** `cd game && npx vitest run tests/playSceneTransition.test.ts`
- **Expected:** Both no-call assertions pass.

## Acceptance criteria
- Test asserts playTransition called once with 400 for a fade entry.
- Test asserts playTransition not called without a transition entry.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-500.md`

## Links
- Evidence: EVD-100
- Requirement: REQ-249
- Unit (Act): UNIT-498
- Unit (Verify): UNIT-500
- Status: completed
- Change: NEW
