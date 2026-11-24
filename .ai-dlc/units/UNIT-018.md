# UNIT-018 — Act: Implement YAML loader and reference validator

## Summary
Add loadWorld and validateWorld

## Description
Implement loader and validator using the types from backend/game/src/state/types.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/src/engine/loader.ts` · `new: loadWorld` · new
- **Do:** Export loadWorld(worldDir:string):{world:WorldDef;scenes:Record<string,SceneDef>}; read join(worldDir,'world.yaml') then for each id in world.scenes read join(worldDir,'scenes',id+'.yaml'); wrap readFileSync/parse in try/catch rethrowing Error(`Failed to load ${path}: ${message}`).
- **Expected:** Returns both objects for valid dirs; throws naming the file otherwise.

### Step 2 — `backend/game/src/engine/validator.ts` · `new: validateWorld` · new
- **Do:** Export validateWorld(world,scenes):string[]; push errors: `unknown scene: X` for world.startScene or goto_scene not in scenes; `unknown character: X` for say.character or dialogue speaker not in world.characters (or 'narrator'); `unknown object: X` for discover.object not in the scene objects; `unknown flag: X` for set_flag/condition flags not in world.flags. Walk every scene object action events, conditions, openWhenFlag and dialogue choice events and next ids (`unknown dialogue node: X`).
- **Expected:** Empty array for valid content; one message per bad reference.

## Acceptance criteria
- Given content, when loaded, then typed objects are returned.
- Given bad references, when validated, then errors are listed.

## Definition of done
- Loader and validator typecheck
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-018.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-004
- Requirement: REQ-010
- Unit (Act): UNIT-018
- Unit (Verify): UNIT-022
- Status: completed
- Change: UPDATE
