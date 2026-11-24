# UNIT-709 — Verify: Store changes for the secret door and inventory reach every SceneObject

## Summary
Unit test for store to scene sync

## Description
BootScene with fake objects; real useGameStore.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneStoreToScene.test.ts` · `new: describe('BootScene store to scene')` · new
- **Do:** Reuse mocks and afterEach cleanup from bootSceneSync.test.ts with two fake objects. Seed the store with createInitialState, call boot.create(). Set state {...first, flags:{secret_door_open:true}} and assert both fakes' sync last called with it; set state {...first, inventory:['key']} and assert sync last called with it; set state null and assert sync call count is unchanged.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneStoreToScene.test.ts`
- **Expected:** Both objects synced on flag and inventory changes, none on null

## Acceptance criteria
- Flag change synced
- Inventory change synced
- Null ignored

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-709.md`

## Links
- Evidence: EVD-142
- Requirement: REQ-354
- Unit (Act): UNIT-706
- Unit (Verify): UNIT-709
- Status: approved
- Change: UPDATE
