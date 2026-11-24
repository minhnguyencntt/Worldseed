# UNIT-581 — Act: Add secret-door-open object and strict save validation

## Summary
Visible persistent door and element-level deserialize checks

## Description
Add a flag-visible secret door object and validate element types in deserializeState.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `new object secret-door-open` · after L63
- **Do:** Add object id secret-door-open, name Secret Door, asset objects/secret-door-open, position {x:118,y:40}, scale 1, layer objects, visibleWhen [{flag: secret_door_open}], interactionBounds {x:0,y:0,width:30,height:60}, one inspect action with show_text 'A narrow passage lies behind the shelf.'.
- **Expected:** getSceneView lists the door only when the flag is true

### Step 2 — `game/src/state/persistence.ts` · `deserializeState` · L22-L48
- **Do:** After array checks, throw Error('Invalid game state: <field>') when any element of inventory, discoveredObjects, completedQuests or history is not a string; when any value of flags is not boolean; when any value of relationships is not a number.

```
if (!(parsed[field] as unknown[]).every((v) => typeof v === 'string')) throw new Error(`Invalid game state: ${field}`)
```

- **Expected:** Bad element types throw

## Acceptance criteria
- secret-door-open visible only when secret_door_open is true
- deserializeState rejects non-string items and non-boolean flags

## Definition of done
- Object and validation implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-581.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-116
- Requirement: REQ-292
- Unit (Act): UNIT-581
- Unit (Verify): UNIT-585
- Status: completed
- Change: UPDATE
