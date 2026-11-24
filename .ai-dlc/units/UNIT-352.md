# UNIT-352 — Verify: Manifest schema unit tests

## Summary
Test assetSchema and manifestSchema

## Description
Unit tests for schema accept and reject cases.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestSchema.test.ts` · `new: describe('assetSchema')` · new
- **Do:** Create tests importing assetSchema from ../src/assets/manifest/schema: (1) image {id:'bookshelf',path:'objects/bookshelf.png',type:'image',dimensions:{width:32,height:64},origin:{x:0.5,y:1},interactionBounds:{x:0,y:0,width:32,height:64}} parses success; (2) spritesheet with frames {frameWidth:16,frameHeight:16,frameCount:4}, dimensions 64x16 and animations {idle:{frames:[0,1],frameRate:4}} succeeds; (3) spritesheet lacking frames fails; (4) dimensions width 0 fails; (5) type 'video' fails; (6) origin.x 1.5 fails; (7) bounds width -1 fails
- **Run:** `cd game && npx vitest run tests/manifestSchema.test.ts`
- **Expected:** All schema tests pass

## Acceptance criteria
- Valid image and spritesheet parse
- Bad dimensions, type, origin and bounds fail

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-352.md`

## Links
- Evidence: EVD-069
- Requirement: REQ-175
- Unit (Act): UNIT-349
- Unit (Verify): UNIT-352
- Status: completed
- Change: UPDATE
