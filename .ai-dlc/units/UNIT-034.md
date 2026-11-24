# UNIT-034 — Act: Build SceneView hotspots, asset path map and ActionMenu

## Summary
Act: Build SceneView hotspots, asset path map and ActionMenu

## Description
Implement the scene rendering components and replaceable asset map.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/public/assets/bedroom.svg` · `new: placeholder art` · new
- **Do:** Create a pixel-style SVG 320x180 with rectangles for floor, wall, bed, bookshelf, desk, computer, window and door.
- **Expected:** File renders as a bedroom placeholder

### Step 2 — `game/frontend/src/runtime/assets.ts` · `new: ASSET_PATHS, HOTSPOTS` · new
- **Do:** Export ASSET_PATHS: Record<string,string> = {'scene:bedroom':'/assets/bedroom.svg'} and HOTSPOTS: Record<string,{left:string;top:string;width:string;height:string}> keyed by bed, bookshelf, desk, old-computer, window, door with percentage rectangles.
- **Expected:** Changing a value in ASSET_PATHS changes the rendered background

### Step 3 — `game/frontend/src/components/SceneView.tsx` · `new: SceneView` · new
- **Do:** Export SceneView({sceneId, title, objects: SceneObjectView[], selectedId, onSelect}) rendering img src=ASSET_PATHS['scene:'+sceneId] and one button per object with aria-label=obj.name, style from HOTSPOTS[obj.id], data-open=String(obj.open), onClick -> onSelect(obj.id).
- **Expected:** Each object has a clickable hotspot

### Step 4 — `game/frontend/src/components/ActionMenu.tsx` · `new: ActionMenu` · new
- **Do:** Export ActionMenu({object, onAction}) rendering object.name, object.description and a button per object.actions with its label calling onAction(object.id, action.id); render null when object is undefined.
- **Expected:** Menu lists action labels and calls onAction

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria

## Definition of done
- Files in code_paths implemented and type-check passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-034.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-007
- Requirement: REQ-018
- Unit (Act): UNIT-034
- Unit (Verify): UNIT-038
- Status: completed
- Change: UPDATE
