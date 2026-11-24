# UNIT-497 — Verify: BootScene plays the authored transition on create

## Summary
Test BootScene wiring with mocks

## Description
Add a test file frontend/tests/bootSceneTransition.test.ts mocking phaser, @game/engine/buildEffects and ../src/phaser/effectContext.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneTransition.test.ts` · `new: BootScene transition describe` · new
- **Do:** Create the test: vi.mock phaser as in bootSceneEffects.test.ts; vi.mock '@game/engine/buildEffects' returning []; vi.mock '../src/phaser/effectContext' so createPhaserEffectContext returns {createEffect: vi.fn(), playTransition} with a shared playTransition vi.fn; set the store state via createInitialState(world, scene). Test 1 'fades with the bundled scene duration': call new BootScene().create(); expect playTransition toHaveBeenCalledTimes(1) and toHaveBeenCalledWith(400) (the bedroom.yaml duration, read from scene.effects). Test 2 'no fade without a transition entry': vi.mock '../src/runtime/content' with a scene whose effects omit the transition (use vi.doMock plus dynamic import of BootScene) and expect playTransition not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneTransition.test.ts`
- **Expected:** 2 tests pass

## Acceptance criteria
- create() calls the context playTransition with the content duration
- No call when the scene has no transition

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-497.md`

## Links
- Evidence: EVD-099
- Requirement: REQ-248
- Unit (Act): UNIT-495
- Unit (Verify): UNIT-497
- Status: approved
- Change: UPDATE
