# UNIT-573 — Act: Confirm buildScene and SceneObject expose ordering and visibility behavior

## Summary
Confirm buildScene sorts by depth and SceneObject.sync applies visibleWhen, exporting everything the suite imports.

## Description
Read src/engine/buildScene.ts, src/entities/SceneObject.ts and src/engine/layers.ts; keep exports buildScene, SceneObject, LAYER_ORDER, layerDepth named and unchanged.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/buildScene.ts` · `buildScene` · L6-L8
- **Do:** Confirm buildScene is a named export that maps scene.objects to new SceneObject and sorts by a.depth - b.depth; change nothing if so
- **Expected:** buildScene exported and sorts ascending by depth

### Step 2 — `game/src/entities/SceneObject.ts` · `SceneObject.sync` · L43-L52
- **Do:** Confirm sync sets this.visible from evaluateAll(state, spec.visibleWhen) and calls handle.setVisible(this.visible); change nothing if so
- **Expected:** sync drives setVisible from visibleWhen

## Acceptance criteria
- buildScene returns SceneObject[] sorted ascending by depth
- SceneObject.sync calls setVisible with the evaluateAll result

## Definition of done
- exports confirmed, no behavior change
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-573.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-115
- Requirement: REQ-287
- Unit (Act): UNIT-573
- Unit (Verify): UNIT-576
- Status: completed
- Change: UPDATE
