# UNIT-038 — Verify: SceneView hotspot and ActionMenu unit tests

## Summary
Verify: SceneView hotspot and ActionMenu unit tests

## Description
Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/scene.test.tsx` · `clicking an object opens its actions` · new
- **Do:** Render SceneView with objects from getSceneView(createInitialState(world,scene),scene) (import world and scene from runtime/content) and an onSelect spy; click getByRole('button',{name:'Bookshelf'}); assert spy called with 'bookshelf'. Render ActionMenu for bookshelf, click 'Search', assert onAction called with ('bookshelf','search').
- **Run:** `cd game/frontend && npx vitest run tests/scene.test.tsx`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/scene.test.tsx` · `asset map is replaceable` · new
- **Do:** Mutate ASSET_PATHS['scene:bedroom'] to '/x.svg', render SceneView, assert the img src ends with '/x.svg'.
- **Run:** `cd game/frontend && npx vitest run tests/scene.test.tsx -t replaceable`
- **Expected:** Test passes

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion

## Definition of done
- Listed tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-038.md`

## Links
- Evidence: EVD-007
- Requirement: REQ-018
- Unit (Act): UNIT-034
- Unit (Verify): UNIT-038
- Status: completed
- Change: UPDATE
