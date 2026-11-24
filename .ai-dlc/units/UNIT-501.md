# UNIT-501 — Verify: BootScene plays the authored transition on create

## Summary
Prove create() calls playSceneTransition with the context and scene.

## Description
Extend game/frontend/tests/bootSceneEffects.test.ts with a mocked playSceneTransition.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `vi.mock('@game/engine/playSceneTransition')` · after L22
- **Do:** Add vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() })) and import playSceneTransition; add vi.mocked(playSceneTransition).mockReset() in beforeEach so the fake Phaser scene needs no camera.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** Existing BootScene tests still pass with the helper mocked.

### Step 2 — `game/frontend/tests/bootSceneEffects.test.ts` · `it: plays the authored transition when create() runs` · after L44
- **Do:** Set state, mock buildEffects to return [], call new BootScene().create(); assert playSceneTransition toHaveBeenCalledTimes(1), first arg has function playTransition, second arg toBe(scene).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** New and existing tests pass.

## Acceptance criteria
- create() calls playSceneTransition once with ctx and the bundled scene.
- Shutdown still destroys effect handles.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-501.md`

## Links
- Evidence: EVD-100
- Requirement: REQ-250
- Unit (Act): UNIT-499
- Unit (Verify): UNIT-501
- Status: completed
- Change: NEW
