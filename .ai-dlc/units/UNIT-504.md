# UNIT-504 — Verify: planPreload and resolveTextureKey unit tests

## Summary
Unit tests for the preload planner and resolver

## Description
Pure unit tests with in-memory manifest and scene objects; no filesystem.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preload.test.ts` · `new: planPreload dedupes and reports unknown refs` · new
- **Do:** Build a manifest with assets 'a' and 'b' (types per assetSchema) and a scene whose two objects use 'a', one object uses 'missing', and a dust effect uses 'b'. Assert entries ids equal ['a','b'] and issues has length 1 with message containing 'missing'.
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t planPreload`
- **Expected:** Test passes

### Step 2 — `game/tests/preload.test.ts` · `new: resolveTextureKey falls back` · new
- **Do:** Assert resolveTextureKey('a', new Set(['a'])) === 'a' and resolveTextureKey('x', new Set(['a'])) === FALLBACK_ASSET_ID.
- **Run:** `cd game && npx vitest run tests/preload.test.ts -t resolveTextureKey`
- **Expected:** Test passes

## Acceptance criteria
- planPreload test asserts deduplicated entries and the unknown ref issue
- resolveTextureKey test asserts the fallback key for an unknown id

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-504.md`

## Links
- Evidence: EVD-101
- Requirement: REQ-251
- Unit (Act): UNIT-502
- Unit (Verify): UNIT-504
- Status: approved
- Change: UPDATE
