# UNIT-514 — Act: Confirm planPreload and resolveTextureKey are importable pure exports

## Summary
Verify engine exports need no change so the test can import them

## Description
planPreload and resolveTextureKey are already named, pure exports in planPreload.ts. This Act confirms them as the unit under test; no behavior change is planned.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/planPreload.ts` · `planPreload` · L4-L13
- **Do:** Confirm planPreload(scene, manifest) is exported, dedupes with a Set named refs and returns { load, unknown }; make no edit.
- **Expected:** Function matches the described contract

### Step 2 — `game/src/engine/planPreload.ts` · `resolveTextureKey` · L15-L17
- **Do:** Confirm resolveTextureKey(id, manifest, fallbackId) is exported and returns fallbackId when id is undefined or not in manifest.assets; make no edit.
- **Expected:** Function matches the described contract

## Acceptance criteria
- planPreload and resolveTextureKey are named exports with no side effects
- Product code imports remain unchanged

## Definition of done
- Exports confirmed unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-514.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-104
- Requirement: REQ-257
- Unit (Act): UNIT-514
- Unit (Verify): UNIT-516
- Status: approved
- Change: UPDATE
