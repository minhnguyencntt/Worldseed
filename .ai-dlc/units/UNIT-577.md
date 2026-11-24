# UNIT-577 — Verify: Scene hover, click and missing-asset fallback unit tests with Phaser mocked via @game

## Summary
Suite asserts hover, click and fallback behavior with phaser mocked and @game imports.

## Description
Context: ACT-C confirmed hover, click and fallback paths. Desired behavior: a suite asserts them through @game with phaser mocked. Expected result: tests pass together with the build suite. Why: proves REQ-C from the spec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneAliasInteraction.test.ts` · `new: scene interaction and fallback via @game` · new
- **Do:** Import SceneObject from '@game/entities/SceneObject', planPreload/resolveTextureKey from '@game/engine/planPreload', FALLBACK_KEY and BootScene from '../frontend/src/phaser/BootScene' with vi.mock('phaser') copied in shape from tests/preload.test.ts. Tests: (1) captured onHover callback(true) then (false) gives setHighlighted/setLabelVisible [[true],[false]]; (2) after sync, captured onClick callback calls listener with objectId and actions, and hidden object calls nothing; (3) resolveTextureKey for unknown id returns FALLBACK_KEY; (4) BootScene.preload with unknown asset ref does not call load.image for it and generates texture FALLBACK_KEY
- **Run:** `cd game && npx vitest run tests/sceneAliasInteraction.test.ts tests/sceneAliasBuild.test.ts`
- **Expected:** Both scene alias suites pass together

## Acceptance criteria
- Hover true/false toggles highlight and label
- Click emits objectId and actions only when visible
- Unknown asset resolves to fallback key and fallback texture is generated

## Definition of done
- test passes; all scene tests pass together
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-577.md`

## Links
- Evidence: EVD-115
- Requirement: REQ-288
- Unit (Act): UNIT-574
- Unit (Verify): UNIT-577
- Status: completed
- Change: UPDATE
