# UNIT-811 — Verify: Committed manifest boy entries match generated output unit tests

## Summary
Unit test that manifest.json boy entries equal generator output

## Description
Import manifest.json and compare boy entries to the pure generator output; assert the old boy entry is unchanged.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boyManifestFile.test.ts` · `new: committed manifest boy entries` · new
- **Do:** Import manifest from '../public/assets/worlds/the-boys-room/manifest.json' and generateAssets, BOY_SOURCES. For each entry from generateAssets(BOY_SOURCES).entries, expect manifest.assets.find(a=>a.id===entry.id) toEqual entry and path to end with '.png'. Also expect the asset with id 'character:boy' to have a path ending '.svg'.
- **Run:** `cd game/frontend && npx vitest run tests/boyManifestFile.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Boy sheet and portrait entries match generated entries
- character:boy still points to the svg

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-811.md`

## Links
- Evidence: EVD-164
- Requirement: REQ-405
- Unit (Act): UNIT-807
- Unit (Verify): UNIT-811
- Status: completed
- Change: UPDATE
