# UNIT-349 — Act: Add manifest zod schemas and inferred types

## Summary
Create schema.ts

## Description
Create game/src/assets/manifest/schema.ts defining schemas and exported inferred types.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/manifest/schema.ts` · `new: schema module` · new
- **Do:** Create the file importing { z } from 'zod'. Define dimensionsSchema {width,height} as positive ints; originSchema {x,y} numbers 0..1; boundsSchema {x,y numbers, width,height positive numbers}; frameSpecSchema {frameWidth,frameHeight positive ints, frameCount positive int, optional margin,spacing non-negative ints}; animationSchema {frames: nonempty array of non-negative ints, frameRate positive number, repeat int >= -1 default -1}; assetSchema {id nonempty string, path nonempty string, type enum image|spritesheet|audio, dimensions optional, frames optional, animations optional record of animationSchema, origin optional, interactionBounds optional}; manifestSchema {version literal 1, assets array of assetSchema}. Add superRefine on assetSchema: type spritesheet requires frames and dimensions. Export z.infer types AssetEntry, AssetManifest, AnimationDef, FrameSpec, InteractionBounds, Origin, Dimensions

```
export const assetSchema = z.object({...}).superRefine(...)
```

- **Expected:** Module compiles and exports schemas and types

## Acceptance criteria
- Module exports assetSchema and manifestSchema as zod schemas
- Module exports types AssetEntry, AssetManifest, AnimationDef, FrameSpec and InteractionBounds

## Definition of done
- Schemas compile under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-349.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-069
- Requirement: REQ-175
- Unit (Act): UNIT-349
- Unit (Verify): UNIT-352
- Status: completed
- Change: UPDATE
