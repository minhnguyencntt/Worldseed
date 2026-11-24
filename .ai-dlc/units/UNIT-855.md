# UNIT-855 — Verify: hover emission and overlay plate and action list unit tests

## Summary
Unit tests for objectHover emission and the overlay content from content definitions.

## Description
Test SceneObject hover callback, BootScene emission with Phaser mocked, and ObjectOverlay output from the real bedroom content.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneHover.test.ts` · `new: BootScene objectHover` · new
- **Do:** Reuse the Phaser mock pattern from frontend/tests/bootSceneSync.test.ts. Trigger the fake handle hover callback with true then false for the bookshelf; spy phaserToReact.emit and assert calls objectHover {id:'bookshelf'} then {id:null}.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneHover.test.ts`
- **Expected:** two emissions asserted

### Step 2 — `game/frontend/tests/objectOverlay.test.tsx` · `new: ObjectOverlay tests` · new
- **Do:** Render ObjectOverlay with the real scene content from runtime/content, getSceneView(createInitialState) as view, layout {left:0,top:0,zoom:2,dpr:1}, activeId 'bookshelf'. Assert plate text equals the bookshelf content name upper-cased, buttons equal the action labels of the view upper-cased, and the plate sits at the anchorFor top y. Click a button and assert onAction spy called with ('bookshelf', id). Assert null render for activeId null and for missing layout.
- **Run:** `cd game/frontend && npx vitest run tests/objectOverlay.test.tsx`
- **Expected:** all overlay tests pass

## Acceptance criteria
- objectHover emission verified
- Plate and action list verified against content
- Click calls game.act

## Definition of done
- Test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-855.md`

## Links
- Evidence: EVD-171
- Requirement: REQ-426
- Unit (Act): UNIT-851
- Unit (Verify): UNIT-855
- Status: completed
- Change: UPDATE
