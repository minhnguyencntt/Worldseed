# UNIT-576 — Verify: Scene layer ordering, entity creation and visibility unit tests via @game

## Summary
Suite asserts ordering, one sprite per object and visibleWhen using @game imports and a fake RenderContext.

## Description
Context: ACT-B confirmed buildScene and SceneObject behavior. Desired behavior: a suite asserts ordering, entity creation and visibility through @game with a fake RenderContext. Expected result: three tests pass. Why: proves REQ-B from the spec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneAliasBuild.test.ts` · `new: scene build via @game` · new
- **Do:** Import buildScene from '@game/engine/buildScene', SceneObject from '@game/entities/SceneObject', layerDepth/LAYER_ORDER from '@game/engine/layers', createInitialState/setFlag from '@game/state/gameState', validScene from './fixtures/valid-world'. Build a fake RenderContext whose createSprite returns vi.fn handle. Tests: (1) objects authored out of order yield ascending depth array; (2) createSprite call count equals scene.objects.length with key/x/y/scale matching spec; (3) object with visibleWhen: sync(state without flag) then sync(setFlag) gives setVisible calls [[false],[true]]
- **Run:** `cd game && npx vitest run tests/sceneAliasBuild.test.ts`
- **Expected:** All three tests pass, no real Phaser loaded

## Acceptance criteria
- Depths ascend background<furniture<objects
- createSprite called once per object with asset, position, scale
- setVisible gets false then true as flag toggles

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-576.md`

## Links
- Evidence: EVD-115
- Requirement: REQ-287
- Unit (Act): UNIT-573
- Unit (Verify): UNIT-576
- Status: completed
- Change: UPDATE
