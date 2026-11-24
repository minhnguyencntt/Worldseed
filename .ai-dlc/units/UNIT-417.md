# UNIT-417 — Verify: BootScene and PhaserHost 3.90 lifecycle unit tests

## Summary
Mocked tests for shutdown cleanup, resize and destroy

## Description
Write tests/phaser390Lifecycle.test.tsx with phaser and createGame mocked. Assert BootScene shutdown unsubscribes, PhaserHost calls scale.refresh and destroy(true), and the sources contain no Phaser 4-only API.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaser390Lifecycle.test.tsx` · `new: phaser 3.90 lifecycle tests` · new
- **Do:** Create the test file, mirroring mocking from tests/bootScene.test.ts and tests/phaserHost.test.tsx. Test 1: stub phaser Scene and Scenes.Events.SHUTDOWN, call create(), fire SHUTDOWN, assert the zustand unsubscribe spy ran. Test 2: vi.mock('../src/phaser/createGame') returning {scale:{refresh: vi.fn()}, destroy: vi.fn()}; render PhaserHost, trigger the captured ResizeObserver callback, assert refresh called; unmount, assert destroy toHaveBeenCalledWith(true) once. Test 3: read both source files and expect no match for /Filters|enableFilters|setFilter/.
- **Run:** `cd game/frontend && npx vitest run tests/phaser390Lifecycle.test.tsx`
- **Expected:** All tests pass.

## Acceptance criteria
- Given BootScene.create run with a fake events emitter, when SHUTDOWN fires, then the zustand unsubscribe is called.
- Given PhaserHost rendered with createGame mocked returning {scale:{refresh},destroy}, when unmounted, then destroy is called once with true.
- Given a mocked ResizeObserver callback, when invoked, then scale.refresh is called.
- Given BootScene.ts and PhaserHost.tsx source, when scanned, then no Phaser 4 filter API matches.

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-417.md`

## Links
- Evidence: EVD-083
- Requirement: REQ-208
- Unit (Act): UNIT-415
- Unit (Verify): UNIT-417
- Status: completed
- Change: UPDATE
