# UNIT-472 — Verify: Layer ordering and content-to-entity creation unit tests

## Summary
Prove buildScene orders layers and maps content to entities with a mocked render context.

## Description
Unit tests with a fake RenderContext and a mocked Phaser module cover layer depth ordering, content to entity creation and visibility filtering.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/layers.test.ts` · `new: layerDepth ordering` · new
- **Do:** Add test 'orders layers background<furniture<objects<characters<effects<ui' asserting LAYER_ORDER.map(layerDepth) is strictly increasing and layerDepth(undefined) equals LAYER_DEPTH.objects.
- **Run:** `cd game && npx vitest run tests/layers.test.ts`
- **Expected:** Test passes

### Step 2 — `game/tests/buildScene.test.ts` · `new: buildScene content to entity` · new
- **Do:** Build a fake RenderContext recording addImage/setDepth/setScale calls; use a SceneDef built from tests/fixtures/valid-world.ts shaped data with objects on every layer, one with visibleWhen {flag:'x'} and flag unset. Assert entity count excludes the hidden one, depths are sorted ascending, position and scale are forwarded, and appending an extra ObjectDef adds one entity.
- **Run:** `cd game && npx vitest run tests/buildScene.test.ts`
- **Expected:** All cases pass

### Step 3 — `game/frontend/tests/worldScene.test.ts` · `new: WorldScene create` · new
- **Do:** Mock phaser like tests/bootScene.test.ts with Scene having add.image and events.once spies; set useGameStore state from createInitialState(world, scene); call new WorldScene().create() and assert add.image was called once per visible bedroom object and SHUTDOWN handler registered.
- **Run:** `cd game/frontend && npx vitest run tests/worldScene.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Depth order test passes for all six layers
- Position, scale and visibility cases pass

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-472.md`

## Links
- Evidence: EVD-095
- Requirement: REQ-234
- Unit (Act): UNIT-468
- Unit (Verify): UNIT-472
- Status: approved
- Change: UPDATE
