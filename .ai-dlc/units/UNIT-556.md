# UNIT-556 — Verify: BootScene preload tests still pass with typed callback

## Summary
bootScenePreload and bootScene suites pass

## Description
Run the existing preload suite proving the typed callback keeps behavior.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScenePreload.test.ts` · `preload tests` · L1-L60
- **Do:** Ensure the vi.mock of '../src/runtime/content' includes sceneSpec alongside scene and manifest; change no assertions
- **Run:** `npx vitest run tests/bootScenePreload.test.ts`
- **Expected:** All preload tests pass

## Acceptance criteria
- Given typed callback, When preload runs in the suite, Then only planned images load
- Given the suite, When run, Then all pass

## Definition of done
- Suite passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-556.md`

## Links
- Evidence: EVD-111
- Requirement: REQ-277
- Unit (Act): UNIT-552
- Unit (Verify): UNIT-556
- Status: approved
- Change: UPDATE
