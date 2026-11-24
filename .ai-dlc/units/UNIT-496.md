# UNIT-496 — Verify: playSceneTransition unit tests with a mocked context

## Summary
Test the helper with a fake EffectRenderContext

## Description
Add game/tests/playSceneTransition.test.ts reusing the fake-context pattern and validScene fixture from tests/buildEffects.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/playSceneTransition.test.ts` · `new: playSceneTransition describe` · new
- **Do:** Create the test file with a fake context ({createEffect: vi.fn(), playTransition: vi.fn()}) and validScene from ./fixtures/valid-world. Test 1 'plays the fade with the content duration': scene effects [{type:'transition',kind:'fade',durationMs:400}, dust spec]; call playSceneTransition; expect playTransition toHaveBeenCalledTimes(1) and toHaveBeenCalledWith(400). Test 2 'plays a different authored duration': durationMs 750 expects 750. Test 3 'does nothing without a transition entry': effects [dust spec] and a scene with no effects key; expect playTransition not called.
- **Run:** `cd game && npx vitest run tests/playSceneTransition.test.ts`
- **Expected:** 3 tests pass

## Acceptance criteria
- playTransition called once with 400 for a fade scene
- playTransition not called without a transition entry or effects

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-496.md`

## Links
- Evidence: EVD-099
- Requirement: REQ-247
- Unit (Act): UNIT-494
- Unit (Verify): UNIT-496
- Status: approved
- Change: UPDATE
