# UNIT-397 — Verify: PhaserHost single instance, cleanup, config and resize unit tests

## Summary
Unit tests with phaser and createGame mocked prove lifecycle, config and resize.

## Description
Write tests from REQ1 acceptance criteria. Phaser is mocked and no browser is used.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserHost.test.tsx` · `new: phaserHost lifecycle tests` · new
- **Do:** vi.mock('../src/phaser/createGame') so createGame returns a fresh fake {destroy: vi.fn(), scale:{refresh: vi.fn()}} per call, recorded in an array. Stub global.ResizeObserver with a class that captures its callback and exposes disconnect. Add tests: (1) render <React.StrictMode><PhaserHost/></React.StrictMode>, assert the first fake destroy was called with true and the last fake was not destroyed; (2) render then unmount, assert destroy toHaveBeenCalledWith(true) once; (3) invoke the captured ResizeObserver callback, assert scale.refresh was called.
- **Run:** `cd game/frontend && npx vitest run tests/phaserHost.test.tsx`
- **Expected:** All three tests pass.

### Step 2 — `game/frontend/tests/phaserConfig.test.ts` · `new: config tests` · new
- **Do:** vi.mock('phaser', () => ({default:{AUTO:0, Scale:{FIT:3, CENTER_BOTH:1}, Game: class {}, Scene: class {}}})). Test buildGameConfig(document.createElement('div'), []) has render.pixelArt true, render.roundPixels true, scale.mode 3. Test computeZoom(1000,600,2) returns an integer >= 1 and computeZoom(10,10,1) returns 1.
- **Run:** `cd game/frontend && npx vitest run tests/phaserConfig.test.ts`
- **Expected:** Config tests pass.

## Acceptance criteria
- Given StrictMode, When PhaserHost mounts, Then one live game and one destroy of the first.
- Given resize, When the ResizeObserver mock fires, Then scale.refresh is called.

## Definition of done
- Both test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-397.md`

## Links
- Evidence: EVD-078
- Requirement: REQ-197
- Unit (Act): UNIT-394
- Unit (Verify): UNIT-397
- Status: completed
- Change: UPDATE
