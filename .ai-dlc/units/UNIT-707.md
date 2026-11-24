# UNIT-707 — Verify: Hover emits objectHover and SceneObject hover listener

## Summary
Unit tests for the SceneObject hover listener and BootScene objectHover emission

## Description
Tests with fake RenderContext and mocked Phaser.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneObjectHover.test.ts` · `new: describe('SceneObject onHover')` · new
- **Do:** Copy makeSpec and the fake RenderContext helper from game/tests/sceneObject.test.ts. Add test 'visible object reports hover in and out': register onHover spy, trigger captured handle hover callback with true then false, assert spy called with {objectId, over:true} then {objectId, over:false}. Add test 'hidden object reports nothing': sync a state failing visibleWhen, trigger hover true, assert spy not called.
- **Run:** `cd game && npx vitest run tests/sceneObjectHover.test.ts`
- **Expected:** Both tests pass

### Step 2 — `game/frontend/tests/bootSceneHover.test.ts` · `new: describe('BootScene objectHover')` · new
- **Do:** Reuse the vi.mock setup of bootSceneSync.test.ts but make the fake object's onHover a vi.fn. Subscribe to phaserToReact objectHover with a spy, call boot.create(), take the callback passed to fake.onHover, call it with {objectId:'bookshelf', over:true} then {objectId:'bookshelf', over:false}, assert spy payloads {id:'bookshelf'} then {id:null}.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneHover.test.ts`
- **Expected:** objectHover emitted with the id then null

## Acceptance criteria
- Hover in/out events asserted
- Hidden object produces no listener call

## Definition of done
- Both test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-707.md`

## Links
- Evidence: EVD-142
- Requirement: REQ-352
- Unit (Act): UNIT-704
- Unit (Verify): UNIT-707
- Status: approved
- Change: UPDATE
