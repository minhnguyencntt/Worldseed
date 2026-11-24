# UNIT-512 — Verify: BootScene.preload loads only planned assets

## Summary
Unit tests for preload

## Description
Test BootScene.preload with mocked Phaser load and mocked content.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScenePreload.test.ts` · `new: BootScene preload plans only scene assets` · new
- **Do:** Mock phaser like bootScene.test.ts; vi.mock '../src/runtime/content' to export a scene with objects referencing 'objects/bed' and 'objects/ghost' and a manifest holding 'objects/bed' and unused 'objects/desk'. Set boot.load = { image: vi.fn() }, spy console.warn, call boot.preload(). Assert image called once with ('objects/bed','assets/<path>'), never with 'objects/desk' or 'objects/ghost', and warn called with a message containing 'objects/ghost'.
- **Run:** `cd game/frontend && npx vitest run tests/bootScenePreload.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- only planned ids queued
- unknown ids warned

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-512.md`

## Links
- Evidence: EVD-103
- Requirement: REQ-255
- Unit (Act): UNIT-510
- Unit (Verify): UNIT-512
- Status: completed
- Change: UPDATE
