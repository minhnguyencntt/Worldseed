# UNIT-473 — Verify: Preload planning and missing-asset fallback unit tests

## Summary
Prove planner dedupe, missing reporting and fallback resolution.

## Description
Pure unit tests over an in-memory manifest object; no filesystem.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: buildPreloadPlan` · new
- **Do:** Create manifest with assets 'objects/bed' and 'objects/door' via parseManifest; assert refs ['objects/bed','objects/bed','objects/ghost'] give load of one entry 'objects/bed' and missing ['objects/ghost'].
- **Run:** `cd game && npx vitest run tests/preload.test.ts`
- **Expected:** Test passes

### Step 2 — `game/tests/preload.test.ts` · `new: resolveTextureKey fallback` · new
- **Do:** Assert resolveTextureKey returns FALLBACK_ASSET_ID for a missing id, for undefined, and for a planned id absent from loadedKeys, and returns the id when planned and loaded; assert none throw.
- **Run:** `cd game && npx vitest run tests/preload.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Given refs with a duplicate and a ghost id, the plan loads one entry and reports the ghost as missing
- Given a missing, undefined or failed-to-load asset id, resolveTextureKey returns the fallback key and never throws

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-473.md`

## Links
- Evidence: EVD-095
- Requirement: REQ-235
- Unit (Act): UNIT-469
- Unit (Verify): UNIT-473
- Status: approved
- Change: UPDATE
