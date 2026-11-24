# UNIT-342 — Act: Add zod and manifest/object schemas

## Summary
Create zod schemas and inferred types

## Description
Add zod dependency and create schemas for manifest assets and world objects.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/package.json` · `dependencies` · L1
- **Do:** Add "zod": "^3.23.0" to dependencies next to yaml, then run npm install in game/ to update package-lock.json

```
"dependencies":{"yaml":"^2.5.0","zod":"^3.23.0"}
```

- **Expected:** zod resolves from game/node_modules

### Step 2 — `game/src/assets/manifest/schema.ts` · `new: assetEntrySchema, assetManifestSchema, worldObjectSchema, sceneSchema` · new
- **Do:** Create schemas. assetEntry: id (non-empty string), path (non-empty string), type enum background|furniture|object|spritesheet|effect|audio|icon|frame|cursor, width/height positive ints optional, frames {frameWidth,frameHeight,count} optional, animations record of {frames:number[],frameRate:number positive,repeat:int>=-1} optional, origin {x,y} 0..1 default {0.5,0.5}, interactionBounds {x,y,width,height} optional. manifest: {version:1, assets: array}. worldObject: id, name, asset (string), position {x,y}, scale number positive default 1, layer enum background|furniture|objects|characters|effects|ui, bounds optional, actions array of enum inspect|push|search|leave, visibleWhen optional array of {flag,equals?}|{hasItem}, persistentState optional {flag:string, openAsset?:string}. scene: {id,title,objects:worldObject[]}

```
export const layerSchema = z.enum(['background','furniture','objects','characters','effects','ui']);
```

- **Expected:** Schemas compile under tsc

### Step 3 — `game/src/assets/manifest/types.ts` · `new: AssetEntry, AssetManifest, WorldObject, SceneContent` · new
- **Do:** Export types via z.infer of the four schemas from schema.ts

```
export type AssetManifest = z.infer<typeof assetManifestSchema>;
```

- **Expected:** npm run typecheck passes

## Acceptance criteria
- Schemas export parse-able validators and inferred types
- zod is declared in game/package.json

## Definition of done
- Schemas exported: assetManifestSchema, worldObjectSchema, sceneSchema
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-342.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-068
- Requirement: REQ-171
- Unit (Act): UNIT-342
- Unit (Verify): UNIT-345
- Status: completed
- Change: NEW
