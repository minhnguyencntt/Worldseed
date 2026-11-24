# UNIT-354 — Act: Add object, scene and world zod schemas

## Summary
Create src/content/schema.ts

## Description
Create zod schemas and a non-throwing parseWorldContent mirroring manifest/index.ts parseManifest.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `new: objectSchema, conditionSchema, actionSchema` · new
- **Do:** Define conditionSchema as union of {flag:string, equals:boolean optional} and {hasItem:string}; actionSchema with id enum inspect|push|search|leave, label string, conditions optional array, events array of z.record(z.string(), z.unknown()) objects with a string type field; objectSchema with id, name, description, asset string, position {x,y numbers}, scale number positive default 1, layer enum background|furniture|objects|characters|effects|ui, interactionBounds boundsSchema imported from ../assets/manifest/schema optional, actions array, visibleWhen conditionSchema array optional, persistentState {flag string, initial boolean optional} optional, openWhenFlag string optional.

```
export const layerSchema = z.enum(['background','furniture','objects','characters','effects','ui']);
```

- **Expected:** Module compiles with tsc --noEmit

### Step 2 — `game/src/content/schema.ts` · `new: sceneSchema, worldSchema, parseWorldContent` · new
- **Do:** Define sceneSchema (id, title, openingDialogue optional, dialogue array of records, objects array of objectSchema) and worldSchema (id, title, startScene, scenes string array, characters array of {id,name}, flags string array). Export parseWorldContent(kind: 'scene'|'world', input: unknown) returning {ok:true,data}|{ok:false,errors:{path,message}[]} via safeParse, joining issue.path with '.'.

```
export function parseWorldContent(kind, input) { const r = (kind==='scene'?sceneSchema:worldSchema).safeParse(input); ... }
```

- **Expected:** Invalid input returns errors, never throws

## Acceptance criteria
- objectSchema validates all required fields
- parseWorldContent returns path-named errors

## Definition of done
- Schemas exported with inferred types
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-354.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-070
- Requirement: REQ-177
- Unit (Act): UNIT-354
- Unit (Verify): UNIT-357
- Status: completed
- Change: UPDATE
