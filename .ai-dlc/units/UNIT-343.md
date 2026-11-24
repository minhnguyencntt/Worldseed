# UNIT-343 — Act: Author the-boys-room manifest, scene and asset folders

## Summary
Add content files and folder tree

## Description
Create content data separate from the engine and the asset directory tree.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/manifest.json` · `new: manifest` · new
- **Do:** Create manifest {version:1} with assets for ids backgrounds/bedroom (path worlds/the-boys-room/backgrounds/bedroom.png, 320x180), furniture/bed, furniture/bookshelf, objects/computer, objects/window, objects/door, each with type, dimensions, origin and interactionBounds; character boy as spritesheet with frames and idle/interact animations
- **Expected:** File parses with assetManifestSchema

### Step 2 — `game/src/content/worlds/the-boys-room/scene.json` · `new: scene` · new
- **Do:** Create scene {id:'bedroom',title:"The Boy's Room"} with objects bookshelf, computer, bed, window, door; each references an asset id defined in manifest.json, with position, layer, actions inspect/push/search per the existing YAML in game/content/worlds/the-boys-room, and bookshelf persistentState {flag:'secret_door_open'}
- **Expected:** File parses with sceneSchema and every asset id is in the manifest

### Step 3 — `game/public/assets/worlds/the-boys-room/backgrounds/.gitkeep` · `new: gitkeep` · new
- **Do:** Create empty .gitkeep in each of the 9 listed directories (backgrounds, furniture, objects, characters, effects, audio under worlds/the-boys-room; icons, frames, cursors under ui)
- **Run:** `find game/public/assets -name .gitkeep | wc -l`
- **Expected:** Prints 9

## Acceptance criteria
- manifest.json and scene.json exist
- asset folders exist

## Definition of done
- Content validates against R1 schemas
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-343.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-068
- Requirement: REQ-172
- Unit (Act): UNIT-343
- Unit (Verify): UNIT-346
- Status: completed
- Change: UPDATE
