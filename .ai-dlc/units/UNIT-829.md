# UNIT-829 — Verify: buildEffects depth, per-type creation and destroyEffects unit tests

## Summary
Mocked-context tests for buildEffects and destroy

## Description
Unit tests with a fake EffectRenderContext and BootScene mocks.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/buildEffectsLighting.test.ts` · `new: buildEffects lighting` · new
- **Do:** Reuse makeFakeContext pattern from game/tests/buildEffects.test.ts. Scene with dust, ambientLight, moonlightShaft, lampGlow, doorLight, vignette and transition: assert createEffect called 6 times, each with depth layerDepth('effects'), types in order; destroyEffects over handles where the first destroy throws still calls the others.
- **Run:** `cd game && npx vitest run tests/buildEffectsLighting.test.ts`
- **Expected:** Tests pass

### Step 2 — `game/frontend/tests/bootSceneEffects.test.ts` · `BootScene effects shutdown test` · append
- **Do:** Add a test: mock destroyEffects alongside buildEffects in the existing vi.mock factory, run create(), fire the registered SHUTDOWN callback, assert destroyEffects toHaveBeenCalledWith the handles returned by the mocked buildEffects.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Six createEffect calls at layer depth
- destroy called on all handles
- BootScene shutdown calls destroyEffects

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-829.md`

## Links
- Evidence: EVD-167
- Requirement: REQ-414
- Unit (Act): UNIT-826
- Unit (Verify): UNIT-829
- Status: completed
- Change: UPDATE
