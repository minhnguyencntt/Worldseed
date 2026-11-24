# UNIT-355 — Act: Move the-boys-room content to src/content/worlds and validate in loadWorld

## Summary
Relocate content, add object fields, validate

## Description
git mv content, add new fields to bedroom objects, validate scenes via schema in loadWorld, update frontend glob.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/world.yaml` · `new: world.yaml (git mv)` · new
- **Do:** Run git mv game/content/worlds/the-boys-room game/src/content/worlds/the-boys-room (creating parent dirs) so world.yaml and scenes/bedroom.yaml move unchanged.
- **Run:** `git mv`
- **Expected:** game/content directory no longer exists

### Step 2 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `objects bed, bookshelf, desk, old-computer, window, door` · L12-L113
- **Do:** Add to each object: asset (objects/<id>), position {x,y}, scale 1, layer (furniture for bed, bookshelf, desk; objects for old-computer, window, door), interactionBounds {x:0,y:0,width,height}. On bookshelf replace openWhenFlag with persistentState: {flag: secret_door_open}; on old-computer add persistentState {flag: computer_on}.

```
persistentState:
  flag: secret_door_open
```

- **Expected:** YAML parses with schema

### Step 3 — `game/src/state/types.ts` · `ObjectDef` · L22-L28
- **Do:** Add optional fields asset?: string, position?: {x:number;y:number}, scale?: number, layer?: string, interactionBounds?: {x:number;y:number;width:number;height:number}, visibleWhen?: Condition[], persistentState?: {flag:string; initial?:boolean}.

```
persistentState?: { flag: string; initial?: boolean };
```

- **Expected:** tsc passes

### Step 4 — `game/src/content/loader.ts` · `loadWorld` · L47-L85
- **Do:** After reading each scene yaml, call parseWorldContent('scene', sceneRaw); when ok is false throw new Error(`${relPath} invalid: ${errors.map(e=>e.path+': '+e.message).join('; ')}`); push the parsed data as SceneDef.

```
const parsed = parseWorldContent('scene', sceneRaw);
```

- **Expected:** Bad scene throws path-named error

### Step 5 — `game/frontend/src/runtime/content.ts` · `worldFiles glob` · L5-L9
- **Do:** Change glob pattern from '../../../content/worlds/the-boys-room/**/*.yaml' to '../../../src/content/worlds/the-boys-room/**/*.yaml'.

```
import.meta.glob('../../../src/content/worlds/the-boys-room/**/*.yaml', ...)
```

- **Expected:** Frontend still bundles the world

## Acceptance criteria
- Content loads from new path
- Malformed scene throws with path

## Definition of done
- Old game/content removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-355.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-070
- Requirement: REQ-178
- Unit (Act): UNIT-355
- Unit (Verify): UNIT-358
- Status: completed
- Change: UPDATE
